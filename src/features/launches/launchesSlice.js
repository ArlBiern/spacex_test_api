import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spacexAPI from "./launchesAPI";

const paginationLimit = 20;

export const getLaunches = createAsyncThunk(
  "launches/getLaunches",
  async (_, { getState }) => {
    let successQuery = getState().formQuery.successQuery
      ? [{ success: true }]
      : [{ success: false }, { success: true }, { success: null }];

    const res = await spacexAPI.post("/query", {
      query: {
        $or: successQuery,
        date_utc: {
          $gte: getState().formQuery.dateRange.dateGTE,
          $lte: getState().formQuery.dateRange.dateLTE,
        },
        name: {
          $regex: getState().formQuery.queryString,
          $options: "i",
        },
      },
      options: {
        limit: paginationLimit,
        page: getState().paginationPage,
        sort: {
          date_unix: "desc",
        },
      },
    });
    return res.data;
  }
);

const initialState = {
  value: [],
  status: "loading",
  totalPages: 0,
};

const launchesSlice = createSlice({
  name: "launches",
  initialState,
  extraReducers: {
    [getLaunches.pending]: (state) => {
      state.status = "loading";
    },
    [getLaunches.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.value = action.payload.docs;
      state.totalPages = action.payload.totalPages;
      state.status = "success";
    },
    [getLaunches.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default launchesSlice.reducer;
