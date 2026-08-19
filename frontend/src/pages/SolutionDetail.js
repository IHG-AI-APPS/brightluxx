import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Zap, Building2, ShoppingBag, MonitorPlay, Tv, Layers, TrafficCone, Theater, Globe, Heart, GraduationCap, Trophy, Sparkles, Sun, Music, Car, Video, Eye } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { BASE_URL } from '../components/SEO';
import QuickInquiry from '../components/QuickInquiry';
import { cdnUrl } from '../config/cdn';
import { motion } from 'framer-motion';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';
import { AIFactsBox, AIQuickAnswer } from '../components/AIOptimizedContent';
import RelatedCaseStudies from '../components/RelatedCaseStudies';

const API_URL = process.env.REACT_APP_BACKEND_URL;

/* AI-Generated Solution Images */
const SOLUTION_IMAGES = {
  retail: 'https://files.ihgbrands.com/emergent-images/f1edab22f7c00ed7647328b0726ef9e2724536d87fcb9797fe25887dfe20104e.png',
  corporate: 'https://files.ihgbrands.com/emergent-images/560b86307144e6c3e932bdd0b195203f9854ab40f18ea255c935eda9fdbcb23a.png',
  outdoor: 'https://files.ihgbrands.com/emergent-images/151c4ebb15ea6704fa3459bca85c7c02918980304175228ec6b8886cd43d9bee.png',
  events: 'https://files.ihgbrands.com/emergent-images/a27342dd23e1b9ce1afa6aa0fd9f5f0a6a841631c74a9ae412af243be9801a46.png',
  creative: 'https://files.ihgbrands.com/emergent-images/17b677abe013dc2ced0fab9c0eea6442ad18991722a3c325394d66f6e7ba115e.png',
  traffic: 'https://files.ihgbrands.com/emergent-images/eb6a2b60aa28770d377972ee091ae5e18a1a88eeba71cea58b2e2b07c8791e55.png',
  immersive: 'https://files.ihgbrands.com/emergent-images/6693621e07894f058b6d960fb917b36db40c6318357442d73fe106f4cd276e2f.png',
  transparent: 'https://files.ihgbrands.com/emergent-images/513865c504ff9437c4a554cc3b6a86c818e9a8468b5e05dcbcf11e350d3d6b79.png',
  healthcare: 'https://files.ihgbrands.com/emergent-images/5468030b6847618ff8d0962c44c0869ac72b92e3dda4acd1b88d4c21437ea6d9.png',
  education: 'https://files.ihgbrands.com/emergent-images/bcd5ee75376ec9db3ba96c6371c71a4c6db5ce02ff9d79deef4c0f56a73ad26d.png',
  sports: 'https://files.ihgbrands.com/emergent-images/0e3eabf34c883a9bfcba897e548960e8a53a87e819c5490c2053f97cb939d564.png',
};

const SOLUTION_HERO_IMAGES = {
  retail: 'https://files.ihgbrands.com/emergent-images/1e17d51897165f3c567fb1068bd91e95f713846e0b8dfc9d0d6b8dfc331e7c15.png',
  corporate: 'https://files.ihgbrands.com/emergent-images/8581b075158bc90730f45490bd7099982ba35ba2120543a49cc68a94837130a7.png',
  outdoor: 'https://files.ihgbrands.com/emergent-images/5f590dfb625ffadc07da67c64dee28cd82e8bc4102e3d5938e51d25796dda9af.png',
  events: 'https://files.ihgbrands.com/emergent-images/29b1b4f35b2132ff1c6ddca3c57098f7ab48000114c408e76fba47342730b7d7.png',
  creative: 'https://files.ihgbrands.com/emergent-images/60eb2ae04f2709ed722742111023c9e12d534db6e5548ae69f3bdff2ae24dc2c.png',
  traffic: 'https://files.ihgbrands.com/emergent-images/738fd99c2808488db2705be11de0b4237d2ccd2564d2175c3f587afc5528f116.png',
  immersive: 'https://files.ihgbrands.com/emergent-images/811080c892567c46a15b820cafaf94715e2452e5b623a604dbc72b8397718040.png',
  transparent: 'https://files.ihgbrands.com/emergent-images/c06085e1344cd73c610c96f64040296ae3600ce480bad81ce7df2b88201cad21.png',
  healthcare: 'https://files.ihgbrands.com/emergent-images/7c0abf443de9306553a36d6dab047cb2602297e3a624d790a1d2b35ac9e9a12f.png',
  education: 'https://files.ihgbrands.com/emergent-images/cdf329ff59e4cc2c9f37b9cfe18eeb3c5798e5d78249d786a64c83e7e31b84a8.png',
  sports: 'https://files.ihgbrands.com/emergent-images/9526e5947bd78aa69ff98d080f2cda56d8ede781a2848cfa1ba7ec2152cf57f4.png',
};

const ICON_MAP = { ShoppingBag, Building2, MonitorPlay, Theater, Layers, TrafficCone, Tv, Globe, Heart, GraduationCap, Trophy, Sparkles, Sun, Music, Car, Video, Eye, Briefcase: Building2 };

const useInView = (ref, threshold = 0.15) => {
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
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-500 ${className}`}>
    {children}
  </div>
);

/* Helper to get icon component from string name */
const getIconComponent = (iconName) => {
  if (typeof iconName === 'function') return iconName;
  return ICON_MAP[iconName] || ShoppingBag;
};

export default function SolutionDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [solution, setSolution] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch solution data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all solutions to get prev/next navigation
        const allRes = await fetch(`${API_URL}/api/solutions`);
        const allData = await allRes.json();
        setAllSolutions(allData);
        
        // Find current solution by slug
        const currentSolution = allData.find(s => s.slug === id);
        setSolution(currentSolution);
      } catch (error) {
        // console.error('Error fetching solution:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Get prev/next solutions for navigation
  const currentIndex = allSolutions.findIndex(s => s.slug === id);
  const prevSolution = currentIndex > 0 ? allSolutions[currentIndex - 1] : null;
  const nextSolution = currentIndex < allSolutions.length - 1 ? allSolutions[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!solution) return;
    const fetchProducts = async () => {
      try {
        // Fetch recommended products - for now show all products
        const res = await getProducts({ limit: 6 });
        setProducts(res.data.products || []);
      } catch (e) {
        // console.error('Error fetching products:', e);
      }
    };
    fetchProducts();
  }, [solution]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading solution...</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center" data-testid="solution-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Solution Not Found</h1>
          <Link to="/solutions" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> View All Solutions
          </Link>
        </div>
      </div>
    );
  }

  // Get icon from CMS icon name string
  const iconName = solution.icon || 'Building2';
  const Icon = ICON_MAP[iconName] || Building2;
  const solutionId = solution.slug || solution.id;
  const heroImage = solution.hero_image || SOLUTION_HERO_IMAGES[solutionId] || SOLUTION_HERO_IMAGES.retail;
  const useCases = solution.use_cases || solution.tags || [];
  const features = solution.features || [];
  const benefits = solution.benefits || [];

  // Generate SEO schemas
  const serviceSchema = generateServiceSchema({
    title: solution.title,
    description: solution.description,
    category: solution.category || 'LED Display Solutions',
    image: heroImage
  }, `/solutions/${solutionId}`);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: solution.title, path: `/solutions/${solutionId}` }
  ]);

  return (
    <div className="min-h-screen bg-[#050508]" data-testid={`solution-detail-${solutionId}`}>
      <SEO
        title={`${solution.title} — LED Solutions`}
        description={solution.description}
        image={heroImage}
        path={`/solutions/${solutionId}`}
        jsonLd={[serviceSchema, breadcrumbSchema]}
      />

      {/* Hero Section - Full Width Immersive */}
      <section className="relative min-h-[70vh] flex items-end" data-testid="solution-detail-hero">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={solution.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-16 lg:pb-24">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/solutions" 
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors mb-8 tracking-wider uppercase"
              data-testid="solution-back-link"
            >
              <ArrowLeft size={14} /> All Solutions
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl"
          >
            {/* Icon & Tagline */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Icon size={22} className="text-cyan-400" />
              </div>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
                {solution.tagline}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-white mb-6" data-testid="solution-detail-title">
              {solution.title}
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed tracking-wide mb-8">
              {solution.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                data-testid="solution-cta-quote"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
              <Link 
                to="/products" 
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
                data-testid="solution-cta-products"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Description Section */}
        <section className="py-16 lg:py-24" data-testid="solution-description">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeInSection>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Overview</span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6">The Solution</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed tracking-wide">
                <p>{solution.description}</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={1}>
              <div className="overflow-hidden">
                <img 
                  src={SOLUTION_IMAGES[solutionId] || heroImage} 
                  alt={solution.title} 
                  className="w-full h-80 lg:h-full object-cover"
                />
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Applications & Benefits */}
        <section className="py-16 lg:py-24 border-t border-white/5" data-testid="solution-apps-benefits">
          <div className="grid lg:grid-cols-2 gap-8">
            {useCases.length > 0 && (
              <FadeInSection>
                <GlassCard className="p-8 lg:p-10 h-full">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Use Cases</span>
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Applications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {useCases.map((app, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span className="text-sm text-gray-400 tracking-wide">{app}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>
            )}
            {benefits.length > 0 && (
              <FadeInSection delay={1}>
                <GlassCard className="p-8 lg:p-10 h-full">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Advantages</span>
                  <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Key Benefits</h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap size={12} className="text-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-400 tracking-wide">{typeof benefit === 'string' ? benefit : benefit.title}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>
            )}
          </div>
        </section>

        {/* Recommended Products */}
        {products.length > 0 && (
          <section className="py-16 lg:py-24 border-t border-white/5" data-testid="solution-recommended-products">
            <FadeInSection>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Products</span>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Recommended Products</h2>
                </div>
                <Link to="/products" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest transition-colors">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <FadeInSection key={product.id || product._id} delay={index}>
                  <Link to={`/products/${product.slug}`} className="group block" data-testid="solution-product-card">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4">
                      <CdnImage 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full"
                        imgClassName="group-hover:scale-110 transition-transform duration-700"
                        w={400} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-2 py-1 text-[9px] uppercase tracking-wider font-bold">
                          {product.product_code}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                      <span>{product.pixel_pitch}</span>
                      <span className="text-gray-700">|</span>
                      <span>{product.brightness}</span>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </section>
        )}

        {/* AI-Optimized Content Section - For AI/LLM Search Visibility */}
        <section className="py-16 lg:py-24 border-t border-white/5" data-testid="solution-ai-content">
          <FadeInSection>
            <div className="mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Quick Reference</span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Solution Overview</h2>
            </div>
          </FadeInSection>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Facts Box - Quick extractable facts about this solution */}
            <FadeInSection delay={1}>
              <AIFactsBox
                title={`${solution.title} Quick Facts`}
                entityName={solution.title}
                entityType="Service"
                isDark={true}
                facts={[
                  { label: 'Solution Type', value: solution.title, itemProp: 'serviceType' },
                  { label: 'Provider', value: 'Brightluxx', itemProp: 'provider' },
                  { label: 'Service Area', value: 'UAE & GCC Region', itemProp: 'areaServed' },
                  { label: 'Applications', value: useCases.slice(0, 3).join(', ') || 'Multiple Industries' },
                  { label: 'Key Benefits', value: benefits.slice(0, 2).map(b => typeof b === 'string' ? b : b.title).join(', ') || 'Custom Solutions' },
                  { label: 'Availability', value: 'Available Now', itemProp: 'availability' }
                ]}
              />
            </FadeInSection>
            
            {/* Quick Answer - Direct answer format for voice search */}
            <FadeInSection delay={2}>
              <AIQuickAnswer
                question={`What is ${solution.title} by Brightluxx?`}
                answer={`${solution.title} is a professional LED display solution provided by Brightluxx for ${useCases.slice(0, 3).join(', ').toLowerCase() || 'various industries'} in the UAE and GCC region. ${solution.description?.slice(0, 180)}${solution.description?.length > 180 ? '...' : ''}`}
                source="Brightluxx Official Solutions"
                isDark={true}
              />
            </FadeInSection>
          </div>
        </section>

        {/* Related Case Studies - Compact cards */}
        <RelatedCaseStudies 
          solutionSlug={id} 
          solutionTitle={solution.title}
          limit={3}
        />

        {/* Navigation */}
        <section className="py-16 lg:py-20 border-t border-white/5" data-testid="solution-cross-nav">
          <div className="flex items-center justify-between">
            {prevSolution ? (
              <Link
                to={`/solutions/${prevSolution.slug}`}
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors"
                data-testid="solution-prev"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform text-gray-600" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-gray-600 uppercase mb-1">Previous</div>
                  <div className="text-sm font-bold uppercase tracking-wide">{prevSolution.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextSolution ? (
              <Link
                to={`/solutions/${nextSolution.slug}`}
                className="group flex items-center gap-4 text-right text-gray-400 hover:text-white transition-colors"
                data-testid="solution-next"
              >
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-gray-600 uppercase mb-1">Next</div>
                  <div className="text-sm font-bold uppercase tracking-wide">{nextSolution.title}</div>
                </div>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform text-gray-600" />
              </Link>
            ) : <div />}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 lg:py-24 text-center border-t border-white/5" data-testid="solution-bottom-cta">
          <FadeInSection>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-400 text-sm tracking-wide mb-10 max-w-md mx-auto">
              Our experts will analyze your specific requirements and recommend the perfect LED setup.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-10 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                data-testid="solution-bottom-contact"
              >
                Talk to an Expert <ArrowRight size={16} />
              </Link>
              <Link 
                to="/calculator" 
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-10 py-4 transition-all inline-flex items-center gap-2"
                data-testid="solution-bottom-calculator"
              >
                Screen Calculator
              </Link>
            </div>
          </FadeInSection>
        </section>

        {Array.isArray(solution.faqs) && solution.faqs.length > 0 && (
          <section className="py-14" data-testid="solution-faq-section">
            <FadeInSection>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center mb-8">
                {solution.title} LED — FAQs
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {solution.faqs.map((f, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5" data-testid={`solution-faq-${i}`}>
                    <h3 className="text-sm font-semibold text-white mb-2">{f.q}</h3>
                    <p className="text-sm leading-relaxed text-neutral-400">{f.a}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </section>
        )}
      </div>

      <QuickInquiry context={`${solution.title} LED solutions`} />
    </div>
  );
}
