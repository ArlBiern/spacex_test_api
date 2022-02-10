import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spacexAPI from "./launchesAPI";

const paginationLimit = 20;

const selectFields = [
  "_id",
  "crew",
  "date_unix",
  "date_utc",
  "flight_number",
  "links.flickr.original",
  "name",
  "rocket",
  "success",
  "launchpad",
  "details",
];

const populateFields = [
  {
    path: "rocket",
    select: {
      name: 1,
    },
  },
  {
    path: "launchpad",
    select: {
      name: 1,
      locality: 1,
    },
  },
];

export const getLaunches = createAsyncThunk(
  "launches/getLaunches",
  async (_, { getState }) => {
    let successQuery = getState().formQuery.successQuery
      ? [{ success: true }]
      : [{ success: false }, { success: true }, { success: null }];

    let finalDateQuery =
      getState().formQuery.dateRange.dateLTE ===
      getState().formQuery.dateRange.dateGTE
        ? getState().formQuery.dateRange.dateLTE.replace(
            "00:00:00.000Z",
            "23:59:59.000Z"
          )
        : getState().formQuery.dateRange.dateLTE;

    const res = await spacexAPI.post("/query", {
      query: {
        $or: successQuery,
        date_utc: {
          $gte: getState().formQuery.dateRange.dateGTE,
          $lte: finalDateQuery,
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
        select: selectFields,
        populate: populateFields,
      },
    });
    return res.data;
  }
);

export const getLaunch = createAsyncThunk(
  "launch/getLaunch",
  async (launchId) => {
    const res = await spacexAPI.post("/query", {
      query: {
        _id: launchId,
      },
      options: {
        select: selectFields,
        populate: populateFields,
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
      state.value = action.payload.docs;
      state.totalPages = action.payload.totalPages;
      state.status = "success";
    },
    [getLaunches.rejected]: (state) => {
      state.status = "failed";
    },
    [getLaunch.pending]: (state) => {
      state.status = "loading";
    },
    [getLaunch.fulfilled]: (state, action) => {
      state.value.push(action.payload.docs[0]);
      state.status = "success";
    },
    [getLaunch.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default launchesSlice.reducer;
