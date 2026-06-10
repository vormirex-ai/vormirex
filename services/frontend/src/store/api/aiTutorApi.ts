import { apiSlice } from "./apiSlice";

export const aiTutorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAiChatHistory: builder.query({
      query: (lessonId) => `/ai-tutor/chats/${lessonId}`,
      providesTags: ["AiChats"],
    }),
    sendAiMessage: builder.mutation({
      query: ({ lessonId, message }) => ({
        url: `/ai-tutor/chats/${lessonId}/message`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["AiChats"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAiChatHistoryQuery, useSendAiMessageMutation } =
  aiTutorApi;
