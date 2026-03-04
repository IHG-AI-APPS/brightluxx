import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Zap, Send, Phone, Check } from 'lucide-react';
import { getProduct, getProducts, createLead } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import { trackProductView, trackQuoteRequest } from '../lib/tracker';
import QuickInquiry from '../components/QuickInquiry';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`blx-scroll-glow ${inView ? 'in-view' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
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
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [related, setRelated] = useState([]);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        // Fetch related products from same category
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
      <div className="py-32 flex items-center justify-center" data-testid="product-detail-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center" data-testid="product-not-found">
        <div className="max-w-[1320px] mx-auto px-4">
          <h1 className="mb-4">Product Not Found</h1>
          <p className="text-sm text-[var(--blx-text-2)] mb-6 tracking-wider">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-gold px-6 py-3">Browse All Products</Link>
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
    <div className="py-16" data-testid={`product-detail-${product.slug}`}>
      <SEO
        title={`${product.name} — ${product.product_code}`}
        description={`${product.tagline}. ${product.pixel_pitch} pixel pitch, ${product.brightness} brightness. ${product.description?.slice(0, 100)}`}
        image={product.image_url}
        path={`/products/${product.slug}`}
        type="product"
        jsonLd={productJsonLd}
      />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[0.6875rem] tracking-wider" data-testid="product-breadcrumb">
          <Link to="/products" className="text-[var(--blx-muted)] hover:text-[var(--blx-text)] transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft size={14} /> All Products
          </Link>
          <span className="text-[var(--blx-border-2)]">/</span>
          <Link to={`/products?category=${product.category}`} className="text-[var(--blx-muted)] hover:text-[var(--blx-text)] transition-colors">
            {CATEGORY_LABELS[product.category] || product.category}
          </Link>
          <span className="text-[var(--blx-border-2)]">/</span>
          <span className="text-[var(--blx-text-2)]">{product.product_code}</span>
        </div>

        {/* Main Section: Gallery + Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

          {/* Gallery */}
          <FadeIn>
            <div data-testid="product-gallery">
              <div className="rounded-2xl overflow-hidden mb-3 relative group">
                <CdnImage
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-[360px] sm:h-[440px]"
                  w={800}
                  eager
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(i => i > 0 ? i - 1 : gallery.length - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      data-testid="gallery-prev"
                    >
                      <ChevronLeft size={18} className="text-white" />
                    </button>
                    <button
                      onClick={() => setActiveImage(i => i < gallery.length - 1 ? i + 1 : 0)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      data-testid="gallery-next"
                    >
                      <ChevronRight size={18} className="text-white" />
                    </button>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                        i === activeImage ? 'border-[var(--blx-gold-3)] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                      data-testid={`gallery-thumb-${i}`}
                    >
                      <img src={img} alt="" className="w-16 h-16 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn delay={100}>
            <div data-testid="product-info">
              <div className="flex items-center gap-3 mb-3">
                <span className="category-badge">{product.product_code}</span>
                <span className="text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] font-bold">
                  {CATEGORY_LABELS[product.category] || product.category}
                </span>
                {product.new_arrival && (
                  <span className="text-[0.5625rem] px-2.5 py-0.5 rounded-full font-bold tracking-wider" style={{ background: 'rgba(229,197,116,0.12)', color: 'var(--blx-gold-3)', border: '1px solid rgba(229,197,116,0.15)' }}>
                    New
                  </span>
                )}
              </div>

              <h1 className="mb-2" data-testid="product-detail-title">{product.name}</h1>
              <p className="text-sm text-[var(--blx-gold-3)] font-medium tracking-wider mb-4">{product.tagline}</p>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-6">{product.description}</p>

              {/* Quick Specs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {product.pixel_pitch && (
                  <div className="glass-panel px-4 py-2.5 text-center min-w-[100px]">
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-[0.15em] mb-0.5">Pixel Pitch</div>
                    <div className="text-sm font-bold text-[var(--blx-gold-3)]">{product.pixel_pitch}</div>
                  </div>
                )}
                {product.brightness && (
                  <div className="glass-panel px-4 py-2.5 text-center min-w-[100px]">
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-[0.15em] mb-0.5">Brightness</div>
                    <div className="text-sm font-bold text-[var(--blx-gold-3)]">{product.brightness}</div>
                  </div>
                )}
                {product.resolution && (
                  <div className="glass-panel px-4 py-2.5 text-center min-w-[100px]">
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-[0.15em] mb-0.5">Resolution</div>
                    <div className="text-sm font-bold text-[var(--blx-gold-3)]">{product.resolution}</div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <a href="#quote-form" className="btn-gold px-8 py-3.5 flex-1 text-center inline-flex items-center justify-center gap-2" data-testid="product-request-quote-btn">
                  <Send size={14} /> Request Quote
                </a>
                <a
                  href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I'm interested in ${product.product_code} - ${product.name}. Can you share pricing and availability?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass px-6 py-3.5 inline-flex items-center gap-2"
                  data-testid="product-whatsapp-btn"
                >
                  <Phone size={14} /> WhatsApp
                </a>
              </div>

              {/* Applications */}
              {applications.length > 0 && (
                <div>
                  <h4 className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2">Ideal For</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {applications.map((app, i) => (
                      <span key={i} className="text-[0.5625rem] px-2.5 py-1 rounded-full tracking-wider font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--blx-text-2)', }}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Full Specifications Table */}
        {product.key_specs?.length > 0 && (
          <FadeIn>
            <section className="mb-16" data-testid="product-specs-section">
              <h2 className="mb-6">Technical Specifications</h2>
              <div className="glass-panel overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <th className="text-left text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] py-3 px-6 w-1/3">Parameter</th>
                      <th className="text-left text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] py-3 px-6">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <td className="py-3 px-6 text-xs font-medium tracking-wider">Pixel Pitch</td>
                      <td className="py-3 px-6 text-xs text-[var(--blx-text-2)] tracking-wider">{product.pixel_pitch}</td>
                    </tr>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <td className="py-3 px-6 text-xs font-medium tracking-wider">Resolution</td>
                      <td className="py-3 px-6 text-xs text-[var(--blx-text-2)] tracking-wider">{product.resolution}</td>
                    </tr>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <td className="py-3 px-6 text-xs font-medium tracking-wider">Brightness</td>
                      <td className="py-3 px-6 text-xs text-[var(--blx-text-2)] tracking-wider">{product.brightness}</td>
                    </tr>
                    {product.key_specs.map((spec, i) => (
                      <tr key={i} className={i < product.key_specs.length - 1 ? 'border-b border-[var(--blx-hairline)]' : ''}>
                        <td className="py-3 px-6 text-xs font-medium tracking-wider">{spec.label}</td>
                        <td className="py-3 px-6 text-xs text-[var(--blx-text-2)] tracking-wider">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Quote Request Form */}
        <FadeIn>
          <section id="quote-form" className="mb-16" data-testid="product-quote-form">
            <div className="glass-panel p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="mb-2">Request a Quote</h2>
                  <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-4">
                    Get pricing, lead times, and custom configuration options for the {product.name}. Our team typically responds within 2 hours.
                  </p>
                  <div className="space-y-3 text-xs text-[var(--blx-text-2)] tracking-wider">
                    <div className="flex items-center gap-2"><Zap size={14} className="text-[var(--blx-gold-3)]" /> Free project consultation</div>
                    <div className="flex items-center gap-2"><Zap size={14} className="text-[var(--blx-gold-3)]" /> Custom size & configuration options</div>
                    <div className="flex items-center gap-2"><Zap size={14} className="text-[var(--blx-gold-3)]" /> Competitive volume pricing</div>
                    <div className="flex items-center gap-2"><Zap size={14} className="text-[var(--blx-gold-3)]" /> 2-year manufacturer warranty</div>
                  </div>
                </div>
                <div>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full py-8" data-testid="product-quote-success">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(229,197,116,0.12)', border: '1px solid rgba(229,197,116,0.2)' }}>
                        <Check size={24} className="text-[var(--blx-gold-3)]" />
                      </div>
                      <h3 className="text-sm font-bold mb-1">Quote Request Sent</h3>
                      <p className="text-xs text-[var(--blx-text-2)] tracking-wider text-center">
                        We'll contact you within 2 hours with pricing for {product.product_code}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuote} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        className="input-luxury w-full"
                        data-testid="quote-name-input"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        className="input-luxury w-full"
                        data-testid="quote-email-input"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                        className="input-luxury w-full"
                        data-testid="quote-phone-input"
                      />
                      <textarea
                        placeholder={`Tell us about your project (optional)\ne.g., quantity needed, installation size, timeline...`}
                        rows={3}
                        value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        className="input-luxury w-full resize-none"
                        data-testid="quote-message-input"
                      />
                      <div className="glass-panel px-3 py-2 text-[0.625rem] text-[var(--blx-muted)] tracking-wider">
                        Product: {product.product_code} — {product.name}
                      </div>
                      <button type="submit" disabled={submitting} className="btn-gold w-full py-3.5 flex items-center justify-center gap-2" data-testid="quote-submit-btn">
                        {submitting ? <div className="loading-spinner w-4 h-4" /> : <><Send size={14} /> Send Quote Request</>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mb-16" data-testid="product-related-section">
            <div className="flex items-center justify-between mb-8">
              <h2>Related Products</h2>
              <Link to={`/products`} className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <FadeIn key={p.id || p._id}>
                  <Link to={`/products/${p.slug}`} className="product-card group block" data-testid="related-product-card">
                    <div className="relative overflow-hidden">
                      <CdnImage src={p.image_url} alt={p.name} className="w-full h-40" imgClassName="group-hover:scale-105 transition-transform duration-500" w={400} />
                      <div className="absolute top-3 left-3">
                        <span className="category-badge">{p.product_code}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-bold mb-1 tracking-wider">{p.name}</h3>
                      <p className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider line-clamp-1">{p.tagline}</p>
                      <div className="flex gap-2 mt-2 text-[0.625rem] text-[var(--blx-text-2)]">
                        <span>{p.pixel_pitch}</span>
                        <span className="text-[var(--blx-border-2)]">|</span>
                        <span>{p.brightness}</span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="text-center py-8" data-testid="product-bottom-cta">
          <h3 className="text-lg mb-2">Not Sure Which Product Is Right?</h3>
          <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-6">Use our tools to find the perfect LED display for your project.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/calculator" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2" data-testid="product-cta-calculator">
              Screen Calculator
            </Link>
            <Link to="/compare" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2" data-testid="product-cta-compare">
              Compare Products
            </Link>
            <Link to="/contact" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2" data-testid="product-cta-contact">
              Talk to an Expert
            </Link>
          </div>
        </section>

      </div>
      {product && <QuickInquiry context={product.name || product.title || 'this LED display'} />}
    </div>
  );
}
