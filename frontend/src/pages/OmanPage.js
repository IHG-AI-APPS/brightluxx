import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LocationProjects, LocationFAQ } from '../components/LocationExtras';
import LOCATION_CONTENT from '../data/locationContent.json';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, Plane, Mountain, Hotel, Landmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Oman specific sectors
const OMAN_SECTORS = [
  { icon: Plane, name: 'Aviation', desc: 'Muscat International Airport, Salalah Airport FIDS systems' },
  { icon: Hotel, name: 'Tourism & Hospitality', desc: 'Luxury resorts, Shangri-La, Al Bustan Palace hotels' },
  { icon: Landmark, name: 'Convention & Events', desc: 'Oman Convention Centre, Royal Opera House Muscat' },
  { icon: Building2, name: 'Retail & Commercial', desc: 'Muscat Grand Mall, Oman Avenues Mall, CBD development' },
];

// Hero image - Muscat
const HERO_IMAGE = 'https://files.ihgbrands.com/site-images_opt_ext_d755e94ad86d.webp';

export default function OmanPage() {
  const { isDark } = useTheme();
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Oman.";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="oman-page">
      <SEO 
        title="LED Screens Oman | LED Display Supplier Muscat"
        description="Oman's trusted LED display supplier. Airport FIDS, convention center displays, luxury hotel installations. Fast delivery to Muscat. Free site assessment."
        path="/oman"
        keywords="LED screen Oman, video wall Muscat, LED display Oman, airport FIDS Oman, digital signage Muscat, convention center LED"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/solutions' },
          { name: 'Oman', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Oman",
          "description": "LED display supplier serving Oman's aviation, tourism, and commercial sectors",
          "address": { "@type": "PostalAddress", "addressLocality": "Muscat", "addressCountry": "OM" },
          "telephone": "+96800000000",
          "areaServed": ["Muscat", "Salalah", "Oman"]
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Muscat Oman mosque and mountains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Locations', path: '/solutions' }, { name: 'Oman', path: null }]} className="text-white/60 mb-4" />
            
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Muscat, Oman</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3" style={{ color: '#ffffff' }}>
                LED Displays{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Oman</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                From Muscat Airport to the Royal Opera House. Premium LED solutions for Oman's growing tourism and commercial sectors.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2">
                  Get Quote <ArrowRight size={16} />
                </Link>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-all inline-flex items-center gap-2">
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
              { icon: Shield, label: 'OSS Certified' },
              { icon: Plane, label: 'Airport Specialist' },
              { icon: Clock, label: '1-2 Day Delivery' },
              { icon: Award, label: '5-Year Warranty' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon size={18} className="text-cyan-400" />
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Portfolio</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Oman Landmark Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Muscat Airport', type: 'Aviation', tech: 'FIDS & Wayfinding' },
              { name: 'Oman Convention', type: 'Events', tech: 'Stage LED Wall' },
              { name: 'Royal Opera House', type: 'Culture', tech: 'Lobby Displays' },
              { name: 'Muscat Grand Mall', type: 'Retail', tech: 'Digital Signage' },
            ].map((project, i) => (
              <motion.div key={project.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors`}>
                <h3 className={`text-lg font-bold mb-1 ${textPrimary}`}>{project.name}</h3>
                <p className={`text-xs ${textSecondary} uppercase tracking-wider mb-2`}>{project.type}</p>
                <span className="text-cyan-400 text-xs font-semibold">{project.tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Industries</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Oman Sectors We Serve</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OMAN_SECTORS.map((sector, i) => (
              <motion.div key={sector.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6 hover:border-cyan-500/30 transition-colors`}>
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

      {/* Oman Tourism Growth */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Opportunity</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>Oman Tourism 2040</h2>
              <p className={`${textSecondary} mb-6`}>
                Oman's Vision 2040 targets significant tourism growth. New hotels, attractions, and infrastructure projects are creating unprecedented demand for LED display technology.
              </p>
              <ul className="space-y-4">
                {[
                  'New airport expansions require modern FIDS systems',
                  'Luxury resort developments need premium signage',
                  'Heritage site digitization projects',
                  'Smart city initiatives in Muscat',
                  'Convention and MICE sector growth',
                  'Retail modernization across the Sultanate',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                    <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`${cardBg} border ${borderColor} rounded-2xl p-8`}>
              <h3 className={`text-xl font-bold mb-6 ${textPrimary}`}>Contact Oman Team</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Muscat Office</p>
                    <p className={`text-sm ${textSecondary}`}>Al Khuwair, Muscat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Salalah Support</p>
                    <p className={`text-sm ${textSecondary}`}>Local partners for Dhofar region</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Oman Hotline</p>
                    <a href="tel:+96800000000" className={`text-sm ${textSecondary} hover:text-cyan-400`}>+968 0000 0000</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Working Hours</p>
                    <p className={`text-sm ${textSecondary}`}>Sun-Thu: 8AM-5PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-3 rounded-full transition-all text-center text-sm">Request Quote</Link>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-3 rounded-full transition-all text-center text-sm">WhatsApp</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LocationProjects data={LOCATION_CONTENT["/oman"]} accent="cyan" />
      <LocationFAQ data={LOCATION_CONTENT["/oman"]} accent="cyan" />

      {/* CTA */}
      <section className={`py-16 ${isDark ? 'bg-gradient-to-r from-cyan-900/20 to-purple-900/20' : 'bg-gradient-to-r from-cyan-50 to-purple-50'}`}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>Partner with Oman's LED Experts</h2>
          <p className={`${textSecondary} mb-6 max-w-lg mx-auto`}>From Muscat to Salalah, we deliver premium LED solutions across the Sultanate.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2">
              Free Site Assessment <ArrowRight size={16} />
            </Link>
            <Link to="/blog/gcc-led-display-market-guide-qatar-kuwait-bahrain-oman" className={`${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-neutral-100 border-neutral-200'} border ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}>
              Read GCC Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
