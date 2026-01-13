
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Star, Zap, Clock, TrendingUp } from 'lucide-react';

const WeeklyReport: React.FC = () => {
  const data = [
    { day: 'Mon', focus: 78, planned: 85 },
    { day: 'Tue', focus: 92, planned: 80 },
    { day: 'Wed', focus: 65, planned: 90 },
    { day: 'Thu', focus: 88, planned: 85 },
    { day: 'Fri', focus: 45, planned: 70 },
    { day: 'Sat', focus: 30, planned: 40 },
    { day: 'Sun', focus: 20, planned: 30 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Reflections</span>
           <div className="w-1 h-1 rounded-full bg-white/10"></div>
           <span className="text-[10px] text-white/30 font-medium">Week 11</span>
        </div>
        <h2 className="text-4xl font-light tracking-tighter">Behavioral Mirror</h2>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Focus', value: '72%', icon: <Zap size={18} strokeWidth={1.5} /> },
          { label: 'Total Deep Work', value: '24.5h', icon: <Clock size={18} strokeWidth={1.5} /> },
          { label: 'Consistency', value: 'High', icon: <Star size={18} strokeWidth={1.5} /> },
          { label: 'Growth', value: '+12%', icon: <TrendingUp size={18} strokeWidth={1.5} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[32px] p-8 space-y-4 hover:bg-white/[0.05] transition-all group">
            <div className="p-3 bg-white/5 w-fit rounded-2xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all">
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-light tracking-tighter">{stat.value}</p>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[40px] p-10">
          <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-10">Planned Intent vs. Realized Action</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={8}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }} 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '12px' }}
                />
                <Bar dataKey="focus" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.focus >= entry.planned ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)'} />
                  ))}
                </Bar>
                <Bar dataKey="planned" fill="rgba(255,255,255,0.04)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between hover:bg-white/[0.04] transition-all">
          <div className="space-y-8">
            <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Intelligence Insights</h3>
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-white/60 font-light">
                “Your focus efficiency peaks between <span className="text-white font-medium">9:00 AM – 11:30 AM</span>. 
                Resistance builds significantly after 3:00 PM.”
              </p>
              <p className="text-sm leading-relaxed text-white/60 font-light border-t border-white/5 pt-6">
                “The Reality Gap widened by <span className="text-white font-medium">14%</span> this week due to increased mobile app pickups.”
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/5">
             <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest italic leading-loose">
               "Clarity is the precursor to change."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
