/**
 * @jest-environment jsdom
 */
import Region, { regions } from "../Region";
import React from "react";
import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { reduxWrap } from "../../../../__mocks__/reduxWrap";
import "@testing-library/jest-dom";
test("the region list renders in order", () => {
  render(reduxWrap(<Region />));
  expect(screen.getByDisplayValue("North America East")).toBeInTheDocument();
});
