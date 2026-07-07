import { apiSlice } from "./apiSlice";

export const leaderboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<any, "weekly" | "monthly" | "all-time">({
      query: (filter = "weekly") => ({
        url: "/leaderboard",
        params: {
          filter,
        },
      }),
      providesTags: ["Leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
