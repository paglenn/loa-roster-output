import handleContentChange from "../handlers/handleContentChange";
import { expect, test, it, describe } from "@jest/globals";
import axios from "axios";
jest.mock("axios");

const mCharacter = {
  goldContents: [
    { name: "akkan", _id: 1 },
    { name: "brelshaza", _id: 2 },
    { name: "kayangel", _id: 3 },
  ],
};
// mock event
const mEvent = { target: { checked: true } };

// mock updater function
const mUpdater = jest.fn((character) => {
  return { ...character };
});

// mock content

describe("content change", () => {
  it("rejects additions after three contents ", () => {
    // mock character
    const mContent = { name: "argos" };
    mEvent.target.checked = true;
    const result = handleContentChange(mEvent, mContent, mCharacter, mUpdater);
    expect(mUpdater).not.toHaveBeenCalled();
    expect(result.error).toEqual("already have three gold earning contents");
  });

  it("rejects addition of content with same name as current", () => {
    // first need to reduce to two contents
    const originalContents = [...mCharacter.goldContents];
    mCharacter.goldContents.pop();

    const mContent = { name: "brelshaza", _id: 0 };
    mEvent.target.checked = true;
    const result = handleContentChange(mEvent, mContent, mCharacter, mUpdater);
    expect(mUpdater).not.toHaveBeenCalled();
    expect(result.error).toEqual("already doing content of same name");

    // restore to original three contents
    mCharacter.goldContents = originalContents;
  });

  it("successfully removes content", () => {
    const mContent = { name: "brelshaza", _id: 2 };
    mEvent.target.checked = false;
    handleContentChange(mEvent, mContent, mCharacter, mUpdater);

    expect(mUpdater.mock.results[0].value.goldContents.length).toEqual(2);
    mUpdater.mockClear();
  });

  it("accepts addition when there are less than three contents", () => {
    // save original contents
    const originalContents = [...mCharacter.goldContents];
    mCharacter.goldContents.pop();

    const mContent = { name: "argos", _id: 4 };
    // true => doing
    mEvent.target.checked = true;

    handleContentChange(mEvent, mContent, mCharacter, mUpdater);

    expect(mUpdater.mock.results[0].value.goldContents[2]._id).toEqual(4);
    // restore original gold content for other tests
    mCharacter.goldContents = originalContents;
    mUpdater.mockClear();
  });
});
