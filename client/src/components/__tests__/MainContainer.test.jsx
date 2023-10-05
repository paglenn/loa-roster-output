/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContainer from "../MainContainer";
// import axios from "axios";
// jest.mock("axios");
describe("Main Page", () => {
  it("renders Total Display", async () => {
    render(<MainContainer user="test" />);
    expect(screen.getByText("Total Weekly Output")).toBeInTheDocument();
  });
});
