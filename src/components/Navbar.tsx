import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  Headphones,
  Keyboard,
  Gamepad2,
  Cpu,
  Camera,
  LayoutGrid
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRODUCTS, FALLBACK_IMAGE } from '../data/products';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Audio': <Headphones className="w-4 h-4 text-indigo-600" />,
  'Keyboards & Mice': <Keyboard className="w-4 h-4 text-indigo-600" />,
  'Gaming': <Gamepad2 className="w-4 h-4 text-indigo-600" />,
  'Smart Accessories': <Cpu className="w-4 h-4 text-indigo-600" />,
  'Webcams & Speakers': <Camera className="w-4 h-4 text-indigo-600" />,
  'Desk Setup': <LayoutGrid className="w-4 h-4 text-indigo-600" />
};

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Click outside to close search preview
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-soft">
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-[#EDE9FE] text-indigo-950 text-xs py-2 px-4 border-b border-indigo-100 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px]">
              ★
            </span>
            <span className="font-semibold text-slate-800">
              Free Shipping on Orders Over ₹999 • Instant Gmail Order Confirmation
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-600 font-medium">
            <span>Fast Dispatch across India</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-indigo-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Code: KINETIX10 for 10% OFF
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-button group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Kinetix <span className="text-indigo-600">Tech</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-bold block -mt-1">
                Tactile & Desk Gear
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar with Live Suggestions */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md relative mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search headphones, keyboards, hubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 focus:border-indigo-500 focus:bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </form>

            {/* Live Search Popup Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-dropdown border border-slate-100 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Products ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-50/60 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-50 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{product.category}</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </Link>
                ))}
                <div className="p-2 border-t border-slate-100 mt-1">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-1.5 text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View all results for "{searchQuery}" →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/shop' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group" onMouseLeave={() => setIsCategoryMenuOpen(false)}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-dropdown border border-slate-100 p-2 z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/category/${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8F9FE] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        {CATEGORY_ICONS[cat.name] || <LayoutGrid className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <div className="flex-1">
                        <span className="block text-xs font-bold text-slate-800">{cat.name}</span>
                        <span className="block text-[11px] text-slate-400 font-medium">
                          {cat.count} items
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/shop?filter=deals"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <span>Deals</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                Hot
              </span>
            </Link>

            <Link
              to="/checkout"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/checkout' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Checkout
            </Link>
          </nav>

          {/* Right Action Icons (Wishlist, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-[#F8F9FE] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 font-bold text-xs transition-colors"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-display">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search 20+ tech & desk items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Shop All Products
            </Link>
            <div className="py-2 border-y border-slate-100">
              <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/shop?filter=deals"
              className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Trending Deals
            </Link>
            <Link
              to="/checkout"
              className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Instant Checkout
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
