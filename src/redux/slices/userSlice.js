import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setTokenUser(state, action) {
      state.token = action.payload;
    },
    setDataUser(state, action) {
      return {
        ...state,
        name: action.payload.name,
        about: action.payload.about,
        avatar: action.payload.avatar,
        email: action.payload.email
      };
    }
  }
});

export const {
  setTokenUser, setDataUser
} = userSlice.actions;
export const userReduce = userSlice.reducer;
export const getTokenSelector = (state) => state.user.token;
export const getUserSelector = (state) => state.user;
