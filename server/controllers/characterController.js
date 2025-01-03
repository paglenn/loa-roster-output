const Character = require("../database/models/characterModel");
const {
  findBestContent,
  getGoldContent,
} = require("../database/util/findContent");
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
const contentErrorMsg = "Content error: see console for more details";
const genResources = async ({
  ilvl,
  isGoldEarner,
  restedOnly,
  goldContents,
  itemLevelDidUpdate,
}) => {
  const restedModifier = restedOnly ? 2 / 3 : 1;

  const chaosDungeon = await findBestContent(ilvl, "chaos_dungeons");
  const guardianRaid = await findBestContent(ilvl, "guardian_raids");
  const cube = await findBestContent(ilvl, "cubes");
  const isSavingCubes = false; //ilvl >= 1630 && new Date().getMonth > 8;
  const cubesPerWeek = isSavingCubes ? 0 : 1; // restedOnly ? 1 : 2;
  const weeklyChaosQty = chaosDungeon.ilvl >= 1640 ? 7 : 14;
  if (itemLevelDidUpdate || !goldContents) {
    goldContents = isGoldEarner
      ? await findBestContent(ilvl, "gold_earning_content")
      : [];
  }

  let silver =
    chaosDungeon.silver * weeklyChaosQty * restedModifier +
    cube.silver * cubesPerWeek;
  // factor in lopang?
  const lopangSilver = 2 * 34500 + 39000;
  silver += isGoldEarner ? 0 : (lopangSilver - 4000) * restedModifier * 7;

  const gems =
    restedModifier * (chaosDungeon.gems * weeklyChaosQty) +
    cube.gems * cubesPerWeek;

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
        (chaosDungeon.blue_stones.qty * weeklyChaosQty +
          guardianRaid.blue_stones.qty * 14) *
        restedModifier,
    },
    redStones: {
      type: chaosDungeon.red_stones.type,
      qty:
        (chaosDungeon.red_stones.qty * weeklyChaosQty +
          guardianRaid.red_stones.qty * 14) *
        restedModifier,
    },
    gems: gems,
    gold: isGoldEarner
      ? goldContents.reduce((sum, source) => sum + source.gold, 0)
      : 0,
  };
  return { resourceObject, goldContents };
};
characterController.createCharacter = async (req, res, next) => {
  const { name, _class, ilvl, isGoldEarner, restedOnly, user } = req.body;

  try {
    const { resourceObject: resources, goldContents } = await genResources({
      ilvl,
      isGoldEarner,
      restedOnly,
    });
    const character = {
      name,
      _class,
      ilvl,
      isGoldEarner: isGoldEarner,
      restedOnly: restedOnly ?? false,
      resources,
      goldContents,
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
  const {
    name,
    ilvl,
    isGoldEarner,
    restedOnly,
    goldContents,

    itemLevelDidUpdate,
  } = req.body;

  console.log("updating character");
  // updating item level means updating production
  // updating gold means ... updating gold
  try {
    const { resourceObject: resources, goldContents: newGoldContents } =
      await genResources({
        ilvl,
        isGoldEarner,
        restedOnly,
        goldContents,
        itemLevelDidUpdate,
      });

    res.locals.character = await Character.findOneAndUpdate(
      { name },
      {
        ilvl,
        isGoldEarner,
        restedOnly: restedOnly ?? false,
        resources,
        goldContents: newGoldContents,
      },
      { returnDocument: "after" }
    );
    console.log("updated character: ", res.locals.character);
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

characterController.getContentList = (req, res, next) => {
  const ilvl = req.params.ilvl;
  getGoldContent(ilvl)
    .then((content) => {
      res.locals.content = content;
      return next();
    })
    .catch((error) => {
      return next({
        error: error,
        message: contentErrorMsg,
        status: 500,
        log: "error occured in getContentList middleware",
      });
    });
};

module.exports = characterController;
