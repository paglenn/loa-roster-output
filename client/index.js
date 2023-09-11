import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import MainContainer from "./MainContainer";
import "./index.css";
const App = () => {
  return <MainContainer />;
};

//ReactDOM.render(<App />, document.getElementById("app"));
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
