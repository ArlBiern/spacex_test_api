import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spacexAPI from "./launchesAPI";

export const getLaunches = createAsyncThunk(
  "launches/getLaunches",
  async ({ limit }, { dispatch, geteState }) => {
    const res = await spacexAPI.post("/query", {
      query: {
        upcoming: false || false,
      },
      options: {
        limit: limit,
        page: 1,
        sort: {
          date_unix: "desc",
        },
      },
    });
    return res.data;
  }
);
//https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
//https://docs.mongodb.com/manual/tutorial/query-documents/

const initialState = {
  value: [],
  status: "loading",
  nextPage: null,
  prevPage: null,
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
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
      state.totalPages = action.payload.totalPages;
      state.status = "success";
    },
    [getLaunches.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default launchesSlice.reducer;
