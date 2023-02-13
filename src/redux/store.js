import { configureStore } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../utils/constants";
import { getInitState } from "./initState";
import { cartReduce } from "./slices/cartSlice";
import { filterReduce } from "./slices/filterSlice";
import { userReduce } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReduce,
    filter: filterReduce,
    cart: cartReduce
  },
  preloadedState: getInitState()
});

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));
});
