const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../../index");
let listener;
dotenv.config();
// const PORT = process.env.TEST_PORT;
//const app = require("../../server");
describe("General character retrieval", () => {
  beforeAll(() => {
    listener = app.listen(process.env.TEST_PORT);
    console.log(`listening on port ${process.env.TEST_PORT}`);
  });

  afterAll(() => {
    listener.close();
  });

  test("get request to character/characters should return all characters with a get request to /character/characters", () => {
    return request(app)
      .get("/character/characters")
      .then((response) => response.body)
      .then((data) => {
        expect(Array.isArray(data)).toBeTruthy();
      });
  });
});

describe("Character creation", () => {
  beforeAll(() => {
    listener = app.listen(process.env.TEST_PORT);
    console.log(`listening on port ${process.env.TEST_PORT}`);
  });

  afterAll(() => {
    listener.close();
  });

  const testChar = {
    name: "Aethersaint",
    ilvl: "1340",
    _class: "Sorceress",
  };

  beforeEach(async () => {
    await request(app).delete("/character").send({ name: testChar.name });
  });

  afterEach(async () => {
    await request(app).delete("/character").send({ name: testChar.name });
  });

  test("created character comes back on response body hydrated with defaults", () => {
    return request(app)
      .post("/character")
      .send(testChar)
      .expect("Content-Type", /json/)
      .then((response) => response.body)
      .then((returnedChar) => {
        console.log(returnedChar);
        expect(returnedChar.name).toBe(testChar.name);
        expect(returnedChar.isGoldEarner).toBe(false);
        expect(returnedChar.user).toBe("test");
      });
  });
});
