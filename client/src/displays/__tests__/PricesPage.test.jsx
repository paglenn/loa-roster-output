/**
 * @jest-environment jsdom
 */
import React from "react";
import reduxWrap from "../../../__mocks__/reduxWrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe } from "@jest/globals";
import PricesPage from "../PricesPage";
import { PricesService } from "../../services";
describe("prices page", () => {
  test("renders with charts, edit prices, and edit busses containers", () => {
    // arrange
    // mock pricesService.GetAll and Create function for effect hook
    const pricesService = new PricesService();
    const mockCreatePrices = jest.spyOn(pricesService, "Create");
    mockCreatePrices.mockResolvedValue(undefined);
    const mockGetPrices = jest.spyOn(pricesService, "GetAll");
    mockGetPrices.mockResolvedValue(null);
    render(
      reduxWrap(
        <BrowserRouter basename="">
          <Routes>
            <Route
              path="/"
              element={<PricesPage pricesService={pricesService} />}
            />
          </Routes>
        </BrowserRouter>
      )
    );

    // assert

    expect(screen.getByText("Edit Prices")).toBeInTheDocument();
    expect(screen.getByText("Buses")).toBeInTheDocument();
  });
});
