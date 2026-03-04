import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Clock, Award, Monitor, Building2, Stethoscope, Landmark, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

const SESSIONS = [
  {
    id: 'microled-vs-cob',
    title: 'MicroLED vs COB vs MiP — Technology Selection for Specifiers',
    duration: '60 min',
    icon: Monitor,
    desc: 'A deep-dive into the three dominant fine-pitch LED technologies. Covers contrast, colour accuracy, serviceability, and total cost of ownership. Includes hands-on comparison with live display samples.',
    outcomes: ['Understand the optical and structural differences between MicroLED, COB, and MiP', 'Apply a technology selection framework based on viewing distance, environment, and budget', 'Specify the correct technology for 5 common commercial scenarios'],
    audience: 'Architects, Interior Designers, AV Consultants',
  },
  {
    id: 'pixel-pitch-masterclass',
    title: 'Pixel Pitch Selection Masterclass',
    duration: '45 min',
    icon: GraduationCap,
    desc: 'How to specify the right pixel pitch for any application. Covers the viewing distance formula, content type considerations, and how to avoid over-specification (wasting budget) or under-specification (poor image quality).',
    outcomes: ['Calculate minimum pixel pitch using the 1.5x viewing distance rule', 'Adjust specifications for content type (text, video, data visualization)', 'Identify opportunities to value-engineer pitch without compromising quality'],
    audience: 'Architects, AV Consultants, Contractors',
  },
  {
    id: 'led-for-healthcare',
    title: 'LED Displays in Healthcare Environments',
    duration: '45 min',
    icon: Stethoscope,
    desc: 'Specification requirements unique to healthcare: EMI compliance, antimicrobial surfaces, low-brightness modes, HIS integration, and wayfinding system design. Includes case study from Cleveland Clinic Abu Dhabi.',
    outcomes: ['Specify LED displays that meet healthcare EMI and safety standards', 'Design effective patient wayfinding systems with digital signage', 'Integrate displays with Hospital Information Systems (HIS)'],
    audience: 'Healthcare Architects, MEP Consultants, Hospital IT',
  },
  {
    id: 'led-for-hospitality',
    title: 'Specifying LED for 5-Star Hospitality',
    duration: '60 min',
    icon: Building2,
    desc: 'Creating signature digital experiences in luxury hotels. Covers lobby feature walls, conference facilities, F&B digital art, and outdoor pool/beach displays. Includes specification templates and content strategy guidance.',
    outcomes: ['Specify lobby feature walls that enhance guest experience scores', 'Design multi-purpose conference and event LED solutions', 'Understand IP rating and brightness requirements for semi-outdoor hospitality areas'],
    audience: 'Hospitality Architects, Interior Designers, Owner Representatives',
  },
  {
    id: 'transparent-creative-led',
    title: 'Transparent & Creative LED — Beyond Rectangles',
    duration: '45 min',
    icon: Landmark,
    desc: 'Specifying non-standard LED formats: transparent mesh for glass facades, curved displays, cylindrical columns, ceiling installations, and 3D anamorphic corners. Structural and electrical considerations included.',
    outcomes: ['Calculate transparency requirements for facade applications', 'Specify structural support for creative LED installations', 'Understand electrical and cooling requirements for large-format creative displays'],
    audience: 'Architects, Facade Consultants, Structural Engineers',
  },
  {
    id: 'dvled-vs-lcd',
    title: 'dvLED vs LCD — Making the Business Case',
    duration: '45 min',
    icon: Award,
    desc: 'A total cost of ownership comparison between direct-view LED and traditional LCD video walls. Covers lifespan, maintenance costs, brightness degradation, bezel visibility, and energy consumption over 5 and 10 year periods.',
    outcomes: ['Build a 5-year and 10-year TCO comparison for dvLED vs LCD', 'Quantify the hidden costs of LCD video walls (lamp replacement, bezels, downtime)', 'Present a compelling business case for dvLED to clients and stakeholders'],
    audience: 'Contractors, Project Managers, AV Consultants',
  },
];

const STATS = [
  { value: '120+', label: 'Sessions Delivered' },
  { value: '1,800+', label: 'Professionals Trained' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '45+', label: 'Architecture Firms' },
];

export default function CpdProgramme() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', phone: '', preferred_topic: '', preferred_format: 'in-office', group_size: '', preferred_date: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role || !form.preferred_topic) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/cpd/request`, {
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
    <div className="pb-20" data-testid="cpd-programme-page">
      <SEO
        title="CPD / Lunch & Learn Programme — LED Display Training | Brightluxx"
        description="Book a free CPD-accredited Lunch & Learn session for your architecture, engineering, or consulting team. 6 specialist topics covering MicroLED, pixel pitch, healthcare LED, hospitality, and more."
        path="/cpd-programme"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Brightluxx CPD Programme",
          "description": "Free CPD-accredited Lunch & Learn sessions for architects and consultants on LED display technology.",
          "areaServed": { "@type": "Place", "name": "UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman" }
        }}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">PROFESSIONAL DEVELOPMENT</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">CPD / Lunch & Learn Programme</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8">
            Free, CPD-accredited sessions delivered at your office or virtually. Our technical team educates architects, consultants, and contractors on LED display technology — from specification basics to advanced application design.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#book-session" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="cpd-hero-book-cta">
              Book a Session <ArrowRight size={14} />
            </a>
            <a href="#sessions" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="cpd-hero-topics-cta">
              View Topics <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <div key={i} className="glass-panel p-5 text-center" data-testid={`cpd-stat-${i}`}>
              <div className="text-xl sm:text-2xl font-bold text-[var(--blx-gold-3)] mb-1">{stat.value}</div>
              <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-base font-bold tracking-wider mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Choose a Topic', desc: 'Select from 6 specialist sessions or request a custom topic tailored to your current project.' },
              { step: '02', title: 'We Come to You', desc: 'Our technical team delivers the session at your office with lunch provided, or virtually via Teams/Zoom.' },
              { step: '03', title: 'Earn CPD Hours', desc: 'Each attendee receives a CPD certificate. Sessions count towards professional development requirements.' },
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6">
                <div className="text-2xl font-bold text-[var(--blx-gold-3)] opacity-30 mb-3">{item.step}</div>
                <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{item.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programme Formats */}
        <div className="mb-16">
          <h2 className="text-base font-bold tracking-wider mb-6">Programme Formats</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <MapPin size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.12em]">In-Office Lunch & Learn</h3>
                  <div className="text-[0.5625rem] text-[var(--blx-muted)]">AT YOUR PREMISES</div>
                </div>
              </div>
              <ul className="space-y-1.5 text-[0.6875rem] text-[var(--blx-text-2)]">
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Presentation with live LED display samples</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Lunch provided for all attendees</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Ideal for teams of 5-30 people</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Available across UAE and GCC</li>
              </ul>
            </div>
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Monitor size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.12em]">Virtual Session</h3>
                  <div className="text-[0.5625rem] text-[var(--blx-muted)]">MICROSOFT TEAMS / ZOOM</div>
                </div>
              </div>
              <ul className="space-y-1.5 text-[0.6875rem] text-[var(--blx-text-2)]">
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Full presentation with screen sharing</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Interactive Q&A session included</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> Recording provided for your team</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> No minimum group size</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Session Topics */}
        <div id="sessions" className="mb-16">
          <h2 className="text-base font-bold tracking-wider mb-6">Available Sessions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SESSIONS.map(session => (
              <div key={session.id} className="glass-panel p-6" data-testid={`cpd-session-${session.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <session.icon size={18} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">
                    <Clock size={10} /> {session.duration}
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-wider mb-2">{session.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4">{session.desc}</p>
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">LEARNING OUTCOMES</div>
                <ul className="space-y-1.5 mb-4">
                  {session.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.625rem] text-[var(--blx-text-2)]">
                      <CheckCircle2 size={10} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> {o}
                    </li>
                  ))}
                </ul>
                <div className="text-[0.5625rem] text-[var(--blx-muted)] flex items-center gap-1.5">
                  <Users size={10} /> {session.audience}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div id="book-session" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            <div>
              <h2 className="text-base font-bold tracking-wider mb-2">Book a Session</h2>
              <p className="text-sm text-[var(--blx-text-2)] mb-6">
                All sessions are completely free. Submit your request and our team will contact you within 24 hours to confirm the date and logistics.
              </p>

              {submitted ? (
                <div className="glass-panel p-8 text-center" data-testid="cpd-form-success">
                  <CheckCircle2 size={40} className="mx-auto text-[var(--blx-gold-3)] mb-4" />
                  <h3 className="text-base font-bold tracking-wider mb-2">Session Requested</h3>
                  <p className="text-sm text-[var(--blx-text-2)]">
                    Thank you! Our team will contact you within 24 hours to schedule your session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="cpd-booking-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">NAME *</label>
                      <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} className="input-luxury w-full" placeholder="Your full name" data-testid="cpd-field-name" />
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">WORK EMAIL *</label>
                      <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} className="input-luxury w-full" placeholder="you@company.com" data-testid="cpd-field-email" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">COMPANY *</label>
                      <input type="text" value={form.company} onChange={e => updateField('company', e.target.value)} className="input-luxury w-full" placeholder="Your company" data-testid="cpd-field-company" />
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">ROLE *</label>
                      <select value={form.role} onChange={e => updateField('role', e.target.value)} className="input-luxury w-full" data-testid="cpd-field-role">
                        <option value="">Select role</option>
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="AV Consultant">AV Consultant</option>
                        <option value="MEP Consultant">MEP Consultant</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Facilities Manager">Facilities Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">PREFERRED TOPIC *</label>
                    <select value={form.preferred_topic} onChange={e => updateField('preferred_topic', e.target.value)} className="input-luxury w-full" data-testid="cpd-field-topic">
                      <option value="">Select a session topic</option>
                      {SESSIONS.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Custom Topic">Custom Topic (describe in notes)</option>
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">FORMAT</label>
                      <select value={form.preferred_format} onChange={e => updateField('preferred_format', e.target.value)} className="input-luxury w-full" data-testid="cpd-field-format">
                        <option value="in-office">In-Office Lunch & Learn</option>
                        <option value="virtual">Virtual Session</option>
                        <option value="either">Either / Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">GROUP SIZE</label>
                      <select value={form.group_size} onChange={e => updateField('group_size', e.target.value)} className="input-luxury w-full" data-testid="cpd-field-group-size">
                        <option value="">Select</option>
                        <option value="1-5">1 — 5 people</option>
                        <option value="6-15">6 — 15 people</option>
                        <option value="16-30">16 — 30 people</option>
                        <option value="30+">30+ people</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">PREFERRED DATE</label>
                      <input type="text" value={form.preferred_date} onChange={e => updateField('preferred_date', e.target.value)} className="input-luxury w-full" placeholder="e.g. March 2026" data-testid="cpd-field-date" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1.5">ADDITIONAL NOTES</label>
                    <textarea value={form.message} onChange={e => updateField('message', e.target.value)} className="input-luxury w-full h-24 resize-none" placeholder="Any specific topics or project context you'd like us to cover..." data-testid="cpd-field-message" />
                  </div>
                  {error && <p className="text-red-400 text-xs" data-testid="cpd-form-error">{error}</p>}
                  <button type="submit" disabled={submitting} className={`btn-gold px-8 py-3.5 text-xs font-bold tracking-[0.15em] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="cpd-submit-button">
                    {submitting ? 'Submitting...' : 'Request Session'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">WHY ATTEND?</div>
                <ul className="space-y-3">
                  {[
                    'Earn CPD hours towards your professional requirements',
                    'Hands-on experience with latest LED display samples',
                    'Receive specification templates and cheat sheets',
                    'Direct access to our technical engineering team',
                    'Completely free — no obligations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.6875rem] text-[var(--blx-text-2)]">
                      <CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">RELATED RESOURCES</div>
                <div className="space-y-2">
                  <Link to="/technology" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Technology Hub
                  </Link>
                  <Link to="/for-architects" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> For Architects
                  </Link>
                  <Link to="/resources" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Resource Library
                  </Link>
                  <Link to="/case-studies" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Case Studies
                  </Link>
                </div>
              </div>

              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">COVERAGE AREA</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Dubai', 'Abu Dhabi', 'Sharjah', 'Riyadh', 'Jeddah', 'Doha', 'Manama', 'Kuwait City', 'Muscat'].map(city => (
                    <span key={city} className="flex items-center gap-1 px-2.5 py-1 text-[0.5625rem] tracking-wider text-[var(--blx-muted)] rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <MapPin size={8} /> {city}
                    </span>
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
