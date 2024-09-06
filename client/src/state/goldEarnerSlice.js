import { createSlice } from "@reduxjs/toolkit";
export const goldEarnersSlice = createSlice({
  name: "goldEarners",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setGoldEarners: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const selectGoldEarners = (state) => state.goldEarners.value;
export const { increment, decrement, setGoldEarners } =
  goldEarnersSlice.actions;
export default goldEarnersSlice.reducer;
