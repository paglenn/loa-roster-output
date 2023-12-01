import { configureStore } from "@reduxjs/toolkit";
import { regionReducer } from "../features/region_change";
import priceReducer from "./pricesSlice";
import userReducer from "./userSlice";
import { salesReducer } from "../features/edit_prices";
import { busReducer } from "../features/bussing";
export default configureStore({
  reducer: {
    region: regionReducer,
    prices: priceReducer,
    user: userReducer,
    sales: salesReducer,
    buses: busReducer,
  },
});
