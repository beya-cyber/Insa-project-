// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'

// Public & Citizen Pages
import CitizenIntakeWizard from './pages/public/CitizenIntakeWizard'
import CaseTrackerPage from './pages/public/CaseTrackerPage'
import LoginPage from './pages/public/LoginPage'

// Staff & Institutional Pages
import StaffLogin from './pages/staff/StaffLogin'
import AnalystDashboard from './pages/analyst/AnalystDashboard'
import BankDashboard from './pages/bank/BankDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import PolicePortalDashboard from './pages/partners/PolicePortalDashboard'
import PartnerDashboard from './pages/partners/PartnerDashboard'

// Navigation Layout Component
import ConsoleNavbar from './components/common/ConsoleNavbar'

function StaffLayout() {
  return (
    <div className="min-h-screen bg-[#070d1d] text-slate-100">
      <ConsoleNavbar />
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Citizen Routes */}
        <Route path="/" element={<CitizenIntakeWizard />} />
        <Route path="/citizen-report" element={<CitizenIntakeWizard />} />
        <Route path="/case-tracker" element={<CaseTrackerPage />} />
        <Route path="/login" element={<StaffLogin />} />
        <Route path="/public-login" element={<LoginPage />} />

        {/* Staff Login */}
        <Route path="/staff/login" element={<StaffLogin />} />

        {/* Role Dashboards wrapped with the persistent navigation bar */}
        <Route element={<StaffLayout />}>
          <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
          <Route path="/bank-dashboard" element={<BankDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/police-dashboard" element={<PolicePortalDashboard />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}