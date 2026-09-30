import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, FileText, CheckCircle2, AlertTriangle, Search, ArrowLeft, BookOpen, Scale, Lock, RefreshCw, Send, UserCheck } from 'lucide-react'

export default function PoliceDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [showRoleInfo, setShowRoleInfo] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState('all')

  const warrantPackages = [
    {
      id: 'WAR-2026-449',
      timestamp: '2026-09-29 08:30:00',
      caseTitle: 'Operation PhishNet - Syndicate Node Alpha',
      investigator: 'Inspector Dawit M. (Federal Police Cyber Division)',
      judge: 'Hon. Magistrate Judge Hiber T.',
      targetEntity: 'Account #1000892341209 (CBE)',
      legalRef: 'Cybercrime Proclamation 1185/2020 Art. 24',
      status: 'RATIFIED_ACTIVE'
    },
    {
      id: 'WAR-2026-450',
      timestamp: '2026-09-29 10:15:00',
      caseTitle: 'SIM Swap & Mobile Money Intercept',
      investigator: 'Sergeant Samuel K.',
      judge: 'Pending Court Assignment',
      targetEntity: 'Telebirr #0911223344',
      legalRef: 'Criminal Procedure Code Art. 32',
      status: 'PENDING_JUDICIAL_SIGN'
    },
    {
      id: 'WAR-2026-451',
      timestamp: '2026-09-28 14:00:00',
      caseTitle: 'Cryptocurrency Ransomware Layering',
      investigator: 'Inspector Dawit M.',
      judge: 'Hon. Magistrate Judge Almaz B.',
      targetEntity: 'Wallet Hash 0x71C...92A',
      legalRef: 'Anti-Money Laundering Proclamation',
      status: 'EXECUTED_ARCHIVED'
    }
  ]

  const filteredWarrants = warrantPackages.filter(item => {
    const matchesSearch = item.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.targetEntity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'ALL' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-blue-500 selection:text-black">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-blue-500/20 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/staff/login')}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 transition-all text-slate-400 hover:text-white cursor-pointer group"
            title="Return to Portal Select"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-950/80 border border-blue-500/50 rounded-2xl text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] text-blue-400 tracking-widest uppercase font-bold">FEDERAL POLICE & JUDICIAL COMMAND</p>
              <h1 className="text-xl font-black text-white tracking-tight">Digital Warrant & Seizure Package Portal</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRoleInfo(!showRoleInfo)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl text-xs text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-blue-400" />
            <span>{showRoleInfo ? 'Hide Role Guidelines' : 'View Role Guidelines'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto space-y-6">
        
        {/* Real-World Police & Judicial Role Panel */}
        {showRoleInfo && (
          <div className="bg-gradient-to-r from-blue-950/40 via-[#070d1d] to-slate-900 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl space-y-4 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Law Enforcement & Court Mandate & Responsibilities</h2>
              </div>
              <span className="text-[10px] text-blue-400 bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 rounded-full animate-pulse">
                Judicial Verification Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#020617]/80 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <FileText className="h-4 w-4" />
                  <span>1. Electronic Warrant Drafting</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Federal Police investigators compile evidence packages and submit standardized digital warrant requests directly to magistrates.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <UserCheck className="h-4 w-4" />
                  <span>2. Judicial Ratification</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Magistrate judges review cryptographic evidence hashes and digitally sign asset seizure orders under Cybercrime Proclamation 1185/2020.
                </p>
              </div>

              <div className="bg-[#020617]/80 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 space-y-2 transition-all">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Lock className="h-4 w-4" />
                  <span>3. Secure Execution Dispatch</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Approved warrants automatically trigger bank freeze webhooks with tamper-evident audit logs recorded on the immutable ledger.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Animated Interactive Analytics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setSelectedMetric('active')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'active' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Active Warrants</p>
              <Shield className="h-4 w-4 text-blue-400 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-white mt-1">12</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-blue-400 mt-2">Currently being enforced</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('pending')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'pending' ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Pending Ratification</p>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-400 mt-1">3</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-400 h-full w-[40%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Awaiting magistrate digital signature</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('executed')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'executed' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Executed This Month</p>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400 mt-1">45</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[100%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-emerald-400 mt-2">Successful seizure operations</p>
          </div>

          <div 
            onClick={() => setSelectedMetric('compliance')}
            className={`bg-[#070d1d]/80 border rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all ${selectedMetric === 'compliance' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400 uppercase">Legal Framework</p>
              <Scale className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-cyan-400 mt-1">PROCLAMATION</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[100%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Proclamation No. 1185/2020</p>
          </div>
        </div>

        {/* Search, Filter & Warrants Table */}
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search Warrants by ID, Case Title, or Target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#020617] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#020617] border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="ALL">All Statuses</option>
                <option value="RATIFIED_ACTIVE">Ratified Active</option>
                <option value="PENDING_JUDICIAL_SIGN">Pending Judicial Sign</option>
                <option value="EXECUTED_ARCHIVED">Executed & Archived</option>
              </select>
              <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <FileText className="h-4 w-4" />
                <span>New Warrant Request</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Warrant ID & Time</th>
                  <th className="py-3 px-4">Case Title & Target</th>
                  <th className="py-3 px-4">Investigator & Judge</th>
                  <th className="py-3 px-4">Legal Foundation</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredWarrants.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors group">
                    <td className="py-4 px-4">
                      <span className="font-bold text-white group-hover:text-blue-400 transition-colors block">{item.id}</span>
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-blue-400 font-semibold block">{item.caseTitle}</span>
                      <span className="font-mono text-slate-300">{item.targetEntity}</span>
                    </td>
                    <td className="py-4 px-4 space-y-0.5">
                      <span className="text-slate-200 block text-[11px]">{item.investigator}</span>
                      <span className="text-[10px] text-slate-400 block">Judge: {item.judge}</span>
                    </td>
                    <td className="py-4 px-4 text-[11px] text-slate-400">{item.legalRef}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'RATIFIED_ACTIVE' 
                          ? 'bg-blue-950/80 border border-blue-500/40 text-blue-400' 
                          : item.status === 'PENDING_JUDICIAL_SIGN'
                          ? 'bg-amber-950/80 border border-amber-500/40 text-amber-400 animate-pulse'
                          : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      }`}>
                        {item.status === 'RATIFIED_ACTIVE' ? <CheckCircle2 className="h-3 w-3" /> : item.status === 'PENDING_JUDICIAL_SIGN' ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
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
