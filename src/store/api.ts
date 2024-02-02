import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface updateStatus {
  assignedId: string;
  updatedStatus: string;
}

export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    getUserByTokenId: builder.mutation<any, void>({
      query: () => ({
        url: "/api/auth/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getAllUser: builder.mutation<any, void>({
      query: () => ({
        url: "/api/auth/getAllUsers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    createTask: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/auth/createTask",
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getAllTodoTask: builder.mutation<any, void>({
      query: () => ({
        url: "/api/auth/getAllTask",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    updateTodoStatus: builder.mutation<any, updateStatus>({
      query: (updatedData) => ({
        url: "/api/auth/updateTask",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: updatedData,
      }),
    }),

    getUserById: builder.mutation<any, string>({
      query: (id) => ({
        url: "/api/auth/getUserById",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetUserByTokenIdMutation,
  useGetAllUserMutation,
  useCreateTaskMutation,
  useGetAllTodoTaskMutation,
  useUpdateTodoStatusMutation,
  useGetUserByIdMutation,
} = myApi;
