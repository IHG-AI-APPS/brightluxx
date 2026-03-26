import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, Landmark, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, Briefcase, Hotel, ShoppingBag,
  Plane, Train, Trophy, Clapperboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Dubai specific sectors
const DUBAI_SECTORS = [
  { icon: ShoppingBag, name: 'Retail & Malls', desc: 'Dubai Mall, Mall of Emirates, Festival City mega retail complexes' },
  { icon: Hotel, name: 'Luxury Hospitality', desc: 'Burj Al Arab, Atlantis, JW Marriott, and 5-star hotel chains' },
  { icon: Building2, name: 'DIFC & Business Bay', desc: 'Financial center towers, corporate headquarters, co-working spaces' },
  { icon: Clapperboard, name: 'Entertainment', desc: 'Dubai Parks, IMG Worlds, Global Village seasonal attractions' },
];

// Key projects
const KEY_PROJECTS = [
  { name: 'Dubai Mall', type: 'Retail', tech: 'Transparent LED Facade' },
  { name: 'Burj Khalifa', type: 'Landmark', tech: 'Media Facade LED' },
  { name: 'Dubai Metro', type: 'Transportation', tech: 'PIDS Displays' },
  { name: 'DIFC Gate', type: 'Corporate', tech: 'COB Video Wall' },
];

// Hero image
const HERO_IMAGE = '/downloaded-images/ext_77ab205a4c61.jpgs=srgb&fm=jpg&w=1600';

export default function DubaiPage() {
  const { isDark } = useTheme();
  const [caseStudies, setCaseStudies] = useState([]);
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          const dubaiStudies = studies.filter(cs => 
            cs.location?.toLowerCase().includes('dubai') || 
            cs.client?.toLowerCase().includes('emaar') ||
            cs.client?.toLowerCase().includes('meraas')
          ).slice(0, 3);
          setCaseStudies(dubaiStudies.length > 0 ? dubaiStudies : studies.slice(0, 3));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Dubai.";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="dubai-page">
      <SEO 
        title="LED Screens Dubai | #1 LED Display Supplier UAE"
        description="Dubai's leading LED display supplier. Indoor & outdoor screens, video walls, transparent LED. Projects in Dubai Mall, DIFC, JBR. Same-day delivery from local warehouse."
        path="/dubai"
        keywords="LED screen Dubai, video wall Dubai, LED display supplier UAE, outdoor LED Dubai, digital signage Dubai, LED rental Dubai"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/solutions' },
          { name: 'Dubai', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Dubai",
          "description": "Premium LED display supplier serving Dubai's retail, hospitality, corporate, and entertainment sectors",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE" },
          "telephone": "+971559954274",
          "areaServed": ["Dubai", "Sharjah", "Ajman", "UAE"]
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="Dubai skyline with Burj Khalifa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs 
              items={[{ name: 'Home', path: '/' }, { name: 'Locations', path: '/solutions' }, { name: 'Dubai', path: null }]} 
              className="text-white/60 mb-4" 
            />
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Dubai, UAE</span>
              </div>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
                style={{ color: '#ffffff' }}
              >
                LED Display Solutions{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Dubai
                </span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                Dubai's trusted LED display partner. From Dubai Mall to DIFC, we power the city's most iconic digital experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
                >
                  Get Quote <ArrowRight size={16} />
                </Link>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-all inline-flex items-center gap-2"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={`py-8 border-b ${borderColor}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, label: 'ISO 9001 Certified' },
              { icon: Award, label: 'Dubai DED Licensed' },
              { icon: Clock, label: 'Same-Day Delivery' },
              { icon: CheckCircle2, label: '5-Year Warranty' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon size={18} className="text-cyan-400" />
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Industries</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>
              Dubai Sectors We Serve
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUBAI_SECTORS.map((sector, i) => (
              <motion.div
                key={sector.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`${cardBg} border ${borderColor} rounded-2xl p-6 hover:border-cyan-500/30 transition-colors`}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <sector.icon size={24} className="text-cyan-400" />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${textPrimary}`}>{sector.name}</h3>
                <p className={`text-sm ${textSecondary}`}>{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Portfolio</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>
              Featured Dubai Projects
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {KEY_PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`${cardBg} border ${borderColor} rounded-2xl p-5 text-center`}
              >
                <h4 className={`text-lg font-bold mb-1 ${textPrimary}`}>{project.name}</h4>
                <p className={`text-xs ${textSecondary} uppercase tracking-wider mb-2`}>{project.type}</p>
                <span className="text-cyan-400 text-xs font-semibold">{project.tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Why Brightluxx</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>
                Dubai's Trusted LED Partner
              </h2>
              <ul className="space-y-4">
                {[
                  'Local warehouse in Al Quoz with 500+ panels in stock',
                  'Same-day delivery across Dubai, Sharjah, Ajman',
                  'In-house installation team with Dubai Municipality permits',
                  'Rental fleet for events at DWTC, Madinat, JBR',
                  '24/7 technical support from Jebel Ali service center',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                    <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeIn}
              className={`${cardBg} border ${borderColor} rounded-2xl p-8`}
            >
              <h3 className={`text-xl font-bold mb-6 ${textPrimary}`}>Contact Dubai Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Showroom & Warehouse</p>
                    <p className={`text-sm ${textSecondary}`}>Al Quoz Industrial Area 3, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Sales Hotline</p>
                    <a href="tel:+971559954274" className={`text-sm ${textSecondary} hover:text-cyan-400`}>+971 55 995 4274</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Working Hours</p>
                    <p className={`text-sm ${textSecondary}`}>Sat-Thu: 9AM-6PM | Emergency: 24/7</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link 
                  to="/contact" 
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-3 rounded-full transition-all text-center text-sm"
                >
                  Request Quote
                </Link>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-3 rounded-full transition-all text-center text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 ${isDark ? 'bg-gradient-to-r from-cyan-900/20 to-purple-900/20' : 'bg-gradient-to-r from-cyan-50 to-purple-50'}`}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>
            Ready to Light Up Dubai?
          </h2>
          <p className={`${textSecondary} mb-6 max-w-lg mx-auto`}>
            Get a free consultation and quote for your Dubai project. Our team responds within 2 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
            >
              Get Free Quote <ArrowRight size={16} />
            </Link>
            <Link 
              to="/products" 
              className={`${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-neutral-100 border-neutral-200'} border ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
