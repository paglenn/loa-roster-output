/**
 * @jest-environment jsdom
 */
import ContentView from "../components/ContentView";
import React from "react";
import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import  reduxWrap from "../../../../__mocks__/reduxWrap";
const contentList = [
  {
    _id: "6536cbe623c43fa229317e23",
    name: "ivory_tower",
    level: "hard",
    ilvl: 1600,
    gold: 14000,
    chest_cost: 5500,
  },
  {
    _id: "650c40323892b488ecc697d2",
    name: "akkan",
    level: "hard",
    ilvl: 1600,
    gold: 10000,
    chest_cost: 4500,
  },
  {
    _id: "649b298d08972ea913c78d9a",
    name: "kayangel",
    level: "hard",
    ilvl: 1580,
    gold: 6500,
  },
];

test("content view rendering", () => {
  render(
    reduxWrap(
      <ContentView character={{ ilvl: 1600, goldContents: contentList }} />
    )
  );
  screen
    .findAllByRole("content")
    .then((items) => expect(items.length).toEqual(3));
});

// test("single content renders with image", () => {
//   render(<Content content={contentList[0]} />);

// });
