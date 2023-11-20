import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "../features/region_change/regionSlice";
import priceReducer from "./pricesSlice";
export default configureStore({
  reducer: {
    region: regionReducer,
    prices: priceReducer,
  },
});
