import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldAlert, Landmark, UserCheck, Settings, Building2, LogOut, FileText } from 'lucide-react'

export default function ConsoleNavbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Analyst Hub', path: '/analyst-dashboard', icon: ShieldAlert },
    { label: 'Bank Portal', path: '/bank-dashboard', icon: Landmark },
    { label: 'Police Desk', path: '/police-dashboard', icon: UserCheck },
    { label: 'Admin Panel', path: '/admin-dashboard', icon: Settings },
    { label: 'Partner View', path: '/partner-dashboard', icon: Building2 },
  ]

  return (
    <nav className="bg-[#070d1d] border-b border-cyan-500/20 px-6 py-3 flex items-center justify-between font-mono text-xs shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider cursor-pointer" onClick={() => navigate('/analyst-dashboard')}>
          <ShieldAlert className="h-5 w-5 animate-pulse" />
          <span>ETHIO CYBERSHIELD DESK</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${isActive
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 rounded-xl transition-all cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-cyan-400" />
          <span>Citizen Portal</span>
        </button>
        <button
          onClick={() => navigate('/staff/login')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded-xl transition-all cursor-pointer font-bold shadow-sm"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  )
}