import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Monitor, Cpu, Layers, Sun, Shield, Zap, Ruler, Eye, Download, Send, MessageCircle, Grid3X3, RefreshCw, Gauge } from 'lucide-react';
import { getProduct, getProducts, createLead } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { trackProductView, trackQuoteRequest } from '../lib/tracker';
import QuickInquiry from '../components/QuickInquiry';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

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

// Category to color gradient mapping
const CATEGORY_COLORS = {
  'cob-microled': { gradient: 'from-violet-500 to-purple-600', glow: 'bg-violet-500/20' },
  'mip': { gradient: 'from-violet-500 to-purple-600', glow: 'bg-violet-500/20' },
  'indoor': { gradient: 'from-cyan-500 to-blue-600', glow: 'bg-cyan-500/20' },
  'outdoor': { gradient: 'from-orange-500 to-amber-600', glow: 'bg-orange-500/20' },
  'transparent': { gradient: 'from-emerald-500 to-teal-600', glow: 'bg-emerald-500/20' },
  'flexible': { gradient: 'from-rose-500 to-pink-600', glow: 'bg-rose-500/20' },
  'cinema-led': { gradient: 'from-amber-500 to-orange-600', glow: 'bg-amber-500/20' },
  'dvled': { gradient: 'from-amber-500 to-orange-600', glow: 'bg-amber-500/20' },
  'all-in-one': { gradient: 'from-cyan-500 to-blue-600', glow: 'bg-cyan-500/20' },
  'default': { gradient: 'from-cyan-500 to-blue-600', glow: 'bg-cyan-500/20' },
};

/* ============================================
   COMPONENT: Specification Card
   ============================================ */
const SpecCard = ({ icon: Icon, label, value, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-5 rounded-2xl ${isDark ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-white border border-neutral-200'}`}
  >
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
        <Icon className="w-5 h-5 text-cyan-400" />
      </div>
      <div>
        <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{label}</p>
        <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{value}</p>
      </div>
    </div>
  </motion.div>
);

/* ============================================
   COMPONENT: Related Product Card
   ============================================ */
const RelatedProductCard = ({ product, isDark }) => {
  const colors = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.default;
  return (
    <Link
      to={`/products/${product.slug}`}
      className={`block p-4 rounded-xl ${isDark ? 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]' : 'bg-neutral-50 hover:bg-neutral-100'} transition-all group`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <CdnImage src={product.image_url} alt={product.name} className="w-full h-full" imgClassName="w-full h-full object-cover" w={100} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
              {product.pixel_pitch || product.product_code}
            </span>
          </div>
          <p className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'} truncate`}>
            {product.name}
          </p>
        </div>
        <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-neutral-600' : 'text-neutral-400'} group-hover:translate-x-1 transition-transform`} />
      </div>
    </Link>
  );
};

/* ============================================
   MAIN COMPONENT: Product Detail Page
   ============================================ */
export default function ProductDetail() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Theme classes
  const bgColor = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  useEffect(() => {
    window.scrollTo(0, 0);
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
            .slice(0, 3)
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
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`} data-testid="product-detail-loading">
        <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`} data-testid="product-not-found">
        <div className="text-center px-6">
          <h1 className={`text-2xl font-bold ${textPrimary} mb-4`}>Product Not Found</h1>
          <p className={`${textSecondary} mb-6`}>The requested product could not be found.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.default;
  const applications = product.application ? product.application.split(',').map(a => a.trim()) : [];

  // Build key specs array
  const keySpecs = [
    product.pixel_pitch && { icon: Grid3X3, label: 'Pixel Pitch', value: product.pixel_pitch },
    product.resolution && { icon: Monitor, label: 'Resolution', value: product.resolution },
    product.brightness && { icon: Sun, label: 'Brightness', value: product.brightness },
    product.refresh_rate && { icon: RefreshCw, label: 'Refresh Rate', value: product.refresh_rate },
  ].filter(Boolean);

  // Add key_specs from product if available
  if (product.key_specs?.length) {
    product.key_specs.slice(0, 2).forEach(spec => {
      keySpecs.push({ icon: Gauge, label: spec.label, value: spec.value });
    });
  }

  // Full specs for the table
  const fullSpecs = [
    product.pixel_pitch && { label: 'Pixel Pitch', value: product.pixel_pitch },
    product.resolution && { label: 'Resolution', value: product.resolution },
    product.brightness && { label: 'Brightness', value: product.brightness },
    product.refresh_rate && { label: 'Refresh Rate', value: product.refresh_rate },
    ...(product.key_specs || []).map(spec => ({ label: spec.label, value: spec.value })),
  ].filter(Boolean);

  return (
    <div className={`min-h-screen ${bgColor}`} data-testid={`product-detail-${product.slug}`}>
      <SEO
        title={`${product.name} | LED Display Dubai UAE`}
        description={`${product.tagline || product.name}. ${product.pixel_pitch || ''} pixel pitch, ${product.brightness || ''} brightness. Buy from Dubai's trusted LED supplier.`}
        image={product.image_url}
        path={`/products/${product.slug}`}
        type="product"
      />

      {/* ============================================
          SECTION 1: IMMERSIVE HERO
          ============================================ */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <CdnImage 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full" 
            imgClassName="w-full h-full object-cover"
            w={1920}
            eager
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 to-transparent" />
          {/* Ambient Glow */}
          <div className={`absolute bottom-0 left-1/4 w-96 h-96 ${colors.glow} blur-[150px] opacity-50`} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-16 lg:pb-24">
          <Breadcrumbs 
            items={[
              { name: 'Home', path: '/' }, 
              { name: 'Products', path: '/products' },
              { name: CATEGORY_LABELS[product.category] || product.category, path: `/products?category=${product.category}` },
              { name: product.name, path: null }
            ]} 
            className="mb-6" 
          />

          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {product.pixel_pitch && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r ${colors.gradient} text-white`}>
                  {product.pixel_pitch}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">
                {product.product_code}
              </span>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {CATEGORY_LABELS[product.category] || product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className={`text-xl md:text-2xl font-medium bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-6`}>
                {product.tagline}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl line-clamp-3">
                {product.description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#quote-form"
                className={`bg-gradient-to-r ${colors.gradient} text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                data-testid="request-quote-btn"
              >
                <Send size={16} /> Request Quote
              </a>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I'm interested in ${product.product_code} - ${product.name}. Can you share pricing?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-white/20 transition-all"
                data-testid="whatsapp-btn"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <Link 
                to={`/resources?product=${product.product_code}`}
                className="text-neutral-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 font-medium"
              >
                <Download size={16} /> Spec Sheet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: KEY SPECIFICATIONS (BENTO GRID)
          ============================================ */}
      {keySpecs.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Technical Overview</p>
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Key Specifications</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {keySpecs.slice(0, 6).map((spec, index) => (
                <SpecCard key={spec.label} icon={spec.icon} label={spec.label} value={spec.value} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SECTION 3: APPLICATIONS
          ============================================ */}
      {applications.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Ideal Use Cases</p>
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Recommended Applications</h2>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {applications.map((app, index) => (
                <motion.span 
                  key={app}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium ${isDark ? 'bg-white/[0.05] text-white/80 border border-white/[0.08]' : 'bg-neutral-100 text-neutral-700'} inline-flex items-center gap-2`}
                >
                  <Check size={14} className="text-cyan-400" />
                  {app}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SECTION 4: FULL SPECIFICATIONS
          ============================================ */}
      {fullSpecs.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Complete Details</p>
                <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Technical Specifications</h2>
              </div>
              {fullSpecs.length > 6 && (
                <button
                  onClick={() => setSpecsExpanded(!specsExpanded)}
                  className={`flex items-center gap-2 text-sm ${textSecondary} hover:text-cyan-400 transition-colors`}
                >
                  {specsExpanded ? 'Show Less' : 'Show All'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${specsExpanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </motion.div>

            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-white shadow-lg'}`}>
              <div className="grid md:grid-cols-2">
                {fullSpecs
                  .slice(0, specsExpanded ? undefined : 6)
                  .map((spec, index) => (
                  <div 
                    key={spec.label} 
                    className={`flex justify-between items-center px-6 py-4 ${index % 2 === 0 ? '' : isDark ? 'bg-white/[0.01]' : 'bg-neutral-50'} ${isDark ? 'border-b border-white/[0.04]' : 'border-b border-neutral-100'}`}
                  >
                    <span className={textSecondary}>{spec.label}</span>
                    <span className={`font-medium ${textPrimary}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SECTION 5: QUOTE FORM
          ============================================ */}
      <section id="quote-form" className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-3xl ${isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-neutral-50'}`}
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Info */}
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Get Pricing</p>
                <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-4`}>Request a Quote</h2>
                <p className={`${textSecondary} mb-8`}>
                  Get pricing, lead times, and custom configuration options for the {product.name}. Our team typically responds within 2 hours.
                </p>
                
                <div className="space-y-3">
                  {['Free project consultation', 'Custom size & configuration', 'Competitive volume pricing', '2-year manufacturer warranty', 'Local stock in Dubai'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <Check size={12} className="text-cyan-400" />
                      </div>
                      <span className={`text-sm ${textSecondary}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Product Preview */}
                <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-white border border-neutral-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <CdnImage src={product.image_url} alt={product.name} className="w-full h-full" imgClassName="w-full h-full object-cover" w={100} />
                    </div>
                    <div>
                      <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">{product.product_code}</span>
                      <h4 className={`text-sm font-bold ${textPrimary}`}>{product.name}</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                      <Check size={36} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>Quote Request Sent</h3>
                    <p className={`text-sm ${textSecondary} text-center`}>
                      We'll contact you within 2 hours with pricing for {product.product_code}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuote} className="space-y-4">
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${textSecondary} mb-2 block`}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors`}
                        data-testid="quote-name-input"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${textSecondary} mb-2 block`}>Email Address *</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors`}
                        data-testid="quote-email-input"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${textSecondary} mb-2 block`}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formState.phone}
                        onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors`}
                        data-testid="quote-phone-input"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${textSecondary} mb-2 block`}>Project Details</label>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={4}
                        value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors resize-none`}
                        data-testid="quote-message-input"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={submitting} 
                      className={`w-full bg-gradient-to-r ${colors.gradient} text-white font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2 hover:opacity-90`}
                      data-testid="quote-submit-btn"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: RELATED PRODUCTS
          ============================================ */}
      {related.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">More Options</p>
                <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>Related Products</h2>
              </div>
              <Link 
                to={`/products?category=${product.category}`} 
                className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
              >
                View All <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {related.map((p) => (
                <RelatedProductCard key={p._id || p.id} product={p} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SECTION 7: BOTTOM CTA
          ============================================ */}
      <section className={`py-16 lg:py-24 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-3xl text-center ${isDark ? 'bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]' : 'bg-neutral-50'}`}
          >
            <div className={`absolute inset-0 ${colors.glow} opacity-20 blur-3xl rounded-3xl`} />
            
            <div className="relative z-10">
              <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-4`}>
                Not sure which product is right?
              </h2>
              <p className={`${textSecondary} mb-8 max-w-xl mx-auto`}>
                Use our specifier tools or talk to our experts for personalized recommendations.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/calculator"
                  className={`bg-gradient-to-r ${colors.gradient} text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                >
                  Screen Calculator
                </Link>
                <Link
                  to="/contact"
                  className={`${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/20' : 'bg-neutral-100 hover:bg-neutral-200'} ${textPrimary} font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all`}
                >
                  Talk to Expert
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {product && <QuickInquiry context={product.name || 'this LED display'} />}
    </div>
  );
}
