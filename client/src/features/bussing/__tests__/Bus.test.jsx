/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { test, expect, describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import reduxWrap from "../../../../__mocks__/reduxWrap";

import Bus from "../components/Bus";

describe("Bus price and quantity edits", () => {
  test("bus price edit calls dispatcher ", () => {
    // arrange
    render(reduxWrap(<Bus name={"Brelshaza"} price={1000} num={0} />));
  });
});
