import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./reducer/index";

export const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
});
