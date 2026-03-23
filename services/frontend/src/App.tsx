import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/layout/Footer';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from "./pages/superAdmin/SuperAdminPage";

/* =======================
   PUBLIC PAGES
======================= */
import LandingPage from './pages/LandingPage';
import AboutPage from './components/layout/AboutSection';
import PricingsPage from './components/layout/PricingSections';
import FeaturesPage from './components/layout/FeaturesPage';
import FeatureDetail from './components/layout/FeatureDetail';
import ProfilePage from './components/layout/ProfilePage';

/* =======================
   AUTH & DASHBOARD
======================= */
import VormirexAuth from './components/login/login';
import DashboardWrapper from './components/layout/DashboardWrapper';
import DashboardPage from './pages/DashboardPage';
import OAuthSuccess from './components/auth/OAuthSuccess';
import VerifyEmail from './components/auth/VerifyEmail';
import ResetPassword from './components/auth/ResetPassword';

/* =======================
   COURSES
======================= */
import CourseList from './components/layout/CourseList';
import CourseDetail from './components/layout/CourseDetail';

/* =======================
   CUSTOM COURSES
======================= */
import {
  BoosterPack,
  CodingMastery,
  ExamPrep,
  SavedChats,
  YourProgress,
} from './CustomCourses/CustomCoursePage';
import CustomCoursesList from './CustomCourses/CustomCoursesList';
import SettingsPage from './components/settings/SettingsPage';
import Contacts from './components/layout/Contacts';

/* ============================================================
   PUBLIC LAYOUT (Navbar + Footer)
============================================================ */
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

const CourseLayout: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

/* ============================================================
   MAIN APP
============================================================ */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/features"
          element={
            <PublicLayout>
              <FeaturesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/feature/:id"
          element={
            <PublicLayout>
              <FeatureDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicLayout>
              <PricingsPage />
            </PublicLayout>
          }
        />

        {/* ================= AUTH ================= */}
        <Route path="/auth" element={<VormirexAuth defaultTab="login" />} />
        <Route
          path="/auth/login"
          element={<VormirexAuth defaultTab="login" />}
        />
        <Route
          path="/auth/signup"
          element={<VormirexAuth defaultTab="signup" />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/profilepage"
          element={<ProfilePage />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/super-admin" element={<SuperAdminPage />} />




        {/* ================= DASHBOARD (MOVED TO /DASHBOARD) ================= */}
        <Route element={<DashboardWrapper />}>
          {/* Dashboard is now explicitly at /dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* ================= COURSES ================= */}
        <Route element={<CourseLayout />}>
          {/* General Courses */}
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />

          {/* Custom Courses List */}
          <Route path="/custom-courses" element={<CustomCoursesList />} />

          {/* Individual Custom Courses */}
          <Route path="/custom/booster-pack" element={<BoosterPack />} />
          <Route path="/custom/coding-mastery" element={<CodingMastery />} />
          <Route path="/custom/exam-prep" element={<ExamPrep />} />
          <Route path="/custom/your-progress" element={<YourProgress />} />
          <Route path="/custom/saved-chats" element={<SavedChats />} />
        </Route>

        {/* ================= CATCH ALL ================= */}
        {/* Any unknown route redirects to Home (/) */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
