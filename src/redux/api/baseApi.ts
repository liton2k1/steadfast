import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
 baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://157.230.240.97:9999/api/v1",
});


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});

export default baseApi;

