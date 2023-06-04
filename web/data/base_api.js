import getFirebaseClientIdToken from "@helpers/get_id_token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  refetchOnReconnect: true,
  reducerPath: "baseApi",
  tagTypes: ["Expenditure"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await getFirebaseClientIdToken();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExpenditures: builder.query({
      query: () => ({ url: `/expenditures/`, method: "GET" }),
    }),

    getExpenditure: builder.query({
      query: (id) => `/expenditures/${id}`,
    }),

    addExpenditure: builder.mutation({
      query: (body) => ({
        url: `/expenditures/`,
        method: "POST",
        body,
      }),
    }),

    updateExpenditure: builder.mutation({
      query: ({ id, body }) => ({
        url: `/expenditures/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteExpenditure: builder.mutation({
      query: (id) => ({
        url: `/expenditures/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddExpenditureMutation,
  useDeleteExpenditureMutation,
  useGetExpenditureQuery,
  useGetExpendituresQuery,
  useUpdateExpenditureMutation,
} = baseApi;
