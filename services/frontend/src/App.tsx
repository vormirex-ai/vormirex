import { Routes, Route } from "react-router-dom";
import LandingLayout from "./components/layouts/LandingLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import Onboarding from "./pages/auth/onboarding";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Profile from "./pages/account/profile";
import VideoLearning from "./pages/dashboard/video-learning";
import PublicRoute from "./route/PublicRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import SubjectPage from "./pages/dashboard/subjects";
import AIChatPage from "./pages/dashboard/AiChat";
import RoadmapPage from "./pages/dashboard/learning-roadmap";
import QuizPage from "./pages/practice/quiz";
import FlashcardPage from "./pages/practice/flash-cards";
import DailyChallengePage from "./pages/practice/daily-challenge";
import { PromodoroTimer } from "./pages/productivity/timer";
import AiInsightsPage from "./pages/analytics/Insights";
import Leaderboard from "./pages/analytics/Leaderboard";
import StudyPlannerPage from "./pages/productivity/study-planner";
import CourseDetails from "./pages/dashboard/course-detail";
import NotesPage from "./pages/productivity/notes";
import InterviewBotPage from "./pages/practice/Interview-bot";
import SettingsPage from "./pages/account/settings";
import NotificationsPage from "./pages/dashboard/notifications";
import AiChatNavbar from "./components/landing/ai-chat-navbar";
import NotFound from "./pages/not-found";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "@/store/slice/authSlice";
import { setUiPreferences } from "@/store/slice/themeSlice";
import { useLazyMeQuery } from "@/store/api/authApi";
import { RootState } from "@/store/store";

function App() {
  const dispatch = useDispatch();
  const [triggerMe] = useLazyMeQuery();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // triggerMe will automatically attempt baseQuery, which calls /auth/refresh under the hood if it fails with 401/403
        const result = await triggerMe(undefined).unwrap();

        // After triggerMe resolves, if it was successful, the access token is in the store
        // Let's verify we have both user details and the new token
        if (result?.success && result?.user) {
          // Sync UI preferences from profile
          if (result.user.preferences) {
            dispatch(setUiPreferences(result.user.preferences));
          }
          // Triggering a reauth would have set the token in the Redux store.
          // Let's retrieve it from the store or check it.
          // Wait, since triggerMe successfully returned the user, we can read the token and set the full credentials.
          // Let's retrieve the token from the active state.
          import("@/store/store").then(({ store }) => {
            const currentToken = store.getState().auth.token;
            if (currentToken) {
              dispatch(
                setCredentials({
                  user: result.user,
                  token: currentToken,
                })
              );
            } else {
              dispatch(logout());
            }
          });
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch, triggerMe]);

  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />

      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Route>

      {/* Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="subjects" element={<SubjectPage />} />
          <Route
            path="video-learning/:id?"
            element={<VideoLearning />}
          />
          <Route path="ai-chat" element={<AIChatPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="course-details/:id?" element={<CourseDetails />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>



        <Route path="/practice" element={<DashboardLayout />}>
          <Route path="quiz" element={<QuizPage />} />
          <Route path="flash-cards" element={<FlashcardPage />} />
          <Route path="daily-challenges" element={<DailyChallengePage />} />
          <Route path="interview-bot" element={<InterviewBotPage />} />
        </Route>


        <Route path="/productivity" element={<DashboardLayout />}>
          <Route path="timer" element={<PromodoroTimer />} />
          <Route path="study-planner" element={<StudyPlannerPage />} />
          <Route path="notes" element={<NotesPage />} />
        </Route>

        <Route path="/analytics" element={<DashboardLayout />}>
          <Route path="Insights" element={<AiInsightsPage />} />
          <Route path="Leaderboard" element={<Leaderboard />} />
        </Route>

        {/* account */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account/profile" element={<DashboardLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>

        <Route path="/" element={<AiChatNavbar />}>
          <Route path="ai-chat" element={<AIChatPage />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
