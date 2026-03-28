import { cdnUrl } from '../config/cdn';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Monitor, ChevronDown, Grid3X3, LayoutList, Zap, ArrowRight, X, Cpu, Eye } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import TiltCard from '../components/TiltCard';

// Hero background image
const HERO_IMAGE = 'https://files.ihgbrands.com/brightluxx/site-images/opt_ext_00eecd7267f8.webp';

// Pixel Pitch Ranges - for viewing distance filtering
const PITCH_RANGES = [
  { value: '', label: 'All Pitches', description: 'Show all products' },
  { value: 'ultra-fine', label: '< 1.0mm', description: 'Control rooms, boardrooms', color: 'text-violet-400', viewing: '< 2m' },
  { value: 'fine', label: '1.0 - 2.0mm', description: 'Lobbies, retail displays', color: 'text-cyan-400', viewing: '2-4m' },
  { value: 'standard', label: '2.0 - 4.0mm', description: 'Showrooms, events', color: 'text-emerald-400', viewing: '4-8m' },
  { value: 'outdoor', label: '> 4.0mm', description: 'Outdoor, billboards', color: 'text-amber-400', viewing: '> 8m' },
];

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
  { value: 'art-immersive', label: 'Art & XR' },
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
  { value: 'art-immersive', label: 'Art & XR' },
];

/* Elegant Product Card with 3D Tilt Effect - Matches Solutions Page Style */
const ProductCard = ({ product, index }) => {
  // Extract pitch value for prominent display
  const pitchValue = product.pixel_pitch?.match(/P?\d+\.?\d*/i)?.[0] || product.pixel_pitch;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        tiltIntensity={8}
        scale={1.02}
        glareEnabled={true}
        glareMaxOpacity={0.12}
        className="rounded-2xl"
      >
        <Link
          to={`/products/${product.slug}`}
          className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
          data-testid="products-product-card"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {product.image_url ? (
              <CdnImage 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full" 
                imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                w={500} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-transparent">
                <Monitor size={48} className="text-cyan-500/30" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Hover glow */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Pixel Pitch Badge - Top Right (Floating) */}
          {product.pixel_pitch && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-cyan-500 text-black px-2.5 py-1 text-xs font-bold rounded-full shadow-lg shadow-cyan-500/30">
                {pitchValue}
              </span>
            </div>
          )}

          {/* Content - Centered at Bottom */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end p-5 text-center">
            {/* Icon Badge */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)' 
              }}
            >
              {product.category?.toLowerCase().includes('cob') || product.category?.toLowerCase().includes('micro') ? (
                <Cpu size={16} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
              ) : (
                <Monitor size={16} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
              )}
            </div>

            {/* Product Name */}
            <h3 
              className="text-sm font-semibold tracking-wide mb-1 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2"
              style={{ color: '#ffffff' }}
            >
              {product.name}
            </h3>

            {/* Brightness Spec */}
            {product.brightness && (
              <span className="text-[10px] text-amber-400/80 font-medium flex items-center gap-1 mb-3">
                <Zap size={10} />
                {product.brightness}
              </span>
            )}

            {/* View Details CTA - appears on hover */}
            <div 
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{ color: '#22d3ee' }}
            >
              <span>View Details</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Border on hover */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
        </Link>
      </TiltCard>
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
  const activeSub = searchParams.get('sub') || '';
  const activePitchRange = searchParams.get('pitch') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const setActiveCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.delete('sub');
    setSearchParams(params);
  };

  const setActiveSub = (sub) => {
    const params = new URLSearchParams(searchParams);
    if (sub) {
      params.set('sub', sub);
    } else {
      params.delete('sub');
    }
    setSearchParams(params);
  };

  const setActivePitchRange = (pitch) => {
    const params = new URLSearchParams(searchParams);
    if (pitch) {
      params.set('pitch', pitch);
    } else {
      params.delete('pitch');
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  // Sub-category label for breadcrumbs
  const SUB_LABELS = {
    'nft-gallery': 'NFT & Digital Art', 'immersive-experience': 'Immersive Museums',
    'virtual-production': 'Virtual Production', 'metaverse': 'Metaverse',
    'sculptural': 'Sculptural LED', 'public-art': 'Public Art', 'interactive': 'Interactive',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (activeSub) params.sub_category = activeSub;
        if (searchQuery) params.search = searchQuery;
        if (activePitchRange) params.pitch_range = activePitchRange;
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
  }, [activeCategory, activeSub, searchQuery, activePitchRange]);

  const activeCategoryLabel = CATEGORIES.find(c => c.value === activeCategory)?.label || 'All Products';

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(activeCategory ? [{ name: activeCategoryLabel, path: activeSub ? `/products?category=${activeCategory}` : null }] : []),
    ...(activeSub && SUB_LABELS[activeSub] ? [{ name: SUB_LABELS[activeSub], path: null }] : [])
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
          {/* Mobile: Search on top row */}
          <div className="flex md:hidden items-center gap-2 pt-3 pb-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full blx-search-input ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-full pr-10 py-2.5 outline-none focus:border-cyan-500 transition-colors text-sm`}
                data-testid="products-search-input-mobile"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills Row - scrollable on all devices */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {/* Desktop Search - hidden on mobile */}
            <div className="relative flex-shrink-0 hidden md:block">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-48 blx-search-input ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-full pr-4 py-2 outline-none focus:border-cyan-500 transition-colors text-sm`}
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

            {/* Divider - desktop only */}
            <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-neutral-200'} flex-shrink-0 hidden md:block`} />

            {/* Category Pills */}
            {MAJOR_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
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

            {/* View Toggle - desktop only */}
            <div className="ml-auto flex-shrink-0 hidden md:flex items-center gap-1">
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

      {/* Sub-category pills for Art & XR */}
      {activeCategory === 'art-immersive' && (
        <section className={`sticky top-[7.5rem] z-30 ${isDark ? 'bg-[#0A0A0D]/95' : 'bg-white/95'} backdrop-blur-lg border-b ${borderColor}`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
            <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
              {[
                { value: '', label: 'All Art & XR' },
                { value: 'nft-gallery', label: 'NFT & Digital Art' },
                { value: 'immersive-experience', label: 'Immersive Museums' },
                { value: 'virtual-production', label: 'Virtual Production' },
                { value: 'metaverse', label: 'Metaverse' },
                { value: 'sculptural', label: 'Sculptural LED' },
                { value: 'public-art', label: 'Public Art' },
                { value: 'interactive', label: 'Interactive' },
              ].map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setActiveSub(sub.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                    activeSub === sub.value
                      ? 'bg-purple-500 text-white'
                      : (isDark 
                          ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 border border-neutral-200')
                  }`}
                  data-testid={`products-sub-filter-${sub.value || 'all'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="flex gap-8 lg:gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-36 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin"
                 style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
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

              {/* Pixel Pitch Range Filter */}
              <FilterAccordion title="Pixel Pitch" defaultOpen={true} isDark={isDark}>
                <div className="space-y-1">
                  {PITCH_RANGES.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setActivePitchRange(range.value)}
                      className={`w-full text-left px-3 py-2.5 text-xs tracking-wide transition-all rounded group ${
                        activePitchRange === range.value
                          ? 'bg-cyan-500/10 border-l-2 border-cyan-500'
                          : (isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-100')
                      }`}
                      data-testid={`products-pitch-filter-${range.value || 'all'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={activePitchRange === range.value ? 'text-cyan-400' : (range.color || (isDark ? 'text-gray-400' : 'text-neutral-600'))}>
                          {range.label}
                        </span>
                        {range.viewing && (
                          <span className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-neutral-400'} flex items-center gap-1`}>
                            <Eye size={10} />
                            {range.viewing}
                          </span>
                        )}
                      </div>
                      {range.description && (
                        <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-600' : 'text-neutral-400'}`}>
                          {range.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
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
            <div className={`flex flex-wrap items-center justify-between gap-3 mb-6`}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className={`text-base font-semibold uppercase tracking-wide ${textPrimary}`}>{activeCategoryLabel}</h2>
                {activePitchRange && (
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
                    {PITCH_RANGES.find(r => r.value === activePitchRange)?.label}
                  </span>
                )}
                <span className={`text-xs ${textSecondary}`}>
                  {products.length} products
                </span>
                {(activeCategory || activePitchRange || searchQuery) && (
                  <button 
                    onClick={clearAllFilters}
                    className={`text-xs ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-neutral-500 hover:text-cyan-600'} flex items-center gap-1 transition-colors`}
                  >
                    <X size={12} /> Clear filters
                  </button>
                )}
              </div>
              
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'} border rounded-lg text-xs uppercase tracking-wider`}
              >
                <SlidersHorizontal size={14} /> Filters
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
                  <div className={`${isDark ? 'bg-[#0A0A0D] border-white/5' : 'bg-white border-neutral-200'} border rounded-lg p-4 space-y-4`}>
                    {/* Pixel Pitch Filter */}
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest ${textSecondary} mb-2`}>Pixel Pitch</h4>
                      <div className="flex flex-wrap gap-2">
                        {PITCH_RANGES.map((range) => (
                          <button
                            key={range.value}
                            onClick={() => { setActivePitchRange(range.value); }}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                              activePitchRange === range.value
                                ? 'bg-cyan-500 text-black'
                                : (isDark ? 'bg-transparent text-gray-500 border border-white/10 hover:border-cyan-500/50' : 'bg-transparent text-neutral-600 border border-neutral-200 hover:border-cyan-500/50')
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Categories */}
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest ${textSecondary} mb-2`}>Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.slice(0, 15).map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => { setActiveCategory(cat.value); }}
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
                  onClick={clearAllFilters}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2.5 rounded-full transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 lg:gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
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
