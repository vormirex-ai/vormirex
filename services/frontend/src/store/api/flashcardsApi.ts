import { apiSlice } from "./apiSlice";

export const flashcardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashcardDecks: builder.query<any, void>({
      query: () => "/flashcards/decks",
      providesTags: ["Flashcards"],
    }),

    getDeckCards: builder.query<any, string>({
      query: (deckId) => `/flashcards/decks/${deckId}/cards`,
      providesTags: ["Flashcards"],
    }),

    getDueCards: builder.query<any, string>({
      query: (deckId) => `/flashcards/decks/${deckId}/due`,
      providesTags: ["Flashcards"],
    }),

    submitFlashcardProgress: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/flashcards/progress",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Flashcards"],
    }),

    completeFlashcardSession: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/flashcards/sessions/complete",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Flashcards"],
    }),

    getFlashcardStats: builder.query<any, void>({
      query: () => "/flashcards/stats",
      providesTags: ["Flashcards"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFlashcardDecksQuery,
  useGetDeckCardsQuery,
  useGetDueCardsQuery,
  useSubmitFlashcardProgressMutation,
  useCompleteFlashcardSessionMutation,
  useGetFlashcardStatsQuery,
} = flashcardsApi;
