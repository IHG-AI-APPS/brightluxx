import React, { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { getRecaptchaHeaders } from '../utils/recaptcha';

/**
 * SpecifierAnswerBox — TL;DR "quick-spec" summary for architects/consultants.
 * Appears at the top of authority pages. Designed for AI citation (GEO).
 */
export function SpecifierAnswerBox({ title, items, recommendation }) {
  return (
    <div className="glass-panel relative overflow-hidden mb-10" data-testid="specifier-answer-box">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'var(--blx-gold-grad)' }} />
      <div className="p-6 pl-8">
        <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER QUICK REFERENCE</div>
        <h3 className="text-base font-bold tracking-wider mb-4">{title}</h3>
        <ul className="space-y-2 mb-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[var(--blx-text-2)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        {recommendation && (
          <div className="mt-4 px-4 py-3 rounded-lg" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.12)' }}>
            <span className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">RECOMMENDED FOR: </span>
            <span className="text-xs text-[var(--blx-text-2)]">{recommendation}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ComparisonTable — Side-by-side spec comparison. AI loves citing tables.
 */
export function ComparisonTable({ headers, rows, caption }) {
  return (
    <div className="glass-panel overflow-hidden mb-8" data-testid="comparison-table">
      {caption && <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">{caption}</div>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--blx-hairline)]">
              {headers.map((h, i) => (
                <th key={i} className={`text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-[var(--blx-hairline)] last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className={`py-3 px-5 text-xs ${ci === 0 ? 'text-left font-medium' : 'text-center text-[var(--blx-text-2)]'}`}>
                    {cell === 'best' ? <span className="text-[var(--blx-gold-3)] font-bold">Best</span> :
                     cell === 'good' ? <span className="text-emerald-400 font-bold">Good</span> :
                     cell === 'fair' ? <span className="text-amber-400 font-bold">Fair</span> :
                     cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * FAQSection — Accordion FAQ with structured data for GEO/AI citation.
 * Returns FAQ JSON-LD schema that should be passed to the SEO component.
 */
export function FAQSection({ faqs, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="mb-10" data-testid="faq-section">
      <h2 className="text-base font-bold tracking-wider mb-6">{title}</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-panel overflow-hidden" data-testid={`faq-item-${i}`}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium pr-4">{faq.q}</span>
              <ChevronDown size={16} className={`text-[var(--blx-muted)] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-5 pb-4 text-sm text-[var(--blx-text-2)] leading-relaxed border-t border-[var(--blx-hairline)] pt-3">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Build FAQ JSON-LD schema from FAQ items */
export function buildFaqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      }
    }))
  };
}

/**
 * SpecPackCTA — Email-gated spec pack download CTA.
 */
export function SpecPackCTA({ packId, title, description, onDownload }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [fax, setFax] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const API = process.env.REACT_APP_BACKEND_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rcHeaders = await getRecaptchaHeaders('specpack_download');
      const res = await fetch(`${API}/api/specpacks/${packId}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...rcHeaders },
        body: JSON.stringify({ email, name, company, role, pack_id: packId, fax }),
      });
      const data = await res.json();
      if (data.download_url) {
        window.open(`${API}${data.download_url}`, '_blank');
        setSubmitted(true);
        if (onDownload) onDownload({ email, name, packId });
      }
    } catch (err) {
      console.error('Download error:', err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="glass-panel p-6 text-center" data-testid="specpack-success">
        <CheckCircle size={32} className="text-[var(--blx-gold-3)] mx-auto mb-3" />
        <p className="text-sm font-bold tracking-wider mb-1">Spec Pack Sent</p>
        <p className="text-xs text-[var(--blx-text-2)]">Your download should open automatically. Check your email for a copy.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }} data-testid="specpack-cta">
      <div className="p-6">
        <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">FREE SPECIFICATION PACK</div>
        <h3 className="text-base font-bold tracking-wider mb-2">{title}</h3>
        <p className="text-xs text-[var(--blx-text-2)] mb-5 leading-relaxed">{description}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors"
            data-testid="specpack-name-input"
          />
          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors"
            data-testid="specpack-email-input"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors"
            data-testid="specpack-company-input"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors"
            style={{ color: role ? 'var(--blx-text)' : 'var(--blx-muted)' }}
            data-testid="specpack-role-select"
          >
            <option value="" style={{ background: '#1a1a1a' }}>Select your role</option>
            <option value="architect" style={{ background: '#1a1a1a' }}>Architect</option>
            <option value="consultant" style={{ background: '#1a1a1a' }}>AV Consultant</option>
            <option value="designer" style={{ background: '#1a1a1a' }}>Interior Designer</option>
            <option value="integrator" style={{ background: '#1a1a1a' }}>Systems Integrator</option>
            <option value="end-user" style={{ background: '#1a1a1a' }}>End User / Client</option>
            <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
          </select>
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
            <input type="text" name="fax" value={fax} onChange={e => setFax(e.target.value)} autoComplete="off" tabIndex={-1} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-xs font-bold tracking-[0.15em] transition-all duration-200"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="specpack-download-btn"
          >
            {loading ? 'Preparing...' : 'Download Spec Pack (PDF)'}
          </button>
        </form>
        <p className="text-[0.5rem] text-[var(--blx-muted)] mt-3 text-center">Includes recommended specs, BOQ template & vendor checklist</p>
      </div>
    </div>
  );
}

/**
 * SectionDivider — visual section break for long-form pages
 */
export function SectionDivider() {
  return <div className="my-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(229,197,116,0.2), transparent)' }} />;
}

/**
 * KnowledgeHero — Hero section for knowledge base pages
 */
export function KnowledgeHero({ title, subtitle, breadcrumb }) {
  return (
    <div className="relative pt-24 pb-12 mb-8" data-testid="knowledge-hero">
      <div className="absolute inset-0 blx-led-grid" />
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <a href="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</a>
            <span>/</span>
            <a href="/knowledge" className="hover:text-[var(--blx-text-2)] transition-colors">Knowledge Base</a>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{breadcrumb}</span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--blx-text-2)] mt-3 max-w-2xl tracking-wider leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}
