import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import HoneypotFields from './HoneypotFields';

const API = process.env.REACT_APP_BACKEND_URL;

export default function QuickInquiry({ context = '', pageUrl = '' }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', fax: '' });

  useEffect(() => {
    const key = `qi_dismissed_${window.location.pathname}`;
    if (sessionStorage.getItem(key)) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.3) setVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(`qi_dismissed_${window.location.pathname}`, '1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      await fetch(`${API}/api/quick-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: `Quick inquiry: Interested in ${context}`,
          page_context: context,
          page_url: pageUrl || window.location.pathname,
        }),
      });
      setSubmitted(true);
      setTimeout(dismiss, 3000);
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 w-[calc(100%-2rem)] md:w-[340px] animate-fade-up"
      data-testid="quick-inquiry-form"
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(11,11,11,0.95)',
          border: '1px solid rgba(229,197,116,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(229,197,116,0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors z-10"
          data-testid="quick-inquiry-close"
          aria-label="Close"
        >
          <X size={14} className="text-[var(--blx-muted)]" />
        </button>

        {submitted ? (
          <div className="p-6 text-center" data-testid="quick-inquiry-success">
            <CheckCircle2 size={32} className="text-[var(--blx-success)] mx-auto mb-3" />
            <div className="text-sm font-bold tracking-wider mb-1">Thank You</div>
            <div className="text-[0.6875rem] text-[var(--blx-text-2)]">
              We'll get back to you shortly.
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Header */}
            <div className="mb-3 pr-6">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-1">QUICK INQUIRY</div>
              <div className="text-xs font-bold tracking-wider leading-snug">
                Interested in {context}?
              </div>
              <div className="text-[0.625rem] text-[var(--blx-muted)] mt-0.5">
                Get a callback in 2 hours
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Name *"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full text-xs py-2 px-3"
                required
                data-testid="quick-inquiry-name"
              />
              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full text-xs py-2 px-3"
                required
                data-testid="quick-inquiry-email"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full text-xs py-2 px-3"
                data-testid="quick-inquiry-phone"
              />
              <button
                type="submit"
                disabled={submitting || !form.name || !form.email}
                className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 text-[0.6875rem] font-bold tracking-[0.1em] disabled:opacity-50"
                data-testid="quick-inquiry-submit"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={12} />
                    Send Inquiry
                  </>
                )}
              </button>
              <HoneypotFields value={form.fax} onChange={e => setForm(p => ({ ...p, fax: e.target.value }))} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
