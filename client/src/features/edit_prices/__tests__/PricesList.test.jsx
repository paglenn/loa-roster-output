/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { test, expect, describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import reduxWrap from "../../../../__mocks__/reduxWrap";

import { resourceDisplayNames } from "../../../utils/reference";
import PricesList from "../components/PricesList";

import { PricesService } from "../../../services";

describe("PricesList", () => {
  test("renders with prices for each item", () => {
    const pricesService = new PricesService();
    const mockGetPrices = jest.spyOn(pricesService, "GetAll");
    mockGetPrices.mockResolvedValue(null);
    const mockCreatePrices = jest.spyOn(pricesService, "Create");
    //mockCreatePrices.mockResolvedValue(undefined);
    render(reduxWrap(<PricesList pricesService={pricesService} />));
    Object.keys(mockPriceObj).forEach((name) => {
      if (
        name !== "redStones" &&
        name !== "blueStones" &&
        name !== "leapstones"
      )
        expect(
          screen.getByText(resourceDisplayNames[name])
        ).toBeInTheDocument();
    });
  });
});

const mockPriceObj = {
  gems: 7500,
  leapstones: 30,
  redStones: 3,
  blueStones: 1,
  marvelous_honor_leapstone: 6,
  greater_honor_leapstone: 1,
  obliteration_stone: 1,
  protection_stone: 1,
  crystallized_guardian_stone: 1,
  crystallized_destruction_stone: 1,
  refined_protection_stone: 1,
  refined_obliteration_stone: 3,
  radiant_honor_leapstone: 30,
};
