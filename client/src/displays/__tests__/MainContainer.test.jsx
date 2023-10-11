/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "../MainPage";

describe("Main Page", () => {
  it("renders Total Display", async () => {
    render(<MainPage user="test" />);
    expect(screen.getByText("Total Weekly Output")).toBeInTheDocument();
  });
});
