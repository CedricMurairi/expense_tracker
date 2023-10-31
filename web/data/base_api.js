import getFirebaseClientIdToken from "@helpers/get_id_token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Expenditures", "Settings", "Goals", "Recommendations"],
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
    // EXPENDITURES
    getExpenditures: builder.query({
      query: () => ({
        url: `/expenditures/`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Expenditures"],
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
      invalidatesTags: ["Expenditures"],
    }),

    updateExpenditure: builder.mutation({
      query: ({ id, body }) => ({
        url: `/expenditures/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Expenditures"],
    }),

    deleteExpenditure: builder.mutation({
      query: (id) => ({
        url: `/expenditures/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenditures"],
    }),

    // DATA AND SETTINGS
    getDataAndSettings: builder.query({
      query: () => ({
        url: `/settings/`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Settings"],
    }),

    setIncome: builder.mutation({
      query: (body) => ({
        url: `/settings/income`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    setWeights: builder.mutation({
      query: (body) => ({
        url: `/settings/weights`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    // GOALS AND SAVINGS
    getGoals: builder.query({
      query: () => ({
        url: '/goals/',
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Goals"],
    }),

    setGoal: builder.mutation({
      query: (body) => ({
        url: "/goals/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Goals"],
    }),

    updateGoal: builder.mutation({
      query: ({ id, body }) => ({
        url: `/goals/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Goals"],
    }),

    // RECONNENDATIONS
    getRecommendations: builder.query({
      query: () => ({
        url: '/recommendations/',
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Recommendations"],
    }),


  }),
});

export const {
  useAddExpenditureMutation,
  useDeleteExpenditureMutation,
  useGetExpenditureQuery,
  useGetExpendituresQuery,
  useGetRecommendationsQuery,
  useUpdateExpenditureMutation,
  useGetDataAndSettingsQuery,
  useSetIncomeMutation,
  useSetWeightsMutation,
  useSetGoalMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation,
} = baseApi;
