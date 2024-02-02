import { configureStore, Middleware } from "@reduxjs/toolkit";
import { myApi } from "./api";
import { AuthSlice } from "./auth-slice";
import { authApi } from "../services/authApi";

export const store = configureStore({
  reducer: {
    myapi: myApi.reducer,
    authApi: authApi.reducer,
    authUser: AuthSlice.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
