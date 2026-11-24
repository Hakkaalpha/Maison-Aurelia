import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowUpRight } from 'lucide-react';
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
    <div className="group relative bg-white rounded-2xl border border-slate-100/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#F8F9FE] overflow-hidden p-6 flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide ${
                product.badge === 'Best Seller'
                  ? 'bg-indigo-600 text-white'
                  : product.badge === 'New'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-indigo-600 transition-colors">
            <h3 className="font-display font-bold text-slate-900 text-sm line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing and Quick Add Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-slate-900 text-base">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discountPercent && (
              <span className="text-[10px] font-bold text-emerald-600">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
              title="View Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
