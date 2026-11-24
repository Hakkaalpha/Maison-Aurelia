import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Navigation,
  Sparkles,
  Watch,
  Briefcase,
  Glasses,
  Compass,
  Headphones,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MAISON_CATEGORIES, PRODUCTS, FALLBACK_IMAGE } from '../data/products';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Horology': <Watch className="w-4 h-4 text-aurelia-gold" />,
  'Bespoke Leather': <Briefcase className="w-4 h-4 text-aurelia-gold" />,
  'Haute Parfumerie': <Sparkles className="w-4 h-4 text-aurelia-gold" />,
  'Eyewear & Pens': <Glasses className="w-4 h-4 text-aurelia-gold" />,
  'Collector Objects': <Compass className="w-4 h-4 text-aurelia-gold" />,
  'Atelier Audio': <Headphones className="w-4 h-4 text-aurelia-gold" />
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSearchFocused(false);
  }, [location.pathname]);

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
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-aurelia-border shadow-luxury">
      
      {/* 1. Top Exclusivity Bar */}
      <div className="w-full bg-aurelia-obsidian text-white py-2 px-4 border-b border-aurelia-gold/20 font-ui text-[11px] tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-aurelia-gold animate-pulse" />
            <span className="text-stone-300 uppercase tracking-widest font-semibold text-[10px] sm:text-[11px]">
              Strictly Available Only on AureliaPrivé.com • Never Listed on Any Other App • Complimentary Armored Doorstep Delivery
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[10px] text-stone-400 font-medium">
            <span className="text-aurelia-gold font-bold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-aurelia-gold" />
              100% DIRECT-TO-COLLECTOR
            </span>
            <span>•</span>
            <span className="text-stone-300">Member Privilege: <b className="text-white">AURELIA10</b></span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Brand Wordmark & Seal */}
          <Link to="/" className="flex items-center gap-3.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-sm bg-aurelia-obsidian border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold font-serif text-xl tracking-tighter shadow-sm group-hover:border-aurelia-gold transition-colors">
              MA
            </div>
            <div>
              <span className="font-serif font-bold text-2xl tracking-widest text-aurelia-obsidian block uppercase leading-none">
                Maison <span className="text-aurelia-gold italic font-normal">Aurelia</span>
              </span>
              <span className="text-[9px] tracking-widest-plus uppercase text-aurelia-muted font-bold block mt-1">
                Private Atelier • Limited Edition Run
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm relative mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search tourbillons, leather, oud..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs text-aurelia-obsidian placeholder-stone-400 focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all font-ui"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            </form>

            {/* Live Search Popup */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-luxury-hover border border-aurelia-border py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] font-bold text-aurelia-muted uppercase tracking-wider border-b border-aurelia-borderSubtle">
                  Numbered Atelier Pieces ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-aurelia-goldLight transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-10 h-10 rounded-md object-cover bg-aurelia-alabaster border border-aurelia-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-aurelia-obsidian truncate">{product.name}</p>
                      <p className="text-[10px] text-aurelia-gold font-bold">{product.edition} • {product.category}</p>
                    </div>
                    <span className="text-xs font-bold font-serif text-aurelia-obsidian">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-xs uppercase tracking-widest font-bold transition-colors ${
                location.pathname === '/' ? 'text-aurelia-gold border-b-2 border-aurelia-gold pb-1' : 'text-stone-600 hover:text-aurelia-obsidian'
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`text-xs uppercase tracking-widest font-bold transition-colors ${
                location.pathname === '/shop' ? 'text-aurelia-gold border-b-2 border-aurelia-gold pb-1' : 'text-stone-600 hover:text-aurelia-obsidian'
              }`}
            >
              All Creations
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group" onMouseLeave={() => setIsCategoryMenuOpen(false)}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-stone-600 hover:text-aurelia-obsidian transition-colors py-2"
              >
                <span>Disciplines</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-aurelia-gold transition-transform" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-luxury-hover border border-aurelia-border p-3 z-50">
                  <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-aurelia-gold font-bold border-b border-aurelia-borderSubtle mb-1.5">
                    Maison Aurelia Categories
                  </div>
                  {MAISON_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/category/${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-aurelia-goldLight transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-aurelia-alabaster border border-aurelia-border flex items-center justify-center">
                        {CATEGORY_ICONS[cat.name]}
                      </div>
                      <div className="flex-1">
                        <span className="block text-xs font-bold text-aurelia-obsidian">{cat.name}</span>
                        <span className="block text-[10px] text-stone-400 font-medium">
                          {cat.count} Limited Pieces
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/shop?filter=limited"
              className="text-xs uppercase tracking-widest font-bold text-stone-600 hover:text-aurelia-obsidian flex items-center gap-1.5 transition-colors"
            >
              <span>Limited Editions</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-aurelia-gold/15 text-aurelia-goldDark border border-aurelia-gold/30">
                1 OF 10
              </span>
            </Link>

            {/* Live Track Order */}
            <Link
              to="/track"
              className={`text-xs uppercase tracking-widest font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                location.pathname === '/track'
                  ? 'bg-aurelia-gold text-white border-aurelia-gold shadow-sm'
                  : 'bg-aurelia-goldLight text-aurelia-goldDark border-aurelia-goldBorder hover:bg-aurelia-gold hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 animate-pulse" />
              <span>Live Track Order</span>
            </Link>

            <Link
              to="/checkout"
              className="text-xs uppercase tracking-widest font-bold text-stone-600 hover:text-aurelia-obsidian transition-colors"
            >
              Checkout
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2.5 rounded-lg text-stone-600 hover:text-aurelia-gold hover:bg-aurelia-alabaster transition-colors"
              title="Private Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-aurelia-gold text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-aurelia-obsidian hover:bg-stone-900 text-white font-ui font-bold text-xs shadow-sm transition-colors"
              aria-label="Open Private Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-aurelia-gold" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Private Bag</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-aurelia-gold text-aurelia-obsidian text-[10px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-aurelia-alabaster transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search 20 serialized creations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs text-aurelia-obsidian"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-aurelia-border px-4 py-4 space-y-3">
          <Link to="/" className="block py-2 text-xs uppercase tracking-widest font-bold text-aurelia-obsidian">
            Maison Home
          </Link>
          <Link to="/shop" className="block py-2 text-xs uppercase tracking-widest font-bold text-stone-700">
            All 20 Creations
          </Link>
          <Link to="/track" className="block py-2 text-xs uppercase tracking-widest font-bold text-aurelia-gold">
            Live GPS Armored Courier Tracking
          </Link>
          <Link to="/checkout" className="block py-2 text-xs uppercase tracking-widest font-bold text-stone-700">
            Private Checkout
          </Link>
        </div>
      )}
    </header>
  );
};
