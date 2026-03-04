import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, CheckCircle, FileText, MessageCircle, Phone, Shield, Clock, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { SectionDivider } from '../components/KnowledgeBase';

const STEPS = [
  { num: '01', title: 'Upload Your Specification', desc: 'Share your BOQ, drawings, or spec sheet. We accept PDF, DWG, XLS, and image files.' },
  { num: '02', title: 'We Analyse & Match', desc: 'Our technical team reviews the specification and identifies equivalent products with cost savings.' },
  { num: '03', title: 'Receive Comparison Report', desc: 'Within 24 hours, get a detailed comparison document showing spec-for-spec equivalence.' },
  { num: '04', title: 'Consultant Approval Support', desc: 'We provide supporting documentation to help you get the substitution approved by the design consultant.' },
];

export default function SpecSubstitution() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', projectName: '', description: '',
  });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const API = process.env.REACT_APP_BACKEND_URL || '';

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      files.forEach(f => fd.append('files', f));

      const res = await fetch(`${API}/api/spec-substitution`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="pb-20" data-testid="spec-sub-success">
        <SEO title="Specification Submitted — Brightluxx" description="Your specification has been submitted for review." path="/spec-substitution" />
        <div className="relative pt-24 pb-8">
          <div className="absolute inset-0 blx-led-grid opacity-30" />
          <div className="relative max-w-[600px] mx-auto px-4 text-center pt-16">
            <CheckCircle size={48} className="text-[var(--blx-gold-3)] mx-auto mb-6" />
            <h1 className="text-2xl font-bold tracking-wider mb-4">Specification Received</h1>
            <p className="text-sm text-[var(--blx-text-2)] mb-8 leading-relaxed">
              Our technical team will review your specification and provide a detailed comparison report within 24 hours. We'll contact you at <strong className="text-[var(--blx-text)]">{formData.email}</strong>.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/value-engineering" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <ArrowRight size={14} /> Value Engineering Hub
              </Link>
              <a href="https://wa.me/971559954274" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20" data-testid="spec-substitution-page">
      <SEO
        title="Free LED Specification Substitution — Brightluxx UAE"
        description="Upload your LED display specification, BOQ, or tender drawing. Receive equivalent alternatives with cost savings and consultant-ready comparison documents within 24 hours."
        path="/spec-substitution"
      />

      {/* Hero */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/value-engineering" className="hover:text-[var(--blx-text-2)] transition-colors">Value Engineering</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">Spec Substitution</span>
          </div>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FREE SPECIFICATION REVIEW SERVICE</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Specification<br/>Substitution Support</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed">
            Upload your BOQ or spec sheet. We'll provide equivalent alternatives with cost savings and consultant-ready comparison documents — within 24 hours, free of charge.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* How it works */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STEPS.map((step, i) => (
            <div key={i} className="glass-panel p-5" data-testid={`spec-sub-step-${i}`}>
              <div className="text-2xl font-bold text-[var(--blx-gold-3)] opacity-40 mb-2">{step.num}</div>
              <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{step.title}</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Form */}
          <div>
            <div className="glass-panel p-8" data-testid="spec-sub-form-panel">
              <h2 className="text-lg font-bold tracking-wider mb-2">Submit Your Specification</h2>
              <p className="text-xs text-[var(--blx-text-2)] mb-6">
                Fill in the details below and upload your BOQ, specification, or tender drawings. Our team will respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">YOUR NAME *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors" data-testid="spec-sub-name" />
                  </div>
                  <div>
                    <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">WORK EMAIL *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors" data-testid="spec-sub-email" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">COMPANY *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors" data-testid="spec-sub-company" />
                  </div>
                  <div>
                    <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">PHONE</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors" data-testid="spec-sub-phone" />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">PROJECT NAME</label>
                  <input type="text" name="projectName" value={formData.projectName} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors" data-testid="spec-sub-project" placeholder="e.g., Marriott Al Jaddaf Lobby LED Wall" />
                </div>

                <div>
                  <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">DESCRIPTION / NOTES</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors resize-none" data-testid="spec-sub-description"
                    placeholder="Describe the specification you want alternatives for. Include pixel pitch, size, indoor/outdoor, brand specified..." />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">UPLOAD FILES (BOQ, SPEC SHEET, DRAWINGS)</label>
                  <div className="border-2 border-dashed border-[var(--blx-border)] rounded-xl p-6 text-center hover:border-[var(--blx-gold-3)] transition-colors cursor-pointer relative" data-testid="spec-sub-upload-zone">
                    <input type="file" multiple accept=".pdf,.xlsx,.xls,.doc,.docx,.dwg,.jpg,.jpeg,.png" onChange={handleFiles}
                      className="absolute inset-0 opacity-0 cursor-pointer" data-testid="spec-sub-file-input" />
                    <Upload size={24} className="text-[var(--blx-muted)] mx-auto mb-2" />
                    <p className="text-xs text-[var(--blx-text-2)]">
                      Drop files here or click to browse
                    </p>
                    <p className="text-[0.5rem] text-[var(--blx-muted)] mt-1">
                      PDF, Excel, Word, DWG, Images — Max 5 files
                    </p>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--blx-border)' }}>
                          <div className="flex items-center gap-2">
                            <FileText size={14} className="text-[var(--blx-gold-3)]" />
                            <span className="text-xs">{f.name}</span>
                            <span className="text-[0.5rem] text-[var(--blx-muted)]">({(f.size / 1024).toFixed(0)} KB)</span>
                          </div>
                          <button type="button" onClick={() => removeFile(i)} className="text-[var(--blx-muted)] hover:text-red-400 text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-lg text-xs font-bold tracking-[0.15em] transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
                  data-testid="spec-sub-submit-btn">
                  {loading ? 'Submitting...' : 'Submit for Free Review'}
                  {!loading && <ArrowRight size={14} />}
                </button>

                <p className="text-[0.5rem] text-[var(--blx-muted)] text-center">
                  100% free. No obligation. Response within 24 hours. Your data is confidential.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">WHAT YOU'LL RECEIVE</h3>
              <div className="space-y-3">
                {[
                  'Spec-for-spec product comparison',
                  'Cost saving analysis (% and absolute)',
                  'Technical compliance documentation',
                  'Consultant-ready substitution letter',
                  'Sample/demo arrangement if needed',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-[var(--blx-text-2)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">PREFER TO TALK?</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4">
                Send us the spec via WhatsApp or call directly. We'll respond immediately during business hours.
              </p>
              <div className="space-y-2">
                <a href="https://wa.me/971559954274" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors justify-center" data-testid="spec-sub-whatsapp">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559954274"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold border border-[var(--blx-border)] text-[var(--blx-text-2)] hover:border-[var(--blx-border-2)] transition-colors justify-center" data-testid="spec-sub-call">
                  <Phone size={14} /> +971 4 258 5754
                </a>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">CONTRACTOR RESOURCES</h3>
              <div className="space-y-1">
                {[
                  { to: '/value-engineering', label: 'Value Engineering Hub' },
                  { to: '/contractors/dvled-vs-lcd', label: 'dvLED vs LCD Comparison' },
                  { to: '/contractors/led-cost-per-sqm', label: 'LED Cost per sqm' },
                  { to: '/contractors/led-installation-guide', label: 'Installation Guide' },
                  { to: '/calculator', label: 'Screen Calculator' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
