import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, FileText, ShieldCheck, Globe, ArrowRight, Truck, Clock, Award } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  'LED Modules & Components',
  'LED Cabinets & Frames',
  'Power Supplies',
  'Receiving & Sending Cards',
  'Cables & Connectors',
  'Mounting Hardware',
  'Control Systems',
  'Cooling Systems',
  'Raw Materials',
  'Packaging Materials',
  'Other',
];

const REQUIREMENTS = [
  { icon: ShieldCheck, title: 'Quality Certified', desc: 'ISO 9001, CE, or equivalent certifications required for all supplied materials.' },
  { icon: FileText, title: 'Documentation', desc: 'Complete technical datasheets, test reports, and compliance certificates.' },
  { icon: Truck, title: 'Reliable Delivery', desc: 'Consistent supply chain with on-time delivery to our Dubai warehouse.' },
  { icon: Clock, title: 'Lead Times', desc: 'Standard lead times under 30 days. Express options preferred.' },
  { icon: Globe, title: 'GCC Compliance', desc: 'Products must meet GCC standards including ESMA and civil defence requirements.' },
  { icon: Award, title: 'Warranty Support', desc: 'Minimum 2-year warranty on all supplied components and materials.' },
];

export default function SupplierRegistrationPage() {
  const [formData, setFormData] = useState({
    company_name: '', contact_person: '', email: '', phone: '',
    country: '', product_category: '', certifications: '', website: '', message: '',
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
      const res = await fetch(`${API}/api/supplier-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Failed to submit. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20" data-testid="supplier-registration-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Package size={16} className="text-[var(--blx-gold-3)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--blx-gold-3)] font-bold">SUPPLIER NETWORK</span>
          </div>
          <h1 data-testid="supplier-registration-title">Supplier Registration</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-3 tracking-wider leading-relaxed max-w-2xl">
            Register as an approved supplier for Brightluxx. We work with leading manufacturers and distributors of LED components, raw materials, and supporting technologies.
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-20">
          <h2 className="text-base font-bold mb-8 tracking-wider">Supplier Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS.map((r) => (
              <div key={r.title} className="glass-panel p-5" data-testid={`requirement-${r.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <r.icon size={16} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold mb-1 tracking-wider">{r.title}</h3>
                    <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-base font-bold mb-4">Registration Process</h3>
              <div className="space-y-4">
                {[
                  { step: '01', label: 'Submit Application', desc: 'Complete the registration form with your company details.' },
                  { step: '02', label: 'Review & Assessment', desc: 'Our procurement team reviews your application within 5 business days.' },
                  { step: '03', label: 'Qualification', desc: 'Sample evaluation and documentation verification.' },
                  { step: '04', label: 'Onboarding', desc: 'Approved suppliers receive purchase orders and payment terms.' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="text-[10px] font-bold tracking-wider text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0 w-5">{s.step}</span>
                    <div>
                      <div className="text-xs font-bold mb-0.5">{s.label}</div>
                      <div className="text-[11px] text-[var(--blx-text-2)]">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6" style={{ borderColor: 'var(--blx-gold-2)', borderWidth: '2px' }}>
              <h3 className="text-sm font-bold mb-3">Become a Distributor Instead?</h3>
              <p className="text-[11px] text-[var(--blx-text-2)] mb-4 leading-relaxed">
                If you're looking to distribute Brightluxx products, visit our franchise page.
              </p>
              <Link to="/distribution" className="btn-glass w-full text-center flex items-center justify-center gap-2 text-xs" data-testid="distribution-link">
                Distribution & Franchise <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-panel p-8 text-center" style={{ borderColor: 'var(--blx-gold-2)' }} data-testid="supplier-success">
                <div className="w-14 h-14 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#0B0B0B]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Registration Received</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6 tracking-wider">
                  Our procurement team will review your registration and respond within 5 business days.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-glass px-6 py-3" data-testid="supplier-submit-another">
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8" data-testid="supplier-form">
                <h3 className="text-lg font-bold mb-6">Supplier Registration Form</h3>

                {error && (
                  <div className="mb-6 p-3 bg-[var(--blx-danger)]/10 border border-[var(--blx-danger)]/50 rounded-lg text-sm text-[var(--blx-danger)]" data-testid="supplier-form-error">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="company_name" className="block text-xs font-bold mb-1.5 tracking-wider">Company Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-company" />
                  </div>
                  <div>
                    <label htmlFor="contact_person" className="block text-xs font-bold mb-1.5 tracking-wider">Contact Person <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="contact_person" name="contact_person" value={formData.contact_person} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-contact" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold mb-1.5 tracking-wider">Email <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold mb-1.5 tracking-wider">Phone <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-phone" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xs font-bold mb-1.5 tracking-wider">Country <span className="text-[var(--blx-danger)]">*</span></label>
                    <select id="country" name="country" value={formData.country} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-country">
                      <option value="">Select Country</option>
                      <option value="UAE">UAE</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="product_category" className="block text-xs font-bold mb-1.5 tracking-wider">Product Category <span className="text-[var(--blx-danger)]">*</span></label>
                    <select id="product_category" name="product_category" value={formData.product_category} onChange={handleChange} required className="input-luxury w-full" data-testid="supplier-input-category">
                      <option value="">Select Category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="certifications" className="block text-xs font-bold mb-1.5 tracking-wider">Certifications</label>
                    <input type="text" id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} className="input-luxury w-full" placeholder="e.g., ISO 9001, CE, UL" data-testid="supplier-input-certifications" />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-xs font-bold mb-1.5 tracking-wider">Website</label>
                    <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="input-luxury w-full" placeholder="https://..." data-testid="supplier-input-website" />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="message" className="block text-xs font-bold mb-1.5 tracking-wider">Company Profile & Products</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" className="input-luxury w-full resize-none" placeholder="Describe your company, product range, production capacity, and any relevant experience..." data-testid="supplier-input-message" />
                </div>

                <button type="submit" disabled={loading} className={`btn-gold w-full py-3.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="supplier-submit-button">
                  {loading ? 'Submitting...' : 'Register as Supplier'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
