import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, ArrowRight, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createLead } from '../api';
import SEO, { BASE_URL } from '../components/SEO';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-lg
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

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

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Jebel Ali Industrial Area 1, Dubai, UAE', href: 'https://maps.google.com/?q=Jebel+Ali+Industrial+Area+1+Dubai' },
    { icon: Phone, label: 'Phone', value: '+971 4 258 5754', href: 'tel:+97142585754' },
    { icon: Mail, label: 'Email', value: 'sales@brightluxx.com', href: 'mailto:sales@brightluxx.com' },
    { icon: Clock, label: 'Hours', value: 'Sun-Thu: 9AM-6PM', href: null },
  ];

  return (
    <div className="bg-[#050508]" data-testid="contact-page">
      <SEO
        title="Contact Us — Get a Free LED Display Consultation | Brightluxx"
        description="Get a free LED display consultation. Contact Brightluxx — Dubai-based LED screen supplier. Quick quotes, expert advice, and local installation support across UAE."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx",
          "description": "Premium digital LED display solutions provider in UAE",
          "url": BASE_URL,
          "telephone": "+971-55-991-0711",
          "email": "info@brightluxx.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jebel Ali Industrial Area 1",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "addressCountry": "AE"
          },
          "geo": { "@type": "GeoCoordinates", "latitude": "25.1653", "longitude": "55.2359" },
          "priceRange": "$$",
          "areaServed": ["UAE", "GCC", "MENA"]
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" data-testid="contact-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Contact Us</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95]" data-testid="contact-page-title">
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Touch
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl tracking-wide leading-relaxed">
              Expert consultation and a detailed quote within 2 hours during business hours.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <FadeInSection>
                <GlassCard className="p-6 lg:p-8" hover={false}>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-1">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm text-gray-300">{item.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={1}>
                <GlassCard className="p-6 lg:p-8 border-cyan-500/20" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <MessageCircle size={18} className="text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wide">Quick Response</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-5 tracking-wide leading-relaxed">
                    Instant answers on WhatsApp. Available 24/7 for urgent inquiries.
                  </p>
                  <a
                    href={`https://wa.me/971559954274?text=${encodeURIComponent('Hi, I want to get a quote for LED displays')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] inline-flex items-center justify-center gap-2 w-full"
                    data-testid="lead-capture-whatsapp-button"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={2}>
                <GlassCard className="p-6 lg:p-8" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Building2 size={18} className="text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wide">Visit Showroom</h3>
                  </div>
                  <p className="text-xs text-gray-400 tracking-wide leading-relaxed">
                    See our LED displays in action. Schedule a visit to our Dubai showroom for a hands-on experience.
                  </p>
                </GlassCard>
              </FadeInSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <FadeInSection delay={1}>
                {submitted ? (
                  <GlassCard className="p-10 lg:p-16 text-center border-cyan-500/20" hover={false} data-testid="success-message">
                    <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-wide mb-3">Thank You</h3>
                    <p className="text-gray-400 mb-8 tracking-wide max-w-md mx-auto">
                      Our team will contact you within 2 hours during business hours with a detailed quotation.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
                      data-testid="submit-another-button"
                    >
                      Submit Another Inquiry
                    </button>
                  </GlassCard>
                ) : (
                  <GlassCard className="p-6 sm:p-8 lg:p-10" hover={false}>
                    <form onSubmit={handleSubmit} data-testid="lead-capture-form">
                      <h3 className="text-xl font-bold uppercase tracking-wide mb-8">Request a Quote</h3>

                      {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400" data-testid="contact-form-error">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                            data-testid="input-name" 
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">Company</label>
                          <input 
                            type="text" 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                            data-testid="input-company" 
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                            data-testid="input-email" 
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                            data-testid="input-phone" 
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                            City <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                            data-testid="input-city" 
                          />
                        </div>
                        <div>
                          <label htmlFor="application" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                            Application <span className="text-red-400">*</span>
                          </label>
                          <select 
                            id="application" 
                            name="application" 
                            value={formData.application} 
                            onChange={handleChange} 
                            required 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none"
                            data-testid="input-application"
                          >
                            <option value="" className="bg-[#0A0A0D]">Select Application</option>
                            <option value="Retail" className="bg-[#0A0A0D]">Retail & Shopping Malls</option>
                            <option value="Corporate" className="bg-[#0A0A0D]">Corporate & Boardrooms</option>
                            <option value="Outdoor" className="bg-[#0A0A0D]">Outdoor Advertising</option>
                            <option value="Events" className="bg-[#0A0A0D]">Events & Staging</option>
                            <option value="Hospitality" className="bg-[#0A0A0D]">Hospitality</option>
                            <option value="Government" className="bg-[#0A0A0D]">Government</option>
                            <option value="Other" className="bg-[#0A0A0D]">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="timeline" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">Timeline</label>
                          <select 
                            id="timeline" 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleChange} 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none"
                            data-testid="input-timeline"
                          >
                            <option value="" className="bg-[#0A0A0D]">Select Timeline</option>
                            <option value="Urgent (1-2 weeks)" className="bg-[#0A0A0D]">Urgent (1-2 weeks)</option>
                            <option value="1-3 months" className="bg-[#0A0A0D]">1-3 months</option>
                            <option value="3-6 months" className="bg-[#0A0A0D]">3-6 months</option>
                            <option value="6+ months" className="bg-[#0A0A0D]">6+ months</option>
                            <option value="Just exploring" className="bg-[#0A0A0D]">Just exploring</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">Budget Range</label>
                          <select 
                            id="budget" 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleChange} 
                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none"
                            data-testid="input-budget"
                          >
                            <option value="" className="bg-[#0A0A0D]">Select Budget</option>
                            <option value="Under AED 200k" className="bg-[#0A0A0D]">Under AED 200k</option>
                            <option value="AED 200k - 400k" className="bg-[#0A0A0D]">AED 200k - 400k</option>
                            <option value="AED 400k - 1M" className="bg-[#0A0A0D]">AED 400k - 1M</option>
                            <option value="AED 1M+" className="bg-[#0A0A0D]">AED 1M+</option>
                            <option value="Not decided" className="bg-[#0A0A0D]">Not decided</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">Project Details</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows="4" 
                          className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none transition-colors rounded-lg resize-none"
                          placeholder="Tell us about your project..."
                          data-testid="input-message"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        data-testid="lead-capture-submit-button"
                      >
                        {loading ? 'Submitting...' : (
                          <>Get Quote in 2 Hours <ArrowRight size={16} /></>
                        )}
                      </button>

                      <p className="text-[10px] text-gray-500 mt-5 leading-relaxed tracking-wide" data-testid="contact-disclaimer">
                        Note: Standard quotations cover hardware, processing, and cabling. Installation costs and structural work are quoted separately after a site survey confirms conditions and requirements.
                      </p>
                    </form>
                  </GlassCard>
                )}
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
