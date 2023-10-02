/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Login } from "../components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//login component should be the default when app is rendered (i.e. is the main page)

let mockHook = jest.fn();
// login component should have username and password fields
beforeEach(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<Login setUser={mockHook} />} path="/" />
      </Routes>
    </BrowserRouter>
  );
});
// click handler shoould be invoked with username and password when login button is pressed
describe("Login fields", () => {
  test("Email address & password fields render", () => {
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
});

describe("Buttons", () => {
  xtest("Login button should call submit handler when button is clicked", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(mockHandler).toHaveBeenCalled();
  });

  test("renders button to route to signup", async () => {
    expect(screen.getByRole("reroute-signup")).toBeInTheDocument();
  });

  test("backdoor button rendering", async () => {
    expect(screen.getByRole("backdoor")).toBeInTheDocument();
  });
});
