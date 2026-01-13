
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, IntentState } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IntentScreen from './components/IntentScreen';
import WeeklyReport from './components/WeeklyReport';
import IntegrationsHub from './components/IntegrationsHub';
import Notch from './components/Notch';
import MenuBarPopover from './components/MenuBarPopover';
import Notification from './components/Notification';
import Desktop from './components/Desktop';
import { Code, Globe, MessageSquare, Figma, Monitor, Laptop } from 'lucide-react';

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

const APPS = [
  { id: 'vscode', name: 'VS Code', icon: <Code size={18} />, color: '#007ACC' },
  { id: 'arc', name: 'Arc Browser', icon: <Globe size={18} />, color: '#FF4F00' },
  { id: 'slack', name: 'Slack', icon: <MessageSquare size={18} />, color: '#4A154B' },
  { id: 'notion', name: 'Notion', icon: <Monitor size={18} />, color: '#000000' },
  { id: 'figma', name: 'Figma', icon: <Figma size={18} />, color: '#F24E1E' },
];

const TRACKS = [
  { title: "Weightless", artist: "Marconi Union" },
  { title: "Deep Focus", artist: "Reality Check Records" },
  { title: "Solaris", artist: "Lofi Girl" },
  { title: "Midnight City", artist: "M83" },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isDashboardOpen, setIsDashboardOpen] = useState(!isElectron);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [isDndActive, setIsDndActive] = useState(() => JSON.parse(localStorage.getItem('rc_dnd') || 'false'));
  const [isNotchVisible, setIsNotchVisible] = useState(() => JSON.parse(localStorage.getItem('rc_notch_visible') || 'true'));
  const [isFocusSessionActive, setIsFocusSessionActive] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [spotifySeconds, setSpotifySeconds] = useState(124);

  // Intent State - Practical tracking
  const [intent, setIntent] = useState<IntentState>(() => {
    const saved = localStorage.getItem('rc_intent');
    return saved ? JSON.parse(saved) : {
      deepWork: 4,
      shallowWork: 2,
      learning: 1,
      projectContext: 'Reality Check Refactor',
      isCommitted: false
    };
  });

  const [connectedApps, setConnectedApps] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('rc_connected');
    return saved ? JSON.parse(saved) : new Set(['notion', 'spotify', 'flight']);
  });

  const [usageData, setUsageData] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('rc_usage');
    return saved ? JSON.parse(saved) : {
      vscode: 45, arc: 12, slack: 9, notion: 28, figma: 0, spotify: 41, youtube: 38, instagram: 22,
    };
  });

  const toggleDnd = useCallback(() => setIsDndActive(prev => !prev), []);
  const toggleNotch = useCallback(() => setIsNotchVisible(prev => !prev), []);
  const toggleDashboard = useCallback(() => setIsDashboardOpen(prev => !prev), []);

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex(prev => (prev + 1) % TRACKS.length);
    setSpotifySeconds(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key === 'k') { e.preventDefault(); toggleDashboard(); }
      if (isCmd && e.shiftKey && e.key === 'N') { e.preventDefault(); toggleNotch(); }
      if (isCmd && e.key === 'd' && !e.shiftKey) { e.preventDefault(); toggleDnd(); }
      if (e.key === 'Escape' && isDashboardOpen) { setIsDashboardOpen(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDashboardOpen, toggleDashboard, toggleNotch, toggleDnd]);

  useEffect(() => {
    localStorage.setItem('rc_usage', JSON.stringify(usageData));
    localStorage.setItem('rc_connected', JSON.stringify(Array.from(connectedApps)));
    localStorage.setItem('rc_dnd', JSON.stringify(isDndActive));
    localStorage.setItem('rc_notch_visible', JSON.stringify(isNotchVisible));
    localStorage.setItem('rc_intent', JSON.stringify(intent));
  }, [usageData, connectedApps, isDndActive, isNotchVisible, intent]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectedApps.has('spotify') && isMusicPlaying) {
        setSpotifySeconds(prev => {
          if (prev >= 240) { setCurrentTrackIndex(idx => (idx + 1) % TRACKS.length); return 0; }
          return prev + 1;
        });
      }
      const activeAppId = APPS[currentAppIndex].id;
      setUsageData(prev => ({
        ...prev,
        [activeAppId]: (prev[activeAppId] || 0) + (1/60),
        spotify: isMusicPlaying ? (prev.spotify || 0) + (1/60) : (prev.spotify || 0)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentAppIndex, connectedApps, isMusicPlaying]);

  const activeApp = APPS[currentAppIndex];
  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${isElectron ? 'bg-transparent' : 'bg-[#0a0a0a]'} text-white selection:bg-white/30 font-sans`}>
      {!isElectron && <Desktop isDndActive={isDndActive} isFocusSessionActive={isFocusSessionActive} />}

      {!isElectron && (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 z-[110] text-[11px] font-medium border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-white/10 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="font-bold cursor-default">Reality Check</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isDndActive && <div className="text-amber-500 text-[9px] font-bold">DND</div>}
            <span className="opacity-40 font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      )}

      {isNotchVisible && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-[300]">
          <Notch 
            onOpenDashboard={() => setIsDashboardOpen(true)} 
            activeApp={activeApp} 
            spotifyTrack={currentTrack}
            spotifySeconds={spotifySeconds}
            isSpotifyConnected={connectedApps.has('spotify')}
            isDndActive={isDndActive}
            onToggleDnd={toggleDnd}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={() => setIsMusicPlaying(!isMusicPlaying)}
            onNextTrack={handleNextTrack}
            isFocusSessionActive={isFocusSessionActive}
          />
        </div>
      )}

      {isDashboardOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDashboardOpen(false)} />
          <div className="relative w-full max-w-6xl h-[85vh] glass mac-shadow border border-white/10 rounded-[32px] overflow-hidden flex flex-row shadow-2xl">
            <Sidebar 
              activeView={activeView} 
              onViewChange={setActiveView} 
              isDndActive={isDndActive} 
              onToggleDnd={toggleDnd}
              isNotchVisible={isNotchVisible}
              onToggleNotch={toggleNotch}
            />
            <main className="flex-1 overflow-y-auto custom-scrollbar p-10 relative bg-[#0a0a0a]/50">
              <div className="absolute top-6 left-6 flex gap-2 z-10">
                <div onClick={() => setIsDashboardOpen(false)} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 cursor-pointer shadow-inner transition-transform active:scale-90" />
                <div onClick={() => setIsDashboardOpen(false)} className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 cursor-pointer shadow-inner transition-transform active:scale-90" />
                <div className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 cursor-default shadow-inner opacity-50" />
              </div>
              <div className="mt-8">
                {activeView === AppView.DASHBOARD && (
                  <Dashboard 
                    onClose={() => setIsDashboardOpen(false)} 
                    usageData={usageData} 
                    connectedApps={connectedApps}
                    isFocusSessionActive={isFocusSessionActive}
                    onToggleSession={() => setIsFocusSessionActive(!isFocusSessionActive)}
                    intent={intent}
                  />
                )}
                {activeView === AppView.INTENT && (
                  <IntentScreen 
                    intent={intent} 
                    onIntentChange={setIntent} 
                  />
                )}
                {activeView === AppView.REPORT && <WeeklyReport />}
                {activeView === AppView.INTEGRATIONS && <IntegrationsHub connectedApps={connectedApps} onToggle={(id) => {
                  setConnectedApps(prev => {
                    const next = new Set(prev);
                    if (next.has(id)) next.delete(id); else next.add(id);
                    return next;
                  });
                }} />}
              </div>
            </main>
          </div>
        </div>
      )}

      {(!isElectron || isDashboardOpen) && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] group">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-1 shadow-2xl transition-all hover:p-3 hover:gap-3">
            {APPS.map((app, idx) => (
              <button key={app.id} onClick={() => setCurrentAppIndex(idx)} className={`p-3 rounded-xl transition-all duration-300 relative group/icon ${currentAppIndex === idx ? 'bg-white/10 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:bg-white/5 hover:scale-105'}`}>
                <div style={{ color: app.color }}>{app.icon}</div>
                {currentAppIndex === idx && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
              </button>
            ))}
            <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
            <button className="p-3 rounded-xl hover:bg-white/5 transition-all text-white/30 hover:text-white" onClick={toggleDashboard}>
              <Laptop size={18} />
            </button>
          </div>
        </div>
      )}

      {notification && !isDndActive && (
        <Notification title={notification.title} body={notification.body} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default App;
