import React, { useState, useEffect } from 'react';
import { Star, Send, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

function StarRating({ value, onChange, readonly = false, size = 20 }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5" data-testid="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          data-testid={`star-${star}`}
        >
          <Star
            size={size}
            className={`${(hover || value) >= star ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'} transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, isDark, text1, text2, card }) {
  return (
    <div className={`p-5 rounded-xl border ${card}`} data-testid={`review-${review.id}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
            <User size={16} className="text-cyan-500" />
          </div>
          <div>
            <p className={`text-sm font-semibold ${text1}`}>{review.name}</p>
            <p className={`text-xs ${text2}`}>{new Date(review.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        <StarRating value={review.rating} readonly size={14} />
      </div>
      {review.title && <p className={`text-sm font-semibold ${text1} mb-1`}>{review.title}</p>}
      <p className={`text-sm ${text2} leading-relaxed`}>{review.comment}</p>
    </div>
  );
}

export default function ReviewSection({ slug, productName, isDark, text1, text2, card }) {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average_rating: 0, total_reviews: 0 });
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', rating: 0, title: '', comment: '', _honeypot: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/api/products/${slug}/reviews`);
        setReviews(res.data.reviews || []);
        setStats(res.data.stats || { average_rating: 0, total_reviews: 0 });
      } catch (e) { /* no reviews yet */ }
    };
    load();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.rating) { setError('Please select a star rating'); return; }
    if (form.comment.length < 10) { setError('Review must be at least 10 characters'); return; }

    setSubmitting(true);
    try {
      await api.post(`/api/products/${slug}/reviews`, form);
      setSubmitted(true);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className={`py-16 ${isDark ? '' : 'bg-white'}`} data-testid="review-section">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Customer Reviews</p>
            <h2 className={`text-2xl font-bold ${text1}`}>
              {stats.total_reviews > 0 ? (
                <span className="flex items-center gap-3">
                  <StarRating value={Math.round(stats.average_rating)} readonly size={22} />
                  <span className="text-lg font-medium">{stats.average_rating.toFixed(1)} ({stats.total_reviews})</span>
                </span>
              ) : 'Be the First to Review'}
            </h2>
          </div>
          {!submitted && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-colors"
              data-testid="write-review-btn"
            >
              <Star size={14} /> Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && !submitted && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className={`mb-8 p-6 rounded-xl border ${card}`}
              data-testid="review-form"
            >
              <h3 className={`text-lg font-bold ${text1} mb-4`}>Review {productName}</h3>

              {/* Honeypot */}
              <input type="text" name="_honeypot" value={form._honeypot} onChange={e => setForm({...form, _honeypot: e.target.value})} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="mb-4">
                <label className={`block text-sm font-medium ${text2} mb-2`}>Rating *</label>
                <StarRating value={form.rating} onChange={(v) => setForm({...form, rating: v})} size={28} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium ${text2} mb-1`}>Name *</label>
                  <input
                    type="text" required minLength={2}
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`}
                    placeholder="Your name"
                    data-testid="review-name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${text2} mb-1`}>Email *</label>
                  <input
                    type="email" required
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`}
                    placeholder="your@email.com"
                    data-testid="review-email"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium ${text2} mb-1`}>Review Title</label>
                <input
                  type="text" maxLength={200}
                  value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`}
                  placeholder="Summarize your experience"
                  data-testid="review-title"
                />
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium ${text2} mb-1`}>Review *</label>
                <textarea
                  required minLength={10} maxLength={2000} rows={4}
                  value={form.comment} onChange={e => setForm({...form, comment: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`}
                  placeholder="Share your experience with this product..."
                  data-testid="review-comment"
                />
              </div>

              {error && <p className="text-red-400 text-sm mb-3" data-testid="review-error">{error}</p>}

              <button
                type="submit" disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-colors disabled:opacity-50"
                data-testid="review-submit"
              >
                {submitting ? 'Submitting...' : <><Send size={14} /> Submit Review</>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {submitted && (
          <div className={`mb-8 p-5 rounded-xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-200 bg-emerald-50'}`} data-testid="review-success">
            <p className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Thank you! Your review has been submitted and will appear after moderation.
            </p>
          </div>
        )}

        {/* Reviews list */}
        {reviews.length > 0 && (
          <div className="space-y-3">
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} isDark={isDark} text1={text1} text2={text2} card={card} />
            ))}
            {reviews.length > 3 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className={`w-full flex items-center justify-center gap-1 py-3 text-sm font-medium ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'} transition-colors`}
                data-testid="show-all-reviews"
              >
                Show all {reviews.length} reviews <ChevronDown size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
