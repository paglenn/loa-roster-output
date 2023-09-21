const findBestContent = require("../findContent");

describe("content lookup tester", () => {
  const ilvl = 1580;
  it(" finds best chaos dungeon ", async () => {
    const content = await findBestContent(ilvl, "chaos_dungeons");
    expect(content.ilvl).toBe(1580);
  });

  it(" finds best guardian raid", async () => {
    const content = await findBestContent(ilvl, "guardian_raids");
    expect(content.ilvl).toBe(1580);
  });

  it("finds the best cubes", async () => {
    const content = await findBestContent(ilvl, "cubes");
    console.log(content);
    expect(content.ilvl).toBe(1580);
  });

  it("finds the best three gold earning contents and returns them in an array", async () => {
    const content = await findBestContent(ilvl, "gold_earning_content");
    expect(content.length).toEqual(3);
    expect(content[0].ilvl).toEqual(1580); // akkan NM
    expect(content[1].ilvl).toEqual(1580); // kayangel HM
    expect(content[2].ilvl).toEqual(1560); // since the brelshaza legion raid is 1560 and should be the lowest one for a 1580
  });
});
