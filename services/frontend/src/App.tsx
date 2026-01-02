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
import LandingPage from './pages/LandingPage';
import AboutPage from './components/layout/AboutSection';
import PricingsPage from './components/layout/PricingSections';
import FeaturesPage from './components/layout/FeaturesPage'; // ✅ ADDED
import VormirexAuth from './components/login/login';
import DashboardWrapper from './components/layout/DashboardWrapper';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './components/layout/CoursePage';

import BoosterPack from './CustomCourses/BoosterPack';
import CodingMastery from './CustomCourses/CodingMastery';
import ExamPrep from './CustomCourses/ExamPrep';
import SavedChats from './CustomCourses/SavedChats';
import YourProgress from './CustomCourses/YourProgress';

import FeatureDetail from './components/layout/FeatureDetail';

/* ---------- LAYOUTS ---------- */

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

const CourseLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

/* ---------- APP ---------- */

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ===== PUBLIC ROUTES ===== */}
        <Route
          path="/HomePage"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />

        <Route
          path="/features" // ✅ FIX
          element={
            <PublicLayout>
              <FeaturesPage />
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

        <Route
          path="/feature/:id"
          element={
            <PublicLayout>
              <FeatureDetail />
            </PublicLayout>
          }
        />

        {/* ===== AUTH ===== */}
        <Route path="/auth" element={<VormirexAuth />} />
        <Route
          path="/auth/signup"
          element={<VormirexAuth defaultTab="signup" />}
        />

        {/* ===== DASHBOARD ===== */}
        <Route element={<DashboardWrapper />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* ===== COURSES ===== */}
        <Route element={<CourseLayout />}>
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/custom/booster-pack" element={<BoosterPack />} />
          <Route path="/custom/coding-mastery" element={<CodingMastery />} />
          <Route path="/custom/exam-prep" element={<ExamPrep />} />
          <Route path="/custom/your-progress" element={<YourProgress />} />
          <Route path="/custom/saved-chats" element={<SavedChats />} />
        </Route>

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/Homepage" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
