import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldAlert,
  ArrowLeft,
  FolderOpen,
  LayoutDashboard,
  FileText,
  TrendingUp,
  Download,
  History,
  CheckCircle,
  Lock,
  Hash,
  UserCheck,
  Eye,
  ShieldCheck,
  Users,
  Activity,
  ArrowUpRight,
  Send,
  Radio
} from 'lucide-react'

export default function AnalystDashboard() {
  const navigate = useNavigate()
  const [actionStatus, setActionStatus] = useState(null)

  // Navigation State ('dashboard' | 'evidence' | 'audit')
  const [activeTab, setActiveTab] = useState('dashboard')

  // PIN Authorization Modal State
  const [pinModalOpen, setPinModalOpen] = useState(false)
  const [pendingFreezeId, setPendingFreezeId] = useState(null)
  const [analystPin, setAnalystPin] = useState('')
  const [pinError, setPinError] = useState(null)

  // Interactive Radial Chart Filter State ('all' | 'telebirr' | 'commercial' | 'abyssinia' | 'awash')
  const [selectedInstFilter, setSelectedInstFilter] = useState('all')

  // Highlight state for newly validated dossier feedback animation
  const [highlightedDossierId, setHighlightedDossierId] = useState(null)

  // Immutable Audit Log State
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-501', timestamp: 'Oct 01, 2026 - 03:15 AM', analyst: 'System Auto-Dispatcher', action: 'QUEUED_INCIDENT', details: 'Incident INC-2026-901 ingested from Telebirr P2P' },
    { id: 'LOG-502', timestamp: 'Oct 01, 2026 - 03:20 AM', analyst: 'Analyst_Behailu_K', action: 'EXECUTE_FREEZE', details: 'Dispatched emergency freeze command for case INC-2026-901' },
    { id: 'LOG-503', timestamp: 'Oct 01, 2026 - 03:28 AM', analyst: 'Analyst_Behailu_K', action: 'VERIFY_EVIDENCE', details: 'SHA-256 verified artifact file telebirr_fake_receipt.pdf' }
  ])

  // Live active freeze & incident queue with direct routing metadata
  const [activeFreezes, setActiveFreezes] = useState([
    { id: 'INC-2026-901', inst: 'Telebirr P2P', gatewayCode: 'ETH_TELEBIRR_API_v2', amount: 'ETB 450,000', risk: 'CRITICAL', suspect: 'ACC-9921-****-4100', status: 'FROZEN_SECURED', vector: 'SIM Swap / Phishing', evidence: ['receipt_901.pdf', 'chat_log.png'] },
    { id: 'INC-2026-902', inst: 'Commercial Bank of Ethiopia', gatewayCode: 'CBE_CORE_DIRECT_GATEWAY', amount: 'ETB 320,000', risk: 'HIGH', suspect: 'ACC-4412-****-8819', status: 'PENDING_FREEZE', vector: 'Unauthorized Bulk Transfer', evidence: ['statement_falsified.pdf'] },
    { id: 'INC-2026-903', inst: 'Bank of Abyssinia', gatewayCode: 'BOA_SWITCH_API_v1', amount: 'ETB 180,000', risk: 'HIGH', suspect: 'ACC-1102-****-3321', status: 'PENDING_FREEZE', vector: 'Synthetic Identity', evidence: ['phishing_url.txt', 'id_scan.jpg'] },
    { id: 'INC-2026-904', inst: 'Awash Bank', gatewayCode: 'AWASH_SECURE_LINK', amount: 'ETB 95,000', risk: 'MEDIUM', suspect: 'ACC-7734-****-1290', status: 'PENDING_FREEZE', vector: 'Credential Stuffing', evidence: ['sms_alert.jpg'] },
  ])

  // Comprehensive Victim Dossiers & Intelligence Reports for Analysts
  const [victimDossiers, setVictimDossiers] = useState([
    {
      id: 'SUB-881',
      victimName: 'Alemayehu Tadesse',
      nationalId: 'NID-ET-8912-9011',
      phone: '+251 91 123 4567',
      inst: 'Telebirr P2P',
      amount: 'ETB 45,000',
      vector: 'SIM Swap & Social Engineering',
      suspectTarget: 'ACC-9921-****-4100 (Telebirr Agent #409)',
      statement: 'Victim received an automated call claiming system upgrade, was prompted to enter USSD string, and lost funds within 3 minutes.',
      files: [
        { name: 'telebirr_fake_receipt.pdf', sha256: '8f4c9102...e3b1', size: '2.4 MB', verified: true },
        { name: 'call_recording_intercept.mp3', sha256: '1a2b3c4d...99ff', size: '4.1 MB', verified: true }
      ],
      date: 'Oct 1, 2026 - 02:45 AM',
      status: 'DOSSIER_VERIFIED'
    },
    {
      id: 'SUB-882',
      victimName: 'Hanna Bekele',
      nationalId: 'NID-ET-3321-1109',
      phone: '+251 92 345 6789',
      inst: 'Commercial Bank of Ethiopia',
      amount: 'ETB 120,000',
      vector: 'Phishing Portal (CBE-Birr clone)',
      suspectTarget: 'ACC-4412-****-8819',
      statement: 'Victim clicked a sponsored lookalike web link via Telegram advertising high-interest treasury bills and entered banking credentials.',
      files: [
        { name: 'cbe_phishing_screenshot.png', sha256: '5e6f7a8b...22aa', size: '1.8 MB', verified: true },
        { name: 'telegram_chat_export.json', sha256: '99887766...1100', size: '450 KB', verified: true }
      ],
      date: 'Oct 1, 2026 - 03:10 AM',
      status: 'PENDING_ANALYST_REVIEW'
    }
  ])

  const [selectedDossierModal, setSelectedDossierModal] = useState(null)

  const logAction = (action, details) => {
    const newLog = {
      id: `LOG-${Math.floor(600 + Math.random() * 300)}`,
      timestamp: 'Oct 01, 2026 - 04:19 AM',
      analyst: 'Analyst_Behailu_K',
      action,
      details
    }
    setAuditLogs(prev => [newLog, ...prev])
  }

  // Enhanced validation handler with visual pop-up confirmation & card pulse
  const handleValidateDossier = (dossier) => {
    const newIncidentId = `INC-2026-${Math.floor(950 + Math.random() * 900)}`

    const newFreezeEntry = {
      id: newIncidentId,
      inst: dossier.inst,
      gatewayCode: dossier.inst.includes('Telebirr') ? 'ETH_TELEBIRR_API_v2' : 'CBE_CORE_DIRECT_GATEWAY',
      amount: dossier.amount,
      risk: 'HIGH',
      suspect: dossier.suspectTarget,
      status: 'PENDING_FREEZE',
      vector: dossier.vector,
      evidence: dossier.files.map(f => f.name)
    }

    setActiveFreezes(prev => [newFreezeEntry, ...prev])

    setVictimDossiers(prev =>
      prev.map(d => d.id === dossier.id ? { ...d, status: 'QUEUED_FOR_FREEZE' } : d)
    )

    logAction('VERIFY_DOSSIER', `Evidence ${dossier.id} verified and escalated to freeze queue as ${newIncidentId}`)

    // Trigger pop-up feedback banner
    setActionStatus(`⚡ SUCCESS: Victim report ${dossier.id} verified! Transferred to dashboard freeze queue as ${newIncidentId}.`)

    // Highlight effect on dossier card
    setHighlightedDossierId(dossier.id)
    setTimeout(() => setHighlightedDossierId(null), 3000)

    // Automatically transition to dashboard tab after 2 seconds to view the new queue entry
    setTimeout(() => {
      setActiveTab('dashboard')
      setActionStatus(null)
    }, 2000)
  }

  const handleInitiateFreeze = (id) => {
    setPendingFreezeId(id)
    setAnalystPin('')
    setPinError(null)
    setPinModalOpen(true)
  }

  const handleVerifyAndExecuteFreeze = (e) => {
    e.preventDefault()
    if (!analystPin || analystPin.length < 4) {
      setPinError('Please enter your valid 4-digit analyst PIN.')
      return
    }

    const id = pendingFreezeId
    const targetIncident = activeFreezes.find(i => i.id === id)

    setActiveFreezes(prev => prev.map(item => item.id === id ? { ...item, status: 'FROZEN_SECURED' } : item))

    logAction('ANALYST_PIN_VERIFIED', `Analyst PIN successfully authenticated for case ${id} freeze`)
    logAction('DISPATCH_API_GATEWAY', `Successfully transmitted emergency asset freeze payload to ${targetIncident?.inst} [Gateway: ${targetIncident?.gatewayCode}]`)

    setPinModalOpen(false)
    setPendingFreezeId(null)
    setAnalystPin('')

    setActionStatus(`Secure API Freeze Dispatched Successfully to ${targetIncident?.inst} for case ${id}!`)
    setTimeout(() => setActionStatus(null), 5000)
  }

  const handleExportCSV = () => {
    const headers = "CaseID,Institution,GatewayCode,SuspectAccount,Amount,Vector,Status\n"
    const rows = activeFreezes.map(i => `${i.id},"${i.inst}","${i.gatewayCode}",${i.suspect},"${i.amount}","${i.vector}",${i.status}`).join("\n")
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `institutional_freeze_export_${Date.now()}.csv`
    a.click()
    logAction('EXPORT_CSV', 'Exported active institutional freeze queue data to CSV format')
    setActionStatus(`Successfully exported institutional active queue to CSV format.`)
    setTimeout(() => setActionStatus(null), 4000)
  }

  const handleExportPDF = () => {
    logAction('EXPORT_PDF', 'Generated official executive institutional threat containment PDF report')
    setActionStatus(`Executive Institutional PDF Report generated and downloaded successfully.`)
    setTimeout(() => setActionStatus(null), 4000)
  }

  const filteredFreezes = selectedInstFilter === 'all'
    ? activeFreezes
    : activeFreezes.filter(i => i.inst.toLowerCase().includes(selectedInstFilter))

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-cyan-500 selection:text-black">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pb-6 border-b border-cyan-500/20 mb-6 gap-4">
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
              <p className="text-[11px] text-cyan-400 tracking-widest uppercase font-bold">NATIONAL FRAUD RESPONSE & BANK GATEWAY DESK</p>
              <h1 className="text-xl font-black text-white tracking-tight">Analyst Freeze & Institutional API Hub</h1>
            </div>
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#070d1d] border border-slate-800 rounded-xl p-1 gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'dashboard'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard & Motion Graph
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'evidence'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <FolderOpen className="h-3.5 w-3.5" /> Victim Dossiers ({victimDossiers.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'audit'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <History className="h-3.5 w-3.5" /> Audit Log ({auditLogs.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="px-3 py-2 bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all"
            >
              <Download className="h-3.5 w-3.5" /> PDF Report
            </button>
          </div>
        </div>
      </header>

      {/* Prominent Glowing Action Feedback Banner */}
      {actionStatus && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="px-5 py-3 bg-cyan-950 border-2 border-cyan-400 rounded-2xl text-xs text-cyan-200 animate-pulse shadow-[0_0_30px_rgba(6,182,212,0.5)] text-center font-black flex items-center justify-center gap-3">
            <Radio className="h-5 w-5 animate-spin text-cyan-400" />
            <span>{actionStatus}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#070d1d] border border-slate-800 p-5 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Total Intercept Volume</span>
                  <Users size={16} className="text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">45.2K</span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                    <ArrowUpRight size={14} /> +12.4%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Directly routed to banking gateways</p>
              </div>

              <div className="bg-[#070d1d] border border-slate-800 p-5 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Gateway Success Rate</span>
                  <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">94.8%</span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                    <ArrowUpRight size={14} /> +2.1%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Telebirr & CBE API ACK response</p>
              </div>

              <div className="bg-[#070d1d] border border-slate-800 p-5 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Active Freeze Queue</span>
                  <Activity size={16} className="text-purple-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{activeFreezes.length}</span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center">
                    <ArrowUpRight size={14} /> Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Real-time concurrent threat tickers</p>
              </div>
            </div>

            {/* INTERACTIVE MOTION / RADIAL CIRCLE GRAPHICAL ANALYSIS */}
            <div className="bg-[#070d1d]/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Radio className="h-4 w-4 text-cyan-400 animate-pulse" /> Interactive Motion & Radial Institutional Distribution
                  </h2>
                  <p className="text-[11px] text-slate-400">Click institutional filters to dynamically update containment vectors and motion telemetry</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'telebirr', 'commercial', 'abyssinia', 'awash'].map((instKey) => (
                    <button
                      key={instKey}
                      onClick={() => setSelectedInstFilter(instKey)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase ${selectedInstFilter === instKey
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                    >
                      {instKey}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="bg-black/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-inner">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 animate-spin-slow" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="#06b6d4"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset={selectedInstFilter === 'all' ? "45" : selectedInstFilter === 'telebirr' ? "20" : "120"}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />
                      <circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="140"
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out opacity-80"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Active Ratio</span>
                      <span className="text-2xl font-black text-cyan-300">
                        {selectedInstFilter === 'all' ? '94.8%' : selectedInstFilter === 'telebirr' ? '98.2%' : '91.5%'}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-bold">API Gateway Active</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Tele/Mobile</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Commercial Banks</span>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Gateway Dispatch Status</span>
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded font-bold">CONNECTED</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {selectedInstFilter === 'all'
                        ? 'Displaying aggregate telemetry across all integrated Ethiopian banking switches and telecommunication gateways.'
                        : `Displaying targeted telemetry and live API routing status for filter: [${selectedInstFilter.toUpperCase()}].`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Avg Latency Time</span>
                      <p className="text-xl font-black text-white mt-1">42 ms</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Direct socket to National Clearing House</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Successful Freezes</span>
                      <p className="text-xl font-black text-white mt-1">1,184 Cases</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Assets locked before cross-border transfer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Incident Freeze Control Queue */}
            <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Incident Freeze Control Queue</h2>
                  <p className="text-[11px] text-slate-400">Authorize emergency account freezes to send directly to bank & telecom API gateways</p>
                </div>
                <div className="text-xs text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-xl">
                  Showing {filteredFreezes.length} Active Target Routes
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Case ID</th>
                      <th className="py-3 px-4">Target Institution & Gateway</th>
                      <th className="py-3 px-4">Suspect Account</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Attack Vector</th>
                      <th className="py-3 px-4">Freeze Status</th>
                      <th className="py-3 px-4 text-right">Gateway Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {filteredFreezes.map((inc) => (
                      <tr key={inc.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-4 px-4 font-bold text-cyan-400">{inc.id}</td>
                        <td className="py-4 px-4">
                          <p className="text-white font-semibold">{inc.inst}</p>
                          <p className="text-[10px] font-mono text-cyan-400/80">{inc.gatewayCode}</p>
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-mono">{inc.suspect}</td>
                        <td className="py-4 px-4 text-cyan-300 font-bold">{inc.amount}</td>
                        <td className="py-4 px-4 text-slate-400">{inc.vector}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${inc.status === 'PENDING_FREEZE' ? 'bg-amber-950/80 border border-amber-500/40 text-amber-400 animate-pulse' :
                            'bg-rose-950/80 border border-rose-500/40 text-rose-400'
                            }`}>
                            {inc.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {inc.status === 'PENDING_FREEZE' ? (
                            <button
                              onClick={() => handleInitiateFreeze(inc.id)}
                              className="px-3.5 py-1.5 bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-bold rounded-lg transition-all cursor-pointer text-xs shadow-md flex items-center gap-1.5 ml-auto"
                            >
                              <Send className="h-3.5 w-3.5" /> Send Freeze to Bank
                            </button>
                          ) : (
                            <span className="text-emerald-400 font-bold text-[11px] flex items-center justify-end gap-1">
                              <CheckCircle className="h-3.5 w-3.5" /> ACK Received
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-6">
            <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-cyan-400" /> Victim Dossiers & Evidence Investigation Center
                  </h2>
                  <p className="text-[11px] text-slate-400">Review complete citizen reports, verified financial statements, cryptographic hashes, and victim testimony</p>
                </div>
                <span className="text-xs bg-cyan-950 border border-cyan-500/40 px-3 py-1 rounded-xl text-cyan-300 font-bold">
                  {victimDossiers.length} Verified Reports
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {victimDossiers.map((dossier) => {
                  const isJustQueued = highlightedDossierId === dossier.id;
                  return (
                    <div
                      key={dossier.id}
                      className={`bg-slate-900/80 border rounded-2xl p-5 space-y-4 transition-all duration-500 ${isJustQueued
                        ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-bounce'
                        : 'border-slate-800 hover:border-cyan-500/40'
                        }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded-xl">{dossier.id}</span>
                          <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              {dossier.victimName} <span className="text-xs text-slate-500 font-normal">({dossier.phone})</span>
                            </h3>
                            <p className="text-[11px] text-slate-400">National ID: <span className="text-slate-300 font-mono">{dossier.nationalId}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-slate-800 text-cyan-300 px-3 py-1 rounded-xl font-bold border border-slate-700">
                            {dossier.inst} — {dossier.amount}
                          </span>
                          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border ${dossier.status === 'QUEUED_FOR_FREEZE'
                            ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                            : 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                            }`}>
                            {dossier.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-black/40 border border-slate-800/80 p-3.5 rounded-xl space-y-1.5">
                          <p className="text-slate-400 text-[11px] uppercase font-bold text-cyan-400">Victim Incident Statement</p>
                          <p className="text-slate-200 leading-relaxed italic">"{dossier.statement}"</p>
                          <p className="text-[11px] text-slate-500 pt-1">Attack Vector: <span className="text-amber-400 font-semibold">{dossier.vector}</span></p>
                        </div>

                        <div className="bg-black/40 border border-slate-800/80 p-3.5 rounded-xl space-y-2">
                          <p className="text-slate-400 text-[11px] uppercase font-bold text-cyan-400">Cryptographic Evidence Artifacts ({dossier.files.length})</p>
                          <div className="space-y-1.5">
                            {dossier.files.map((file, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                                <span className="text-cyan-300 flex items-center gap-1.5 truncate"><FileText className="h-3.5 w-3.5" /> {file.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-emerald-400 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> SHA-256 OK</span>
                                  <span className="text-[10px] text-slate-500">({file.size})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2 border-t border-slate-800/60">
                        <button
                          onClick={() => {
                            logAction('INSPECT_DOSSIER', `Opened complete intelligence dossier for victim ${dossier.victimName} (${dossier.id})`)
                            setSelectedDossierModal(dossier)
                          }}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5 text-cyan-400" /> View Full Case Dossier
                        </button>

                        <button
                          onClick={() => handleValidateDossier(dossier)}
                          disabled={dossier.status === 'QUEUED_FOR_FREEZE'}
                          className={`px-4 py-2 font-bold rounded-xl text-xs transition-all shadow flex items-center gap-1.5 ${dossier.status === 'QUEUED_FOR_FREEZE'
                            ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 cursor-pointer'
                            }`}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          {dossier.status === 'QUEUED_FOR_FREEZE' ? 'Already Queued in Dashboard' : 'Validate & Authorize Freeze'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <History className="h-4 w-4 text-cyan-400" /> Immutable Analyst Action Audit Trail
                </h2>
                <p className="text-[11px] text-slate-400">Chronological record of all freeze dispatches, PIN authorizations, and API gateway acknowledgments</p>
              </div>
              <span className="text-xs bg-cyan-950 border border-cyan-500/40 px-3 py-1 rounded-xl text-cyan-300 font-bold">{auditLogs.length} Log Entries</span>
            </div>

            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div key={log.id} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-cyan-950 border border-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-lg">{log.id}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{log.action}</span>
                        <span className="text-[10px] text-slate-500">by {log.analyst}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ANALYST PIN AUTHORIZATION MODAL */}
      {pinModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#070d1d] border border-cyan-500/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Lock className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Bank Gateway PIN Verification</h3>
              </div>
              <button onClick={() => setPinModalOpen(false)} className="text-slate-400 hover:text-white text-xs cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleVerifyAndExecuteFreeze} className="space-y-4 text-xs">
              <div className="bg-cyan-950/40 border border-cyan-500/30 p-3.5 rounded-xl space-y-1">
                <p className="text-cyan-300 font-bold">Secure Institutional Transmission</p>
                <p className="text-slate-400 text-[11px]">Dispatching an emergency asset freeze payload to the bank/telecom gateway for case <span className="text-white font-bold">{pendingFreezeId}</span> requires your 4-digit analyst PIN.</p>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-bold">Enter 4-Digit Analyst PIN</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={analystPin}
                    onChange={(e) => setAnalystPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white font-mono tracking-widest text-lg focus:border-cyan-500 outline-none"
                  />
                </div>
                {pinError && <p className="text-rose-400 text-[10px] mt-1">{pinError}</p>}
              </div>

              <div className="flex items-center justify-between text-[11px] bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Testing shortcut?</span>
                <button
                  type="button"
                  onClick={() => {
                    setAnalystPin('1234')
                    setPinError(null)
                  }}
                  className="text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  Auto-Fill PIN (1234)
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-bold cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Confirm PIN & Send to Bank Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILED VICTIM DOSSIER MODAL */}
      {selectedDossierModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#070d1d] border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" /> Comprehensive Victim Case Dossier — {selectedDossierModal.id}
              </h3>
              <button onClick={() => setSelectedDossierModal(null)} className="text-slate-400 hover:text-white text-xs cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <p><span className="text-slate-500">Victim Full Name:</span> <strong className="text-white">{selectedDossierModal.victimName}</strong></p>
                <p><span className="text-slate-500">National ID:</span> <strong className="text-white">{selectedDossierModal.nationalId}</strong></p>
                <p><span className="text-slate-500">Phone Number:</span> <strong className="text-cyan-300">{selectedDossierModal.phone}</strong></p>
                <p><span className="text-slate-500">Target Institution:</span> <strong className="text-white">{selectedDossierModal.inst}</strong></p>
                <p><span className="text-slate-500">Loss Amount:</span> <strong className="text-cyan-400">{selectedDossierModal.amount}</strong></p>
                <p><span className="text-slate-500">Suspect Destination:</span> <strong className="text-rose-400">{selectedDossierModal.suspectTarget}</strong></p>
              </div>

              <div className="space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[11px]">Victim Statement & Timeline</p>
                <div className="bg-black/50 p-3 rounded-xl border border-slate-800 text-slate-300 italic">
                  "{selectedDossierModal.statement}"
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-slate-400 font-bold uppercase text-[11px]">Verified Cryptographic Evidence Files</p>
                <div className="space-y-2">
                  {selectedDossierModal.files.map((file, idx) => (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-cyan-300 font-semibold">{file.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">SHA-256 Hash: {file.sha256}</p>
                      </div>
                      <span className="text-emerald-400 text-[11px] font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-500/30">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedDossierModal(null)}
                className="px-4 py-2 rounded-xl text-xs bg-slate-900 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  const dossier = selectedDossierModal
                  setSelectedDossierModal(null)
                  handleValidateDossier(dossier)
                }}
                className="px-4 py-2 rounded-xl text-xs bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" /> Authorize & Send to Gateway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}