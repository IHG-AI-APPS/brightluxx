import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getApplications } from '../api';

const ApplicationsHub = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getApplications();
        setApplications(res.data.applications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="py-20" data-testid="applications-hub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4" data-testid="hub-title">
            <span className="text-gradient">Applications</span> & Industries
          </h1>
          <p className="text-lg text-[var(--blx-text-2)]">
            From retail to corporate, outdoor to events. See where our LED displays make an impact.
          </p>
        </div>

        {/* Applications Grid */}
        {applications.length === 0 ? (
          <div className="text-center py-12 text-[var(--blx-text-2)]">
            No applications found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="applications-grid">
            {applications.map((app) => (
              <Link
                key={app._id}
                to={`/applications/${app.slug}`}
                className="tech-card group"
                data-testid={`app-card-${app.slug}`}
              >
                <img
                  src={app.heroImage}
                  alt={app.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{app.name}</h3>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4">{app.tagline}</p>
                  
                  {/* Use Cases Preview */}
                  {app.useCases.slice(0, 3).length > 0 && (
                    <ul className="space-y-2 mb-4 text-sm text-[var(--blx-text-2)]">
                      {app.useCases.slice(0, 3).map((useCase, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-[var(--blx-accent)]">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>Learn More</span>
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

export default ApplicationsHub;