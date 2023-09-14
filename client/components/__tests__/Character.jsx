/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Character from "../Character";
import { handleDelete } from "../../features/delete";

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
beforeAll(() => {
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
  });
});
