
import React, { useState } from 'react';
import { Lock, CheckCircle2, Code, MessageSquare, Monitor, ChevronUp, ChevronDown, Activity, Sparkles } from 'lucide-react';
import { IntentState } from '../types';

interface IntentScreenProps {
  intent: IntentState;
  onIntentChange: (intent: IntentState) => void;
}

const IntentScreen: React.FC<IntentScreenProps> = ({ intent, onIntentChange }) => {
  const [localIntent, setLocalIntent] = useState<IntentState>(intent);

  const handleCommit = () => {
    onIntentChange({ ...localIntent, isCommitted: true });
  };

  const handleUnlock = () => {
    onIntentChange({ ...localIntent, isCommitted: false });
  };

  const updateCategory = (key: keyof IntentState, delta: number) => {
    const val = localIntent[key] as number;
    const nextVal = Math.max(0, Math.min(12, val + delta));
    setLocalIntent(prev => ({ ...prev, [key]: nextVal }));
  };

  const totalHours = localIntent.deepWork + localIntent.shallowWork + localIntent.learning;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <Activity size={10} className="text-white/40" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Architecture Planning</span>
        </div>
        <h2 className="text-4xl font-light text-white/90 tracking-tighter">Budget your reality.</h2>
        <p className="text-white/30 max-w-sm mx-auto text-sm font-light leading-relaxed">
          Allocate your cognitive resources. Reality Check will monitor if your digital behavior aligns with these goals.
        </p>
      </header>

      <div className={`relative bg-white/[0.02] border border-white/5 rounded-[48px] p-10 transition-all duration-700 ${localIntent.isCommitted ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
        
        {/* Project Context Field */}
        <div className="mb-12">
          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 block">Current Objective</label>
          <input 
            type="text"
            value={localIntent.projectContext}
            onChange={(e) => setLocalIntent(prev => ({ ...prev, projectContext: e.target.value }))}
            placeholder="What is the main theme of today?"
            className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light tracking-tight focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              id: 'deepWork', 
              label: 'Deep Focus', 
              desc: 'High-cognitive tasks', 
              apps: [<Code size={12} />, <Monitor size={12} />], 
              color: 'border-indigo-500/20' 
            },
            { 
              id: 'shallowWork', 
              label: 'Shallow/Sync', 
              desc: 'Communication & Admin', 
              apps: [<MessageSquare size={12} />], 
              color: 'border-white/10' 
            },
            { 
              id: 'learning', 
              label: 'Architecture', 
              desc: 'Planning & Research', 
              apps: [<Sparkles size={12} />], 
              color: 'border-amber-500/10' 
            }
          ].map((cat) => (
            <div key={cat.id} className={`bg-white/[0.02] border ${cat.color} rounded-[32px] p-6 space-y-6 group hover:bg-white/[0.04] transition-all`}>
              <div className="space-y-1">
                <h3 className="text-sm font-medium tracking-tight">{cat.label}</h3>
                <p className="text-[10px] text-white/30 font-light">{cat.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-light tracking-tighter">{(localIntent[cat.id as keyof IntentState] as number).toFixed(1)}</span>
                  <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">Hours</span>
                </div>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => updateCategory(cat.id as keyof IntentState, 0.5)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button 
                    onClick={() => updateCategory(cat.id as keyof IntentState, -0.5)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Target Nodes:</span>
                <div className="flex gap-1.5">
                  {cat.apps.map((icon, i) => (
                    <div key={i} className="p-1.5 bg-white/5 rounded-md text-white/60">{icon}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totals Footer */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">Daily Architecture Summary</span>
            <p className="text-xs text-white/40 font-light">Committed: <span className="text-white font-medium">{totalHours}h</span> Focused Intent</p>
          </div>
          <div className="flex gap-1 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`w-1 h-3 rounded-full ${i < totalHours ? 'bg-white' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        {!localIntent.isCommitted ? (
          <button 
            onClick={handleCommit}
            className="group relative flex items-center gap-3 bg-white text-black px-14 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <span className="relative z-10">Commit Today's Architecture</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-700">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-full"><CheckCircle2 className="text-green-400" size={20} /></div>
              <div className="flex flex-col">
                <span className="text-lg font-light tracking-tight text-white/90">Reality mirroring active.</span>
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-black">Tracking alignment in background</span>
              </div>
            </div>
            <button 
              onClick={handleUnlock}
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all flex items-center gap-2"
            >
              <Lock size={10} />
              Unlock to Re-Architect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntentScreen;
