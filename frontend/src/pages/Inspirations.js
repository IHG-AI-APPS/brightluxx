import { cdnUrl } from '../config/cdn';
import React, { useEffect, useState, useRef } from 'react';
import { getInspirations } from '../api';
import { Sparkles, X, ZoomIn } from 'lucide-react';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const GlowCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`blx-scroll-glow ${inView ? 'in-view' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Detail Modal Component
const InspirationModal = ({ item, onClose }) => {
  if (!item) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      data-testid="inspiration-modal"
    >
      <div 
        className="bg-[var(--blx-bg-raised)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <CdnImage
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover"
            w={800}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
            data-testid="close-modal-btn"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--blx-bg-raised)] to-transparent h-20" />
        </div>
        
        {/* Content */}
        <div className="p-6 sm:p-8">
          <span className="category-badge mb-3 inline-block">{item.category}</span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wider mb-4">{item.title}</h2>
          <p className="text-sm text-[var(--blx-text-2)] leading-relaxed tracking-wider">
            {item.description}
          </p>
        </div>
      </div>
    </div>
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
    <div className="py-20" data-testid="inspirations-page">
      <SEO
        title="LED Display Inspirations"
        description="Get inspired by stunning LED display installations — immersive retail, stadium screens, architectural media facades, interactive floors, transparent storefronts, and more."
        path="/inspirations"
        image={cdnUrl('insp_retail.webp')}
      />      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 data-testid="inspirations-page-title">Inspirations</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider">Discover how LED transforms spaces across industries.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-[0.6875rem] font-bold rounded-full border tracking-widest transition-colors duration-200 ${
                activeCategory === cat.value
                  ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]'
                  : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
              }`}
              data-testid="inspirations-filter-button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : inspirations.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
            <h3 className="text-base font-bold mb-2">No inspirations found</h3>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider">Try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="inspirations-gallery">
            {inspirations.map((item) => (
              <GlowCard key={item._id || item.id} className="h-full">
                <div 
                  className="inspiration-card cursor-pointer h-full flex flex-col" 
                  data-testid="inspiration-card"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden rounded-t-[var(--blx-radius-lg)]">
                    <CdnImage
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      w={600}
                    />
                    {/* Hover overlay with zoom icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <ZoomIn size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Card content - always visible */}
                  <div className="p-4 flex-1 flex flex-col bg-[var(--blx-panel)] rounded-b-[var(--blx-radius-lg)]">
                    <span className="category-badge mb-2 self-start">{item.category}</span>
                    <h3 className="text-sm font-bold text-white mb-2 tracking-wider">{item.title}</h3>
                    <p className="text-[0.6875rem] text-[var(--blx-text-2)] line-clamp-2 tracking-wider flex-1">{item.description}</p>
                    <span className="text-[0.625rem] text-[var(--blx-gold-3)] font-bold tracking-wider mt-3 hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <InspirationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </div>
  );
};

export default Inspirations;
