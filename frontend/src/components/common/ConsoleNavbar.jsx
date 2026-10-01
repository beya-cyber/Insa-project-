import React from 'react';

export default function ConsoleNavbar() {
  return (
    <header className="w-full bg-[#0b132b]/95 backdrop-blur-md border-b border-cyan-900/50 px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Analyst Workspace Badge & Navigation */}
      <div className="flex items-center space-x-4">
        <nav className="flex items-center space-x-2">
          <span className="bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Analyst Hub
          </span>
        </nav>
      </div>

      {/* Control Actions & Status */}
      <div className="flex items-center space-x-4">
        {/* Direct Node Control Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Direct Node Control Active
        </div>

        {/* Quick Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search cases, IPs, assets..."
            className="bg-slate-900/80 border border-slate-700/60 text-slate-200 text-xs rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyan-500 w-48 transition-all"
          />
          <svg
            className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Sign Out Action */}
        <button
          onClick={() => {
            window.location.href = '/login';
          }}
          className="bg-rose-950/80 text-rose-300 border border-rose-800/60 hover:bg-rose-900 hover:text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5"
        >
          <span>[➔</span>
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
