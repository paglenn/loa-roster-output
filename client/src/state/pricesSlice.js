import { createSlice } from "@reduxjs/toolkit";
import { prices } from "../utils/reference";
export const pricesSlice = createSlice({
  name: "prices",
  initialState: { value: { ...prices } },
  reducers: {
    update_prices: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    edit_price: (state, action) => {
      // action payload is a single key value pair
      state.value = { ...state.value, ...action.payload };
      localStorage.setItem("prices", JSON.stringify(state.value));
    },
  },
});

export const selectPrices = (state) => state.prices.value;
export const { update_prices, edit_price } = pricesSlice.actions;
export default pricesSlice.reducer;
