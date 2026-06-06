import { apiSlice } from "./apiSlice";

export const roadmapsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateRoadmap: builder.mutation({
      query: () => ({
        url: "/roadmaps/generate",
        method: "POST",
      }),
      invalidatesTags: ["Roadmaps"],
    }),
    getMyRoadmap: builder.query({
      query: () => "/roadmaps/my-roadmap",
      providesTags: ["Roadmaps"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGenerateRoadmapMutation,
  useGetMyRoadmapQuery,
} = roadmapsApi;
