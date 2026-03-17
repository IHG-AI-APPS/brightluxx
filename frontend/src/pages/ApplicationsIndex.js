import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun, Sparkles, X, ZoomIn, Filter } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const APPLICATIONS = [
  {
    id: 'shopfront-signage',
    name: 'Shopfront Signage',
    description: 'High-impact LED displays for retail storefronts, window displays, and street-level commercial signage that attracts customers and drives foot traffic.',
    icon: Store,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    products: ['Transparent LED', 'Indoor Fine Pitch', 'Outdoor LED'],
    solutions: ['retail'],
    featured: true,
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Hotels',
    description: 'Elegant LED video walls and digital signage for hotel lobbies, restaurants, conference facilities, and guest amenities that enhance the visitor experience.',
    icon: Building2,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png',
    products: ['COB MicroLED', 'Fine Pitch Indoor', 'All-in-One dvLED'],
    solutions: ['hospitality'],
  },
  {
    id: 'retail-malls',
    name: 'Retail & Shopping Malls',
    description: 'Large-format LED displays and immersive video walls for mall atriums, retail spaces, and brand activations that create memorable shopping experiences.',
    icon: Store,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png',
    products: ['Fine Pitch Indoor', 'Creative LED', '3D Anamorphic'],
    solutions: ['retail'],
  },
  {
    id: 'corporate',
    name: 'Corporate & Offices',
    description: 'Professional LED solutions for boardrooms, lobbies, command centers, and meeting spaces that elevate corporate communications and presentations.',
    icon: Briefcase,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    products: ['All-in-One dvLED', 'COB MicroLED', 'Fine Pitch Indoor'],
    solutions: ['corporate'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Reliable LED displays for hospitals, clinics, and medical facilities including wayfinding systems, patient information boards, and waiting area displays.',
    icon: Stethoscope,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png',
    products: ['All-in-One dvLED', 'Fine Pitch Indoor'],
    solutions: ['corporate'],
  },
  {
    id: 'transportation',
    name: 'Transportation & Airports',
    description: 'Mission-critical LED displays for flight information, wayfinding, advertising, and passenger communications in airports, metro stations, and transit hubs.',
    icon: Plane,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png',
    products: ['Fine Pitch Indoor', 'Outdoor LED', 'Transparent LED'],
    solutions: ['transport'],
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Cinemas',
    description: 'Immersive LED experiences for cinemas, museums, theatres, and entertainment venues that captivate audiences with stunning visuals.',
    icon: Theater,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png',
    products: ['Cinema LED', 'Creative LED', 'COB MicroLED'],
    solutions: ['entertainment'],
  },
  {
    id: 'sports-events',
    name: 'Sports & Events',
    description: 'High-brightness LED scoreboards, perimeter displays, and video walls for stadiums, arenas, and live events that enhance the spectator experience.',
    icon: Trophy,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png',
    products: ['Outdoor LED', 'Stadium Perimeter', 'Fine Pitch Indoor'],
    solutions: ['sports-entertainment'],
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Modern LED displays for universities, schools, and training facilities including lecture halls, auditoriums, and campus digital signage.',
    icon: GraduationCap,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png',
    products: ['All-in-One dvLED', 'Fine Pitch Indoor'],
    solutions: ['corporate'],
  },
  {
    id: 'outdoor-billboards',
    name: 'Outdoor & Billboards',
    description: 'Weather-resistant outdoor LED billboards, building facades, and media walls for high-visibility advertising and architectural integration.',
    icon: Sun,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    products: ['Outdoor LED', 'Media Facade', '3D Anamorphic'],
    solutions: ['outdoor-advertising'],
  },
];

// Inspiration Modal Component
const InspirationModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-[#0A0A0D] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <CdnImage src={item.image_url} alt={item.title} className="w-full h-full object-cover" w={900} />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags?.map(tag => (
                <span key={tag} className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{tag}</span>
              ))}
            </div>
            <h3 className="text-xl font-bold tracking-wide text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Applications() {
  const [inspirations, setInspirations] = useState([]);
  const [selectedInspiration, setSelectedInspiration] = useState(null);
  const [inspirationFilter, setInspirationFilter] = useState('all');

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await getInspirations();
        const data = response?.data?.inspirations || response?.data || [];
        setInspirations(Array.isArray(data) ? data : []);
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

  const uniqueTags = [...new Set((inspirations || []).flatMap(i => i.tags || []))].slice(0, 8);

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="applications-page">
      <SEO
        title="LED Display Applications by Industry — Shopfront, Hospitality, Corporate | Brightluxx"
        description="Discover LED display solutions for every industry: shopfront signage, hotels, retail malls, corporate offices, healthcare, transportation, entertainment, and more. UAE-focused expertise."
        path="/applications"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Industry Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" data-testid="applications-title">
              Applications &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block mt-1">Inspirations</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Discover how LED displays transform spaces across industries — from shopfront signage to corporate boardrooms, hospitality venues to outdoor billboards. Real-world applications tailored for the UAE market.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Application - Shopfront */}
      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={1}>
            <Link to={`/solutions/${APPLICATIONS[0].solutions[0]}`} className="group block" data-testid="featured-application">
              <GlassCard className="overflow-hidden" hover={false}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
                    <img 
                      src={APPLICATIONS[0].image} 
                      alt={APPLICATIONS[0].name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent lg:bg-gradient-to-l" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-[0.15em] uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Featured Application
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20">
                      <Store size={28} className="text-cyan-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-4 group-hover:text-cyan-400 transition-colors">{APPLICATIONS[0].name}</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">{APPLICATIONS[0].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {APPLICATIONS[0].products.map(p => (
                        <span key={p} className="text-[10px] font-bold tracking-wider text-gray-500 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">{p}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-sm">
                      View Solutions <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* All Applications Grid */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={2}>
            <h2 className="text-2xl font-bold tracking-wide text-white mb-8">All Industries & Applications</h2>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.slice(1).map((app, i) => (
              <FadeInSection key={app.id} delay={3 + i * 0.3}>
                <Link to={`/solutions/${app.solutions[0]}`} className="group block h-full" data-testid={`application-${app.id}`}>
                  <GlassCard className="h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={app.image} 
                        alt={app.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10">
                          <app.icon size={18} className="text-cyan-400" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold tracking-wide text-white mb-2 group-hover:text-cyan-400 transition-colors">{app.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{app.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {app.products.slice(0, 2).map(p => (
                          <span key={p} className="text-[9px] font-bold tracking-wider text-gray-500 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06]">{p}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-xs">
                        Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirations Gallery */}
      <section className="pb-20 border-t border-white/[0.06] pt-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={1}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Gallery</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-white">Project Inspirations</h2>
                <p className="text-gray-500 text-sm mt-2 max-w-lg">Browse our collection of LED display installations and creative applications from around the world.</p>
              </div>
              
              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => setInspirationFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                    inspirationFilter === 'all' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  All
                </button>
                {uniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setInspirationFilter(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                      inspirationFilter === tag ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Masonry-style Gallery */}
          {filteredInspirations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="inspirations-gallery">
              {filteredInspirations.map((item, i) => (
                <FadeInSection key={item._id || i} delay={2 + i * 0.1}>
                  <div 
                    className={`group cursor-pointer relative rounded-xl overflow-hidden ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                    onClick={() => setSelectedInspiration(item)}
                    data-testid={`inspiration-item-${i}`}
                  >
                    <div className={`${i % 5 === 0 ? 'h-64 md:h-full md:min-h-[400px]' : 'h-48'}`}>
                      <CdnImage 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        w={i % 5 === 0 ? 800 : 400}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter size={40} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No inspirations found for this filter.</p>
              <button onClick={() => setInspirationFilter('all')} className="mt-4 text-cyan-400 text-sm font-bold">Show all</button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={1}>
            <GlassCard className="p-10 lg:p-14" hover={false}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Start Your Project</span>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                    Ready to Transform
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">Your Space?</span>
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Whether you're planning a shopfront display, corporate video wall, or large-scale outdoor installation — our team is ready to help bring your vision to life.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                  >
                    Get Quote <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/case-studies" 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                  >
                    View Case Studies <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>

      {/* Inspiration Modal */}
      {selectedInspiration && (
        <InspirationModal item={selectedInspiration} onClose={() => setSelectedInspiration(null)} />
      )}
    </div>
  );
}
