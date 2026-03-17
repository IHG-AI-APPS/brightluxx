import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Zap, Send, Phone, Check, Download, FileText, MessageCircle, Share2 } from 'lucide-react';
import { getProduct, getProducts, createLead } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import { trackProductView, trackQuoteRequest } from '../lib/tracker';
import QuickInquiry from '../components/QuickInquiry';
import { motion, AnimatePresence } from 'framer-motion';

const useInView = (ref, threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
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
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CATEGORY_LABELS = {
  'cob-microled': 'COB MicroLED', 'mip': 'MiP', 'transparent': 'Transparent',
  'flexible': 'Flexible / Creative', 'interactive': 'Interactive Floor',
  'naked-eye-3d': 'Naked-Eye 3D', 'cinema-led': 'Cinema LED', 'sphere': 'LED Sphere',
  'virtual-production': 'Virtual Production', 'poster-totem': 'LED Poster / Totem',
  'shelf-edge': 'Shelf Edge', 'ceiling-led': 'Ceiling / Sky Screen',
  'all-in-one': 'All-in-One', 'dvled': 'DVLED Cinema', 'outdoor': 'Outdoor',
  'rental': 'Rental', 'indoor': 'Indoor', 'road-signal': 'Road Signal',
  'accessories': 'Accessories', 'custom-shapes': 'Custom Shapes',
  'digital-signage': 'Digital Signage', 'smart-tv': 'Smart TVs', 'ready-made': 'Ready-Made',
};

// Bento Grid Spec Card Component
const BentoSpecCard = ({ label, value, large = false, highlight = false }) => (
  <div className={`
    backdrop-blur-xl bg-white/5 border border-white/10 p-6
    ${large ? 'col-span-2 row-span-2' : ''}
    ${highlight ? 'border-cyan-500/30 bg-cyan-500/5' : ''}
    hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300
  `}>
    <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2">{label}</div>
    <div className={`font-mono font-bold text-white ${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
      {value}
    </div>
  </div>
);

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [related, setRelated] = useState([]);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSubmitted(false);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProduct(slug);
        setProduct(res.data);
        trackProductView(slug, res.data.category);
        const relRes = await getProducts({ category: res.data.category });
        setRelated(
          (relRes.data.products || [])
            .filter(p => p.slug !== slug)
            .slice(0, 4)
        );
      } catch (e) {
        console.error('Error fetching product:', e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message || `Interested in ${product.product_code} - ${product.name}`,
        product_interest: product.product_code,
        application: product.category,
        source: 'product_detail'
      });
      trackQuoteRequest(product.slug);
      setSubmitted(true);
    } catch (e) {
      console.error('Error submitting quote:', e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center" data-testid="product-detail-loading">
        <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center" data-testid="product-not-found">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <FileText size={32} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-4">Product Not Found</h1>
          <p className="text-sm text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image_url];
  const applications = product.application ? product.application.split(',').map(a => a.trim()) : [];

  const productJsonLd = product ? [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": resolveImage(product.image_url),
      "sku": product.product_code,
      "brand": { "@type": "Brand", "name": "Brightluxx" },
      "category": CATEGORY_LABELS[product.category] || product.category,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "AED",
        "price": "0",
        "priceValidUntil": "2027-12-31",
        "seller": { "@type": "Organization", "name": "Brightluxx" },
        "url": `${BASE_URL}/products/${product.slug}`,
      },
      "additionalProperty": [
        ...(product.pixel_pitch ? [{ "@type": "PropertyValue", "name": "Pixel Pitch", "value": product.pixel_pitch }] : []),
        ...(product.brightness ? [{ "@type": "PropertyValue", "name": "Brightness", "value": product.brightness }] : []),
        ...(product.resolution ? [{ "@type": "PropertyValue", "name": "Resolution", "value": product.resolution }] : []),
        ...(product.key_specs || []).map(s => ({ "@type": "PropertyValue", "name": s.label, "value": s.value })),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${BASE_URL}/products` },
        { "@type": "ListItem", "position": 3, "name": CATEGORY_LABELS[product.category] || product.category, "item": `${BASE_URL}/products?category=${product.category}` },
        { "@type": "ListItem", "position": 4, "name": product.name },
      ]
    }
  ] : undefined;

  return (
    <div className="min-h-screen bg-[#050508]" data-testid={`product-detail-${product.slug}`}>
      <SEO
        title={`${product.name} — ${product.product_code}`}
        description={`${product.tagline}. ${product.pixel_pitch} pixel pitch, ${product.brightness} brightness. ${product.description?.slice(0, 100)}`}
        image={product.image_url}
        path={`/products/${product.slug}`}
        type="product"
        jsonLd={productJsonLd}
      />

      {/* Hero Section - Full Width Image with Overlay */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <CdnImage 
            src={gallery[activeImage]} 
            alt={product.name} 
            className="w-full h-full" 
            imgClassName="object-cover" 
            w={1920} 
            eager 
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-transparent" />
        </div>

        {/* Gallery Navigation */}
        {gallery.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none z-20">
            <button
              onClick={() => setActiveImage(i => i > 0 ? i - 1 : gallery.length - 1)}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto hover:bg-cyan-500/20 transition-colors border border-white/10"
              data-testid="gallery-prev"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={() => setActiveImage(i => i < gallery.length - 1 ? i + 1 : 0)}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto hover:bg-cyan-500/20 transition-colors border border-white/10"
              data-testid="gallery-next"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-12 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs tracking-wider mb-6" 
            data-testid="product-breadcrumb"
          >
            <Link to="/products" className="text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={12} /> Products
            </Link>
            <span className="text-gray-700">/</span>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-cyan-400 transition-colors">
              {CATEGORY_LABELS[product.category] || product.category}
            </Link>
          </motion.nav>

          {/* Product Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold">
                {product.product_code}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                {CATEGORY_LABELS[product.category] || product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-white mb-4" data-testid="product-detail-title">
              {product.name}
            </h1>
            
            {product.tagline && (
              <p className="text-cyan-400 text-lg md:text-xl font-medium tracking-wide mb-6 max-w-2xl">
                {product.tagline}
              </p>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#quote-form" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                data-testid="product-request-quote-btn"
              >
                <Send size={16} /> Request Quote
              </a>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I'm interested in ${product.product_code} - ${product.name}. Can you share pricing and availability?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 uppercase tracking-wider px-8 py-4 inline-flex items-center gap-2 transition-all"
                data-testid="product-whatsapp-btn"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <Link 
                to={`/resources?product=${product.product_code}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <Download size={16} /> Spec Sheet
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 right-6 lg:right-24 z-20 flex gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 border-2 overflow-hidden transition-all ${
                  i === activeImage ? 'border-cyan-500 opacity-100' : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
                data-testid={`gallery-thumb-${i}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Key Specifications - Bento Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Technical Data
            </span>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-10">Key Specifications</h2>
          </FadeInSection>

          <FadeInSection delay={1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="product-specs-bento">
              {product.pixel_pitch && (
                <BentoSpecCard label="Pixel Pitch" value={product.pixel_pitch} highlight large />
              )}
              {product.brightness && (
                <BentoSpecCard label="Brightness" value={product.brightness} />
              )}
              {product.resolution && (
                <BentoSpecCard label="Resolution" value={product.resolution} />
              )}
              {product.key_specs?.slice(0, 5).map((spec, i) => (
                <BentoSpecCard key={i} label={spec.label} value={spec.value} />
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Product Description & Applications */}
      <section className="py-16 lg:py-24 bg-[#0A0A0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Description */}
            <FadeInSection>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Overview
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6">Product Details</h2>
              <p className="text-gray-400 leading-relaxed tracking-wide text-base">
                {product.description}
              </p>
            </FadeInSection>

            {/* Applications */}
            {applications.length > 0 && (
              <FadeInSection delay={1}>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                  Use Cases
                </span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6">Ideal Applications</h2>
                <div className="grid grid-cols-2 gap-3">
                  {applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-300 tracking-wide">{app}</span>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            )}
          </div>
        </div>
      </section>

      {/* Full Specifications Table */}
      {product.key_specs?.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Detailed Specs
              </span>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-10">Full Technical Specifications</h2>
            </FadeInSection>

            <FadeInSection delay={1}>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden" data-testid="product-specs-section">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 py-4 px-6 w-1/3">Parameter</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 py-4 px-6">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.pixel_pitch && (
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium tracking-wide text-white">Pixel Pitch</td>
                        <td className="py-4 px-6 text-sm text-gray-400 font-mono tracking-wide">{product.pixel_pitch}</td>
                      </tr>
                    )}
                    {product.resolution && (
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium tracking-wide text-white">Resolution</td>
                        <td className="py-4 px-6 text-sm text-gray-400 font-mono tracking-wide">{product.resolution}</td>
                      </tr>
                    )}
                    {product.brightness && (
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium tracking-wide text-white">Brightness</td>
                        <td className="py-4 px-6 text-sm text-gray-400 font-mono tracking-wide">{product.brightness}</td>
                      </tr>
                    )}
                    {product.key_specs.map((spec, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors last:border-b-0">
                        <td className="py-4 px-6 text-sm font-medium tracking-wide text-white">{spec.label}</td>
                        <td className="py-4 px-6 text-sm text-gray-400 font-mono tracking-wide">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Quote Request Form */}
      <section id="quote-form" className="py-16 lg:py-24 bg-[#0A0A0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 lg:p-12" data-testid="product-quote-form">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Side - Info */}
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    Get Pricing
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4">Request a Quote</h2>
                  <p className="text-gray-400 tracking-wide mb-8">
                    Get pricing, lead times, and custom configuration options for the {product.name}. Our team typically responds within 2 hours.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      'Free project consultation',
                      'Custom size & configuration options',
                      'Competitive volume pricing',
                      '2-year manufacturer warranty',
                      'Local stock in Dubai'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-300 tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Product Preview */}
                  <div className="mt-10 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                        <CdnImage src={product.image_url} alt={product.name} className="w-full h-full" w={100} />
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{product.product_code}</span>
                        <h4 className="text-sm font-bold text-white">{product.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full py-12" data-testid="product-quote-success">
                      <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                        <Check size={36} className="text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold uppercase tracking-wide mb-2">Quote Request Sent</h3>
                      <p className="text-sm text-gray-500 tracking-wide text-center">
                        We'll contact you within 2 hours with pricing for {product.product_code}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuote} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Your Name *</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          required
                          value={formState.name}
                          onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                          className="w-full bg-white/5 border-b border-white/20 focus:border-cyan-500 text-white placeholder:text-gray-600 rounded-none px-4 py-3 outline-none transition-colors"
                          data-testid="quote-name-input"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          required
                          value={formState.email}
                          onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                          className="w-full bg-white/5 border-b border-white/20 focus:border-cyan-500 text-white placeholder:text-gray-600 rounded-none px-4 py-3 outline-none transition-colors"
                          data-testid="quote-email-input"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formState.phone}
                          onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                          className="w-full bg-white/5 border-b border-white/20 focus:border-cyan-500 text-white placeholder:text-gray-600 rounded-none px-4 py-3 outline-none transition-colors"
                          data-testid="quote-phone-input"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Project Details</label>
                        <textarea
                          placeholder="Tell us about your project: quantity needed, installation size, timeline..."
                          rows={4}
                          value={formState.message}
                          onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                          className="w-full bg-white/5 border-b border-white/20 focus:border-cyan-500 text-white placeholder:text-gray-600 rounded-none px-4 py-3 outline-none transition-colors resize-none"
                          data-testid="quote-message-input"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={submitting} 
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider py-4 transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        data-testid="quote-submit-btn"
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} /> Send Quote Request
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">
                    More Options
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide">Related Products</h2>
                </div>
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="product-related-section">
              {related.map((p, index) => (
                <FadeInSection key={p.id || p._id} delay={index}>
                  <Link 
                    to={`/products/${p.slug}`} 
                    className="group block bg-[#0A0A0D] border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all"
                    data-testid="related-product-card"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <CdnImage 
                        src={p.image_url} 
                        alt={p.name} 
                        className="w-full h-full" 
                        imgClassName="group-hover:scale-110 transition-transform duration-700" 
                        w={400} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 text-[9px] uppercase tracking-wider font-bold">
                          {p.product_code}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-2">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                        <span>{p.pixel_pitch}</span>
                        <span className="text-gray-700">|</span>
                        <span>{p.brightness}</span>
                      </div>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-t from-cyan-500/5 to-transparent">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto" data-testid="product-bottom-cta">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                Not Sure Which Product Is Right?
              </h3>
              <p className="text-gray-400 tracking-wide mb-8">
                Use our specifier tools to find the perfect LED display for your project, or talk to our experts.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/calculator" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
                  data-testid="product-cta-calculator"
                >
                  Screen Calculator
                </Link>
                <Link 
                  to="/compare" 
                  className="bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 uppercase tracking-wider px-8 py-4 inline-flex items-center gap-2 transition-all"
                  data-testid="product-cta-compare"
                >
                  Compare Products
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 uppercase tracking-wider font-bold"
                  data-testid="product-cta-contact"
                >
                  Talk to Expert <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {product && <QuickInquiry context={product.name || product.title || 'this LED display'} />}
    </div>
  );
}
