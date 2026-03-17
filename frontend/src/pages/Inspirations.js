import React, { useEffect, useState, useRef } from 'react';
import { getInspirations } from '../api';
import { Sparkles, X, ZoomIn, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';
import { cdnUrl } from '../config/cdn';

const useInView = (ref, threshold = 0.15) => {
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

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-lg overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

// Detail Modal Component
const InspirationModal = ({ item, onClose }) => {
  if (!item) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-testid="inspiration-modal"
      >
        <motion.div 
          className="bg-[#0A0A0D] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <CdnImage
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
              w={900}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              data-testid="close-modal-btn"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0D] to-transparent h-32" />
          </div>
          
          {/* Content */}
          <div className="p-8">
            <span className="inline-block bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-wider font-bold mb-4">
              {item.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-5">{item.title}</h2>
            <p className="text-gray-400 leading-relaxed tracking-wide normal-case">
              {item.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'retail', label: 'Retail' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'events', label: 'Events' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'art', label: 'Art & Culture' },
];

const Inspirations = () => {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchInspirations = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        const res = await getInspirations(params);
        setInspirations(res.data.inspirations);
      } catch (error) {
        console.error('Error fetching inspirations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInspirations();
  }, [activeCategory]);

  return (
    <div className="bg-[#050508]" data-testid="inspirations-page">
      <SEO
        title="LED Display Inspirations — Design Ideas & Visual Gallery | Brightluxx"
        description="Get inspired by stunning LED display installations — immersive retail, stadium screens, architectural media facades, interactive floors, transparent storefronts, and more."
        path="/inspirations"
        image={cdnUrl('insp_retail.webp')}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Gallery</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95]" data-testid="inspirations-page-title">
              Design
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Inspirations
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl tracking-wide leading-relaxed">
              Discover how LED displays transform spaces across industries worldwide.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                    activeCategory === cat.value
                      ? 'bg-cyan-500 text-black'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:border-cyan-500/30 hover:text-white'
                  }`}
                  data-testid="inspirations-filter-button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : inspirations.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">No inspirations found</h3>
              <p className="text-gray-500 tracking-wide">Try a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="inspirations-gallery">
              {inspirations.map((item, idx) => (
                <FadeInSection key={item._id || item.id} delay={idx % 6}>
                  <GlassCard 
                    className="cursor-pointer h-full group" 
                    data-testid="inspiration-card"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <CdnImage
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        w={600}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                          <ZoomIn size={24} className="text-cyan-400" />
                        </div>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-2 tracking-wide group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 tracking-wide leading-relaxed mb-4 normal-case">
                        {item.description}
                      </p>
                      <span className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase group-hover:gap-3 transition-all">
                        View Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </GlassCard>
                </FadeInSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <InspirationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Inspirations;
