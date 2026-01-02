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
   COURSE LAYOUT (Navbar + Outlet + Footer) ✅ FIXED
============================================================ */
const CourseLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet /> {/* CoursePage renders ONLY ONCE */}
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
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/landing"
          element={
            <PublicLayout>
              <LandingPage />
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
          path="/pricings"
          element={
            <PublicLayout>
              <PricingsPage />
            </PublicLayout>
          }
        />

        {/* ================= AUTH ================= */}
        <Route path="/auth" element={<VormirexAuth />} />
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
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
