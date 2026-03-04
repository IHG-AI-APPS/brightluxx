import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Activity, Zap, AlertTriangle, Clock, Server, ArrowUp, ArrowDown } from 'lucide-react';

function Stat({ label, value, unit, icon: Icon, color, status }) {
  const statusColor = status === 'good' ? 'text-emerald-400' : status === 'warn' ? 'text-amber-400' : status === 'bad' ? 'text-red-400' : 'text-[var(--blx-text)]';
  return (
    <div className="glass-panel p-5" data-testid={`perf-stat-${label.toLowerCase().replace(/\s/g,'-')}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color || 'rgba(229,197,116,0.12)' }}>
          <Icon size={18} className="text-[var(--blx-gold-3)]" />
        </div>
        {status && <span className={`text-[0.5rem] font-bold tracking-wider px-2 py-0.5 rounded-full ${statusColor}`} style={{ background: 'rgba(255,255,255,0.04)' }}>{status.toUpperCase()}</span>}
      </div>
      <div className="text-2xl font-bold tracking-tight">{typeof value === 'number' ? value.toLocaleString() : value}<span className="text-sm text-[var(--blx-muted)] ml-1">{unit}</span></div>
      <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider mt-1">{label}</div>
    </div>
  );
}

function HourlyChart({ data, height = 80 }) {
  if (!data.length) return <div className="h-20 flex items-center justify-center text-[0.625rem] text-[var(--blx-muted)]">No data yet. Metrics will appear after some API traffic.</div>;
  const maxMs = Math.max(...data.map(d => d.avg_ms || 0), 1);
  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {data.map((d, i) => {
        const pct = Math.max((d.avg_ms / maxMs) * 100, 3);
        const color = d.avg_ms < 100 ? 'rgba(16,185,129,0.5)' : d.avg_ms < 300 ? 'rgba(229,197,116,0.5)' : 'rgba(239,68,68,0.5)';
        return (
          <div key={i} className="flex-1 group relative">
            <div className="w-full rounded-t transition-all" style={{ height: `${pct}%`, background: color }} />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-[0.5rem] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
              {d.hour?.slice(11) || ''}: {d.avg_ms}ms ({d.requests} req)
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminPerformance() {
  const { api } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    setLoading(true);
    api().get(`/api/admin/performance?days=${days}`)
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [api, days]);

  if (loading) return (
    <div className="p-6 lg:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[var(--blx-glass)] rounded w-48" />
        <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-28 bg-[var(--blx-glass)] rounded-xl" />)}</div>
      </div>
    </div>
  );

  const d = data || {};
  const avgStatus = d.avg_response_ms < 100 ? 'good' : d.avg_response_ms < 300 ? 'warn' : 'bad';
  const errorStatus = d.error_rate < 1 ? 'good' : d.error_rate < 5 ? 'warn' : 'bad';

  return (
    <div className="p-6 lg:p-8 space-y-6" data-testid="admin-performance">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider">Performance</h1>
          <p className="text-xs text-[var(--blx-muted)] tracking-wider mt-1">API response times & system health</p>
        </div>
        <div className="flex gap-1.5">
          {[1, 3, 7].map(n => (
            <button
              key={n}
              onClick={() => setDays(n)}
              className={`px-3 py-1.5 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors ${
                days === n ? 'bg-[rgba(229,197,116,0.12)] text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)] hover:text-[var(--blx-text)]'
              }`}
              data-testid={`perf-period-${n}`}
            >
              {n}d
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Requests" value={d.total_requests || 0} icon={Server} />
        <Stat label="Avg Response" value={d.avg_response_ms || 0} unit="ms" icon={Zap} status={avgStatus} color="rgba(16,185,129,0.12)" />
        <Stat label="P95 Response" value={d.p95_response_ms || 0} unit="ms" icon={Clock} color="rgba(59,130,246,0.12)" />
        <Stat label="Error Rate" value={d.error_rate || 0} unit="%" icon={AlertTriangle} status={errorStatus} color="rgba(239,68,68,0.12)" />
      </div>

      {/* Hourly Chart */}
      <div className="glass-panel p-5" data-testid="perf-hourly-chart">
        <h3 className="text-xs font-bold tracking-wider mb-1">Response Time (Last 24h)</h3>
        <p className="text-[0.5625rem] text-[var(--blx-muted)] mb-4">Green &lt; 100ms | Gold &lt; 300ms | Red &gt; 300ms</p>
        <HourlyChart data={d.hourly || []} height={100} />
      </div>

      {/* Endpoint Performance Table */}
      <div className="glass-panel overflow-hidden" data-testid="perf-endpoints-table">
        <div className="p-5 pb-3">
          <h3 className="text-xs font-bold tracking-wider">Endpoint Performance</h3>
        </div>
        {(d.endpoints || []).length === 0 ? (
          <p className="px-5 pb-5 text-[0.625rem] text-[var(--blx-muted)]">No API traffic recorded yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-y border-[var(--blx-hairline)]">
                <th className="text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-2.5 px-5">Endpoint</th>
                <th className="text-right text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-2.5 px-3">Requests</th>
                <th className="text-right text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-2.5 px-3">Avg</th>
                <th className="text-right text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-2.5 px-3">Max</th>
                <th className="text-right text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-2.5 px-3">Errors</th>
              </tr>
            </thead>
            <tbody>
              {(d.endpoints || []).map((ep, i) => (
                <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                  <td className="py-2.5 px-5 text-[0.625rem] tracking-wider font-medium" style={{ textTransform: 'none' }}>{ep.endpoint}</td>
                  <td className="py-2.5 px-3 text-[0.625rem] text-right text-[var(--blx-text-2)]">{ep.count}</td>
                  <td className="py-2.5 px-3 text-[0.625rem] text-right">
                    <span className={ep.avg_ms < 100 ? 'text-emerald-400' : ep.avg_ms < 300 ? 'text-amber-400' : 'text-red-400'}>{ep.avg_ms}ms</span>
                  </td>
                  <td className="py-2.5 px-3 text-[0.625rem] text-right text-[var(--blx-muted)]">{ep.max_ms}ms</td>
                  <td className="py-2.5 px-3 text-[0.625rem] text-right">
                    {ep.errors > 0 ? <span className="text-red-400">{ep.errors}</span> : <span className="text-[var(--blx-muted)]">0</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Status Codes & Slowest Endpoints */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-panel p-5" data-testid="perf-status-codes">
          <h3 className="text-xs font-bold tracking-wider mb-4">Status Code Distribution</h3>
          {(d.status_codes || []).length === 0 ? (
            <p className="text-[0.625rem] text-[var(--blx-muted)]">No data yet</p>
          ) : (
            <div className="space-y-2">
              {(d.status_codes || []).map((sc, i) => {
                const total = (d.status_codes || []).reduce((a, s) => a + s.count, 0) || 1;
                const pct = Math.round((sc.count / total) * 100);
                const color = sc.status_group?.startsWith('2') ? 'rgba(16,185,129,0.5)' : sc.status_group?.startsWith('3') ? 'rgba(59,130,246,0.5)' : 'rgba(239,68,68,0.5)';
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.625rem] tracking-wider font-medium">{sc.status_group}</span>
                      <span className="text-[0.625rem] text-[var(--blx-muted)]">{sc.count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.04)]">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="glass-panel p-5" data-testid="perf-slowest">
          <h3 className="text-xs font-bold tracking-wider mb-4">Slowest Endpoints</h3>
          {(d.slowest_endpoints || []).length === 0 ? (
            <p className="text-[0.625rem] text-[var(--blx-muted)]">No data yet</p>
          ) : (
            <div className="space-y-3">
              {(d.slowest_endpoints || []).map((ep, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="text-[0.625rem] text-[var(--blx-text-2)] tracking-wider truncate max-w-[65%]" style={{ textTransform: 'none' }}>{ep.endpoint}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.625rem] font-bold ${ep.avg_ms < 100 ? 'text-emerald-400' : ep.avg_ms < 300 ? 'text-amber-400' : 'text-red-400'}`}>{ep.avg_ms}ms</span>
                    <span className="text-[0.5rem] text-[var(--blx-muted)]">({ep.count}x)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Health Check */}
      <div className="glass-panel p-5" data-testid="perf-health">
        <h3 className="text-xs font-bold tracking-wider mb-3">System Health</h3>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[0.625rem] tracking-wider">All systems operational</span>
          <span className="text-[0.5rem] text-[var(--blx-muted)] ml-auto">Uptime monitor: /api/health</span>
        </div>
      </div>
    </div>
  );
}
