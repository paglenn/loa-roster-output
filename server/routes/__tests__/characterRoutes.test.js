const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../../server");
const { connection } = require("../../database").mongoose;
let listener;

// const PORT = process.env.TEST_PORT;
//const app = require("../../server");
beforeAll(() => {
  listener = app.listen(process.env.TEST_PORT);
  dotenv.config();
});

afterAll((done) => {
  listener.close();
  connection.close();
  done();
});

describe("Character retrieval", () => {
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
  const testChar = {
    name: "Aethersaint",
    ilvl: "1340",
    _class: "Sorceress",
  };

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
        expect(returnedChar.name).toBe(testChar.name);
        expect(returnedChar.isGoldEarner).toBe(false);
        expect(returnedChar.user).toBe("test");
      });
  });
});
