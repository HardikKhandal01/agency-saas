import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import CRM from './pages/CRM';
import Campaigns from './pages/Campaigns';
import AIStudio from './pages/AIStudio';
import Receptionist from './pages/Receptionist';

// Chota sa component banaya jo Landing page ke animated blobs ko Dashboard me hide kar dega
const BackgroundBlobs = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/dashboard')) return null;
  return (
    <div className="background-blobs">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <BackgroundBlobs />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Dashboard Routes (Nested Routing) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          {/* Aage jaakar hum yahan /crm, /campaigns, /ai add karenge */}
          <Route path="crm" element={<CRM />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="ai" element={<AIStudio />} />
          <Route path="settings" element={<Receptionist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;