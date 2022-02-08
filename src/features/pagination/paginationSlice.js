import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const paginationSlice = createSlice({
  name: "paginationPage",
  initialState,
  reducers: {
    setPageNumber: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export const { setPageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
