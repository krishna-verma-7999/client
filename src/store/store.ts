import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";

export const store = configureStore({
  reducer: {
    myapi: myApi.reducer,
  },
  // @ts-ignore
  middleware: (mid) => mid().concat(myApi.middleware),
});
