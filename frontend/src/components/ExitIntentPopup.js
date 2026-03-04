import React, { useState, useEffect, useCallback } from 'react';
import { X, Send, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', project_brief: '' });

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem('exit_intent_dismissed', '1');
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('exit_intent_dismissed')) return;

    let triggered = false;
    const handleMouseLeave = (e) => {
      if (triggered) return;
      if (e.clientY <= 5 && e.relatedTarget === null) {
        triggered = true;
        setVisible(true);
      }
    };

    // Only activate after 8 seconds on site
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch(`${API}/api/site-visit-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page_url: window.location.pathname }),
      });
      setSubmitted(true);
      setTimeout(dismiss, 4000);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      data-testid="exit-intent-overlay"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md animate-fade-up"
        style={{
          background: '#0B0B0B',
          border: '1px solid rgba(229,197,116,0.2)',
          borderRadius: '20px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(229,197,116,0.08)',
        }}
        data-testid="exit-intent-popup"
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors z-10"
          data-testid="exit-intent-close"
        >
          <X size={16} className="text-[var(--blx-muted)]" />
        </button>

        {submitted ? (
          <div className="p-10 text-center" data-testid="exit-intent-success">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(111,211,155,0.1)', border: '1px solid rgba(111,211,155,0.2)' }}>
              <CheckCircle2 size={28} className="text-[var(--blx-success)]" />
            </div>
            <div className="text-lg font-bold tracking-wider mb-2">We'll Be in Touch</div>
            <div className="text-sm text-[var(--blx-text-2)]">
              Our team will contact you within 24 hours to schedule your free site visit.
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 pb-4 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.15)' }}>
                <MapPin size={22} className="text-[var(--blx-gold-3)]" />
              </div>
              <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-1">BEFORE YOU GO</div>
              <div className="text-base font-bold tracking-wider leading-snug">Free Site Visit & Quote</div>
              <div className="text-[0.75rem] text-[var(--blx-text-2)] mt-1.5 leading-relaxed">
                Our engineers will visit your site, take measurements, and deliver a detailed quotation — at no cost.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Name *"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="input-luxury w-full text-xs py-2.5 px-3"
                  required
                  data-testid="exit-intent-name"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={form.company}
                  onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  className="input-luxury w-full text-xs py-2.5 px-3"
                  data-testid="exit-intent-company"
                />
              </div>
              <input
                type="email"
                placeholder="Work Email *"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="input-luxury w-full text-xs py-2.5 px-3"
                required
                data-testid="exit-intent-email"
              />
              <input
                type="tel"
                placeholder="Phone / WhatsApp *"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="input-luxury w-full text-xs py-2.5 px-3"
                required
                data-testid="exit-intent-phone"
              />
              <textarea
                placeholder="Brief project description (optional)"
                value={form.project_brief}
                onChange={e => setForm(p => ({ ...p, project_brief: e.target.value }))}
                className="input-luxury w-full text-xs py-2.5 px-3 resize-none"
                rows={2}
                data-testid="exit-intent-brief"
              />
              <button
                type="submit"
                disabled={submitting || !form.name || !form.email || !form.phone}
                className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-[0.12em] disabled:opacity-50"
                data-testid="exit-intent-submit"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Book Free Site Visit <ArrowRight size={14} />
                  </>
                )}
              </button>
              <div className="text-center pt-1">
                <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">No obligation. Available across UAE.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
