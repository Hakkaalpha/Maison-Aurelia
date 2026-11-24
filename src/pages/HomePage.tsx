import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  CheckCircle2,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { MAISON_CATEGORIES, PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { MaisonCategory } from '../types';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  'Horology': <Watch className="w-5 h-5 text-aurelia-gold" />,
  'Bespoke Leather': <Briefcase className="w-5 h-5 text-aurelia-gold" />,
  'Haute Parfumerie': <Sparkles className="w-5 h-5 text-aurelia-gold" />,
  'Eyewear & Pens': <Glasses className="w-5 h-5 text-aurelia-gold" />,
  'Collector Objects': <Compass className="w-5 h-5 text-aurelia-gold" />,
  'Atelier Audio': <Headphones className="w-5 h-5 text-aurelia-gold" />
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'All' | MaisonCategory>('All');

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

  const featuredCreations = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const tabFilteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  }).slice(0, 8);

  const flagshipTimepiece = PRODUCTS[0]; // Aurelia Tourbillon
  const flagshipLeather = PRODUCTS[1];    // Palazzo Tuscan Weekender

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen font-ui">
      
      {/* 100% Exclusivity Top Gold Ribbon */}
      <div className="w-full bg-aurelia-goldLight border-b border-aurelia-goldBorder/60 py-2 px-4 text-center">
        <span className="text-[10px] sm:text-xs uppercase tracking-super font-bold text-aurelia-goldDark flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-aurelia-gold" />
          <span>EXCLUSIVE TO AURELIAPRIVE.COM • NEVER SOLD ON ANY OTHER APP OR MARKETPLACE</span>
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. Motion Hero Section (Editorial Split Banner) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-white border border-aurelia-border p-8 sm:p-12 lg:p-16 overflow-hidden shadow-luxury">
            
            {/* Subtle Luxury Ambient Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-aurelia-goldLight rounded-full blur-3xl pointer-events-none opacity-70" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-stone-100 rounded-full blur-3xl pointer-events-none opacity-50" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Headline & Private Allocation CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                {/* Gold Exclusivity Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurelia-obsidian text-aurelia-gold text-xs font-bold border border-aurelia-gold/40 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-aurelia-gold animate-ping" />
                  <span className="tracking-widest uppercase text-[10px]">STRICTLY WEBSITE EXCLUSIVE • SERIALIZED RUN</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-aurelia-obsidian tracking-tight leading-[1.05]">
                  Rare Objects, <br />
                  <span className="italic font-normal text-aurelia-gold">Crafted Without Compromise.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-stone-600 font-normal max-w-xl leading-relaxed">
                  Swiss Tourbillon Horology, hand-stitched Tuscan calfskin luggage, aged Assam oud extraits, and solid Italian marble objects. Numbered and strictly direct-to-collector.
                </p>

                {/* Action Buttons & Telemetry Link */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/shop"
                    className="px-8 py-4 rounded bg-aurelia-obsidian hover:bg-black text-aurelia-gold font-bold text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-obsidian-glow transition-all"
                  >
                    <span>Explore Private Vault</span>
                    <ArrowRight className="w-4 h-4 text-aurelia-gold" />
                  </Link>

                  <button
                    onClick={() => addToCart(flagshipTimepiece, 1)}
                    className="px-7 py-4 rounded bg-white hover:bg-aurelia-goldLight text-aurelia-obsidian font-bold text-xs uppercase tracking-widest border border-aurelia-border transition-all"
                  >
                    Acquire Timepiece • ₹1,45,000
                  </button>

                  <Link
                    to="/track"
                    className="px-5 py-4 rounded bg-aurelia-goldLight hover:bg-aurelia-gold hover:text-white text-aurelia-goldDark font-bold text-xs uppercase tracking-widest border border-aurelia-goldBorder flex items-center gap-1.5 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Live GPS Telemetry</span>
                  </Link>
                </div>

                {/* Zero Third-Party Seal */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-aurelia-borderSubtle text-xs text-stone-500">
                  <div className="flex items-center gap-1.5 font-bold text-aurelia-obsidian">
                    <Award className="w-4 h-4 text-aurelia-gold" />
                    <span>Hand-Numbered Wax-Sealed Certificate</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Zero Middlemen • Never Sold on Any App</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Floating Luxury Visual Showcase */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-full max-w-sm"
                >
                  <img
                    src={flagshipTimepiece.image}
                    alt="Aurelia Tourbillon Skeleton Chronometer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer rounded-2xl"
                    onClick={() => navigate(`/product/${flagshipTimepiece.id}`)}
                  />

                  {/* Bobbing Price & Edition Pill */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="absolute -bottom-4 right-2 sm:right-4 bg-white/95 backdrop-blur-md border border-aurelia-border rounded-xl p-3 shadow-luxury flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded bg-aurelia-obsidian flex items-center justify-center text-aurelia-gold font-serif font-bold text-xs">
                      01
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-aurelia-gold font-extrabold block">
                        Direct-to-Collector
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif font-bold text-aurelia-obsidian text-base">
                          Edition 01 of 10 • ₹1,45,000
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Swiss Manual-Wind Pill */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="absolute -top-3 -left-3 bg-aurelia-obsidian border border-aurelia-gold/40 text-aurelia-gold rounded-full px-3.5 py-1.5 shadow-luxury hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-aurelia-gold" />
                    <span>Swiss Flying Tourbillon</span>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Browse by Maison Category */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-y border-aurelia-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-aurelia-gold text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Disciplines</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-aurelia-obsidian tracking-tight">
                Curated Luxury Collections
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest font-bold text-aurelia-gold hover:text-aurelia-goldDark flex items-center gap-1"
            >
              <span>Explore All 20 Numbered Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MAISON_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${encodeURIComponent(cat.name)}`}
                className="group relative bg-aurelia-alabaster hover:bg-white rounded-xl border border-aurelia-border hover:border-aurelia-gold/60 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded bg-white group-hover:bg-aurelia-goldLight border border-aurelia-border group-hover:border-aurelia-gold/40 flex items-center justify-center mb-3 transition-colors">
                  {CATEGORY_ICON_MAP[cat.name]}
                </div>
                <h3 className="font-serif font-bold text-sm text-aurelia-obsidian group-hover:text-aurelia-goldDark transition-colors mb-1 line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">
                  {cat.count} Pieces
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Ultra-Rare Collector Pieces (Featured Numbered Creations) */}
      {/* ========================================================================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-aurelia-gold text-xs font-bold uppercase tracking-widest mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Serialized Highlights</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-aurelia-obsidian tracking-tight">
                Ultra-Rare Collector Pieces
              </h2>
            </div>
            <Link
              to="/shop?filter=limited"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white hover:bg-aurelia-goldLight text-aurelia-obsidian font-bold text-xs uppercase tracking-widest border border-aurelia-border shadow-sm transition-all"
            >
              <span>View Full Vault Register</span>
              <ArrowRight className="w-3.5 h-3.5 text-aurelia-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCreations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. Limited Edition Vault Window (Countdown Banner) */}
      {/* ========================================================================= */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-aurelia-obsidian via-stone-900 to-aurelia-charcoal p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl border border-aurelia-gold/40">
            
            {/* Ambient Gold Halo */}
            <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-aurelia-gold/15 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-aurelia-gold/20 border border-aurelia-gold/40 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-aurelia-gold tracking-widest uppercase">
                  <Clock className="w-3 h-3 text-aurelia-gold" />
                  <span>Embargo Window Ending</span>
                </div>

                <h3 className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Private Vault Allocation Closes In
                </h3>

                <p className="text-stone-300 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
                  Remaining allocations for the Palazzo Tuscan Weekender and Calacatta Marble Chess Set will be archived into the permanent safe upon clock expiration.
                </p>

                {/* Live Ticking Countdown Timer */}
                <div className="flex items-center gap-3 sm:gap-4 pt-2">
                  <div className="flex flex-col items-center bg-black/50 backdrop-blur-md rounded px-4 py-3 min-w-[68px] border border-aurelia-gold/30">
                    <span className="font-serif font-bold text-2xl text-aurelia-gold">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Days</span>
                  </div>

                  <span className="font-serif text-aurelia-gold text-2xl">:</span>

                  <div className="flex flex-col items-center bg-black/50 backdrop-blur-md rounded px-4 py-3 min-w-[68px] border border-aurelia-gold/30">
                    <span className="font-serif font-bold text-2xl text-aurelia-gold">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Hours</span>
                  </div>

                  <span className="font-serif text-aurelia-gold text-2xl">:</span>

                  <div className="flex flex-col items-center bg-black/50 backdrop-blur-md rounded px-4 py-3 min-w-[68px] border border-aurelia-gold/30">
                    <span className="font-serif font-bold text-2xl text-aurelia-gold">
                      {String(timeLeft.mins).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Mins</span>
                  </div>

                  <span className="font-serif text-aurelia-gold text-2xl">:</span>

                  <div className="flex flex-col items-center bg-black/50 backdrop-blur-md rounded px-4 py-3 min-w-[68px] border border-aurelia-gold/30">
                    <span className="font-serif font-bold text-2xl text-aurelia-gold">
                      {String(timeLeft.secs).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Secs</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/shop?filter=limited"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-aurelia-gold hover:bg-white text-aurelia-obsidian font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
                  >
                    <span>Claim Serialized Piece</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Leather Weekender Visual */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-w-xs relative text-center"
                >
                  <img
                    src={flagshipLeather.image}
                    alt="Palazzo Tuscan Weekender Bag"
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-xl border border-aurelia-gold/30"
                  />
                  <div className="mt-3 inline-block bg-aurelia-obsidian/90 border border-aurelia-gold/40 px-3.5 py-1 rounded text-[10px] uppercase tracking-wider text-aurelia-gold font-bold">
                    Palazzo Weekender • Edition of 20
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. Complete 20-Creation Premier Catalog Grid */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-aurelia-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-aurelia-gold text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Ledger</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-aurelia-obsidian tracking-tight">
                The Complete 20-Creation Catalog
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Horology', 'Bespoke Leather', 'Haute Parfumerie', 'Collector Objects', 'Atelier Audio'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded text-xs uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-aurelia-obsidian text-aurelia-gold shadow-sm'
                      : 'bg-aurelia-alabaster text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-aurelia-alabaster hover:bg-aurelia-goldLight text-aurelia-obsidian font-bold text-xs uppercase tracking-widest border border-aurelia-border transition-all"
            >
              <span>Explore Full Private Catalog</span>
              <ArrowRight className="w-4 h-4 text-aurelia-gold" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
