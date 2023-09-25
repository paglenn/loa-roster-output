/**
 * @jest-environment jsdom
 */
import axios from "axios";
import { describe, expect, test, jest, it } from "@jest/globals";
// to avoid actually making the fetch call we will mock axios
jest.mock("axios");
import updateGold from "../utils/updateGold";
const alertMock = jest.spyOn(window, "alert").mockImplementation();
const mockUpdateChar = jest.fn();
const mockUpdateGoldCount = jest.fn();
const mockEvent = {
  target: {
    checked: true,
  },
};

describe("Gold Earner count updates", () => {
  it("raises an alert when there are 6 gold earners already", async () => {
    await updateGold(mockEvent, {}, mockUpdateChar, mockUpdateGoldCount, 6);
    expect(alertMock).toBeCalled();
  });
});