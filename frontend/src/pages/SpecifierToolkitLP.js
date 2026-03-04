import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Download, Calculator, Ruler, FileText, Box, Layers, BookOpen, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

const TOOLKIT_ITEMS = [
  { icon: Calculator, title: 'Pixel Pitch Calculator', desc: 'Calculate optimal pixel pitch based on viewing distance, content type, and budget' },
  { icon: Ruler, title: 'Brightness Guide', desc: 'UAE/GCC-specific brightness requirements by environment type' },
  { icon: FileText, title: '12 Specification Packs', desc: 'Technology and application-specific PDF specification documents' },
  { icon: Box, title: 'BIM/CAD References', desc: 'Dimensions, mounting, and electrical details for 4 product families' },
  { icon: Layers, title: 'Comparison Cheat Sheets', desc: 'One-page quick-reference guides for meetings and reviews' },
  { icon: BookOpen, title: 'Knowledge Base Access', desc: '8 in-depth technical guides covering every specification topic' },
  { icon: Shield, title: 'SLA Audit Checklist', desc: '28-item checklist to evaluate vendor Service Level Agreements' },
];

export default function SpecifierToolkitLP() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', project_type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'linkedin_specifier_toolkit', application: `Specifier Toolkit: ${form.role}` }),
      });
      const data = await res.json();
      if (data.id || data.success) {
        setSubmitted(true);
      } else {
        setError(data.detail || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4" data-testid="specifier-toolkit-lp">
      <SEO
        title="Digital Display Specifier Toolkit — Free Download | Brightluxx"
        description="Download the complete Digital Display Specifier Toolkit. Includes pixel pitch calculator, brightness guide, 12 spec packs, BIM/CAD references, and comparison cheat sheets."
        path="/lp/specifier-toolkit"
      />

      <div className="w-full max-w-[960px]">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">BRIGHTLUXX — FREE RESOURCE</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider leading-tight mb-4">
            Digital Display<br />Specifier Toolkit
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-lg mx-auto leading-relaxed" style={{ textTransform: 'none' }}>
            Everything architects, AV consultants, and contractors need to specify LED displays for GCC projects. One toolkit, immediate access.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          {/* What's Included */}
          <div>
            <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-4">WHAT'S INCLUDED</div>
            <div className="space-y-3">
              {TOOLKIT_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-3 glass-panel p-4" data-testid={`toolkit-item-${i}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <item.icon size={14} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider">{item.title}</div>
                    <div className="text-[0.6875rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-[0.5625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>
              <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[var(--blx-gold-3)]" /> No cost</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[var(--blx-gold-3)]" /> Immediate access</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[var(--blx-gold-3)]" /> UAE/GCC specific</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[var(--blx-gold-3)]" /> Updated quarterly</span>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-6" style={{ borderColor: 'rgba(229,197,116,0.15)' }}>
            {submitted ? (
              <div className="text-center py-6" data-testid="toolkit-form-success">
                <CheckCircle2 size={40} className="mx-auto text-[var(--blx-gold-3)] mb-4" />
                <h3 className="text-base font-bold tracking-wider mb-2">You're In</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6" style={{ textTransform: 'none' }}>
                  Access your toolkit resources below:
                </p>
                <div className="space-y-2">
                  <Link to="/calculator" className="btn-gold w-full px-4 py-3 text-xs font-bold tracking-[0.15em] flex items-center justify-center gap-2">
                    Open Calculator <ArrowRight size={12} />
                  </Link>
                  <Link to="/resources" className="btn-glass w-full px-4 py-3 text-xs font-bold tracking-[0.15em] flex items-center justify-center gap-2">
                    Browse All Resources <ArrowRight size={12} />
                  </Link>
                  <Link to="/for-architects" className="btn-glass w-full px-4 py-3 text-xs font-bold tracking-[0.15em] flex items-center justify-center gap-2">
                    Download Spec Packs <Download size={12} />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">GET INSTANT ACCESS</div>
                <form onSubmit={handleSubmit} className="space-y-3" data-testid="toolkit-form">
                  <div>
                    <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} className="input-luxury w-full" placeholder="Full name *" data-testid="toolkit-field-name" />
                  </div>
                  <div>
                    <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} className="input-luxury w-full" placeholder="Work email *" data-testid="toolkit-field-email" />
                  </div>
                  <div>
                    <input type="text" value={form.company} onChange={e => updateField('company', e.target.value)} className="input-luxury w-full" placeholder="Company / Firm *" data-testid="toolkit-field-company" />
                  </div>
                  <div>
                    <select value={form.role} onChange={e => updateField('role', e.target.value)} className="input-luxury w-full" data-testid="toolkit-field-role">
                      <option value="">Your role *</option>
                      <option value="Architect">Architect</option>
                      <option value="Interior Designer">Interior Designer</option>
                      <option value="AV Consultant">AV Consultant</option>
                      <option value="Lighting Designer">Lighting Designer</option>
                      <option value="MEP Consultant">MEP Consultant</option>
                      <option value="Contractor">Contractor</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <select value={form.project_type} onChange={e => updateField('project_type', e.target.value)} className="input-luxury w-full" data-testid="toolkit-field-project-type">
                      <option value="">Project type (optional)</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Retail">Retail</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Transport">Transport</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Mixed-Use">Mixed-Use</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {error && <p className="text-red-400 text-xs" data-testid="toolkit-form-error">{error}</p>}
                  <button type="submit" disabled={submitting} className={`btn-gold w-full px-6 py-3.5 text-xs font-bold tracking-[0.15em] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="toolkit-submit-button">
                    {submitting ? 'Processing...' : 'Get Toolkit Access'}
                  </button>
                  <p className="text-[0.5rem] text-[var(--blx-muted)] text-center" style={{ textTransform: 'none' }}>
                    No spam. Your data is confidential.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Trust */}
        <div className="text-center mt-12">
          <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3">TRUSTED BY SPECIFIERS AT</div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.6875rem] text-[var(--blx-text-2)]">
            {['Gensler', 'AECOM', 'KEO', 'Perkins&Will', 'HBA', 'LW Design', 'Aedas', 'Foster + Partners'].map(firm => (
              <span key={firm}>{firm}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
