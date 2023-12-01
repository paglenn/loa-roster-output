import { createSlice } from "@reduxjs/toolkit";
import { prices } from "../utils/reference";
const storedSalesString = localStorage.getItem("sales");
const storedSales = storedSalesString ? JSON.parse(storedSalesString) : null;

const defaultSales =
  storedSales ??
  Object.keys(prices).reduce((obj, item) => {
    obj[item] = true;
    return obj;
  }, {});
const salesSlice = createSlice({
  name: "sales",
  initialState: {
    value: { ...defaultSales },
  },
  reducers: {
    update_sale: (state, action) => {
      state.value = { ...state.value, ...action.payload };
      localStorage.setItem("sales", JSON.stringify(state.value));
    },
  },
});

export default salesSlice.reducer;
export const { update_sale } = salesSlice.actions;
export const selectSales = (state) => state.sales.value;
