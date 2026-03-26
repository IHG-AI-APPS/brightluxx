import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, Landmark, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, Plane, Mountain, Palmtree, Building
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Saudi specific sectors
const SAUDI_SECTORS = [
  { icon: Building, name: 'Vision 2030 Megaprojects', desc: 'NEOM, The Line, Qiddiya, Red Sea Project digital infrastructure' },
  { icon: Landmark, name: 'Government & Public', desc: 'Ministry buildings, public spaces, smart city initiatives' },
  { icon: Palmtree, name: 'Entertainment & Tourism', desc: 'Riyadh Season, AlUla, theme parks, sports venues' },
  { icon: Building2, name: 'Corporate & Retail', desc: 'King Abdullah Financial District, mega malls, headquarters' },
];

// Hero image - Riyadh skyline
const HERO_IMAGE = '/downloaded-images/ext_b75c64d94299.jpgs=srgb&fm=jpg&w=1600';

export default function SaudiArabiaPage() {
  const { isDark } = useTheme();
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Saudi Arabia.";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="saudi-arabia-page">
      <SEO 
        title="LED Screens Saudi Arabia | LED Display Supplier Riyadh"
        description="LED display supplier for Saudi Arabia's Vision 2030 projects. SASO certified, local stock in Riyadh. NEOM, Qiddiya, Red Sea Project ready. Free consultation."
        path="/saudi-arabia"
        keywords="LED screen Saudi Arabia, video wall Riyadh, LED display NEOM, outdoor LED Jeddah, digital signage KSA, Vision 2030 displays"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/solutions' },
          { name: 'Saudi Arabia', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Saudi Arabia",
          "description": "LED display supplier for Saudi Arabia's Vision 2030 megaprojects and commercial developments",
          "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
          "telephone": "+966500000000",
          "areaServed": ["Riyadh", "Jeddah", "NEOM", "Saudi Arabia"]
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Riyadh skyline at night" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Locations', path: '/solutions' }, { name: 'Saudi Arabia', path: null }]} className="text-white/60 mb-4" />
            
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Saudi Arabia</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3" style={{ color: '#ffffff' }}>
                LED Solutions for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Vision 2030</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                Powering Saudi Arabia's transformation. From NEOM to Riyadh Season, we deliver LED displays for the Kingdom's most ambitious projects.
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
              { icon: Shield, label: 'SASO Certified' },
              { icon: Award, label: 'Vision 2030 Supplier' },
              { icon: Clock, label: 'Riyadh Stock' },
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

      {/* Vision 2030 Megaprojects */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Vision 2030</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Megaproject Ready</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'NEOM', desc: 'The Line, Oxagon, Trojena displays', highlight: 'Pre-qualified' },
              { name: 'Qiddiya', desc: '$8B entertainment city', highlight: 'Active Tenders' },
              { name: 'Red Sea', desc: 'Luxury resort signage', highlight: 'Specification Ready' },
              { name: 'Diriyah', desc: 'Heritage site integration', highlight: 'Completed' },
            ].map((project, i) => (
              <motion.div key={project.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors`}>
                <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">{project.highlight}</span>
                <h3 className={`text-xl font-bold my-2 ${textPrimary}`}>{project.name}</h3>
                <p className={`text-sm ${textSecondary}`}>{project.desc}</p>
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
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Sectors We Serve in KSA</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAUDI_SECTORS.map((sector, i) => (
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

      {/* KSA Compliance & Contact */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Compliance</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>KSA Market Ready</h2>
              <ul className="space-y-4">
                {[
                  'SASO certified products for Saudi import compliance',
                  'Local content program participation for government tenders',
                  'Riyadh warehouse with fast customs clearance',
                  'Arabic-speaking technical support team',
                  'Saudi Commercial Registration (CR) active',
                  'Pre-qualified with major Saudi contractors',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                    <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`${cardBg} border ${borderColor} rounded-2xl p-8`}>
              <h3 className={`text-xl font-bold mb-6 ${textPrimary}`}>Contact KSA Team</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Riyadh Office</p>
                    <p className={`text-sm ${textSecondary}`}>King Abdullah Financial District, Riyadh</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Jeddah Office</p>
                    <p className={`text-sm ${textSecondary}`}>Jeddah Islamic Port Free Zone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>KSA Hotline</p>
                    <a href="tel:+966500000000" className={`text-sm ${textSecondary} hover:text-cyan-400`}>+966 50 000 0000</a>
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
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>Partner with Saudi's LED Experts</h2>
          <p className={`${textSecondary} mb-6 max-w-lg mx-auto`}>From tender support to installation, we're your end-to-end LED partner in the Kingdom.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2">
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link to="/blog/saudi-arabia-vision-2030-led-projects" className={`${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-neutral-100 border-neutral-200'} border ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2`}>
              Read KSA Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
