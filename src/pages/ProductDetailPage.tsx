import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Share2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, FALLBACK_IMAGE, SAMPLE_REVIEWS } from '../data/products';
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

  // Sync state when product changes
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

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="w-full bg-[#F8F9FE] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Details Hero Grid */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Feature Display */}
              <div className="relative aspect-square w-full rounded-2xl bg-[#F8F9FE] border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-sm">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-500 shadow-sm'
                      : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm'
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
                    className={`aspect-square rounded-xl bg-[#F8F9FE] border-2 overflow-hidden p-2 transition-all ${
                      selectedImage === img
                        ? 'border-indigo-600 ring-2 ring-indigo-100'
                        : 'border-slate-100 hover:border-slate-300'
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

            {/* Right Column: Buying Options & Specifications */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* SKU & Category & Share */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-600 uppercase tracking-wider font-bold">
                      {product.category}
                    </span>
                    <span>•</span>
                    <span className="font-mono">SKU: {product.sku}</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight mb-2">
                  {product.name}
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                  {product.subtitle}
                </p>

                {/* Ratings Strip */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on <b>{product.reviewCount}</b> verified customer reviews
                  </span>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    In Stock & Ready to Ship
                  </span>
                </div>

                {/* Price Box */}
                <div className="py-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-slate-400 line-through font-medium">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    Inclusive of all taxes. Free shipping on orders above ₹999.
                  </p>
                </div>

                {/* Color / Variant Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="py-5 border-b border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                      <span>Color Finish: <span className="text-indigo-600">{selectedColor}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                            selectedColor === color.name
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-100'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Action Buttons */}
                <div className="py-6 space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-11 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-11 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center gap-2 border border-indigo-200 shadow-soft transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                  {/* Buy Now Button -> direct to checkout */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-button hover:shadow-xl transition-all"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now — Instant Checkout</span>
                  </button>
                </div>

                {/* Trust Assurance Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#F8F9FE]">
                    <Truck className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800">Express Dispatch</span>
                    <span className="text-[10px] text-slate-400">2-4 Days</span>
                  </div>

                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#F8F9FE]">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800">1-Year Warranty</span>
                    <span className="text-[10px] text-slate-400">Official Brand</span>
                  </div>

                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#F8F9FE]">
                    <RotateCcw className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800">30-Day Returns</span>
                    <span className="text-[10px] text-slate-400">Zero Hassle</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Detailed Product Specs & Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Key Features Bullet Points */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8">
            <h3 className="font-display font-extrabold text-lg text-slate-900 mb-4">
              Engineered Highlights & Features
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="space-y-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Specs Table */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8">
            <h3 className="font-display font-extrabold text-lg text-slate-900 mb-4">
              Hardware Specifications
            </h3>
            <div className="divide-y divide-slate-100">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="font-semibold text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Customer Reviews & Ratings
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verified owners praise build quality, tactical response, and acoustic clarity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {product.rating}
              </span>
              <div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {product.reviewCount} total reviews
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-[#F8F9FE] rounded-2xl p-5 border border-slate-100/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-xs text-slate-900">{rev.author}</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs mb-2">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                {rev.verified && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                    <Check className="w-3 h-3" />
                    <span>Verified Kinetix Buyer</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-extrabold text-2xl text-slate-900">
                You Might Also Like
              </h3>
              <Link
                to={`/category/${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>More from {product.category}</span>
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
