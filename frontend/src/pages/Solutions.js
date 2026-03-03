import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, MonitorPlay, Tv, Layers, TrafficCone, Theater, Zap, Globe } from 'lucide-react';
import CdnImage from '../components/CdnImage';

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

const SOLUTIONS = [
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'Retail & Hospitality',
    tagline: 'Captivate customers and elevate brand experience',
    image: '/api/cdn/sol_indoor_shop.webp',
    description: 'LED displays grab the attention of your customers and enhance your marketing efforts. Deliver real-time promos, showcase branding, and create immersive shopping experiences that encourage customers to stay longer.',
    applications: ['Shopfront displays', 'In-store video walls', 'Menu boards', 'Window displays', 'Wayfinding signage'],
    recommended: ['P2.5 Indoor', 'P4 Outdoor', 'P5 Outdoor', 'Transparent LED'],
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate & Conference',
    tagline: 'Transform meetings and brand communication',
    image: '/api/cdn/sol_meeting.webp',
    description: 'Fine-pitch LED screens deliver ultra-sharp content for boardrooms, lobbies, and internal communications. Replace projectors with seamless video walls that impress clients and empower teams.',
    applications: ['Conference rooms', 'Corporate lobbies', 'Command centers', 'Reception areas', 'Training rooms'],
    recommended: ['P1.8 Fine Pitch', 'P2.5 Indoor', 'All-in-One Screen', 'COB MicroLED'],
  },
  {
    id: 'outdoor',
    icon: MonitorPlay,
    title: 'Outdoor Advertising & DOOH',
    tagline: 'Maximum visibility, maximum impact',
    image: '/api/cdn/sol_outdoor_shop.webp',
    description: 'High-brightness outdoor LED displays deliver stunning visuals in direct sunlight. From highway billboards to building facades, our solutions ensure your message reaches thousands daily.',
    applications: ['Digital billboards', 'Building facades', 'Highway signage', 'Gas station displays', 'Pole-mounted signs'],
    recommended: ['P4 Outdoor HD', 'P5 Outdoor SMD', 'P6.67 Nationstar', 'Outdoor Brilliance 3.9mm'],
  },
  {
    id: 'events',
    icon: Theater,
    title: 'Events & Exhibitions',
    tagline: 'Unforgettable visual experiences',
    image: '/api/cdn/sol_exhibition.webp',
    description: 'Rental-grade LED panels designed for quick setup and teardown. From trade shows to concerts, our modular display systems adapt to any stage design or exhibition booth.',
    applications: ['Concerts & festivals', 'Trade shows', 'Award ceremonies', 'Product launches', 'Sports events'],
    recommended: ['Rental P3.91', 'RentalPro X 2.9mm', 'RentalPro X 1.5mm', 'Outdoor Rental P3.91'],
  },
  {
    id: 'creative',
    icon: Layers,
    title: 'Creative & Curved Displays',
    tagline: 'Bring any shape to life',
    image: '/api/cdn/flexible_1.webp',
    description: 'Soft flexible LED modules can bend, curve, and wrap around any surface. Create cylindrical columns, wave-shaped walls, spherical displays, and artistic installations that redefine spaces.',
    applications: ['Curved video walls', 'Cylindrical columns', 'Spherical displays', 'Art installations', 'Ceiling displays'],
    recommended: ['Soft Flex P1.5', 'FlexCOB 1.5mm', 'SphereVision 3mm', 'SkyScreen 3.9mm'],
  },
  {
    id: 'traffic',
    icon: TrafficCone,
    title: 'Road & Traffic Signage',
    tagline: 'Safety-critical displays built for extremes',
    image: '/api/cdn/sol_road.webp',
    description: 'Purpose-built LED displays for highway messaging, overhead traffic signs, and tollbooth information. Auto-dimming brightness, IP68 weatherproofing, and 24/7 continuous operation in temperatures from -40 to +60 degrees.',
    applications: ['Variable message signs', 'Speed indicators', 'Toll plaza info', 'Parking guidance', 'Intersection alerts'],
    recommended: ['Road Signal P2.5', 'Road Signal P4'],
  },
  {
    id: 'immersive',
    icon: Tv,
    title: 'Immersive & Virtual Production',
    tagline: 'Next-generation visual environments',
    image: '/api/cdn/vp_1.webp',
    description: 'Ultra-fine pitch LED walls for virtual production stages, XR studios, and immersive environments. Low latency, high refresh rates, and seamless calibration for camera-ready displays.',
    applications: ['Film & TV production', 'XR studios', 'Simulation rooms', 'Immersive exhibitions', 'Training simulators'],
    recommended: ['VP Stage Pro 1.5mm', 'VP Stage Ultra 0.9mm', 'COB MicroLED 0.6mm'],
  },
  {
    id: 'transparent',
    icon: Globe,
    title: 'Transparent & Glass Displays',
    tagline: 'See-through digital magic',
    image: '/api/cdn/transparent_1.webp',
    description: 'Transform any glass surface into a digital canvas while maintaining transparency. From retail storefronts to museum exhibits, transparent LED creates stunning visual layers without blocking the view.',
    applications: ['Glass facades', 'Retail windows', 'Museum glass cases', 'Automotive showrooms', 'Airport terminals'],
    recommended: ['ClearFilm 2mm', 'Transparent MicroLED 0.6mm', 'Transparent LED 3.8mm'],
  },
];

const SolutionCard = ({ solution, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const Icon = solution.icon;

  return (
    <div
      ref={ref}
      className={`blx-scroll-glow ${inView ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link to={`/solutions/${solution.id}`} className="glass-panel h-full flex flex-col group hover:border-[rgba(229,197,116,0.15)] transition-all duration-300 overflow-hidden" data-testid={`solution-card-${solution.id}`}>
        {solution.image && (
          <div className="relative h-40 overflow-hidden">
            <CdnImage src={solution.image} alt={solution.title} className="w-full h-full" imgClassName="group-hover:scale-105 transition-transform duration-500" w={500} />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.8)] to-transparent" />
          </div>
        )}
        <div className="p-6 lg:p-8 flex flex-col flex-grow">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.12), rgba(229,197,116,0.04))', border: '1px solid rgba(229,197,116,0.1)' }}>
              <Icon size={22} className="text-[var(--blx-gold-3)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider mb-0.5">{solution.title}</h3>
              <p className="text-[0.6875rem] text-[var(--blx-gold-3)] tracking-wider font-medium" style={{ textTransform: 'none' }}>{solution.tagline}</p>
            </div>
          </div>

          <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-5 flex-grow" style={{ textTransform: 'none' }}>{solution.description}</p>

          <div className="mb-5">
            <h4 className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2">Applications</h4>
            <div className="flex flex-wrap gap-1.5">
              {solution.applications.slice(0, 4).map((app, i) => (
                <span key={i} className="text-[0.5625rem] px-2.5 py-1 rounded-full tracking-wider font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--blx-text-2)', textTransform: 'none' }}>{app}</span>
              ))}
              {solution.applications.length > 4 && (
                <span className="text-[0.5625rem] px-2.5 py-1 text-[var(--blx-muted)] tracking-wider">+{solution.applications.length - 4} more</span>
              )}
            </div>
          </div>

          <div className="flex items-center text-[var(--blx-gold-3)] text-xs font-bold group-hover:gap-3 gap-2 transition-[gap] duration-200 tracking-widest mt-auto">
            <span>Learn More</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function Solutions() {
  return (
    <div className="py-20" data-testid="solutions-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 data-testid="solutions-page-title">Solutions</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider max-w-2xl" style={{ textTransform: 'none' }}>
            High-quality LED display solutions tailored for every industry. We combine decades of experience with cutting-edge technology to deliver exceptional visual experiences.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="glass-panel p-6 lg:p-8 mb-12 relative overflow-hidden" data-testid="solutions-highlight">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, var(--blx-gold-3), transparent 60%)' }} />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-[var(--blx-gold-3)]" />
                <span className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">Why Brightluxx</span>
              </div>
              <h2 className="text-base lg:text-lg font-bold mb-2 tracking-wider">One-Stop Solution for All Digital Display Needs</h2>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider max-w-xl" style={{ textTransform: 'none' }}>
                Since 2012, we've established ourselves as the UAE's leading manufacturer and supplier of LED display screens and digital signage solutions. From small retail screens to massive outdoor billboards, we deliver customizable, long-lasting products.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/products" className="btn-gold px-6 py-3 text-xs inline-flex items-center gap-2" data-testid="solutions-browse-products">
                Browse Products <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="px-6 py-3 text-xs font-bold tracking-wider rounded-full border border-[var(--blx-border)] hover:border-[var(--blx-border-2)] transition-colors duration-200 inline-flex items-center gap-2" data-testid="solutions-get-consultation">
                Get Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={solution.id} solution={solution} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-lg mb-2">Not sure which solution fits?</h3>
          <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-6" style={{ textTransform: 'none' }}>Our experts will analyze your space and recommend the perfect LED setup.</p>
          <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2" data-testid="solutions-cta-contact">
            Talk to an Expert <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
