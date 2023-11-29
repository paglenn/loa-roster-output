import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
  name: "region",
  initialState: {
    value: "North America East",
  },
  reducers: {
    region_change: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { region_change } = regionSlice.actions;
export const selectRegion = (state) => state.region.value;
export default regionSlice.reducer;
