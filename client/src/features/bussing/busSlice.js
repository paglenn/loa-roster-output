import { createSlice } from "@reduxjs/toolkit";
const raids = [
  "Valtan",
  "Vykas",
  "Kakul-Saydon",
  "Brelshaza",
  "Kayangel",
  "Akkan",
];
const storedBuses = JSON.parse(localStorage.getItem("buses"));

const buses =
  storedBuses ??
  raids.reduce((obj, raid) => {
    obj[raid] = { price: 1000, num: 0 };
    return obj;
  }, {});

const busSlice = createSlice({
  name: "buses",
  initialState: {
    value: { ...buses },
  },
  reducers: {
    update_bus: (state, action) => {
      state.value = { ...state.value, ...action.payload };
      localStorage.setItem("buses", JSON.stringify(state.value));
    },
  },
});

export default busSlice.reducer;
export const { update_bus } = busSlice.actions;
export const selectBuses = (state) => state.buses.value;
export { buses }; // for testing
