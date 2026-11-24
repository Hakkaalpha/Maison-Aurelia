import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';

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
    <footer className="w-full bg-white border-t border-slate-200/80 pt-16 pb-12">
      {/* 4-Column Trust Features Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900">Free Express Delivery</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Complimentary 2-4 day shipping across all pin codes in India on orders over ₹999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Not satisfied with your desk gear? Return it with zero questions asked.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900">1-Year Official Warranty</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Genuine hardware replacement guarantee backed by Kinetix tech support.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900">24/7 Priority Support</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Connect directly with our engineering team for setup assistance and tips.
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
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-button">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                Kinetix <span className="text-indigo-600">Tech</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Engineering high-performance mechanical inputs, studio audio monitors, and minimalist desk gear designed for creators, programmers, and gamers.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#F8F9FE] border border-slate-200/80 px-3 py-1.5 rounded-lg text-[11px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Automated Google Sheets & Gmail dispatch engine</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Shop Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/shop" className="hover:text-indigo-600 transition-colors">
                  All 20 Products
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=best-sellers" className="hover:text-indigo-600 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=deals" className="hover:text-indigo-600 transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-indigo-600 transition-colors">
                  Direct Checkout
                </Link>
              </li>
              <li>
                <a href="#schedule" className="hover:text-indigo-600 transition-colors">
                  Delivery Scheduler
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Stay in the Loop
            </h5>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Subscribe for exclusive secret drop drops and receive 10% off your first checkout.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <Check className="w-3.5 h-3.5" /> Subscribed! Use code <b>KINETIX10</b>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 Kinetix Tech Inc. All rights reserved. Precision Desk Gear & Hardware.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-600 transition-colors cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
};
