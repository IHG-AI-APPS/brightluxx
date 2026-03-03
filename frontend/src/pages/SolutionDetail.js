import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Zap } from 'lucide-react';
import { getProducts } from '../api';

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

const SOLUTIONS = [
  {
    id: 'retail',
    title: 'Retail & Hospitality',
    tagline: 'Captivate customers and elevate brand experience',
    image: '/uploads/sol_indoor_shop.webp',
    heroImage: '/uploads/insp_retail.webp',
    description: 'LED displays grab the attention of your customers and enhance your marketing efforts. Deliver real-time promos, showcase branding, and create immersive shopping experiences that encourage customers to stay longer.',
    longDescription: 'In the competitive retail landscape, visual merchandising has evolved beyond static signage. LED displays transform storefronts into dynamic showcases that attract foot traffic day and night. From transparent window displays that maintain natural light to indoor video walls that create branded environments, LED technology is the backbone of modern retail experiences.\n\nFor hospitality venues, LED displays elevate the guest experience from the moment of arrival. Digital menu boards in restaurants, lobby video walls in hotels, and immersive bar environments create memorable experiences that drive repeat visits and social sharing.',
    applications: ['Shopfront displays', 'In-store video walls', 'Digital menu boards', 'Window displays', 'Wayfinding signage', 'Hotel lobby art walls', 'Restaurant ambiance screens', 'Retail shelf-edge displays'],
    benefits: ['Increase foot traffic by up to 40%', 'Dynamic content changes in real-time', 'Energy-efficient LED technology', 'Remote content management via CMS', 'Weatherproof options for outdoor storefronts', 'Custom sizes to fit any space'],
    recommendedCategories: ['indoor', 'transparent', 'poster-totem', 'shelf-edge'],
    caseStudyImage: '/uploads/proj_shopfront_screen___fine_mart.webp',
    caseStudyTitle: 'Fine Mart — LED Shopfront Display',
    caseStudyDesc: 'Vibrant P5 outdoor LED display for Fine Mart, transforming their storefront visibility and customer engagement.',
  },
  {
    id: 'corporate',
    title: 'Corporate & Conference',
    tagline: 'Transform meetings and brand communication',
    image: '/uploads/sol_meeting.webp',
    heroImage: '/uploads/sol_conference.webp',
    description: 'Fine-pitch LED screens deliver ultra-sharp content for boardrooms, lobbies, and internal communications. Replace projectors with seamless video walls that impress clients and empower teams.',
    longDescription: 'Modern corporate environments demand displays that match the professionalism of the business. Fine-pitch LED technology delivers pixel-perfect presentations in any lighting condition, eliminating the limitations of traditional projectors and LCD video walls.\n\nFrom executive boardrooms requiring 4K clarity to command centers needing 24/7 reliability, LED displays provide seamless, bezel-free viewing experiences. The All-in-One format simplifies deployment with plug-and-play installation that takes less than an hour.',
    applications: ['Conference rooms', 'Corporate lobbies', 'Command centers', 'Reception areas', 'Training rooms', 'Executive boardrooms', 'Internal communication displays', 'Visitor experience centers'],
    benefits: ['No more dimmed rooms for presentations', 'Seamless bezel-free image quality', '24/7 operation capability', 'Crestron and Yealink compatible', 'Front-serviceable for easy maintenance', 'Modular design for future expansion'],
    recommendedCategories: ['cob-microled', 'all-in-one', 'indoor'],
    caseStudyImage: '/uploads/proj_kijora_office_display___i2d_interiors.webp',
    caseStudyTitle: 'Kijora Office — I2D Interiors',
    caseStudyDesc: 'Premium indoor LED display installation for Kijora office, delivering stunning visual impact in the corporate environment.',
  },
  {
    id: 'outdoor',
    title: 'Outdoor Advertising & DOOH',
    tagline: 'Maximum visibility, maximum impact',
    image: '/uploads/sol_outdoor_shop.webp',
    heroImage: '/uploads/outdoor_1.webp',
    description: 'High-brightness outdoor LED displays deliver stunning visuals in direct sunlight. From highway billboards to building facades, our solutions ensure your message reaches thousands daily.',
    longDescription: 'Digital Out-of-Home (DOOH) advertising is the fastest-growing segment in the advertising industry. LED billboards and digital signage deliver measurable ROI through dynamic content scheduling, real-time updates, and audience targeting.\n\nBrightluxx outdoor displays are engineered for the Gulf region\'s extreme conditions — rated to 60 degrees Celsius with IP65 protection. With brightness levels up to 10,000 nits, your content remains vivid even under direct sunlight.',
    applications: ['Digital billboards', 'Building facades', 'Highway signage', 'Gas station displays', 'Pole-mounted signs', 'Transit advertising', 'Smart city infrastructure', 'Stadium perimeter boards'],
    benefits: ['Up to 10,000 nits brightness', 'IP65 weatherproof rating', 'Rated for -20 to 60 degree C operation', 'Remote monitoring and diagnostics', 'Energy-efficient designs available', 'Wind-load tested to 120km/h'],
    recommendedCategories: ['outdoor', 'naked-eye-3d'],
    caseStudyImage: '/uploads/proj_outdoor_led_screen___n_w_z_west_zone_mal.webp',
    caseStudyTitle: 'N W Z West Zone Mall — Outdoor LED',
    caseStudyDesc: 'P10 outdoor LED screen installation for N W Z West Zone Mall, ensuring maximum visibility for shoppers and passersby.',
  },
  {
    id: 'events',
    title: 'Events & Exhibitions',
    tagline: 'Unforgettable visual experiences',
    image: '/uploads/sol_exhibition.webp',
    heroImage: '/uploads/insp_concert.webp',
    description: 'Rental-grade LED panels designed for quick setup and teardown. From trade shows to concerts, our modular display systems adapt to any stage design or exhibition booth.',
    longDescription: 'Event and exhibition environments demand displays that can be rapidly deployed, reconfigured, and dismantled. Our rental-grade LED panels feature tool-free quick-lock connections, lightweight die-cast cabinets, and modular designs that adapt to any stage configuration.\n\nWith 7,680Hz refresh rates and 10,000:1 contrast ratios, our event displays are optimized for camera capture, ensuring your content looks stunning both in-person and on broadcast.',
    applications: ['Concerts & festivals', 'Trade shows', 'Award ceremonies', 'Product launches', 'Sports events', 'Corporate galas', 'Fashion shows', 'Art installations'],
    benefits: ['Tool-free quick-lock setup', 'Lightweight die-cast cabinets', 'Camera-ready high refresh rates', 'Curving capability for creative stages', 'IP65 for indoor/outdoor hybrid events', 'Front-serviceable for rapid maintenance'],
    recommendedCategories: ['rental'],
    caseStudyImage: '/uploads/proj_exhibition_display___dubai_world_trade_c.webp',
    caseStudyTitle: 'Dubai World Trade Centre — Exhibition Display',
    caseStudyDesc: 'Large-scale exhibition LED display installation at Dubai World Trade Centre, creating an immersive exhibit experience.',
  },
  {
    id: 'creative',
    title: 'Creative & Curved Displays',
    tagline: 'Bring any shape to life',
    image: '/uploads/flexible_1.webp',
    heroImage: '/uploads/insp_immersive.webp',
    description: 'Soft flexible LED modules can bend, curve, and wrap around any surface. Create cylindrical columns, wave-shaped walls, spherical displays, and artistic installations that redefine spaces.',
    longDescription: 'When standard flat displays aren\'t enough, flexible and creative LED solutions open up unlimited possibilities. Soft flex modules bend to create concave, convex, and cylindrical installations that transform architectural features into dynamic digital canvases.\n\nFrom spherical LED globes in museum lobbies to ceiling-mounted sky screens in shopping malls, creative LED installations create signature experiences that define spaces and attract attention.',
    applications: ['Curved video walls', 'Cylindrical columns', 'Spherical displays', 'Art installations', 'Ceiling displays', 'Wave-shaped walls', 'Immersive rooms', 'Architectural wraps'],
    benefits: ['Bend radius as tight as 500mm', 'Full 360-degree installations possible', 'Lightweight for overhead mounting', 'Real-time content mapping software', 'COB and SMD flex options', 'Custom shapes and sizes'],
    recommendedCategories: ['flexible', 'sphere', 'ceiling-led'],
    caseStudyImage: '/uploads/sphere_1.webp',
    caseStudyTitle: 'Spherical LED Display Installation',
    caseStudyDesc: 'Custom spherical LED globe display for a landmark installation, delivering 360-degree visual storytelling.',
  },
  {
    id: 'traffic',
    title: 'Road & Traffic Signage',
    tagline: 'Safety-critical displays built for extremes',
    image: '/uploads/sol_road.webp',
    heroImage: '/uploads/road_signal_1.webp',
    description: 'Purpose-built LED displays for highway messaging, overhead traffic signs, and tollbooth information. Auto-dimming brightness, IP68 weatherproofing, and 24/7 continuous operation.',
    longDescription: 'Traffic and road signage demands the highest reliability standards. Our road signal LED displays are engineered for 24/7 continuous operation in extreme weather conditions, with automatic brightness adjustment to prevent driver distraction while maintaining visibility.\n\nFrom variable message signs on highways to speed indicators in residential zones, our traffic-rated displays meet international safety standards and integrate with smart city traffic management systems.',
    applications: ['Variable message signs', 'Speed indicators', 'Toll plaza info', 'Parking guidance', 'Intersection alerts', 'Highway overhead signs', 'Construction zone warnings', 'Smart city integration'],
    benefits: ['24/7 continuous operation rated', 'Auto-dimming for day/night safety', 'IP68 weatherproof certification', 'Extreme temperature operation (-40 to +60 C)', 'Low power consumption', 'Remote monitoring capability'],
    recommendedCategories: ['road-signal'],
    caseStudyImage: '/uploads/proj_external_screen___al_mutakamela_vehicle_.webp',
    caseStudyTitle: 'Al Mutakamela Vehicle Testing — External Display',
    caseStudyDesc: 'Outdoor LED display for Al Mutakamela Vehicle Testing facility, providing clear visibility for vehicle testing operations.',
  },
  {
    id: 'immersive',
    title: 'Immersive & Virtual Production',
    tagline: 'Next-generation visual environments',
    image: '/uploads/vp_1.webp',
    heroImage: '/uploads/insp_vp.webp',
    description: 'Ultra-fine pitch LED walls for virtual production stages, XR studios, and immersive environments. Low latency, high refresh rates, and seamless calibration for camera-ready displays.',
    longDescription: 'Virtual production has revolutionized film and television production. LED volumes create photorealistic environments in real-time, replacing green screens with immersive backdrops that actors and directors can interact with naturally.\n\nOur VP-grade LED displays feature ultra-low latency genlock synchronization, anti-moire coatings, and DCI-P3 color gamut coverage. Compatible with Unreal Engine, Disguise, and Notch for seamless integration into any production pipeline.',
    applications: ['Film & TV production', 'XR studios', 'Simulation rooms', 'Immersive exhibitions', 'Training simulators', 'Virtual production stages', 'Broadcast studios', 'Automotive visualization'],
    benefits: ['Sub-frame latency with genlock sync', 'Anti-moire coating for camera capture', 'DCI-P3 97%+ color gamut', 'Compatible with Unreal Engine', 'Real-time per-pixel calibration', '270-degree curved configurations'],
    recommendedCategories: ['virtual-production', 'cob-microled'],
    caseStudyImage: '/uploads/proj_conference_room_screen___fnac_fujairah_a.webp',
    caseStudyTitle: 'FNAC Fujairah Airport — Conference Room',
    caseStudyDesc: 'High-resolution indoor LED conference display at FNAC Fujairah Airport, delivering crystal-clear presentations.',
  },
  {
    id: 'transparent',
    title: 'Transparent & Glass Displays',
    tagline: 'See-through digital magic',
    image: '/uploads/transparent_1.webp',
    heroImage: '/uploads/insp_holographic.webp',
    description: 'Transform any glass surface into a digital canvas while maintaining transparency. From retail storefronts to museum exhibits, transparent LED creates stunning visual layers without blocking the view.',
    longDescription: 'Transparent LED technology is transforming how we think about glass surfaces. From retail storefronts that showcase products during the day and display dynamic content at night, to museum exhibits that overlay digital information on physical artifacts.\n\nWith transparency rates of up to 95%, our clear film LED solutions are virtually invisible when turned off. Self-adhesive installation means any existing glass surface can be upgraded to a digital display without structural modifications.',
    applications: ['Glass facades', 'Retail windows', 'Museum glass cases', 'Automotive showrooms', 'Airport terminals', 'Office partitions', 'Skybridge displays', 'Architectural glazing'],
    benefits: ['Up to 95% transparency', 'Self-adhesive installation', 'Maintains natural light and views', 'Silent fanless operation', 'Ultra-thin 2mm profiles available', 'No structural modifications needed'],
    recommendedCategories: ['transparent'],
    caseStudyImage: '/uploads/proj_sulthan_gold___diamond___bur_dubai.webp',
    caseStudyTitle: 'Sulthan Gold & Diamond — Bur Dubai',
    caseStudyDesc: 'Premium LED display installation for Sulthan Gold & Diamond, maximizing storefront impact in the busy Bur Dubai area.',
  },
];

export default function SolutionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="py-20 text-center" data-testid="solution-not-found">
        <div className="max-w-[1320px] mx-auto px-4">
          <h1 className="mb-4">Solution Not Found</h1>
          <Link to="/solutions" className="btn-gold px-6 py-3">View All Solutions</Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid={`solution-detail-${solution.id}`}>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden" data-testid="solution-detail-hero">
        <div className="absolute inset-0">
          <img src={solution.heroImage} alt={solution.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--blx-bg)] via-[rgba(11,11,11,0.7)] to-[rgba(11,11,11,0.5)]" />
        </div>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-[0.6875rem] text-[var(--blx-muted)] hover:text-[var(--blx-text)] transition-colors mb-6 tracking-wider" data-testid="solution-back-link">
            <ArrowLeft size={14} /> All Solutions
          </Link>
          <div className="max-w-2xl">
            <div className="text-[0.6875rem] tracking-[0.28em] text-[var(--blx-gold-3)] mb-4 font-bold">
              {solution.tagline}
            </div>
            <h1 className="mb-4" data-testid="solution-detail-title">{solution.title}</h1>
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed tracking-wider" style={{ textTransform: 'none' }}>
              {solution.description}
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/contact" className="btn-gold px-8 py-3.5" data-testid="solution-cta-quote">
                Get a Quote
              </Link>
              <Link to="/products" className="btn-glass px-8 py-3.5" data-testid="solution-cta-products">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Detailed Description */}
        <section className="py-14" data-testid="solution-description">
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <div className="space-y-4 text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider" style={{ textTransform: 'none' }}>
                {solution.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="rounded-2xl overflow-hidden">
                <img src={solution.image} alt={solution.title} className="w-full h-80 object-cover" data-testid="solution-detail-image" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Applications & Benefits */}
        <section className="py-14" data-testid="solution-apps-benefits">
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <div className="glass-panel p-6 lg:p-8 h-full">
                <h2 className="text-base font-bold tracking-wider mb-6">Applications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <CheckCircle size={14} className="text-[var(--blx-gold-3)] flex-shrink-0" />
                      <span className="text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="glass-panel p-6 lg:p-8 h-full">
                <h2 className="text-base font-bold tracking-wider mb-6">Key Benefits</h2>
                <div className="space-y-3">
                  {solution.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 py-1.5">
                      <Zap size={14} className="text-[var(--blx-gold-3)] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-14" data-testid="solution-case-study">
          <FadeIn>
            <div className="glass-panel overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <img src={solution.caseStudyImage} alt={solution.caseStudyTitle} className="w-full h-64 lg:h-full object-cover" />
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="text-[0.625rem] tracking-[0.2em] text-[var(--blx-gold-3)] mb-2 font-bold">Featured Project</div>
                  <h3 className="text-sm font-bold tracking-wider mb-3">{solution.caseStudyTitle}</h3>
                  <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-5" style={{ textTransform: 'none' }}>
                    {solution.caseStudyDesc}
                  </p>
                  <Link to="/projects" className="text-[var(--blx-gold-3)] text-xs font-bold tracking-wider inline-flex items-center gap-2 hover:gap-3 transition-[gap]" data-testid="solution-view-projects">
                    View All Projects <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Recommended Products */}
        {products.length > 0 && (
          <section className="py-14" data-testid="solution-recommended-products">
            <div className="flex items-center justify-between mb-8">
              <h2>Recommended Products</h2>
              <Link to="/products" className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <FadeIn key={product.id || product._id}>
                  <Link to={`/products`} className="product-card group block" data-testid="solution-product-card">
                    <div className="relative overflow-hidden">
                      <img src={product.image_url} alt={product.name} className="w-full h-44 object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="category-badge">{product.product_code}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold mb-1">{product.name}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-muted)] mb-3 tracking-wider">{product.tagline}</p>
                      <div className="flex gap-3 text-[0.6875rem] text-[var(--blx-text-2)] tracking-wider">
                        <span>{product.pixel_pitch}</span>
                        <span className="text-[var(--blx-border-2)]">|</span>
                        <span>{product.brightness}</span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Cross Navigation */}
        <section className="py-14 border-t border-[var(--blx-hairline)]" data-testid="solution-cross-nav">
          <div className="flex items-center justify-between">
            {prevSolution ? (
              <Link
                to={`/solutions/${prevSolution.id}`}
                className="group flex items-center gap-3 text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors"
                data-testid="solution-prev"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-[0.5625rem] tracking-[0.2em] text-[var(--blx-muted)] mb-0.5">Previous</div>
                  <div className="text-xs font-bold tracking-wider">{prevSolution.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextSolution ? (
              <Link
                to={`/solutions/${nextSolution.id}`}
                className="group flex items-center gap-3 text-right text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors"
                data-testid="solution-next"
              >
                <div>
                  <div className="text-[0.5625rem] tracking-[0.2em] text-[var(--blx-muted)] mb-0.5">Next</div>
                  <div className="text-xs font-bold tracking-wider">{nextSolution.title}</div>
                </div>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 text-center" data-testid="solution-bottom-cta">
          <h3 className="text-lg mb-2">Need a Custom Solution?</h3>
          <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-6" style={{ textTransform: 'none' }}>
            Our experts will analyze your specific requirements and recommend the perfect LED setup.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2" data-testid="solution-bottom-contact">
              Talk to an Expert <ArrowRight size={14} />
            </Link>
            <Link to="/calculator" className="btn-glass px-8 py-3.5 inline-flex items-center gap-2" data-testid="solution-bottom-calculator">
              Screen Calculator
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
