import { Provider } from "react-redux";
import store from "../src/state/store";
import React from "react";
export const reduxWrap = (component) => {
  return <Provider store={store}> {component} </Provider>;
};
