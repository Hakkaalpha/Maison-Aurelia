import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Play,
  Sun,
  Moon,
  Calendar,
  Award,
  ArrowRight,
  Sliders,
  X
} from 'lucide-react';
import { PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import { useCart } from '../context/CartContext';
import { ExplodedViewModal } from '../components/ExplodedViewModal';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Find active product
  const currentIndex = PRODUCTS.findIndex((p) => p.id === id);
  const product = currentIndex > -1 ? PRODUCTS[currentIndex] : PRODUCTS[0];

  // Prev / Next products
  const prevProduct = PRODUCTS[(currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length];
  const nextProduct = PRODUCTS[(currentIndex + 1) % PRODUCTS.length];

  // Component states
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [isCampaignOpen, setIsCampaignOpen] = useState<boolean>(false);
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('specs');
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard Bespoke'
  );

  const isFavorited = isInWishlist(product.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleAcquireNow = () => {
    addToCart(product, 1, selectedColor);
    navigate('/checkout');
  };

  return (
    <>
      {/* FULL-BLEED TWO-PANEL LUXURY DETAIL VIEW */}
      <div className="w-full min-h-screen bg-[#0B0C0E] flex flex-col lg:flex-row select-none overflow-x-hidden">
        
        {/* ========================================================
            LEFT ~65% FULL-BLEED SIGNATURE COLOR CANVAS
            ======================================================== */}
        <div
          className={`flex-1 lg:w-[65%] min-h-[70vh] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden transition-colors duration-700 ${
            isNightMode ? 'bg-[#080B10]' : ''
          }`}
          style={{
            backgroundColor: isNightMode ? '#080B10' : product.accentColor
          }}
        >
          {/* Subtle Ambient Night Glow Mesh */}
          {isNightMode && (
            <div className="absolute inset-0 bg-radial-at-c from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
          )}

          {/* TOP CONTROLS: SHARE + BACK TO ATELIER */}
          <div className="relative z-20 flex items-center justify-between text-white">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-xs font-mono tracking-wider backdrop-blur-md transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'COPIED TO CLIPBOARD' : 'SHARE CREATION'}</span>
            </button>

            <Link
              to="/shop"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-xs font-mono font-bold tracking-wider backdrop-blur-md transition-all text-white"
            >
              <span>← BACK TO ATELIER</span>
            </Link>
          </div>

          {/* CENTER STAGE: CRISP STUDIO IMAGE + FLOATING ANIMATION */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-8">
            <motion.div
              key={`${product.id}-${isNightMode}`}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] sm:max-w-[480px] aspect-square flex items-center justify-center"
            >
              {/* Product Image (Switches to Lume/Glow variant or filter when Night Mode toggled) */}
              <img
                src={isNightMode && product.lumeImage ? product.lumeImage : product.image}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className={`max-h-full max-w-full object-contain filter transition-all duration-700 ${
                  isNightMode
                    ? 'drop-shadow-[0_0_35px_rgba(52,211,153,0.55)] brightness-110 contrast-125'
                    : 'drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]'
                }`}
              />

              {/* Luminescent Tag Pill if in Night Mode */}
              {isNightMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-2 bg-emerald-950/90 border border-emerald-400 text-emerald-300 px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold shadow-lg"
                >
                  ● SUPER-LUMINOVA® ACTIVE LUME RENDER
                </motion.div>
              )}
            </motion.div>

            {/* Serial Allocation Watermark */}
            <span className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mt-2">
              MAISON AURELIA ATELIER // {product.sku}
            </span>
          </div>

          {/* RIGHT EDGE TRIGGER: CIRCULAR ▷ WATCH VIDEO BUTTON */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={() => setIsCampaignOpen(true)}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/30 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-all text-white hover:scale-105"
            >
              <div className="w-10 h-10 rounded-full bg-[#C6A45E] text-[#0B0C0E] flex items-center justify-center font-bold shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase [writing-mode:vertical-rl]">
                WATCH VIDEO
              </span>
            </button>
          </div>

          {/* BOTTOM BAR: PREV/NEXT ARROWS + DAY/NIGHT LUME TOGGLE */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
            
            {/* Prev / Next Steppers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/product/${prevProduct.id}`)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-xs font-mono text-white transition-colors"
                title={`Previous: ${prevProduct.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">PREV</span>
              </button>

              <button
                onClick={() => navigate(`/product/${nextProduct.id}`)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-xs font-mono text-white transition-colors"
                title={`Next: ${nextProduct.name}`}
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* DAY / NIGHT LUME TOGGLE SWITCH */}
            <div className="flex items-center bg-black/40 border border-white/20 p-1 rounded-full backdrop-blur-md">
              <button
                onClick={() => setIsNightMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  !isNightMode
                    ? 'bg-white text-[#0B0C0E] shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Day</span>
              </button>

              <button
                onClick={() => setIsNightMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  isNightMode
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-emerald-300" />
                <span>Night Lume</span>
              </button>
            </div>

            {/* Mobile Video Trigger */}
            <div className="block md:hidden">
              <button
                onClick={() => setIsCampaignOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C6A45E] text-[#0B0C0E] text-xs font-mono font-bold"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video</span>
              </button>
            </div>

          </div>

        </div>


        {/* ========================================================
            RIGHT ~35% CRISP PURE WHITE (#FFFFFF) PURCHASE & SPECS PANEL
            ======================================================== */}
        <div className="flex-1 lg:w-[35%] bg-white text-[#0B0C0E] p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-6">
            
            {/* Exclusivity Tag */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#C6A45E] font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>AURELIA SERIALIZED EDITION • EXCLUSIVE TO THIS WEBSITE</span>
              </div>

              {/* Bold Architectural Display Title */}
              <h1 className="font-condensed font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#0B0C0E] leading-[0.95]">
                {product.architecturalTitle || product.name}
              </h1>

              {/* Scarcity Bar */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#0B0C0E]">
                  Edition 04 of {product.editionNumber}
                </span>
                <span className="text-[#C6A45E] font-bold">
                  ● Only {product.remaining} Remaining
                </span>
              </div>
            </div>

            {/* Price & White Glove Delivery */}
            <div className="border-b border-stone-200 pb-5">
              <div className="flex items-baseline gap-2">
                <span className="font-condensed font-bold text-3xl sm:text-4xl text-[#0B0C0E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-sans text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs font-mono text-stone-500 mt-1 uppercase">
                INCL. INSURED WHITE-GLOVE ARMORED DELIVERY
              </p>
            </div>

            {/* Color / Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-stone-400 uppercase font-bold">
                  Bespoke Atelier Finish: <span className="text-black font-sans">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'border-black bg-stone-100 font-bold'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist & Share Outlined Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`py-2.5 px-4 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                  isFavorited
                    ? 'border-[#C6A45E] bg-stone-50 text-[#C6A45E]'
                    : 'border-stone-200 text-stone-700 hover:border-black'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-[#C6A45E]' : ''}`} />
                <span>{isFavorited ? 'SAVED TO VAULT' : 'ADD TO WISHLIST'}</span>
              </button>

              <button
                onClick={handleShare}
                className="py-2.5 px-4 rounded-xl border border-stone-200 hover:border-black text-stone-700 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE PIECE</span>
              </button>
            </div>

            {/* Primary Purchase Buttons: ADD TO BAG + ACQUIRE NOW */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(product, 1, selectedColor)}
                className="w-full py-4 rounded-xl bg-[#0B0C0E] hover:bg-black text-white font-condensed font-bold text-base tracking-widest uppercase transition-all shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO PRIVATE BAG</span>
              </button>

              <button
                onClick={handleAcquireNow}
                className="w-full py-3.5 rounded-xl border-2 border-[#C6A45E] bg-[#F8F5EE] hover:bg-[#C6A45E] text-[#0B0C0E] hover:text-black font-condensed font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>ACQUIRE ALLOCATION NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Accordion Rows */}
            <div className="space-y-2 pt-4 border-t border-stone-200 text-xs">
              
              {/* Row 1: Technical Details & Materials */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? '' : 'specs')}
                  className="w-full p-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between font-bold text-left text-[#0B0C0E] transition-colors"
                >
                  <div className="flex items-center gap-2 font-mono uppercase">
                    <Sliders className="w-3.5 h-3.5 text-[#C6A45E]" />
                    <span>TECHNICAL DETAILS & MATERIALS</span>
                  </div>
                  <span className="font-mono text-sm">{activeAccordion === 'specs' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'specs' && (
                  <div className="p-4 bg-white space-y-2 border-t border-stone-100">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-stone-100 text-xs">
                        <span className="text-stone-400">{s.label}:</span>
                        <span className="font-medium text-black text-right">{s.value}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-stone-400 uppercase font-bold block mb-1">
                        Curated Metallurgy & Origins:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.materials.map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-700"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2: 100% Website Exclusive */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'exclusive' ? '' : 'exclusive')}
                  className="w-full p-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between font-bold text-left text-[#0B0C0E] transition-colors"
                >
                  <div className="flex items-center gap-2 font-mono uppercase">
                    <Lock className="w-3.5 h-3.5 text-[#C6A45E]" />
                    <span>100% WEBSITE EXCLUSIVE (ZERO RETAIL)</span>
                  </div>
                  <span className="font-mono text-sm">{activeAccordion === 'exclusive' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'exclusive' && (
                  <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    This creation is strictly direct-to-collector. It is never sold or listed on Amazon, Flipkart, multi-brand retailers, or any shopping app. Each exemplar is paired directly with the collector’s private ledger.
                  </div>
                )}
              </div>

              {/* Row 3: Schedule Private Concierge Handover */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'schedule' ? '' : 'schedule')}
                  className="w-full p-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between font-bold text-left text-[#0B0C0E] transition-colors"
                >
                  <div className="flex items-center gap-2 font-mono uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A45E]" />
                    <span>SCHEDULE PRIVATE CONCIERGE HANDOVER</span>
                  </div>
                  <span className="font-mono text-sm">{activeAccordion === 'schedule' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'schedule' && (
                  <div className="p-4 bg-white text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    <p>
                      Delivered via armored Mercedes-Maybach GLS with temperature-controlled interior and biometric verification. You may pick your handover date and time during checkout.
                    </p>
                    <Link
                      to="/track"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C6A45E] hover:underline"
                    >
                      <span>Preview Live Maybach GPS Route →</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Row 4: Numbered Certificate of Authenticity */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'cert' ? '' : 'cert')}
                  className="w-full p-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between font-bold text-left text-[#0B0C0E] transition-colors"
                >
                  <div className="flex items-center gap-2 font-mono uppercase">
                    <Award className="w-3.5 h-3.5 text-[#C6A45E]" />
                    <span>NUMBERED CERTIFICATE OF AUTHENTICITY</span>
                  </div>
                  <span className="font-mono text-sm">{activeAccordion === 'cert' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'cert' && (
                  <div className="p-4 bg-white text-xs space-y-2 border-t border-stone-100">
                    <p className="text-stone-600">
                      Accompanied by an individual laser-engraved titanium card and wax seal certifying origin in {product.provenance}.
                    </p>
                    <button
                      onClick={() => setIsCertOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0B0C0E] text-white text-xs font-mono font-bold hover:bg-[#C6A45E] hover:text-black transition-colors"
                    >
                      Preview Certificate Document
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Footer Security Badges */}
          <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>VAULT ID: {product.sku}</span>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>INSURED TRANSIT</span>
            </div>
          </div>

        </div>

      </div>

      {/* Exploded Engineering Campaign Modal */}
      <ExplodedViewModal
        isOpen={isCampaignOpen}
        onClose={() => setIsCampaignOpen(false)}
        product={product}
        onAcquire={handleAcquireNow}
      />

      {/* Numbered Certificate Modal */}
      {isCertOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0B0C0E] border-2 border-[#C6A45E] rounded-3xl p-8 max-w-lg w-full text-white shadow-2xl relative"
          >
            <button
              onClick={() => setIsCertOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-[#C6A45E] flex items-center justify-center mx-auto text-[#C6A45E]">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#C6A45E] uppercase block">
                ATELIER PRIVATE LEDGER CERTIFICATION
              </span>
              <h3 className="font-condensed font-bold text-2xl uppercase tracking-wider text-white">
                Certificate of Master Provenance
              </h3>
            </div>

            <div className="py-6 space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">CREATION:</span>
                <span className="font-bold text-white text-right">{product.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">SERIAL RUN:</span>
                <span className="font-bold text-[#C6A45E]">04 OF {product.editionNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">WORKSHOP ORIGIN:</span>
                <span className="text-white">{product.provenance}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">PRIMARY METALLURGY:</span>
                <span className="text-white">{product.materials[0]}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">RETAIL RESTRICTION:</span>
                <span className="text-emerald-400 font-bold">AURELIAPRIVE.COM ONLY</span>
              </div>
            </div>

            <button
              onClick={() => setIsCertOpen(false)}
              className="w-full py-3 rounded-xl bg-[#C6A45E] text-[#0B0C0E] font-condensed font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              CLOSE CERTIFICATION PREVIEW
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
