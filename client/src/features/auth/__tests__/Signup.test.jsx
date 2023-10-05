/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Signup } from "../components/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

//login component should be the default when app is rendered (i.e. is the main page)

let mockHook = jest.fn();
const renderComponent = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<Signup setUser={mockHook} />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};
jest.mock("axios");

describe("Signup field rendering", () => {
  beforeEach(renderComponent);
  test("Email address , username & password fields render", () => {
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Username (Optional)")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Re-Enter Password")
    ).toBeInTheDocument();
  });

  test("renders button to route to login", async () => {
    expect(screen.getByRole("reroute-login")).toBeInTheDocument();
  });

  test("backdoor button only renders if test user", async () => {
    expect(screen.queryByRole("backdoor")).not.toBeInTheDocument();
    // set local storage and rerender so backdoor should now render
    localStorage.setItem("user", "test");
    renderComponent();
    expect(screen.queryByRole("backdoor")).toBeInTheDocument();
  });
});

describe("Signup validation", () => {
  test("validates that all fields are filled", async () => {
    renderComponent();
    expect(
      screen.queryByText("Must enter both username and password!")
    ).not.toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole("signup"));
    expect(
      screen.getByText("Must enter both username and password!")
    ).toBeInTheDocument();
  });

  test("validates that passwords match", async () => {
    // render component
    renderComponent();
    // enerate user event
    const user = userEvent.setup();
    // paste username
    await user.tab();
    await user.paste("test");
    await user.tab(); // skip username field
    // paste password1

    await user.tab();
    await user.paste("alice");
    // paste password2
    await user.tab();
    await user.paste("bob");

    // click sign up
    await user.click(screen.getByRole("signup"));
    expect(
      screen.getByText("Entered passwords must match!")
    ).toBeInTheDocument();
  });
});
