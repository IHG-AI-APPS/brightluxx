import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import { getCaseStudy } from '../api';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await getCaseStudy(slug);
        setCaseStudy(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching case study:', error);
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-[var(--blx-accent)] hover:underline">
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" data-testid="case-study-detail">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] mb-8"
          data-testid="back-link"
        >
          <ArrowLeft size={18} />
          <span>Back to Case Studies</span>
        </Link>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-[500px] object-cover"
            data-testid="hero-image"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] mb-3">
              {caseStudy.category}
            </div>
            <h1 className="text-4xl font-bold font-display mb-4" data-testid="case-title">
              {caseStudy.title}
            </h1>

            {/* Client Info */}
            <div className="flex flex-wrap gap-6 mb-8 text-[var(--blx-text-2)]">
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <span>{caseStudy.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{caseStudy.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-[var(--blx-text-2)] leading-relaxed text-lg">
                {caseStudy.description}
              </p>
            </div>

            {/* Gallery */}
            {caseStudy.gallery?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${caseStudy.title} ${idx + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Metrics */}
            {caseStudy.metrics?.length > 0 && (
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Project Metrics</h3>
                <div className="space-y-4">
                  {caseStudy.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="text-sm text-[var(--blx-muted)] mb-1">{metric.label}</div>
                      <div className="text-2xl font-bold text-[var(--blx-accent)] tabular-nums">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-[var(--blx-accent)] to-[var(--blx-accent-2)] rounded-xl p-6 text-[var(--blx-bg)]">
              <h3 className="text-xl font-semibold mb-2">Need a Similar Solution?</h3>
              <p className="text-sm mb-4 opacity-90">
                Let's discuss your project requirements.
              </p>
              <Link
                to="/contact"
                className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-center transition-colors"
                data-testid="cta-contact"
              >
                Get in Touch
              </Link>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want a similar LED display solution')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-center transition-colors mt-3"
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

export default CaseStudyDetail;