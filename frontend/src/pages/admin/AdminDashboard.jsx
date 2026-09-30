import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, Users, Server, Key, Activity, ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, RefreshCw, Plus, ShieldCheck, Lock } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [showRoleInfo, setShowRoleInfo] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState('nodes')
  const [systemStatus, setSystemStatus] = useState('SECURE & OPERATIONAL')

  const systemNodes = [
    { id: 'NODE-ADDIS-01', name: 'INSA Core Gateway', type: 'Primary API Hub', status: 'ONLINE', latency: '12ms' },
    { id: 'NODE-CBE-API', name: 'Commercial Bank of Ethiopia', type: 'Financial Bridge', status: 'SYNCED', latency: '45ms' },
    { id: 'NODE-BOA-API', name: 'Bank of Abyssinia Gateway', type: 'Financial Bridge', status: 'SYNCED', latency: '38ms' },
    { id: 'NODE-POLICE-WARRANT', name: 'Federal Police Warrant Hub', type: 'Judicial Integration', status: 'ONLINE', latency: '19ms' }
  ]

  const activeStaff = [
    { name: 'Samuel T.', role: 'NDSIR Analyst', department: 'Cybercrime Triage', accessLevel: 'Level 2' },
    { name: 'Dawit M.', role: 'Federal Police Officer', department: 'Cyber Division', accessLevel: 'Warrant Issuer' },
    { name: 'Hiber T.', role: 'Magistrate Judge', department: 'Federal Court', accessLevel: 'Ratification Authority' },
    { name: 'Abebe K.', role: 'Federal Auditor', department: 'Compliance General', accessLevel: 'Read/Verify Ledger' }
  ]

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-cyan-500/20 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/staff/login')}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-all text-slate-400 hover:text-white cursor-pointer group"
            title="Return to Portal Select"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-cyan-400 tracking-widest uppercase font-bold">SYSTEM GOVERNANCE — ADMINISTRATOR COMMAND</p>
              <h1 className="text-xl font-black text-white tracking-tight">Core Infrastructure & Access Control</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRoleInfo(!showRoleInfo)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-xl text-xs text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>{showRoleInfo ? 'Hide Role Guidelines' : 'View Role Guidelines'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto space-y-6">
        
        {/* Real-World Admin Roles & Responsibilities Panel */}
        {showRoleInfo && (
          <div className="bg-gradient-to-r from-cyan-950/40 via-[#070d1d] to-slate-900 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Administrator Role Mandate & Core Responsibilities</h2>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full animate-pulse">
                System Governance Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Users className="h-4 w-4" />
                  <span>1. Role & Identity Provisioning</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Manages multi-agency staff permissions across commercial banks, federal police investigators, triage analysts, and court magistrates.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Server className="h-4 w-4" />
                  <span>2. Financial API Gateway Health</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Monitors secure API webhook bridges connecting INSA to participating commercial banks (CBE, BOA, Awash) and Telebirr systems.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Lock className="h-4 w-4" />
                  <span>3. Security Protocols & Overrides</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Maintains cryptographic keys, enforces strict authentication policies, and handles emergency system-level fail-safes during active cyber incidents.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Animated Interactive Analytics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setSelectedMetric('nodes')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'nodes' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Active API Bridges</p>
              <Server className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-white mt-1">4 / 4</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[100%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-cyan-400 mt-2">100% operational uptime</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('users')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'users' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Registered Personnel</p>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-cyan-400 mt-1">128</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-400 h-full w-[85%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Across 5 distinct agencies</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('security')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'security' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Encryption Standard</p>
              <Key className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400 mt-1">AES-256</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[100%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-emerald-400 mt-2">Zero key rotation required</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('threat')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'threat' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Threat Level</p>
              <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-blue-400 mt-1">DEFCON 2</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full w-[60%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Enhanced national monitoring</p>
          </div>
        </div>

        {/* Infrastructure Nodes & System Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gateway Nodes Status */}
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Financial & Judicial Gateway Nodes</h3>
              </div>
              <button className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {systemNodes.map((node) => (
                <div key={node.id} className="bg-[#020617] border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{node.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({node.id})</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{node.type}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      <span>{node.status}</span>
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono">Latency: {node.latency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Authorized Personnel */}
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Authorized Personnel</h3>
              </div>
              <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Add User</span>
              </button>
            </div>

            <div className="space-y-3">
              {activeStaff.map((staff, idx) => (
                <div key={idx} className="bg-[#020617] border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/50 transition-all">
                  <div className="space-y-1">
                    <span className="font-bold text-white text-xs block">{staff.name}</span>
                    <p className="text-[10px] text-slate-400">{staff.department}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-cyan-400 text-xs font-semibold block">{staff.role}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md font-mono">{staff.accessLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
