import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, User, AlertCircle, KeyRound, Building2, ArrowRight } from 'lucide-react'

export default function StaffLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [institution, setInstitution] = useState('INSA Cyber Operations')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter both username/badge ID and password.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      navigate('/staff')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      {/* Navigation Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto p-6 flex justify-between items-center border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-950 border border-cyan-500/40 rounded-xl text-cyan-400">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-cyan-400 block uppercase">NDSIR PORTAL</span>
            <span className="text-sm font-extrabold text-white tracking-tight">INSA Anti-Fraud Command</span>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TLS 1.3 ENCRYPTED LINK</span>
        </div>
      </header>

      {/* Login Card */}
      <main className="relative z-10 my-auto py-12 px-4 flex justify-center items-center">
        <div className="w-full max-w-md bg-[#070e22] border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-cyan-950/20 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Lock className="h-3 w-3 text-cyan-400" />
              RESTRICTED PERSONNEL ONLY
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Staff & Partner Sign-in</h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Authorized access for INSA Cyber Command, EthSwitch operators, and bank anti-fraud liaisons.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Organization Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                ORGANIZATION / ROLE
              </label>
              <div className="relative">
                <Building2 className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400 z-10" />
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="INSA Cyber Operations">INSA Cyber Command (Tier 1 & 2)</option>
                  <option value="EthSwitch Ops">EthSwitch Clearing House Ops</option>
                  <option value="Commercial Bank Liaison">Commercial Bank Anti-Fraud Liaison</option>
                  <option value="Federal Police Crime Unit">Federal Police Cyber Crime Unit</option>
                </select>
              </div>
            </div>

            {/* Username / Badge ID */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                BADGE ID OR USERNAME
              </label>
              <div className="relative">
                <User className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400 z-10" />
                <input
                  type="text"
                  placeholder="e.g., INSA-8840-KB"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono placeholder:text-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Security Key / Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  SECURITY KEY / PASSWORD
                </label>
                <button 
                  type="button" 
                  onClick={() => alert("Contact your INSA Administrator or SOC to reset credentials.")} 
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  Forgot key?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400 z-10" />
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono placeholder:text-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER COMMAND CENTER</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center space-y-1 font-mono">
            <p>Monitored under Ethiopian Cybercrime Proclamation No. 761/2012.</p>
            <p className="text-slate-600">INSA SOC: soc-support@insa.gov.et</p>
          </div>

        </div>
      </main>

      <footer className="relative z-10 w-full max-w-7xl mx-auto p-6 text-center text-xs text-slate-500 font-mono">
        © 2026 Information Network Security Administration (INSA) & EthSwitch S.C.
      </footer>

    </div>
  )
}
