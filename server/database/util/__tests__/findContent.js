const { describe, expect, it } = require("@jest/globals");
const findBestContent = require("../findContent");

// import {describe, expect} from ''
describe("content lookup tester", () => {
  const ilvl = 1580;
  it(" finds best chaos dungeon ", async () => {
    findBestContent(ilvl, "chaos_dungeons").then((content) =>
      expect(content.ilvl).toBe(1580)
    );
  });

  it(" finds best guardian raid", async () => {
    findBestContent(ilvl, "guardian_raids").then((content) =>
      expect(content.ilvl).toBe(1580)
    );
  });

  it("finds the best cubes", async () => {
    findBestContent(ilvl, "cubes").then((content) => {
      expect(content.ilvl).toBe(1580);
    });
  });

  it("finds the best three gold earning contents and returns them in an array", async () => {
    findBestContent(ilvl, "gold_earning_content").then((content) => {
      expect(content.length).toEqual(3);
      expect(content[0].ilvl).toEqual(1580); // akkan NM
      expect(content[1].ilvl).toEqual(1580); // kayangel HM
      expect(content[2].ilvl).toEqual(1560);
    });
  });
});
