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
    },
    setChecked(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            isChecked: true,
          };
        }
        return product;
      });
    },
    setUnChecked(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            isChecked: false,
          };
        }
        return product;
      });
    },
    clearCart() {
      return [];
    },
    checkAllProducts(state) {
      return state.map((product) => ({
        ...product,
        isChecked: true
      }));
    },
    uncheckAllProducts(state) {
      return state.map((product) => ({
        ...product,
        isChecked: false
      }));
    }
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  counterIncrementProduct,
  counterDecrementProduct,
  setChecked,
  setUnChecked,
  clearCart,
  checkAllProducts,
  uncheckAllProducts
} = cartSlice.actions;
export const cartReduce = cartSlice.reducer;
export const getCartSelector = (state) => state.cart;
