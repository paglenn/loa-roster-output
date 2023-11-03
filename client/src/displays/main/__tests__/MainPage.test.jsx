/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "../MainPage";

describe("Main Page", () => {
  it("renders Total Display", async () => {
    render(
      <BrowserRouter basename="">
        <Routes>
          <Route path="/" element={<MainPage user="test" />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText("Total Weekly Output")).toBeInTheDocument();
  });
});
