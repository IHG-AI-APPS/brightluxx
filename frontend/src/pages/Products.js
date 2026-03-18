import { cdnUrl } from '../config/cdn';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Monitor, ChevronDown, Grid3X3, LayoutList, Zap, ArrowRight } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const useInView = (ref, threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const MotionCard = ({ children, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

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

const ProductCard = ({ product, index, isDark }) => {
  const bgCard = isDark ? 'bg-[#0A0A0D]' : 'bg-white';
  const borderCard = isDark ? 'border-white/5' : 'border-neutral-200';
  const textName = isDark ? 'text-white' : 'text-neutral-900';
  const textDesc = isDark ? 'text-gray-500' : 'text-neutral-500';
  const gradientOverlay = isDark ? 'from-[#0A0A0D]' : 'from-white';
  const hoverOverlay = isDark ? 'bg-[#050508]/90' : 'bg-white/95';
  const bgPill = isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200';

  return (
  <MotionCard index={index}>
    <Link
      to={`/products/${product.slug}`}
      className={`group block ${bgCard} border ${borderCard} overflow-hidden relative hover:border-cyan-500/30 transition-all duration-500`}
      data-testid="products-product-card"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image_url ? (
          <>
            <CdnImage 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full" 
              imgClassName="group-hover:scale-110 transition-transform duration-700" 
              w={500} 
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} via-transparent to-transparent opacity-60`} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/5 to-transparent">
            <Monitor size={48} className="text-cyan-500/30" />
          </div>
        )}
        
        {/* Product Code Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold backdrop-blur-sm">
            {product.product_code}
          </span>
        </div>

        {/* Hover Overlay - Quick Specs */}
        <div className={`absolute inset-0 ${hoverOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6`}>
          <div className="text-center">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {product.pixel_pitch && (
                <div className={`${bgPill} border p-3`}>
                  <div className={`text-[9px] ${textDesc} uppercase tracking-widest mb-1`}>Pitch</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">{product.pixel_pitch}</div>
                </div>
              )}
              {product.brightness && (
                <div className={`${bgPill} border p-3`}>
                  <div className={`text-[9px] ${textDesc} uppercase tracking-widest mb-1`}>Brightness</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">{product.brightness}</div>
                </div>
              )}
            </div>
            <span className="inline-flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-widest font-bold">
              View Details <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wide ${textName} group-hover:text-cyan-400 transition-colors line-clamp-1`}>
          {product.name}
        </h3>
        {product.tagline && (
          <p className={`text-[11px] ${textDesc} line-clamp-2 leading-relaxed tracking-wide`}>
            {product.tagline}
          </p>
        )}
        
        {/* Spec Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {product.pixel_pitch && (
            <span className={`text-[10px] px-2 py-1 ${bgPill} border ${textDesc} font-mono`}>
              {product.pixel_pitch}
            </span>
          )}
          {product.brightness && (
            <span className={`text-[10px] px-2 py-1 ${bgPill} border ${textDesc} font-mono`}>
              {product.brightness}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  </MotionCard>
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
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  // Theme-aware styles
  const bgMain = isDark ? 'bg-[#050508]' : 'bg-slate-50';
  const bgCard = isDark ? 'bg-[#0B0B0E]' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-neutral-600';
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

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(activeCategory ? [{ name: activeCategoryLabel, path: null }] : [])
  ];

  return (
    <div className={`min-h-screen ${bgMain} transition-colors duration-300`} data-testid="products-page">
      <SEO
        title={activeCategory ? `${activeCategoryLabel} LED Displays | Supplier Dubai` : "LED Display Products | Supplier Dubai UAE"}
        description="Browse 90+ LED display solutions from Dubai's trusted supplier. COB MicroLED, transparent, outdoor, indoor displays. Local stock, same-day delivery. Get instant quotes."
        path="/products"
        image={cdnUrl('cob_microled_1.webp')}
        keywords="LED display Dubai, LED screen supplier UAE, video wall Dubai, indoor LED screen, outdoor LED display, transparent LED, MicroLED, COB LED"
        breadcrumbs={breadcrumbs}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Brightluxx LED Display Products",
          "description": "Complete catalog of LED display solutions for UAE and GCC",
          "url": `${BASE_URL}/products`,
          "numberOfItems": products.length,
          "itemListElement": products.slice(0, 20).map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "url": `${BASE_URL}/products/${p.slug}`,
            "image": resolveImage(p.image_url),
          }))
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-24">
        <Breadcrumbs items={breadcrumbs} className={textSecondary} />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 ${textPrimary}`} data-testid="products-page-title">
              LED DISPLAY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                PRODUCTS
              </span>
            </h1>
            <p className={textSecondary + " text-base md:text-lg max-w-xl mx-auto"}>
              Explore our complete range of professional LED display technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div className="flex gap-8 lg:gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-600' : 'text-neutral-400'}`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${isDark ? 'bg-white/5 border-white/20 text-white placeholder:text-gray-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border-b focus:border-cyan-500 rounded-none pl-11 pr-4 py-3 outline-none transition-colors text-sm tracking-wide`}
                  data-testid="products-search-input"
                />
              </div>

              {/* Category Filter */}
              <FilterAccordion title="Categories" defaultOpen={true} isDark={isDark}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-all ${
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
                <h4 className={`text-xs font-bold uppercase tracking-widest ${textSecondary} mb-4`}>Specifier Tools</h4>
                <div className="space-y-2">
                  <Link to="/calculator" className={`flex items-center gap-3 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-2`}>
                    <Zap size={14} /> Screen Calculator
                  </Link>
                  <Link to="/led-calculator" className={`flex items-center gap-3 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-2`}>
                    <Zap size={14} /> Module Calculator
                  </Link>
                  <Link to="/estimator" className={`flex items-center gap-3 text-xs ${textSecondary} hover:text-cyan-400 transition-colors py-2`}>
                    <Zap size={14} /> Budget Estimator
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className={`flex items-center justify-between mb-8 pb-6 border-b ${borderColor}`}>
              <div className="flex items-center gap-4">
                <h2 className={`text-lg font-bold uppercase tracking-wide ${textPrimary}`}>{activeCategoryLabel}</h2>
                <span className={`text-xs tracking-wider ${textSecondary}`}>
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`lg:hidden flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'} border text-xs uppercase tracking-wider`}
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
                
                {/* View Toggle */}
                <div className={`hidden sm:flex items-center gap-1 p-1 ${isDark ? 'bg-white/5' : 'bg-neutral-100'}`}>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : (isDark ? 'text-gray-500 hover:text-white' : 'text-neutral-500 hover:text-neutral-900')}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : (isDark ? 'text-gray-500 hover:text-white' : 'text-neutral-500 hover:text-neutral-900')}`}
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
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
                  <div className={`${isDark ? 'bg-[#0A0A0D] border-white/5' : 'bg-white border-neutral-200'} border p-4 space-y-4`}>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border px-4 py-3 outline-none text-sm`}
                    />
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => { setActiveCategory(cat.value); setShowFilters(false); }}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
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
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <SlidersHorizontal size={32} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">No Products Found</h3>
                <p className="text-sm text-gray-500 tracking-wide mb-6">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setActiveCategory(''); setSearchQuery(''); }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-3 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product, index) => (
                  <ProductCard key={product._id || product.id} product={product} index={index} isDark={isDark} />
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
