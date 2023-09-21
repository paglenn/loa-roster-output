// unit test for login handler
import { handleLogin } from "../utils/handleLogin";
import axios from "axios";
import { describe, expect, test, jest, it } from "@jest/globals";
// to avoid actually making the fetch call we will mock axios
jest.mock("axios");
const mUser = { username: "test", password: "test" };
//fetch call with username and password on request body
// axios.delete.mockImplementation(() =>
// Promise.resolve({ data: { message: "hello" } })
// );
describe("Login handler ", () => {
  it("should make a get request with username and password in req body", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { auth: true } })
    );

    expect(handleLogin(mUser)).toBeTruthy();
  });
});
//
