import { apiSlice } from "./apiSlice";

export const challengesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodayChallenge: builder.query({
      query: () => "/challenges/today",
      providesTags: ["Challenges"],
    }),
    submitChallenge: builder.mutation({
      query: (payload) => ({
        url: "/challenges/submit",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Challenges"],
    }),
    getChallengeHistory: builder.query({
      query: () => "/challenges/history",
      providesTags: ["Challenges"],
    }),
    getUserStreak: builder.query({
      query: () => "/challenges/streak",
      providesTags: ["Challenges"],
    }),
    getChallengeCalendar: builder.query({
      query: (month) => `/challenges/calendar/${month}`,
      providesTags: ["Challenges"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodayChallengeQuery,
  useSubmitChallengeMutation,
  useGetChallengeHistoryQuery,
  useGetUserStreakQuery,
  useGetChallengeCalendarQuery,
} = challengesApi;
