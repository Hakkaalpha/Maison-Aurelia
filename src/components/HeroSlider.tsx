import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Product } from '../types';
import { FALLBACK_IMAGE } from '../data/products';
import { ExplodedViewModal } from './ExplodedViewModal';

interface HeroSliderProps {
  flagshipProducts: Product[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ flagshipProducts }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const total = flagshipProducts.length;
  const currentProduct = flagshipProducts[currentIndex] || flagshipProducts[0];
  const nextIndex = (currentIndex + 1) % total;
  const nextProduct = flagshipProducts[nextIndex] || flagshipProducts[0];

  // Auto-advance every 7 seconds unless hovered/interacting
  useEffect(() => {
    if (!isAutoPlay || isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isModalOpen, total]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <>
      {/* FULL-VIEWPORT HORIZONTAL SPLIT HERO SHOWCASE */}
      <section
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        className="w-full min-h-[88vh] bg-[#0B0C0E] text-white flex flex-col lg:flex-row relative overflow-hidden select-none"
      >
        
        {/* ========================================================
            LEFT ~75% PANEL: MATTE PITCH BLACK (#0B0C0E) ACTIVE ITEM
            ======================================================== */}
        <div className="flex-1 lg:w-3/4 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative z-10">
          
          {/* Top Exclusivity Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#C6A45E]/40 text-[#C6A45E] text-xs font-mono font-bold tracking-widest uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>STRICTLY SOLD ONLY ON AURELIAPRIVE.COM</span>
            </div>

            <div className="text-xs font-mono text-stone-400">
              ALLOCATION RUN: <span className="text-[#C6A45E] font-bold">{currentProduct.editionLabel}</span>
            </div>
          </div>

          {/* Main Showcase Stage: Split Left Photo + Right Typography */}
          <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
            
            {/* Left Side: High-Contrast Floating Angled Studio Photography */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              {/* Subtle Ambient Radial Spotlight */}
              <motion.div
                key={`spotlight-${currentProduct.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: currentProduct.accentColor }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: -30, rotate: -4 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 30, rotate: 4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center group cursor-pointer"
                  onClick={() => navigate(`/product/${currentProduct.id}`)}
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Serial Stamp Callout */}
                  <div className="absolute -bottom-2 -left-2 bg-[#0B0C0E]/90 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-[#C6A45E] shadow-xl">
                    SERIAL 04/15 • ATELIER CERTIFIED
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Architectural Headline + Campaign Trigger + CTA */}
            <div className="md:col-span-7 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentProduct.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Category & Status Pill */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentProduct.accentColor }} />
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C6A45E]">
                      {currentProduct.category} // {currentProduct.accentName || 'BESPOKE EDITION'}
                    </span>
                  </div>

                  {/* Giant Condensed All-Caps Architectural Headline */}
                  <h1 className="font-condensed font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight uppercase text-white">
                    {currentProduct.architecturalTitle || currentProduct.name}
                  </h1>

                  {/* Editorial Description */}
                  <p className="text-sm sm:text-base text-stone-300 max-w-xl font-sans font-normal leading-relaxed line-clamp-3">
                    {currentProduct.description}
                  </p>

                  {/* Price Tag with Delivery Assurance */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="font-condensed font-bold text-3xl sm:text-4xl text-white">
                      ₹{currentProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      INCL. ARMORED HANDOVER
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                
                {/* 1. Discover Creation Main CTA */}
                <button
                  onClick={() => navigate(`/product/${currentProduct.id}`)}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#C6A45E] text-[#0B0C0E] hover:text-black font-condensed font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-3 shadow-luxury hover:scale-105"
                >
                  <span>DISCOVER CREATION</span>
                  <div className="w-6 h-6 rounded-full bg-[#0B0C0E] text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* 2. Exploded-View Campaign Video Trigger */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 transition-all text-xs font-mono tracking-wider uppercase"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C6A45E] text-[#0B0C0E] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-stone-400 leading-none">OFFICIAL CAMPAIGN</span>
                    <span className="font-bold text-white group-hover:text-[#C6A45E] transition-colors">WATCH VIDEO</span>
                  </div>
                </button>

              </div>

            </div>

          </div>

          {/* Bottom Navigation Toolbar: Dots & Arrow Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {/* Slide Pagination Dots */}
            <div className="flex items-center gap-2.5">
              {flagshipProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all duration-300 h-2 rounded-full ${
                    idx === currentIndex
                      ? 'w-8 bg-[#C6A45E]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={p.name}
                />
              ))}
              <span className="text-xs font-mono text-stone-400 ml-2">
                0{currentIndex + 1} / 0{total}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Previous Creation"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Next Creation"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>


        {/* ========================================================
            RIGHT ~25% PEEK PANEL: NEXT CREATION'S SIGNATURE ACCENT COLOR
            ======================================================== */}
        <motion.div
          key={`peek-${nextProduct.id}`}
          onClick={() => {
            // Clicking peek panel slides the panel or navigates to next product
            navigate(`/product/${nextProduct.id}`);
          }}
          className="hidden lg:flex w-1/4 min-h-full cursor-pointer relative overflow-hidden flex-col justify-between p-8 group transition-all duration-500 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20"
          style={{ backgroundColor: nextProduct.accentColor }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between text-white/90">
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold">
              NEXT ALLOCATION // 0{nextIndex + 1}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Peeking Next Product Image */}
          <div className="my-auto flex items-center justify-center relative py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-52 h-52 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"
            >
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </div>

          {/* Bottom Title & Scarcity Tag */}
          <div className="space-y-1.5 text-white">
            <span className="text-[10px] font-mono tracking-wider uppercase block opacity-80">
              {nextProduct.category} • {nextProduct.editionLabel}
            </span>
            <h3 className="font-condensed font-bold text-xl uppercase leading-tight line-clamp-2">
              {nextProduct.architecturalTitle || nextProduct.name}
            </h3>
            <span className="text-xs font-mono font-bold block pt-1">
              ₹{nextProduct.price.toLocaleString('en-IN')}
            </span>
            <div className="text-[11px] font-mono text-white/90 underline underline-offset-4 pt-1 font-bold">
              EXPAND CREATION →
            </div>
          </div>

          {/* Subtle Hover Overlay Shimmer */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>

      </section>

      {/* Exploded Engineering Campaign Modal */}
      <ExplodedViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentProduct}
        onAcquire={() => {
          setIsModalOpen(false);
          navigate(`/product/${currentProduct.id}`);
        }}
      />
    </>
  );
};

export default HeroSlider;
