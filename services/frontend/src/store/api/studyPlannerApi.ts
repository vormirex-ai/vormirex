import { apiSlice } from "./apiSlice";

export const studyPlannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
getPlanner: builder.query<any, void>({
  query: () => "/planner/",
  providesTags: ["Planner"],
}),

    createTask: builder.mutation({
      query: (body) => ({
        url: "/planner/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Planner"],
    }),

  updateTask: builder.mutation({
  query: ({ id, ...body }) => {
    console.log("PATCH URL =>", `/planner/tasks/${id}`);
    console.log("PATCH BODY =>", body);

    return {
      url: `/planner/tasks/${id}`,
      method: "PATCH",
      body,
    };
  },
  invalidatesTags: ["Planner"],
}),

    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/planner/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Planner"],
    }),

  }),
});

export const {
  useGetPlannerQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = studyPlannerApi;