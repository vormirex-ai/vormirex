import { apiSlice } from "./apiSlice";

export const focusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFocusData: builder.query({
      query: () => "/focus",
      providesTags: ["Focus"],
    }),

    createFocusTask: builder.mutation({
      query: (body) => ({
        url: "/focus/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Focus"],
    }),

    updateFocusTask: builder.mutation({
      query: ({ id, body }) => ({
        url: `/focus/tasks/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Focus"],
    }),

    deleteFocusTask: builder.mutation({
      query: (id) => ({
        url: `/focus/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Focus"],
    }),

    createFocusSession: builder.mutation({
      query: (body) => ({
        url: "/focus/sessions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Focus"],
    }),
  }),
});

export const {
  useGetFocusDataQuery,
  useCreateFocusTaskMutation,
  useUpdateFocusTaskMutation,
  useDeleteFocusTaskMutation,
  useCreateFocusSessionMutation,
} = focusApi;