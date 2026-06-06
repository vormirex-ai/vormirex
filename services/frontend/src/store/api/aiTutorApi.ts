import { apiSlice } from "./apiSlice";

export const aiTutorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAiChatHistory: builder.query({
      query: (lessonId) => `/ai-tutor/chats/${lessonId}`,
      providesTags: ["AiChats"],
    }),
    sendAiMessage: builder.mutation({
      query: (body) => ({
        url: "/ai-tutor/chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AiChats"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAiChatHistoryQuery,
  useSendAiMessageMutation,
} = aiTutorApi;
