/**
 * @jest-environment jsdom
 */
import { getCharValue } from "../sums";
import { it, expect } from "@jest/globals";
import { prices } from "../reference";
const sales = Object.keys(prices).reduce((obj, name) => {
  obj[name] = true;
  return obj;
}, {});
const testChar = {
  name: "Technosaint",
  _class: "Scouter",
  ilvl: 1415,
  resources: {
    silver: 645717.3333333333,
    blueStones: {
      type: "crystallized_guardian_stone",
      qty: 4372.666666666666,
    },
    redStones: {
      type: "crystallized_destruction_stone",
      qty: 1492.3999999999999,
    },
    leapstones: {
      type: "greater_honor_leapstone",
      qty: 70.93333333333332,
    },
    gems: 64.4,
    gold: 0,
  },
  isGoldEarner: true,
  restedOnly: true,
};
it("returns a number for total char value", () => {
  expect(
    typeof getCharValue(testChar, prices, sales) === "number"
  ).toBeTruthy(); // it should be that based on market calculation
  // we can't add an expect for the exact value because it's based on changing market rates ,but we could input a range.
});
