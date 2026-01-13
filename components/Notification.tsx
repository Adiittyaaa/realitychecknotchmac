
import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface NotificationProps {
  title: string;
  body: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, body, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-12 right-6 z-[200] w-80 glass border border-white/10 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-right duration-500">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
          <Sparkles size={18} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-white/90">{title}</h4>
            <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">{body}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500/30 w-full overflow-hidden rounded-b-2xl">
        <div className="h-full bg-indigo-500 animate-[progress_8s_linear]"></div>
      </div>
      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Notification;
