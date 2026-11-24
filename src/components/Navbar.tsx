import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Navigation,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, FALLBACK_IMAGE } from '../data/products';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults =
    searchQuery.trim().length > 1
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 5)
      : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0C0E] text-white border-b border-white/10 select-none">
      
      {/* 1. TOP EXCLUSIVITY TELEMETRY STRIP */}
      <div className="w-full bg-[#08090B] py-1.5 px-4 border-b border-white/5 font-mono text-[10px] tracking-wider text-stone-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A45E] animate-pulse" />
            <span className="text-white uppercase font-bold tracking-widest text-[10px]">
              STRICTLY SOLD ONLY ON AURELIAPRIVE.COM • NEVER AVAILABLE ON ANY OTHER APP
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-stone-400">
            <span className="text-[#C6A45E] flex items-center gap-1 font-bold">
              <Lock className="w-3 h-3" />
              DIRECT-TO-COLLECTOR ATELIER
            </span>
            <span>•</span>
            <span>ARMORED MAYBACH COURIER PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN OBSIDIAN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* LEFT: BOLD GEOMETRIC WORDMARK + TINY GOLD PILL "PRIVATE ATELIER" */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 rounded bg-[#14161A] border border-[#C6A45E]/40 flex items-center justify-center text-[#C6A45E] font-condensed font-bold text-lg group-hover:border-[#C6A45E] transition-colors shadow-sm">
              MA
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-condensed font-bold text-2xl tracking-[0.18em] text-white uppercase leading-none">
                  MAISON AURELIA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C6A45E]/15 text-[#C6A45E] border border-[#C6A45E]/30 text-[9px] font-mono font-bold tracking-wider uppercase">
                  PRIVATE ATELIER
                </span>
              </div>
              <span className="text-[8px] font-mono tracking-[0.25em] text-stone-400 uppercase mt-1">
                GENEVA • NEUCHÂTEL • FLORENCE
              </span>
            </div>
          </Link>

          {/* CENTER: TRACKED UPPERCASE NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-8 font-condensed font-bold text-sm tracking-[0.2em] text-stone-300">
            <Link
              to="/shop"
              className={`hover:text-[#C6A45E] transition-colors uppercase ${
                location.pathname === '/shop' && !location.search ? 'text-[#C6A45E]' : ''
              }`}
            >
              COLLECTIONS
            </Link>

            <Link
              to="/shop?filter=limited"
              className={`hover:text-[#C6A45E] transition-colors uppercase flex items-center gap-1.5 ${
                location.search.includes('limited') ? 'text-[#C6A45E]' : ''
              }`}
            >
              <span>LIMITED EDITIONS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A45E]" />
            </Link>

            <Link
              to="/shop"
              className="hover:text-[#C6A45E] transition-colors uppercase"
            >
              THE VAULT
            </Link>

            <Link
              to="/track"
              className={`hover:text-[#C6A45E] transition-colors uppercase flex items-center gap-1.5 ${
                location.pathname === '/track' ? 'text-[#C6A45E]' : ''
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-[#C6A45E] animate-pulse" />
              <span>LIVE GPS TRACK</span>
            </Link>

            <Link
              to="/checkout"
              className={`hover:text-[#C6A45E] transition-colors uppercase ${
                location.pathname === '/checkout' ? 'text-[#C6A45E]' : ''
              }`}
            >
              CHECKOUT
            </Link>
          </nav>

          {/* RIGHT: MINIMAL WHITE ICONS + GOLD "TRACK ORDER" PILL */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Icon Trigger */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Search Atelier Creations"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Floating Search Input Modal */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-[#14161A] border border-white/20 rounded-2xl shadow-2xl p-3 z-50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search tourbillon, carbotech, oud..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C6A45E]"
                    />
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </form>

                  {/* Results preview */}
                  {searchResults.length > 0 && (
                    <div className="mt-3 divide-y divide-white/5 max-h-64 overflow-y-auto">
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                            className="w-10 h-10 object-contain rounded bg-white/5"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-[10px] text-[#C6A45E] font-mono block">
                              {p.editionLabel}
                            </span>
                            <span className="text-xs text-white font-bold truncate block">
                              {p.name}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Private Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#C6A45E] text-[#0B0C0E] text-[9px] font-bold flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Private Bag Icon with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Open Private Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C6A45E] text-[#0B0C0E] text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Gold "Track Order" Pill */}
            <Link
              to="/track"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C6A45E] hover:bg-[#d8b874] text-[#0B0C0E] font-condensed font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              <Navigation className="w-3.5 h-3.5 fill-current" />
              <span>Track Order</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#14161A] border-t border-white/10 px-6 py-6 space-y-4 font-condensed font-bold text-base tracking-widest uppercase">
          <Link
            to="/shop"
            className="block text-white hover:text-[#C6A45E]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            COLLECTIONS
          </Link>
          <Link
            to="/shop?filter=limited"
            className="block text-white hover:text-[#C6A45E]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LIMITED EDITIONS
          </Link>
          <Link
            to="/shop"
            className="block text-white hover:text-[#C6A45E]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            THE VAULT
          </Link>
          <Link
            to="/track"
            className="block text-[#C6A45E]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LIVE GPS TRACK
          </Link>
          <Link
            to="/checkout"
            className="block text-white hover:text-[#C6A45E]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CHECKOUT
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
