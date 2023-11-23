import { createSlice } from "@reduxjs/toolkit";
import { prices } from "../utils/reference";
export const pricesSlice = createSlice({
  name: "prices",
  initialState: { ...prices },
  reducers: {
    update_prices: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectPrices = (state) => state.prices.value;
export const { update_prices } = pricesSlice.actions;
export default pricesSlice.reducer;
