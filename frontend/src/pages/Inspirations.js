import React, { useEffect, useState, useRef } from 'react';
import { getInspirations } from '../api';
import { Sparkles } from 'lucide-react';
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
        image="/api/cdn/insp_retail.webp"
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
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5" data-testid="inspirations-gallery">
            {inspirations.map((item, index) => (
              <GlowCard key={item._id} className="break-inside-avoid">
                <div className="inspiration-card" data-testid="inspiration-card">
                  <CdnImage
                    src={item.image_url}
                    alt={item.title}
                    className={`w-full rounded-[var(--blx-radius-lg)] ${
                      index % 3 === 0 ? 'h-72' : index % 3 === 1 ? 'h-56' : 'h-64'
                    }`}
                    w={600}
                  />
                  <div className="card-overlay rounded-[var(--blx-radius-lg)]">
                    <div>
                      <span className="category-badge mb-2">{item.category}</span>
                      <h3 className="text-sm font-bold text-white mt-2">{item.title}</h3>
                      <p className="text-[0.6875rem] text-gray-300 mt-1 tracking-wider" style={{textTransform: 'none'}}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspirations;
