import { handleDelete } from "../utils/handleDelete";
import { describe, expect, test, jest } from "@jest/globals";
import axios from "axios";
let fakeChar = { name: "fakeChar" };
const mockEvent = {
  target: {
    id: fakeChar.name,
  },
};
const mockUpdate = jest.fn();

// to avoid actually making the fetch call we will mock axios
jest.mock("axios");

describe("delete handler", () => {
  test("the state update method is called when data is passed", async () => {
    // mock axios call return value
    axios.delete.mockImplementation(() =>
      Promise.resolve({ data: { message: "hello" } })
    );
    //
    await handleDelete(mockEvent, mockUpdate);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
