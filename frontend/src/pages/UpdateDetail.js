import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getUpdate } from '../api';

const UpdateDetail = () => {
  const { slug } = useParams();
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const res = await getUpdate(slug);
        setUpdate(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching update:', error);
        setLoading(false);
      }
    };

    fetchUpdate();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Update Not Found</h1>
        <Link to="/updates" className="text-[var(--blx-accent)] hover:underline">
          Back to Updates
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12" data-testid="update-detail">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          to="/updates"
          className="inline-flex items-center gap-2 text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] mb-8"
          data-testid="back-link"
        >
          <ArrowLeft size={18} />
          <span>Back to Updates</span>
        </Link>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={update.heroImage}
            alt={update.title}
            className="w-full h-[400px] object-cover"
            data-testid="hero-image"
          />
        </div>

        {/* Content */}
        <article>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] px-3 py-1 bg-[var(--blx-panel)] rounded-full">
              {update.category}
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--blx-muted)]">
              <Calendar size={14} />
              <span>{new Date(update.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold font-display mb-6" data-testid="update-title">
            {update.title}
          </h1>

          <p className="text-xl text-[var(--blx-text-2)] mb-8">
            {update.excerpt}
          </p>

          <div className="prose prose-invert max-w-none">
            {update.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="text-[var(--blx-text-2)] leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {update.tags?.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[var(--blx-border)]">
              <div className="flex flex-wrap gap-2">
                {update.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-full text-sm text-[var(--blx-text-2)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA */}
        <div className="mt-12 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-10 text-center relative blx-noise">
          <h3 className="text-2xl font-semibold mb-4 text-[var(--blx-text)]">Interested in This Technology?</h3>
          <p className="text-lg mb-8 text-[var(--blx-text-2)] font-light">
            Get expert consultation and see how this can benefit your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-gold px-8 py-4"
              data-testid="cta-contact"
            >
              Contact Us
            </Link>
            <Link
              to="/technologies"
              className="btn-glass px-8 py-4"
            >
              View Technologies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetail;