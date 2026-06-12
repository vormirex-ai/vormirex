import { apiSlice } from "./apiSlice";

export const challengesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodayChallenge: builder.query<any, void>({
      query: () => "/challenges/today",
      providesTags: ["Challenges"],
    }),

    submitChallenge: builder.mutation<any, any>({
      query: (body) => ({
        url: "/challenges/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Challenges"],
    }),

    verifyChallengeQuestion: builder.mutation<
      any,
      { questionId: string; body: any }
    >({
      query: ({ questionId, body }) => ({
        url: `/challenges/questions/${questionId}/verify`,
        method: "POST",
        body,
      }),
    }),

    getChallengeHistory: builder.query<any, void>({
      query: () => "/challenges/history",
      providesTags: ["Challenges"],
    }),

    getUserStreak: builder.query<any, void>({
      query: () => "/challenges/streak",
      providesTags: ["Challenges"],
    }),

    getChallengeCalendar: builder.query<any, string>({
      query: (month) => `/challenges/calendar/${month}`,
      providesTags: ["Challenges"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTodayChallengeQuery,
  useSubmitChallengeMutation,
  useVerifyChallengeQuestionMutation,
  useGetChallengeHistoryQuery,
  useGetUserStreakQuery,
  useGetChallengeCalendarQuery,
} = challengesApi;
