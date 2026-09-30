import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import StaffLogin from './pages/staff/StaffLogin'
import BankDashboard from './pages/bank/BankDashboard'
import PoliceDashboard from './pages/police/PoliceDashboard'
import AnalystDashboard from './pages/analyst/AnalystDashboard'
import AdminDashboard from './pages/staff/AdminDashboard'
import AuditorDashboard from './pages/auditor/AuditorDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/staff/login" replace />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
      <Route path="/bank-dashboard" element={<BankDashboard />} />
      <Route path="/police-dashboard" element={<PoliceDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/auditor-dashboard" element={<AuditorDashboard />} />
    </Routes>
  )
}
