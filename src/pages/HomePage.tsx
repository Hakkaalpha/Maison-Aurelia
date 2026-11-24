import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Headphones,
  Keyboard,
  Gamepad2,
  Cpu,
  Camera,
  LayoutGrid,
  Clock,
  TrendingUp,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  'Audio': <Headphones className="w-5 h-5 text-indigo-600" />,
  'Keyboards & Mice': <Keyboard className="w-5 h-5 text-indigo-600" />,
  'Gaming': <Gamepad2 className="w-5 h-5 text-indigo-600" />,
  'Smart Accessories': <Cpu className="w-5 h-5 text-indigo-600" />,
  'Webcams & Speakers': <Camera className="w-5 h-5 text-indigo-600" />,
  'Desk Setup': <LayoutGrid className="w-5 h-5 text-indigo-600" />
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'All' | 'Audio' | 'Gaming' | 'Desk Setup'>('All');

  // Live Countdown Timer (Days, Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    mins: 38,
    secs: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
        return { days: 2, hours: 14, mins: 38, secs: 45 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Featured 8 best sellers
  const bestSellers = PRODUCTS.filter((p) => p.featured || p.badge === 'Best Seller').slice(0, 8);

  // Tabbed items
  const tabFilteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  }).slice(0, 8);

  const heroProduct = PRODUCTS[0]; // Roco Wireless ANC Headphones

  return (
    <div className="w-full bg-[#F8F9FE] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. Motion Hero Section (Reference 1 Aesthetic) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#EEF2FF] via-[#EDE9FE] to-[#F5F3FF] border border-indigo-100/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
            
            {/* Background Decorative Rings */}
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
            <div className="absolute right-1/4 -bottom-20 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Typography & CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-indigo-700 text-xs font-bold shadow-soft border border-indigo-100">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span>New Arrival • Limited Drop</span>
                </div>

                {/* Headline */}
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                  Roco Wireless <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    ANC Headphones
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                  Immerse yourself in acoustic precision. Hybrid 38dB active noise cancellation, custom beryllium 40mm drivers, and 45-hour playback for uncompromised focus.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={`/product/${heroProduct.id}`}
                    className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-button hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => addToCart(heroProduct, 1)}
                    className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-soft hover:-translate-y-0.5 transition-all"
                  >
                    Add to Cart • ₹3,499
                  </button>
                </div>

                {/* Social Proof Avatar Stack */}
                <div className="flex items-center gap-4 pt-4 border-t border-indigo-200/60">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="User"
                    />
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                      alt="User"
                    />
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                      alt="User"
                    />
                    <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-white bg-indigo-600 text-white items-center justify-center text-xs font-bold">
                      +1.2k
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      ★★★★★ <span className="text-slate-800 font-bold ml-1">4.9 / 5</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Over 1,200+ Happy Desk Enthusiasts
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Floating Product Visual with Bobbing Price Pill */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {/* Floating Glow Backdrop */}
                <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-2xl pointer-events-none" />

                {/* Floating Image Container */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-full max-w-sm"
                >
                  <img
                    src={heroProduct.image}
                    alt="Roco Wireless Headphones"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => navigate(`/product/${heroProduct.id}`)}
                  />

                  {/* Bobbing Price Tag Pill */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -bottom-4 right-4 sm:right-6 bg-white/95 backdrop-blur-md border border-indigo-100 rounded-2xl p-3 shadow-card flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      30%
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        Introductory Offer
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-slate-900 text-base">
                          Only ₹3,499
                        </span>
                        <span className="text-xs text-slate-400 line-through">₹4,999</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Feature Pill */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -top-4 -left-2 bg-white/95 backdrop-blur-md border border-indigo-100 rounded-2xl px-3.5 py-2 shadow-card hidden sm:flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-800">45H Battery Life</span>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Browse by Category Row */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Gear Collections</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Browse by Category
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              <span>Explore All 20 Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${encodeURIComponent(cat.name)}`}
                className="group relative bg-[#F8F9FE] hover:bg-white rounded-2xl border border-slate-200/70 hover:border-indigo-200 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-50 border border-slate-100 group-hover:border-indigo-100 flex items-center justify-center mb-3 shadow-soft transition-colors">
                  {CATEGORY_ICON_MAP[cat.name] || <LayoutGrid className="w-6 h-6 text-indigo-600" />}
                </div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  {cat.count} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Explore Our Best Sellers (4-column responsive grid) */}
      {/* ========================================================================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Explore Our Best Sellers
              </h2>
            </div>
            <Link
              to="/shop?filter=best-sellers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs border border-indigo-100 shadow-soft transition-all"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. Special Offer Countdown Banner */}
      {/* ========================================================================= */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-xl">
            
            {/* Background Texture & Glow */}
            <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Promotion & Live Countdown Timer */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white tracking-wide">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Limited Time Flash Deal</span>
                </div>

                <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Enhance Your Music & Gaming Experience
                </h3>

                <p className="text-white/80 text-sm sm:text-base font-medium max-w-lg leading-relaxed">
                  Grab 20% off on all tactical input hardware, ANC audio drivers, and desk lamps before the seasonal inventory reset.
                </p>

                {/* Live Ticking Countdown Timer */}
                <div className="flex items-center gap-3 sm:gap-4 pt-2">
                  <div className="flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[64px] border border-white/20">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Days</span>
                  </div>

                  <span className="font-bold text-white text-xl">:</span>

                  <div className="flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[64px] border border-white/20">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Hours</span>
                  </div>

                  <span className="font-bold text-white text-xl">:</span>

                  <div className="flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[64px] border border-white/20">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {String(timeLeft.mins).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Mins</span>
                  </div>

                  <span className="font-bold text-white text-xl">:</span>

                  <div className="flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[64px] border border-white/20">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {String(timeLeft.secs).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Secs</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/shop?filter=deals"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>Check It Out</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating Acoustic Visual */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-w-xs relative"
                >
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
                    alt="Gaming Headset Deal"
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap border border-white/20">
                    Surround 7.1 Pro • Save 10%
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. More Deals & New Arrivals Section with Category Tabs */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Drops</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                More Deals & New Arrivals
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Audio', 'Gaming', 'Desk Setup'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-button'
                      : 'bg-[#F8F9FE] text-slate-600 hover:bg-slate-100'
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#F8F9FE] hover:bg-indigo-50 text-indigo-600 font-bold text-sm border border-slate-200/80 shadow-soft hover:shadow-md transition-all"
            >
              <span>Explore All 20 Tech Gear Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
