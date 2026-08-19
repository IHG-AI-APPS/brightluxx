import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LocationProjects, LocationFAQ } from '../components/LocationExtras';
import LOCATION_CONTENT from '../data/locationContent.json';
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
const HERO_IMAGE = 'https://files.ihgbrands.com/brightluxx/site-images/hero_dubai.webp';

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
          ).slice(0, 6);
          setCaseStudies(dubaiStudies.length > 0 ? dubaiStudies : studies.slice(0, 6));
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
        title="LED Screen Supplier Dubai | LED Display Company | Brightluxx"
        description="Brightluxx — LED screen supplier in Dubai with Jebel Ali showroom. Indoor & outdoor LED screens, video walls & digital signage. Dubai Mall, DIFC, JLT projects. Same-day quotes."
        path="/dubai"
        keywords="LED screen supplier Dubai, LED display company Dubai, LED video wall Dubai, outdoor LED screen Dubai, digital signage company Dubai, LED display manufacturer Dubai, LED screen suppliers in Dubai, indoor LED screen supplier in Dubai"
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
                LED Screen Supplier in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Dubai
                </span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-6">
                Dubai's LED display company for indoor & outdoor screens, video walls and digital signage. From Dubai Mall to DIFC, we power the city's most iconic digital experiences.
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

      {/* SEO Intro */}
      <section className="py-14 lg:py-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-12" data-testid="dubai-intro-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-5 ${textPrimary}`}>Your LED Display Company in Dubai</h2>
            {(LOCATION_CONTENT["/dubai"].intro || []).map((p, i) => (
              <p key={i} className={`text-sm md:text-base leading-relaxed mb-4 ${textSecondary}`}>{p}</p>
            ))}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link to="/indoor-led" className="text-cyan-400 text-sm font-semibold hover:underline" data-testid="dubai-link-indoor">Indoor LED Screens</Link>
              <span className={textSecondary}>·</span>
              <Link to="/outdoor-led" className="text-cyan-400 text-sm font-semibold hover:underline" data-testid="dubai-link-outdoor">Outdoor LED Screens</Link>
              <span className={textSecondary}>·</span>
              <Link to="/signage-solutions" className="text-cyan-400 text-sm font-semibold hover:underline" data-testid="dubai-link-signage">Digital Signage</Link>
              <span className={textSecondary}>·</span>
              <Link to="/led-screen-suppliers-dubai" className="text-cyan-400 text-sm font-semibold hover:underline" data-testid="dubai-link-suppliers">LED Screen Suppliers in Dubai</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24" data-testid="dubai-areas-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Coverage</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Dubai Areas We Serve</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(LOCATION_CONTENT["/dubai"].areas || []).map((area, i) => (
              <motion.div key={area.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.05 }} className={`${cardBg} border ${borderColor} rounded-xl p-5 hover:border-cyan-500/30 transition-colors`}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={15} className="text-cyan-400" />
                  <h3 className={`text-sm font-bold ${textPrimary}`}>{area.name}</h3>
                </div>
                <p className={`text-xs leading-relaxed ${textSecondary}`}>{area.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations & Power */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24" data-testid="dubai-regulations-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Compliance</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Dubai Signage Regulations & Power</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {(LOCATION_CONTENT["/dubai"].regulations || []).map((reg, i) => (
              <motion.div key={reg.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.08 }} className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className={`text-base font-semibold mb-2 ${textPrimary}`}>{reg.title}</h3>
                    <p className={`text-sm leading-relaxed ${textSecondary}`}>{reg.text}</p>
                  </div>
                </div>
              </motion.div>
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
                    <p className={`text-sm ${textSecondary}`}>Jebel Ali Industrial Area 1, Dubai, UAE</p>
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

      <LocationProjects data={LOCATION_CONTENT["/dubai"]} accent="cyan" />

      {/* Dubai Case Studies */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24" data-testid="dubai-case-studies-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Proof of Work</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Dubai Case Studies</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(caseStudies.length ? caseStudies.map(cs => ({ slug: cs.slug, title: cs.title, location: cs.location })) : (LOCATION_CONTENT["/dubai"].caseStudies || [])).slice(0, 8).map((cs, i) => (
              <Link key={cs.slug} to={`/case-studies/${cs.slug}`} className={`${cardBg} border ${borderColor} rounded-xl p-5 hover:border-cyan-500/30 transition-colors group block`} data-testid={`dubai-case-study-${i}`}>
                <h3 className={`text-sm font-bold mb-2 group-hover:text-cyan-400 transition-colors ${textPrimary}`}>{cs.title}</h3>
                <span className="text-cyan-400 text-xs font-semibold inline-flex items-center gap-1">Read Case Study <ArrowRight size={12} /></span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:underline" data-testid="dubai-all-case-studies-link">
              View All Case Studies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Showroom Map */}
      <section className={`py-16 lg:py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-neutral-100'}`}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-12" data-testid="dubai-map-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Visit Us</span>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary}`}>Our Dubai Showroom & Warehouse</h2>
            <p className={`text-sm mt-3 ${textSecondary}`}>Jebel Ali Industrial Area 1, Dubai — see LED panels running before you buy.</p>
          </motion.div>
          <div className={`rounded-2xl overflow-hidden border ${borderColor}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5!2d55.0272!3d24.9857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f13c77b5b2d6d%3A0x0!2sJebel+Ali+Industrial+Area+1!5e0!3m2!1sen!2sae!4v1"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Brightluxx LED Screen Supplier Dubai — Jebel Ali Industrial Area 1 Showroom"
              data-testid="dubai-google-map"
            ></iframe>
          </div>
        </div>
      </section>

      <LocationFAQ data={LOCATION_CONTENT["/dubai"]} accent="cyan" />

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
