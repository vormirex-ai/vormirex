import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

/* =======================
   COMMON LAYOUT COMPONENTS
======================= */
import Navbar from './components/common/Navbar';
import Footer from './components/layout/Footer';

/* =======================
   PUBLIC PAGES
======================= */
import LandingPage from './pages/LandingPage';
import AboutPage from './components/layout/AboutSection';
import PricingsPage from './components/layout/PricingSections';
import FeaturesPage from './components/layout/FeaturesPage';
import FeatureDetail from './components/layout/FeatureDetail';

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
import CoursePage from './components/layout/CoursePage';

/* =======================
   CUSTOM COURSES
======================= */
import BoosterPack from './CustomCourses/BoosterPack';
import CodingMastery from './CustomCourses/CodingMastery';
import ExamPrep from './CustomCourses/ExamPrep';
import SavedChats from './CustomCourses/SavedChats';
import YourProgress from './CustomCourses/YourProgress';

/* ============================================================
   PUBLIC LAYOUT (Navbar + Footer)
============================================================ */
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

/* ============================================================
   COURSE LAYOUT (Navbar + Outlet + Footer)
============================================================ */
const CourseLayout = () => (
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
        {}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* ================= PUBLIC ROUTES ================= */}
        {}
        <Route
          path="/homepage"
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
        {/* ================= DASHBOARD ================= */}
        <Route element={<DashboardWrapper />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        {/* ================= COURSES ================= */}
        <Route element={<CourseLayout />}>
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/custom/booster-pack" element={<BoosterPack />} />
          <Route path="/custom/coding-mastery" element={<CodingMastery />} />
          <Route path="/custom/exam-prep" element={<ExamPrep />} />
          <Route path="/custom/your-progress" element={<YourProgress />} />
          <Route path="/custom/saved-chats" element={<SavedChats />} />
        </Route>
        {}
        {}
        <Route path="*" element={<Navigate to="/homepage" replace />} />{' '}
      </Routes>
    </Router>
  );
};

export default App;
