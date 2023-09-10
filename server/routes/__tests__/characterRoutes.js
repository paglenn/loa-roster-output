const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
//const app = require("../../server");
describe("General character retrieval", () => {
  it("should return all characters with a get request to /character/characters", () => {
    return request(`http://localhost:${PORT}`)
      .get("/character/characters")
      .then((response) => response.body)
      .then((data) => {
        expect(Array.isArray(data)).toBeTruthy();
        console.log(data.length);
      });
  });
});

