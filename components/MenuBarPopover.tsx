
import React from 'react';
import { Music, Play, X, ExternalLink, Activity, LayoutTemplate } from 'lucide-react';

interface MenuBarPopoverProps {
  onClose: () => void;
  onOpenDashboard: () => void;
  activeApp?: {
    name: string;
    icon: React.ReactNode;
    color: string;
  };
  focusedTime: number;
  isNotchVisible: boolean;
  onToggleNotch: () => void;
}

const MenuBarPopover: React.FC<MenuBarPopoverProps> = ({ 
  onClose, 
  onOpenDashboard, 
  activeApp, 
  focusedTime,
  isNotchVisible,
  onToggleNotch
}) => {
  return (
    <div className="w-80 glass mac-shadow border border-white/10 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-white/40" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Assistant Node</span>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white transition-colors"><X size={14} /></button>
      </div>

      <div className="p-4 space-y-4">
        {/* Active App Section */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Active Reality</span>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
              <span className="text-[9px] text-white font-mono">LIVE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-white/80 animate-in slide-in-from-left-2 duration-500">
              {activeApp?.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium tracking-tight animate-in fade-in duration-500">{activeApp?.name}</span>
              <span className="text-[10px] text-white/30 font-light">Monitoring context...</span>
            </div>
          </div>
        </div>

        {/* Notch Toggle in Popover */}
        <button 
          onClick={onToggleNotch}
          className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <LayoutTemplate size={14} className="text-white/40" />
            <span className="text-xs font-medium">Display Dynamic Notch</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isNotchVisible ? 'bg-white/40' : 'bg-white/5'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isNotchVisible ? 'left-[17px]' : 'left-0.5'}`}></div>
          </div>
        </button>

        {/* Progress Card */}
        <div className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Current Node Progress</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-light tracking-tighter">{focusedTime}m <span className="text-xs opacity-20 font-normal">done</span></span>
            <span className="text-[10px] text-white/40">Node Session</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-[45%] h-full bg-white rounded-full"></div>
          </div>
          <p className="text-[10px] text-white/30 italic font-light">"Current focus quality: Elevated."</p>
        </div>

        {/* Music Control */}
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40 group-hover:text-white transition-all">
            <Music size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium truncate">Deep Focus Mix</p>
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-full text-white/40 hover:text-white"><Play size={12} fill="currentColor" /></button>
        </div>

        <button 
          onClick={onOpenDashboard}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-[0.98]"
        >
          <span>Open Dashboard</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};

export default MenuBarPopover;
