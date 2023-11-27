import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "../features/region_change/regionSlice";
import priceReducer from "./pricesSlice";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    region: regionReducer,
    prices: priceReducer,
    user: userReducer,
  },
});
