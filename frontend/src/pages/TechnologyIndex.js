import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Box, Monitor, Eye, Sparkles, Building2, Cuboid, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping
const ICON_MAP = { Cpu, Layers, Box, Monitor, Eye, Sparkles, Building2, Cuboid, MonitorPlay };

// Color mapping
const COLOR_MAP = {
  purple: 'from-purple-400 to-purple-600',
  cyan: 'from-cyan-400 to-cyan-600',
  emerald: 'from-emerald-400 to-emerald-600',
  amber: 'from-amber-400 to-amber-600',
  pink: 'from-pink-400 to-pink-600',
  teal: 'from-cyan-400 to-teal-500',
  orange: 'from-orange-400 to-orange-600',
  violet: 'from-violet-400 to-violet-600',
  green: 'from-green-400 to-green-600',
};

// Static technology data with images
const TECH_DATA = [
  { 
    id: 'microled', 
    title: 'MicroLED', 
    tagline: 'ULTRA-PREMIUM', 
    icon: 'Sparkles', 
    pitch: 'P0.4 — P0.9', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/14266577a06785e2e61816956b557c54624568f67781c286825a4d5742fc1490.png',
    desc: 'Self-emissive pixels, perfect blacks, cinema-grade color',
    color: 'purple'
  },
  { 
    id: 'cob-led', 
    title: 'COB LED', 
    tagline: 'PREMIUM STANDARD', 
    icon: 'Cpu', 
    pitch: 'P0.4 — P1.9', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a48724d68c8ed785b21369e75039e8455f3130ca26f98897d266b3f3102316f3.png',
    desc: 'Highest contrast, fully sealed surface, 24/7 ready',
    color: 'cyan'
  },
  { 
    id: 'mip-led', 
    title: 'MiP LED', 
    tagline: 'SMART SPEC', 
    icon: 'Layers', 
    pitch: 'P0.7 — P2.5', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ba71e99ddcebaaca612753230d9b464fd2a69d845b463a99354a5b80eaa797f8.png',
    desc: '85-90% of COB quality at 30-40% lower cost',
    color: 'emerald'
  },
  { 
    id: 'fine-pitch-led', 
    title: 'Fine Pitch', 
    tagline: 'COMMERCIAL', 
    icon: 'Monitor', 
    pitch: 'P0.9 — P2.5', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/803a560d8b43b496d0a7958dd588ab3f71a9d5a8a9e9bb74bfdff658be5d5f49.png',
    desc: 'The mainstream workhorse for indoor installations',
    color: 'amber'
  },
  { 
    id: 'all-in-one-dvled', 
    title: 'All-in-One dvLED', 
    tagline: 'LCD REPLACEMENT', 
    icon: 'MonitorPlay', 
    pitch: 'P0.9 — P1.8', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/bf902d17f53638bbd7fe1983fa50d0eefa5a621c86c67173c00826f504ca209b.png',
    desc: 'Plug-and-play 4K seamless displays, 110" to 216"',
    color: 'pink'
  },
  { 
    id: 'transparent-led', 
    title: 'Transparent LED', 
    tagline: 'SEE THROUGH', 
    icon: 'Eye', 
    pitch: 'P3.9 — P10', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9099db6081f3b9341a4a55c41f029d40d53834f5394236befe989fad76cd361b.png',
    desc: '85-95% transparency, content floats on glass',
    color: 'teal'
  },
  { 
    id: '3d-anamorphic-led', 
    title: '3D Anamorphic', 
    tagline: 'GLASSES-FREE 3D', 
    icon: 'Cuboid', 
    pitch: 'P2.5 — P6', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b14b05e09ba2807606d82f72f193c586976ed21d4ff695b26ecfc96152e987c8.png',
    desc: 'Viral corner displays that stop traffic',
    color: 'orange'
  },
  { 
    id: 'creative-led', 
    title: 'Creative LED', 
    tagline: 'BEYOND RECTANGLES', 
    icon: 'Box', 
    pitch: 'P1.5 — P4', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4dd8e0cbcbb71aec02c3a1c31e8ec0a95ab296a33235f2fe7ecfcfb539adefe9.png',
    desc: 'Curved, cylindrical, spherical, ceiling & floor',
    color: 'violet'
  },
  { 
    id: 'media-facade', 
    title: 'Media Facade', 
    tagline: 'BUILDING SCALE', 
    icon: 'Building2', 
    pitch: 'P15 — P50', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b256719e5b706e30693a2aa20f783eee47fb3de97a7e5c455c310224a1bb8d01.png',
    desc: 'Transform buildings into digital canvases',
    color: 'green'
  },
];

// Hero background image
const HERO_IMAGE = '/downloaded-images/ext_92b8793ffd88.jpgs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGFyayUyMGZ1dHVyaXN0aWN8ZW58MHx8fHwxNzczNzc3ODI4fDA&ixlib=rb-4.1.0&q=85';

/* Technology Card Component */
const TechCard = ({ tech, index, size = 'normal', isDark }) => {
  const Icon = ICON_MAP[tech.icon] || Monitor;
  const colorGradient = COLOR_MAP[tech.color] || 'from-cyan-400 to-cyan-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/technology/${tech.id}`}
        className="group relative block overflow-hidden rounded-2xl"
        style={{ aspectRatio: size === 'large' ? '16/10' : '4/5' }}
        data-testid={`tech-card-${tech.id}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={tech.image}
            alt={`${tech.title} LED technology`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          {/* Hover glow */}
          <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Pitch Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-[10px] font-bold tracking-[0.15em] px-3 py-1.5 rounded-full bg-gradient-to-r ${colorGradient} text-white shadow-lg`}>
            {tech.pitch}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
          <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">
            {tech.tagline}
          </span>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorGradient} bg-opacity-20 border border-white/20`}>
              <Icon size={18} className="text-white" />
            </div>
            <h2 
              className="text-lg font-bold tracking-wide group-hover:text-cyan-400 transition-colors"
              style={{ color: '#ffffff' }}
            >
              {tech.title}
            </h2>
          </div>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{tech.desc}</p>
          <div 
            className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
            style={{ color: '#22d3ee' }}
          >
            View Guide <ArrowRight size={14} />
          </div>
        </div>

        {/* Border on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
};

export default function TechnologyIndex() {
  const { isDark } = useTheme();
  const [technologies, setTechnologies] = useState(TECH_DATA);
  const [loading, setLoading] = useState(false);
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="technology-index-page">
      <SEO
        title="LED Display Technologies | MicroLED, COB, Transparent Dubai"
        description="9 LED technologies explained: MicroLED, COB, MiP, Fine Pitch, Transparent, 3D Anamorphic. Technical specs, comparisons & UAE guidance."
        path="/technology"
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] max-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="LED Technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs 
              items={[{ name: 'Home', path: '/' }, { name: 'Technology', path: null }]} 
              className="text-white/60 mb-4" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                LED Display Technologies
              </p>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
                style={{ color: '#ffffff' }}
                data-testid="technology-index-title"
              >
                Technology{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Hub
                </span>
              </h1>
              <p className="text-white/70 text-base max-w-lg">
                9 LED technologies explained for specifiers. Each guide covers specifications, use cases, and UAE/GCC-specific guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Featured - First 2 Technologies (larger cards) */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {technologies.slice(0, 2).map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} size="large" isDark={isDark} />
            ))}
          </div>

          {/* Rest - 3 Column Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technologies.slice(2).map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i + 2} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-neutral-100 border-neutral-200'} backdrop-blur-xl border rounded-2xl p-10 lg:p-14 text-center`}
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Not Sure Which Technology?
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-wide mb-4 ${textPrimary}`}>
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                Perfect Match
              </span>
            </h2>
            <p className={`${textSecondary} text-sm mb-8 max-w-lg mx-auto`}>
              Use our Technology Selector tool or talk to our engineers for a free recommendation based on your project requirements.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/technology-selector" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
                data-testid="tech-index-selector-cta"
              >
                Technology Selector <ArrowRight size={16} />
              </Link>
              <Link 
                to="/contact" 
                className={`${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-neutral-900/5 hover:bg-neutral-900/10 border-neutral-200'} border ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}
                data-testid="tech-index-contact-cta"
              >
                Ask an Engineer <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
