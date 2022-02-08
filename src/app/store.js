import { configureStore } from "@reduxjs/toolkit";
import launchesReducer from "../features/launches/launchesSlice";
import formReducer from "../features/form/formSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    formQuery: formReducer,
    paginationPage: paginationReducer,
  },
});
