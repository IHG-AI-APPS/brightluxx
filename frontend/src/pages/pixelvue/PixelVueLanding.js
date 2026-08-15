import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Monitor, Tv, Layers, Sparkles, Building2, Store, Theater, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO, { useSeoData } from '../../components/SEO';
import { generateItemListSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../utils/seoSchemas';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>);
};

// Category metadata (static - icons and colors don't change)
const CATEGORY_META = {
  poster: { name: 'LED Poster', tagline: 'Stand-Alone Digital Signage', desc: 'Slim, portable LED displays perfect for retail, hospitality, and events.', icon: Tv },
  commercial: { name: 'Commercial', tagline: 'Business Display Solutions', desc: 'Professional-grade displays for retail windows, conference rooms, and commercial environments.', icon: Building2 },
  creative: { name: 'Creative', tagline: 'Artistic LED Installations', desc: 'Custom shapes, interactive floors, and immersive experiences for events, museums, and brand activations.', icon: Sparkles },
};

const STATS = [
  { value: '100K+', label: 'Hours Lifespan' },
  { value: '3840Hz', label: 'Refresh Rate' },
  { value: '160°', label: 'Viewing Angle' },
  { value: '3 Yr', label: 'Warranty' },
];

const APPLICATIONS = [
  { name: 'Retail', icon: Store, image: 'https://files.ihgbrands.com/emergent-images/ced326fb45348ff3c6b3b94e1db2998bf72b515739eca5b1e63fdb20a397125d.png' },
  { name: 'Corporate', icon: Building2, image: 'https://files.ihgbrands.com/emergent-images/d52e33b1e76b48a833a09d71983a1b122cd56dc53b0511138e28f86aaaa48e76.png' },
  { name: 'Events', icon: Theater, image: 'https://files.ihgbrands.com/emergent-images/7e4f29b6e9b2cbee52ae90a4048ac94e36754ab9e13d106b0b28b7412a04bbd4.png' },
  { name: 'Hospitality', icon: Grid3X3, image: 'https://files.ihgbrands.com/emergent-images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png' },
];

const FAQS = [
  { q: 'What warranty do you offer?', a: '3-year warranty with EMC compliance, ETL & FCC certification, free spare parts, and local after-sales service in UAE.' },
  { q: 'What pixel pitch options are available?', a: 'We offer a wide range from P1.5 for close viewing (conference rooms) to P10 for larger viewing distances (outdoor). Our team will recommend the optimal pitch based on your viewing distance and content requirements.' },
  { q: 'Can displays be customized to specific sizes?', a: 'Yes! Most of our products are modular and can be configured to your exact dimensions. Creative LED screens can be made in virtually any shape including spheres, letters, and custom geometries.' },
  { q: 'How is content managed?', a: 'Our displays support multiple content management options: USB, HDMI, WiFi for local control, and optional 4G transmission for remote access. Cloud-based CMS available for enterprise deployments.' },
  { q: 'What is the typical lifespan?', a: 'Our LED displays are rated for 100,000+ hours of continuous operation (over 11 years at 24/7 use). With proper maintenance, many installations exceed this lifespan.' },
];

export default function PixelVueLanding() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('poster');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const seoData = useSeoData('/pixelvue');
  const heroAlt = seoData?.image_alt || 'PixelVue LED Displays';

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pixelvue/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        // console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Group products by category
  const productsByCategory = {
    poster: products.filter(p => p.category === 'poster'),
    commercial: products.filter(p => p.category === 'commercial'),
    creative: products.filter(p => p.category === 'creative'),
  };

  // Featured products (first 3 products with hero images)
  const featuredProducts = products.filter(p => p.hero_image).slice(0, 3);

  // Build categories array with dynamic product data
  const CATEGORIES = Object.entries(CATEGORY_META).map(([id, meta]) => ({
    id,
    ...meta,
    products: productsByCategory[id] || [],
  }));

  // Generate SEO schemas
  const itemListSchema = products.length > 0 
    ? generateItemListSchema(products, 'PixelVue LED Displays', '/pixelvue')
    : null;
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'PixelVue', path: '/pixelvue' }
  ]);
  
  const faqSchema = generateFAQSchema(FAQS);
  
  const allSchemas = [breadcrumbSchema, faqSchema, itemListSchema].filter(Boolean);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="pixelvue-landing">
      <SEO 
        title="PixelVue — LED Display Solutions | Brightluxx UAE" 
        description="Professional LED display solutions for retail, corporate, and creative applications. LED posters, commercial screens, and custom shape installations." 
        path="/pixelvue"
        jsonLd={allSchemas}
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/emergent-images/127b54193b9ab0ec636c8645560811771af1f58dde5daceea69f261828cf7c0a.png" alt={heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        </div>
        <div className="relative flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center text-center px-6 py-20">
            <div>
              <FadeIn><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">LED Display Solutions</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-4">PixelVue</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">Illuminate Your Vision</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 max-w-xl mx-auto mb-10">Professional LED display solutions for every application. From sleek digital posters to custom creative installations — bring your brand to life with stunning visual impact.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#categories" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">Explore Products</a>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={24} className="text-white/50" /></div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-neutral-800 bg-rose-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i}><div className="text-4xl font-light text-rose-400 mb-2">{stat.value}</div><div className="text-neutral-500 text-sm">{stat.label}</div></FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Featured</p><h2 className="text-4xl md:text-5xl font-extralight text-white">Bestselling Solutions</h2></div></FadeIn>
          {loading ? (
            <div className="text-center py-12 text-neutral-400">Loading products...</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, i) => (
                <FadeIn key={product.id || i} delay={i + 1}>
                  <Link to={`/pixelvue/${product.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-sm border border-neutral-800 hover:border-rose-500/30 transition-all duration-300">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={product.hero_image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-6 border-t border-neutral-800">
                        <p className="text-rose-400 text-xs tracking-[0.2em] uppercase mb-2">{product.tagline}</p>
                        <h3 className="text-xl font-light text-white mb-3">{product.name}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                        {product.quick_specs && product.quick_specs.length >= 2 && (
                          <div className="flex gap-4 mb-4">
                            {product.quick_specs.slice(0, 2).map((spec, idx) => (
                              <div key={idx}><div className="text-white font-medium text-sm">{spec.value}</div><div className="text-neutral-600 text-[10px] tracking-wider uppercase">{spec.label}</div></div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center text-white text-sm font-medium group-hover:text-rose-400 transition-colors">Learn More <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" /></div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Categories</p><h2 className="text-4xl font-extralight text-white">Complete Range</h2></div></FadeIn>
          
          {/* Category Tabs */}
          <FadeIn delay={1}>
            <div className="flex justify-center gap-4 mb-12">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-6 py-3 rounded-sm text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}>
                  <cat.icon size={16} className="inline mr-2" />{cat.name} ({cat.products.length})
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Category Content */}
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={activeCategory === cat.id ? 'block' : 'hidden'}>
              <FadeIn>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-white mb-2">{cat.tagline}</h3>
                  <p className="text-neutral-400 max-w-xl mx-auto">{cat.desc}</p>
                </div>
              </FadeIn>
              {loading ? (
                <div className="text-center py-8 text-neutral-400">Loading products...</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.products.map((product, i) => (
                    <FadeIn key={product.id || i} delay={i * 0.5}>
                      <Link to={`/pixelvue/${product.slug}`} className="group block p-4 border border-neutral-800 rounded-sm hover:border-rose-500/30 hover:bg-neutral-900/50 transition-all">
                        <h4 className="text-white font-medium mb-1 group-hover:text-rose-400 transition-colors">{product.name}</h4>
                        <p className="text-neutral-500 text-sm">{product.tagline || product.description?.substring(0, 60) + '...'}</p>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p><h2 className="text-4xl font-extralight text-white">Endless Possibilities</h2></div></FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={app.title} delay={i + 1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <app.icon size={24} className="text-rose-400 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">{app.name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p><h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2></div></FadeIn>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div></motion.div>)}</AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Other Product Lines */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p><h2 className="text-3xl font-extralight text-white">Other Product Lines</h2></div></FadeIn>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'LumiMorph', tagline: 'Textured LED Panels', color: 'cyan', link: '/lumimorph', image: 'https://files.ihgbrands.com/homepage_grande-hero.webp' },
              { name: 'NaturaTex', tagline: 'Texture Screens', color: 'emerald', link: '/naturatex', image: 'https://files.ihgbrands.com/emergent-images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png' },
              { name: 'SignaTouch', tagline: 'Digital Kiosks', color: 'amber', link: '/signatouch', image: 'https://files.ihgbrands.com/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png' },
              { name: 'GlassMorph', tagline: 'Smart Glass', color: 'violet', link: '/glassmorph', image: 'https://files.ihgbrands.com/emergent-images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png' },
            ].map((line, i) => (
              <FadeIn key={`line-${i}`} delay={i + 1}>
                <Link to={line.link} className="group block relative overflow-hidden rounded-sm aspect-[3/4]">
                  <img src={line.image} alt={line.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-${line.color}-400 text-xs tracking-wider uppercase mb-1`}>{line.tagline}</p>
                    <h3 className="text-white text-lg font-light">{line.name}</h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-rose-500/5 border-t border-rose-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Elevate Your Display?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a consultation. Our specialists will help you choose the perfect LED solution for your application.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/solutions" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Solutions</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
