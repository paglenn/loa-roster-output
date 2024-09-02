import { Provider } from "react-redux";
import store from "../src/state/store";
import React from "react";
const reduxWrap = (component) => {
  return <Provider store={store}> {component} </Provider>;
};
export default reduxWrap;