import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { Star, Check, X, Trash2, Search, MessageSquare, User, Package } from 'lucide-react';

const STATUS_COLORS = {
  pending: { bg: 'rgba(229,197,116,0.12)', color: 'var(--blx-gold-3)' },
  approved: { bg: 'rgba(16,185,129,0.12)', color: '#34d399' },
  rejected: { bg: 'rgba(220,38,38,0.12)', color: '#f87171' },
};

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={12} className={s <= count ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'} />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const { api } = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 30 };
      if (statusFilter) params.status = statusFilter;
      if (productFilter) params.product_slug = productFilter;
      const res = await api().get('/api/admin/reviews', { params });
      setReviews(res.data.reviews || []);
      setTotal(res.data.total || 0);
      setStats(res.data.stats || { pending: 0, approved: 0, rejected: 0 });
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [api, page, statusFilter, productFilter]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const updateStatus = async (id, status) => {
    try {
      await api().put(`/api/admin/reviews/${id}`, { status });
      fetchReviews();
      if (detail?.id === id) setDetail(prev => ({ ...prev, status }));
    } catch (e) { alert('Failed to update review'); }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await api().delete(`/api/admin/reviews/${id}`);
      setDetail(null);
      fetchReviews();
    } catch (e) { alert('Failed to delete review'); }
  };

  const pages = Math.ceil(total / 30);

  return (
    <div className="p-6 md:p-8" data-testid="admin-reviews-page">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Review Moderation</h1>
        <p className="text-xs text-[var(--blx-muted)] mt-1">Manage customer product reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending', value: stats.pending, color: 'var(--blx-gold-3)', filter: 'pending' },
          { label: 'Approved', value: stats.approved, color: '#34d399', filter: 'approved' },
          { label: 'Rejected', value: stats.rejected, color: '#f87171', filter: 'rejected' },
        ].map(s => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.filter ? '' : s.filter)}
            className={`p-4 rounded-xl border transition-colors text-left ${statusFilter === s.filter ? 'border-[var(--blx-gold-3)]/30 bg-[var(--blx-gold-3)]/5' : 'border-[var(--blx-border)] bg-[rgba(20,20,20,0.5)] hover:bg-[rgba(255,255,255,0.02)]'}`}
            data-testid={`reviews-stat-${s.label.toLowerCase()}`}
          >
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-[var(--blx-muted)] mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input
            type="text"
            placeholder="Filter by product slug..."
            value={productFilter}
            onChange={e => { setProductFilter(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--blx-border)] bg-[rgba(20,20,20,0.5)] text-sm focus:outline-none focus:border-[var(--blx-gold-3)]/40"
            data-testid="reviews-product-filter"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-[var(--blx-border)] bg-[rgba(20,20,20,0.5)] text-sm"
          data-testid="reviews-status-filter"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="rounded-xl border border-[var(--blx-border)] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[var(--blx-gold-3)]/30 border-t-[var(--blx-gold-3)] rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 text-[var(--blx-muted)]">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No reviews found</p>
          </div>
        ) : (
          <table className="w-full text-sm" data-testid="reviews-table">
            <thead>
              <tr className="border-b border-[var(--blx-border)] bg-[rgba(20,20,20,0.8)]">
                <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Reviewer</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Product</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Date</th>
                <th className="text-right px-4 py-3 text-xs font-bold tracking-wider text-[var(--blx-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => {
                const sc = STATUS_COLORS[review.status] || STATUS_COLORS.pending;
                return (
                  <tr
                    key={review.id}
                    className={`border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors ${detail?.id === review.id ? 'bg-[rgba(229,197,116,0.04)]' : ''}`}
                    onClick={() => setDetail(review)}
                    data-testid={`review-row-${review.id}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-[var(--blx-muted)]" />
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="text-xs text-[var(--blx-muted)] mt-0.5">{review.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-[var(--blx-muted)]" />
                        <span className="text-xs">{review.product_name || review.product_slug}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Stars count={review.rating} /></td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: sc.bg, color: sc.color }}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--blx-muted)]">
                      {new Date(review.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        {review.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(review.id, 'approved')}
                            className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-400 transition-colors"
                            title="Approve"
                            data-testid={`approve-${review.id}`}
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {review.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(review.id, 'rejected')}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                            title="Reject"
                            data-testid={`reject-${review.id}`}
                          >
                            <X size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400/60 transition-colors"
                          title="Delete"
                          data-testid={`delete-${review.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${p === page ? 'bg-[var(--blx-gold-3)]/10 text-[var(--blx-gold-3)] border border-[var(--blx-gold-3)]/30' : 'text-[var(--blx-muted)] hover:bg-[rgba(255,255,255,0.04)]'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Detail Panel */}
      {detail && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#111] border-l border-[var(--blx-border)] shadow-2xl overflow-auto z-50" data-testid="review-detail-panel">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Review Detail</h3>
              <button onClick={() => setDetail(null)} className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)]" data-testid="close-review-detail">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-[var(--blx-muted)] mb-1">Reviewer</div>
                <div className="font-medium">{detail.name}</div>
                <div className="text-xs text-[var(--blx-muted)]">{detail.email}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--blx-muted)] mb-1">Product</div>
                <div className="text-sm">{detail.product_name || detail.product_slug}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--blx-muted)] mb-1">Rating</div>
                <Stars count={detail.rating} />
              </div>

              {detail.title && (
                <div>
                  <div className="text-xs text-[var(--blx-muted)] mb-1">Title</div>
                  <div className="text-sm font-medium">{detail.title}</div>
                </div>
              )}

              <div>
                <div className="text-xs text-[var(--blx-muted)] mb-1">Review</div>
                <div className="text-sm leading-relaxed p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--blx-border)]">{detail.comment}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[var(--blx-muted)] mb-0.5">Status</div>
                  <span className="px-2 py-0.5 rounded-full font-bold" style={{ background: (STATUS_COLORS[detail.status] || STATUS_COLORS.pending).bg, color: (STATUS_COLORS[detail.status] || STATUS_COLORS.pending).color }}>
                    {detail.status}
                  </span>
                </div>
                <div>
                  <div className="text-[var(--blx-muted)] mb-0.5">Spam Score</div>
                  <div>{detail.spam_score ?? 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[var(--blx-muted)] mb-0.5">Submitted</div>
                  <div>{new Date(detail.created_at).toLocaleString()}</div>
                </div>
                {detail.moderated_by && (
                  <div>
                    <div className="text-[var(--blx-muted)] mb-0.5">Moderated By</div>
                    <div>{detail.moderated_by}</div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-4 border-t border-[var(--blx-border)]">
                {detail.status !== 'approved' && (
                  <button
                    onClick={() => updateStatus(detail.id, 'approved')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                    data-testid="detail-approve"
                  >
                    <Check size={14} /> Approve
                  </button>
                )}
                {detail.status !== 'rejected' && (
                  <button
                    onClick={() => updateStatus(detail.id, 'rejected')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors"
                    data-testid="detail-reject"
                  >
                    <X size={14} /> Reject
                  </button>
                )}
                <button
                  onClick={() => deleteReview(detail.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/5 text-red-400/60 text-xs font-bold hover:bg-red-500/10 transition-colors"
                  data-testid="detail-delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
