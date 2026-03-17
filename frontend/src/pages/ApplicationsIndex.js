import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun, Sparkles, X, ZoomIn, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import CdnImage from '../components/CdnImage';
import { getInspirations } from '../api';

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

const APPLICATIONS = [
  {
    id: 'shopfront-signage',
    name: 'Shopfront Signage',
    shortName: 'Shopfront',
    description: 'High-impact LED displays for retail storefronts and street-level commercial signage.',
    icon: Store,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    stats: { brightness: '10,000 nits', pitch: 'P2.5-P10' },
    featured: true,
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

// Dramatic Hero Carousel
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
      {/* Background Images */}
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

      {/* Content */}
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

      {/* Navigation Dots */}
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

      {/* Side Navigation */}
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

// Dramatic Application Card
const ApplicationCard = ({ app, index }) => {
  const Icon = app.icon;
  const isLarge = index === 0 || index === 5;

  return (
    <Link 
      to={`/applications/${app.id}`} 
      className={`group block relative overflow-hidden rounded-2xl ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
      data-testid={`application-${app.id}`}
    >
      <div className={`relative ${isLarge ? 'h-[400px] md:h-full md:min-h-[500px]' : 'h-[280px]'} overflow-hidden`}>
        {/* Image */}
        <img 
          src={app.image} 
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500" />
        
        {/* Animated Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-2xl transition-colors duration-500" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
            <Icon size={20} className="text-white group-hover:text-cyan-400 transition-colors" />
          </div>
          
          {/* Title */}
          <h3 className={`font-bold uppercase tracking-wide text-white mb-2 group-hover:text-cyan-400 transition-colors ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {app.name}
          </h3>
          
          {/* Description - only on large cards */}
          {isLarge && (
            <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-md">
              {app.description}
            </p>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <span className="text-[10px] font-bold text-cyan-400">{app.stats.brightness}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <span className="text-[10px] font-bold text-white">{app.stats.pitch}</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/0 group-hover:bg-cyan-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
            <ArrowRight size={18} className="text-black" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// Inspiration Modal
const InspirationModal = ({ item, onClose, onNext, onPrev }) => {
  if (!item) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
      >
        <X size={24} />
      </button>

      {/* Navigation */}
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

      {/* Content */}
      <motion.div 
        className="max-w-5xl w-full mx-6"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative rounded-2xl overflow-hidden">
          <CdnImage 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-auto max-h-[70vh] object-contain"
            w={1200}
          />
        </div>
        <div className="mt-6 text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {item.tags?.map(tag => (
              <span key={tag} className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold tracking-wide text-white mb-2">{item.title}</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Applications() {
  const [inspirations, setInspirations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inspirationFilter, setInspirationFilter] = useState('all');

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await getInspirations();
        const data = response?.data?.inspirations || response?.data || [];
        // Filter out product images (white backgrounds) - only keep installation/project photos
        const filtered = (Array.isArray(data) ? data : []).filter(item => 
          item.image_url && !item.image_url.includes('white') && item.tags?.length > 0
        );
        setInspirations(filtered);
      } catch (err) {
        console.error('Failed to fetch inspirations:', err);
        setInspirations([]);
      }
    };
    fetchInspirations();
  }, []);

  const filteredInspirations = inspirationFilter === 'all' 
    ? inspirations 
    : inspirations.filter(i => i.tags?.some(t => t.toLowerCase().includes(inspirationFilter.toLowerCase())));

  const uniqueTags = [...new Set((inspirations || []).flatMap(i => i.tags || []))].slice(0, 6);

  const handlePrev = () => {
    setSelectedIndex(prev => prev === 0 ? filteredInspirations.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setSelectedIndex(prev => prev === filteredInspirations.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="applications-page">
      <SEO
        title="LED Display Applications by Industry — Shopfront, Hospitality, Corporate | Brightluxx"
        description="Discover LED display solutions for every industry: shopfront signage, hotels, retail malls, corporate offices, healthcare, transportation, entertainment, and more. UAE-focused expertise."
        path="/applications"
      />

      {/* Dramatic Hero Carousel */}
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

      {/* Applications Grid - Dramatic Bento Layout */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {APPLICATIONS.slice(4).map((app, i) => (
              <FadeInSection key={app.id} delay={i * 0.5}>
                <ApplicationCard app={app} index={i} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirations Gallery - Dramatic Masonry */}
      {inspirations.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          {/* Background Effect */}
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
                  Stunning LED installations from around the world. Click to explore.
                </p>
              </div>
            </FadeInSection>

            {/* Filter Tags */}
            <FadeInSection delay={1}>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setInspirationFilter('all')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${
                    inspirationFilter === 'all' 
                      ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/30 hover:text-white'
                  }`}
                >
                  All Projects
                </button>
                {uniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setInspirationFilter(tag)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${
                      inspirationFilter === tag 
                        ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/30 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FadeInSection>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" data-testid="inspirations-gallery">
              {filteredInspirations.slice(0, 12).map((item, i) => {
                const isHero = i === 0 || i === 5;
                return (
                  <FadeInSection 
                    key={item._id || i} 
                    delay={2 + i * 0.3}
                    className={isHero ? 'col-span-2 row-span-2' : ''}
                  >
                    <div 
                      className="group cursor-pointer relative rounded-xl overflow-hidden h-full"
                      onClick={() => setSelectedIndex(i)}
                      data-testid={`inspiration-item-${i}`}
                    >
                      <div className={`relative ${isHero ? 'h-full min-h-[400px]' : 'h-48 md:h-56'}`}>
                        <CdnImage 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          w={isHero ? 800 : 400}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                        
                        {/* Hover Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-400">{tag}</span>
                            ))}
                          </div>
                          <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                          <ZoomIn size={18} className="text-white" />
                        </div>

                        {/* Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-colors" />
                      </div>
                    </div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
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

      {/* Inspiration Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filteredInspirations[selectedIndex] && (
          <InspirationModal 
            item={filteredInspirations[selectedIndex]} 
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
