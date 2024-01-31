import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";
import { AuthSlice } from "./auth-slice";

export const store = configureStore({
  reducer: {
    myapi: myApi.reducer,
    authUser: AuthSlice.reducer,
  },
  // @ts-ignore
  middleware: (mid) => mid().concat(myApi.middleware),
});
