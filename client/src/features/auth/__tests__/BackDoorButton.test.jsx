/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BackDoorButton } from "../components/BackdoorButton";
import reduxWrap from "../../../../__mocks__/reduxWrap";
import * as api from "../../../utils/api";
const mockNavigate = jest.fn();
//jest.mock("cn");

import axios from "axios";
jest.mock("axios");
jest.mock("../../../utils/api");
describe("Backdoor button", () => {
  it(" does not invokes navigate function if isadmin returns false", async () => {
    render(reduxWrap(<BackDoorButton navigate={mockNavigate} />));

    const apiMock = jest.spyOn(api, "checkAdmin");
    apiMock.mockResolvedValue(false);
    const user = userEvent.setup();
    await user.click(screen.getByRole("backdoor"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("invokes navigate function if isadmin returns true", async () => {
    render(reduxWrap(<BackDoorButton navigate={mockNavigate} />));
    const apiMock = jest.spyOn(api, "checkAdmin");
    apiMock.mockResolvedValue(true);
    const user = userEvent.setup();
    await user.click(screen.getByRole("backdoor"));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
