import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRight, Building2, Landmark, MapPin, Phone, MessageCircle,
  CheckCircle2, Clock, Shield, Award, Briefcase, Hotel
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Abu Dhabi specific sectors
const ABU_DHABI_SECTORS = [
  { icon: Landmark, name: 'Government & ADGM', desc: 'Federal ministries, ADGM financial center, government buildings' },
  { icon: Building2, name: 'Corporate HQs', desc: 'ADNOC, Mubadala, Etihad headquarters and towers' },
  { icon: Hotel, name: 'Luxury Hotels', desc: 'Emirates Palace, Louvre Abu Dhabi, Yas Island resorts' },
  { icon: Briefcase, name: 'Exhibition Centers', desc: 'ADNEC, trade shows, international conferences' },
];

// Key projects
const KEY_PROJECTS = [
  { name: 'ADNOC HQ', type: 'Corporate', tech: 'COB LED Video Wall' },
  { name: 'Louvre Abu Dhabi', type: 'Museum', tech: 'Fine Pitch Display' },
  { name: 'Yas Marina', type: 'Entertainment', tech: 'Outdoor LED' },
  { name: 'Abu Dhabi Airport', type: 'Transportation', tech: 'FIDS Displays' },
];

export default function AbuDhabiPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          const abuDhabiStudies = studies.filter(cs => 
            cs.location?.toLowerCase().includes('abu dhabi') || 
            cs.client?.toLowerCase().includes('aldar') ||
            cs.client?.toLowerCase().includes('adnoc')
          ).slice(0, 3);
          setCaseStudies(abuDhabiStudies.length > 0 ? abuDhabiStudies : studies.slice(0, 3));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a project in Abu Dhabi.";

  return (
    <div className="min-h-screen bg-[#050508] text-white" data-testid="abu-dhabi-page">
      <SEO 
        title="LED Screens Abu Dhabi | LED Display Supplier | Brightluxx"
        description="Leading LED screen supplier in Abu Dhabi. Government-approved, ISO certified. Video walls, outdoor displays, corporate solutions. Local warehouse & installation team."
        path="/abu-dhabi"
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#050508] to-[#050508]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <MapPin size={16} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Abu Dhabi, UAE</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              LED Display Solutions
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Abu Dhabi
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg text-gray-400 mb-8 max-w-2xl">
              Government-approved LED supplier serving Abu Dhabi's corporate headquarters, 
              luxury hotels, and public sector. Local warehouse with same-day availability.
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
                +971 55 995 4274
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: 'ADGPG Registered' },
                { icon: Award, label: 'ISO 9001 Certified' },
                { icon: Clock, label: 'Same-Day Delivery' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <item.icon size={16} className="text-amber-400" />
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Serving Abu Dhabi's Key Sectors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABU_DHABI_SECTORS.map((sector, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
                <sector.icon size={24} className="text-amber-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">{sector.name}</h3>
                <p className="text-xs text-gray-500">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Abu Dhabi Project Experience</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {KEY_PROJECTS.map((project, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                <div className="text-xs text-amber-400 mb-1">{project.type}</div>
                <div className="font-semibold text-white mb-1">{project.name}</div>
                <div className="text-xs text-gray-500">{project.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your Abu Dhabi Project</h2>
          <p className="text-gray-400 mb-6">Get a free site survey and quote for your LED display project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors">
              Request Quote
            </Link>
            <Link to="/case-studies" className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5">
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
