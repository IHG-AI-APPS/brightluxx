import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, Trophy, Plane, Building, GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Qatar specific sectors
const QATAR_SECTORS = [
  { icon: Trophy, name: 'Sports & Stadiums', desc: 'World Cup legacy venues, Khalifa Stadium, Lusail Stadium' },
  { icon: Building2, name: 'Corporate & Finance', desc: 'QFC, West Bay towers, banking headquarters' },
  { icon: Building, name: 'Smart City', desc: 'Lusail City, Msheireb Downtown, Qatar Rail' },
  { icon: GraduationCap, name: 'Education & Culture', desc: 'Education City, National Museum, Katara' },
];

// Hero image - Doha skyline
const HERO_IMAGE = 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?crop=entropy&cs=srgb&fm=jpg&w=1600';

export default function QatarPage() {
  const { isDark } = useTheme();
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Qatar.";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="qatar-page">
      <SEO 
        title="LED Screens Qatar | LED Display Supplier Doha"
        description="Qatar's trusted LED display supplier. World Cup stadium technology, Lusail City smart displays, West Bay corporate video walls. Fast delivery from Doha warehouse."
        path="/qatar"
        keywords="LED screen Qatar, video wall Doha, LED display Qatar, outdoor LED Lusail, digital signage Doha, stadium LED Qatar"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/solutions' },
          { name: 'Qatar', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Qatar",
          "description": "LED display supplier serving Qatar's sports venues, smart cities, and corporate developments",
          "address": { "@type": "PostalAddress", "addressLocality": "Doha", "addressCountry": "QA" },
          "telephone": "+97400000000",
          "areaServed": ["Doha", "Lusail", "Qatar"]
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Doha skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Locations', path: '/solutions' }, { name: 'Qatar', path: null }]} className="text-white/60 mb-4" />
            
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Doha, Qatar</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3" style={{ color: '#ffffff' }}>
                LED Displays{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Qatar</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                From World Cup stadiums to Lusail smart city. Qatar's premium LED partner for sports, corporate, and urban development projects.
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
              { icon: Trophy, label: 'World Cup Supplier' },
              { icon: Shield, label: 'QFC Registered' },
              { icon: Clock, label: 'Doha Warehouse' },
              { icon: Award, label: 'FIFA Standards' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon size={18} className="text-cyan-400" />
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Cup Legacy */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Legacy</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>World Cup Stadium Technology</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Lusail Stadium', capacity: '80,000', tech: 'Perimeter LED + IPTV' },
              { name: 'Al Bayt Stadium', capacity: '60,000', tech: 'Curved LED Facade' },
              { name: 'Khalifa Stadium', capacity: '45,000', tech: 'Ring Display System' },
              { name: 'Education City', capacity: '40,000', tech: 'Transparent LED' },
            ].map((stadium, i) => (
              <motion.div key={stadium.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors`}>
                <Trophy size={24} className="text-cyan-400 mx-auto mb-3" />
                <h3 className={`text-lg font-bold mb-1 ${textPrimary}`}>{stadium.name}</h3>
                <p className={`text-xs ${textSecondary} uppercase tracking-wider mb-2`}>{stadium.capacity} seats</p>
                <span className="text-cyan-400 text-xs font-semibold">{stadium.tech}</span>
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
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Qatar Sectors We Serve</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QATAR_SECTORS.map((sector, i) => (
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

      {/* Contact */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Why Us</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>Qatar Market Expertise</h2>
              <ul className="space-y-4">
                {[
                  'FIFA-grade stadium display technology',
                  'Lusail City smart signage specifications',
                  'Qatar Rail and Metro PIDS experience',
                  'Msheireb Downtown heritage integration',
                  'West Bay corporate video wall installations',
                  'Education City museum-grade displays',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                    <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`${cardBg} border ${borderColor} rounded-2xl p-8`}>
              <h3 className={`text-xl font-bold mb-6 ${textPrimary}`}>Contact Qatar Team</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Doha Office</p>
                    <p className={`text-sm ${textSecondary}`}>West Bay, Doha, Qatar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Qatar Hotline</p>
                    <a href="tel:+97400000000" className={`text-sm ${textSecondary} hover:text-cyan-400`}>+974 0000 0000</a>
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

      {/* CTA */}
      <section className={`py-16 ${isDark ? 'bg-gradient-to-r from-cyan-900/20 to-purple-900/20' : 'bg-gradient-to-r from-cyan-50 to-purple-50'}`}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>Ready for Your Qatar Project?</h2>
          <p className={`${textSecondary} mb-6 max-w-lg mx-auto`}>World Cup-proven technology for your next installation. Contact our Doha team today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/products" className={`${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-neutral-100 border-neutral-200'} border ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}>
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
