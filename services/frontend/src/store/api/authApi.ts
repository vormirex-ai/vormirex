import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    me: builder.query({
      query: () => "/auth/me",
    }),
    updateUiPreferences: builder.mutation({
      query: (preferences) => ({
        url: "/users/me/ui-preferences",
        method: "PATCH",
        body: preferences,
      }),
    }),

changePassword: builder.mutation({
  query: (data) => ({
    url: "/users/me/password",
    method: "PATCH",
    body: data,
  }),
}),

deleteAccount: builder.mutation<any, void>({
  query: () => ({
    url: "/users/me",
    method: "DELETE",
  }),
}),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useLazyMeQuery,
  useUpdateUiPreferencesMutation,
  useChangePasswordMutation,
   useDeleteAccountMutation,
} = authApi;
