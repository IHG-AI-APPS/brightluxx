import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { getUpdates } from '../api';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await getUpdates({ limit: 20 });
        setUpdates(res.data.updates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching updates:', error);
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="py-20" data-testid="updates-hub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4" data-testid="hub-title">
            What's <span className="text-gradient">New</span>
          </h1>
          <p className="text-lg text-[var(--blx-text-2)]">
            Latest ISE launches, technology updates, and industry insights.
          </p>
        </div>

        {/* Updates Grid */}
        {updates.length === 0 ? (
          <div className="text-center py-12 text-[var(--blx-text-2)]">
            No updates available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="updates-grid">
            {updates.map((update) => (
              <Link
                key={update._id}
                to={`/updates/${update.slug}`}
                className="tech-card group"
                data-testid={`update-card-${update.slug}`}
              >
                <img
                  src={update.heroImage}
                  alt={update.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)]">
                      {update.category}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--blx-muted)]">
                      <Calendar size={12} />
                      <span>{new Date(update.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4 line-clamp-3">{update.excerpt}</p>
                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>Read More</span>
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

export default Updates;