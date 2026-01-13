
import React from 'react';
import { Music, FileText, Timer, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

interface IntegrationsHubProps {
  connectedApps: Set<string>;
  onToggle: (id: string) => void;
}

const IntegrationsHub: React.FC<IntegrationsHubProps> = ({ connectedApps, onToggle }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Architecture</span>
           <div className="w-1 h-1 rounded-full bg-white/10"></div>
        </div>
        <h2 className="text-4xl font-light tracking-tighter">Digital Nervous System</h2>
        <p className="text-white/30 font-light text-sm">Synchronize with the tools that track your reality.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            id: 'spotify',
            name: 'Spotify', 
            icon: <Music size={20} />, 
            insight: 'Focus improves by 18% with music.',
            stats: ['Focus companion mode enabled', 'Sync: Deep Work Playlist']
          },
          { 
            id: 'notion',
            name: 'Notion', 
            icon: <FileText size={20} />, 
            insight: 'Active context: Product Architecture',
            stats: ['12h total active time this week', 'Read/Write permission active']
          },
          { 
            id: 'flight',
            name: 'Focus Flight', 
            icon: <Timer size={20} />, 
            insight: 'Consistency score: 92%',
            stats: ['Next session: 10:15 AM', 'Break interval: 5m']
          },
        ].map((app, i) => {
          const isConnected = connectedApps.has(app.id);
          return (
            <div key={i} className={`bg-white/[0.02] border border-white/5 rounded-[40px] p-10 space-y-8 hover:bg-white/[0.04] transition-all group ${!isConnected ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className={`p-4 bg-white/5 rounded-[20px] transition-all ${isConnected ? 'text-white' : 'text-white/20'}`}>
                    {app.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-light tracking-tight">{app.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1 text-[8px] text-white/30 uppercase tracking-widest font-black">
                      <div className={`w-1 h-1 rounded-full ${isConnected ? 'bg-white' : 'bg-white/10'}`}></div>
                      <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onToggle(app.id)}
                  className={`transition-colors ${isConnected ? 'text-white' : 'text-white/20'}`}
                >
                  {isConnected ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              <div className="space-y-3">
                {app.stats.map((stat, idx) => (
                  <div key={idx} className={`flex items-center gap-3 text-sm font-light transition-opacity ${isConnected ? 'text-white/40' : 'text-white/10'}`}>
                    <div className="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                    <span>{stat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className={`text-[10px] italic font-bold uppercase tracking-widest leading-loose transition-colors ${isConnected ? 'text-white/20' : 'text-white/5'}`}>"{app.insight}"</p>
              </div>
            </div>
          );
        })}

        <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[40px] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/[0.03] hover:border-white/20 transition-all">
          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/10 mb-6 group-hover:scale-110 group-hover:text-white transition-all border border-white/5">
            <PlusIcon />
          </div>
          <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Integrate Node</h4>
          <p className="text-[9px] text-white/10 mt-2 uppercase tracking-[0.2em] font-medium leading-relaxed">Slack, GitHub, Calendar, <br/>Browser Extension</p>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default IntegrationsHub;
