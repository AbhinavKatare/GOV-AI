import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './Context/AuthContext.jsx';
import { DashboardLayout } from './layouts/DashboardLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

/* Pages */
import Login from './pages/login.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';
import Applications from './pages/Applications.jsx';
import AiAssistant from './pages/AiAssistant.jsx';
import Settings from './pages/Settings.jsx';
import SchemeDiscovery from './pages/SchemeDiscovery.jsx';
import SkillProfiling from './pages/SkillProfiling.jsx';
import NewsFeed from './pages/NewsFeed.jsx';
import VoiceChat from './pages/VoiceChat.jsx';
import Home from './pages/Home.jsx';

/* ── Loading spinner ───────────────────────────────────────── */
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#84CC16] border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Securing your workspace…</p>
    </div>
  </div>
);

/* ── Guards ────────────────────────────────────────────────── */

/** Redirect to /login if not logged in */
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingState />;
  return user ? children : <Navigate to="/login" replace />;
};

/** Redirect to /dashboard if already logged in */
const PublicOnlyRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingState />;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

/* ═══════════════════════════════════════════════════════════ */
const App = () => (
  <Routes>

    {/* ── Auth / onboarding (standalone, no layout) ── */}
    <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
    <Route path="/register" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
    <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />

    {/* ── Public pages that redirect logged-in users away ── */}
    <Route element={<PublicOnlyRoute><PublicLayout /></PublicOnlyRoute>}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-4">About govAI</h1>
          <p className="text-gray-600 text-lg">Your AI-powered gateway to government opportunities.</p>
        </div>
      } />
    </Route>

    {/* ── Public browsing pages (accessible logged-in or not) ── */}
    <Route element={<PublicLayout />}>
      <Route path="/schemes" element={<SchemeDiscovery />} />
      <Route path="/jobs" element={<SkillProfiling />} />
      <Route path="/news" element={<NewsFeed />} />
    </Route>

    {/* ── Protected pages inside DashboardLayout ── */}
    <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/assistant" element={<AiAssistant />} />
      <Route path="/voice" element={<VoiceChat />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

    {/* ── Fallback ── */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;