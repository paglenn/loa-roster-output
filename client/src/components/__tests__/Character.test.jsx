/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { resourceTypes } from "../../utils/reference";
import Character from "../Character";
import { act } from "react-dom/test-utils";
import { prices } from "../../utils/reference";
import { reduxWrap } from "../../../__mocks__/reduxWrap";
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

const charResources = resourceTypes.map(
  (resource) => {
    let amount;
    if (testChar.resources.hasOwnProperty(resource))
      amount = testChar.resources[resource];
    else if (testChar.resources.blueStones.type === resource)
      amount = testChar.resources.blueStones.qty;
    else if (testChar.resources.redStones.type === resource)
      amount = testChar.resources.redStones.qty;
    else if (testChar.resources.leapstones.type === resource)
      amount = testChar.resources.leapstones.qty;
    else return undefined;
    return Math.round(amount).toLocaleString();
  }
  // Math.round(
  //   hasSubtype[resource]
  //     ? testChar.resources[resource].qty
  //     : testChar.resources[resource]
  // ).toLocaleString()
);

console.log(resourceTypes, charResources);

describe("Character card components", () => {
  beforeEach(async () => {
    localStorage.setItem("prices", JSON.stringify(prices));
  });

  it("renders the character name", async () => {
    render(reduxWrap(<Character character={testChar} />));

    expect(await screen.findByText(testChar.name)).toBeInTheDocument();
    // screen.debug();
  });

  it("renders images for class", async () => {
    act(() => {
      render(reduxWrap(<Character character={testChar} />));
    });
    expect(screen.getByAltText(/class icon/)).toBeInTheDocument();
    expect(await screen.findByAltText(/class image/)).toBeInTheDocument();
    // iterate over resource types
    // an image with that alt text should be in the document
    // resourceList.forEach((resource) => {
    //   const resourceRegex = new RegExp(resource.slice(0, -1));
    //   expect(screen.getByAltText(resourceRegex)).toBeInTheDocument();
    // });
  });

  it("renders amounts for character properties", async () => {
    act(() => {
      render(reduxWrap(<Character character={testChar} />));
    });
    charResources.forEach((resource, index) => {
      if (resource !== undefined && index > 0)
        expect(screen.getByText(resource)).toBeInTheDocument();
    });
  });
});
