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
    counterIncrementProduct(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
    },
    counterDecrementProduct(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count - 1,
          };
        }
        return product;
      });
    }
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  counterIncrementProduct,
  counterDecrementProduct
} = cartSlice.actions;
export const cartReduce = cartSlice.reducer;
export const getCartSelector = (state) => state.cart;
