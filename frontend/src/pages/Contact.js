import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { createLead } from '../api';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    city: '', application: '', timeline: '', budget: '', message: '',
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
      <SEO
        title="Contact Us"
        description="Get a free LED display consultation. Contact Brightluxx — Dubai-based LED screen supplier. Quick quotes, expert advice, and local installation support across UAE."
        path="/contact"
      />      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h1 data-testid="contact-page-title">Get in Touch</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider">
            Expert consultation and a detailed quote within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-base font-bold mb-5">Contact Information</h3>
              <div className="space-y-5">
                {[{
                  icon: MapPin, label: 'Location', value: 'Dubai, UAE'
                }, {
                  icon: Phone, label: 'Phone', value: '+971 55 991 0711', href: 'tel:+971559910711'
                }, {
                  icon: Mail, label: 'Email', value: 'sales@brightluxx.com', href: 'mailto:sales@brightluxx.com'
                }].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 glass-panel flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-[var(--blx-gold-3)]" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-0.5 tracking-wider">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] transition-colors duration-200">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm text-[var(--blx-text-2)]">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6" style={{borderColor: 'var(--blx-gold-2)', borderWidth: '2px'}}>
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={20} className="text-[var(--blx-gold-3)]" />
                <h3 className="text-base font-bold">Quick Response</h3>
              </div>
              <p className="text-xs text-[var(--blx-text-2)] mb-4 tracking-wider">
                Instant answers on WhatsApp. Available 24/7.
              </p>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want to get a quote for LED displays')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold block w-full text-center"
                data-testid="lead-capture-whatsapp-button"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-panel p-8 text-center" style={{borderColor: 'var(--blx-gold-2)'}} data-testid="success-message">
                <div className="w-14 h-14 bg-[var(--blx-gold-3)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#0B0B0B]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Thank You</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-6 tracking-wider">
                  Our team will contact you within 2 hours during business hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-glass px-6 py-3" data-testid="submit-another-button">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8" data-testid="lead-capture-form">
                <h3 className="text-lg font-bold mb-6">Request a Quote</h3>

                {error && (
                  <div className="mb-6 p-3 bg-[var(--blx-danger)]/10 border border-[var(--blx-danger)]/50 rounded-lg text-sm text-[var(--blx-danger)]" data-testid="contact-form-error">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold mb-1.5 tracking-wider">Full Name <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input-luxury w-full" data-testid="input-name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold mb-1.5 tracking-wider">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="input-luxury w-full" data-testid="input-company" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold mb-1.5 tracking-wider">Email <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-luxury w-full" data-testid="input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold mb-1.5 tracking-wider">Phone <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-luxury w-full" data-testid="input-phone" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold mb-1.5 tracking-wider">City <span className="text-[var(--blx-danger)]">*</span></label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="input-luxury w-full" data-testid="input-city" />
                  </div>
                  <div>
                    <label htmlFor="application" className="block text-xs font-bold mb-1.5 tracking-wider">Application <span className="text-[var(--blx-danger)]">*</span></label>
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
                    <label htmlFor="timeline" className="block text-xs font-bold mb-1.5 tracking-wider">Timeline</label>
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
                    <label htmlFor="budget" className="block text-xs font-bold mb-1.5 tracking-wider">Budget Range</label>
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
                  <label htmlFor="message" className="block text-xs font-bold mb-1.5 tracking-wider">Project Details</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" className="input-luxury w-full resize-none" placeholder="Tell us about your project..." data-testid="input-message" style={{textTransform: 'none'}}></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-gold w-full py-3.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
