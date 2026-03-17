import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Zap, Building2, ShoppingBag, MonitorPlay, Tv, Layers, TrafficCone, Theater, Globe } from 'lucide-react';
import { getProducts } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { BASE_URL } from '../components/SEO';
import QuickInquiry from '../components/QuickInquiry';
import { cdnUrl } from '../config/cdn';
import { motion } from 'framer-motion';

/* AI-Generated Solution Images */
const SOLUTION_IMAGES = {
  retail: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f1edab22f7c00ed7647328b0726ef9e2724536d87fcb9797fe25887dfe20104e.png',
  corporate: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/560b86307144e6c3e932bdd0b195203f9854ab40f18ea255c935eda9fdbcb23a.png',
  outdoor: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/151c4ebb15ea6704fa3459bca85c7c02918980304175228ec6b8886cd43d9bee.png',
  events: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a27342dd23e1b9ce1afa6aa0fd9f5f0a6a841631c74a9ae412af243be9801a46.png',
  creative: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/17b677abe013dc2ced0fab9c0eea6442ad18991722a3c325394d66f6e7ba115e.png',
  traffic: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/eb6a2b60aa28770d377972ee091ae5e18a1a88eeba71cea58b2e2b07c8791e55.png',
  immersive: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6693621e07894f058b6d960fb917b36db40c6318357442d73fe106f4cd276e2f.png',
  transparent: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/513865c504ff9437c4a554cc3b6a86c818e9a8468b5e05dcbcf11e350d3d6b79.png',
};

const SOLUTION_HERO_IMAGES = {
  retail: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1e17d51897165f3c567fb1068bd91e95f713846e0b8dfc9d0d6b8dfc331e7c15.png',
  corporate: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/8581b075158bc90730f45490bd7099982ba35ba2120543a49cc68a94837130a7.png',
  outdoor: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/5f590dfb625ffadc07da67c64dee28cd82e8bc4102e3d5938e51d25796dda9af.png',
  events: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/29b1b4f35b2132ff1c6ddca3c57098f7ab48000114c408e76fba47342730b7d7.png',
  creative: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/60eb2ae04f2709ed722742111023c9e12d534db6e5548ae69f3bdff2ae24dc2c.png',
  traffic: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/738fd99c2808488db2705be11de0b4237d2ccd2564d2175c3f587afc5528f116.png',
  immersive: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/811080c892567c46a15b820cafaf94715e2452e5b623a604dbc72b8397718040.png',
  transparent: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c06085e1344cd73c610c96f64040296ae3600ce480bad81ce7df2b88201cad21.png',
};

const ICON_MAP = { ShoppingBag, Building2, MonitorPlay, Theater, Layers, TrafficCone, Tv, Globe };

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

const SOLUTIONS = [
  {
    id: 'retail', icon: 'ShoppingBag', title: 'Retail & Hospitality',
    tagline: 'Captivate customers and elevate brand experience',
    description: 'LED displays grab the attention of your customers and enhance your marketing efforts. Deliver real-time promos, showcase branding, and create immersive shopping experiences that encourage customers to stay longer.',
    longDescription: 'In the competitive retail landscape, visual merchandising has evolved beyond static signage. LED displays transform storefronts into dynamic showcases that attract foot traffic day and night. From transparent window displays that maintain natural light to indoor video walls that create branded environments, LED technology is the backbone of modern retail experiences.\n\nFor hospitality venues, LED displays elevate the guest experience from the moment of arrival. Digital menu boards in restaurants, lobby video walls in hotels, and immersive bar environments create memorable experiences that drive repeat visits and social sharing.',
    applications: ['Shopfront displays', 'In-store video walls', 'Digital menu boards', 'Window displays', 'Wayfinding signage', 'Hotel lobby art walls', 'Restaurant ambiance screens', 'Retail shelf-edge displays'],
    benefits: ['Increase foot traffic by up to 40%', 'Dynamic content changes in real-time', 'Energy-efficient LED technology', 'Remote content management via CMS', 'Weatherproof options for outdoor storefronts', 'Custom sizes to fit any space'],
    recommendedCategories: ['indoor', 'transparent', 'poster-totem', 'shelf-edge'],
    caseStudyTitle: 'Fine Mart — LED Shopfront Display',
    caseStudyDesc: 'Vibrant P5 outdoor LED display for Fine Mart, transforming their storefront visibility and customer engagement.',
  },
  {
    id: 'corporate', icon: 'Building2', title: 'Corporate & Conference',
    tagline: 'Transform meetings and brand communication',
    description: 'Fine-pitch LED screens deliver ultra-sharp content for boardrooms, lobbies, and internal communications. Replace projectors with seamless video walls that impress clients and empower teams.',
    longDescription: 'Modern corporate environments demand displays that match the professionalism of the business. Fine-pitch LED technology delivers pixel-perfect presentations in any lighting condition, eliminating the limitations of traditional projectors and LCD video walls.\n\nFrom executive boardrooms requiring 4K clarity to command centers needing 24/7 reliability, LED displays provide seamless, bezel-free viewing experiences. The All-in-One format simplifies deployment with plug-and-play installation that takes less than an hour.',
    applications: ['Conference rooms', 'Corporate lobbies', 'Command centers', 'Reception areas', 'Training rooms', 'Executive boardrooms', 'Internal communication displays', 'Visitor experience centers'],
    benefits: ['No more dimmed rooms for presentations', 'Seamless bezel-free image quality', '24/7 operation capability', 'Crestron and Yealink compatible', 'Front-serviceable for easy maintenance', 'Modular design for future expansion'],
    recommendedCategories: ['cob-microled', 'all-in-one', 'indoor'],
    caseStudyTitle: 'Kijora Office — I2D Interiors',
    caseStudyDesc: 'Premium indoor LED display installation for Kijora office, delivering stunning visual impact in the corporate environment.',
  },
  {
    id: 'outdoor', icon: 'MonitorPlay', title: 'Outdoor Advertising & DOOH',
    tagline: 'Maximum visibility, maximum impact',
    description: 'High-brightness outdoor LED displays deliver stunning visuals in direct sunlight. From highway billboards to building facades, our solutions ensure your message reaches thousands daily.',
    longDescription: 'Digital Out-of-Home (DOOH) advertising is the fastest-growing segment in the advertising industry. LED billboards and digital signage deliver measurable ROI through dynamic content scheduling, real-time updates, and audience targeting.\n\nBrightluxx outdoor displays are engineered for the Gulf region\'s extreme conditions — rated to 60 degrees Celsius with IP65 protection. With brightness levels up to 10,000 nits, your content remains vivid even under direct sunlight.',
    applications: ['Digital billboards', 'Building facades', 'Highway signage', 'Gas station displays', 'Pole-mounted signs', 'Transit advertising', 'Smart city infrastructure', 'Stadium perimeter boards'],
    benefits: ['Up to 10,000 nits brightness', 'IP65 weatherproof rating', 'Rated for -20 to 60°C operation', 'Remote monitoring and diagnostics', 'Energy-efficient designs available', 'Wind-load tested to 120km/h'],
    recommendedCategories: ['outdoor', 'naked-eye-3d'],
    caseStudyTitle: 'N W Z West Zone Mall — Outdoor LED',
    caseStudyDesc: 'P10 outdoor LED screen installation for N W Z West Zone Mall, ensuring maximum visibility for shoppers and passersby.',
  },
  {
    id: 'events', icon: 'Theater', title: 'Events & Exhibitions',
    tagline: 'Unforgettable visual experiences',
    description: 'Rental-grade LED panels designed for quick setup and teardown. From trade shows to concerts, our modular display systems adapt to any stage design or exhibition booth.',
    longDescription: 'Event and exhibition environments demand displays that can be rapidly deployed, reconfigured, and dismantled. Our rental-grade LED panels feature tool-free quick-lock connections, lightweight die-cast cabinets, and modular designs that adapt to any stage configuration.\n\nWith 7,680Hz refresh rates and 10,000:1 contrast ratios, our event displays are optimized for camera capture, ensuring your content looks stunning both in-person and on broadcast.',
    applications: ['Concerts & festivals', 'Trade shows', 'Award ceremonies', 'Product launches', 'Sports events', 'Corporate galas', 'Fashion shows', 'Art installations'],
    benefits: ['Tool-free quick-lock setup', 'Lightweight die-cast cabinets', 'Camera-ready high refresh rates', 'Curving capability for creative stages', 'IP65 for indoor/outdoor hybrid events', 'Front-serviceable for rapid maintenance'],
    recommendedCategories: ['rental'],
    caseStudyTitle: 'Dubai World Trade Centre — Exhibition Display',
    caseStudyDesc: 'Large-scale exhibition LED display installation at Dubai World Trade Centre, creating an immersive exhibit experience.',
  },
  {
    id: 'creative', icon: 'Layers', title: 'Creative & Curved Displays',
    tagline: 'Bring any shape to life',
    description: 'Soft flexible LED modules can bend, curve, and wrap around any surface. Create cylindrical columns, wave-shaped walls, spherical displays, and artistic installations that redefine spaces.',
    longDescription: 'When standard flat displays aren\'t enough, flexible and creative LED solutions open up unlimited possibilities. Soft flex modules bend to create concave, convex, and cylindrical installations that transform architectural features into dynamic digital canvases.\n\nFrom spherical LED globes in museum lobbies to ceiling-mounted sky screens in shopping malls, creative LED installations create signature experiences that define spaces and attract attention.',
    applications: ['Curved video walls', 'Cylindrical columns', 'Spherical displays', 'Art installations', 'Ceiling displays', 'Wave-shaped walls', 'Immersive rooms', 'Architectural wraps'],
    benefits: ['Bend radius as tight as 500mm', 'Full 360-degree installations possible', 'Lightweight for overhead mounting', 'Real-time content mapping software', 'COB and SMD flex options', 'Custom shapes and sizes'],
    recommendedCategories: ['flexible', 'sphere', 'ceiling-led'],
    caseStudyTitle: 'Spherical LED Display Installation',
    caseStudyDesc: 'Custom spherical LED globe display for a landmark installation, delivering 360-degree visual storytelling.',
  },
  {
    id: 'traffic', icon: 'TrafficCone', title: 'Road & Traffic Signage',
    tagline: 'Safety-critical displays built for extremes',
    description: 'Purpose-built LED displays for highway messaging, overhead traffic signs, and tollbooth information. Auto-dimming brightness, IP68 weatherproofing, and 24/7 continuous operation.',
    longDescription: 'Traffic and road signage demands the highest reliability standards. Our road signal LED displays are engineered for 24/7 continuous operation in extreme weather conditions, with automatic brightness adjustment to prevent driver distraction while maintaining visibility.\n\nFrom variable message signs on highways to speed indicators in residential zones, our traffic-rated displays meet international safety standards and integrate with smart city traffic management systems.',
    applications: ['Variable message signs', 'Speed indicators', 'Toll plaza info', 'Parking guidance', 'Intersection alerts', 'Highway overhead signs', 'Construction zone warnings', 'Smart city integration'],
    benefits: ['24/7 continuous operation rated', 'Auto-dimming for day/night safety', 'IP68 weatherproof certification', 'Extreme temperature operation (-40 to +60°C)', 'Low power consumption', 'Remote monitoring capability'],
    recommendedCategories: ['road-signal'],
    caseStudyTitle: 'Al Mutakamela Vehicle Testing — External Display',
    caseStudyDesc: 'Outdoor LED display for Al Mutakamela Vehicle Testing facility, providing clear visibility for vehicle testing operations.',
  },
  {
    id: 'immersive', icon: 'Tv', title: 'Immersive & Virtual Production',
    tagline: 'Next-generation visual environments',
    description: 'Ultra-fine pitch LED walls for virtual production stages, XR studios, and immersive environments. Low latency, high refresh rates, and seamless calibration for camera-ready displays.',
    longDescription: 'Virtual production has revolutionized film and television production. LED volumes create photorealistic environments in real-time, replacing green screens with immersive backdrops that actors and directors can interact with naturally.\n\nOur VP-grade LED displays feature ultra-low latency genlock synchronization, anti-moire coatings, and DCI-P3 color gamut coverage. Compatible with Unreal Engine, Disguise, and Notch for seamless integration into any production pipeline.',
    applications: ['Film & TV production', 'XR studios', 'Simulation rooms', 'Immersive exhibitions', 'Training simulators', 'Virtual production stages', 'Broadcast studios', 'Automotive visualization'],
    benefits: ['Sub-frame latency with genlock sync', 'Anti-moire coating for camera capture', 'DCI-P3 97%+ color gamut', 'Compatible with Unreal Engine', 'Real-time per-pixel calibration', '270-degree curved configurations'],
    recommendedCategories: ['virtual-production', 'cob-microled'],
    caseStudyTitle: 'FNAC Fujairah Airport — Conference Room',
    caseStudyDesc: 'High-resolution indoor LED conference display at FNAC Fujairah Airport, delivering crystal-clear presentations.',
  },
  {
    id: 'transparent', icon: 'Globe', title: 'Transparent & Glass Displays',
    tagline: 'See-through digital magic',
    description: 'Transform any glass surface into a digital canvas while maintaining transparency. From retail storefronts to museum exhibits, transparent LED creates stunning visual layers without blocking the view.',
    longDescription: 'Transparent LED technology is transforming how we think about glass surfaces. From retail storefronts that showcase products during the day and display dynamic content at night, to museum exhibits that overlay digital information on physical artifacts.\n\nWith transparency rates of up to 95%, our clear film LED solutions are virtually invisible when turned off. Self-adhesive installation means any existing glass surface can be upgraded to a digital display without structural modifications.',
    applications: ['Glass facades', 'Retail windows', 'Museum glass cases', 'Automotive showrooms', 'Airport terminals', 'Office partitions', 'Skybridge displays', 'Architectural glazing'],
    benefits: ['Up to 95% transparency', 'Self-adhesive installation', 'Maintains natural light and views', 'Silent fanless operation', 'Ultra-thin 2mm profiles available', 'No structural modifications needed'],
    recommendedCategories: ['transparent'],
    caseStudyTitle: 'Sulthan Gold & Diamond — Bur Dubai',
    caseStudyDesc: 'Premium LED display installation for Sulthan Gold & Diamond, maximizing storefront impact in the busy Bur Dubai area.',
  },
];

export default function SolutionDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const currentIndex = SOLUTIONS.findIndex(s => s.id === id);
  const solution = SOLUTIONS[currentIndex];
  const prevSolution = currentIndex > 0 ? SOLUTIONS[currentIndex - 1] : null;
  const nextSolution = currentIndex < SOLUTIONS.length - 1 ? SOLUTIONS[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!solution) return;
    const fetchProducts = async () => {
      try {
        const allProducts = [];
        for (const cat of solution.recommendedCategories) {
          const res = await getProducts({ category: cat });
          allProducts.push(...(res.data.products || []));
        }
        setProducts(allProducts.slice(0, 6));
      } catch (e) {
        console.error('Error fetching products:', e);
      }
    };
    fetchProducts();
  }, [solution]);

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

  const Icon = ICON_MAP[solution.icon] || Building2;

  return (
    <div className="min-h-screen bg-[#050508]" data-testid={`solution-detail-${solution.id}`}>
      <SEO
        title={`${solution.title} — LED Solutions`}
        description={solution.description}
        image={SOLUTION_HERO_IMAGES[solution.id]}
        path={`/solutions/${solution.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${BASE_URL}/solutions` },
            { "@type": "ListItem", "position": 3, "name": solution.title },
          ]
        }}
      />

      {/* Hero Section - Full Width Immersive */}
      <section className="relative min-h-[70vh] flex items-end" data-testid="solution-detail-hero">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={SOLUTION_HERO_IMAGES[solution.id]} 
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
                {solution.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection delay={1}>
              <div className="overflow-hidden">
                <img 
                  src={SOLUTION_IMAGES[solution.id]} 
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
            <FadeInSection>
              <GlassCard className="p-8 lg:p-10 h-full">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Use Cases</span>
                <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Applications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                      <span className="text-sm text-gray-400 tracking-wide">{app}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>
            <FadeInSection delay={1}>
              <GlassCard className="p-8 lg:p-10 h-full">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Advantages</span>
                <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Key Benefits</h2>
                <div className="space-y-4">
                  {solution.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap size={12} className="text-cyan-400" />
                      </div>
                      <span className="text-sm text-gray-400 tracking-wide">{benefit}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>
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

        {/* Navigation */}
        <section className="py-16 lg:py-20 border-t border-white/5" data-testid="solution-cross-nav">
          <div className="flex items-center justify-between">
            {prevSolution ? (
              <Link
                to={`/solutions/${prevSolution.id}`}
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
                to={`/solutions/${nextSolution.id}`}
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
      </div>

      <QuickInquiry context={`${solution.title} LED solutions`} />
    </div>
  );
}
