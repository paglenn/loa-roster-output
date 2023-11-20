import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "../features/region_change/regionSlice";
export default configureStore({
  reducer: {
    region: regionReducer,
  },
});
