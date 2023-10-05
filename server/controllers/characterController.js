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

const genResources = async (ilvl, isGoldEarner, restedOnly) => {
  const restedModifier = restedOnly ? 2 / 3 : 1;
  const chaosDungeon = await findBestContent(ilvl, "chaos_dungeons");
  const guardianRaid = await findBestContent(ilvl, "guardian_raids");
  const cube = await findBestContent(ilvl, "cubes");
  const cubesPerWeek = restedOnly ? 1 : 2;

  const goldSources = isGoldEarner
    ? await findBestContent(ilvl, "gold_earning_content")
    : [];

  const silver =
    chaosDungeon.silver * 14 * restedModifier + cube.silver * cubesPerWeek;
  const gems =
    restedModifier * (chaosDungeon.gems * 14) + cube.gems * cubesPerWeek;

  // generate resource object
  const resourceObject = {
    silver: silver,
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
    gems: gems,
    gold: goldSources.reduce((sum, source) => sum + source.gold, 0),
  };
  return resourceObject;
};
characterController.createCharacter = async (req, res, next) => {
  const { name, _class, ilvl, isGoldEarner, restedOnly, user } = req.body;

  try {
    const resources = await genResources(ilvl, isGoldEarner, restedOnly);
    const character = {
      name,
      _class,
      ilvl,
      isGoldEarner: isGoldEarner,
      restedOnly: restedOnly ?? false,
      resources,
    };
    if (user) character.user = user;
    res.locals.character = await Character.create(character);
    return next();
  } catch (err) {
    return next({
      error: err,
      message: { err: "an error occured: see console for more details" },
      status: 400,
      log: `error occurred in createCharacter middleware${err.message}`,
    });
  }
};

// method: update a character
// request body should contain name and item level (the only thing that should really be updated )
characterController.updateCharacter = async (req, res, next) => {
  const { name, ilvl, isGoldEarner, restedOnly } = req.body;

  // updating item level means updating production
  // updating gold means ... updating gold
  try {
    const resources = await genResources(ilvl, isGoldEarner, restedOnly);
    res.locals.character = await Character.findOneAndUpdate(
      { name },
      {
        ilvl,
        isGoldEarner,
        restedOnly: restedOnly ?? false,
        resources,
      },
      { returnDocument: "after" }
    );
    return next();
  } catch (err) {
    return next({
      error: err,
      message: { err: "an error occured: see console for more details" },
      status: 400,
      log: `error occurred in updateCharacter middleware ${err.message}`,
    });
  }
};

// method: Delete a character
// must pass in name in request body
characterController.deleteCharacter = (req, res, next) => {
  const { name } = req.body;

  Character.findOneAndDelete({ name })
    .then((deletedChar) => {
      res.locals.character = deletedChar;
      return next();
    })
    .catch((error) => {
      next({
        error,
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
  const { user } = req.query.user ? req.query : { user: "test" };

  // get all characters
  Character.find({ user: user })
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

module.exports = characterController;
