import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { SOLUTIONS } from '../data/solutions';

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
  healthcare: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/5468030b6847618ff8d0962c44c0869ac72b92e3dda4acd1b88d4c21437ea6d9.png',
  education: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/bcd5ee75376ec9db3ba96c6371c71a4c6db5ce02ff9d79deef4c0f56a73ad26d.png',
  sports: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/0e3eabf34c883a9bfcba897e548960e8a53a87e819c5490c2053f97cb939d564.png',
};

/* Scroll animation hook */
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

/* Apple-style fade in section */
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Glassmorphism Solution Card */
const SolutionCard = ({ solution, index }) => {
  const Icon = solution.icon;
  
  return (
    <FadeInSection delay={index}>
      <Link
        to={`/solutions/${solution.id}`}
        className="group relative block overflow-hidden h-full"
        data-testid={`solution-card-${solution.id}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={SOLUTION_IMAGES[solution.id]}
            alt={solution.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#050508]/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-end min-h-[400px] lg:min-h-[450px]">
          {/* Icon with glow */}
          <div className="relative mb-4">
            <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
              <Icon size={22} className="text-cyan-400" />
            </div>
            <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {solution.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-400 tracking-wide mb-4 line-clamp-2">
            {solution.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {solution.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] px-2.5 py-1 backdrop-blur-sm bg-white/5 border border-white/10 text-gray-300 uppercase tracking-wider font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            Explore Solution <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </FadeInSection>
  );
};

export default function Solutions() {
  return (
    <div className="min-h-screen bg-[#050508]" data-testid="solutions-page">
      <SEO
        title="LED Display Solutions"
        description="LED display solutions for every industry — retail, corporate, outdoor advertising, events, creative installations, traffic signage, virtual production, and transparent displays."
        path="/solutions"
        image={SOLUTION_IMAGES.retail}
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Industry Solutions
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-6" data-testid="solutions-page-title">
              LED Display
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                Solutions
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed tracking-wide max-w-xl mx-auto">
              Premium LED technology tailored for every environment and industry. From retail to virtual production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" data-testid="solutions-grid">
            {SOLUTIONS.map((sol, index) => (
              <SolutionCard key={sol.id} solution={sol} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-[#0A0A0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '11', label: 'Industry Verticals' },
                { value: '1500+', label: 'Installations' },
                { value: '200+', label: 'Unique Configurations' },
                { value: '100%', label: 'Custom Solutions' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center p-6 backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-3xl md:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 text-cyan-400/50 mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4">
                Not Sure Which Solution Fits?
              </h2>
              <p className="text-gray-400 text-sm tracking-wide mb-10 max-w-md mx-auto">
                Our experts will analyze your space and recommend the perfect LED setup for your specific requirements.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-10 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                  data-testid="solutions-cta-contact"
                >
                  Talk to an Expert <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/products" 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-10 py-4 transition-all inline-flex items-center gap-2"
                  data-testid="solutions-browse-products"
                >
                  Browse Products <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
