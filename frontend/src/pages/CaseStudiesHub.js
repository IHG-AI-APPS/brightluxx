import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCaseStudies } from '../api';

const CaseStudiesHub = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const params = filter !== 'all' ? { category: filter } : {};
        const res = await getCaseStudies(params);
        setCaseStudies(res.data.caseStudies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [filter]);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'retail', label: 'Retail' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'events', label: 'Events' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="py-20" data-testid="case-studies-hub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4" data-testid="hub-title">
            <span className="text-gradient">Case Studies</span> & Success Stories
          </h1>
          <p className="text-lg text-[var(--blx-text-2)]">
            Real UAE projects. Proven results. See our installations across Dubai and beyond.
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

        {/* Case Studies Grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-12 text-[var(--blx-text-2)]">
            No case studies found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="case-studies-grid">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy._id}
                to={`/case-studies/${caseStudy.slug}`}
                className="tech-card group"
                data-testid={`case-card-${caseStudy.slug}`}
              >
                <img
                  src={caseStudy.heroImage}
                  alt={caseStudy.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] mb-2">
                    {caseStudy.category}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                  <p className="text-sm text-[var(--blx-muted)] mb-3">{caseStudy.client}</p>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4">{caseStudy.location}</p>
                  
                  {/* Metrics Preview */}
                  {caseStudy.metrics.slice(0, 2).length > 0 && (
                    <div className="space-y-2 mb-4 text-sm">
                      {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-[var(--blx-muted)]">{metric.label}:</span>
                          <span className="text-[var(--blx-text)] font-semibold tabular-nums">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>View Project</span>
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

export default CaseStudiesHub;