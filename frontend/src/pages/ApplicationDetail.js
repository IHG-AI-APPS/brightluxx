import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getApplication } from '../api';

const ApplicationDetail = () => {
  const { slug } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await getApplication(slug);
        setApplication(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application:', error);
        setLoading(false);
      }
    };

    fetchApplication();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
        <Link to="/applications" className="text-[var(--blx-accent)] hover:underline">
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" data-testid="application-detail">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] mb-8"
          data-testid="back-link"
        >
          <ArrowLeft size={18} />
          <span>Back to Applications</span>
        </Link>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={application.heroImage}
            alt={application.name}
            className="w-full h-[400px] object-cover"
            data-testid="hero-image"
          />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4" data-testid="app-name">
            {application.name}
          </h1>
          <p className="text-xl text-[var(--blx-text-2)] mb-8" data-testid="app-tagline">
            {application.tagline}
          </p>

          {/* Description */}
          <div className="mb-8">
            <p className="text-[var(--blx-text-2)] leading-relaxed text-lg">
              {application.description}
            </p>
          </div>

          {/* Use Cases */}
          {application.useCases?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
              <ul className="space-y-3">
                {application.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[var(--blx-accent)] mt-1">✓</span>
                    <span className="text-[var(--blx-text-2)]">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {application.benefits?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {application.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[var(--blx-text-2)]">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-10 text-center relative blx-noise">
            <h3 className="text-2xl font-semibold mb-4 text-[var(--blx-text)]">Ready to Get Started?</h3>
            <p className="text-lg mb-8 text-[var(--blx-text-2)] font-light">
              Get expert consultation for your {application.name.toLowerCase()} project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-gold px-8 py-4"
                data-testid="cta-contact"
              >
                Get Quote
              </Link>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent(`Hi, I'm interested in LED displays for ${application.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass px-8 py-4"
                data-testid="cta-whatsapp"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;