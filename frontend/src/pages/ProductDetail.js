import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Send, MessageCircle, Download, Grid3X3, Sun, Monitor, RefreshCw, Zap, Eye, Shield, Layers, ChevronDown, ShoppingBag, Building2, Theater, TrafficCone, Globe, Box, Cuboid, GraduationCap, Tv, Sparkles } from 'lucide-react';
import { getProduct, getProducts, createLead } from '../api';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { trackProductView, trackQuoteRequest } from '../lib/tracker';
import QuickInquiry from '../components/QuickInquiry';
import ReviewSection from '../components/ReviewSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

function FAQItem({ q, a, isDark, text1, text2, card }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border ${card} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-4 text-left ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-neutral-50'} transition-colors`}
        data-testid={`faq-toggle-${q.substring(0, 20).replace(/\s/g, '-')}`}
      >
        <span className={`text-sm font-semibold ${text1} pr-4`}>{q}</span>
        <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`px-4 pb-4 text-sm ${text2} leading-relaxed`}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

const CATEGORY_COLORS = {
  'cob-microled': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  'mip': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  'indoor': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'outdoor': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'transparent': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'flexible': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'all-in-one': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'default': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const bg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const text1 = isDark ? 'text-white' : 'text-neutral-900';
  const text2 = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const card = isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-neutral-200';

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubmitted(false);
    setActiveImage(null);
    const load = async () => {
      setLoading(true);
      try {
        const res = await getProduct(slug);
        setProduct(res.data);
        trackProductView(slug, res.data.category);
        const rel = await getProducts({ category: res.data.category });
        setRelated((rel.data.products || []).filter(p => p.slug !== slug).slice(0, 4));
      } catch (e) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        name: formData.name, email: formData.email, phone: formData.phone,
        message: formData.message || `Quote request for ${product.product_code}`,
        product_interest: product.product_code, application: product.category, source: 'product_detail'
      });
      trackQuoteRequest(product.slug);
      setSubmitted(true);
    } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-xl font-bold ${text1} mb-4`}>Product Not Found</h1>
          <Link to="/products" className="text-cyan-400 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const colorClass = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.default;
  const galleryImages = [product.image_url, ...(product.gallery || [])].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 4);
  const currentImage = activeImage || product.image_url;
  const apps = product.application ? product.application.split(',').map(a => a.trim()) : [];
  
  // Build specs array
  const specs = [
    product.pixel_pitch && { icon: Grid3X3, label: 'Pixel Pitch', value: product.pixel_pitch },
    product.brightness && { icon: Sun, label: 'Brightness', value: product.brightness },
    product.resolution && { icon: Monitor, label: 'Resolution', value: product.resolution },
    product.refresh_rate && { icon: RefreshCw, label: 'Refresh Rate', value: product.refresh_rate },
    ...(product.key_specs || []).slice(0, 4).map(s => ({ icon: Layers, label: s.label, value: s.value }))
  ].filter(Boolean).slice(0, 6);

  return (
    <div className={`min-h-screen ${bg}`} data-testid={`product-detail-${product.slug}`}>
      <SEO
        title={`${product.name} | Brightluxx LED Dubai`}
        description={product.tagline || product.description?.slice(0, 160)}
        image={product.image_url}
        path={`/products/${product.slug}`}
        type="product"
      />

      {/* ===== HEADER SECTION ===== */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <Breadcrumbs 
          items={[
            { name: 'Products', path: '/products' },
            { name: CATEGORY_LABELS[product.category] || product.category, path: `/products?category=${product.category}` },
            { name: product.name, path: null }
          ]} 
        />
      </div>

      {/* ===== MAIN PRODUCT SECTION (Split Layout) ===== */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Product Image + Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`relative rounded-2xl overflow-hidden border ${card} aspect-[4/3]`} data-testid="product-main-image">
              <CdnImage
                key={currentImage}
                src={currentImage}
                alt={product.name}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
                w={800}
                eager
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${colorClass}`}>
                  {CATEGORY_LABELS[product.category] || product.category}
                </span>
              </div>
            </div>
            {galleryImages.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3" data-testid="product-gallery-thumbnails">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    data-testid={`product-gallery-thumb-${idx}`}
                    aria-label={`View image ${idx + 1} of ${product.name}`}
                    className={`relative rounded-xl overflow-hidden border aspect-[4/3] transition-all duration-300 ${
                      currentImage === img
                        ? 'border-amber-400 ring-2 ring-amber-400/50 opacity-100'
                        : `${card} opacity-60 hover:opacity-100`
                    }`}
                  >
                    <CdnImage src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full" imgClassName="w-full h-full object-cover" w={300} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Product Code & Pitch */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-xs font-mono ${text2}`}>{product.product_code}</span>
              {product.pixel_pitch && (
                <span className="px-2.5 py-1 rounded-lg text-sm font-bold bg-cyan-500 text-black">
                  {product.pixel_pitch}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold ${text1} tracking-tight`}>
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-lg text-cyan-400 font-medium">{product.tagline}</p>
            )}

            {/* Description */}
            {product.description && (
              <p className={`${text2} leading-relaxed`}>{product.description}</p>
            )}

            {/* Quick Specs Grid */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specs.map((spec, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${card}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <spec.icon size={14} className="text-cyan-400" />
                      <span className={`text-[10px] uppercase tracking-wider ${text2}`}>{spec.label}</span>
                    </div>
                    <p className={`text-sm font-semibold ${text1}`}>{spec.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#quote"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                data-testid="request-quote-btn"
              >
                <Send size={16} /> Get Quote
              </a>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I need pricing for ${product.product_code} - ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`border ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'} font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors`}
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      {apps.length > 0 && (
        <section className={`py-16 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-3">Applications</p>
            <h2 className={`text-2xl font-bold ${text1} mb-6`}>Ideal For</h2>
            <div className="flex flex-wrap gap-2">
              {apps.map((app, i) => (
                <span key={i} className={`px-4 py-2 rounded-full text-sm border ${card} ${text2} inline-flex items-center gap-2`}>
                  <Check size={14} className="text-cyan-400" /> {app}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== QUOTE FORM ===== */}
      <section id="quote" className={`py-16 ${bg}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`rounded-2xl border ${card} p-8 md:p-12`}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Info */}
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-3">Get Pricing</p>
                <h2 className={`text-2xl md:text-3xl font-bold ${text1} mb-4`}>Request a Quote</h2>
                <p className={`${text2} mb-6`}>
                  Get competitive pricing, delivery times, and custom configurations. We respond within 2 hours.
                </p>
                
                {/* Benefits */}
                <div className="space-y-3">
                  {['Free consultation', 'Custom sizes available', 'Volume discounts', '2-year warranty', 'Dubai stock'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check size={16} className="text-cyan-400" />
                      <span className={`text-sm ${text2}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Product Preview */}
                <div className={`mt-8 p-4 rounded-xl border ${card} flex items-center gap-4`}>
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <CdnImage src={product.image_url} alt={product.name} className="w-full h-full" imgClassName="w-full h-full object-cover" w={100} />
                  </div>
                  <div>
                    <span className="text-xs text-cyan-400 font-bold">{product.product_code}</span>
                    <h4 className={`text-sm font-semibold ${text1}`}>{product.name}</h4>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                      <Check size={32} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-lg font-bold ${text1} mb-2`}>Request Sent</h3>
                    <p className={`text-sm ${text2} text-center`}>We'll contact you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${text2} mb-2 block`}>Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(s => ({ ...s, name: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${text2} mb-2 block`}>Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(s => ({ ...s, email: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500`}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${text2} mb-2 block`}>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData(s => ({ ...s, phone: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500`}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className={`text-xs uppercase tracking-widest ${text2} mb-2 block`}>Message</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData(s => ({ ...s, message: e.target.value }))}
                        className={`w-full ${isDark ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'} border rounded-xl px-4 py-3 outline-none focus:border-cyan-500 resize-none`}
                        placeholder="Project details..."
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2"
                    >
                      {submitting ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Send size={16} /> Send Request</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      {product.applications && product.applications.length > 0 && (
        <section className={`py-16 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-50'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Ideal Applications</p>
            <h2 className={`text-2xl font-bold ${text1} mb-8`}>Where {product.name} Excels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.applications.map((app) => {
                const ICONS = { ShoppingBag, Building2, Theater, TrafficCone, Globe, Grid3X3, Box, Cuboid, GraduationCap, Tv, Monitor, Sparkles, Eye, Zap, Shield, Layers };
                const Icon = ICONS[app.icon] || Monitor;
                return (
                  <div key={app.title} className={`p-5 rounded-xl border ${card}`} data-testid={`app-${app.title}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
                        <Icon size={18} className="text-cyan-500" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold ${text1} mb-1`}>{app.title}</h3>
                        <p className={`text-xs ${text2} leading-relaxed`}>{app.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {product.faq && product.faq.length > 0 && (
        <section className={`py-16 ${isDark ? '' : 'bg-white'}`}>
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Frequently Asked Questions</p>
            <h2 className={`text-2xl font-bold ${text1} mb-8`}>{product.name} FAQ</h2>
            <div className="space-y-3" data-testid="product-faq-section">
              {product.faq.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} isDark={isDark} text1={text1} text2={text2} card={card} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== REVIEWS ===== */}
      <ReviewSection slug={slug} productName={product.name} isDark={isDark} text1={text1} text2={text2} card={card} />

      {/* ===== RELATED PRODUCTS ===== */}
      {related.length > 0 && (
        <section className={`py-16 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-2">Similar Products</p>
                <h2 className={`text-2xl font-bold ${text1}`}>You May Also Like</h2>
              </div>
              <Link to={`/products?category=${product.category}`} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p._id || p.id} to={`/products/${p.slug}`} className={`group rounded-xl border ${card} overflow-hidden`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <CdnImage src={p.image_url} alt={p.name} className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" w={300} />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-cyan-400 font-bold">{p.pixel_pitch || p.product_code}</span>
                    <h3 className={`text-sm font-semibold ${text1} line-clamp-1 mt-1`}>{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {product && <QuickInquiry context={product.name} />}
    </div>
  );
}
