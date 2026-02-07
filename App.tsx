
import React, { useState, useCallback, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { ProductAnalysis, AppStatus, User } from './types';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Pricing from './components/Pricing';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.AUTH_SCREEN);
  const [user, setUser] = useState<User | null>(null);
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const gemini = new GeminiService();

  useEffect(() => {
    const savedUser = localStorage.getItem('aiproduct_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setStatus(AppStatus.IDLE);
    }
  }, []);

  const handleVerifyRequest = (email: string) => setStatus(AppStatus.VERIFYING_OTP);
  const handleAuthSuccess = (email: string) => {
    const newUser = { email, isVerified: true, isPro: false };
    setUser(newUser);
    localStorage.setItem('aiproduct_user', JSON.stringify(newUser));
    setStatus(AppStatus.IDLE);
  };

  const handleUpgrade = () => {
    if (user) {
      const updatedUser = { ...user, isPro: true };
      setUser(updatedUser);
      localStorage.setItem('aiproduct_user', JSON.stringify(updatedUser));
      setShowPricing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aiproduct_user');
    setUser(null);
    setAnalysis(null);
    setImagePreview(null);
    setStatus(AppStatus.AUTH_SCREEN);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'dan küçük olmalıdır.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const mimeType = file.type || 'image/jpeg';
        setImagePreview(base64);
        handleAnalyze(base64, mimeType);
      };
      reader.onerror = () => setError('Dosya okunamadı.');
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (base64: string, mimeType: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const result = await gemini.analyzeProductImage(base64, mimeType);
      setAnalysis(result);
      setStatus(AppStatus.COMPLETED);
    } catch (err: any) {
      console.error("Analiz Hatası:", err);
      setError(err.message || 'Analiz başarısız oldu. Lütfen tekrar deneyin.');
      setStatus(AppStatus.ERROR);
    }
  };

  if (status === AppStatus.AUTH_SCREEN || status === AppStatus.VERIFYING_OTP) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
        <Auth 
          onVerifyRequest={handleVerifyRequest}
          onAuthSuccess={handleAuthSuccess}
          isVerifying={status === AppStatus.VERIFYING_OTP}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {showPricing && <Pricing onClose={() => setShowPricing(false)} onUpgrade={handleUpgrade} />}
      
      <nav className="sticky top-0 z-50 glass border-b border-slate-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">Ai</div>
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">AiproductTR</h1>
          </div>
          <div className="flex items-center gap-6">
            {!user?.isPro && (
              <button 
                onClick={() => setShowPricing(true)}
                className="hidden md:block px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black rounded-lg uppercase tracking-widest shadow-lg shadow-amber-500/10 hover:scale-105 transition-all"
              >
                PRO'YA GEÇ
              </button>
            )}
            <div className="flex flex-col items-end">
               <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Status</span>
               <span className={`text-[11px] font-bold ${user?.isPro ? 'text-amber-400' : 'text-indigo-400'}`}>
                 {user?.isPro ? 'PREMIUM PRO' : 'FREE USER'}
               </span>
            </div>
            <button onClick={handleLogout} className="p-2.5 rounded-xl border border-slate-800 hover:bg-white/5 text-slate-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            Akıllı E-Ticaret <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400">Analiz Motoru</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Ürününü yükle, pazar verilerini anında al. Pro ile Meta reklam stratejilerini profesyonelce yönet.
          </p>
          
          <div className="relative group p-[1px] bg-gradient-to-r from-slate-800 via-indigo-500/20 to-slate-800 rounded-[2.5rem] max-w-md mx-auto">
            <label className="relative flex flex-col items-center justify-center bg-slate-900/90 p-12 rounded-[2.5rem] backdrop-blur-xl border-2 border-dashed border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group">
              <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-white font-black text-2xl mb-1 tracking-tighter uppercase">Ürün Yükle</span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Saniyeler içinde analiz et</span>
              <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            </label>
          </div>

          {status === AppStatus.ANALYZING && (
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] animate-pulse">Global Pazar Verileri İşleniyor</p>
            </div>
          )}

          {error && (
            <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in">
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase">
                {error}
              </div>
              <button 
                onClick={() => setStatus(AppStatus.IDLE)}
                className="text-xs font-bold text-slate-400 hover:text-white transition uppercase tracking-widest underline"
              >
                Tekrar Dene
              </button>
            </div>
          )}
        </div>

        {analysis && imagePreview && status === AppStatus.COMPLETED && (
          <Dashboard 
            analysis={analysis} 
            imagePreview={imagePreview} 
            user={user!} 
            onUpgradeClick={() => setShowPricing(true)}
          />
        )}
      </main>

      <footer className="mt-32 border-t border-slate-900 py-20 px-8 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">© 2024 AiproductTR Engine</p>
          <p className="text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em]">Built for professional dropshippers</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
