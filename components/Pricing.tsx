
import React from 'react';

interface PricingProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onClose, onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-lg glass rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-10 pt-16 text-center">
          <div className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-amber-500/20 mb-6">
            Sınırlı Süreli Teklif
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Pro Üye Olun</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
            Meta reklam otomasyonu ve ileri düzey pazar analitiği ile e-ticarette fark yaratın.
          </p>

          <div className="space-y-4 mb-12">
            {[
              "Yapay Zeka Reklam Danışmanı",
              "Meta Detaylı Hedef Kitle Verileri",
              "Dönüşüm Odaklı Uzun Reklam Metinleri",
              "Meta Business Entegrasyonu",
              "Öncelikli Analiz Sırası"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 font-semibold justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {feature}
              </div>
            ))}
          </div>

          <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 mb-8">
            <div className="flex items-center justify-center gap-2 mb-1">
               <span className="text-slate-500 line-through text-lg font-bold">299.99 TL</span>
               <span className="text-4xl font-black text-white">149.99 TL</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Sadece bu aya özel fiyat</p>
          </div>

          <button 
            onClick={onUpgrade}
            className="w-full py-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-amber-500/30 text-xl tracking-tight"
          >
            Hemen Yükselt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
