import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initState.favorites,
  reducers: {
    addProductToFavorites(state, action) {
      state.push(action.payload);
    },
    removeProductFromFavorites(state, action) {
      return state.filter((productId) => productId !== action.payload);
    },
    clearFavorites() {
      return [];
    },
  },
});

export const {
  addProductToFavorites,
  removeProductFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;
export const favoriteReduce = favoritesSlice.reducer;
export const getFavoritesSelector = (state) => state.favorites;
