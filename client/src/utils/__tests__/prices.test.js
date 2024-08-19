/**
 * @jest-environment jsdom
 */
import { test, expect } from "@jest/globals";
import { updatePrices, priceModifiers } from "../reference";

test("price updater retrieves and returns prices from region", async () => {
  const prices = await updatePrices("North America East");

  expect(prices).toBeInstanceOf(Object);

  // Object.keys(prices).forEach((item) =>
  //   expect(Number.isInteger(prices[item] / priceModifiers[item])).toBe(true)
  // );

  expect(localStorage.getItem("prices")).toEqual(JSON.stringify(prices));
});
