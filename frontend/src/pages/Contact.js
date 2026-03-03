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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createLead({
        ...formData,
        source: 'contact_form',
      });
      setSubmitted(true);
      setFormData({
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
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = 'Hi, I want to get a quote for LED displays';

  return (
    <div className="py-20" data-testid="contact-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4" data-testid="page-title">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-[var(--blx-text-2)]">
            Ready to transform your space? Get expert consultation and a detailed quote within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[var(--blx-accent)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Location</div>
                    <div className="text-sm text-[var(--blx-text-2)]">Dubai, UAE</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[var(--blx-accent)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Phone</div>
                    <a
                      href="tel:+971559910711"
                      className="text-sm text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]"
                    >
                      +971 55 991 0711
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--blx-bg)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[var(--blx-accent)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <a
                      href="mailto:sales@brightluxx.com"
                      className="text-sm text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]"
                    >
                      sales@brightluxx.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366] rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={24} />
                <h3 className="text-xl font-semibold">Quick Response</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                Get instant answers on WhatsApp. Available 24/7 for urgent inquiries.
              </p>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-center transition-colors"
                data-testid="whatsapp-cta"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[var(--blx-panel)] border border-[var(--blx-accent)] rounded-xl p-8 text-center" data-testid="success-message">
                <div className="w-16 h-16 bg-[var(--blx-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[var(--blx-bg)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
                <p className="text-[var(--blx-text-2)] mb-6">
                  We've received your inquiry. Our team will contact you within 2 hours during business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[var(--blx-accent)] text-[var(--blx-bg)] rounded-lg font-semibold hover:bg-[var(--blx-accent-2)] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl p-8" data-testid="contact-form">
                <h3 className="text-2xl font-semibold mb-6">Request a Quote</h3>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-company"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-city"
                    />
                  </div>

                  <div>
                    <label htmlFor="application" className="block text-sm font-medium mb-2">
                      Application <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="application"
                      name="application"
                      value={formData.application}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-application"
                    >
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
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-timeline"
                    >
                      <option value="">Select Timeline</option>
                      <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)]"
                      data-testid="input-budget"
                    >
                      <option value="">Select Budget</option>
                      <option value="Under $50k">Under $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k - $250k">$100k - $250k</option>
                      <option value="$250k+">$250k+</option>
                      <option value="Not decided">Not decided</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-[var(--blx-bg)] border border-[var(--blx-border)] rounded-lg focus:outline-none focus:border-[var(--blx-accent)] text-[var(--blx-text)] resize-none"
                    placeholder="Tell us about your project requirements..."
                    data-testid="input-message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-4 bg-[var(--blx-accent)] text-[var(--blx-bg)] rounded-lg font-semibold hover:bg-[var(--blx-accent-2)] transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  data-testid="submit-button"
                >
                  {loading ? 'Submitting...' : 'Get Quote in 2 Hours'}
                </button>

                <p className="text-xs text-[var(--blx-muted)] mt-4 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
