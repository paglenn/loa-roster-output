/**
 * @jest-environment jsdom
 */
// import { fetch } from "whatwg-fetch";
import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "../MainPage";
import { Provider } from "react-redux";
import store from "../../state/store";
describe("Main Page", () => {
  it("renders Total Display", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Total Weekly Production")).toBeInTheDocument();
  });
});
