import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import onboardingReducer from "./slice/onboardingSlice";
// import notificationsReducer from "./slice/notificationSlice";
import subjectReducer from "./slice/subjectSlice";
import themeReducer from "./slice/themeSlice";
import loaderReducer from "./slice/loaderSlice";
import { apiSlice } from "./api/apiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  // notifications: notificationsReducer,
  subject: subjectReducer,
  theme: themeReducer,
  loader: loaderReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
