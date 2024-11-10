const { describe, expect, it, beforeEach } = require("@jest/globals");
const {
  findBestContent,
  selectGoldContent,
  getGoldContent,
} = require("../findContent");

// import {describe, expect} from ''
describe("content lookup", () => {
  const ilvl = 1580;
  it(" finds best chaos dungeon ", async () => {
    findBestContent(ilvl, "chaos_dungeons").then((content) =>
      expect(content.ilvl).toEqual(ilvl)
    );
  });

  it(" finds best guardian raid", async () => {
    findBestContent(ilvl, "guardian_raids").then((content) =>
      expect(content.ilvl).toEqual(ilvl)
    );
  });

  it("finds the best cubes", async () => {
    findBestContent(ilvl, "cubes").then((content) => {
      expect(content.ilvl).toEqual(1580);
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

  test("specific content can be selected and the right content is retrieved ", async () => {
    const content = await selectGoldContent({
      akkan: "hard",
      brelshaza: "hard_1_4",
      kayangel: "hard",
    });
    const akkanGold = 7500;
    const kayangelGold = 4800;
    const brelshazaGold = 4600;
    const expectedGold = brelshazaGold + akkanGold + kayangelGold;
    expect(content.length).toEqual(3);
    const totalGold = content.reduce((sum, c) => sum + c.gold, 0);
    expect(totalGold).toEqual(expectedGold);
  });

  test("all gold content relevant to ilvl can be retrieved", async () => {
    const content = await getGoldContent(1400);
    expect(content.length).toEqual(2);
  });
});
