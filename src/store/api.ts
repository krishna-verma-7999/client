import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginDetails {
  email: string;
  password: string;
}

export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, User>({
      query: (user) => ({
        url: "api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation<LoginDetails, any>({
      query: (user) => ({
        url: "api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getUserByTokenId: builder.mutation<any, string>({
      query: (token) => ({
        url: "/api/auth/user",
        method: "POST",
        body: { token: token },
      }),
    }),
    getAllUser: builder.mutation<any, string>({
      query: (token) => ({
        url: "/api/auth/getAllUsers",
        method: "POST",
        body: { token: token },
      }),
    }),
    createTask: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/auth/createTask",
        method: "POST",
        body: body,
      }),
    }),
    getAllTodoTask: builder.mutation<any, any>({
      query: (token) => ({
        url: "/api/auth/getAllTask",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserByTokenIdMutation,
  useGetAllUserMutation,
  useCreateTaskMutation,
  useGetAllTodoTaskMutation,
} = myApi;
