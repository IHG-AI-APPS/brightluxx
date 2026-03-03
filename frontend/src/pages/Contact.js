import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { createLead } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    application: '',
    timeline: '',
    budget: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createLead({ ...formData, source: 'contact_form' });
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', city: '', application: '', timeline: '', budget: '', message: '' });
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Failed to submit. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20" data-testid="contact-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-display mb-2" data-testid="contact-page-title">
            Get in Touch
          </h1>
          <p className="text-sm text-[var(--blx-text-2)]">
            Expert consultation and a detailed quote within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-5">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[var(--blx-accent)]" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-0.5">Location</div>
                    <div className="text-sm text-[var(--blx-text-2)]">Dubai, UAE</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[var(--blx-accent)]" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-0.5">Phone</div>
                    <a href="tel:+971559910711" className="text-sm text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">
                      +971 55 991 0711
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[var(--blx-accent)]" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-0.5">Email</div>
                    <a href="mailto:sales@brightluxx.com" className="text-sm text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">
                      sales@brightluxx.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[var(--blx-panel)] border-2 border-[var(--blx-gold-2)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={22} className="text-[var(--blx-gold-3)]" />
                <h3 className="text-lg font-semibold">Quick Response</h3>
              </div>
              <p className="text-sm mb-4 text-[var(--blx-text-2)]">
                Instant answers on WhatsApp. Available 24/7.
              </p>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want to get a quote for LED displays')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold block w-full text-center text-sm"
                data-testid="lead-capture-whatsapp-button"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-gold-2)] rounded-xl p-8 text-center" data-testid="success-message">
                <div className="w-14 h-14 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#0A0A0A]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6">
                  Our team will contact you within 2 hours during business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-glass px-6 py-3 text-sm"
                  data-testid="submit-another-button"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6 sm:p-8" data-testid="lead-capture-form">
                <h3 className="text-xl font-semibold mb-6">Request a Quote</h3>

                {error && (
                  <div className="mb-6 p-3 bg-[var(--blx-danger)]/10 border border-[var(--blx-danger)]/50 rounded-lg text-sm text-[var(--blx-danger)]" data-testid="contact-form-error">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input-luxury w-full" data-testid="input-name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="input-luxury w-full" data-testid="input-company" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-luxury w-full" data-testid="input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-luxury w-full" data-testid="input-phone" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1.5">City <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="input-luxury w-full" data-testid="input-city" />
                  </div>
                  <div>
                    <label htmlFor="application" className="block text-sm font-medium mb-1.5">Application <span className="text-[var(--blx-danger)]">*</span></label>
                    <select id="application" name="application" value={formData.application} onChange={handleChange} required className="input-luxury w-full" data-testid="input-application">
                      <option value="">Select Application</option>
                      <option value="Retail">Retail & Shopping Malls</option>
                      <option value="Corporate">Corporate & Boardrooms</option>
                      <option value="Outdoor">Outdoor Advertising</option>
                      <option value="Events">Events & Staging</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Government">Government</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-1.5">Timeline</label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className="input-luxury w-full" data-testid="input-timeline">
                      <option value="">Select Timeline</option>
                      <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-1.5">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="input-luxury w-full" data-testid="input-budget">
                      <option value="">Select Budget</option>
                      <option value="Under $50k">Under $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k - $250k">$100k - $250k</option>
                      <option value="$250k+">$250k+</option>
                      <option value="Not decided">Not decided</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Project Details</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" className="input-luxury w-full resize-none" placeholder="Tell us about your project..." data-testid="input-message"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-gold w-full py-3.5 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  data-testid="lead-capture-submit-button"
                >
                  {loading ? 'Submitting...' : 'Get Quote in 2 Hours'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
