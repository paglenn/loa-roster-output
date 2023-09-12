const Character = require("../database/models/characterModel");
const findBestContent = require("../database/util/findContent");
// we will export character controller object
const characterController = {};

/// methods :
// createCharacter
// deleteCharacter
// updateCharacter
// getCharacters

// create character for POST request
// request body must contain character name, class, and item level
// feature updates -- gold earning status, rested only
// create character using model - from mongoose
// add to database using database schema

characterController.createCharacter = (req, res, next) => {
  const { name, _class, ilvl, isGoldEarner, restedOnly } = req.body;
  console.log("request body: ", req.body);
  const restedModifier = restedOnly ? 2 / 3 : 1;
  const chaosDungeonP = findBestContent(ilvl, "chaos_dungeons"); // object with chaos data
  const guardianRaidP = findBestContent(ilvl, "guardian_raids"); // object with guardian data
  const goldSourcesP = findBestContent(ilvl, "gold_earning_content"); // legion raid / abyssal  data
  //console.log(chaosDungeonP, guardianRaidP, goldSources);
  Promise.all([chaosDungeonP, guardianRaidP, goldSourcesP])
    .then(([chaosDungeon, guardianRaid, goldSources]) => {
      //console.log([chaosDungeon, guardianRaid, goldSources]);
      return Character.create({
        name: name,
        _class: _class,
        ilvl: ilvl,
        isGoldEarner: isGoldEarner,
        restedOnly: restedOnly ?? false,
        resources: {
          // per week, we multiply the dailies by 14
          silver: chaosDungeon.silver * 14 * restedModifier,
          leapstones: {
            type: chaosDungeon.leapstones.type,
            qty: guardianRaid.leapstones.qty * 14 * restedModifier,
          },
          blueStones: {
            type: chaosDungeon.blue_stones.type,
            qty:
              (chaosDungeon.blue_stones.qty + guardianRaid.blue_stones.qty) *
              14 *
              restedModifier,
          },
          redStones: {
            type: chaosDungeon.red_stones.type,
            qty:
              (chaosDungeon.red_stones.qty + guardianRaid.red_stones.qty) *
              14 *
              restedModifier,
          },
          gems: chaosDungeon.gems * 14 * restedModifier,
          gold: isGoldEarner
            ? goldSources.reduce((sum, source) => sum + source.gold, 0)
            : 0,
        },
      });
    })
    .then((character) => {
      res.locals.character = character;
      return next();
    })
    .catch((error) =>
      next({
        error: error,
        message: { err: "an error occured: see console for more details" },
        status: 400,
        log: "error occurred in createCharacter middleware",
      })
    );
};
// method: update a character
// request body should contain name and item level (the only thing that should really be updated )
characterController.updateCharacter = async (req, res, next) => {
  const { name, ilvl, isGoldEarner, restedOnly } = req.body;
  const restedModifier = restedOnly ? 2 / 3 : 1;
  // updating item level means updating production
  // updating gold means ... updating gold
  const chaosDungeonP = findBestContent(ilvl, "chaos_dungeons"); // object with chaos data
  const guardianRaidP = findBestContent(ilvl, "guardian_raids"); // object with guardian data
  const goldSourcesP = findBestContent(ilvl, "gold_earning_content"); // legion raid / abyssal  data

  // to start we can update all
  Promise.all([chaosDungeonP, guardianRaidP, goldSourcesP])
    .then(([chaosDungeon, guardianRaid, goldSources]) => {
      return Character.findOneAndUpdate(
        { name: name },
        {
          ilvl: ilvl,
          isGoldEarner: isGoldEarner,
          restedOnly: restedOnly ?? false,
          resources: {
            // per week, we multiply the dailies by 14
            silver: chaosDungeon.silver * 14 * restedModifier,
            blueStones: {
              type: chaosDungeon.blue_stones.type,
              qty:
                (chaosDungeon.blue_stones.qty + guardianRaid.blue_stones.qty) *
                14 *
                restedModifier,
            },
            redStones: {
              type: chaosDungeon.red_stones.type,
              qty:
                (chaosDungeon.red_stones.qty + guardianRaid.red_stones.qty) *
                14 *
                restedModifier,
            },
            leapstones: {
              type: chaosDungeon.leapstones.type,
              qty: guardianRaid.leapstones.qty * 14 * restedModifier,
            },
            gems: chaosDungeon.gems * 14 * restedModifier,
            gold: isGoldEarner
              ? goldSources.reduce((sum, source) => sum + source.gold, 0)
              : 0,
          },
        },
        { returnDocument: "after" }
      );
    })
    .then((updatedChar) => {
      res.locals.character = updatedChar;
      //console.log(updatedChar);
      return next();
    })
    .catch((error) => {
      next({
        error: error,
        message: { err: "an error occured: see console for more details" },
        status: 400,
        log: "error occurred in deleteCharacter middleware",
      });
    });
};

// method: Delete a character
// must pass in name in request body
characterController.deleteCharacter = (req, res, next) => {
  const { name } = req.body;

  Character.findOneAndDelete({ name: name })
    .then((deletedChar) => {
      res.locals.character = deletedChar;
      return next();
    })
    .catch((error) => {
      next({
        error: error,
        message: { err: "an error occured: see console for more details" },
        status: 400,
        log: "error occurred in deleteCharacter middleware",
      });
    });
};

// method : getCharacters
// no parameters needed
// this is where we will get the array of characters whose properties we want to render.
characterController.getCharacters = (req, res, next) => {
  // this is where we could start to make the database user specific

  // get all characters
  Character.find()
    .then((characterArray) => {
      res.locals.characters = characterArray;
      return next();
    })
    .catch((error) => {
      return next({
        error: error,
        message: { err: "an error occured: see console for more details" },
        status: 400,
        log: "error occurred in getCharacters middleware",
      });
    });
};

// method: get one character
// parameter needed: name
characterController.getCharacter = (req, res, next) => {
  // this is where we could start to make the database user specific
  const { name } = req.body;
  // get all characters
  Character.findOne({ name })
    .then((character) => {
      res.locals.character = character;
      return next();
    })
    .catch((error) => {
      next({
        error: error,
        message: { err: "an error occured: see console for more details" },
        status: 400,
        log: "error occurred in getCharacter middleware",
      });
    });
};

module.exports = characterController;
