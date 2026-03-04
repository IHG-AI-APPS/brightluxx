import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { BarChart3, Users, Eye, MousePointer, Smartphone, Monitor, Tablet, ArrowDown, ArrowUp } from 'lucide-react';

const COLORS = ['#e5c574', '#3b82f6', '#10b981', '#a855f7', '#ef4444', '#f59e0b', '#06b6d4', '#ec4899'];

function Stat({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="glass-panel p-5" data-testid={`analytics-stat-${label.toLowerCase().replace(/\s/g,'-')}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color || 'rgba(229,197,116,0.12)' }}>
          <Icon size={18} className="text-[var(--blx-gold-3)]" />
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider mt-1">{label}</div>
      {sub && <div className="text-[0.5625rem] text-[var(--blx-text-2)] mt-1">{sub}</div>}
    </div>
  );
}

function BarList({ title, items, valueKey = 'views', labelKey = 'page', maxItems = 8 }) {
  const max = Math.max(...items.map(i => i[valueKey] || 0), 1);
  return (
    <div className="glass-panel p-5" data-testid={`analytics-${title.toLowerCase().replace(/\s/g,'-')}`}>
      <h3 className="text-xs font-bold tracking-wider mb-4">{title}</h3>
      {items.length === 0 && <p className="text-[0.625rem] text-[var(--blx-muted)]">No data yet</p>}
      <div className="space-y-2">
        {items.slice(0, maxItems).map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute inset-0 rounded" style={{ width: `${(item[valueKey] / max) * 100}%`, background: 'rgba(229,197,116,0.06)' }} />
            <div className="relative flex items-center justify-between py-1.5 px-2">
              <span className="text-[0.625rem] text-[var(--blx-text-2)] tracking-wider truncate max-w-[70%]" style={{ textTransform: 'none' }}>{item[labelKey]}</span>
              <span className="text-[0.625rem] font-bold text-[var(--blx-gold-3)]">{item[valueKey]?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniChart({ data, height = 80 }) {
  if (!data.length) return <div className="h-20 flex items-center justify-center text-[0.625rem] text-[var(--blx-muted)]">No data yet</div>;
  const max = Math.max(...data.map(d => d.views || 0), 1);
  const w = 100 / data.length;
  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 group relative">
          <div
            className="w-full rounded-t transition-all duration-200 group-hover:opacity-80"
            style={{
              height: `${Math.max((d.views / max) * 100, 2)}%`,
              background: 'linear-gradient(180deg, rgba(229,197,116,0.6), rgba(229,197,116,0.15))',
            }}
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-[0.5rem] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
            {d.date?.slice(5)}: {d.views}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalytics() {
  const { api } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    api().get(`/api/admin/analytics?days=${days}`)
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [api, days]);

  if (loading) return (
    <div className="p-6 lg:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[var(--blx-glass)] rounded w-48" />
        <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-28 bg-[var(--blx-glass)] rounded-xl" />)}</div>
        <div className="h-48 bg-[var(--blx-glass)] rounded-xl" />
      </div>
    </div>
  );

  const d = data || {};
  const devices = d.devices || [];
  const getDevice = (name) => devices.find(dv => dv.device === name)?.count || 0;

  return (
    <div className="p-6 lg:p-8 space-y-6" data-testid="admin-analytics">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider">Analytics</h1>
          <p className="text-xs text-[var(--blx-muted)] tracking-wider mt-1">Website traffic & engagement insights</p>
        </div>
        <div className="flex gap-1.5">
          {[7, 14, 30].map(n => (
            <button
              key={n}
              onClick={() => setDays(n)}
              className={`px-3 py-1.5 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors ${
                days === n ? 'bg-[rgba(229,197,116,0.12)] text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)] hover:text-[var(--blx-text)]'
              }`}
              data-testid={`analytics-period-${n}`}
            >
              {n}d
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Page Views" value={d.total_page_views || 0} icon={Eye} />
        <Stat label="Unique Visitors" value={d.unique_visitors || 0} icon={Users} />
        <Stat label="Total Leads" value={d.lead_funnel?.total_leads || 0} icon={BarChart3} color="rgba(168,85,247,0.12)" />
        <Stat label="Quote Requests" value={d.lead_funnel?.quote_requests || 0} icon={MousePointer} color="rgba(16,185,129,0.12)" />
      </div>

      {/* Daily Views Chart */}
      <div className="glass-panel p-5" data-testid="analytics-daily-chart">
        <h3 className="text-xs font-bold tracking-wider mb-4">Daily Page Views</h3>
        <MiniChart data={d.daily_views || []} height={100} />
      </div>

      {/* Grid: Top Pages, Top Products, Categories, Devices */}
      <div className="grid lg:grid-cols-2 gap-4">
        <BarList title="Top Pages" items={d.top_pages || []} />
        <BarList title="Most Viewed Products" items={d.top_products || []} valueKey="views" labelKey="slug" />
        <BarList title="Category Engagement" items={d.categories || []} valueKey="views" labelKey="category" />

        {/* Device Breakdown */}
        <div className="glass-panel p-5" data-testid="analytics-devices">
          <h3 className="text-xs font-bold tracking-wider mb-4">Device Breakdown</h3>
          {devices.length === 0 ? (
            <p className="text-[0.625rem] text-[var(--blx-muted)]">No data yet</p>
          ) : (
            <div className="space-y-3">
              {[
                { icon: Monitor, label: 'Desktop', count: getDevice('desktop') },
                { icon: Tablet, label: 'Tablet', count: getDevice('tablet') },
                { icon: Smartphone, label: 'Mobile', count: getDevice('mobile') },
              ].map(({ icon: Icon, label, count }) => {
                const total = devices.reduce((a, dv) => a + dv.count, 0) || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-[var(--blx-gold-3)]" />
                        <span className="text-[0.625rem] tracking-wider">{label}</span>
                      </div>
                      <span className="text-[0.625rem] font-bold">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.04)]">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'var(--blx-gold-3)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Referrers & CTA Clicks */}
      <div className="grid lg:grid-cols-2 gap-4">
        <BarList title="Top Referrers" items={d.referrers || []} valueKey="count" labelKey="referrer" />
        <BarList title="CTA Clicks" items={d.cta_clicks || []} valueKey="clicks" labelKey="cta" />
      </div>

      {/* Lead Funnel */}
      <div className="glass-panel p-5" data-testid="analytics-lead-funnel">
        <h3 className="text-xs font-bold tracking-wider mb-4">Lead Funnel</h3>
        <div className="flex items-center gap-4">
          {[
            { label: 'Page Views', value: d.total_page_views || 0, color: 'rgba(229,197,116,0.2)' },
            { label: 'Contact Form', value: d.lead_funnel?.contact_form || 0, color: 'rgba(59,130,246,0.2)' },
            { label: 'Quote Requests', value: d.lead_funnel?.quote_requests || 0, color: 'rgba(16,185,129,0.2)' },
            { label: 'Total Leads', value: d.lead_funnel?.total_leads || 0, color: 'rgba(168,85,247,0.2)' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ArrowDown size={14} className="text-[var(--blx-muted)] flex-shrink-0 rotate-[-90deg]" />}
              <div className="flex-1 rounded-xl p-3 text-center" style={{ background: step.color }}>
                <div className="text-lg font-bold">{step.value.toLocaleString()}</div>
                <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider">{step.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
