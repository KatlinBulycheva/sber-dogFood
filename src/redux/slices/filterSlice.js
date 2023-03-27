import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const searchSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchFilter(state, action) {
      state.search = action.payload;
    },
    clearSearchFilter(state) {
      state.search = '';
    }
  }
});

export const { changeSearchFilter, clearSearchFilter } = searchSlice.actions;
export const searchReduce = searchSlice.reducer;
export const getSearchSelector = (state) => state.filter.search;
