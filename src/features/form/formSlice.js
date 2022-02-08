import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateRange: {
    dateGTE: "2000-01-01T00:00:00.000Z",
    dateLTE: `${new Date().getFullYear() + 2}-01-01T00:00:00.000Z`,
  },
  successQuery: false,
  queryString: "",
};

const formSlice = createSlice({
  name: "formQuery",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.dateRange.dateGTE = payload.dateRange.dateGTE;
      state.dateRange.dateLTE = payload.dateRange.dateLTE;
      state.successQuery = payload.successQuery;
      state.queryString = payload.queryString;
    },
  },
});

export const { setQuery } = formSlice.actions;

export default formSlice.reducer;
