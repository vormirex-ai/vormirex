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
import NotesPage from "./pages/productivity/notes/notes";
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
import { RootState, store } from "@/store/store";
import ChatHistoryPage from "./pages/dashboard/chat-history";
import QuizHistoryPage from "./pages/practice/quiz/quiz-history";
import { PrivacyPolicyPage } from "./pages/legal/privacy-policy";
import { TermsAndConditionPage } from "./pages/legal/terms-and-conditions";
import { SupportPage } from "./pages/legal/support";
import { HelpCenterPage } from "./pages/legal/help-center";
import LegalLayout from "./components/layouts/LegalLayout";
import NoteDetailsPage from "./pages/productivity/notes/notes-details";

function App() {
  const dispatch = useDispatch();
  const [triggerMe] = useLazyMeQuery();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("initializeAuth: started checking session");
      try {
        // triggerMe calls GET /api/auth/me. VITE_API_URL is relative (/api) to use
        // Vercel server-side rewrites, avoiding third-party cookie restrictions.
        // If it returns 401, baseQueryWithReauth silently fires POST /api/auth/refresh
        // (cookie is sent automatically via credentials: "include"), gets a new accessToken,
        // stores it in Redux, then retries /auth/me.
        const result = await triggerMe(undefined, false).unwrap();
        console.log("initializeAuth: triggerMe succeeded:", result);

        if (result?.success && result?.user) {
          // Sync UI preferences from the user profile
          if (result.user.preferences) {
            dispatch(setUiPreferences(result.user.preferences));
          }

          // Read the current token synchronously from the store.
          // At this point baseQueryWithReauth has already set it via setCredentials.
          const currentToken = store.getState().auth.token;

          if (currentToken) {
            console.log("initializeAuth: set credentials with token");
            dispatch(
              setCredentials({
                user: result.user,
                token: currentToken,
              }),
            );
          } else {
            console.log(
              "initializeAuth: no current token in store, logging out",
            );
            dispatch(logout());
          }
        } else {
          console.log(
            "initializeAuth: result success/user missing, logging out",
          );
          dispatch(logout());
        }
      } catch (error) {
        console.error("initializeAuth: caught error:", error);
        // /auth/refresh also failed — user is genuinely logged out
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
          <Route path="video-learning/:id?" element={<VideoLearning />} />
          <Route path="ai-chat" element={<AIChatPage />} />
          <Route path="chat-history" element={<ChatHistoryPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="course-details/:id?" element={<CourseDetails />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        <Route path="/practice" element={<DashboardLayout />}>
          {/* <Route path="quiz" element={<QuizPage />} /> */}
          <Route path="quiz/:subjectId?" element={<QuizPage />} />
          <Route path="quiz/quiz-history" element={<QuizHistoryPage />} />
          <Route path="flash-cards" element={<FlashcardPage />} />
          <Route path="daily-challenges" element={<DailyChallengePage />} />
          <Route path="interview-bot" element={<InterviewBotPage />} />
        </Route>

        <Route path="/productivity" element={<DashboardLayout />}>
          <Route path="timer/:taskId?" element={<PromodoroTimer />} />
          <Route path="study-planner" element={<StudyPlannerPage />} />
          <Route path="notes" element={<NotesPage />} />
           <Route  path="notes/notes-details/:id" element={<NoteDetailsPage />} />
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

<Route element={<LegalLayout />}>
  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
  <Route path="/terms-and-conditions" element={<TermsAndConditionPage />} />
  <Route path="/support" element={<SupportPage />} />
  <Route path="/help-center" element={<HelpCenterPage />} />
</Route>



      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
