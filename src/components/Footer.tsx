import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Check, Award, Lock, Navigation } from 'lucide-react';
import { MAISON_CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#0B0C0E] text-white border-t border-white/10 pt-16 pb-12 select-none">
      
      {/* 100% Website-Exclusive Golden Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl bg-[#14161A] border border-[#C6A45E]/40 p-4 text-center shadow-lg">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono font-bold text-[#C6A45E] flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span>STRICTLY SOLD ONLY ON AURELIAPRIVE.COM • NEVER AVAILABLE ON ANY OTHER APP</span>
          </span>
        </div>
      </div>

      {/* 4 Maison Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center text-[#C6A45E] flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide uppercase">Never Sold on Any App</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Strictly direct-to-collector. Never sold on Amazon, Flipkart, or third-party retail apps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center text-[#C6A45E] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide uppercase">Numbered Certificate</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Every creation comes with a wax-sealed, laser-engraved titanium card registered in our vault.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center text-[#C6A45E] flex-shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide uppercase">Blinkit-Style Live GPS</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Real-time satellite GPS tracking of our armored Maybach fleet from C-Scheme vault to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center text-[#C6A45E] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide uppercase">24/7 AI Concierge</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Private liaison desk for bespoke initials, special vault viewings, and personal dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#14161A] border border-[#C6A45E] flex items-center justify-center text-[#C6A45E] font-condensed font-bold text-base">
                MA
              </div>
              <span className="font-condensed font-bold text-xl tracking-widest uppercase">
                MAISON <span className="text-[#C6A45E]">AURELIA</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent European luxury house crafting 20 rare serialized lifestyle objects across Swiss Horology, Tuscan Leather, Haute Parfumerie, and High-Grade Materials.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#14161A] border border-white/10 px-3 py-1.5 rounded-lg text-[11px] text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>C-Scheme Flagship Vault & Armored Courier Fleet Active</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-condensed font-bold text-xs uppercase tracking-widest text-[#C6A45E] mb-4">
              Maison Disciplines
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {MAISON_CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="hover:text-[#C6A45E] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h5 className="font-condensed font-bold text-xs uppercase tracking-widest text-[#C6A45E] mb-4">
              Private Services
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/track" className="hover:text-[#C6A45E] transition-colors flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#C6A45E]" />
                  <span>Live Maybach GPS</span>
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-[#C6A45E] transition-colors">
                  Handover Desk
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=limited" className="hover:text-[#C6A45E] transition-colors">
                  Limited Allocation Run
                </Link>
              </li>
              <li>
                <a href="#vault" className="hover:text-[#C6A45E] transition-colors">
                  Provenance Ledger
                </a>
              </li>
            </ul>
          </div>

          {/* Collector Gazette Signup */}
          <div>
            <h5 className="font-condensed font-bold text-xs uppercase tracking-widest text-[#C6A45E] mb-4">
              Private Allocation Dispatch
            </h5>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Receive confidential notices 48 hours prior to new limited batch releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter private email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C6A45E]"
                required
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#C6A45E] hover:bg-[#d8b874] text-[#0B0C0E] font-condensed font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Member Registered</span>
                  </>
                ) : (
                  <>
                    <span>Request Invitation</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Copyright & Bottom Seal */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} MAISON AURELIA PRIVÉ. ALL RIGHTS RESERVED. ZERO MARKETPLACE DISTRIBUTION.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-400">Strictly Direct-to-Collector</span>
            <span>•</span>
            <span className="text-stone-400">Geneva • Neuchâtel • Florence • Jaipur</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
