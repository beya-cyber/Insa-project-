import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Server, ArrowLeft, ShieldAlert, RefreshCw, Power, CheckCircle, AlertTriangle, Terminal } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sysStatus, setSysStatus] = useState(null)

  const [nodes, setNodes] = useState([
    { name: 'Telebirr Gateway API', latency: '12ms', status: 'ONLINE', load: '44%' },
    { name: 'CBE Core Switching Node', latency: '19ms', status: 'ONLINE', load: '61%' },
    { name: 'Abyssinia Fraud Daemon', latency: '24ms', status: 'ONLINE', load: '38%' },
    { name: 'Awash Secure Sync Node', latency: '15ms', status: 'ONLINE', load: '49%' },
  ])

  const handleRestartNode = (nodeName) => {
    setSysStatus(`Restarting secure handshake daemon for ${nodeName}...`)
    setTimeout(() => {
      setSysStatus(`${nodeName} restarted successfully. Cluster crypto keys re-verified.`)
      setTimeout(() => setSysStatus(null), 4000)
    }, 2000)
  }

  const handleFlushWafCache = () => {
    setSysStatus('WAF edge rule cache flushed across all 47 cluster nodes.')
    setTimeout(() => setSysStatus(null), 4000)
  }

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-indigo-500 selection:text-black">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-indigo-500/20 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/staff/login')}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500 transition-all text-slate-400 hover:text-white cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-950/80 border border-indigo-500/50 rounded-2xl text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] animate-pulse">
              <Server className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-indigo-400 tracking-widest uppercase font-bold">SYSTEM INFRASTRUCTURE & TELEMETRY</p>
              <h1 className="text-xl font-black text-white tracking-tight">System Administrator Command Center</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {sysStatus && (
            <span className="px-3 py-1.5 bg-indigo-950 border border-indigo-500 rounded-xl text-xs text-indigo-300 animate-bounce shadow-lg">
              {sysStatus}
            </span>
          )}
          <button 
            onClick={handleFlushWafCache}
            className="px-3.5 py-1.5 bg-indigo-950/80 border border-indigo-500/40 hover:bg-indigo-900 rounded-xl text-xs text-indigo-300 font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Flush WAF Edge Cache
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">CPU Cluster Load</p>
            <p className="text-2xl font-black text-white mt-1">42.8%</p>
            <div className="h-1.5 bg-slate-900 rounded-full mt-3 overflow-hidden border border-slate-800"><div className="h-full bg-indigo-500 w-[42%] rounded-full" /></div>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Memory Allocation</p>
            <p className="text-2xl font-black text-white mt-1">68.4%</p>
            <div className="h-1.5 bg-slate-900 rounded-full mt-3 overflow-hidden border border-slate-800"><div className="h-full bg-blue-500 w-[68%] rounded-full" /></div>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">API Gateway SLA</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">99.98%</p>
            <p className="text-[10px] text-slate-400 mt-2">Zero dropped packets</p>
          </div>
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <p className="text-[11px] text-slate-400 uppercase font-bold">Blocked Malicious Payloads</p>
            <p className="text-2xl font-black text-white mt-1">1,429</p>
            <p className="text-[10px] text-indigo-400 mt-2">WAF Active</p>
          </div>
        </div>

        {/* Interactive Gateway Node Management */}
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">National Gateway Node Health & Operations</h2>
              <p className="text-[11px] text-slate-400">Manage institutional integration nodes, inspect latencies, and execute secure handshakes</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> All Clusters Stable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map((node, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center justify-between transition-all hover:border-indigo-500/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">{node.name}</h3>
                  </div>
                  <p className="text-[11px] text-slate-400">Latency: <span className="text-indigo-400 font-bold">{node.latency}</span> | CPU Load: <span className="text-white font-bold">{node.load}</span></p>
                </div>
                <button 
                  onClick={() => handleRestartNode(node.name)}
                  className="px-3 py-1.5 bg-indigo-950 border border-indigo-500/50 hover:bg-indigo-900 text-indigo-300 font-bold rounded-lg transition-all cursor-pointer text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Power className="h-3.5 w-3.5" /> Restart Node
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
