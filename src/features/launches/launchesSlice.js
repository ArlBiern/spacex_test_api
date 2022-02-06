import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spacexAPI from "./launchesAPI";

export const getLaunches = createAsyncThunk(
  "launches/getLaunches",
  async () => {
    /* try { */
    const res = await spacexAPI.get("/");
    return res.data;
    /* } catch (err) {
      console.dir(err.message);
    } */
  }
);

const initialState = {
  value: [],
  status: null,
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
      state.value = action.payload;
      state.status = "success";
    },
    [getLaunches.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default launchesSlice.reducer;
