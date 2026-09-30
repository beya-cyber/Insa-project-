import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Search, Lock, AlertTriangle, CheckCircle, TrendingUp, RefreshCw } from 'lucide-react'

export default function AnalystDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [actionStatus, setActionStatus] = useState(null)

  // Live active freeze & incident queue
  const [activeFreezes, setActiveFreezes] = useState([
    { id: 'INC-2026-901', inst: 'Telebirr P2P', amount: 'ETB 450,000', risk: 'CRITICAL', suspect: 'ACC-9921-****-4100', status: 'PENDING_FREEZE', vector: 'SIM Swap / Phishing' },
    { id: 'INC-2026-902', inst: 'Commercial Bank of Ethiopia', amount: 'ETB 320,000', risk: 'HIGH', suspect: 'ACC-4412-****-8819', status: 'PENDING_FREEZE', vector: 'Unauthorized Bulk Transfer' },
    { id: 'INC-2026-903', inst: 'Bank of Abyssinia', amount: 'ETB 180,000', risk: 'HIGH', suspect: 'ACC-1102-****-3321', status: 'PENDING_FREEZE', vector: 'Synthetic Identity' },
    { id: 'INC-2026-904', inst: 'Awash Bank', amount: 'ETB 95,000', risk: 'MEDIUM', suspect: 'ACC-7734-****-1290', status: 'PENDING_FREEZE', vector: 'Credential Stuffing' },
  ])

  const filteredIncidents = activeFreezes.filter(inc => 
    inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.inst.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.suspect.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExecuteFreeze = (id) => {
    setActiveFreezes(prev => prev.map(item => item.id === id ? { ...item, status: 'FROZEN_SECURED' } : item))
    setActionStatus(`Emergency freeze command successfully dispatched and locked for case ${id}!`)
    setTimeout(() => setActionStatus(null), 4000)
  }

  const handleLiftFreeze = (id) => {
    setActiveFreezes(prev => prev.map(item => item.id === id ? { ...item, status: 'LIFTED_RESTORED' } : item))
    setActionStatus(`Freeze lifted and account restored for case ${id}.`)
    setTimeout(() => setActionStatus(null), 4000)
  }

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-cyan-500/20 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/staff/login')}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-all text-slate-400 hover:text-white cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-cyan-400 tracking-widest uppercase font-bold">NATIONAL FRAUD RESPONSE DESK</p>
              <h1 className="text-xl font-black text-white tracking-tight">Analyst Freeze & Asset Containment Hub</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {actionStatus && (
            <span className="px-3 py-1.5 bg-cyan-950 border border-cyan-500 rounded-xl text-xs text-cyan-300 animate-bounce shadow-lg">
              {actionStatus}
            </span>
          )}
          <span className="px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-400 font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Direct Node Control Active
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Active Freezes Dispatched</p>
            <p className="text-2xl font-black text-white mt-1">312 Cases</p>
            <p className="text-[10px] text-emerald-400 mt-2">ETB 4.82M Secured Today</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Pending Review</p>
            <p className="text-2xl font-black text-amber-400 mt-1">
              {activeFreezes.filter(i => i.status === 'PENDING_FREEZE').length} Queue
            </p>
            <p className="text-[10px] text-cyan-400 mt-2">Immediate action required</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Avg Freeze Response</p>
            <p className="text-2xl font-black text-white mt-1">14.2 secs</p>
            <p className="text-[10px] text-emerald-400 mt-2">SLA Target Met (&lt; 30s)</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">False Positive Rate</p>
            <p className="text-2xl font-black text-white mt-1">0.8%</p>
            <p className="text-[10px] text-emerald-400 mt-2">Highly accurate heuristics</p>
          </div>
        </div>

        {/* Integrated Threat & Freeze Trend Graph Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-cyan-400" /> Emergency Freeze Velocity Trend (24 Hours)
                </h2>
                <p className="text-[11px] text-slate-400">Real-time spike monitoring across connected financial institutions</p>
              </div>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-lg font-bold">LIVE SPIKE</span>
            </div>
            {/* Visual Trend Graph Representation */}
            <div className="h-40 w-full relative flex items-end pt-6 bg-slate-950/40 rounded-xl border border-slate-800/80 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
              <svg className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none" viewBox="0 0 500 150">
                <path d="M 0 120 Q 125 100 250 80 T 500 20" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              </svg>
              <div className="flex justify-between w-full text-[10px] text-slate-500 z-10 pb-1 border-t border-slate-800/80 pt-2">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span className="text-cyan-400 font-bold">PEAK NOW</span>
              </div>
            </div>
          </div>

          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">Institution Spike Share</h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Bank of Abyssinia</span>
                  <span className="text-cyan-400 font-bold">ETB 890K (18%)</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div className="h-full bg-cyan-500 w-[45%]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Awash Bank</span>
                  <span className="text-cyan-400 font-bold">ETB 660K (14%)</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div className="h-full bg-blue-500 w-[35%]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Commercial Bank of Ethiopia</span>
                  <span className="text-cyan-400 font-bold">ETB 1.2M (38%)</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div className="h-full bg-indigo-500 w-[75%]" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Freeze Management & Action Workspace */}
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Incident Freeze Control Queue</h2>
              <p className="text-[11px] text-slate-400">Execute emergency account freezes, review threat vectors, or release verified accounts</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search case ID, institution, account..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Target Institution</th>
                  <th className="py-3 px-4">Suspect Account</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Attack Vector</th>
                  <th className="py-3 px-4">Freeze Status</th>
                  <th className="py-3 px-4 text-right">Analyst Freeze Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredIncidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-cyan-400">{inc.id}</td>
                    <td className="py-4 px-4 text-white font-semibold">{inc.inst}</td>
                    <td className="py-4 px-4 text-slate-300 font-mono">{inc.suspect}</td>
                    <td className="py-4 px-4 text-cyan-300 font-bold">{inc.amount}</td>
                    <td className="py-4 px-4 text-slate-400">{inc.vector}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inc.status === 'PENDING_FREEZE' ? 'bg-amber-950/80 border border-amber-500/40 text-amber-400 animate-pulse' :
                        inc.status === 'FROZEN_SECURED' ? 'bg-rose-950/80 border border-rose-500/40 text-rose-400' :
                        'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {inc.status === 'PENDING_FREEZE' ? (
                        <button 
                          onClick={() => handleExecuteFreeze(inc.id)}
                          className="px-3.5 py-1.5 bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-bold rounded-lg transition-all cursor-pointer text-xs shadow-md"
                        >
                          Execute Freeze
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleLiftFreeze(inc.id)}
                          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all cursor-pointer text-xs shadow-md"
                        >
                          Lift Freeze / Release
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
