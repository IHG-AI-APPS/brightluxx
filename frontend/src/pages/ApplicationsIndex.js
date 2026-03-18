import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping for dynamic content
const ICON_MAP = { Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun };

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
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Static fallback data
const STATIC_APPLICATIONS = [
  { id: 'shopfront-signage', name: 'Shopfront Signage', shortName: 'Shopfront', description: 'High-impact LED displays for retail storefronts and street-level commercial signage.', icon: 'Store', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png', stats: { brightness: '10,000 nits', pitch: 'P2.5-P10' } },
  { id: 'hospitality', name: 'Hospitality & Hotels', shortName: 'Hospitality', description: 'Elegant video walls for hotel lobbies, restaurants, and conference facilities.', icon: 'Building2', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png', stats: { brightness: '1,500 nits', pitch: 'P0.9-P2.5' } },
  { id: 'retail-malls', name: 'Retail & Malls', shortName: 'Retail', description: 'Large-format displays for mall atriums and immersive brand experiences.', icon: 'Store', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png', stats: { brightness: '2,000 nits', pitch: 'P1.5-P4' } },
  { id: 'corporate', name: 'Corporate & Offices', shortName: 'Corporate', description: 'Professional displays for boardrooms, lobbies, and command centers.', icon: 'Briefcase', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png', stats: { brightness: '800 nits', pitch: 'P0.7-P1.9' } },
  { id: 'healthcare', name: 'Healthcare', shortName: 'Healthcare', description: 'Reliable displays for hospitals, wayfinding, and patient information.', icon: 'Stethoscope', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png', stats: { brightness: '600 nits', pitch: 'P1.2-P2.5' } },
  { id: 'transportation', name: 'Transportation', shortName: 'Transport', description: 'Mission-critical FIDS displays for airports and transit hubs.', icon: 'Plane', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png', stats: { brightness: '1,500 nits', pitch: 'P1.5-P4' } },
  { id: 'entertainment', name: 'Entertainment', shortName: 'Cinema', description: 'Cinema LED screens and immersive displays for museums and theatres.', icon: 'Theater', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png', stats: { brightness: '500 nits', pitch: 'P0.9-P2.5' } },
  { id: 'sports-events', name: 'Sports & Events', shortName: 'Sports', description: 'Scoreboards, perimeter displays, and video walls for live events.', icon: 'Trophy', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png', stats: { brightness: '10,000 nits', pitch: 'P4-P16' } },
  { id: 'education', name: 'Education', shortName: 'Education', description: 'Interactive displays for classrooms, lecture halls, and campuses.', icon: 'GraduationCap', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png', stats: { brightness: '800 nits', pitch: 'P1.2-P2.5' } },
  { id: 'outdoor-billboards', name: 'Outdoor & Billboards', shortName: 'Outdoor', description: 'Weather-resistant billboards and media facades for high-visibility advertising.', icon: 'Sun', hero_image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png', stats: { brightness: '12,000 nits', pitch: 'P4-P20' } },
];

// Transform API data to component format  
const transformApplication = (app) => ({
  id: app.slug || app.id,
  name: app.name,
  shortName: app.shortName || app.name.split(' ')[0],
  description: app.description || app.tagline,
  icon: ICON_MAP[app.icon] || Store,
  image: app.hero_image,
  stats: app.stats || {},
});

const APPLICATIONS = [
  {
    id: 'shopfront-signage',
    name: 'Shopfront Signage',
    shortName: 'Shopfront',
    description: 'High-impact LED displays for retail storefronts and street-level commercial signage.',
    icon: Store,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    stats: { brightness: '10,000 nits', pitch: 'P2.5-P10' },
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Hotels',
    shortName: 'Hospitality',
    description: 'Elegant video walls for hotel lobbies, restaurants, and conference facilities.',
    icon: Building2,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png',
    stats: { brightness: '1,500 nits', pitch: 'P0.9-P2.5' },
  },
  {
    id: 'retail-malls',
    name: 'Retail & Malls',
    shortName: 'Retail',
    description: 'Large-format displays for mall atriums and immersive brand experiences.',
    icon: Store,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png',
    stats: { brightness: '2,000 nits', pitch: 'P1.5-P4' },
  },
  {
    id: 'corporate',
    name: 'Corporate & Offices',
    shortName: 'Corporate',
    description: 'Professional displays for boardrooms, lobbies, and command centers.',
    icon: Briefcase,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    stats: { brightness: '800 nits', pitch: 'P0.7-P1.9' },
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    shortName: 'Healthcare',
    description: 'Reliable displays for hospitals, wayfinding, and patient information.',
    icon: Stethoscope,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png',
    stats: { brightness: '600 nits', pitch: 'P1.2-P2.5' },
  },
  {
    id: 'transportation',
    name: 'Transportation',
    shortName: 'Transport',
    description: 'Mission-critical FIDS displays for airports and transit hubs.',
    icon: Plane,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png',
    stats: { brightness: '1,500 nits', pitch: 'P1.5-P4' },
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    shortName: 'Cinema',
    description: 'Cinema LED screens and immersive displays for museums and theatres.',
    icon: Theater,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png',
    stats: { brightness: '500 nits', pitch: 'P0.9-P2.5' },
  },
  {
    id: 'sports-events',
    name: 'Sports & Events',
    shortName: 'Sports',
    description: 'Scoreboards, perimeter displays, and video walls for live events.',
    icon: Trophy,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png',
    stats: { brightness: '10,000 nits', pitch: 'P4-P16' },
  },
  {
    id: 'education',
    name: 'Education',
    shortName: 'Education',
    description: 'Interactive displays for classrooms, lecture halls, and campuses.',
    icon: GraduationCap,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png',
    stats: { brightness: '800 nits', pitch: 'P1.2-P2.5' },
  },
  {
    id: 'outdoor-billboards',
    name: 'Outdoor & Billboards',
    shortName: 'Outdoor',
    description: 'Weather-resistant billboards and media facades for high-visibility advertising.',
    icon: Sun,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    stats: { brightness: '12,000 nits', pitch: 'P4-P20' },
  },
];

// Curated project gallery images (no white backgrounds, real installations)
const PROJECT_GALLERY = [
  {
    id: 1,
    title: 'Dubai Mall Atrium Display',
    category: 'Retail',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/254fe27311306074019389a9674e154e6930cfa5a095b5f26fad6465a581a41d.png',
    description: 'Stunning LED video wall in luxury mall atrium with dramatic architecture',
  },
  {
    id: 2,
    title: 'Dubai Marina Billboard',
    category: 'Outdoor',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6911b0d55c61839f131d3217cc8e5bdd2c73e339919a1c04826c8dfd79eaf7f0.png',
    description: 'Night-time LED billboard with city skyline reflection',
  },
  {
    id: 3,
    title: 'Abu Dhabi Hotel Lobby',
    category: 'Hospitality',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/16840d02833caf602880257ce47f7a291e9f9ad0f04733cc51e57005582d34b5.png',
    description: 'Elegant LED display in 5-star hotel lobby with Arabic design elements',
  },
  {
    id: 4,
    title: 'Stadium Scoreboard',
    category: 'Sports',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/22225955d577ff43bd679bda5b298f35aa4226558ec0750785a5e4f0a09750aa.png',
    description: 'Massive LED scoreboard in UAE football stadium',
  },
  {
    id: 5,
    title: 'Corporate Boardroom',
    category: 'Corporate',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/360269c4ce8437e2a7dd7fa3c5d599bbb66da0fc5194f99377a2705002a857c7.png',
    description: 'Executive boardroom with LED video wall presentation display',
  },
  {
    id: 6,
    title: 'Hospital Wayfinding',
    category: 'Healthcare',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ae5cc82c28141702c52b9a389f559c1c2e64abf5788d43dd5cab81ab40e71394.png',
    description: 'Digital wayfinding screen in modern UAE hospital',
  },
  {
    id: 7,
    title: 'Cinema LED Screen',
    category: 'Entertainment',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f9de65cfc89b9659c1b078e8086075bfcb92c37a325d7251cda608d859dcf755.png',
    description: 'LED cinema screen in modern movie theater',
  },
  {
    id: 8,
    title: 'Airport Terminal Display',
    category: 'Transportation',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/40271a3de773f454b67f00a2b6d21cb496b28c6d96f4c3890d055ef06991f979.png',
    description: 'Large LED advertising display at Dubai International Airport',
  },
];

// Hero Carousel
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const featured = APPLICATIONS.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const app = featured[current];
  const Icon = app.icon;

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img 
            src={app.image} 
            alt={app.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                  <Icon size={24} className="text-cyan-400" />
                </div>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Featured Industry</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-4">
                {app.name}
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {app.description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{app.stats.brightness}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Max Brightness</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <div className="text-2xl font-bold text-white">{app.stats.pitch}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Pixel Pitch</div>
                </div>
              </div>

              <Link 
                to={`/applications/${app.id}`}
                className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] text-sm group"
              >
                Explore {app.shortName} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${
              i === current 
                ? 'w-10 h-2 rounded-full bg-cyan-400' 
                : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        {featured.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                i === current 
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400' 
                  : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              <ItemIcon size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Uniform Application Card - same design for all cards
const ApplicationCard = ({ app }) => {
  const Icon = app.icon;

  return (
    <Link 
      to={`/applications/${app.id}`} 
      className="group block relative overflow-hidden rounded-2xl h-[320px]"
      data-testid={`application-${app.id}`}
    >
      <img 
        src={app.image} 
        alt={app.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500" />
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-2xl transition-colors duration-500" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="w-11 h-11 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-3 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
          <Icon size={18} className="text-white group-hover:text-cyan-400 transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {app.name}
        </h3>
        
        <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">
          {app.description}
        </p>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
            <span className="text-[10px] font-bold text-cyan-400">{app.stats.brightness}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
            <span className="text-[10px] font-bold text-white">{app.stats.pitch}</span>
          </div>
        </div>
        
        <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/0 group-hover:bg-cyan-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
          <ArrowRight size={16} className="text-black" />
        </div>
      </div>
    </Link>
  );
};

// Project Gallery Modal
const GalleryModal = ({ item, onClose, onNext, onPrev }) => {
  if (!item) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
      >
        <X size={24} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <motion.div 
        className="max-w-5xl w-full mx-6"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            loading="lazy"
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
        <div className="mt-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-3 inline-block">
            {item.category}
          </span>
          <h3 className="text-2xl font-bold tracking-wide text-white mb-2">{item.title}</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Applications() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API_URL}/api/applications`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setApplications(data.map(transformApplication));
          } else {
            // Use static fallback
            setApplications(STATIC_APPLICATIONS.map(a => ({
              ...a,
              icon: ICON_MAP[a.icon] || Store,
              image: a.hero_image
            })));
          }
        } else {
          setApplications(STATIC_APPLICATIONS.map(a => ({
            ...a,
            icon: ICON_MAP[a.icon] || Store,
            image: a.hero_image
          })));
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications(STATIC_APPLICATIONS.map(a => ({
          ...a,
          icon: ICON_MAP[a.icon] || Store,
          image: a.hero_image
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Use fetched data or static fallback
  const appList = applications.length > 0 ? applications : APPLICATIONS.map(a => ({
    ...a,
    icon: typeof a.icon === 'function' ? a.icon : ICON_MAP[a.icon] || Store,
  }));

  const categories = ['all', ...new Set(PROJECT_GALLERY.map(p => p.category))];
  
  const filteredGallery = galleryFilter === 'all' 
    ? PROJECT_GALLERY 
    : PROJECT_GALLERY.filter(p => p.category === galleryFilter);

  const handlePrev = () => {
    setSelectedIndex(prev => prev === 0 ? filteredGallery.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setSelectedIndex(prev => prev === filteredGallery.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="applications-page">
      <SEO
        title="LED Display Applications by Industry — Shopfront, Hospitality, Corporate | Brightluxx"
        description="Discover LED display solutions for every industry: shopfront signage, hotels, retail malls, corporate offices, healthcare, transportation, entertainment, and more. UAE-focused expertise."
        path="/applications"
      />

      <HeroCarousel />

      {/* Section Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <FadeInSection>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">All Industries</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          </div>
        </FadeInSection>
      </div>

      {/* All 10 Industries Grid - Uniform cards */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="animate-pulse rounded-2xl bg-neutral-800/30 h-[320px]" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {appList.map((app, i) => (
                <FadeInSection key={app.id} delay={i * 0.3}>
                  <ApplicationCard app={app} />
                </FadeInSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Gallery - Curated real installation images */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Visual Inspiration</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Gallery</span>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Real LED installations from across the UAE and beyond. Click to explore.
              </p>
            </div>
          </FadeInSection>

          {/* Category Filters */}
          <FadeInSection delay={1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all capitalize ${
                    galleryFilter === cat 
                      ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/30 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* Gallery Grid - Fixed height consistent cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="project-gallery">
            {filteredGallery.map((item, i) => {
              const isHero = i === 0 || i === 3;
              return (
                <FadeInSection 
                  key={item.id} 
                  delay={2 + i * 0.2}
                  className={isHero ? 'md:col-span-2 md:row-span-2' : ''}
                >
                  <div 
                    className="group cursor-pointer relative rounded-xl overflow-hidden h-full"
                    onClick={() => setSelectedIndex(i)}
                    data-testid={`gallery-item-${i}`}
                  >
                    <div className={`relative ${isHero ? 'h-full min-h-[350px] md:min-h-[450px]' : 'h-52 md:h-60'}`}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-400 w-fit mb-2">{item.category}</span>
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      </div>

                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                        <ZoomIn size={18} className="text-white" />
                      </div>

                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-colors" />
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-cyan-500/20" />
              <div className="absolute inset-0 backdrop-blur-3xl" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />

              <div className="relative p-10 lg:p-16 text-center">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Start Your Project</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Transform</span> Your Space?
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">
                  From concept to installation, our team delivers world-class LED solutions tailored for the UAE market.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-10 py-5 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] inline-flex items-center gap-3 text-sm"
                  >
                    Get Quote <ArrowRight size={18} />
                  </Link>
                  <Link 
                    to="/case-studies" 
                    className="bg-white/5 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 text-white font-bold uppercase tracking-wider px-10 py-5 transition-all inline-flex items-center gap-3 text-sm"
                  >
                    View Case Studies <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filteredGallery[selectedIndex] && (
          <GalleryModal 
            item={filteredGallery[selectedIndex]} 
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
