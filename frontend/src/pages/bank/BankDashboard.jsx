import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, ArrowLeft, ShieldAlert, Lock, CheckCircle, AlertTriangle, Search, RefreshCw } from 'lucide-react'

export default function BankDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLog, setActionLog] = useState(null)

  // Live incoming national command freeze orders
  const [freezeQueue, setFreezeQueue] = useState([
    { id: 'FRZ-901', account: 'ACC-9921-****-4100', holder: 'Alemayehu Tadesse', amount: 'ETB 450,000', source: 'NDSIR Analyst Hub', status: 'PENDING_EXECUTION' },
    { id: 'FRZ-902', account: 'ACC-4412-****-8819', holder: 'Bethelhem Mulugeta', amount: 'ETB 320,000', source: 'Automated ML Trigger', status: 'PENDING_EXECUTION' },
    { id: 'FRZ-903', account: 'ACC-1102-****-3321', holder: 'Dawit Bekele', amount: 'ETB 180,000', source: 'Federal Police Warrant', status: 'PENDING_EXECUTION' },
  ])

  const handleExecuteFreeze = (id) => {
    setFreezeQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'FROZEN_SECURED' } : item))
    setActionLog(`Asset freeze successfully executed for ${id}. Funds locked in escrow vault.`)
    setTimeout(() => setActionLog(null), 4000)
  }

  const handleBypass = (id) => {
    setFreezeQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'BYPASSED_FALSE_POSITIVE' } : item))
    setActionLog(`Alert ${id} cleared as false positive. Account restored to normal standing.`)
    setTimeout(() => setActionLog(null), 4000)
  }

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-blue-500/20 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/staff/login')}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 transition-all text-slate-400 hover:text-white cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-950/80 border border-blue-500/50 rounded-2xl text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
              <Building className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-blue-400 tracking-widest uppercase font-bold">COMMERCIAL BANK NODE — SECURITY OPERATIONS</p>
              <h1 className="text-xl font-black text-white tracking-tight">Institutional Asset Protection & Emergency Freeze Portal</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {actionLog && (
            <span className="px-3 py-1.5 bg-blue-950 border border-blue-500 rounded-xl text-xs text-blue-300 animate-bounce shadow-lg">
              {actionLog}
            </span>
          )}
          <span className="px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-400 font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Webhook Listener Active
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Total Frozen Assets</p>
            <p className="text-2xl font-black text-white mt-1">ETB 1,840,000</p>
            <p className="text-[10px] text-emerald-400 mt-2">+18.4% this week</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Avg Freeze Latency</p>
            <p className="text-2xl font-black text-white mt-1">18 secs</p>
            <p className="text-[10px] text-cyan-400 mt-2">SLA Target: &lt; 30s</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Active Account Freezes</p>
            <p className="text-2xl font-black text-rose-400 mt-1">42</p>
            <p className="text-[10px] text-amber-400 mt-2">Under forensic review</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Compliance Adherence</p>
            <p className="text-2xl font-black text-white mt-1">99.4%</p>
            <p className="text-[10px] text-emerald-400 mt-2">Audited successfully</p>
          </div>
        </div>

        {/* Interactive Emergency Freeze Execution Queue */}
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Incoming National Command Freeze Queue</h2>
              <p className="text-[11px] text-slate-400">Review and execute emergency account freezes or clear false positives instantly</p>
            </div>
            <span className="text-xs bg-blue-950/80 text-blue-300 border border-blue-500/40 px-3 py-1.5 rounded-xl font-bold">
              {freezeQueue.filter(i => i.status === 'PENDING_EXECUTION').length} Pending Actions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Account Number</th>
                  <th className="py-3 px-4">Account Holder</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Origin Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Bank Officer Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {freezeQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-blue-400">{item.id}</td>
                    <td className="py-4 px-4 text-white font-mono">{item.account}</td>
                    <td className="py-4 px-4 text-slate-300">{item.holder}</td>
                    <td className="py-4 px-4 text-cyan-300 font-bold">{item.amount}</td>
                    <td className="py-4 px-4 text-slate-400">{item.source}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'PENDING_EXECUTION' ? 'bg-amber-950/80 border border-amber-500/40 text-amber-400 animate-pulse' :
                        item.status === 'FROZEN_SECURED' ? 'bg-rose-950/80 border border-rose-500/40 text-rose-400' :
                        'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {item.status === 'PENDING_EXECUTION' ? (
                        <>
                          <button 
                            onClick={() => handleExecuteFreeze(item.id)}
                            className="px-3 py-1 bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-bold rounded-lg transition-all cursor-pointer text-[10px] shadow-md"
                          >
                            Execute Freeze
                          </button>
                          <button 
                            onClick={() => handleBypass(item.id)}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all cursor-pointer text-[10px]"
                          >
                            Clear / False Positive
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Logged & Locked</span>
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
