import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const claimedPercent = Math.round((product.claimed / product.editionNumber) * 100);

  return (
    <div className="group relative bg-white rounded-xl border border-aurelia-border shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col overflow-hidden font-ui">
      
      {/* 100% Website-Exclusive Header Seal on Card */}
      <div className="bg-aurelia-obsidian text-aurelia-gold px-3 py-1 text-[9px] uppercase tracking-widest font-bold flex items-center justify-between border-b border-aurelia-gold/30">
        <span className="flex items-center gap-1">
          <Lock className="w-2.5 h-2.5 text-aurelia-gold" />
          <span>EXCLUSIVE TO AURELIAPRIVE.COM</span>
        </span>
        <span className="text-stone-400">NO APPS</span>
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-aurelia-alabaster overflow-hidden p-6 flex items-center justify-center border-b border-aurelia-borderSubtle">
        
        {/* Serialized Edition Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-aurelia-obsidian border border-aurelia-border shadow-sm">
            {product.edition}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-stone-400 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          aria-label="Private Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Photo */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Allocation Counter */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-aurelia-gold">
              {product.category}
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Only {product.remaining} of {product.editionNumber} Remaining
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-aurelia-goldDark transition-colors">
            <h3 className="font-serif font-bold text-aurelia-obsidian text-base sm:text-lg line-clamp-1 mb-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Key Materials */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.subtitle}
          </p>

          {/* Provenance Tag */}
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mb-3">
            <Sparkles className="w-3 h-3 text-aurelia-gold" />
            <span>Atelier Origin: {product.provenance}</span>
          </div>

          {/* Allocation Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-aurelia-gold to-amber-700 rounded-full"
                style={{ width: `${claimedPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-aurelia-borderSubtle flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-aurelia-obsidian text-lg">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">
              Direct-to-Collector Handover
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className="w-9 h-9 rounded bg-aurelia-obsidian hover:bg-black text-aurelia-gold flex items-center justify-center transition-all shadow-sm"
              title="Add to Private Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-9 h-9 rounded bg-aurelia-alabaster hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
              title="Inspect Creation"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
