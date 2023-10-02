/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { resourceTypes, hasSubtype } from "../../helpers/reference";
import Character from "../Character";
import { act } from "react-dom/test-utils";

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
const resourceList = resourceTypes.map((resource) =>
  hasSubtype[resource] ? testChar.resources[resource].type : resource
);

const charResources = resourceTypes.map((resource) =>
  Math.round(
    hasSubtype[resource]
      ? testChar.resources[resource].qty
      : testChar.resources[resource]
  ).toLocaleString()
);

//console.log(resourceList, charResources);

describe("Character card components", () => {
  it("renders the character name", async () => {
    render(<Character character={testChar} />);

    expect(await screen.findByText(testChar.name)).toBeInTheDocument();
    // screen.debug();
  });

  it("renders images for class", async () => {
    act(() => {
      render(<Character character={testChar} />);
    });
    expect(screen.getByAltText(/class icon/)).toBeInTheDocument();
    expect(await screen.findByAltText(/class image/)).toBeInTheDocument();
    // iterate over resource types
    // an image with that alt text should be in the document
    resourceList.forEach((resource) => {
      const resourceRegex = new RegExp(resource.slice(0, -1));
      expect(screen.getByAltText(resourceRegex)).toBeInTheDocument();
    });
  });

  it("renders amounts for character properties", () => {
    act(() => {
      render(<Character character={testChar} />);
    });
    charResources.forEach((resource) => {
      if (resource !== "0")
        expect(screen.getByText(resource)).toBeInTheDocument();
    });
  });
});
