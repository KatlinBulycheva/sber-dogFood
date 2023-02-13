import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchFilter(state, action) {
      state.search = action.payload;
    }
  }
});

export const { changeSearchFilter } = filterSlice.actions;
export const filterReduce = filterSlice.reducer;
export const getFilterSelector = (state) => state.filter.search;
