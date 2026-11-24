import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Share2,
  ChevronRight,
  ArrowRight,
  Award,
  Lock
} from 'lucide-react';
import { PRODUCTS, FALLBACK_IMAGE, SAMPLE_COLLECTOR_REVIEWS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Default'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]?.name || 'Default');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-8 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusivity Golden Top Notice */}
        <div className="mb-6 rounded-lg bg-aurelia-obsidian border border-aurelia-gold/40 px-4 py-2 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-aurelia-gold" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-aurelia-gold">
              EXCLUSIVE TO AURELIAPRIVE.COM • NEVER SOLD ON ANY OTHER APP OR MARKETPLACE
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 text-[10px] uppercase tracking-widest font-mono">
            Vault Registry: Numbered Piece
          </span>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-400 mb-8">
          <Link to="/" className="hover:text-aurelia-gold transition-colors">Atelier Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-aurelia-gold transition-colors">All Creations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-aurelia-gold transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-aurelia-obsidian font-bold line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Details Hero Card */}
        <div className="bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-xl bg-aurelia-alabaster border border-aurelia-border p-8 flex items-center justify-center overflow-hidden">
                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded bg-aurelia-obsidian text-aurelia-gold border border-aurelia-gold/40 shadow-sm">
                  {product.edition}
                </span>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 shadow-sm'
                      : 'bg-white/90 text-stone-400 hover:text-rose-500 hover:bg-white shadow-sm'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                <img
                  src={selectedImage}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-lg bg-aurelia-alabaster border-2 overflow-hidden p-2 transition-all ${
                      selectedImage === img
                        ? 'border-aurelia-gold ring-2 ring-aurelia-goldLight'
                        : 'border-aurelia-border hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Buying Options & Provenance */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* SKU, Category & Share */}
                <div className="flex items-center justify-between text-xs font-semibold text-stone-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-aurelia-gold uppercase tracking-widest font-bold">
                      {product.category}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">ARCHIVE ID: {product.sku}</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-stone-500 hover:text-aurelia-gold transition-colors text-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-serif font-bold text-3xl sm:text-5xl text-aurelia-obsidian tracking-tight mb-2 leading-tight">
                  {product.name}
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-stone-500 font-normal leading-relaxed mb-4">
                  {product.subtitle}
                </p>

                {/* Serial Allocation Bar & Remaining Notice */}
                <div className="p-4 rounded-xl bg-aurelia-goldLight border border-aurelia-goldBorder/80 mb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-aurelia-goldDark uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-aurelia-gold" />
                      <span>Serialized Allocation: {product.edition}</span>
                    </span>
                    <span className="font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded text-[11px]">
                      Only {product.remaining} of {product.editionNumber} Pieces Remaining
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-amber-200/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-aurelia-gold to-amber-700 rounded-full"
                      style={{ width: `${Math.round((product.claimed / product.editionNumber) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Price Display */}
                <div className="py-5 border-y border-aurelia-borderSubtle">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-aurelia-obsidian">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-stone-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 font-medium mt-1 uppercase tracking-wider">
                    Complimentary Armored Handover Included Across India
                  </p>
                </div>

                {/* Color / Variant */}
                {product.colors && product.colors.length > 0 && (
                  <div className="py-4 border-b border-aurelia-borderSubtle">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2.5">
                      <span>Finishing / Trim: <span className="text-aurelia-gold">{selectedColor}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            selectedColor === color.name
                              ? 'border-aurelia-gold bg-aurelia-goldLight text-aurelia-goldDark ring-1 ring-aurelia-gold'
                              : 'border-aurelia-border bg-white text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Certificate of Authenticity Preview Pill */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full p-3 rounded-lg bg-stone-900 hover:bg-black text-white border border-aurelia-gold/40 flex items-center justify-between transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <Award className="w-4 h-4 text-aurelia-gold flex-shrink-0" />
                      <div>
                        <span className="block text-xs font-bold text-aurelia-gold tracking-wide uppercase">
                          Preview Certificate of Authenticity
                        </span>
                        <span className="block text-[10px] text-stone-400">
                          Verified exclusive to AureliaPrivé.com • Never sold on any app
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-aurelia-gold font-bold underline">
                      Inspect Seal →
                    </span>
                  </button>
                </div>

                {/* Quantity & Action Buttons */}
                <div className="py-4 space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-aurelia-border rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-aurelia-obsidian">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Bag */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3.5 px-6 rounded-lg bg-aurelia-alabaster hover:bg-stone-200 text-aurelia-obsidian font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-aurelia-border transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-aurelia-gold" />
                      <span>Add to Private Bag</span>
                    </button>
                  </div>

                  {/* Acquire Now */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-lg bg-aurelia-obsidian hover:bg-black text-white font-serif font-bold text-base tracking-widest uppercase flex items-center justify-center gap-2 shadow-obsidian-glow transition-all"
                  >
                    <Lock className="w-4 h-4 text-aurelia-gold" />
                    <span>Acquire Now — White-Glove Handover</span>
                  </button>
                </div>

                {/* White-Glove Handover Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-aurelia-borderSubtle text-center text-[10px] text-stone-500">
                  <div className="flex flex-col items-center p-2 rounded bg-aurelia-alabaster">
                    <Truck className="w-4 h-4 text-aurelia-gold mb-1" />
                    <span className="font-bold text-aurelia-obsidian uppercase">Armored Handover</span>
                    <span>Mercedes Maybach</span>
                  </div>

                  <div className="flex flex-col items-center p-2 rounded bg-aurelia-alabaster">
                    <ShieldCheck className="w-4 h-4 text-aurelia-gold mb-1" />
                    <span className="font-bold text-aurelia-obsidian uppercase">100% Website Only</span>
                    <span>No Third-Party Apps</span>
                  </div>

                  <div className="flex flex-col items-center p-2 rounded bg-aurelia-alabaster">
                    <RotateCcw className="w-4 h-4 text-aurelia-gold mb-1" />
                    <span className="font-bold text-aurelia-obsidian uppercase">Atelier Provenance</span>
                    <span>{product.provenance}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Certificate of Authenticity Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 border-2 border-aurelia-gold/60 shadow-2xl relative">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-aurelia-obsidian text-sm font-bold"
              >
                ✕
              </button>
              
              <div className="text-center pb-6 border-b border-aurelia-borderSubtle">
                <div className="w-12 h-12 rounded-full bg-aurelia-obsidian border border-aurelia-gold flex items-center justify-center text-aurelia-gold mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-aurelia-obsidian">
                  Maison Aurelia Certificate of Provenance
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-aurelia-gold font-bold mt-1">
                  SERIAL ARCHIVE REGISTRY: {product.sku}
                </p>
              </div>

              <div className="py-6 space-y-3 text-xs text-stone-600">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Creation:</span>
                  <span className="font-bold text-aurelia-obsidian">{product.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Allocation:</span>
                  <span className="font-bold text-aurelia-goldDark">{product.edition} (Numbered Run)</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Atelier Origin:</span>
                  <span className="font-bold text-aurelia-obsidian">{product.provenance}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Exclusivity Seal:</span>
                  <span className="font-bold text-emerald-700">AureliaPrivé.com Exclusive — Never Listed on Any App</span>
                </div>
              </div>

              <div className="p-3 bg-aurelia-goldLight border border-aurelia-goldBorder rounded-lg text-center text-[11px] text-aurelia-goldDark font-semibold">
                An engraved titanium certificate with cryptographic NFC registration is included inside the presentation casket upon delivery.
              </div>

              <button
                onClick={() => setShowCertificateModal(false)}
                className="w-full mt-6 py-2.5 rounded bg-aurelia-obsidian text-aurelia-gold font-bold text-xs uppercase tracking-widest"
              >
                Close Certificate View
              </button>
            </div>
          </div>
        )}

        {/* Detailed Artisan Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-8">
            <h3 className="font-serif font-bold text-2xl text-aurelia-obsidian mb-4">
              Atelier Craftsmanship & Materials
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="space-y-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-aurelia-goldLight text-aurelia-goldDark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-stone-700 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-8">
            <h3 className="font-serif font-bold text-2xl text-aurelia-obsidian mb-4">
              Technical Ledger
            </h3>
            <div className="divide-y divide-aurelia-borderSubtle">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-stone-500 font-medium">{spec.label}</span>
                  <span className="font-semibold text-aurelia-obsidian text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collector Reviews */}
        <div className="bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-aurelia-borderSubtle">
            <div>
              <h3 className="font-serif font-bold text-2xl text-aurelia-obsidian">
                Private Collector Statements
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Verified private members and founders praise materials, serial provenance, and armored handover.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-3xl text-aurelia-obsidian">
                {product.rating}
              </span>
              <div>
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                  Vault Verified Patrons
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_COLLECTOR_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-aurelia-alabaster rounded-xl p-5 border border-aurelia-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm text-aurelia-obsidian">{rev.author}</span>
                    <span className="text-[10px] text-stone-400">{rev.date}</span>
                  </div>
                  <div className="text-[11px] text-aurelia-gold font-semibold mb-2">{rev.role}</div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
                {rev.verified && (
                  <div className="mt-4 pt-3 border-t border-aurelia-borderSubtle flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                    <Check className="w-3 h-3" />
                    <span>Verified Private Acquisition</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif font-bold text-3xl text-aurelia-obsidian">
                More Creations from {product.category}
              </h3>
              <Link
                to={`/category/${encodeURIComponent(product.category)}`}
                className="text-xs uppercase tracking-widest font-bold text-aurelia-gold hover:text-aurelia-goldDark flex items-center gap-1"
              >
                <span>View Discipline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
