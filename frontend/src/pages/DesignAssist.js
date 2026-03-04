import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PenTool, Lightbulb, Ruler, DollarSign, FileText, Monitor, Users, Clock, MessageCircle, Phone, Building2 } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

const SERVICES = [
  { icon: Lightbulb, title: 'Concept Consultation', desc: 'We review your design intent and recommend where LED displays will create the most impact — lobby feature walls, media facades, wayfinding networks, or immersive experiences.' },
  { icon: Ruler, title: 'Technical Specification', desc: 'We write the LED display specification section for your tender documents. Pixel pitch, brightness, mounting, power, ventilation, and control system requirements — all UAE-compliant.' },
  { icon: DollarSign, title: 'Budget Estimates', desc: 'Early-stage budgetary pricing so you can advise your client before tender. We provide $/sqm estimates by technology tier with total project cost projections.' },
  { icon: FileText, title: 'Technical Drawings', desc: 'Section details, elevation drawings, and integration diagrams showing how LED displays interface with your architecture — structural support, cable routing, and service access.' },
  { icon: Monitor, title: 'Content Strategy', desc: 'Guidance on content resolution, aspect ratios, and CMS requirements. We help ensure the display specification matches the intended content experience.' },
  { icon: PenTool, title: 'Design Development', desc: 'From concept to tender-ready specification. We support your team through schematic design, design development, and construction documentation phases.' },
];

const PROCESS = [
  { step: '01', title: 'Brief', desc: 'Share your design concept, project scope, and where you envision digital displays. A 15-minute call or email is enough to start.', time: '15 min' },
  { step: '02', title: 'Analysis', desc: 'We analyse viewing distances, ambient light, structural constraints, and budget parameters. We recommend technology, pixel pitch, and mounting approach.', time: '2-3 days' },
  { step: '03', title: 'Proposal', desc: 'You receive a Design Assist Report: recommended specifications, budgetary pricing, integration diagrams, and specification language for your tender documents.', time: 'Included' },
  { step: '04', title: 'Support', desc: 'We remain available throughout your design phases. Specification updates, contractor queries, and value engineering support — all at no cost until project award.', time: 'Ongoing' },
];

const FIRM_TYPES = [
  { title: 'Concept Architects', firms: ['Gensler', 'Aedas', 'Foster + Partners', 'Killa Design', 'Perkins&Will', 'RSP Architects'], desc: 'Decide where screens go in the building concept' },
  { title: 'Interior Designers', firms: ['HBA', 'LW Design Group', 'Bishop Design', 'Godwin Austen Johnson', 'OBMI'], desc: 'Design feature walls, media walls, and immersive spaces' },
  { title: 'AV / Technology Consultants', firms: ['Electrosonic', 'AVI-SPL', 'Diversified'], desc: 'Define technical LED display specifications' },
  { title: 'Engineering Consultants', firms: ['AECOM', 'KEO International', 'Dar Al-Handasah', 'Dewan Architects'], desc: 'Approve system compliance and infrastructure' },
];

export default function DesignAssist() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', phone: '', project_type: '', project_stage: '', message: '' });
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
      const res = await fetch(`${API}/api/design-assist/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.detail || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="pb-20" data-testid="design-assist-page">
      <SEO
        title="Design Assist for Architects — Free LED Specification Support | Brightluxx"
        description="Free design assist service for architects and consultants specifying LED displays in UAE/GCC projects. Concept consultation, technical specifications, budget estimates, and integration drawings."
        path="/design-assist"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Design Assist for Architects",
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "description": "Free specification support for architecture and consulting firms designing projects with LED displays in UAE/GCC.",
          "areaServed": { "@type": "Place", "name": "UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman" },
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "AED", "description": "Free until project award" }
        }}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FOR ARCHITECTS & CONSULTANTS</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Design Assist</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-3">
            Free specification support for architecture and consulting firms designing projects with LED displays. From concept consultation to tender-ready specifications — we become an extension of your design team.
          </p>
          <p className="text-xs text-[var(--blx-gold-3)] font-bold tracking-wider mb-8">
            No cost. No obligation. Available across UAE and GCC.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#request" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="da-hero-cta">
              Request Design Assist <ArrowRight size={14} />
            </a>
            <a href="#services" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              View Services <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Why Design Assist */}
        <div className="glass-panel p-6 sm:p-8 mb-16" style={{ borderColor: 'rgba(229,197,116,0.15)' }}>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--blx-gold-3)] mb-1">87%</div>
              <div className="text-xs text-[var(--blx-text-2)]">of LED display specifications in GCC projects are written or influenced by the architect's design team</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--blx-gold-3)] mb-1">3x</div>
              <div className="text-xs text-[var(--blx-text-2)]">projects with early design assist are 3x more likely to specify the correct technology and avoid costly changes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--blx-gold-3)] mb-1">AED 0</div>
              <div className="text-xs text-[var(--blx-text-2)]">Design assist is completely free until project award — our investment in becoming your specification partner</div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div id="services" className="mb-16 scroll-mt-24">
          <h2 className="text-base font-bold tracking-wider mb-6">What We Provide</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((svc, i) => (
              <div key={i} className="glass-panel p-5" data-testid={`da-service-${i}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <svc.icon size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{svc.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-base font-bold tracking-wider mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <div key={i} className="glass-panel p-5 relative">
                <div className="text-3xl font-bold text-[var(--blx-gold-3)] opacity-20 mb-3">{p.step}</div>
                <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{p.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-3">{p.desc}</p>
                <div className="flex items-center gap-1 text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">
                  <Clock size={9} /> {p.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Work With */}
        <div className="mb-16">
          <h2 className="text-base font-bold tracking-wider mb-2">Who We Work With</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-6">
            We support all four types of specifiers involved in LED display projects across the GCC.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIRM_TYPES.map((type, i) => (
              <div key={i} className="glass-panel p-5" data-testid={`da-firm-type-${i}`}>
                <h3 className="text-xs font-bold tracking-[0.12em] mb-1">{type.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-gold-3)] mb-3">{type.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {type.firms.map(firm => (
                    <span key={firm} className="px-2.5 py-1 text-[0.5625rem] tracking-wider text-[var(--blx-muted)] rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {firm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div id="request" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              <h2 className="text-base font-bold tracking-wider mb-2">Request Design Assist</h2>
              <p className="text-sm text-[var(--blx-text-2)] mb-6">
                Tell us about your project and we'll respond within 24 hours with an initial assessment and next steps. All information is treated confidentially.
              </p>

              {submitted ? (
                <div className="glass-panel p-8 text-center" data-testid="da-form-success">
                  <CheckCircle2 size={40} className="mx-auto text-[var(--blx-gold-3)] mb-4" />
                  <h3 className="text-base font-bold tracking-wider mb-2">Request Received</h3>
                  <p className="text-sm text-[var(--blx-text-2)]">
                    Our design assist team will contact you within 24 hours. We look forward to supporting your project.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="da-booking-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">YOUR NAME *</label>
                      <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} className="input-luxury w-full" placeholder="Full name" data-testid="da-field-name" />
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">WORK EMAIL *</label>
                      <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} className="input-luxury w-full" placeholder="you@firm.com" data-testid="da-field-email" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">FIRM / COMPANY *</label>
                      <input type="text" value={form.company} onChange={e => updateField('company', e.target.value)} className="input-luxury w-full" placeholder="Your firm" data-testid="da-field-company" />
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">YOUR ROLE *</label>
                      <select value={form.role} onChange={e => updateField('role', e.target.value)} className="input-luxury w-full" data-testid="da-field-role">
                        <option value="">Select role</option>
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="Design Director">Design Director</option>
                        <option value="Associate Architect">Associate Architect</option>
                        <option value="AV Consultant">AV Consultant</option>
                        <option value="Lighting Designer">Lighting Designer</option>
                        <option value="MEP Consultant">MEP Consultant</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">PROJECT TYPE</label>
                      <select value={form.project_type} onChange={e => updateField('project_type', e.target.value)} className="input-luxury w-full" data-testid="da-field-project-type">
                        <option value="">Select type</option>
                        <option value="Hospitality">Hospitality / Hotel</option>
                        <option value="Retail">Retail / Mall</option>
                        <option value="Corporate">Corporate / Office</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Transport">Transport / Airport</option>
                        <option value="Entertainment">Entertainment / Museum</option>
                        <option value="Mixed-Use">Mixed-Use Development</option>
                        <option value="Residential">Residential</option>
                        <option value="Education">Education / Campus</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">PROJECT STAGE</label>
                      <select value={form.project_stage} onChange={e => updateField('project_stage', e.target.value)} className="input-luxury w-full" data-testid="da-field-project-stage">
                        <option value="">Select stage</option>
                        <option value="Concept">Concept Design</option>
                        <option value="Schematic">Schematic Design</option>
                        <option value="Design Development">Design Development</option>
                        <option value="Construction Docs">Construction Documentation</option>
                        <option value="Tender">Tender / Procurement</option>
                        <option value="Pre-concept">Pre-concept / Feasibility</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">PROJECT BRIEF</label>
                    <textarea value={form.message} onChange={e => updateField('message', e.target.value)} className="input-luxury w-full h-28 resize-none" placeholder="Tell us about the project — location, scale, where you envision LED displays, and any technical requirements or constraints..." data-testid="da-field-message" />
                  </div>
                  {error && <p className="text-red-400 text-xs" data-testid="da-form-error">{error}</p>}
                  <button type="submit" disabled={submitting} className={`btn-gold px-8 py-3.5 text-xs font-bold tracking-[0.15em] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="da-submit-button">
                    {submitting ? 'Submitting...' : 'Request Design Assist'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="glass-panel p-5" style={{ borderColor: 'rgba(229,197,116,0.15)' }}>
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">WHAT'S INCLUDED — FREE</div>
                <ul className="space-y-2.5">
                  {['Initial concept consultation (15 min call)', 'Technology & pixel pitch recommendation', 'Budgetary pricing estimate', 'Integration diagrams & section details', 'Specification language for tender docs', 'Ongoing support through design phases', 'CPD sessions for your team'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.6875rem] text-[var(--blx-text-2)]">
                      <CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">QUICK CONTACT</div>
                <div className="space-y-3">
                  <a href="https://wa.me/971559954274?text=Hi%2C+I'm+an+architect+and+need+design+assist+for+an+LED+display+project." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                    <MessageCircle size={14} className="text-[var(--blx-gold-3)]" /> WhatsApp: +971 55 991 0711
                  </a>
                  <a href="tel:+971559954274" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                    <Phone size={14} className="text-[var(--blx-gold-3)]" /> Call: +971 55 991 0711
                  </a>
                </div>
              </div>

              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER RESOURCES</div>
                <div className="space-y-2">
                  {[
                    { label: 'For Architects Hub', path: '/for-architects' },
                    { label: 'Technology Hub', path: '/technology' },
                    { label: 'Screen Calculator', path: '/calculator' },
                    { label: 'Case Studies', path: '/case-studies' },
                    { label: 'CPD Programme', path: '/cpd-programme' },
                    { label: 'Resource Library', path: '/resources' },
                  ].map(link => (
                    <Link key={link.path} to={link.path} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                      <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
