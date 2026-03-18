import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowRight, CheckCircle2, Shield, Award, FileCheck, Building2,
  Landmark, GraduationCap, Plane, Hospital, Train, Phone, MessageCircle,
  Download, Clock, Users, Globe, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Certifications
const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management', icon: Shield },
  { name: 'ISO 14001', desc: 'Environmental', icon: Globe },
  { name: 'CE Certified', desc: 'European Standards', icon: Award },
  { name: 'RoHS Compliant', desc: 'Hazardous Substances', icon: FileCheck },
];

// Government sectors we serve
const GOVERNMENT_SECTORS = [
  { 
    icon: Landmark, 
    name: 'Government Offices',
    desc: 'Command centers, meeting rooms, public information displays',
    examples: ['Municipality offices', 'Government service centers', 'Ministry buildings']
  },
  { 
    icon: Plane, 
    name: 'Airports & Aviation',
    desc: 'FIDS, wayfinding, advertising displays',
    examples: ['Dubai Airports', 'Abu Dhabi International', 'Regional airports']
  },
  { 
    icon: Train, 
    name: 'Transportation',
    desc: 'Metro stations, bus terminals, traffic management',
    examples: ['Dubai Metro', 'RTA projects', 'Integrated transport']
  },
  { 
    icon: Hospital, 
    name: 'Healthcare',
    desc: 'Patient information, wayfinding, medical displays',
    examples: ['Government hospitals', 'Health centers', 'Medical cities']
  },
  { 
    icon: GraduationCap, 
    name: 'Education',
    desc: 'Smart classrooms, auditoriums, campus signage',
    examples: ['Public universities', 'Government schools', 'Training institutes']
  },
  { 
    icon: Building2, 
    name: 'Smart Cities',
    desc: 'Public information, smart infrastructure, urban displays',
    examples: ['Smart Dubai', 'Abu Dhabi Vision', 'Urban development']
  },
];

// Why government clients choose us
const VALUE_PROPS = [
  { title: 'Pre-Qualified Supplier', desc: 'Registered with major UAE government procurement systems' },
  { title: 'Local Presence', desc: 'UAE-based team for rapid response and support' },
  { title: 'Competitive Pricing', desc: 'Government-friendly pricing with transparent quotations' },
  { title: 'Compliance Ready', desc: 'All documentation for tender submissions prepared' },
  { title: 'Proven Track Record', desc: '15+ years serving UAE government entities' },
  { title: 'Technical Expertise', desc: 'In-house engineers for complex requirements' },
];

// Documents available for download
const DOCUMENTS = [
  { name: 'Company Profile', desc: 'Overview of Brightluxx capabilities', type: 'PDF' },
  { name: 'Product Catalog', desc: 'Full range of LED display solutions', type: 'PDF' },
  { name: 'Certification Bundle', desc: 'ISO, CE, RoHS certificates', type: 'ZIP' },
  { name: 'Technical Specifications', desc: 'Detailed product specs', type: 'PDF' },
];

export default function GovernmentSolutions() {
  const [caseStudies, setCaseStudies] = useState([]);
  
  useEffect(() => {
    // Fetch government-related case studies
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          // Filter for government/corporate projects
          const govStudies = studies.filter(cs => 
            cs.category?.toLowerCase().includes('corporate') || 
            cs.category?.toLowerCase().includes('healthcare') ||
            cs.title?.toLowerCase().includes('hospital') ||
            cs.title?.toLowerCase().includes('airport') ||
            cs.client?.toLowerCase().includes('government')
          ).slice(0, 3);
          setCaseStudies(govStudies);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm interested in LED display solutions for a government project.";

  return (
    <div className="min-h-screen bg-[#050508] text-white" data-testid="government-solutions-page">
      {/* SEO */}
      <SEO 
        title="Government LED Display Solutions UAE | Certified Supplier"
        description="ISO 9001 certified LED display supplier for UAE government & public sector. Pre-qualified for tenders. Airports, metro, hospitals, smart cities, ministries."
        path="/government-solutions"
        keywords="government LED display UAE, public sector video wall, airport LED screen Dubai, metro station display, hospital digital signage, tender LED supplier"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
          { name: 'Government Solutions', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Government LED Display Solutions",
          "name": "Government & Public Sector LED Displays",
          "description": "ISO certified LED display supplier for UAE government projects including airports, metro, hospitals, and smart cities",
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "areaServed": ["Dubai", "Abu Dhabi", "UAE", "GCC"]
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <Breadcrumbs 
          items={[
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Government Solutions', path: null }
          ]} 
          className="text-gray-500" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#050508] to-[#050508]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3)_0%,_transparent_70%)]" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Shield size={16} className="text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">ISO 9001 Certified Government Supplier</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              LED Display Solutions for
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Government & Public Sector
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
              Pre-qualified supplier for UAE government tenders. Trusted by airports, 
              transportation authorities, healthcare facilities, and smart city initiatives.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                data-testid="gov-quote-cta"
              >
                Request Government Quote
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-500">Years in UAE</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-500">Government Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-500">Support Available</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Bar */}
      <section className="py-8 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <cert.icon size={24} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-white">{cert.name}</div>
                  <div className="text-xs text-gray-500">{cert.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Sectors</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Government Sectors We Serve</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized LED display solutions designed for the unique requirements 
              of government and public sector applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOVERNMENT_SECTORS.map((sector, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-blue-500/30 transition-all group"
                data-testid={`gov-sector-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <sector.icon size={24} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{sector.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{sector.desc}</p>
                <div className="space-y-1">
                  {sector.examples.map((ex, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                      <ChevronRight size={12} className="text-blue-400" />
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Government */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Why Brightluxx</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Your Trusted Government LED Partner
              </h2>
              <p className="text-gray-400 mb-8">
                We understand the unique requirements of government procurement — from 
                technical specifications to compliance documentation. Our dedicated 
                government sales team ensures smooth tender submissions and project delivery.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {VALUE_PROPS.map((prop, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white text-sm">{prop.title}</div>
                      <div className="text-xs text-gray-500">{prop.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Download */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-8">
              <h3 className="text-xl font-bold text-white mb-2">Tender Documentation</h3>
              <p className="text-gray-400 text-sm mb-6">
                Download our pre-prepared documentation for your tender submissions.
              </p>
              
              <div className="space-y-3">
                {DOCUMENTS.map((doc, i) => (
                  <a
                    key={i}
                    href="/contact"
                    className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group"
                    data-testid={`gov-doc-${i}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileCheck size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Request <Download size={14} />
                    </div>
                  </a>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Contact us to receive documentation package
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Portfolio</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">Government & Corporate Projects</h2>
              </div>
              <Link to="/case-studies" className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((cs, i) => (
                <Link
                  key={i}
                  to={`/case-studies/${cs.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/5 hover:border-blue-500/30 transition-all"
                  data-testid={`gov-case-study-${cs.slug}`}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={cs.hero_image || cs.images?.[0]} 
                      alt={cs.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-blue-400 mb-1 uppercase tracking-wider">{cs.category}</div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {cs.title}
                    </h3>
                    <div className="text-xs text-gray-500">{cs.client} • {cs.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tender Support CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-blue-800/10 border-y border-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Users size={16} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Dedicated Government Sales Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Support for Your Tender?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our government specialists can help prepare technical specifications, 
            compliance documentation, and competitive pricing for your tender submission.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Contact Government Sales
            </Link>
            <a
              href="tel:+971559954274"
              className="flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
            >
              <Phone size={18} />
              +971 55 995 4274
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <Clock size={14} />
            Response within 24 hours for government inquiries
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Government Procurement FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "Are you registered on UAE government procurement portals?",
                a: "Yes, Brightluxx is registered on major UAE government procurement systems including ADGPG (Abu Dhabi Government Procurement Gate) and federal procurement platforms."
              },
              {
                q: "Can you provide documentation for tender submissions?",
                a: "Absolutely. We provide complete tender documentation packages including company profile, technical specifications, certifications (ISO 9001, CE, RoHS), and past performance references."
              },
              {
                q: "What is your lead time for government projects?",
                a: "Standard products are available within 2-4 weeks. For large-scale or custom projects, we work with your timeline and can expedite delivery when required."
              },
              {
                q: "Do you offer maintenance contracts for government clients?",
                a: "Yes, we offer comprehensive SLA-based maintenance contracts with options for 24/7 support, preventive maintenance, and guaranteed response times."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
