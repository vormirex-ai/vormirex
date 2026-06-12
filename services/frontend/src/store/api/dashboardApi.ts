import { apiSlice } from "./apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, void>({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
