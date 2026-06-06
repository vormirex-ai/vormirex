import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setCredentials } from "../slice/authSlice";

const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROOT,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom base query that handles silent token refresh on 401/403 errors
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Prevent recursive refresh loops if the refresh call itself is failing
    const isRefreshCall = typeof args === 'object' && args !== null && 'url' in args && args.url === "/auth/refresh";

    if (!isRefreshCall) {
      // Execute the token refresh request using cookie credentials
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as any;
        const newToken = data.accessToken || data.token;

        if (newToken) {
          // Update the Redux store with the new access token
          api.dispatch(
            setCredentials({
              user: (api.getState() as RootState).auth.user,
              token: newToken,
            })
          );
          // Retry the original query that failed, now containing the new Bearer token
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } else {
        api.dispatch(logout());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Subjects", "AiChats", "Roadmaps", "Quizzes", "Flashcards", "Challenges", "Notifications"],
  endpoints: () => ({}),
});
