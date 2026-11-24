import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

interface ExplodedViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAcquire?: () => void;
}

export const ExplodedViewModal: React.FC<ExplodedViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAcquire
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0.35); // 0 to 1
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Animation timeline loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0; // Loop seamlessly
        return prev + 0.004;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  // Compute exploded separation distance based on timeline progress
  // progress goes from 0 (compact assembled) to 1 (full explosion then reassembles)
  const separation = Math.sin(progress * Math.PI) * 110; // 0 to 110px per step

  const layers = [
    {
      id: 1,
      name: 'Carbotech™ Rotating Bezel',
      desc: 'Unidirectional 60-minute ceramic click matrix',
      offsetFactor: -2.2,
      color: '#5C6942',
      badge: 'LAYER 01 // EXTERIOR RING'
    },
    {
      id: 2,
      name: 'Double-Domed Sapphire Crystal',
      desc: '2.5mm Corundum crystal with dual AR coating',
      offsetFactor: -1.3,
      color: '#3E82C4',
      badge: 'LAYER 02 // OPTICAL BARRIER'
    },
    {
      id: 3,
      name: 'Sandwich Lume Dial & Hands',
      desc: 'Super-LumiNova® Grade X1 dual-tier phosphor plate',
      offsetFactor: -0.4,
      color: '#C6A45E',
      badge: 'LAYER 03 // PHOSPHOR CORE'
    },
    {
      id: 4,
      name: 'In-House Calibre AU-900',
      desc: '28,800 vph Glucydur balance & twin-barrel 72h reserve',
      offsetFactor: 0.5,
      color: '#C26D38',
      badge: 'LAYER 04 // ESCAPEMENT ENGINE'
    },
    {
      id: 5,
      name: 'Monobloc Titanium Casing',
      desc: 'Grade-5 Titanium with patented lever crown-lock bridge',
      offsetFactor: 1.4,
      color: '#465669',
      badge: 'LAYER 05 // CHASSIS MATRIX'
    },
    {
      id: 6,
      name: 'Exhibition Sapphire Caseback',
      desc: 'Laser-etched serial plate & 21K tungsten weighted rotor',
      offsetFactor: 2.3,
      color: '#782C3A',
      badge: 'LAYER 06 // HERMETIC SEAL'
    }
  ];

  const currentSeconds = Math.floor(progress * 105);
  const formattedTime = `00:${currentSeconds.toString().padStart(2, '0')}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0B0C0E]/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.accentColor} 0%, transparent 65%)`
          }}
        />

        {/* TOP CINEMATIC HEADER BAR */}
        <div className="relative z-10 px-6 sm:px-10 py-5 flex items-center justify-between border-b border-white/10 bg-[#0B0C0E]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="font-condensed font-bold tracking-widest text-lg sm:text-xl text-white uppercase">
              MAISON AURELIA
            </span>
            <span className="hidden sm:inline text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-[#C6A45E] border border-[#C6A45E]/30 uppercase">
              ENGINEERING CAMPAIGN // 60FPS DECONSTRUCTION
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE 3D AXIS RENDER</span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C6A45E]" />}
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-white hover:text-[#C6A45E]"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER 60FPS EXPLODED ASSEMBLY VIEWPORT */}
        <div className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
          
          {/* Active Product Title & Subtitle */}
          <div className="absolute top-4 text-center z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C6A45E]">
              {product.editionLabel} • AXIAL SEPARATION VIEW
            </span>
            <h2 className="font-condensed font-bold text-2xl sm:text-4xl text-white tracking-wide uppercase mt-1">
              {product.architecturalTitle || product.name}
            </h2>
          </div>

          {/* Exploded Layers Visualization Canvas */}
          <div className="relative w-full max-w-5xl h-[340px] sm:h-[420px] flex items-center justify-center">
            
            {/* Center Reference Axis Line */}
            <div className="absolute w-[85%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Individual Exploded Component Layers */}
            {layers.map((layer) => {
              const xPos = layer.offsetFactor * separation;
              const isSelected = activeLayer === layer.id;

              return (
                <motion.div
                  key={layer.id}
                  animate={{
                    x: xPos,
                    scale: isSelected ? 1.08 : 1,
                    opacity: activeLayer && !isSelected ? 0.45 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className="absolute cursor-pointer flex flex-col items-center group"
                  style={{ zIndex: 10 + layer.id }}
                >
                  {/* Exploded Part Graphic Representation */}
                  <div className="relative w-28 sm:w-44 h-44 sm:h-64 flex items-center justify-center">
                    {/* Architectural Wireframe Disk / Component */}
                    <div
                      className={`w-24 sm:w-36 h-36 sm:h-52 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-2xl relative overflow-hidden backdrop-blur-md ${
                        isSelected
                          ? 'border-[#C6A45E] bg-white/10 shadow-[0_0_35px_rgba(198,164,94,0.4)]'
                          : 'border-white/20 bg-[#0B0C0E]/70 hover:border-white/50'
                      }`}
                    >
                      {/* Geometric Technical Rings */}
                      <div className="absolute inset-2 border border-dashed border-white/20 rounded-xl" />
                      <div className="absolute inset-6 border border-white/10 rounded-full animate-spin [animation-duration:20s]" />

                      {/* Layer Icon Graphic */}
                      <div className="text-center p-2 z-10">
                        <span className="text-[10px] font-mono text-[#C6A45E] block font-bold mb-1">
                          #{layer.id.toString().padStart(2, '0')}
                        </span>
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-2">
                          <Sparkles className="w-5 h-5 text-[#C6A45E]" />
                        </div>
                        <span className="text-[11px] font-condensed font-bold text-white uppercase block leading-tight">
                          {layer.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Connecting Vertical Technical Leader Line */}
                    <div className="absolute -top-12 h-12 w-[1px] bg-[#C6A45E]/40" />
                    <div className="absolute -top-14 w-2 h-2 rounded-full bg-[#C6A45E]" />
                  </div>

                  {/* Component Technical Tag (Floating) */}
                  <div
                    className={`mt-3 text-center transition-all duration-300 max-w-[150px] ${
                      isSelected ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#C6A45E] uppercase font-bold block">
                      {layer.badge}
                    </span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate">
                      {layer.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 leading-tight hidden sm:block mt-0.5">
                      {layer.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Highlighted Layer Telemetry Callout */}
          <div className="h-14 flex items-center justify-center">
            {activeLayer ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-[#C6A45E]/40 px-5 py-2 rounded-full flex items-center gap-3 backdrop-blur-md"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C6A45E]" />
                <span className="text-xs font-mono text-white">
                  INSPECTING: <strong className="text-[#C6A45E]">{layers[activeLayer - 1].name}</strong> — {layers[activeLayer - 1].desc}
                </span>
              </motion.div>
            ) : (
              <span className="text-xs font-mono text-stone-500 tracking-wider">
                HOVER OVER ANY LAYER TO INSPECT TOLERANCE & METALLURGY
              </span>
            )}
          </div>
        </div>

        {/* BOTTOM TIMELINE SCRUBBER & PLAYBACK CONTROLS */}
        <div className="relative z-10 px-6 sm:px-10 py-5 bg-[#0B0C0E]/90 border-t border-white/10 backdrop-blur-md">
          <div className="max-w-5xl mx-auto space-y-3">
            
            {/* Scrubber Progress Track */}
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={progress}
                onChange={(e) => {
                  setProgress(parseFloat(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C6A45E]"
              />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Play / Pause / Replay */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-[#C6A45E] hover:bg-[#d8b874] text-[#0B0C0E] flex items-center justify-center font-bold transition-transform hover:scale-105 shadow-lg"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 transition-colors"
                  title="Replay from Assembly"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="font-mono text-xs text-stone-400">
                  <span className="text-white font-bold">{formattedTime}</span> / 01:45
                </div>
              </div>

              {/* Status & Exclusivity Tag */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#C6A45E]">
                <ShieldCheck className="w-4 h-4" />
                <span>EXCLUSIVELY CRAFTED AT MAISON AURELIA ATELIER</span>
              </div>

              {/* Acquire Action */}
              <div className="flex items-center gap-3">
                <span className="font-condensed font-bold text-lg text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={() => {
                    onClose();
                    if (onAcquire) onAcquire();
                  }}
                  className="px-5 py-2 rounded-full bg-white text-[#0B0C0E] hover:bg-[#C6A45E] hover:text-black font-condensed font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>Acquire Allocation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default ExplodedViewModal;
