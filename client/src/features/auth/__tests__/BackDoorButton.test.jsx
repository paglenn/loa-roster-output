/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BackDoorButton } from "../components/BackdoorButton";
import { reduxWrap } from "../../../../__mocks__/reduxWrap";
const mockNavigate = jest.fn();

import axios from "axios";
jest.mock("axios");
test("Backdoor Button invokes navigate function only if isadmin returns true", async () => {
  render(reduxWrap(<BackDoorButton navigate={mockNavigate} />));
  const user = userEvent.setup();
  await user.click(screen.getByRole("backdoor"));
  expect(mockNavigate).not.toHaveBeenCalled();
});
