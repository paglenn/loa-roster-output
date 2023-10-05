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
  test("makes appropriate axios call", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { auth: true } })
    );
    const response = await handleLogin(mUser);
    expect(response.auth).toEqual(true);
  });
});
//
