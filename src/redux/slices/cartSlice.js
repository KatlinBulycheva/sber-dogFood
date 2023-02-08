import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const cartSlice = createSlice({
  name: "cart",
  initialState: initState.cart,
  reducers: {
    addProductToCart(state, action) {
      state.push({
        id: action.payload,
        count: 1,
        isChecked: false,
      });
    },
    removeProductFromCart(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export const cartReduce = cartSlice.reducer;
export const getCartSelector = (state) => state.cart;
