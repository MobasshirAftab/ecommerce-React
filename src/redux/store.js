import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./casrtSlice";
import rootReducer from "./casrtSlice";

const store = configureStore({
  reducer: rootReducer
});

export default store;