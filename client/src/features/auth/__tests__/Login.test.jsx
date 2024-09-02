/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import reduxWrap  from "../../../../__mocks__/reduxWrap";

//login component should be the default when app is rendered (i.e. is the main page)

let mockHook = jest.fn();
jest.mock("axios");

const renderComponent = () => {
  render(
    reduxWrap(
      <BrowserRouter>
        <Routes>
          <Route element={<Login  />} path="/" />
          <Route element={<Login />} path="/app" />
        </Routes>
      </BrowserRouter>
    )
  );
};
// login component should have username and password fields
beforeEach(renderComponent);
// click handler shoould be invoked with username and password when login button is pressed
describe("Login fields", () => {
  test("Email address & password fields render", () => {
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("renders button to route to signup", async () => {
    expect(screen.getByRole("reroute-signup")).toBeInTheDocument();
  });
});

describe("Button functionality ", () => {
  test("incorrect username/password causes warning to render", async () => {
    // first check that the text doesn't render by default
    expect(
      screen.queryByText("Incorrect username or password!")
    ).not.toBeInTheDocument();
    // mock axios call
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { auth: false } })
    );
    // generate user event
    const user = userEvent.setup();
    await user.click(screen.getByRole("login"));

    // expect incorrect text to render
    expect(
      screen.getByText("Incorrect username or password!")
    ).toBeInTheDocument();
  });

  test("backdoor button only renders if test user", async () => {
    expect(screen.queryByRole("backdoor")).not.toBeInTheDocument();
    // set local storage and rerender so backdoor should now render
    localStorage.setItem("user", "test");
    renderComponent();
    expect(screen.queryByRole("backdoor")).toBeInTheDocument();
  });
});
