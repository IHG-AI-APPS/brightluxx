import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Monitor, Layers, Zap, Wifi, Smartphone, Grid3X3, RotateCcw, Sun, Thermometer, Droplets, Maximize2, Eye, Shield, Move, Hand, Puzzle, Presentation, Users, Video, Mic, Store, Tag, ShoppingBag, Coffee, Waves, Building2, Ruler, FolderClosed, Circle, Footprints, Gamepad2, Theater, Music, Wind, Feather, Cloud, Sparkles, Shirt, Battery, Box, Cpu, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../utils/seoSchemas';
import { AIFactsBox, AIProductSummary, VoiceSearchFAQ, AIQuickAnswer } from '../../components/AIOptimizedContent';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping
const ICONS = {
  Monitor, Layers, Zap, Wifi, Smartphone, Grid3X3, RotateCcw, Sun, Thermometer, 
  Droplets, Maximize2, Eye, Shield, Move, Hand, Puzzle, Presentation, Users, 
  Video, Mic, Store, Tag, ShoppingBag, Coffee, Waves, Building2, Ruler, 
  FolderClosed, Circle, Footprints, Gamepad2, Theater, Music, Wind, Feather, 
  Cloud, Sparkles, Shirt, Battery, Box, Cpu, Type
};

const getIcon = (iconName) => ICONS[iconName] || Monitor;

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 30 }} 
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} 
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function PixelVueProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/pixelvue/products/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Product not found');
          } else {
            throw new Error('Failed to fetch product');
          }
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-neutral-400 mb-8">{error || 'The requested product could not be found.'}</p>
          <Link to="/pixelvue" className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors">
            Back to PixelVue
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = product.category === 'poster' ? 'rose' : product.category === 'commercial' ? 'emerald' : 'violet';
  const categoryLabel = product.category === 'poster' ? 'LED Poster Series' : product.category === 'commercial' ? 'Commercial Series' : 'Creative Series';

  // Generate SEO schemas
  const productSchema = generateProductSchema(product, `/pixelvue/${slug}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'PixelVue', path: '/pixelvue' },
    { name: product.name, path: `/pixelvue/${slug}` }
  ]);
  
  // Generate FAQ schema if product has FAQs
  const faqSchema = product.faqs && product.faqs.length > 0 
    ? generateFAQSchema(product.faqs.map(f => ({ q: f.question, a: f.answer })))
    : null;

  // Combine all schemas
  const jsonLdSchemas = [productSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid={`pixelvue-product-${slug}`}>
      <SEO 
        title={product.seo_title || `${product.name} - PixelVue LED Display | Brightluxx`} 
        description={product.seo_description || product.description} 
        path={`/pixelvue/${slug}`}
        jsonLd={jsonLdSchemas}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {product.hero_image ? (
            <img src={product.hero_image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> All PixelVue Products
            </Link>
          </div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn>
                <p className={`text-${categoryColor}-400 text-xs tracking-[0.3em] uppercase mb-4`}>{categoryLabel}</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">{product.name}</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-6">{product.tagline}</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 mb-8">{product.description}</p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Quote
                  </Link>
                  <a href="#specs" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    View Specs
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      {product.quick_specs && product.quick_specs.length > 0 && (
        <section className={`py-12 px-6 border-b border-neutral-800 bg-${categoryColor}-500/5`}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {product.quick_specs.map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-3xl font-light text-white">{spec.value}</div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      {product.features && product.features.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Features</p>
                <h2 className="text-3xl font-extralight text-white">Key Capabilities</h2>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, i) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <FadeIn key={i} delay={i + 1}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-${categoryColor}-500/10 border border-${categoryColor}-500/20 flex items-center justify-center flex-shrink-0`}>
                        <IconComponent size={20} className={`text-${categoryColor}-400`} />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      {product.applications && product.applications.length > 0 && (
        <section className="py-20 px-6 bg-neutral-900/30">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
                <h2 className="text-3xl font-extralight text-white">Perfect For Any Environment</h2>
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <div className="flex flex-wrap justify-center gap-3">
                {product.applications.map((app, i) => (
                  <span key={i} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-sm text-sm">
                    {app.name}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <section id="specs" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p>
                <h2 className="text-3xl font-extralight text-white">Specifications</h2>
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-neutral-800 rounded-sm p-6">
                  <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                  <div className="space-y-3">
                    {product.specifications.slice(0, Math.ceil(product.specifications.length / 2)).map((spec, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-neutral-500 text-sm">{spec.label}</span>
                        <span className="text-white text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-neutral-800 rounded-sm p-6">
                  <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                  <div className="space-y-3">
                    {product.specifications.slice(Math.ceil(product.specifications.length / 2)).map((spec, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-neutral-500 text-sm">{spec.label}</span>
                        <span className="text-white text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* AI-Optimized Content Section - For AI/LLM Search Visibility */}
      <section className="py-20 px-6 bg-neutral-900/30" data-testid="ai-optimized-content">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Overview</p>
              <h2 className="text-3xl font-extralight text-white">At a Glance</h2>
            </div>
          </FadeIn>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Facts Box - Quick extractable facts */}
            <FadeIn delay={1}>
              <AIFactsBox
                title={`${product.name} Quick Facts`}
                entityName={product.name}
                entityType="Product"
                isDark={true}
                facts={[
                  ...(product.quick_specs || []).slice(0, 4).map(spec => ({
                    label: spec.label,
                    value: spec.value,
                    itemProp: spec.label.toLowerCase().includes('pitch') ? 'width' : 
                              spec.label.toLowerCase().includes('brightness') ? 'brightness' : undefined
                  })),
                  { label: 'Category', value: categoryLabel, itemProp: 'category' },
                  { label: 'Brand', value: 'Brightluxx', itemProp: 'brand' },
                  { label: 'Availability', value: 'In Stock', itemProp: 'availability' }
                ]}
              />
            </FadeIn>
            
            {/* Quick Answer - Direct answer format for voice search */}
            <FadeIn delay={2}>
              <AIQuickAnswer
                question={`What is the ${product.name}?`}
                answer={`The ${product.name} is a ${categoryLabel.toLowerCase()} LED display by Brightluxx. ${product.tagline}. ${product.description?.slice(0, 200)}${product.description?.length > 200 ? '...' : ''}`}
                source="Brightluxx Official Product Specifications"
                isDark={true}
              />
            </FadeIn>
          </div>

          {/* Voice Search Optimized FAQs - if product has FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <FadeIn delay={3} className="mt-8">
              <VoiceSearchFAQ
                faqs={product.faqs.map(f => ({ question: f.question, answer: f.answer }))}
                productName={product.name}
                isDark={true}
              />
            </FadeIn>
          )}
        </div>
      </section>

      {/* Hidden AI-readable product summary for machine extraction */}
      <AIProductSummary
        name={product.name}
        category={categoryLabel}
        tagline={product.tagline}
        keyFeatures={(product.features || []).slice(0, 5).map(f => f.title)}
        availability="Available"
        isDark={true}
      />

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-20 px-6 bg-neutral-900/30">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
                <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
              </div>
            </FadeIn>
            <div className="space-y-2">
              {product.faqs.map((faq, i) => (
                <FadeIn key={i} delay={i + 1}>
                  <div className="border border-neutral-800 rounded-sm overflow-hidden">
                    <button 
                      className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors" 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0 }} 
                          animate={{ height: 'auto' }} 
                          exit={{ height: 0 }} 
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`py-20 px-6 text-center bg-${categoryColor}-500/5 border-t border-${categoryColor}-500/10`}>
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Order {product.name}?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a quote for your {product.name} deployment. Volume pricing and custom configurations available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Quote
            </Link>
            <Link to="/pixelvue" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
              More Products
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
