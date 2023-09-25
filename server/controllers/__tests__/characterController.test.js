const { connection } = require("../../database").mongoose;
const characterController = require("../characterController");
const Character = require("../../database/models/characterModel");

const originalIlvl = 1415;

const testChar = {
  name: "Technosaint",
  ilvl: originalIlvl,
  isGoldEarner: false,
  restedOnly: true,
  _class: "Scouter",
  user: "test",
};

const mReq = { body: testChar };
const mRes = { locals: {} };
const mNext = jest.fn();
afterAll((done) => {
  connection.close();
  done();
});

xdescribe("character updates", () => {
  const { updateCharacter } = characterController;
  test("character item level updates are reflected in database", async () => {
    // invoke updateCharacter
    const randomIlvl = Math.ceil(Math.random() * (1490 - 1415)) + 1415;
    testChar.ilvl = randomIlvl;

    const result = await updateCharacter(mReq, mRes, mNext);

    // look for character in database
    const charFromDB = await Character.findOne({ name: testChar.name });

    expect(charFromDB.ilvl).toEqual(testChar.ilvl);
    testChar.ilvl = originalIlvl;
    await updateCharacter(mReq, mRes, mNext);

    // testChar.ilvl = originalIlvl;
  });
});
