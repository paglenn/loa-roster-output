const app = require("..");
const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();

let listener;
beforeAll(() => {
  listener = app.listen(5051); // process.env.TEST_PORT);
});

afterAll(() => {
  listener.close();
});

describe("unknown route", () => {
  test("unknown route is responded to with 404 error", (done) => {
    request(app)
      .get("/cats")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
// global error handler
// describe("global error handler", () => {});
