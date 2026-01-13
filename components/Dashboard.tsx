
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Timer, Monitor, X, FileText, Music, Target } from 'lucide-react';
import { IntentState } from '../types';

interface DashboardProps {
  onClose?: () => void;
  usageData: Record<string, number>;
  connectedApps: Set<string>;
  isFocusSessionActive: boolean;
  onToggleSession: () => void;
  intent: IntentState;
}

const FocusIndicator = () => (
  <div className="relative w-3 h-3 flex items-center justify-center">
    <div className="absolute w-full h-full rounded-full bg-white opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>
  </div>
);

const MusicIndicator = () => (
  <div className="flex items-end gap-[2px] h-3 w-3">
    <div className="w-[1.5px] bg-white animate-[music_1s_ease-in-out_infinite] h-1"></div>
    <div className="w-[1.5px] bg-white animate-[music_1.2s_ease-in-out_infinite_0.1s] h-2"></div>
    <div className="w-[1.5px] bg-white animate-[music_0.8s_ease-in-out_infinite_0.2s] h-1.5"></div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onClose, usageData, connectedApps, isFocusSessionActive, onToggleSession, intent }) => {
  const totalFocusedMinutes = Math.floor((usageData['vscode'] || 0) + (usageData['notion'] || 0) + (usageData['figma'] || 0));
  const plannedMinutes = (intent.deepWork + intent.shallowWork + intent.learning) * 60;

  const data = [
    { name: 'Focused', value: totalFocusedMinutes, color: '#FFFFFF' },
    { name: 'Gap', value: Math.max(0, plannedMinutes - totalFocusedMinutes), color: 'rgba(255, 255, 255, 0.05)' },
  ];

  const consistency = plannedMinutes > 0 ? Math.round((totalFocusedMinutes / plannedMinutes) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <style>{`
        @keyframes music {
          0%, 100% { height: 4px; }
          50% { height: 10px; }
        }
      `}</style>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <FocusIndicator />
          <div className="flex flex-col">
            <h2 className="text-2xl font-light text-white/90 tracking-tighter">Intelligence Overview</h2>
            <div className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest font-black mt-0.5">
              <Target size={10} />
              <span>Context: {intent.projectContext || 'General Operations'}</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/30 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Reality Gap Monitor</span>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-4xl font-light tracking-tighter">{(plannedMinutes / 60).toFixed(1)}h</p>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1 font-black">Intent</p>
              </div>
              <div>
                <p className="text-4xl font-light tracking-tighter text-white">{(totalFocusedMinutes / 60).toFixed(1)}h</p>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1 font-black">Realized</p>
              </div>
              <div>
                <p className="text-4xl font-light tracking-tighter text-white/20">{Math.max(0, (plannedMinutes - totalFocusedMinutes) / 60).toFixed(1)}h</p>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1 font-black">Difference</p>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-xs text-white/30 leading-relaxed font-light max-w-md">
                Tracking digital context vs. committed objective. Current alignment is <span className="text-white font-medium">{consistency}%</span>.
              </p>
            </div>
          </div>
          
          <div className="w-40 h-40 relative opacity-80 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={78}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-light tracking-tighter">{consistency}%</span>
              <span className="text-[8px] opacity-20 uppercase tracking-widest font-black">Fidelity</span>
            </div>
          </div>
        </div>

        <div className={`rounded-[40px] p-8 flex flex-col justify-between transition-all duration-500 border ${
          isFocusSessionActive 
          ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.1)]' 
          : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.04]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isFocusSessionActive ? 'text-black/40' : 'text-white/20'}`}>Focus Flight</h2>
              <Timer size={14} className={isFocusSessionActive ? 'text-black' : 'text-white/10'} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-light ${isFocusSessionActive ? 'text-black/60' : 'text-white/60'}`}>
                  {isFocusSessionActive ? 'In Orbit' : 'Ready for Launch'}
                </span>
                <span className={`text-[10px] font-black tracking-tighter ${isFocusSessionActive ? 'text-black/30' : 'text-white/20'}`}>
                  {isFocusSessionActive ? '24m Remaining' : '45m Session'}
                </span>
              </div>
              <div className={`w-full h-[1.5px] rounded-full overflow-hidden ${isFocusSessionActive ? 'bg-black/10' : 'bg-white/5'}`}>
                <div className={`h-full transition-all duration-1000 ${isFocusSessionActive ? 'bg-black w-3/4' : 'bg-white/20 w-0'}`}></div>
              </div>
            </div>
          </div>
          <button 
            onClick={onToggleSession}
            className={`w-full py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${
              isFocusSessionActive 
              ? 'bg-black text-white hover:bg-black/80' 
              : 'bg-white/5 text-white/40 hover:bg-white/10 border-white/5'
            }`}
          >
            {isFocusSessionActive ? 'End Flight' : 'Take Flight'}
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-6">Environment Nodes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`bg-white/[0.02] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.04] transition-all group relative overflow-hidden ${!connectedApps.has('spotify') ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="p-2.5 bg-white/5 rounded-xl text-white">
                {connectedApps.has('spotify') ? <MusicIndicator /> : <Music size={16} />}
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-light tracking-tight">Spotify</h4>
              <p className="text-[11px] text-white/20 uppercase tracking-widest font-black">{connectedApps.has('spotify') ? `Focused • ${Math.floor(usageData['spotify'] || 0)}m` : 'Node Disconnected'}</p>
            </div>
          </div>

          <div className={`bg-white/[0.02] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.04] transition-all group ${!connectedApps.has('notion') ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="p-2.5 bg-white/5 rounded-xl text-white/20 group-hover:text-white transition-colors">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[8px] text-white/10 uppercase font-black tracking-[0.2em]">{connectedApps.has('notion') ? 'Active Context' : 'Offline'}</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-light tracking-tight">Notion</h4>
              <p className="text-[11px] text-white/20 uppercase tracking-widest font-black">{connectedApps.has('notion') ? 'Architecture Plan' : 'Sync Required'}</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center justify-between mb-10">
              <div className="p-2.5 bg-white/5 rounded-xl text-white/20 group-hover:text-white transition-colors">
                <Monitor size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[8px] text-white/10 uppercase font-black tracking-[0.2em]">Live Data</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-light tracking-tight">Ambient Drift</h4>
              <p className="text-[11px] text-white/20 uppercase tracking-widest font-black">19m idling recorded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <h3 className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-6">Reality Audit</h3>
        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden">
          <div className="divide-y divide-white/5">
            {[
              { id: 'youtube', name: 'YouTube', time: `${Math.floor(usageData['youtube'] || 0)}m`, icon: <Monitor size={16} /> },
              { id: 'instagram', name: 'Instagram', time: `${Math.floor(usageData['instagram'] || 0)}m`, icon: <Monitor size={16} /> },
              { id: 'arc', name: 'Arc (Leisure)', time: `${Math.floor(usageData['arc'] || 0)}m`, icon: <Monitor size={16} /> },
              { id: 'slack', name: 'Slack (Idle)', time: `${Math.floor(usageData['slack'] || 0)}m`, icon: <Monitor size={16} /> },
            ].map((app) => (
              <div key={app.id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="p-2.5 bg-white/5 rounded-xl text-white/20 group-hover:text-white transition-all">
                    {app.icon}
                  </div>
                  <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors tracking-tight">{app.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors tracking-tighter">{app.time}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-white/40 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
