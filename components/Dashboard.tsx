
import React, { useState } from 'react';
import { ProductAnalysis, User } from '../types';

interface DashboardProps {
  analysis: ProductAnalysis;
  imagePreview: string;
  user: User;
  onUpgradeClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, imagePreview, user, onUpgradeClick }) => {
  const [customDomain, setCustomDomain] = useState('');
  const [isDomainConnecting, setIsDomainConnecting] = useState(false);

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-emerald-400';
    if (score < 75) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getBarColor = (score: number) => {
    if (score < 40) return 'bg-emerald-500';
    if (score < 75) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Image Section */}
        <div className="lg:col-span-4">
          <div className="glass p-4 rounded-3xl border border-slate-800 sticky top-28">
            <div className="relative group overflow-hidden rounded-2xl">
              <img src={imagePreview} alt="Product" className="w-full h-auto aspect-square object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-6">
                <div>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Tespit Edilen</p>
                  <h2 className="text-2xl font-black text-white uppercase leading-none">{analysis.productName}</h2>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Kullanım Alanları</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.usageAreas.map((area, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700">{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Free Results Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className={`glass p-8 rounded-3xl border-2 transition-all ${analysis.verdict === 'SAT' ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Yapay Zeka Kararı</p>
                <h3 className={`text-6xl font-black italic tracking-tighter ${analysis.verdict === 'SAT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {analysis.verdict}!
                </h3>
              </div>
              <div className="text-right flex-1 md:max-w-md">
                <p className="text-slate-300 text-lg leading-relaxed font-medium italic">"{analysis.reasoning}"</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Rekabet Puanı</h3>
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-5xl font-black ${getScoreColor(analysis.competitionScore)}`}>{analysis.competitionScore}</span>
                <span className="text-slate-500 text-sm">/ 100</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${getBarColor(analysis.competitionScore)}`} style={{ width: `${analysis.competitionScore}%` }} />
              </div>
            </div>
            <div className="glass p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Hedef Kitle</h3>
              <div className="space-y-3">
                {analysis.targetAudience.slice(0, 3).map((audience, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-slate-300 font-semibold">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRO FEATURES SECTION */}
      <div className="relative">
        {!user.isPro && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-slate-950/40 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center p-12 text-center">
             <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center text-slate-950 mb-6 shadow-2xl shadow-amber-500/20">
               <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>
             </div>
             <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Pro Analiz & Domain Kilidini Açın</h3>
             <p className="text-slate-300 text-center max-w-lg mb-8 text-lg font-medium">
                Meta reklam stratejileri, rakip analizi ve kendi domaininiz altında analiz sunma imkanı.
             </p>
             <button 
               onClick={onUpgradeClick}
               className="px-12 py-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-amber-500/30"
             >
               Pro'ya Yükselt - 149.99 TL
             </button>
          </div>
        )}

        <div className={`space-y-8 ${!user.isPro ? 'opacity-20 pointer-events-none grayscale' : ''}`}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Meta Reklam & Marka Yönetimi</h2>
            <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full">PRO ALAN</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meta Ad Copy */}
            <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-indigo-500/20 bg-indigo-500/5">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                Yüksek Dönüşümlü Reklam Metni
              </h4>
              <div className="space-y-6">
                <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <p className="text-indigo-400 font-bold text-xs uppercase mb-2">Dikkat Çekici Başlık (Hook)</p>
                  <p className="text-white text-xl font-bold">{analysis.metaAdCopy?.hook}</p>
                </div>
                <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <p className="text-indigo-400 font-bold text-xs uppercase mb-2">Ana Metin (Body)</p>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{analysis.metaAdCopy?.body}</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <span className="text-sm font-bold text-white uppercase tracking-widest">CTA: {analysis.metaAdCopy?.cta}</span>
                  <button className="text-xs font-bold text-indigo-400 uppercase hover:text-white transition">Kopyala</button>
                </div>
              </div>
            </div>

            {/* AI Ad Advisor */}
            <div className="glass p-8 rounded-[2.5rem] border border-amber-500/20 bg-amber-500/5">
               <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                Yapay Zeka Reklam Danışmanı
              </h4>
              <div className="text-center mb-8">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center border-4 mb-4 ${analysis.adAdvisor?.status === 'GOOD' ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'}`}>
                  <span className="text-2xl font-black">{analysis.adAdvisor?.status === 'GOOD' ? '10/10' : '3/10'}</span>
                </div>
                <h5 className="text-white font-black text-xl mb-1 uppercase tracking-tighter">{analysis.adAdvisor?.action}</h5>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Önerilen Aksiyon</p>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed text-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800 italic">
                "{analysis.adAdvisor?.message}"
              </p>
            </div>
          </div>

          {/* Domain & White-label Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-[2.5rem] border border-slate-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Özel Domain Bağla (White-label)</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Analizlerinizi kendi markanızın subdomain'i (ör: analiz.sirketiniz.com) üzerinden müşterilerinize sunun.</p>
              
              <div className="flex gap-2 mb-8">
                <input 
                  type="text" 
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="analiz.markaniz.com"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                />
                <button 
                  onClick={() => {
                    setIsDomainConnecting(true);
                    setTimeout(() => setIsDomainConnecting(false), 2000);
                  }}
                  disabled={!customDomain || isDomainConnecting}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
                >
                  {isDomainConnecting ? 'Bağlanıyor...' : 'Bağla'}
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vercel DNS Kayıtları</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[9px] text-slate-600 font-bold uppercase mb-1">Tip: A Kaydı</p>
                    <code className="text-xs text-indigo-400 font-bold">76.76.21.21</code>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[9px] text-slate-600 font-bold uppercase mb-1">Tip: CNAME</p>
                    <code className="text-xs text-indigo-400 font-bold">cname.vercel-dns.com</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-slate-800 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-500/20">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </div>
              <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">META HESABINI BAĞLA</h4>
              <p className="text-slate-500 text-sm mb-6 px-8 leading-snug font-medium">Reklamlarını AiproductTR üzerinden yönetmek için Meta Business Suite hesabını entegre et.</p>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-500/20">
                Meta İle Bağlan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
