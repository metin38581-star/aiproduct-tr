
import React, { useState } from 'react';

interface AuthProps {
  onAuthSuccess: (email: string) => void;
  onVerifyRequest: (email: string) => void;
  isVerifying: boolean;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onVerifyRequest, isVerifying }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onVerifyRequest(email);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(v => v !== '')) {
      onAuthSuccess(email);
    }
  };

  if (isVerifying) {
    return (
      <div className="w-full max-w-md p-8 rounded-3xl glass glow-border animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">E-postanızı Kontrol Edin</h2>
          <p className="text-slate-400 text-sm">
            <span className="text-indigo-400 font-medium">{email}</span> adresine bir doğrulama kodu gönderdik.
          </p>
        </div>
        <div className="flex justify-between gap-2 mb-8">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              className="w-12 h-14 bg-slate-900 border border-slate-700 rounded-xl text-center text-xl font-bold text-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
        >
          Doğrula ve Başla
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 rounded-3xl glass glow-border animate-in fade-in duration-700">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-500/40">
          Ai
        </div>
      </div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">AiproductTR</h2>
        <p className="text-slate-400 text-sm">SaaS dünyasına ilk adımınızı atın.</p>
      </div>
      <form onSubmit={handleAuth} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="isim@sirket.com"
            className="w-full px-5 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 ml-1">Şifre</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-5 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 active:scale-[0.98] mt-4"
        >
          Hesap Oluştur
        </button>
      </form>
      <p className="mt-8 text-center text-slate-500 text-xs">
        Devam ederek <span className="text-slate-300 underline cursor-pointer">Kullanım Koşulları</span>'nı kabul etmiş olursunuz.
      </p>
    </div>
  );
};

export default Auth;
