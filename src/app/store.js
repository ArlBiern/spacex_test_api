import { configureStore } from "@reduxjs/toolkit";
import launchesReducer from "../features/launches/launchesSlice";

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
  },
});
