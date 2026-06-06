import { apiSlice } from "./apiSlice";

export const flashcardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashcardDecks: builder.query({
      query: () => "/flashcards/decks",
      providesTags: ["Flashcards"],
    }),
    getDueCards: builder.query({
      query: (deckId) => `/flashcards/decks/${deckId}/due`,
      providesTags: ["Flashcards"],
    }),
    submitFlashcardProgress: builder.mutation({
      query: (payload) => ({
        url: "/flashcards/progress",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Flashcards"],
    }),
    getFlashcardStats: builder.query({
      query: () => "/flashcards/stats",
      providesTags: ["Flashcards"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFlashcardDecksQuery,
  useGetDueCardsQuery,
  useSubmitFlashcardProgressMutation,
  useGetFlashcardStatsQuery,
} = flashcardsApi;
