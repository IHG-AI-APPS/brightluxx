import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Package, Sparkles, FolderKanban, Users, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { api } = useAdmin();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api().get('/api/admin/stats').then(r => { setStats(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [api]);

  if (loading) return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-[var(--blx-glass)] rounded w-48" /><div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-28 bg-[var(--blx-glass)] rounded-xl" />)}</div></div></div>;

  const cards = [
    { label: 'Products', value: stats?.products || 0, icon: Package, color: 'rgba(229,197,116,0.15)', link: '/admin/products' },
    { label: 'Inspirations', value: stats?.inspirations || 0, icon: Sparkles, color: 'rgba(59,130,246,0.15)', link: '/admin/inspirations' },
    { label: 'Projects', value: stats?.projects || 0, icon: FolderKanban, color: 'rgba(16,185,129,0.15)', link: '/admin/projects' },
    { label: 'Leads', value: stats?.leads || 0, icon: Users, color: 'rgba(168,85,247,0.15)', link: '/admin/leads', badge: stats?.new_leads },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8" data-testid="admin-dashboard">
      <div>
        <h1 className="text-lg font-bold tracking-wider">Dashboard</h1>
        <p className="text-xs text-[var(--blx-muted)] tracking-wider mt-1">Content management overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Link key={c.label} to={c.link} className="glass-panel p-5 hover:border-[rgba(229,197,116,0.2)] transition-colors duration-200 group" data-testid={`admin-stat-${c.label.toLowerCase()}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color }}>
                <c.icon size={18} className="text-[var(--blx-text)]" />
              </div>
              {c.badge > 0 && <span className="text-[0.5625rem] font-bold px-2 py-0.5 rounded-full tracking-wider" style={{ background: 'rgba(229,197,116,0.15)', color: 'var(--blx-gold-3)' }}>{c.badge} new</span>}
            </div>
            <div className="text-2xl font-bold tracking-wider">{c.value}</div>
            <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-[0.15em] mt-0.5 group-hover:text-[var(--blx-text)] transition-colors duration-200">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="glass-panel p-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4 flex items-center gap-2"><TrendingUp size={14} /> Product Categories</h3>
          <div className="space-y-2">
            {(stats?.categories || []).map(c => (
              <div key={c.category} className="flex items-center justify-between py-1.5">
                <span className="text-xs tracking-wider capitalize" style={{ textTransform: 'none' }}>{(c.category || '').replace(/-/g, ' ')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-[var(--blx-glass)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min((c.count / (stats?.products || 1)) * 100, 100)}%`, background: 'var(--blx-gold-3)' }} />
                  </div>
                  <span className="text-[0.625rem] text-[var(--blx-muted)] w-6 text-right tracking-wider">{c.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="glass-panel p-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4 flex items-center gap-2"><Clock size={14} /> Recent Leads</h3>
          {(stats?.recent_leads || []).length === 0 ? (
            <p className="text-xs text-[var(--blx-muted)] tracking-wider py-8 text-center" style={{ textTransform: 'none' }}>No leads yet</p>
          ) : (
            <div className="space-y-3">
              {(stats?.recent_leads || []).map(l => (
                <div key={l.id || l._id} className="flex items-center justify-between py-2 border-b border-[var(--blx-border)] last:border-0">
                  <div>
                    <div className="text-xs font-bold tracking-wider">{l.name}</div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{l.email} - {l.application}</div>
                  </div>
                  <span className={`text-[0.5rem] font-bold px-2 py-0.5 rounded-full tracking-[0.15em] ${l.status === 'new' ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)]' : 'bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)]'}`}>{(l.status || 'new').toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lead Status Breakdown */}
      {(stats?.lead_statuses || []).length > 0 && (
        <div className="glass-panel p-6">
          <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4">Lead Pipeline</h3>
          <div className="flex gap-4 flex-wrap">
            {(stats?.lead_statuses || []).map(s => (
              <div key={s.status} className="glass-panel px-5 py-3 text-center">
                <div className="text-lg font-bold tracking-wider">{s.count}</div>
                <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-[0.15em] capitalize" style={{ textTransform: 'none' }}>{s.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
