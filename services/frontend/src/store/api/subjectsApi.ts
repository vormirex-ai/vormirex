import { apiSlice } from "./apiSlice";

export const subjectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<any, { page?: number; limit?: number } | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 10;
        return `/subjects?page=${page}&limit=${limit}`;
      },
      providesTags: ["Subjects"],
    }),
    getSubjectDetails: builder.query({
      query: (subjectId) => `/subjects/${subjectId}`,
      providesTags: (_result, _error, arg) => [{ type: "Subjects", id: arg }],
    }),
    getSubjectCurriculum: builder.query({
      query: (subjectId) => `/subjects/${subjectId}/curriculum`,
    }),
    getSubjectContinue: builder.query({
      query: (subjectId) => `/subjects/${subjectId}/continue`,
    }),
    getSubjectLessons: builder.query({
      query: (subjectId) => `/lessons/${subjectId}`,
    }),
    updateLessonProgress: builder.mutation({
      query: (subjectId) => ({
        url: `/lessons/${subjectId}/progress`,
        method: "POST",
      }),
      invalidatesTags: ["Subjects"],
    }),
    completeSubjectCurriculum: builder.mutation({
      query: (subjectId) => ({
        url: `/lessons/${subjectId}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["Subjects"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubjectsQuery,
  useGetSubjectDetailsQuery,
  useGetSubjectCurriculumQuery,
  useGetSubjectContinueQuery,
  useGetSubjectLessonsQuery,
  useUpdateLessonProgressMutation,
  useCompleteSubjectCurriculumMutation,
} = subjectsApi;
