import { apiSlice } from "./apiSlice";


export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
getNotifications: builder.query({
  query: ({ page = 1, limit = 10 }) =>
    `/notifications?page=${page}&limit=${limit}`,
  providesTags: ["Notifications"],
}),


    getNotificationStats: builder.query({
      query: () => "/notifications/stats",
      providesTags: ["Notifications"],
    }),

   getNotificationsStream: builder.query({
      query: () => ({
        url: "/notifications/stream",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    exportNotifications: builder.query({
      query: () => ({
        url: "/notifications/export",
        method: "GET",
      }),
    }),


    readAllNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),


    readNotification: builder.mutation({
      query: (id: string) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),


    clearNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),

    updateNotificationPreferences: builder.mutation({
  query: (data) => ({
    url: "/users/me/notifications",
    method: "PATCH",
    body: data,
  }),
}),
  }),
});


export const {
  useGetNotificationsQuery,
  useGetNotificationStatsQuery,
  useGetNotificationsStreamQuery, 
  useLazyExportNotificationsQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
  useClearNotificationsMutation,
  useUpdateNotificationPreferencesMutation
} = notificationsApi;
