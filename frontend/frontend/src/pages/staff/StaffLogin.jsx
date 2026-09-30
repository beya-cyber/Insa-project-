import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, Building, ShieldCheck, Server, FileText, ArrowLeft } from 'lucide-react'

export default function StaffLogin() {
  const navigate = useNavigate()

  const portals = [
    { title: 'Fraud Analyst Hub', desc: 'National threat telemetry & case volume trends', path: '/analyst-dashboard', icon: ShieldAlert, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
    { title: 'Commercial Bank Portal', desc: 'Asset protection & emergency account freezes', path: '/bank-dashboard', icon: Building, color: 'text-blue-400 border-blue-500/40 bg-blue-950/40' },
    { title: 'Law Enforcement / Police', desc: 'Digital warrant execution & suspect tracking', path: '/police-dashboard', icon: ShieldCheck, color: 'text-rose-400 border-rose-500/40 bg-rose-950/40' },
    { title: 'System Administrator', desc: 'Gateway uptime, WAF logs & cluster nodes', path: '/admin-dashboard', icon: Server, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40' },
    { title: 'Compliance Auditor', desc: 'Regulatory scorecards & immutable audit logs', path: '/auditor-dashboard', icon: FileText, color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' },
  ]

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 flex flex-col justify-center items-center selection:bg-cyan-500 selection:text-black">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse mb-2">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <p className="text-xs text-cyan-400 tracking-widest uppercase font-bold">NDSIR NATIONAL COMMAND PLATFORM</p>
          <h1 className="text-3xl font-black text-white tracking-tight">Select Role & Access Portal</h1>
          <p className="text-xs text-slate-400">Select your authorized institutional department to launch your dashboard</p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portals.map((portal, index) => {
            const Icon = portal.icon
            return (
              <div 
                key={index}
                onClick={() => navigate(portal.path)}
                className="bg-[#070d1d]/80 border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-6 backdrop-blur-xl transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-xl border ${portal.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{portal.title}</h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">{portal.desc}</p>
                  </div>
                </div>
                <ArrowLeft className="h-5 w-5 text-slate-600 rotate-180 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
