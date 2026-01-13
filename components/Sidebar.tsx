
import React from 'react';
import { AppView } from '../types';
import { NAVIGATION } from '../constants';
import { BellOff, Bell, Square, LayoutTemplate } from 'lucide-react';

interface SidebarProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  isDndActive: boolean;
  onToggleDnd: () => void;
  isNotchVisible: boolean;
  onToggleNotch: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  isDndActive, 
  onToggleDnd,
  isNotchVisible,
  onToggleNotch
}) => {
  return (
    <aside className="w-64 bg-black/60 border-r border-white/5 flex flex-col pt-16 p-6">
      <div className="mb-12">
        <h1 className="text-2xl font-light tracking-tighter text-white">Reality Check</h1>
        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mt-2 font-black">Intelligence</p>
      </div>

      <nav className="flex-1 space-y-2">
        {NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] transition-all duration-500 ease-out ${
              activeView === item.id 
                ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] translate-x-1' 
                : 'text-white/30 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <span className="opacity-80">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 16, strokeWidth: activeView === item.id ? 2.5 : 1.5 })}
            </span>
            <span className={activeView === item.id ? 'font-bold tracking-tight' : 'font-light'}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-3">
        {/* Notch Toggle */}
        <button 
          onClick={onToggleNotch}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300 ${
            isNotchVisible 
            ? 'bg-white/5 border-white/10 text-white/60' 
            : 'bg-black/40 border-white/5 text-white/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutTemplate size={14} />
            <span className="text-[11px] font-medium tracking-tight">Active Notch</span>
          </div>
          <div className={`w-6 h-3 rounded-full relative transition-colors ${isNotchVisible ? 'bg-white/40' : 'bg-white/5'}`}>
            <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all ${isNotchVisible ? 'left-3.5' : 'left-0.5'}`}></div>
          </div>
        </button>

        {/* Do Not Disturb Toggle */}
        <button 
          onClick={onToggleDnd}
          className={`w-full flex items-center justify-between p-4 rounded-3xl border transition-all duration-300 ${
            isDndActive 
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
            : 'bg-white/5 border-white/5 text-white/40 hover:text-white/60'
          }`}
        >
          <div className="flex items-center gap-3">
            {isDndActive ? <BellOff size={16} /> : <Bell size={16} />}
            <span className="text-xs font-medium">Do Not Disturb</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isDndActive ? 'bg-amber-500/40' : 'bg-white/10'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isDndActive ? 'left-[17px]' : 'left-0.5'}`}></div>
          </div>
        </button>

        <div className="flex items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[10px] text-white font-black group-hover:scale-105 transition-transform">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/80">Jan Doe</span>
            <span className="text-[8px] text-white/20 uppercase tracking-widest font-black">Syncing...</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
