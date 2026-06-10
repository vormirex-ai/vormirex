import { apiSlice } from "./apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizQuestions: builder.query({
      query: (subjectId) => `/quizzes/${subjectId}/questions`,
    }),

    verifyQuizAnswer: builder.mutation({
      query: ({ questionId, selectedOption }) => ({
        url: `/quizzes/questions/${questionId}/verify`,
        method: "POST",
        body: {
          selectedOption,
        },
      }),
    }),

    submitQuiz: builder.mutation({
      query: (body) => ({
        url: "/quizzes/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quizzes"],
    }),

    getQuizStats: builder.query({
      query: () => "/quizzes/stats",
      providesTags: ["Quizzes"],
    }),

    getQuizHistory: builder.query({
      query: () => "/quizzes/history",
      providesTags: ["Quizzes"],
    }),

    getQuizHistoryBySubject: builder.query({
      query: (subjectId) => `/quizzes/history/${subjectId}`,
      providesTags: ["Quizzes"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetQuizQuestionsQuery,
  useVerifyQuizAnswerMutation,
  useSubmitQuizMutation,
  useGetQuizStatsQuery,
  useGetQuizHistoryQuery,
  useGetQuizHistoryBySubjectQuery,
} = quizzesApi;
