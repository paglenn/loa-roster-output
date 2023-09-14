/**
 * @jest-environment jsdom
 */
import { fetch } from "whatwg-fetch";
import * as React from "react";
import { render, screen } from "@testing-library/react";

import MainContainer from "../../../MainContainer";

describe("Main Page", () => {
  it("renders Main Container", () => {
    render(<MainContainer />);
    screen.debug();
  });
});
