import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building2, MapPin, Users, CheckCircle, ArrowRight, Phone, Mail, Handshake, TrendingUp, ShieldCheck, Truck } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

const BRANDS = [
  {
    name: 'Metroplus Ads',
    region: 'UAE & GCC',
    description: 'Premium LED advertising solutions and outdoor digital signage across the UAE and Gulf region.',
    speciality: 'Outdoor Advertising & Digital Billboards',
  },
  {
    name: 'IHG Industry L.L.C',
    region: 'UAE & Middle East',
    description: 'Industrial-grade LED solutions, control rooms, and command centre displays for critical infrastructure.',
    speciality: 'Industrial & Control Room Displays',
  },
  {
    name: 'LED World',
    region: 'International',
    description: 'Global distribution of commercial LED displays for retail, hospitality, and corporate sectors.',
    speciality: 'Commercial LED Solutions',
  },
  {
    name: 'IHG Brand India',
    region: 'India & South Asia',
    description: 'South Asian distribution hub serving India, Sri Lanka, and Bangladesh markets with localized support.',
    speciality: 'South Asian Markets',
  },
];

const BENEFITS = [
  { icon: TrendingUp, title: 'Growing Market', desc: 'The GCC LED market is expanding 18% annually. Join a thriving industry.' },
  { icon: ShieldCheck, title: 'Proven Brand', desc: 'Established since 2005 with 500+ happy clients and 800+ projects delivered.' },
  { icon: Truck, title: 'Local Stock', desc: 'Dubai warehouse with ready inventory — no long lead times for your customers.' },
  { icon: Users, title: 'Full Support', desc: 'Training, marketing materials, and dedicated account management for partners.' },
];

export default function DistributionPage() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', city: '', business_type: '', experience: '', message: '',
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
      const res = await fetch(`${API}/api/franchise-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Failed to submit. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20" data-testid="distribution-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Handshake size={16} className="text-[var(--blx-gold-3)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--blx-gold-3)] font-bold">PARTNERSHIP OPPORTUNITIES</span>
          </div>
          <h1 data-testid="distribution-page-title">Distribution & Franchise</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-3 tracking-wider leading-relaxed max-w-2xl">
            Join the Brightluxx distribution network. We partner with established businesses across the GCC, Middle East, and international markets to deliver premium LED display solutions.
          </p>
        </div>

        {/* Distribution Brands */}
        <div className="mb-20">
          <h2 className="text-base font-bold mb-8 tracking-wider" data-testid="distribution-brands-heading">Our Distribution Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="glass-panel p-6 hover:border-[var(--blx-gold-2)] transition-all duration-300" data-testid={`brand-${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.15)' }}>
                    <Building2 size={18} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold mb-1">{brand.name}</h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Globe size={11} className="text-[var(--blx-gold-3)]" />
                      <span className="text-[10px] tracking-[0.15em] text-[var(--blx-text-2)]">{brand.region}</span>
                    </div>
                    <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-2">{brand.description}</p>
                    <span className="text-[10px] tracking-wider text-[var(--blx-gold-3)] font-bold">{brand.speciality}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-base font-bold mb-8 tracking-wider">Why Partner with Brightluxx</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="glass-panel p-5 text-center" data-testid={`benefit-${b.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <b.icon size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold mb-1.5 tracking-wider">{b.title}</h3>
                <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-base font-bold mb-4">Distribution Addresses</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold mb-0.5">Dubai (HQ)</div>
                    <div className="text-[11px] text-[var(--blx-text-2)]">Jebel Ali Industrial Area 1, Dubai, UAE</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold mb-0.5">Sales</div>
                    <a href="tel:+97142585754" className="text-[11px] text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)]">+971 4 258 5754</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold mb-0.5">Partnership Inquiries</div>
                    <a href="mailto:sales@brightluxx.com" className="text-[11px] text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)]">sales@brightluxx.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6" style={{ borderColor: 'var(--blx-gold-2)', borderWidth: '2px' }}>
              <h3 className="text-sm font-bold mb-3">Already a Supplier?</h3>
              <p className="text-[11px] text-[var(--blx-text-2)] mb-4 leading-relaxed">
                Register as a supplier to join our procurement network.
              </p>
              <Link to="/supplier-registration" className="btn-glass w-full text-center flex items-center justify-center gap-2 text-xs" data-testid="supplier-registration-link">
                Supplier Registration <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-panel p-8 text-center" style={{ borderColor: 'var(--blx-gold-2)' }} data-testid="distribution-success">
                <div className="w-14 h-14 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#0B0B0B]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Application Received</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6 tracking-wider">
                  Thank you for your interest! Our partnerships team will review your application and respond within 48 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-glass px-6 py-3" data-testid="distribution-submit-another">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8" data-testid="distribution-form">
                <h3 className="text-lg font-bold mb-6">Franchise / Distribution Application</h3>

                {error && (
                  <div className="mb-6 p-3 bg-[var(--blx-danger)]/10 border border-[var(--blx-danger)]/50 rounded-lg text-sm text-[var(--blx-danger)]" data-testid="distribution-form-error">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold mb-1.5 tracking-wider">Full Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" data-testid="dist-input-name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold mb-1.5 tracking-wider">Company Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full" data-testid="dist-input-company" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold mb-1.5 tracking-wider">Email <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" data-testid="dist-input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold mb-1.5 tracking-wider">Phone <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full" data-testid="dist-input-phone" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xs font-bold mb-1.5 tracking-wider">Country <span className="text-[var(--blx-danger)]">*</span></label>
                    <select id="country" name="country" value={formData.country} onChange={handleChange} required className="w-full" data-testid="dist-input-country">
                      <option value="">Select Country</option>
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Oman">Oman</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold mb-1.5 tracking-wider">City <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full" data-testid="dist-input-city" />
                  </div>
                  <div>
                    <label htmlFor="business_type" className="block text-xs font-bold mb-1.5 tracking-wider">Business Type</label>
                    <select id="business_type" name="business_type" value={formData.business_type} onChange={handleChange} className="w-full" data-testid="dist-input-business-type">
                      <option value="">Select Type</option>
                      <option value="AV Integrator">AV Integrator</option>
                      <option value="IT Solutions Provider">IT Solutions Provider</option>
                      <option value="Signage Company">Signage Company</option>
                      <option value="Construction/Fit-out">Construction / Fit-out</option>
                      <option value="Trading Company">Trading Company</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-xs font-bold mb-1.5 tracking-wider">LED Experience</label>
                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange} className="w-full" data-testid="dist-input-experience">
                      <option value="">Select Experience</option>
                      <option value="None - New to LED">None — New to LED</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="message" className="block text-xs font-bold mb-1.5 tracking-wider">Additional Details</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full resize-none" placeholder="Tell us about your business, target market, and partnership goals..." data-testid="dist-input-message" />
                </div>

                <button type="submit" disabled={loading} className={`btn-gold w-full py-3.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="distribution-submit-button">
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
