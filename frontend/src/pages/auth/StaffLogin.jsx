import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, UserCheck, ArrowRight, Landmark, Scale, FileSearch, ShieldAlert } from 'lucide-react'

export default function StaffLogin() {
  const [role, setRole] = useState('Analyst Portal')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    switch (role) {
      case 'Analyst Portal':
        navigate('/analyst-dashboard')
        break
      case 'Admin Portal':
        navigate('/admin-dashboard')
        break
      case 'Auditor Portal':
        navigate('/auditor-dashboard')
        break
      case 'Commercial Bank Portal':
        navigate('/bank-portal')
        break
      case 'Law Enforcement Portal':
        navigate('/police-portal')
        break
      default:
        navigate('/analyst-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono flex items-center justify-center p-6 selection:bg-blue-500 selection:text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="relative z-10 bg-[#070d1d]/90 border border-blue-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(59,130,246,0.2)] backdrop-blur-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-950/80 border border-blue-500/50 rounded-2xl text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <Shield className="h-8 w-8 animate-pulse" />
          </div>
          <p className="text-[11px] text-blue-400 tracking-widest uppercase">NDSIR PORTAL — INSA ANTI-FRAUD COMMAND</p>
          <h1 className="text-2xl font-black text-white tracking-tight">System Access</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Select Role Portal</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500 shadow-inner"
            >
              <option value="Analyst Portal">Analyst Portal (NDSIR Triage)</option>
              <option value="Admin Portal">Admin Portal (System Governance)</option>
              <option value="Auditor Portal">Auditor Portal (Compliance Oversight)</option>
              <option value="Commercial Bank Portal">Commercial Bank Portal (CBE, BOA, Telebirr, Awash)</option>
              <option value="Law Enforcement Portal">Law Enforcement Portal (Police & Magistrates)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Official Identifier / Email</label>
            <input
              type="text"
              required
              placeholder="e.g. officer@insa.gov.et"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Secure Access Token / Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Authenticate & Launch Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[10px] text-slate-500">
            Protected by National Cryptographic PKI Infrastructure. Unauthorized access attempts are logged and prosecuted.
          </p>
        </div>
      </div>
    </div>
  )
}
