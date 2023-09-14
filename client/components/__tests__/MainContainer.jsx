/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MainContainer from "../MainContainer";

describe("Main Page", () => {
  it("renders Total Display", () => {
    render(<MainContainer />);
    //screen.debug();
    expect(screen.getByText("Total Weekly Output")).toBeInTheDocument();
  });
});
