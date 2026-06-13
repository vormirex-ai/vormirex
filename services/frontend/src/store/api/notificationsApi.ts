import { apiSlice } from "./apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/notifications/
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // GET /api/notifications/stats
    getNotificationStats: builder.query({
      query: () => ({
        url: "/notifications/stats",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // GET /api/notifications/export
    exportNotifications: builder.query({
      query: () => ({
        url: "/notifications/export",
        method: "GET",
      }),
    }),

    // PATCH /api/notifications/read-all
    readAllNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // PATCH /api/notifications/{id}/read
    readNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // DELETE /api/notifications/clear
    clearNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // SSE Stream - GET /api/notifications/stream
    // Normal RTK Query se SSE handle nahi hota properly,
    // isliye custom implementation use karenge
    getNotificationsStream: builder.query({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;

          const eventSource = new EventSource(
            `${import.meta.env.VITE_API_URL}/notifications/stream`,
            {
              withCredentials: true,
            },
          );

          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            updateCachedData((draft: any) => {
              if (Array.isArray(draft)) {
                draft.unshift(data);
              }
            });
          };

          eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
          };

          await cacheEntryRemoved;
          eventSource.close();
        } catch (error) {
          console.error("SSE Connection Error:", error);
        }
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useGetNotificationStatsQuery,
  useExportNotificationsQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
  useClearNotificationsMutation,
  useGetNotificationsStreamQuery,
} = notificationsApi;
