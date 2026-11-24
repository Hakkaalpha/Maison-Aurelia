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
    <footer className="w-full bg-aurelia-obsidian text-white border-t border-aurelia-gold/30 pt-16 pb-12 font-ui">
      
      {/* 100% Website-Exclusive Golden Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-xl bg-gradient-to-r from-stone-950 via-aurelia-charcoal to-stone-950 border border-aurelia-gold/40 p-4 text-center shadow-lg">
          <span className="text-[10px] sm:text-xs uppercase tracking-super font-bold text-aurelia-gold flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-aurelia-gold" />
            <span>EXCLUSIVE TO AURELIAPRIVE.COM • NEVER SOLD ON ANY OTHER APP OR MARKETPLACE</span>
          </span>
        </div>
      </div>

      {/* 4 Maison Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded bg-stone-900 border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white tracking-wide">100% Website Exclusive</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Strictly direct-to-collector. Never sold on Amazon, Flipkart, or third-party retail apps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded bg-stone-900 border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white tracking-wide">Numbered Certificate</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Every creation comes with a wax-sealed, laser-engraved titanium card registered in our vault.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded bg-stone-900 border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold flex-shrink-0">
              <Navigation className="w-5 h-5 text-aurelia-gold" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white tracking-wide">Blinkit-Style Live GPS</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Real-time satellite GPS tracking of our armored Maybach fleet from C-Scheme vault to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded bg-stone-900 border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white tracking-wide">24/7 AI Private Concierge</h4>
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
              <div className="w-8 h-8 rounded-sm bg-aurelia-gold/20 border border-aurelia-gold flex items-center justify-center text-aurelia-gold font-serif font-bold text-base">
                MA
              </div>
              <span className="font-serif font-bold text-xl tracking-widest uppercase">
                Maison <span className="text-aurelia-gold italic font-normal">Aurelia</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent European luxury house crafting 20 rare serialized lifestyle objects across Swiss Horology, Tuscan Leather, Haute Parfumerie, and High-Grade Materials.
            </p>
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-white/10 px-3 py-1.5 rounded text-[11px] text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>C-Scheme Flagship Vault & Armored Courier Fleet Active</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-aurelia-gold mb-4">
              Maison Disciplines
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {MAISON_CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="hover:text-aurelia-gold transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-aurelia-gold mb-4">
              Private Services
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/track" className="hover:text-aurelia-gold transition-colors flex items-center gap-1.5 text-white font-semibold">
                  <span>Live GPS Courier Tracking</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-aurelia-gold transition-colors">
                  All 20 Serialized Pieces
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=limited" className="hover:text-aurelia-gold transition-colors">
                  Limited Editions (1 of 10)
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-aurelia-gold transition-colors">
                  White-Glove Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Invitation */}
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-widest text-aurelia-gold mb-4">
              Private Registry
            </h5>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Register your private email to receive advance allocation notices 48 hours prior to public vault opening.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter private email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded bg-stone-900 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-aurelia-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 w-7 h-7 rounded bg-aurelia-gold text-aurelia-obsidian flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1 text-xs text-aurelia-gold font-bold">
                  <Check className="w-3.5 h-3.5" /> Registered. Welcome to Maison Aurelia.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <p>© 2026 Maison Aurelia Atelier. All rights reserved. Strictly Direct-to-Collector Exclusive.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-stone-300 cursor-pointer">Certificate Registry</span>
          <span className="hover:text-stone-300 cursor-pointer">White-Glove Handover Protocol</span>
          <span className="hover:text-stone-300 cursor-pointer">Discretion & Privacy</span>
        </div>
      </div>
    </footer>
  );
};
