import { createSlice } from "@reduxjs/toolkit";

const rosterSlice = createSlice({
  name: "roster",
  initialState: {
    characters: [],
  },
  reducers: {
    update_roster: (state, action) => {
      state.characters = action.payload;
    },
  },
});

export default rosterSlice.reducer;
export const selectRoster = (state) => state.roster.characters;
export const { update_roster } = rosterSlice.actions;
