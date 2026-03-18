import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, Building2, Landmark, MapPin, Phone, MessageCircle,
  Star, Shield, Award, Rocket, Globe, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Saudi mega projects
const SAUDI_PROJECTS = [
  { name: 'NEOM', desc: 'The Line, Trojena, Oxagon smart city displays', icon: Rocket },
  { name: 'Riyadh Season', desc: 'Entertainment district LED installations', icon: Star },
  { name: 'Red Sea Project', desc: 'Luxury resort digital experiences', icon: Globe },
  { name: 'Diriyah Gate', desc: 'Heritage district modern displays', icon: Landmark },
];

// Key stats
const STATS = [
  { value: '$575M', label: 'Market by 2034' },
  { value: '7.8%', label: 'Annual Growth' },
  { value: 'FIFA 2034', label: 'Host Nation' },
];

export default function SaudiArabiaPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          const saudiStudies = studies.filter(cs => 
            cs.location?.toLowerCase().includes('saudi') || 
            cs.location?.toLowerCase().includes('riyadh') ||
            cs.location?.toLowerCase().includes('jeddah')
          ).slice(0, 3);
          setCaseStudies(saudiStudies.length > 0 ? saudiStudies : studies.slice(0, 3));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Saudi Arabia.";

  return (
    <div className="min-h-screen bg-[#050508] text-white" data-testid="saudi-arabia-page">
      <SEO 
        title="LED Screens Saudi Arabia | Vision 2030 LED Supplier"
        description="Premium LED display supplier for Saudi Arabia Vision 2030 mega projects. NEOM, Riyadh Season, Red Sea, Diriyah Gate. SASO compliant, competitive pricing."
        path="/saudi-arabia"
        keywords="LED screen Saudi Arabia, video wall Riyadh, Vision 2030 LED, NEOM displays, LED supplier KSA, digital signage Jeddah"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
          { name: 'Saudi Arabia', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx Saudi Arabia",
          "description": "LED display supplier supporting Saudi Vision 2030 mega projects including NEOM, Riyadh Season, and Red Sea Project",
          "address": { "@type": "PostalAddress", "addressCountry": "SA" },
          "telephone": "+971559954274",
          "areaServed": ["Riyadh", "Jeddah", "Dammam", "NEOM", "Saudi Arabia"]
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <Breadcrumbs 
          items={[
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Saudi Arabia', path: null }
          ]} 
          className="text-gray-500" 
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-[#050508] to-[#050508]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">Vision 2030 Partner</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              LED Display Solutions
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Saudi Arabia
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg text-gray-400 mb-8 max-w-2xl">
              Supporting Saudi Vision 2030 with world-class LED technology. 
              From NEOM to Riyadh Season, we deliver displays for the Kingdom's most ambitious projects.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all hover:scale-105"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="tel:+971559954274" className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5">
                <Phone size={18} />
                Contact Sales
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mega Projects */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">Supporting Mega Projects</h2>
          <p className="text-gray-500 text-center mb-8">LED solutions for Saudi Arabia's transformational developments</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAUDI_PROJECTS.map((project, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all">
                <project.icon size={24} className="text-green-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                <p className="text-xs text-gray-500">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Saudi */}
      <section className="py-16 px-6 bg-gradient-to-b from-green-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Partner With Brightluxx for KSA</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Experience with Saudi mega-project specifications',
              'Competitive pricing for large-scale deployments',
              'Local support and rapid delivery options',
              'SASO compliance and documentation ready',
              'Proven track record in GCC region',
              'Full project lifecycle support'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02]">
                <Shield size={16} className="text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Saudi Project?</h2>
          <p className="text-gray-400 mb-6">Get competitive pricing for your Vision 2030 LED display project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors">
              Request KSA Quote
            </Link>
            <Link to="/government-solutions" className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5">
              Government Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
