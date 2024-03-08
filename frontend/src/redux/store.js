import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "../redux/slice/data"
import cartReducer from "../redux/slice/cart"

export const store = configureStore({
    reducer: {
        data:DataReducer,
        cart:cartReducer
     
    },
  });