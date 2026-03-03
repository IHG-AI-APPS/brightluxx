import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { Search, Trash2, X, Mail, Phone, Building, MapPin, Clock, MessageSquare, Save, Download } from 'lucide-react';

const STATUSES = [
  { value: '', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const STATUS_COLORS = {
  new: { bg: 'rgba(229,197,116,0.12)', color: 'var(--blx-gold-3)' },
  contacted: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa' },
  qualified: { bg: 'rgba(16,185,129,0.12)', color: '#34d399' },
  won: { bg: 'rgba(16,185,129,0.2)', color: '#22c55e' },
  lost: { bg: 'rgba(220,38,38,0.12)', color: '#f87171' },
};

export default function AdminLeads() {
  const { api } = useAdmin();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 30 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await api().get('/api/admin/leads', { params });
      setLeads(res.data.leads); setTotal(res.data.total);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [api, page, search, statusFilter]);

  useEffect(() => { fetch_(); }, [fetch_]);

  const updateStatus = async (id, status) => {
    try { await api().put(`/api/admin/leads/${id}`, { status }); fetch_(); } catch (e) { alert('Error'); }
  };

  const saveNotes_ = async () => {
    setSavingNotes(true);
    try { await api().put(`/api/admin/leads/${detail.id}`, { notes }); fetch_(); } catch (e) { alert('Error'); }
    setSavingNotes(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try { await api().delete(`/api/admin/leads/${id}`); setDetail(null); fetch_(); } catch (e) { alert('Error'); }
  };

  const openDetail = (lead) => { setDetail(lead); setNotes(lead.notes || ''); };

  const handleExport = async () => {
    try {
      const res = await api().get('/api/admin/export/leads');
      const blob = new Blob([JSON.stringify(res.data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'leads_export.json'; a.click();
    } catch (e) { alert('Export error'); }
  };

  const formatDate = (d) => { try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return d; } };

  return (
    <div className="p-6 lg:p-8" data-testid="admin-leads-page">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div><h1 className="text-lg font-bold tracking-wider">Leads</h1><p className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider">{total} total</p></div>
        <button onClick={handleExport} className="btn-glass px-4 py-2 text-xs flex items-center gap-2" data-testid="admin-export-leads"><Download size={14} /> Export</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input type="text" placeholder="Search name, email, company..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="input-luxury w-full pl-9 py-2 text-xs" data-testid="admin-leads-search" />
        </div>
        <div className="flex gap-1">
          {STATUSES.map(s => (
            <button key={s.value} onClick={() => { setStatusFilter(s.value); setPage(1); }} className={`px-3 py-2 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors duration-200 ${statusFilter === s.value ? 'bg-[rgba(229,197,116,0.1)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]' : 'text-[var(--blx-muted)] hover:bg-[rgba(255,255,255,0.04)]'}`} data-testid={`admin-leads-filter-${s.value || 'all'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="admin-leads-table">
            <thead>
              <tr className="border-b border-[var(--blx-border)]">
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Name</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Contact</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Application</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Date</th>
                <th className="p-3 text-center text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Status</th>
                <th className="p-3 text-right text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({length: 5}).map((_, i) => <tr key={i}><td colSpan={6} className="p-3"><div className="h-10 bg-[var(--blx-glass)] rounded animate-pulse" /></td></tr>) :
              leads.length === 0 ? <tr><td colSpan={6} className="p-12 text-center text-xs text-[var(--blx-muted)] tracking-wider">No leads found</td></tr> :
              leads.map(l => {
                const sc = STATUS_COLORS[l.status] || STATUS_COLORS.new;
                return (
                  <tr key={l.id || l._id} className="border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 cursor-pointer" onClick={() => openDetail(l)} data-testid={`admin-lead-row-${l.id}`}>
                    <td className="p-3">
                      <div className="text-xs font-bold tracking-wider">{l.name}</div>
                      {l.company && <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{l.company}</div>}
                    </td>
                    <td className="p-3">
                      <div className="text-[0.625rem] text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}>{l.email}</div>
                      <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{l.phone}</div>
                    </td>
                    <td className="p-3 text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}>{l.application}</td>
                    <td className="p-3 text-[0.625rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{formatDate(l.created_at)}</td>
                    <td className="p-3 text-center">
                      <select value={l.status || 'new'} onChange={e => { e.stopPropagation(); updateStatus(l.id, e.target.value); }} onClick={e => e.stopPropagation()} className="text-[0.5625rem] font-bold tracking-[0.15em] rounded-full px-3 py-1 border-0 cursor-pointer" style={{ background: sc.bg, color: sc.color, textTransform: 'none' }} data-testid={`admin-lead-status-${l.id}`}>
                        {STATUSES.filter(s => s.value).map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="p-3 text-right" onClick={e => e.stopPropagation()}>
                      <button onClick={() => handleDelete(l.id)} className="p-2 rounded-lg hover:bg-[rgba(220,38,38,0.08)] transition-colors duration-200"><Trash2 size={14} className="text-[var(--blx-muted)]" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {detail && (
        <div className="fixed inset-0 z-50 flex" data-testid="admin-lead-detail">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setDetail(null)} />
          <div className="w-full max-w-md bg-[#141414] border-l border-[var(--blx-border)] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[var(--blx-border)]">
              <h2 className="text-sm font-bold tracking-wider">Lead Details</h2>
              <button onClick={() => setDetail(null)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)]" data-testid="admin-lead-detail-close"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold tracking-wider mb-1">{detail.name}</h3>
                {detail.company && <div className="text-xs text-[var(--blx-text-2)] tracking-wider flex items-center gap-2" style={{ textTransform: 'none' }}><Building size={12} /> {detail.company}</div>}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs tracking-wider" style={{ textTransform: 'none' }}><Mail size={14} className="text-[var(--blx-muted)]" /> <a href={`mailto:${detail.email}`} className="text-[var(--blx-gold-3)] hover:underline">{detail.email}</a></div>
                <div className="flex items-center gap-3 text-xs tracking-wider" style={{ textTransform: 'none' }}><Phone size={14} className="text-[var(--blx-muted)]" /> <a href={`tel:${detail.phone}`} className="hover:text-[var(--blx-gold-3)]">{detail.phone}</a></div>
                {detail.city && <div className="flex items-center gap-3 text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}><MapPin size={14} className="text-[var(--blx-muted)]" /> {detail.city}</div>}
                <div className="flex items-center gap-3 text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}><Clock size={14} className="text-[var(--blx-muted)]" /> {formatDate(detail.created_at)}</div>
              </div>
              <div className="glass-panel p-4 space-y-2">
                <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Application</div>
                <div className="text-xs tracking-wider" style={{ textTransform: 'none' }}>{detail.application}</div>
                {detail.timeline && <><div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mt-3">Timeline</div><div className="text-xs tracking-wider" style={{ textTransform: 'none' }}>{detail.timeline}</div></>}
                {detail.budget && <><div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mt-3">Budget</div><div className="text-xs tracking-wider" style={{ textTransform: 'none' }}>{detail.budget}</div></>}
                {detail.message && <><div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mt-3">Message</div><div className="text-xs tracking-wider" style={{ textTransform: 'none' }}>{detail.message}</div></>}
              </div>
              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2"><MessageSquare size={12} /> Notes</div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} className="input-luxury w-full py-2 text-xs resize-y" style={{ textTransform: 'none' }} placeholder="Add internal notes..." data-testid="admin-lead-notes" />
                <button onClick={saveNotes_} disabled={savingNotes} className="btn-gold px-4 py-2 text-xs mt-2 flex items-center gap-2" data-testid="admin-lead-save-notes"><Save size={12} /> {savingNotes ? 'Saving...' : 'Save Notes'}</button>
              </div>
              {/* Status */}
              <div>
                <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2">Status</div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.filter(s => s.value).map(s => {
                    const sc = STATUS_COLORS[s.value];
                    const isActive = (detail.status || 'new') === s.value;
                    return (
                      <button key={s.value} onClick={() => { updateStatus(detail.id, s.value); setDetail({...detail, status: s.value}); }} className={`px-4 py-2 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors duration-200 ${isActive ? 'ring-2 ring-offset-1 ring-offset-transparent' : ''}`} style={{ background: sc.bg, color: sc.color, ringColor: sc.color }} data-testid={`admin-lead-set-status-${s.value}`}>
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button onClick={() => handleDelete(detail.id)} className="w-full py-2.5 text-xs font-bold tracking-wider rounded-lg transition-colors duration-200" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)', color: '#f87171' }}>
                <Trash2 size={14} className="inline mr-2" /> Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
