import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const selectUser = (state) => state.user.value;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
