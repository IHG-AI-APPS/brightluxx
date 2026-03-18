import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, ShoppingBag, Plane, Building, Theater
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Kuwait specific sectors
const KUWAIT_SECTORS = [
  { icon: ShoppingBag, name: 'Retail & Malls', desc: 'The Avenues, 360 Mall, The Gate Mall luxury retail' },
  { icon: Building2, name: 'Corporate & Banking', desc: 'Kuwait City towers, NBK, KFH headquarters' },
  { icon: Theater, name: 'Entertainment', desc: 'Cultural centers, cinemas, Sheikh Jaber Centre' },
  { icon: Plane, name: 'Transportation', desc: 'Kuwait International Airport Terminal 2' },
];

// Hero image - Kuwait City
const HERO_IMAGE = 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?crop=entropy&cs=srgb&fm=jpg&w=1600';

export default function KuwaitPage() {
  const { isDark } = useTheme();
  
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Kuwait.";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="kuwait-page">
      <SEO 
        title="LED Screens Kuwait | LED Display Supplier Kuwait City"
        description="Kuwait's trusted LED display supplier. The Avenues Mall, corporate towers, airport displays. Fast delivery, local installation team. Free site survey."
        path="/kuwait"
        keywords="LED screen Kuwait, video wall Kuwait City, LED display Kuwait, outdoor LED Kuwait, digital signage Avenues Mall, airport LED Kuwait"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/solutions' },
          { name: 'Kuwait', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Kuwait",
          "description": "LED display supplier serving Kuwait's retail, corporate, and entertainment sectors",
          "address": { "@type": "PostalAddress", "addressLocality": "Kuwait City", "addressCountry": "KW" },
          "telephone": "+96500000000",
          "areaServed": ["Kuwait City", "Kuwait"]
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Kuwait City skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Locations', path: '/solutions' }, { name: 'Kuwait', path: null }]} className="text-white/60 mb-4" />
            
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Kuwait City</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3" style={{ color: '#ffffff' }}>
                LED Solutions{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Kuwait</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                From The Avenues to Kuwait Towers. Premium LED displays for Kuwait's retail, corporate, and entertainment landmarks.
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
              { icon: Shield, label: 'KUCAS Certified' },
              { icon: Award, label: 'Retail Specialist' },
              { icon: Clock, label: '3-Day Delivery' },
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

      {/* Key Projects */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Portfolio</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Kuwait Landmark Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'The Avenues', type: 'Retail', tech: 'Transparent LED Facade' },
              { name: 'Kuwait Airport T2', type: 'Transportation', tech: 'FIDS & Wayfinding' },
              { name: 'Sheikh Jaber Centre', type: 'Culture', tech: 'COB Video Wall' },
              { name: 'NBK Tower', type: 'Corporate', tech: 'Lobby LED Wall' },
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
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Kuwait Sectors We Serve</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {KUWAIT_SECTORS.map((sector, i) => (
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
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Service</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>Kuwait Service Commitment</h2>
              <ul className="space-y-4">
                {[
                  'Fast delivery from Dubai hub (3-4 business days)',
                  'Local installation partners with Kuwait permits',
                  'Arabic-speaking support team',
                  'Extended warranties for Kuwait projects',
                  'Retail-focused solutions for mall environments',
                  'Annual maintenance contracts available',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${textSecondary}`}>
                    <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`${cardBg} border ${borderColor} rounded-2xl p-8`}>
              <h3 className={`text-xl font-bold mb-6 ${textPrimary}`}>Contact Kuwait Team</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Kuwait Office</p>
                    <p className={`text-sm ${textSecondary}`}>Sharq, Kuwait City</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Kuwait Hotline</p>
                    <a href="tel:+96500000000" className={`text-sm ${textSecondary} hover:text-cyan-400`}>+965 0000 0000</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className={`text-sm font-semibold ${textPrimary}`}>Working Hours</p>
                    <p className={`text-sm ${textSecondary}`}>Sun-Thu: 9AM-6PM</p>
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
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>Start Your Kuwait Project</h2>
          <p className={`${textSecondary} mb-6 max-w-lg mx-auto`}>Free site survey and consultation for Kuwait projects. Contact our GCC team today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2">
              Free Consultation <ArrowRight size={16} />
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
