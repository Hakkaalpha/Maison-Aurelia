import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Lock, ArrowUpDown, Award } from 'lucide-react';
import { PRODUCTS, MAISON_CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(150000);
  const [onlyLimited, setOnlyLimited] = useState<boolean>(false);
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rarity'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    } else {
      setSelectedCategory('All');
    }

    const query = searchParams.get('search');
    if (query) setSearchQuery(query);

    const filter = searchParams.get('filter');
    if (filter === 'limited' || filter === 'vault') {
      setOnlyLimited(true);
    } else if (filter === 'wishlist') {
      setOnlyWishlist(true);
    }
  }, [categoryName, searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesMat = product.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesMat) return false;
      }

      if (product.price > priceMax) return false;
      if (onlyLimited && product.editionNumber > 20) return false;
      if (onlyWishlist && !wishlist.includes(product.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rarity') return a.editionNumber - b.editionNumber;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceMax, onlyLimited, onlyWishlist, sortBy, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceMax(150000);
    setOnlyLimited(false);
    setOnlyWishlist(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="w-full bg-[#0B0C0E] text-white min-h-screen py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusivity Seal Banner */}
        <div className="mb-6 rounded-2xl bg-[#14161A] border border-[#C6A45E]/40 px-4 py-2.5 flex items-center justify-between text-xs text-stone-300 shadow-xl">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#C6A45E]" />
            <span className="font-mono uppercase tracking-widest text-[11px] font-bold text-[#C6A45E]">
              STRICTLY SOLD ONLY ON AURELIAPRIVE.COM • NEVER AVAILABLE ON ANY OTHER APP
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 text-[10px] uppercase tracking-widest font-mono">
            Vault Status: Active
          </span>
        </div>

        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-400 mb-2">
            <Link to="/" className="hover:text-[#C6A45E] transition-colors">Atelier Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Private Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-[#C6A45E] font-bold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                {onlyWishlist
                  ? 'Your Private Wishlist'
                  : selectedCategory !== 'All'
                  ? selectedCategory
                  : 'All Atelier Creations'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-mono">
                Showing {filteredProducts.length} of {PRODUCTS.length} limited serialized collector pieces
              </p>
            </div>

            {/* Quick Sort & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14161A] border border-white/20 text-xs font-bold text-white shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C6A45E]" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 bg-[#14161A] px-3.5 py-2.5 rounded-xl border border-white/15 shadow-sm text-xs font-mono">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-[#14161A]">Vault Curated</option>
                  <option value="rarity" className="bg-[#14161A]">Rarity (Smallest Edition)</option>
                  <option value="price-low" className="bg-[#14161A]">Price: Low to High</option>
                  <option value="price-high" className="bg-[#14161A]">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filter Sidebar */}
          <aside
            className={`lg:block bg-[#14161A] rounded-2xl border border-white/10 shadow-2xl p-6 space-y-6 ${
              isMobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto lg:relative lg:inset-auto' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-condensed font-bold text-base text-white uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#C6A45E]" />
                <span>Atelier Filter</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-wider font-mono font-bold text-[#C6A45E] hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-mono font-bold text-stone-300 uppercase tracking-wider mb-2">
                Search Creations
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tourbillon, calfskin, marble..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C6A45E]"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-mono font-bold text-stone-300 uppercase tracking-wider mb-2">
                Discipline
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-white/15 text-white font-bold border border-[#C6A45E]/40'
                      : 'text-stone-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>All 20 Pieces</span>
                  <span className="text-[10px] text-stone-400 font-mono">{PRODUCTS.length}</span>
                </button>

                {MAISON_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-white/15 text-white font-bold border border-[#C6A45E]/40'
                        : 'text-stone-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider">
                  Allocation Cap
                </label>
                <span className="text-xs font-condensed font-bold text-white">
                  ₹{priceMax.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="18000"
                max="150000"
                step="5000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C6A45E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1 font-mono">
                <span>₹18k</span>
                <span>₹75k</span>
                <span>₹150k</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-aurelia-borderSubtle">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyLimited}
                  onChange={(e) => setOnlyLimited(e.target.checked)}
                  className="rounded text-aurelia-gold focus:ring-aurelia-gold w-4 h-4 accent-aurelia-gold"
                />
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-aurelia-gold" />
                  <span>Ultra-Rare (≤ 20 Pieces Run)</span>
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={(e) => setOnlyWishlist(e.target.checked)}
                  className="rounded text-aurelia-gold focus:ring-aurelia-gold w-4 h-4 accent-aurelia-gold"
                />
                <span>Private Wishlist ({wishlist.length})</span>
              </label>
            </div>

            {isMobileFilterOpen && (
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 rounded bg-aurelia-obsidian text-aurelia-gold font-bold text-xs uppercase tracking-widest"
              >
                Apply Filters & Close
              </button>
            )}
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-aurelia-border shadow-luxury p-12 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-aurelia-alabaster border border-aurelia-border flex items-center justify-center text-aurelia-gold mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-aurelia-obsidian mb-2">
                  No creations matched your criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                  Adjust your price threshold, clear your search keyword, or view our complete catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded bg-aurelia-obsidian text-aurelia-gold font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-black transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
