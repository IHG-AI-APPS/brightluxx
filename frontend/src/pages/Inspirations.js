import React, { useEffect, useState } from 'react';
import { getInspirations } from '../api';
import { Sparkles } from 'lucide-react';

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
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display mb-2" data-testid="inspirations-page-title">Inspirations</h1>
          <p className="text-sm text-[var(--blx-text-2)]">Discover how LED transforms spaces across industries.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors duration-200 ${
                activeCategory === cat.value
                  ? 'bg-[var(--blx-gold-3)] text-[#0A0A0A] border-[var(--blx-gold-3)]'
                  : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
              }`}
              data-testid="inspirations-filter-button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : inspirations.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No inspirations found</h3>
            <p className="text-sm text-[var(--blx-text-2)]">Try a different category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5" data-testid="inspirations-gallery">
            {inspirations.map((item, index) => (
              <div
                key={item._id}
                className="inspiration-card break-inside-avoid"
                data-testid="inspiration-card"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className={`w-full object-cover rounded-[var(--blx-radius-lg)] ${
                    index % 3 === 0 ? 'h-72' : index % 3 === 1 ? 'h-56' : 'h-64'
                  }`}
                />
                <div className="card-overlay rounded-[var(--blx-radius-lg)]">
                  <div>
                    <span className="category-badge mb-2">{item.category}</span>
                    <h3 className="font-semibold text-white mt-2">{item.title}</h3>
                    <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspirations;
