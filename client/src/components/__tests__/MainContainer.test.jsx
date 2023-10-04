/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { prices } from "../../utils/reference";
import MainContainer from "../MainContainer";
import { beforeEach } from "@jest/globals";

describe("Main Page", () => {
  beforeEach(() => {
    localStorage.setItem("prices", JSON.stringify(prices));
  });
  it("renders Total Display", async () => {
    render(<MainContainer />);
    expect(screen.getByText("Total Weekly Output")).toBeInTheDocument();
  });
});
