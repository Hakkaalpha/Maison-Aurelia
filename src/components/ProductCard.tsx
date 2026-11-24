import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowRight, Lock } from 'lucide-react';
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

  return (
    <div className="group relative bg-[#14161A] text-white rounded-2xl border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 flex flex-col overflow-hidden select-none hover:-translate-y-1">
      
      {/* 1. Exclusivity Seal Top Bar */}
      <div className="bg-[#0B0C0E] text-[#C6A45E] px-3.5 py-1.5 text-[9px] uppercase tracking-widest font-mono font-bold flex items-center justify-between border-b border-white/5">
        <span className="flex items-center gap-1.5">
          <Lock className="w-2.5 h-2.5" />
          <span>AURELIAPRIVE.COM EXCLUSIVE</span>
        </span>
        <span className="text-stone-400">SERIALIZED</span>
      </div>

      {/* 2. Studio Image Stage */}
      <div className="relative aspect-square w-full bg-[#0E1014] overflow-hidden p-6 flex items-center justify-center border-b border-white/5">
        
        {/* Subtle Ambient Accent Glow */}
        <div
          className="absolute w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
          style={{ backgroundColor: product.accentColor }}
        />

        {/* Serialized Edition Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: product.accentColor }}
          />
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white/10 text-stone-200 border border-white/10 backdrop-blur-md">
            {product.editionLabel}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white border border-white/10'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
        </button>

        {/* Product Photo Link */}
        <Link
          to={`/product/${product.id}`}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* 3. Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Scarcity Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#C6A45E]">
              {product.category}
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              Only {product.remaining} Left
            </span>
          </div>

          {/* Architectural Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-condensed font-bold text-white text-lg line-clamp-1 uppercase tracking-tight group-hover:text-[#C6A45E] transition-colors">
              {product.architecturalTitle || product.name}
            </h3>
          </Link>

          {/* Subtitle / Metallurgy Specs */}
          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mt-1 font-sans">
            {product.subtitle || product.materials[0]}
          </p>
        </div>

        {/* 4. Price & Action Buttons */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="font-condensed font-bold text-xl text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="block text-[9px] font-mono text-stone-400 uppercase">
              ARMORED HANDOVER
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors"
              title="Add to Private Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#C6A45E] text-[#0B0C0E] hover:text-black font-condensed font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1"
            >
              <span>INSPECT</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
