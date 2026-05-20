import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, MapPin, Calendar, Users, CheckCircle, Factory, Cpu, Shield, Zap, Globe, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { generateBreadcrumbSchema } from '../utils/seoSchemas';

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

const GlassCard = ({ children, className = '', hover = true, isDark = true }) => (
  <div className={`
    backdrop-blur-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/80'} border ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'} rounded-lg
    ${hover ? `hover:${isDark ? 'bg-white/[0.06]' : 'bg-white'} hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]` : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const CAPABILITIES = [
  'Indoor LED Screens & Video Walls',
  'Outdoor LED Displays & Billboards',
  'Transparent & Clear Film LED',
  'Flexible & Curved LED Modules',
  'Interactive Floor LED Displays',
  'Road Signal & Traffic LED Signage',
  'Spherical & Creative LED Installations',
  'Virtual Production LED Stages',
  'All-in-One Conference LED Screens',
  'COB MicroLED Ultra-Fine Pitch',
];

const STATS = [
  { value: '2005', label: 'Established', icon: Calendar, color: 'from-cyan-400 to-cyan-600' },
  { value: 'UAE', label: 'Headquartered', icon: MapPin, color: 'from-cyan-400 to-blue-500' },
  { value: '1500+', label: 'Screens Installed', icon: Award, color: 'from-cyan-400 to-teal-500' },
  { value: '24/7', label: 'Support', icon: Users, color: 'from-cyan-400 to-cyan-600' },
];

const STRENGTHS = [
  { icon: Factory, title: 'In-House Manufacturing', desc: 'Complete control over production quality' },
  { icon: Cpu, title: 'Latest Technology', desc: 'COB MicroLED, GOB, Transparent, 3D' },
  { icon: Shield, title: 'Gulf-Grade Engineering', desc: 'Built for extreme GCC conditions' },
  { icon: Zap, title: 'Fast Delivery', desc: '2,000+ sqm local stock in Dubai' },
  { icon: Globe, title: 'Regional Coverage', desc: 'UAE, KSA, Qatar, Bahrain, Oman' },
  { icon: Wrench, title: 'Full-Service Support', desc: 'Design, install, maintain, train' },
];

export default function About() {
  const { isDark } = useTheme();
  
  // Theme-aware classes
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const sectionBg = isDark ? 'bg-[#0A0A0D]' : 'bg-neutral-100';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-neutral-200';
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]);
  
  return (
    <div className={`${pageBg} transition-colors duration-500`} data-testid="about-page">
      <SEO
        title="About Brightluxx — Premium LED Display Solutions Since 2005"
        description="Brightluxx is a UAE-based LED display solutions company. Gulf-grade engineering, local support, and a commitment to transforming spaces with cutting-edge LED technology."
        path="/about"
        jsonLd={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="relative py-28 lg:py-36 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 ${textPrimary}`} data-testid="about-page-title">
                ENGINEERING
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                  VISUAL EXCELLENCE
                </span>
              </h1>
              <p className={`${textSecondary} text-base md:text-lg max-w-2xl mx-auto`}>
                Since 2005, Brightluxx has delivered premium LED display solutions across the UAE and GCC. 
                Gulf-grade engineering. Local expertise. Global standards.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" data-testid="about-stats">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {STATS.map((stat, i) => (
              <FadeInSection key={stat.label} delay={i}>
                <GlassCard className="p-6 lg:p-8 text-center group" isDark={isDark} data-testid={`about-stat-${stat.label.toLowerCase()}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon size={22} className="text-cyan-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold tracking-wider mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                    {stat.value}
                  </div>
                  <div className={`text-[10px] ${textMuted} tracking-[0.2em] uppercase font-bold`}>
                    {stat.label}
                  </div>
                </GlassCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Video Showcase */}
      <section className={`py-16 ${sectionBg} transition-colors duration-500`} data-testid="about-video-showcase">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-10">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">See Us In Action</span>
              <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-wide ${textPrimary}`}>
                Our Work Speaks
              </h2>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={1}>
            <GlassCard className="overflow-hidden" hover={false} isDark={isDark}>
              <div className="relative aspect-video">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/recovered/videos_hero-video-1.mp4" type="video/mp4" />
                </video>
                {/* Subtle overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#050508]/30' : 'from-white/30'} to-transparent pointer-events-none`} />
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 relative" data-testid="about-who-we-are">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeInSection>
              <GlassCard className="p-8 lg:p-10 h-full" hover={false} isDark={isDark}>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Who We Are</span>
                <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6 ${textPrimary}`}>
                  Your LED Display Partner
                </h2>
                <div className={`space-y-4 text-sm ${textSecondary} leading-relaxed tracking-wide`}>
                  <p>
                    <strong className={textPrimary}>Brightluxx</strong> is a one-stop solution for all digital display needs. As the digital display division of <strong className={textPrimary}>IHG Industry L.L.C</strong>, we deliver exceptional digital solutions to the LED sector with high-quality, customizable, and long-lasting products.
                  </p>
                  <p>
                    Since 2005, we've established ourselves as the region's leading manufacturer and supplier of LED display screens and digital signage solutions. We are one of the most well-known firms in the UAE, with a global reputation for manufacturing and installing indoor and outdoor LED screens.
                  </p>
                  <p>
                    We choose LEDs as our fundamental technology because they are energy-efficient and environmentally benign. We supply the most up-to-date technology with the most reliable components, consistently exceeding our clients' expectations.
                  </p>
                </div>
              </GlassCard>
            </FadeInSection>

            <div className="space-y-6">
              <FadeInSection delay={1}>
                <GlassCard className="p-8" isDark={isDark}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Eye size={22} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-lg font-bold uppercase tracking-wide ${textPrimary}`}>Our Vision</h3>
                  </div>
                  <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide`}>
                    We're focused on how people interact with their screens — what features matter most, the environments they're used in. Every day we gain new knowledge, uncovering ways to help you find the finest solutions you may not even be aware of.
                  </p>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={2}>
                <GlassCard className="p-8" isDark={isDark}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Target size={22} className="text-cyan-400" />
                    </div>
                    <h3 className={`text-lg font-bold uppercase tracking-wide ${textPrimary}`}>Our Mission</h3>
                  </div>
                  <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide`}>
                    To develop visual technology by establishing relationships and creating customer-driven solutions focused on value creation and integration of new opportunities. Through high-end technology and flawless services, we strive to provide the highest value to our consumers.
                  </p>
                </GlassCard>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className={`py-24 ${sectionBg} transition-colors duration-500`} data-testid="about-strengths">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Why Choose Us</span>
              <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-wide ${textPrimary}`}>
                The Brightluxx
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">
                  Advantage
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {STRENGTHS.map((item, i) => (
              <FadeInSection key={item.title} delay={i}>
                <GlassCard className="p-6 lg:p-8 h-full group" isDark={isDark}>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon size={22} className="text-cyan-400" />
                  </div>
                  <h3 className={`text-sm font-bold uppercase tracking-wide ${textPrimary} mb-2`}>{item.title}</h3>
                  <p className={`text-xs ${textMuted} tracking-wide`}>{item.desc}</p>
                </GlassCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 relative" data-testid="about-capabilities">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <GlassCard className="p-8 lg:p-12" hover={false} isDark={isDark}>
              <div className="text-center mb-10">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">What We Do</span>
                <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-wide ${textPrimary}`}>Our Capabilities</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAPABILITIES.map((cap, i) => (
                  <div key={i} className={`flex items-center gap-4 py-3 border-b ${borderColor} last:border-0`}>
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-cyan-400" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} tracking-wide`}>{cap}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden" data-testid="about-cta">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Ready to Transform Your Space?
              </span>
              <h2 className={`text-3xl md:text-5xl font-bold uppercase tracking-wide mb-6 ${textPrimary}`}>
                Let's Discuss Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                  Project
                </span>
              </h2>
              <p className={`${textSecondary} text-base mb-10 tracking-wide`}>
                Our LED display specialists are ready to help with your project requirements.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                  data-testid="about-cta-contact"
                >
                  Get in Touch <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/projects" 
                  className={`${isDark ? 'bg-white/5' : 'bg-neutral-900/5'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-neutral-300'} hover:border-cyan-500/30 ${textPrimary} font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2`}
                  data-testid="about-cta-projects"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
