import { apiSlice } from "./apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getQuizQuestions: builder.query({
      query: (subjectId) => `/quizzes/${subjectId}/questions`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitQuizMutation,
  useGetQuizStatsQuery,
  useGetQuizHistoryQuery,
  useGetQuizHistoryBySubjectQuery,
  useGetQuizQuestionsQuery,
} = quizzesApi;
