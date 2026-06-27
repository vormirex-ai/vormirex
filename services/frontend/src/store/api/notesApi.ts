import { apiSlice } from "./apiSlice";

export const notesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<any, void>({
      query: () => "/notes",
      providesTags: ["Notes"],
    }),

    getNoteById: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: ["Notes"],
    }),

    createNote: builder.mutation({
      query: (formData) => ({
        url: "/notes",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Notes"],
    }),

updateNote: builder.mutation({
  query: ({ id, body }) => ({
    url: `/notes/${id}`,
    method: "PATCH",
    body,
  }),
  invalidatesTags: ["Notes"],
}),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),

downloadNote: builder.mutation<Blob, string>({
  query: (id) => ({
    url: `/notes/${id}/download`,
    method: "GET",
    responseHandler: async (response) => await response.blob(),
  }),
}),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useDownloadNoteMutation,
} = notesApi;
