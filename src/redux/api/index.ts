import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://68371657664e72d28e437de3.mockapi.io",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDgzMjQxODcsImV4cCI6MTc0ODMyNzc4N30.xyuCmW_diGJvRoe_PXNPtLokypkt0gxIuPnfDUbJDas";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["STUDENTS", "COMMENTS", "CENTERS"]
});

export const {} = mainApi;
