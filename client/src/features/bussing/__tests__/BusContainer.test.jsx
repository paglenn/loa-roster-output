/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import reduxWrap from "../../../../__mocks__/reduxWrap";
import { buses } from "../state/busSlice";
import BusList from "../components/BusList";

test("container rendering with each bus name and price", () => {
  render(reduxWrap(<BusList />));
  Object.keys(buses).forEach((busName) => {
    const busQty = buses[busName].num;
    const busPrice = buses[busName].price;
    expect(screen.getByText(busName)).toBeInTheDocument();
    expect(screen.getAllByDisplayValue(busQty).length).toBeGreaterThan(0);
    expect(screen.getAllByDisplayValue(busPrice).length).toBeGreaterThan(0);
  });
});
