import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, ArrowRight, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createLead } from '../api';
import SEO, { BASE_URL } from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { generateBreadcrumbSchema } from '../utils/seoSchemas';

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

const GlassCard = ({ children, className = '', hover = true, isDark = true, ...props }) => (
  <div {...props} className={`
    backdrop-blur-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/80'} border ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'} rounded-lg
    ${hover ? `hover:${isDark ? 'bg-white/[0.06]' : 'bg-white'} hover:border-cyan-500/30` : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const Contact = () => {
  const { isDark } = useTheme();
  
  // Theme-aware classes
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const inputBg = isDark ? 'bg-white/5' : 'bg-white';
  const inputBorder = isDark ? 'border-white/10' : 'border-neutral-300';
  const inputText = isDark ? 'text-white' : 'text-neutral-900';
  const inputPlaceholder = isDark ? 'placeholder:text-gray-600' : 'placeholder:text-gray-400';
  
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    city: '', application: '', timeline: '', budget: '', message: '',
    website: '', fax: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formStartTime = React.useRef(Date.now());

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Client-side spam check: if filled too fast (<3 sec), likely a bot
    if (Date.now() - formStartTime.current < 3000) {
      setSubmitted(true); // Fake success for bots
      setLoading(false);
      return;
    }
    
    try {
      await createLead({ ...formData, source: 'contact_form' });
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', city: '', application: '', timeline: '', budget: '', message: '', website: '', fax: '' });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail || 'Failed to submit. Please try again or contact us directly.');
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

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }
  ]);

  const localBusinessSchema = {
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
  };

  return (
    <div className={`${pageBg} transition-colors duration-500`} data-testid="contact-page">
      <SEO
        title="Contact Us — Get a Free LED Display Consultation | Brightluxx"
        description="Get a free LED display consultation. Contact Brightluxx — Dubai-based LED screen supplier. Quick quotes, expert advice, and local installation support across UAE."
        path="/contact"
        jsonLd={[breadcrumbSchema, localBusinessSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden" data-testid="contact-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className={`absolute top-1/4 left-0 w-[400px] h-[400px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Contact Us</span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95] ${textPrimary}`} data-testid="contact-page-title">
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Touch
              </span>
            </h1>
            <p className={`${textSecondary} text-base md:text-lg max-w-xl tracking-wide leading-relaxed`}>
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
                <GlassCard className="p-6 lg:p-8" hover={false} isDark={isDark}>
                  <h3 className={`text-lg font-bold uppercase tracking-wide mb-6 ${textPrimary}`}>Contact Information</h3>
                  <div className="space-y-5">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <div className={`text-[10px] font-bold tracking-[0.2em] ${textMuted} uppercase mb-1`}>{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-cyan-400 transition-colors`}>
                              {item.value}
                            </a>
                          ) : (
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={1}>
                <GlassCard className="p-6 lg:p-8 border-cyan-500/20" hover={false} isDark={isDark}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <MessageCircle size={18} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-base font-bold uppercase tracking-wide ${textPrimary}`}>Quick Response</h3>
                  </div>
                  <p className={`text-xs ${textSecondary} mb-5 tracking-wide leading-relaxed`}>
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
                <GlassCard className="p-6 lg:p-8" hover={false} isDark={isDark}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Building2 size={18} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-base font-bold uppercase tracking-wide ${textPrimary}`}>Visit Showroom</h3>
                  </div>
                  <p className={`text-xs ${textSecondary} tracking-wide leading-relaxed mb-4`}>
                    See our LED displays in action. Schedule a visit to our Dubai showroom for a hands-on experience.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/5" data-testid="google-map-embed">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5!2d55.0272!3d24.9857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f13c77b5b2d6d%3A0x0!2sJebel+Ali+Industrial+Area+1!5e0!3m2!1sen!2sae!4v1"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Brightluxx Showroom - Jebel Ali Industrial Area 1, Dubai"
                    ></iframe>
                  </div>
                </GlassCard>
              </FadeInSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <FadeInSection delay={1}>
                {submitted ? (
                  <GlassCard className="p-10 lg:p-16 text-center border-cyan-500/20" hover={false} isDark={isDark} data-testid="success-message">
                    <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-black" />
                    </div>
                    <h3 className={`text-2xl font-bold uppercase tracking-wide mb-3 ${textPrimary}`}>Thank You</h3>
                    <p className={`${textSecondary} mb-8 tracking-wide max-w-md mx-auto`}>
                      Our team will contact you within 2 hours during business hours with a detailed quotation.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className={`${isDark ? 'bg-white/5' : 'bg-neutral-900/5'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-neutral-300'} hover:border-cyan-500/30 ${textPrimary} font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2`}
                      data-testid="submit-another-button"
                    >
                      Submit Another Inquiry
                    </button>
                  </GlassCard>
                ) : (
                  <GlassCard className="p-6 sm:p-8 lg:p-10" hover={false} isDark={isDark}>
                    <form onSubmit={handleSubmit} data-testid="lead-capture-form">
                      <h3 className={`text-xl font-bold uppercase tracking-wide mb-8 ${textPrimary}`}>Request a Quote</h3>

                      {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400" data-testid="contact-form-error">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div>
                          <label htmlFor="name" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg`}
                            data-testid="input-name" 
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>Company</label>
                          <input 
                            type="text" 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg`}
                            data-testid="input-company" 
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg`}
                            data-testid="input-email" 
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg`}
                            data-testid="input-phone" 
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>
                            City <span className="text-red-400">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                            required 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg`}
                            data-testid="input-city" 
                          />
                        </div>
                        <div>
                          <label htmlFor="application" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>
                            Application <span className="text-red-400">*</span>
                          </label>
                          <select 
                            id="application" 
                            name="application" 
                            value={formData.application} 
                            onChange={handleChange} 
                            required 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none`}
                            data-testid="input-application"
                          >
                            <option value="" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Select Application</option>
                            <option value="Retail" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Retail & Shopping Malls</option>
                            <option value="Corporate" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Corporate & Boardrooms</option>
                            <option value="Outdoor" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Outdoor Advertising</option>
                            <option value="Events" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Events & Staging</option>
                            <option value="Hospitality" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Hospitality</option>
                            <option value="Government" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Government</option>
                            <option value="Other" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="timeline" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>Timeline</label>
                          <select 
                            id="timeline" 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleChange} 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none`}
                            data-testid="input-timeline"
                          >
                            <option value="" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Select Timeline</option>
                            <option value="Urgent (1-2 weeks)" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Urgent (1-2 weeks)</option>
                            <option value="1-3 months" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>1-3 months</option>
                            <option value="3-6 months" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>3-6 months</option>
                            <option value="6+ months" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>6+ months</option>
                            <option value="Just exploring" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Just exploring</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>Budget Range</label>
                          <select 
                            id="budget" 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleChange} 
                            className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} px-4 py-3 text-sm outline-none transition-colors rounded-lg appearance-none`}
                            data-testid="input-budget"
                          >
                            <option value="" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Select Budget</option>
                            <option value="Under AED 200k" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Under AED 200k</option>
                            <option value="AED 200k - 400k" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>AED 200k - 400k</option>
                            <option value="AED 400k - 1M" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>AED 400k - 1M</option>
                            <option value="AED 1M+" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>AED 1M+</option>
                            <option value="Not decided" className={isDark ? 'bg-[#0A0A0D]' : 'bg-white'}>Not decided</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className={`block text-xs font-bold tracking-[0.15em] ${textSecondary} uppercase mb-2`}>Project Details</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows="4" 
                          className={`w-full ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} ${inputPlaceholder} px-4 py-3 text-sm outline-none transition-colors rounded-lg resize-none`}
                          placeholder="Tell us about your project..."
                          data-testid="input-message"
                        ></textarea>
                      </div>

                      {/* Honeypot fields — invisible to users, bots fill them */}
                      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                        <input type="text" name="fax" value={formData.fax} onChange={handleChange} autoComplete="off" tabIndex={-1} />
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

                      <p className={`text-[10px] ${textMuted} mt-5 leading-relaxed tracking-wide`} data-testid="contact-disclaimer">
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
