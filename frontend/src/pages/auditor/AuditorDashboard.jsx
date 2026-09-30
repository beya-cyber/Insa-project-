import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileCheck, ShieldCheck, AlertCircle, Search, ArrowLeft, BookOpen, Scale, Eye, RefreshCw, Download, FileText } from 'lucide-react'

export default function AuditorDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCompliance, setFilterCompliance] = useState('ALL')
  const [showRoleInfo, setShowRoleInfo] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState('all')

  const auditReports = [
    {
      id: 'AUD-2026-301',
      timestamp: '2026-09-29 09:00:00',
      auditedEntity: 'Commercial Bank of Ethiopia (CBE) API Gateway',
      focusArea: 'NBE Directive No. FXD/85/2024 Compliance & Freeze Latency',
      leadAuditor: 'Senior Compliance Auditor Mulugeta T.',
      riskRating: 'LOW RISK (OPTIMAL)',
      status: 'VERIFIED_COMPLIANT'
    },
    {
      id: 'AUD-2026-302',
      timestamp: '2026-09-28 14:30:10',
      auditedEntity: 'Federal Police Digital Warrant Engine',
      focusArea: 'Cybercrime Proclamation 1185/2020 Seizure Protocol Adherence',
      leadAuditor: 'Auditor Sara H.',
      riskRating: 'MODERATE REVIEW',
      status: 'PENDING_REMEDIATION'
    },
    {
      id: 'AUD-2026-303',
      timestamp: '2026-09-27 16:20:45',
      auditedEntity: 'National SOC Triage & Data Retention',
      focusArea: 'Data Privacy & Immutable Audit Log Integrity',
      leadAuditor: 'Senior Compliance Auditor Mulugeta T.',
      riskRating: 'LOW RISK (OPTIMAL)',
      status: 'VERIFIED_COMPLIANT'
    }
  ]

  const filteredReports = auditReports.filter(item => {
    const matchesSearch = item.auditedEntity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.leadAuditor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCompliance === 'ALL' || item.status === filterCompliance
    return matchesSearch && matchesFilter
  })

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
              <FileCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-cyan-400 tracking-widest uppercase font-bold">INDEPENDENT REGULATORY OVERSIGHT</p>
              <h1 className="text-xl font-black text-white tracking-tight">Compliance Auditor & AML Verification Portal</h1>
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
        
        {/* Real-World Auditor Role Panel */}
        {showRoleInfo && (
          <div className="bg-gradient-to-r from-cyan-950/40 via-[#070d1d] to-slate-900 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Compliance Auditor Mandate & Core Responsibilities</h2>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full animate-pulse">
                Regulatory Oversight Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>1. Statutory Compliance Audits</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Independently verifies that bank freeze webhooks and police warrants strictly conform to NBE directives and anti-money laundering (AML) laws.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Eye className="h-4 w-4" />
                  <span>2. Non-Repudiation Inspection</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Inspects immutable system audit logs to guarantee zero unauthorized actor tampering or procedural bypasses across multi-agency bridges.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <FileText className="h-4 w-4" />
                  <span>3. Certification & Reporting</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Generates tamper-proof compliance certificates and remediation briefs for submission to national financial oversight boards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Graphical Analytics & Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setSelectedMetric('audits')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'audits' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Completed Audits</p>
              <FileCheck className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-white mt-1">28</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[95%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-cyan-400 mt-2">Verified across all agency nodes</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('score')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'score' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Regulatory Score</p>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400 mt-1">98.4%</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[98%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Meets international AML benchmarks</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('pending')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'pending' ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Pending Remediation</p>
              <AlertCircle className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-400 mt-1">2</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-400 h-full w-[20%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Actions under agency review</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('status')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'status' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Audit Status</p>
              <RefreshCw className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-black text-blue-400 mt-1">ACTIVE</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full w-[100%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Continuous automated ledger scan</p>
          </div>
        </div>

        {/* Search, Filter & Audit Reports Table */}
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search Reports by Entity, ID, or Auditor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#020617] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={filterCompliance}
                onChange={(e) => setFilterCompliance(e.target.value)}
                className="bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-all"
              >
                <option value="ALL">All Compliance Statuses</option>
                <option value="VERIFIED_COMPLIANT">Verified Compliant</option>
                <option value="PENDING_REMEDIATION">Pending Remediation</option>
              </select>
              <button className="px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Download className="h-4 w-4" />
                <span>Export Audit Certificate</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Audit ID & Timestamp</th>
                  <th className="py-3 px-4">Audited Entity & Focus Area</th>
                  <th className="py-3 px-4">Lead Auditor</th>
                  <th className="py-3 px-4">Risk Rating</th>
                  <th className="py-3 px-4">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredReports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors group">
                    <td className="py-4 px-4">
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors block">{item.id}</span>
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-cyan-400 font-semibold block">{item.auditedEntity}</span>
                      <span className="text-slate-300 text-[11px]">{item.focusArea}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-200">{item.leadAuditor}</td>
                    <td className="py-4 px-4 font-bold text-amber-400">{item.riskRating}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'VERIFIED_COMPLIANT' 
                          ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400' 
                          : 'bg-amber-950/80 border border-amber-500/40 text-amber-400 animate-pulse'
                      }`}>
                        {item.status === 'VERIFIED_COMPLIANT' ? <ShieldCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        <span>{item.status}</span>
                      </span>
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
