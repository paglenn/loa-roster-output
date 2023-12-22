// characterSlice.js
// for working character to which changes are being made

import { createSlice } from "@reduxjs/toolkit";
const charTemplate = {
  name: "",
  ilvl: "",
  _class: "",
  isGoldEarner: false,
  restedOnly: false,
  user: "",
};
const charSlice = createSlice({
  name: "character",
  initialState: {
    value: { ...charTemplate },
  },
  reducers: {
    update_character: (state, payload) => {
      state.value = payload;
    },
    reset_character: (state) => {
      state.value = { ...charTemplate };
    },
  },
});

export const selectCharacter = (state) => state.character.value;
export default charSlice.reducer;
export const { update_character, reset_character } = charSlice.actions;
