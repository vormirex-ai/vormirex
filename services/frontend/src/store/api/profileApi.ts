import { apiSlice } from "./apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/users/me/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/users/me/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    uploadProfilePhoto: builder.mutation({
      query: (formData) => ({
        url: "/users/me/profile-photo",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteProfilePhoto: builder.mutation<any, void>({
      query: () => ({
        url: "/users/me/profile-photo",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    getUserProfileById: builder.query({
      query: (id) => `/users/${id}/profile`,
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePhotoMutation,
  useDeleteProfilePhotoMutation,
  useGetUserProfileByIdQuery,
} = profileApi;
