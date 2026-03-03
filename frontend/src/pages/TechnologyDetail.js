import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getTechnology } from '../api';

const TechnologyDetail = () => {
  const { slug } = useParams();
  const [technology, setTechnology] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        const res = await getTechnology(slug);
        setTechnology(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technology:', error);
        setLoading(false);
      }
    };

    fetchTechnology();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Technology Not Found</h1>
        <Link to="/technologies" className="text-[var(--blx-accent)] hover:underline">
          Back to Technologies
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" data-testid="technology-detail">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          to="/technologies"
          className="inline-flex items-center gap-2 text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] mb-8"
          data-testid="back-link"
        >
          <ArrowLeft size={18} />
          <span>Back to Technologies</span>
        </Link>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={technology.heroMedia.url}
            alt={technology.heroMedia.alt}
            className="w-full h-[400px] object-cover"
            data-testid="hero-image"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] mb-3">
              {technology.category.replace('-', ' ')}
            </div>
            <h1 className="text-4xl font-bold font-display mb-4" data-testid="tech-name">
              {technology.name}
            </h1>
            <p className="text-xl text-[var(--blx-text-2)] mb-8" data-testid="tech-tagline">
              {technology.tagline}
            </p>

            {/* Generated Content */}
            {technology.generatedContent?.summary && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-[var(--blx-text-2)] leading-relaxed">
                  {technology.generatedContent.summary}
                </p>
              </div>
            )}

            {/* UAE Benefits */}
            {technology.generatedContent?.uaeBenefits?.length > 0 && (
              <div className="mb-8 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">UAE Advantages</h2>
                <ul className="space-y-3">
                  {technology.generatedContent.uaeBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[var(--blx-accent)] mt-1">✓</span>
                      <span className="text-[var(--blx-text-2)]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {technology.gallery?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {technology.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Specifications */}
            {technology.keySpecs?.length > 0 && (
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <table className="w-full">
                  <tbody>
                    {technology.keySpecs.map((spec, idx) => (
                      <tr key={idx} className="border-b border-[var(--blx-border)] last:border-0">
                        <td className="py-3 text-sm text-[var(--blx-muted)] pr-2">{spec.label}</td>
                        <td className="py-3 text-sm text-[var(--blx-text)] font-medium tabular-nums text-right">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Applications */}
            {technology.generatedContent?.applications?.length > 0 && (
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Ideal Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {technology.generatedContent.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-[var(--blx-accent)] to-[var(--blx-accent-2)] rounded-xl p-6 text-[var(--blx-bg)]">
              <h3 className="text-xl font-semibold mb-2">Interested?</h3>
              <p className="text-sm mb-4 opacity-90">
                Get a detailed quote and consultation within 2 hours.
              </p>
              <Link
                to="/contact"
                className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-center transition-colors"
                data-testid="cta-get-quote"
              >
                Get Quote
              </Link>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent(`Hi, I'm interested in ${technology.name}`)}`}
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

export default TechnologyDetail;