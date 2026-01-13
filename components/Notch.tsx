
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Play, Pause, SkipForward, ChevronDown, Moon, Bell, FileText } from 'lucide-react';

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

interface NotchProps {
  onOpenDashboard: () => void;
  activeApp?: {
    name: string;
    icon: React.ReactNode;
    color: string;
  };
  spotifyTrack?: {
    title: string;
    artist: string;
  };
  spotifySeconds?: number;
  isSpotifyConnected?: boolean;
  isDndActive: boolean;
  onToggleDnd: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onNextTrack: () => void;
  isFocusSessionActive: boolean;
}

const Notch: React.FC<NotchProps> = ({ 
  onOpenDashboard, 
  activeApp, 
  spotifyTrack = { title: "No Track", artist: "Spotify" },
  spotifySeconds = 0,
  isSpotifyConnected = true,
  isDndActive,
  onToggleDnd,
  isMusicPlaying,
  onToggleMusic,
  onNextTrack,
  isFocusSessionActive
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openNotion = (e: React.MouseEvent) => {
    e.stopPropagation();
    const notionUrl = 'notion://notion.so';
    const webUrl = 'https://notion.so';
    if (isElectron) {
      // In Electron with nodeIntegration: true, we can try to open deep link
      try {
        const { shell } = require('electron');
        shell.openExternal(webUrl); // Safe fallback to browser
      } catch {
        window.open(webUrl, '_blank');
      }
    } else {
      window.open(webUrl, '_blank');
    }
  };

  const FocusIndicator = () => (
    <div className="relative w-3 h-3 flex items-center justify-center">
      <div className={`absolute w-full h-full rounded-full opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] ${isFocusSessionActive ? 'bg-green-400' : 'bg-white'}`}></div>
      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_white] ${isFocusSessionActive ? 'bg-green-400' : 'bg-white'}`}></div>
    </div>
  );

  const MusicIndicator = () => (
    <div className="flex items-end gap-[2px] h-3 w-3">
      <div className={`w-[1.5px] bg-white animate-[music_1s_ease-in-out_infinite] h-1 ${!isMusicPlaying && 'animate-none opacity-20'}`}></div>
      <div className={`w-[1.5px] bg-white animate-[music_1.2s_ease-in-out_infinite_0.1s] h-2 ${!isMusicPlaying && 'animate-none opacity-20'}`}></div>
      <div className={`w-[1.5px] bg-white animate-[music_0.8s_ease-in-out_infinite_0.2s] h-1.5 ${!isMusicPlaying && 'animate-none opacity-20'}`}></div>
    </div>
  );

  const DndIndicator = () => (
    <div className="relative flex items-center justify-center animate-in fade-in zoom-in-50 duration-500">
      <div className="absolute w-2 h-2 bg-amber-400/20 blur-[4px] rounded-full"></div>
      <Moon size={11} className="text-amber-400 relative z-10" fill="currentColor" />
    </div>
  );

  return (
    <div 
      className={`relative flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isExpanded ? 'mt-4' : 'mt-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isExpanded) setIsExpanded(false);
      }}
    >
      <style>{`
        @keyframes music {
          0%, 100% { height: 4px; }
          50% { height: 10px; }
        }
        .notch-blur {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
      `}</style>

      {isFocusSessionActive && !isExpanded && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[170px] h-[36px] bg-green-500/20 blur-md rounded-full -z-10 animate-pulse"></div>
      )}

      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-black text-white cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col notch-blur border ${
          isFocusSessionActive ? 'border-green-500/30' : 'border-white/5'
        } ${
          isExpanded 
            ? 'w-[420px] h-[280px] rounded-[42px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]' 
            : isHovered 
              ? 'w-[240px] h-[40px] rounded-full' 
              : 'w-[160px] h-[32px] rounded-b-[18px]'
        }`}
      >
        {!isExpanded && (
          <div className="flex items-center justify-between w-full h-full px-5 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
              <FocusIndicator />
              {isHovered && (
                <div className="flex items-center gap-2 animate-in slide-in-from-left-1 duration-300">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase opacity-40">Active</span>
                  <span className="text-[10px] font-medium tracking-wide flex items-center gap-1.5">
                    {activeApp?.icon}
                    {activeApp?.name}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {isDndActive && <DndIndicator />}
              {isSpotifyConnected && <MusicIndicator />}
              <span className="text-[11px] font-mono tracking-tighter opacity-40">
                {isExpanded ? formatTime(spotifySeconds) : systemTime}
              </span>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="w-full h-full p-8 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">Reality Mirror</span>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <span className={`text-[9px] font-medium italic ${isFocusSessionActive ? 'text-green-400' : 'text-white/30'}`}>
                    {isFocusSessionActive ? 'Deep Flight Engaged' : 'Synchronized'}
                  </span>
                </div>
                <h3 className="text-xl font-light tracking-tight">Focus Node: Contextualized</h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleDnd(); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all border duration-300 ${
                    isDndActive 
                    ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                    : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isDndActive ? (
                    <>
                      <Moon size={14} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Focusing</span>
                    </>
                  ) : (
                    <>
                      <Bell size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Ambient</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="bg-white/5 rounded-3xl p-4 border border-white/5 hover:bg-white/[0.08] transition-colors group/item">
                <div className="flex justify-between items-start mb-2">
                  <MusicIndicator />
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">{formatTime(spotifySeconds)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium truncate animate-in slide-in-from-left-2 duration-300">{spotifyTrack.title}</p>
                    <p className="text-[9px] text-white/30 truncate opacity-60">{spotifyTrack.artist}</p>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleMusic(); }}
                      className="p-1 hover:bg-white/10 rounded-full"
                    >
                      {isMusicPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" />}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onNextTrack(); }}
                      className="p-1 hover:bg-white/10 rounded-full"
                    >
                      <SkipForward size={12} fill="white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl p-4 border transition-all duration-500 ${isFocusSessionActive ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                <div className="flex justify-between items-start mb-2">
                   <div className={`w-1 h-1 rounded-full ${isFocusSessionActive ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-white/40'}`}></div>
                   <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">The Gap</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-light">41m <span className="text-[9px] opacity-20">done</span></span>
                    <span className="text-[9px] text-white/30">22%</span>
                  </div>
                  <div className={`w-full h-[3px] rounded-full overflow-hidden ${isFocusSessionActive ? 'bg-green-500/10' : 'bg-white/5'}`}>
                    <div className={`w-[22%] h-full rounded-full ${isFocusSessionActive ? 'bg-green-400' : 'bg-white'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenDashboard(); setIsExpanded(false); }}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-2xl text-[11px] font-bold hover:bg-neutral-200 active:scale-[0.98] transition-all"
              >
                <LayoutDashboard size={13} />
                <span>Open Intelligence</span>
              </button>
              <button 
                onClick={openNotion}
                className="w-12 h-12 flex items-center justify-center bg-white/5 text-white/30 hover:text-white rounded-2xl transition-all border border-white/5 group/notion"
              >
                <FileText size={16} className="group-hover/notion:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {!isExpanded && isHovered && (
        <div className="absolute top-[44px] animate-in fade-in slide-in-from-top-1 duration-300">
          <ChevronDown size={12} className="text-white/20" />
        </div>
      )}
    </div>
  );
};

export default Notch;
