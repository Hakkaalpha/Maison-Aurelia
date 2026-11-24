import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Watch,
  Briefcase,
  Sparkles,
  Glasses,
  Compass,
  Headphones,
  Clock,
  Award,
  Lock,
  Search,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { MAISON_CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { HeroSlider } from '../components/HeroSlider';
import { MaisonCategory } from '../types';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  'Horology': <Watch className="w-5 h-5 text-[#C6A45E]" />,
  'Bespoke Leather': <Briefcase className="w-5 h-5 text-[#C6A45E]" />,
  'Haute Parfumerie': <Sparkles className="w-5 h-5 text-[#C6A45E]" />,
  'Eyewear & Pens': <Glasses className="w-5 h-5 text-[#C6A45E]" />,
  'Collector Objects': <Compass className="w-5 h-5 text-[#C6A45E]" />,
  'Atelier Audio': <Headphones className="w-5 h-5 text-[#C6A45E]" />
};

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | MaisonCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 5 flagship creations for the Panerai-style Hero Showcase
  const flagshipProducts = PRODUCTS.slice(0, 5);

  // Live Allocation Ticking Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    mins: 28,
    secs: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return { days: 1, hours: 14, mins: 28, secs: 42 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B0C0E] text-white min-h-screen select-none">
      
      {/* ========================================================================= */}
      {/* 1. PANERAI-STYLE FULL-VIEWPORT HORIZONTAL SPLIT HERO SHOWCASE */}
      {/* ========================================================================= */}
      <HeroSlider flagshipProducts={flagshipProducts} />

      {/* ========================================================================= */}
      {/* 2. BROWSE BY MAISON ATELIER CATEGORIES */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C6A45E] uppercase font-bold block mb-1">
              THE 6 DISCIPLINES OF MAISON AURELIA
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              Browse by Atelier Discipline
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C6A45E] hover:text-white transition-colors uppercase tracking-wider"
          >
            <span>View All 20 Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MAISON_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="group p-5 rounded-2xl bg-[#14161A] border border-white/10 hover:border-[#C6A45E]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#C6A45E] transition-all">
                {CATEGORY_ICON_MAP[cat.name]}
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#C6A45E] uppercase font-bold block mb-0.5">
                  {cat.itemCount} Pieces
                </span>
                <h3 className="font-condensed font-bold text-white text-base uppercase leading-snug group-hover:text-[#C6A45E] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-400 font-sans line-clamp-1 mt-1">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIMITED EDITION VAULT COUNTDOWN BANNER */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#14161A] via-[#1A1D24] to-[#14161A] border border-[#C6A45E]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A45E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C6A45E] font-bold tracking-widest uppercase">
                <Clock className="w-4 h-4" />
                <span>ACTIVE QUARTERLY ALLOCATION WINDOW</span>
              </div>

              <h2 className="font-condensed font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                Current Vault Allocation Closes Soon
              </h2>

              <p className="text-sm text-stone-300 font-sans leading-relaxed">
                Allocations for Edition 01 are reserved on a first-confirmed basis with verified serial numbers recorded to the Master Provenance Ledger.
              </p>
            </div>

            {/* Live Ticking Countdown Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/10 min-w-[65px] sm:min-w-[75px]">
                  <span className="font-condensed font-bold text-2xl sm:text-3xl text-white block">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-[#C6A45E] uppercase font-bold">DAYS</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/10 min-w-[65px] sm:min-w-[75px]">
                  <span className="font-condensed font-bold text-2xl sm:text-3xl text-white block">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-[#C6A45E] uppercase font-bold">HOURS</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/10 min-w-[65px] sm:min-w-[75px]">
                  <span className="font-condensed font-bold text-2xl sm:text-3xl text-white block">
                    {timeLeft.mins.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-[#C6A45E] uppercase font-bold">MINS</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/10 min-w-[65px] sm:min-w-[75px]">
                  <span className="font-condensed font-bold text-2xl sm:text-3xl text-[#C6A45E] block animate-pulse">
                    {timeLeft.secs.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-[#C6A45E] uppercase font-bold">SECS</span>
                </div>
              </div>

              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#C6A45E] hover:bg-[#d8b874] text-[#0B0C0E] font-condensed font-bold text-sm uppercase tracking-widest transition-all shadow-xl text-center whitespace-nowrap"
              >
                RESERVE ALLOCATION →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPLETE 20-CREATION PREMIER VAULT GRID */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C6A45E] uppercase font-bold block mb-1">
              THE COMPLETE SERIALIZED COLLECTION
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              The 20-Piece Private Vault
            </h2>
          </div>

          {/* Live In-Grid Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Filter by name, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#14161A] border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C6A45E]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {(['All', 'Horology', 'Bespoke Leather', 'Haute Parfumerie', 'Eyewear & Pens', 'Collector Objects', 'Atelier Audio'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-[#0B0C0E] shadow-md'
                    : 'bg-[#14161A] text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* The 20-Product Responsive Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#14161A] rounded-2xl border border-white/10">
            <p className="text-stone-400 text-sm font-mono uppercase">
              No private allocations matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-[#C6A45E] text-xs font-mono font-bold hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. MAISON GUARANTEES STRIP */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#08090B] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center flex-shrink-0 text-[#C6A45E]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wider">
                Never Sold on Any App
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Strictly zero marketplace middlemen. Every creation is direct from atelier to private client.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center flex-shrink-0 text-[#C6A45E]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wider">
                Titanium Provenance Card
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Serialized authenticity card laser-engraved with your unique allocation registry number.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center flex-shrink-0 text-[#C6A45E]">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wider">
                Live Maybach GPS Transit
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Armored vehicle dispatch with Blinkit-style real-time satellite transponder tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C6A45E]/40 flex items-center justify-center flex-shrink-0 text-[#C6A45E]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wider">
                24/7 Private Concierge
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct biometric verification OTP and encrypted private concierge line for all collectors.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
