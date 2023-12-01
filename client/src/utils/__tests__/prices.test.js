/**
 * @jest-environment jsdom
 */
import { test, expect, it } from "@jest/globals";
import { updatePrices, priceModifiers } from "../reference";

test("price updater retrieves and returns prices from region", () => {
  updatePrices("North America East").then((prices) => {
    expect(prices).toBeInstanceOf(Object);
    Object.keys(prices).forEach((item) =>
      expect(Number.isInteger(prices[item] / priceModifiers[item])).toBe(true)
    );
    expect(localStorage.getItem("prices")).toEqual(JSON.stringify(prices));
  });
});
