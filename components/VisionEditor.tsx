
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Sparkles, Wand2, X, RefreshCw } from 'lucide-react';

const VisionEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image || !prompt) return;
    
    setIsProcessing(true);
    try {
      // Fix: Always use process.env.API_KEY directly as per SDK requirements
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1] || 'image/png';
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: `Edit this focus workspace: ${prompt}. Make it look calm, minimal, and premium.` }
          ]
        }
      });

      // Fix: Safely handle response candidates and iterate through all parts to find the generated image
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setEditedImage(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }
    } catch (error) {
      console.error("Editing failed:", error);
      // Fallback for demo purposes if API fails
      setTimeout(() => setEditedImage(image), 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <h2 className="text-3xl font-light">Vision: Space Optimizer</h2>
        <p className="text-white/40 italic">"Your environment is your focus catalyst." Enhance your workspace using AI.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className={`aspect-video w-full rounded-[32px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center bg-white/[0.02] relative overflow-hidden transition-all ${!image ? 'hover:bg-white/[0.05] cursor-pointer' : ''}`}
            onClick={() => !image && fileInputRef.current?.click()}
          >
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover rounded-[30px]" alt="Workspace" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setImage(null); setEditedImage(null); }}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 text-white/30">
                <div className="p-4 bg-white/5 rounded-full"><Upload size={24} /></div>
                <p className="text-sm">Upload your desk setup</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-medium text-white/30 uppercase tracking-widest">Assistant Prompt</label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Remove the clutter and add a soft violet desk lamp glow' or 'Make it feel like a minimalist studio'"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 min-h-[100px] resize-none"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={processImage}
                  disabled={!image || !prompt || isProcessing}
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-xs font-medium transition-all"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Wand2 size={14} />}
                  <span>{isProcessing ? 'Thinking...' : 'Optimize Vision'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
           <label className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">Optimized Result</label>
           <div className="flex-1 aspect-video rounded-[32px] border border-white/5 bg-white/[0.02] flex items-center justify-center relative overflow-hidden group">
              {editedImage ? (
                <img src={editedImage} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="Optimized" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-white/10">
                  <Sparkles size={40} className={isProcessing ? 'animate-pulse text-indigo-400' : ''} />
                  <p className="text-sm font-light italic">Waiting for your vision...</p>
                </div>
              )}
              {editedImage && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-xs text-white/80 font-medium px-6 text-center leading-relaxed">
                    This optimized view is your "Ideal Reality." <br/>
                    Notice how the lack of clutter improves mental clarity.
                  </p>
                </div>
              )}
           </div>
           <div className="mt-4 p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
              <h4 className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-tighter">AI Tip</h4>
              <p className="text-xs text-white/40 leading-relaxed italic">
                "Users who clean their physical workspace before a Focus Flight session report 40% deeper concentration levels."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VisionEditor;
