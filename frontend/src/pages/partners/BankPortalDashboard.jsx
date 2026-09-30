import React, { useState } from 'react'
import { ShieldCheck, FileText, CheckCircle2, RefreshCw, Landmark, Building2, Search, Lock, ShieldAlert, BarChart3, PieChart, Activity, Cpu, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function BankPortalDashboard() {
  const [warrants, setWarrants] = useState([
    { id: 1, warrant_id: 'WNT-CBE-2026-091', target_account: 'CBE-10002938491', institution: 'Commercial Bank of Ethiopia', amount: '1,200,000.00', status: 'PENDING CORE FREEZE', issue_date: '2026-09-29', severity: 'CRITICAL', clearing_node: 'ADDIS-CORE-01' },
    { id: 2, warrant_id: 'WNT-BOA-2026-092', target_account: 'BOA-88392019', institution: 'Bank of Abyssinia', amount: '430,000.00', status: 'EXECUTED', issue_date: '2026-09-29', severity: 'HIGH', clearing_node: 'BOA-SWITCH-03' },
    { id: 3, warrant_id: 'WNT-TEL-2026-093', target_account: 'TELEBIRR-0911829391', institution: 'Ethio Telecom / Telebirr', amount: '85,000.00', status: 'PENDING CORE FREEZE', issue_date: '2026-09-29', severity: 'CRITICAL', clearing_node: 'TEL-P2P-GW' },
    { id: 4, warrant_id: 'WNT-AWS-2026-094', target_account: 'AWASH-10049281', institution: 'Awash Bank', amount: '310,000.00', status: 'PENDING CORE FREEZE', issue_date: '2026-09-29', severity: 'MEDIUM', clearing_node: 'AWASH-CORE-02' }
  ])
  
  const [loading, setLoading] = useState(false)
  const [executingId, setExecutingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [successBanner, setSuccessBanner] = useState(null)
  const [selectedWarrant, setSelectedWarrant] = useState(null)

  const handleExecuteFreeze = async (id) => {
    setExecutingId(id)
    setTimeout(() => {
      setWarrants(prev => prev.map(w => w.id === id ? { ...w, status: 'EXECUTED' } : w))
      setExecutingId(null)
      const targetWarrant = warrants.find(w => w.id === id)
      setSuccessBanner(`Core Banking node successfully locked account ${targetWarrant?.target_account}. Interbank settlement halt verified.`)
      setTimeout(() => setSuccessBanner(null), 5000)
    }, 600)
  }

  const filteredWarrants = warrants.filter(w => {
    return w.warrant_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           w.target_account.toLowerCase().includes(searchQuery.toLowerCase()) ||
           w.institution.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const pendingCount = warrants.filter(w => w.status === 'PENDING CORE FREEZE').length
  const executedCount = warrants.filter(w => w.status === 'EXECUTED').length
  const totalVolume = warrants.reduce((acc, curr) => acc + parseFloat(curr.amount.replace(/,/g, '')), 0)

  return (
    <div className="min-h-screen bg-[#010409] text-slate-100 font-mono p-6 selection:bg-blue-500 selection:text-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Success Notification */}
      {successBanner && (
        <div className="relative z-20 mb-6 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" />
            <span className="text-xs font-bold">{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-400 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#070d1d]/90 border border-blue-500/30 rounded-2xl p-6 mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-950/80 border border-blue-500/50 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Landmark className="h-8 w-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-blue-400 text-xs tracking-widest uppercase">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Financial Institution Core Clearing & Settlement Node</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              BANK COMPLIANCE & FREEZE PORTAL
              <span className="text-xs bg-blue-950 text-blue-400 border border-blue-800 px-3 py-1 rounded-full">CUSTODIAL GATEWAY</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button 
            onClick={() => setLoading(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-blue-500/40 px-4 py-2.5 rounded-xl text-xs text-blue-300 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
            SYNC CORE LEDGER
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Pending Core Freezes</p>
          <h3 className="text-3xl font-black text-amber-400 mt-1">{pendingCount}</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Executed Account Locks</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">{executedCount}</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Vault Liquidity Protected</p>
          <h3 className="text-2xl font-black text-white mt-1">ETB {(totalVolume / 1000000).toFixed(2)}M</h3>
        </div>
        <div className="bg-[#070d1d]/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <p className="text-[11px] text-slate-400 uppercase">Switch Latency</p>
          <h3 className="text-3xl font-black text-cyan-400 mt-1">8ms</h3>
        </div>
      </div>

      {/* Graphical Analytics Section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#070d1d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Asset Lock Distribution</h3>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">Real-Time</span>
          </div>

          <div className="space-y-4 my-auto">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Commercial Bank of Ethiopia</span>
                <span className="text-blue-400 font-bold">58%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Bank of Abyssinia</span>
                <span className="text-cyan-400 font-bold}">{''}22%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Ethio Telecom / Telebirr</span>
                <span className="text-emerald-400 font-bold">12%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500" style={{ width: '12%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Awash Bank</span>
                <span className="text-amber-400 font-bold">8%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-500" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#070d1d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Core Banking Settlement Ingestion Load</h3>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">Uptime: 99.99%</span>
          </div>

          <div className="h-40 flex items-end gap-3 pt-6 px-2 border-b border-slate-800 pb-2">
            {[40, 55, 30, 65, 85, 95, 70, 45, 60, 80, 92, 100, 75, 50, 40, 65, 85, 90, 75, 50, 35, 45, 60, 70].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div 
                  className={`w-full rounded-t transition-all duration-300 ${val > 85 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-700 hover:bg-blue-400'}`} 
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[9px] text-slate-500 group-hover:text-blue-400">{idx}h</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
            <span>Status: Core Systems Synchronized</span>
            <span className="text-blue-400 font-bold">Clearing House Protocol v4.2</span>
          </div>
        </div>
      </div>

      {/* Warrants Table */}
      <div className="relative z-10 bg-[#070d1d]/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#050914]">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Custodial Core Account Freezing Warrants</h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search warrant ID, account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020617] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#040710] text-[11px] text-slate-400 uppercase tracking-widest">
                <th className="p-4">Warrant Ref</th>
                <th className="p-4">Institution Node</th>
                <th className="p-4">Target Account / Wallet</th>
                <th className="p-4">Amount (ETB)</th>
                <th className="p-4">Clearing Gateway</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Core Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWarrants.map(w => (
                <tr key={w.id} className="hover:bg-blue-950/20 transition-colors">
                  <td className="p-4 font-bold text-blue-400 cursor-pointer hover:underline" onClick={() => setSelectedWarrant(w)}>
                    {w.warrant_id}
                  </td>
                  <td className="p-4 text-slate-300">{w.institution}</td>
                  <td className="p-4 text-slate-200">{w.target_account}</td>
                  <td className="p-4 text-white font-bold">{w.amount}</td>
                  <td className="p-4 text-slate-400 text-xs font-mono">{w.clearing_node}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      w.status === 'EXECUTED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {w.status === 'PENDING CORE FREEZE' ? (
                      <button
                        onClick={() => handleExecuteFreeze(w.id)}
                        disabled={executingId === w.id}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer active:scale-95 transition-all"
                      >
                        {executingId === w.id ? 'LOCKING NODE...' : 'EXECUTE CORE LOCK'}
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold inline-flex items-center gap-1 bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-800">
                        <CheckCircle2 className="h-4 w-4" /> SECURED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warrant Detail Modal */}
      {selectedWarrant && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-[#070d1d] border border-blue-500/50 rounded-3xl p-6 max-w-lg w-full shadow-[0_0_60px_rgba(59,130,246,0.3)] space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Core Banking Warrant Telemetry</h3>
              </div>
              <button onClick={() => setSelectedWarrant(null)} className="text-slate-400 hover:text-white text-sm cursor-pointer">✕ ESC</button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="bg-[#020617] p-4 rounded-xl border border-slate-800 space-y-2">
                <p className="text-slate-400">Warrant Identifier: <span className="text-blue-400 font-bold">{selectedWarrant.warrant_id}</span></p>
                <p className="text-slate-400">Target Account: <span className="text-white font-bold">{selectedWarrant.target_account}</span></p>
                <p className="text-slate-400">Blocked Amount: <span className="text-rose-400 font-bold">{selectedWarrant.amount} ETB</span></p>
                <p className="text-slate-400">Clearing Node: <span className="text-amber-300 font-bold">{selectedWarrant.clearing_node}</span></p>
                <p className="text-slate-400">Settlement Hash: <span className="text-emerald-400 font-mono">0x4a2b...c910 (Encrypted)</span></p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setSelectedWarrant(null)} className="px-4 py-2 bg-slate-900 text-slate-300 rounded-xl text-xs cursor-pointer">CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
