/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { resourceTypes, hasSubtype } from "../../helpers/reference";
import Character from "../Character";
//import { handleDelete } from "../../features/delete";

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

beforeEach(() => {
  render(
    <Character
      character={testChar}
      handleDelete={jest.fn()}
      handleGoldUpdate={jest.fn()}
      handleLevelUpdate={jest.fn()}
      handleRestedUpdate={jest.fn()}
    />
  );
});
describe("Character card components", () => {
  it("renders the character name", () => {
    expect(screen.getByText(testChar.name)).toBeInTheDocument();
    console.log("in first test: ");
    //screen.debug();
  });

  it("renders images for class", () => {
    expect(screen.getByAltText(/class icon/)).toBeInTheDocument();
    expect(screen.getByAltText(/class image/)).toBeInTheDocument();
    // iterate over resource types
    // an image with that alt text should be in the document
    resourceList.forEach((resource) => {
      const resourceRegex = new RegExp(resource.slice(0, -1));
      expect(screen.getByAltText(resourceRegex)).toBeInTheDocument();
    });
  });

  it("renders amounts for character properties", () => {
    //console.log("in second test: ");

    charResources.forEach((resource) => {
      expect(screen.getByText(resource)).toBeInTheDocument();
    });
  });
});
