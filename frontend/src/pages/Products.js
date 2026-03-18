import { cdnUrl } from '../config/cdn';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Monitor, ChevronDown, Grid3X3, LayoutList, Zap, ArrowRight, X } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Hero background image
const HERO_IMAGE = 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc3Mzc3NzgyOHww&ixlib=rb-4.1.0&q=85';

// Major categories for quick filter header
const MAJOR_CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'cob-microled', label: 'COB MicroLED' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'flexible', label: 'Creative' },
  { value: 'all-in-one', label: 'All-in-One' },
  { value: 'digital-signage', label: 'Signage' },
];

// Full categories list for sidebar
const CATEGORIES = [
  { value: '', label: 'All Products', count: 90 },
  { value: 'cob-microled', label: 'COB MicroLED' },
  { value: 'mip', label: 'MiP' },
  { value: 'indoor', label: 'Fine Pitch Indoor' },
  { value: 'all-in-one', label: 'All-in-One' },
  { value: 'cinema-led', label: 'Cinema LED' },
  { value: 'dvled', label: 'DVLED Cinema' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'flexible', label: 'Flexible / Creative' },
  { value: 'custom-shapes', label: 'Custom Shapes' },
  { value: 'sphere', label: 'LED Sphere' },
  { value: 'naked-eye-3d', label: 'Naked-Eye 3D' },
  { value: 'ceiling-led', label: 'Ceiling / Sky Screen' },
  { value: 'digital-signage', label: 'Digital Signage' },
  { value: 'smart-tv', label: 'Smart TVs' },
  { value: 'ready-made', label: 'Ready-Made' },
  { value: 'interactive', label: 'Interactive Floor' },
  { value: 'virtual-production', label: 'Virtual Production' },
  { value: 'poster-totem', label: 'LED Poster / Totem' },
  { value: 'shelf-edge', label: 'Shelf Edge' },
  { value: 'road-signal', label: 'Road Signals' },
  { value: 'accessories', label: 'Accessories' },
];

/* Minimal Product Card */
const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group relative block overflow-hidden rounded-2xl aspect-[4/5]"
        data-testid="products-product-card"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {product.image_url ? (
            <CdnImage 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full" 
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              w={500} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-transparent">
              <Monitor size={48} className="text-cyan-500/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Code Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold backdrop-blur-md rounded-lg">
            {product.product_code}
          </span>
        </div>

        {/* Content - Bottom Centered */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end p-5 text-center">
          <h3 
            className="text-sm font-semibold tracking-wide mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2"
            style={{ color: '#ffffff' }}
          >
            {product.name}
          </h3>

          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {product.pixel_pitch && (
              <span 
                className="text-[10px] px-2.5 py-1 rounded-full font-mono backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {product.pixel_pitch}
              </span>
            )}
            {product.brightness && (
              <span 
                className="text-[10px] px-2.5 py-1 rounded-full font-mono backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {product.brightness}
              </span>
            )}
          </div>

          <div 
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            style={{ color: '#22d3ee' }}
          >
            <span>View Details</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
};

const FilterAccordion = ({ title, children, defaultOpen = false, isDark }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border-b ${isDark ? 'border-white/5' : 'border-neutral-200'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-neutral-500'}`}>{title}</span>
        <ChevronDown size={14} className={`${isDark ? 'text-gray-500' : 'text-neutral-400'} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Products = () => {
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const setActiveCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        const res = await getProducts(params);
        const data = res?.data || res;
        setProducts(Array.isArray(data) ? data : data?.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchQuery]);

  const activeCategoryLabel = CATEGORIES.find(c => c.value === activeCategory)?.label || 'All Products';

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(activeCategory ? [{ name: activeCategoryLabel, path: null }] : [])
  ];

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="products-page">
      <SEO
        title={activeCategory ? `${activeCategoryLabel} LED Displays | Supplier Dubai` : "LED Display Products | Supplier Dubai UAE"}
        description="Browse 90+ LED display solutions from Dubai's trusted supplier. COB MicroLED, transparent, outdoor, indoor displays."
        path="/products"
        image={cdnUrl('cob_microled_1.webp')}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section with Background Image */}
      <section className="relative h-[45vh] min-h-[300px] max-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="LED Display Technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs 
              items={breadcrumbs} 
              className="text-white/60 mb-4" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2"
                style={{ color: '#ffffff' }}
                data-testid="products-page-title"
              >
                LED Display{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Products
                </span>
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-lg">
                90+ professional LED solutions for every application.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter Header Bar */}
      <section className={`sticky top-16 z-40 ${isDark ? 'bg-[#0A0A0D]/95' : 'bg-white/95'} backdrop-blur-lg border-b ${borderColor}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
            {/* Search Input */}
            <div className="relative flex-shrink-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-40 md:w-48 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-full pl-10 pr-4 py-2 outline-none focus:border-cyan-500 transition-colors text-sm`}
                data-testid="products-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-neutral-200'} flex-shrink-0`} />

            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {MAJOR_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
                    activeCategory === cat.value
                      ? 'bg-cyan-500 text-black'
                      : (isDark 
                          ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 border border-neutral-200')
                  }`}
                  data-testid={`products-quick-filter-${cat.value || 'all'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="ml-auto flex-shrink-0 hidden sm:flex items-center gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : (isDark ? 'text-gray-500 hover:text-white' : 'text-neutral-500 hover:text-neutral-900')}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : (isDark ? 'text-gray-500 hover:text-white' : 'text-neutral-500 hover:text-neutral-900')}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="flex gap-8 lg:gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-36 space-y-6">
              {/* All Categories */}
              <FilterAccordion title="All Categories" defaultOpen={true} isDark={isDark}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-all rounded ${
                      activeCategory === cat.value
                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500'
                        : (isDark ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100')
                    }`}
                    data-testid={`products-filter-${cat.value || 'all'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </FilterAccordion>

              {/* Quick Links */}
              <div className={`pt-6 border-t ${borderColor}`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${textSecondary} mb-4`}>Tools</h4>
                <div className="space-y-2">
                  <Link to="/calculator" className={`flex items-center gap-2 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-1.5`}>
                    <Zap size={12} /> Screen Calculator
                  </Link>
                  <Link to="/led-calculator" className={`flex items-center gap-2 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-1.5`}>
                    <Zap size={12} /> Module Calculator
                  </Link>
                  <Link to="/estimator" className={`flex items-center gap-2 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-1.5`}>
                    <Zap size={12} /> Budget Estimator
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className={`flex items-center justify-between mb-6`}>
              <div className="flex items-center gap-3">
                <h2 className={`text-base font-semibold uppercase tracking-wide ${textPrimary}`}>{activeCategoryLabel}</h2>
                <span className={`text-xs ${textSecondary}`}>
                  {products.length} products
                </span>
              </div>
              
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'} border rounded-lg text-xs uppercase tracking-wider`}
              >
                <SlidersHorizontal size={14} /> More
              </button>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden overflow-hidden mb-6"
                >
                  <div className={`${isDark ? 'bg-[#0A0A0D] border-white/5' : 'bg-white border-neutral-200'} border rounded-lg p-4`}>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.slice(0, 15).map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => { setActiveCategory(cat.value); setShowFilters(false); }}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                            activeCategory === cat.value
                              ? 'bg-cyan-500 text-black'
                              : (isDark ? 'bg-transparent text-gray-500 border border-white/10 hover:border-cyan-500/50' : 'bg-transparent text-neutral-600 border border-neutral-200 hover:border-cyan-500/50')
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <SlidersHorizontal size={28} className="text-gray-600" />
                </div>
                <h3 className={`text-base font-semibold uppercase tracking-wide mb-2 ${textPrimary}`}>No Products Found</h3>
                <p className={`text-sm ${textSecondary} mb-6`}>Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setActiveCategory(''); setSearchQuery(''); }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2.5 rounded-full transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {products.map((product, index) => (
                  <ProductCard key={product._id || product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
