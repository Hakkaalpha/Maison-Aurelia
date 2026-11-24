import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Star, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(7000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyDeals, setOnlyDeals] = useState<boolean>(false);
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL parameters
  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    } else {
      setSelectedCategory('All');
    }

    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }

    const filter = searchParams.get('filter');
    if (filter === 'deals') {
      setOnlyDeals(true);
    } else if (filter === 'wishlist') {
      setOnlyWishlist(true);
    }
  }, [categoryName, searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Price filter
      if (product.price > priceMax) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      // Deals filter
      if (onlyDeals && !product.discountPercent && !product.badge) {
        return false;
      }

      // Wishlist filter
      if (onlyWishlist && !wishlist.includes(product.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, priceMax, minRating, onlyDeals, onlyWishlist, sortBy, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceMax(7000);
    setMinRating(0);
    setOnlyDeals(false);
    setOnlyWishlist(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="w-full bg-[#F8F9FE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-800">Shop Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-indigo-600">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {onlyWishlist
                  ? 'Your Wishlist'
                  : selectedCategory !== 'All'
                  ? selectedCategory
                  : 'All Tactical Desk Gear'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} of {PRODUCTS.length} precision engineered products
              </p>
            </div>

            {/* Quick Sort & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* Filter Sidebar (Desktop & Mobile Drawer) */}
          {/* ========================================================================= */}
          <aside
            className={`lg:block bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6 ${
              isMobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto lg:relative lg:inset-auto' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-slate-900">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Filter Products</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Reset
              </button>
            </div>

            {/* In-Page Search Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-[#F8F9FE]'
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-[11px] text-slate-400">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-[#F8F9FE]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-extrabold text-indigo-600">
                  ₹{priceMax.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="7000"
                step="250"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>₹500</span>
                <span>₹3,500</span>
                <span>₹7,000+</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                      minRating === rating
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {rating === 0 ? (
                      'Any'
                    ) : (
                      <>
                        <span>{rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 accent-indigo-600"
                />
                <span>Special Offers & Discounts Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={(e) => setOnlyWishlist(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 accent-indigo-600"
                />
                <span>My Wishlist ({wishlist.length})</span>
              </label>
            </div>

            {/* Mobile Close Button */}
            {isMobileFilterOpen && (
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Apply Filters & Close
              </button>
            )}
          </aside>

          {/* ========================================================================= */}
          {/* Products Grid */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  No products matched your criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
                  Try widening your price range, clearing your search query, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
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
