import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StaffLogin from '../pages/staff/StaffLogin'
import LoginPage from '../pages/public/LoginPage'
import AnalystDashboard from '../pages/analyst/AnalystDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AuditorDashboard from '../pages/auditor/AuditorDashboard'
import BankPortalDashboard from '../pages/partners/BankPortalDashboard'
import PolicePortalDashboard from '../pages/partners/PolicePortalDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/staff/login" replace />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Role-based Dashboards */}
      <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/auditor-dashboard" element={<AuditorDashboard />} />
      <Route path="/bank-portal" element={<BankPortalDashboard />} />
      <Route path="/police-portal" element={<PolicePortalDashboard />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/staff/login" replace />} />
    </Routes>
  )
}
