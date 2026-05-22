import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Briefcase, Sun, Music, Sparkles, Car, Video, Eye, Heart, GraduationCap, Trophy } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import TiltCard from '../components/TiltCard';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping
const ICONS = {
  ShoppingBag, Briefcase, Sun, Music, Sparkles, Car, Video, Eye, Heart, GraduationCap, Trophy
};

// Shortened titles for symmetry + slug mapping
const SOLUTION_SHORT_TITLES = {
  'retail': 'Retail',
  'corporate': 'Corporate',
  'outdoor': 'Outdoor',
  'events': 'Events',
  'creative': 'Creative',
  'traffic': 'Traffic',
  'immersive': 'Immersive',
  'transparent': 'Transparent',
  'healthcare': 'Healthcare',
  'education': 'Education',
  'sports': 'Sports'
};

// AI-Generated Solution Images
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

// Hero background image
const HERO_IMAGE = 'https://files.ihgbrands.com/site-images_opt_ext_d83f2569d4d3.webp';

/* Minimal Solution Card with 3D Tilt Effect */
const SolutionCard = ({ solution, index }) => {
  const solutionSlug = solution.slug || solution.id;
  const iconName = solution.icon || 'Sparkles';
  const Icon = ICONS[iconName] || Sparkles;
  const imageUrl = solution.hero_image || SOLUTION_IMAGES[solutionSlug] || SOLUTION_IMAGES.retail;
  const shortTitle = SOLUTION_SHORT_TITLES[solutionSlug] || solution.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        tiltIntensity={8}
        scale={1.02}
        glareEnabled={true}
        glareMaxOpacity={0.12}
        className="rounded-2xl"
      >
        <Link
          to={`/solutions/${solutionSlug}`}
          className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
          data-testid={`solution-card-${solutionSlug}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt={shortTitle}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Hover glow */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content - Centered */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 text-center">
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)' 
              }}
            >
              <Icon size={20} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
            </div>

            {/* Title - Short, Single Word */}
            <h3 
              className="text-lg font-semibold tracking-wide mb-2 group-hover:text-cyan-400 transition-colors duration-300"
              style={{ color: '#ffffff' }}
            >
              {shortTitle}
            </h3>

            {/* Explore CTA - appears on hover */}
            <div 
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{ color: '#22d3ee' }}
            >
              <span>Explore</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Border on hover */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
        </Link>
      </TiltCard>
    </motion.div>
  );
};

export default function Solutions() {
  const { isDark } = useTheme();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/solutions`);
        const data = await res.json();
        setSolutions(data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="solutions-page">
      <SEO
        title="LED Display Solutions by Industry | Dubai UAE"
        description="Professional LED display solutions for retail, corporate, outdoor, events, healthcare, education & more. 11 industry verticals served across UAE & GCC."
        path="/solutions"
        image={SOLUTION_IMAGES.retail}
      />

      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="Modern architecture facade" 
            className="w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/40 via-transparent to-[#050508]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[{ name: 'Home', path: '/' }, { name: 'Solutions', path: null }]} 
              className="text-white/60 mb-8" 
            />
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Industry Solutions
              </p>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                style={{ color: '#ffffff' }}
                data-testid="solutions-page-title"
              >
                LED Displays for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Every Industry
                </span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg">
                Premium LED technology tailored for your environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid - 4 columns on desktop, clean symmetrical layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className={`text-center py-12 ${textSecondary}`}>Loading solutions...</div>
          ) : (
            <div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" 
              data-testid="solutions-grid"
            >
              {solutions.map((sol, index) => (
                <SolutionCard key={sol.id || sol.slug} solution={sol} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Minimal Stats - Inline, No Cards */}
      <section className="py-12 border-t border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { value: '11', label: 'Industries' },
              { value: '1500+', label: 'Projects' },
              { value: '100%', label: 'Custom' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
                  {stat.value}
                </div>
                <div className={`text-[10px] ${textSecondary} uppercase tracking-[0.15em] mt-1`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight mb-4 ${textPrimary}`}>
              Not sure which solution fits?
            </h2>
            <p className={`${textSecondary} text-sm mb-8`}>
              Our experts will recommend the perfect setup for your space.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
                data-testid="solutions-cta-contact"
              >
                Talk to an Expert <ArrowRight size={16} />
              </Link>
              <Link 
                to="/products" 
                className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-900/5 hover:bg-neutral-900/10'} ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2 border border-white/10`}
                data-testid="solutions-browse-products"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
