import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Box, Monitor, Eye, Sparkles, Building2, Cuboid, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

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

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const TECH_CARDS = [
  { 
    id: 'microled', 
    title: 'MicroLED', 
    tagline: 'ULTRA-PREMIUM', 
    icon: Sparkles, 
    pitch: 'P0.4 — P0.9', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/14266577a06785e2e61816956b557c54624568f67781c286825a4d5742fc1490.png',
    desc: 'Self-emissive pixels, perfect blacks, cinema-grade color',
    color: 'from-purple-400 to-purple-600'
  },
  { 
    id: 'cob-led', 
    title: 'COB LED', 
    tagline: 'PREMIUM STANDARD', 
    icon: Cpu, 
    pitch: 'P0.4 — P1.9', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a48724d68c8ed785b21369e75039e8455f3130ca26f98897d266b3f3102316f3.png',
    desc: 'Highest contrast, fully sealed surface, 24/7 ready',
    color: 'from-cyan-400 to-cyan-600'
  },
  { 
    id: 'mip-led', 
    title: 'MiP LED', 
    tagline: 'SMART SPEC', 
    icon: Layers, 
    pitch: 'P0.7 — P2.5', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ba71e99ddcebaaca612753230d9b464fd2a69d845b463a99354a5b80eaa797f8.png',
    desc: '85-90% of COB quality at 30-40% lower cost',
    color: 'from-emerald-400 to-emerald-600'
  },
  { 
    id: 'fine-pitch-led', 
    title: 'Fine Pitch', 
    tagline: 'COMMERCIAL', 
    icon: Monitor, 
    pitch: 'P0.9 — P2.5', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/803a560d8b43b496d0a7958dd588ab3f71a9d5a8a9e9bb74bfdff658be5d5f49.png',
    desc: 'The mainstream workhorse for indoor installations',
    color: 'from-amber-400 to-amber-600'
  },
  { 
    id: 'all-in-one-dvled', 
    title: 'All-in-One dvLED', 
    tagline: 'LCD REPLACEMENT', 
    icon: MonitorPlay, 
    pitch: 'P0.9 — P1.8', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/bf902d17f53638bbd7fe1983fa50d0eefa5a621c86c67173c00826f504ca209b.png',
    desc: 'Plug-and-play 4K seamless displays, 110" to 216"',
    color: 'from-pink-400 to-pink-600'
  },
  { 
    id: 'transparent-led', 
    title: 'Transparent LED', 
    tagline: 'SEE THROUGH', 
    icon: Eye, 
    pitch: 'P3.9 — P10', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9099db6081f3b9341a4a55c41f029d40d53834f5394236befe989fad76cd361b.png',
    desc: '85-95% transparency, content floats on glass',
    color: 'from-cyan-400 to-teal-500'
  },
  { 
    id: '3d-anamorphic-led', 
    title: '3D Anamorphic', 
    tagline: 'GLASSES-FREE 3D', 
    icon: Cuboid, 
    pitch: 'P2.5 — P6', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b14b05e09ba2807606d82f72f193c586976ed21d4ff695b26ecfc96152e987c8.png',
    desc: 'Viral corner displays that stop traffic',
    color: 'from-orange-400 to-orange-600'
  },
  { 
    id: 'creative-led', 
    title: 'Creative LED', 
    tagline: 'BEYOND RECTANGLES', 
    icon: Box, 
    pitch: 'P1.5 — P4', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4dd8e0cbcbb71aec02c3a1c31e8ec0a95ab296a33235f2fe7ecfcfb539adefe9.png',
    desc: 'Curved, cylindrical, spherical, ceiling & floor',
    color: 'from-violet-400 to-violet-600'
  },
  { 
    id: 'media-facade', 
    title: 'Media Facade', 
    tagline: 'BUILDING SCALE', 
    icon: Building2, 
    pitch: 'P15 — P50', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b256719e5b706e30693a2aa20f783eee47fb3de97a7e5c455c310224a1bb8d01.png',
    desc: 'Transform buildings into digital canvases',
    color: 'from-green-400 to-green-600'
  },
];

export default function TechnologyIndex() {
  return (
    <div className="bg-[#050508]" data-testid="technology-index-page">
      <SEO
        title="LED Display Technologies — MicroLED, COB, MiP, Transparent, 3D | Brightluxx"
        description="Explore 9 LED display technologies: MicroLED, COB, MiP, Fine Pitch, All-in-One dvLED, Transparent LED, 3D Anamorphic, Creative LED, and Media Facade."
        path="/technology"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">LED Display Technologies</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95]" data-testid="technology-index-title">
              Technology
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Hub
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              9 LED technologies explained for specifiers. Each guide covers specifications, use cases, comparisons, and UAE/GCC-specific guidance.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Featured Technologies (first 2) */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {TECH_CARDS.slice(0, 2).map((tech, i) => {
              const Icon = tech.icon;
              return (
                <FadeInSection key={tech.id} delay={i}>
                  <Link
                    to={`/technology/${tech.id}`}
                    className="group block"
                    data-testid={`tech-card-${tech.id}`}
                  >
                    <GlassCard className="relative h-[420px]">
                      {/* Image */}
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />

                      {/* Pitch Badge */}
                      <div className="absolute top-5 right-5">
                        <span className={`text-[10px] font-bold tracking-[0.15em] px-3 py-1.5 rounded-full bg-gradient-to-r ${tech.color} text-white shadow-lg`}>
                          {tech.pitch}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">{tech.tagline}</span>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${tech.color} bg-opacity-20 border border-white/10`}>
                            <Icon size={20} className="text-white" />
                          </div>
                          <h2 className="text-xl font-bold tracking-wide group-hover:text-cyan-400 transition-colors">{tech.title}</h2>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 tracking-wide">{tech.desc}</p>
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                          Specification Guide <ArrowRight size={14} />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>

          {/* Rest of Technologies (3-column grid) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_CARDS.slice(2).map((tech, i) => {
              const Icon = tech.icon;
              return (
                <FadeInSection key={tech.id} delay={i + 2}>
                  <Link
                    to={`/technology/${tech.id}`}
                    className="group block"
                    data-testid={`tech-card-${tech.id}`}
                  >
                    <GlassCard className="relative h-[360px]">
                      {/* Image */}
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent" />

                      {/* Pitch Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`text-[9px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full bg-gradient-to-r ${tech.color} text-white shadow-lg`}>
                          {tech.pitch}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="text-cyan-400 text-[9px] font-bold tracking-[0.2em] uppercase block mb-2">{tech.tagline}</span>
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${tech.color} bg-opacity-20 border border-white/10`}>
                            <Icon size={16} className="text-white" />
                          </div>
                          <h2 className="text-base font-bold tracking-wide group-hover:text-cyan-400 transition-colors">{tech.title}</h2>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 tracking-wide line-clamp-2">{tech.desc}</p>
                        <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                          View Guide <ArrowRight size={12} />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <GlassCard className="p-10 lg:p-14 text-center" hover={false}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Not Sure Which Technology?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                Find Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">
                  Perfect Match
                </span>
              </h2>
              <p className="text-gray-400 text-sm mb-10 max-w-lg mx-auto tracking-wide">
                Use our Technology Selector tool or talk to our engineers for a free recommendation based on your project requirements.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  to="/technology-selector" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                  data-testid="tech-index-selector-cta"
                >
                  Technology Selector <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
                  data-testid="tech-index-contact-cta"
                >
                  Ask an Engineer <ArrowRight size={16} />
                </Link>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
