import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  name: string;
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
  }),
});

export const { useCreateUserMutation } = myApi;
