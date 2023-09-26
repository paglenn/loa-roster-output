import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
