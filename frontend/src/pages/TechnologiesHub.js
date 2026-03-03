import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getTechnologies } from '../api';

const TechnologiesHub = () => {
  const [technologies, setTechnologies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const params = filter !== 'all' ? { category: filter } : {};
        const res = await getTechnologies(params);
        setTechnologies(res.data.technologies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technologies:', error);
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, [filter]);

  const categories = [
    { value: 'all', label: 'All Technologies' },
    { value: 'micro-led', label: 'MicroLED' },
    { value: 'outdoor', label: 'Outdoor DOOH' },
    { value: 'creative', label: 'Creative Displays' },
    { value: 'professional', label: 'Professional' },
    { value: 'rental', label: 'Rental & Staging' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="py-20" data-testid="technologies-hub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4" data-testid="hub-title">
            LED Display <span className="text-gradient">Technologies</span>
          </h1>
          <p className="text-lg text-[var(--blx-text-2)]">
            From ultra-fine pitch MicroLED to high-brightness outdoor displays. Explore our complete range.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12" data-testid="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === cat.value
                  ? 'bg-[var(--blx-accent)] text-[var(--blx-bg)]'
                  : 'bg-[var(--blx-panel)] border border-[var(--blx-border)] hover:border-[var(--blx-accent)]'
              }`}
              data-testid={`filter-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        {technologies.length === 0 ? (
          <div className="text-center py-12 text-[var(--blx-text-2)]">
            No technologies found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="technologies-grid">
            {technologies.map((tech) => (
              <Link
                key={tech._id}
                to={`/technologies/${tech.slug}`}
                className="tech-card group"
                data-testid={`tech-card-${tech.slug}`}
              >
                <img
                  src={tech.heroMedia.url}
                  alt={tech.heroMedia.alt}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] mb-2">
                    {tech.category.replace('-', ' ')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4">{tech.tagline}</p>
                  
                  {/* Key Specs Preview */}
                  {tech.keySpecs.slice(0, 3).length > 0 && (
                    <div className="space-y-2 mb-4 text-sm">
                      {tech.keySpecs.slice(0, 3).map((spec, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-[var(--blx-muted)]">{spec.label}:</span>
                          <span className="text-[var(--blx-text-2)] font-medium tabular-nums">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologiesHub;