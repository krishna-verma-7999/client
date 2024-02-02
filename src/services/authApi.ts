import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUser, CreatedUser } from "../types";

interface LoginDetails {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<CreatedUser, CreateUser>({
      query: (user) => ({
        url: "api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation<any, LoginDetails>({
      query: (user) => ({
        url: "api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = authApi;
