import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setTokenUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload;
    }
  }
});

export const { setTokenUser } = userSlice.actions;
export const userReduce = userSlice.reducer;
export const getTokenSelector = (state) => state.user.token;
