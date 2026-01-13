
import React, { useState, useEffect } from 'react';

interface DesktopProps {
  isDndActive?: boolean;
  isFocusSessionActive?: boolean;
}

const Desktop: React.FC<DesktopProps> = ({ isDndActive = false, isFocusSessionActive = false }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [day, setDay] = useState(new Date().toLocaleDateString([], { weekday: 'long' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDay(new Date().toLocaleDateString([], { weekday: 'long' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-0 transition-all duration-1000 ${
      isFocusSessionActive ? 'bg-[#000000]' : isDndActive ? 'bg-[#030303]' : 'bg-[#050505]'
    }`}>
      {/* Deep atmosphere */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] blur-[140px] rounded-full transition-all duration-1000 ${
        isFocusSessionActive ? 'bg-green-500/5 opacity-40 scale-110' : 
        isDndActive ? 'bg-amber-900/5 opacity-50' : 
        'bg-indigo-500/5 opacity-100'
      }`}></div>
      
      {/* Very subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Focus Vignette */}
      {isFocusSessionActive && (
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60 animate-in fade-in duration-1000"></div>
      )}

      {/* Clock - Minimal Bottom Left */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-0.5 opacity-10 transition-opacity hover:opacity-100 pointer-events-auto cursor-default">
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/50">{day}</span>
        <span className="text-3xl font-light tracking-tighter text-white">{time}</span>
        <div className="w-6 h-[1px] bg-white/20 mt-1"></div>
      </div>

      {/* Bottom Right Info */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-10 pointer-events-none">
        <span className="text-[8px] uppercase tracking-[0.4em] font-black text-white/40">Reality Check Engine</span>
        <span className="text-[10px] font-mono text-white/20">OS Version 1.2.0-beta</span>
        {isDndActive && <span className="text-[8px] font-black uppercase text-amber-500/50 mt-1 tracking-widest animate-pulse">Silence Mode</span>}
        {isFocusSessionActive && <span className="text-[8px] font-black uppercase text-green-500/50 mt-1 tracking-widest animate-pulse">Session Active</span>}
      </div>
    </div>
  );
};

export default Desktop;
