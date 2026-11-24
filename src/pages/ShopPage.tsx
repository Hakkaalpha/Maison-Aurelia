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
    <div className="w-full bg-[#FAFAFA] min-h-screen py-10 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusivity Seal Banner */}
        <div className="mb-6 rounded-lg bg-aurelia-obsidian border border-aurelia-gold/30 px-4 py-2 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-aurelia-gold" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-aurelia-gold">
              EXCLUSIVE TO AURELIAPRIVE.COM • NEVER LISTED ON THIRD-PARTY APPS
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 text-[10px] uppercase tracking-widest font-mono">
            Vault Status: Active
          </span>
        </div>

        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 mb-2">
            <Link to="/" className="hover:text-aurelia-gold transition-colors">Atelier Home</Link>
            <span>/</span>
            <span className="text-aurelia-obsidian font-bold">Private Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-aurelia-gold font-bold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif font-bold text-3xl sm:text-5xl text-aurelia-obsidian tracking-tight">
                {onlyWishlist
                  ? 'Your Private Wishlist'
                  : selectedCategory !== 'All'
                  ? selectedCategory
                  : 'All Atelier Creations'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredProducts.length} of {PRODUCTS.length} limited serialized collector pieces
              </p>
            </div>

            {/* Quick Sort & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-aurelia-border text-xs font-bold text-aurelia-obsidian shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-aurelia-gold" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-aurelia-border shadow-sm text-xs font-semibold">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-aurelia-obsidian focus:outline-none cursor-pointer"
                >
                  <option value="featured">Vault Curated</option>
                  <option value="rarity">Rarity (Smallest Edition First)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filter Sidebar */}
          <aside
            className={`lg:block bg-white rounded-xl border border-aurelia-border shadow-luxury p-6 space-y-6 ${
              isMobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto lg:relative lg:inset-auto' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-aurelia-borderSubtle">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-aurelia-obsidian">
                <Filter className="w-4 h-4 text-aurelia-gold" />
                <span>Atelier Filter</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-wider font-bold text-aurelia-gold hover:text-aurelia-goldDark"
              >
                Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Search Creations
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tourbillon, calfskin, marble..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs focus:outline-none focus:border-aurelia-gold"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Discipline
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-aurelia-goldLight text-aurelia-goldDark font-bold border border-aurelia-goldBorder'
                      : 'text-stone-600 hover:bg-aurelia-alabaster'
                  }`}
                >
                  <span>All 20 Pieces</span>
                  <span className="text-[10px] text-stone-400 font-mono">{PRODUCTS.length}</span>
                </button>

                {MAISON_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-aurelia-goldLight text-aurelia-goldDark font-bold border border-aurelia-goldBorder'
                        : 'text-stone-600 hover:bg-aurelia-alabaster'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Allocation Cap
                </label>
                <span className="text-xs font-serif font-bold text-aurelia-obsidian">
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
                className="w-full accent-aurelia-gold cursor-pointer"
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
