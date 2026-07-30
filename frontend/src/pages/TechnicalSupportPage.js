import React, { useState } from 'react';
import HoneypotFields from '../components/HoneypotFields';
import { getRecaptchaHeaders } from '../utils/recaptcha';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle, Phone, Mail, Clock, AlertTriangle, Shield, Zap, MonitorCheck, HelpCircle } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

const ISSUE_TYPES = [
  'Display Not Turning On',
  'Dead Pixels / LED Failure',
  'Image Quality Issues',
  'Colour Calibration',
  'Connectivity / Signal Issues',
  'Software / CMS Issues',
  'Power Supply Problems',
  'Physical Damage',
  'Preventive Maintenance',
  'Warranty Claim',
  'Other',
];

const SUPPORT_TIERS = [
  { icon: Clock, title: 'Standard Support', time: '24 Hours', desc: 'For general inquiries and non-critical issues. Response within 1 business day.', color: 'var(--blx-gold-3)' },
  { icon: Zap, title: 'Priority Support', time: '4 Hours', desc: 'For operational issues affecting display performance. Expedited response.', color: '#f59e0b' },
  { icon: AlertTriangle, title: 'Emergency Support', time: '1 Hour', desc: 'For critical failures in live environments. Immediate response and on-site dispatch.', color: '#ef4444' },
];

const SERVICES = [
  { icon: MonitorCheck, title: 'Remote Diagnostics', desc: 'Our engineers can remotely access and diagnose control system issues.' },
  { icon: Wrench, title: 'On-Site Repair', desc: 'Certified technicians dispatched to your location across the UAE.' },
  { icon: Shield, title: 'Warranty Service', desc: 'Full warranty coverage with free replacement of defective components.' },
  { icon: HelpCircle, title: 'Training', desc: 'On-site operator training for your team on display management.' },
];

export default function TechnicalSupportPage() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    product: '', issue_type: '', description: '', urgency: 'normal', fax: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const rcHeaders = await getRecaptchaHeaders('technical_support');
      const res = await fetch(`${API}/api/technical-support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...rcHeaders },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Failed to submit. For urgent issues, call us directly at +971 4 258 5754.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20" data-testid="technical-support-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={16} className="text-[var(--blx-gold-3)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--blx-gold-3)] font-bold">TECHNICAL SUPPORT</span>
          </div>
          <h1 data-testid="technical-support-title">Technical Support</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-3 tracking-wider leading-relaxed max-w-2xl">
            Our dedicated technical team provides fast, reliable support for all Brightluxx LED displays. From remote diagnostics to on-site repair, we keep your screens running 24/7.
          </p>
        </div>

        {/* Support Tiers */}
        <div className="mb-16">
          <h2 className="text-base font-bold mb-8 tracking-wider">Support Response Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUPPORT_TIERS.map((t) => (
              <div key={t.title} className="glass-panel p-6 text-center" data-testid={`tier-${t.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                  <t.icon size={22} style={{ color: t.color }} />
                </div>
                <h3 className="text-sm font-bold mb-1">{t.title}</h3>
                <div className="text-lg font-bold mb-2" style={{ color: t.color }}>{t.time}</div>
                <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-base font-bold mb-8 tracking-wider">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass-panel p-5" data-testid={`service-${s.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <s.icon size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold mb-1.5 tracking-wider">{s.title}</h3>
                <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6" style={{ borderColor: '#ef444450', borderWidth: '2px' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-[#ef4444]" />
                <h3 className="text-sm font-bold">Emergency?</h3>
              </div>
              <p className="text-[11px] text-[var(--blx-text-2)] mb-4 leading-relaxed">
                For critical display failures in live venues, contact us immediately.
              </p>
              <a href="tel:+97142585754" className="btn-gold w-full text-center flex items-center justify-center gap-2 text-xs" data-testid="emergency-call-button">
                <Phone size={14} /> Call +971 4 258 5754
              </a>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent('URGENT: I need technical support for my Brightluxx LED display')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass w-full text-center flex items-center justify-center gap-2 text-xs mt-3"
                data-testid="emergency-whatsapp-button"
              >
                WhatsApp Support
              </a>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-base font-bold mb-4">Before You Submit</h3>
              <ul className="space-y-3">
                {[
                  'Note your display model and serial number',
                  'Check all power connections are secure',
                  'Restart the control system (if accessible)',
                  'Take a photo/video of the issue',
                  'Check if issue affects all or specific modules',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[11px] text-[var(--blx-text-2)]">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-sm font-bold mb-3">Contact Support</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[var(--blx-gold-3)]" />
                  <a href="tel:+97142585754" className="text-[11px] text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)]">+971 4 258 5754</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[var(--blx-gold-3)]" />
                  <a href="mailto:support@brightluxx.com" className="text-[11px] text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)]">support@brightluxx.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-panel p-8 text-center" style={{ borderColor: 'var(--blx-gold-2)' }} data-testid="support-success">
                <div className="w-14 h-14 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#0B0B0B]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Ticket Created</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6 tracking-wider">
                  {formData.urgency === 'urgent'
                    ? 'Our technical team will respond within 1-4 hours.'
                    : 'Our technical team will respond within 24 hours.'}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-glass px-6 py-3" data-testid="support-submit-another">
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8" data-testid="support-form">
                <h3 className="text-lg font-bold mb-6">Submit a Support Request</h3>

                {error && (
                  <div className="mb-6 p-3 bg-[var(--blx-danger)]/10 border border-[var(--blx-danger)]/50 rounded-lg text-sm text-[var(--blx-danger)]" data-testid="support-form-error">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold mb-1.5 tracking-wider">Full Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" data-testid="support-input-name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold mb-1.5 tracking-wider">Company <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full" data-testid="support-input-company" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold mb-1.5 tracking-wider">Email <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" data-testid="support-input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold mb-1.5 tracking-wider">Phone <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full" data-testid="support-input-phone" />
                  </div>
                  <div>
                    <label htmlFor="product" className="block text-xs font-bold mb-1.5 tracking-wider">Product / Model</label>
                    <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} className="w-full" placeholder="e.g., BLX P2.5 Indoor Panel" data-testid="support-input-product" />
                  </div>
                  <div>
                    <label htmlFor="issue_type" className="block text-xs font-bold mb-1.5 tracking-wider">Issue Type <span className="text-[var(--blx-danger)]">*</span></label>
                    <select id="issue_type" name="issue_type" value={formData.issue_type} onChange={handleChange} required className="w-full" data-testid="support-input-issue-type">
                      <option value="">Select Issue</option>
                      {ISSUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="urgency" className="block text-xs font-bold mb-1.5 tracking-wider">Urgency Level <span className="text-[var(--blx-danger)]">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'normal', label: 'Standard', sub: '24h Response', color: 'var(--blx-gold-3)' },
                      { value: 'priority', label: 'Priority', sub: '4h Response', color: '#f59e0b' },
                      { value: 'urgent', label: 'Emergency', sub: '1h Response', color: '#ef4444' },
                    ].map((u) => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: u.value })}
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          formData.urgency === u.value
                            ? 'border-[var(--blx-gold-3)] bg-[var(--blx-gold-3)]/5'
                            : 'border-[var(--blx-border)] hover:border-[var(--blx-gold-2)]'
                        }`}
                        data-testid={`urgency-${u.value}`}
                      >
                        <div className="text-xs font-bold mb-0.5" style={{ color: formData.urgency === u.value ? u.color : 'inherit' }}>{u.label}</div>
                        <div className="text-[10px] text-[var(--blx-text-2)]">{u.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="description" className="block text-xs font-bold mb-1.5 tracking-wider">Issue Description <span className="text-[var(--blx-danger)]">*</span></label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full resize-none" placeholder="Describe the issue in detail: when it started, what you've tried, any error messages..." data-testid="support-input-description" />
                </div>

                <HoneypotFields value={formData.fax} onChange={handleChange} />
                <button type="submit" disabled={loading} className={`btn-gold w-full py-3.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="support-submit-button">
                  {loading ? 'Submitting...' : 'Submit Support Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
