import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { LocationFAQ } from '../components/LocationExtras';
import LOCATION_CONTENT from '../data/locationContent.json';
import { 
  ArrowRight, CheckCircle2, MapPin, Phone, MessageCircle, 
  Building2, Star, Shield, Award, Clock, Truck, Wrench,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Trust badges data
const TRUST_BADGES = [
  { icon: Award, label: '15+ Years', sublabel: 'In UAE Market' },
  { icon: Building2, label: '500+', sublabel: 'Projects Delivered' },
  { icon: Star, label: '4.9/5', sublabel: 'Client Rating' },
  { icon: Shield, label: 'ISO 9001', sublabel: 'Certified' },
];

// Service highlights
const SERVICES = [
  { icon: Truck, title: 'Same-Day Delivery', desc: 'Dubai & Abu Dhabi' },
  { icon: Wrench, title: 'Full Installation', desc: 'Turnkey Solutions' },
  { icon: Clock, title: '24/7 Support', desc: 'UAE-Based Team' },
  { icon: Shield, title: '3-Year Warranty', desc: 'Parts & Labor' },
];

// Product categories for Dubai market
const PRODUCT_CATEGORIES = [
  {
    name: 'Indoor LED Screens',
    slug: 'indoor',
    link: '/products?category=indoor',
    desc: 'P0.9 to P4 for retail, corporate, and hospitality',
    image: 'https://files.ihgbrands.com/emergent-images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    features: ['Fine Pitch Options', 'High Refresh Rate', 'Energy Efficient']
  },
  {
    name: 'Outdoor LED Billboards',
    slug: 'outdoor',
    link: '/solutions/outdoor',
    desc: 'Weather-resistant displays for Dubai climate',
    image: 'https://files.ihgbrands.com/emergent-images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    features: ['10,000+ Nits', 'IP65 Rated', 'Heat Resistant']
  },
  {
    name: 'Transparent LED',
    slug: 'transparent',
    link: '/solutions/transparent',
    desc: 'See-through displays for storefronts & facades',
    image: 'https://files.ihgbrands.com/emergent-images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png',
    features: ['85% Transparency', 'Lightweight', 'Easy Install']
  },
  {
    name: 'LED Video Walls',
    slug: 'video-wall',
    link: '/products?category=all-in-one',
    desc: 'Seamless large-format displays for any space',
    image: 'https://files.ihgbrands.com/emergent-images/8581b075158bc90730f45490bd7099982ba35ba2120543a49cc68a94837130a7.png',
    features: ['Seamless Design', 'Modular', 'Any Size']
  },
];

// Dubai-specific case studies
const DUBAI_PROJECTS = [
  { name: 'Dubai Mall', type: 'Retail', size: '200+ sqm' },
  { name: 'DIFC', type: 'Corporate', size: '150 sqm' },
  { name: 'Palm Jumeirah', type: 'Hospitality', size: '300 sqm' },
  { name: 'Dubai Marina', type: 'Outdoor', size: '500 sqm' },
];

export default function LEDScreenDubai() {
  const [caseStudies, setCaseStudies] = useState([]);
  
  useEffect(() => {
    // Fetch Dubai-related case studies
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          // Filter for Dubai/UAE projects
          const dubaiStudies = studies.filter(cs => 
            cs.location?.toLowerCase().includes('dubai') || 
            cs.location?.toLowerCase().includes('uae')
          ).slice(0, 4);
          setCaseStudies(dubaiStudies);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const whatsappNumber = '971559954274';
  const whatsappMessage = "Hi, I'm looking for LED screen suppliers in Dubai. Can you help?";

  return (
    <div className="min-h-screen bg-[#050508] text-white" data-testid="led-screen-dubai-page">
      {/* SEO */}
      <SEO 
        title="LED Screen Suppliers Dubai | #1 LED Display Company UAE"
        description="Leading LED screen suppliers in Dubai. Indoor & outdoor LED displays, video walls, transparent LED. Same-day delivery, professional installation. Call +971 55 995 4274"
        path="/led-screen-suppliers-dubai"
        keywords="LED screen supplier Dubai, LED display Dubai, video wall Dubai, outdoor LED screen Dubai, indoor LED display, LED screen price Dubai, LED billboard UAE"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
          { name: 'LED Screen Suppliers Dubai', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Brightluxx LED Displays Dubai",
          "description": "Leading LED screen suppliers in Dubai offering indoor, outdoor, and transparent LED displays with professional installation.",
          "image": "https://brightluxx.com/assets/brightluxx-logo-512.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Al Quoz Industrial Area 3",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "25.1173",
            "longitude": "55.2222"
          },
          "telephone": "+971559954274",
          "priceRange": "$$$$",
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-14:00"],
          "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "LED Display Products",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Indoor LED Screens"}},
              {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Outdoor LED Billboards"}},
              {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Transparent LED Displays"}}
            ]
          }
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <Breadcrumbs 
          items={[
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'LED Screen Suppliers Dubai', path: null }
          ]} 
          className="text-gray-500" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-[#050508] to-[#050508]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjI4MzMiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* Location Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <MapPin size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Serving Dubai & All UAE</span>
            </motion.div>

            {/* Main Headline - H1 with target keyword */}
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">LED Screen Suppliers</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Dubai</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Premium indoor & outdoor LED displays for retail, corporate, and hospitality. 
              <strong className="text-white"> Same-day delivery in Dubai.</strong>
            </motion.p>

            {/* Trust Indicators */}
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-6 mb-10">
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <badge.icon size={18} className="text-cyan-400" />
                  <div className="text-left">
                    <div className="font-bold text-white">{badge.label}</div>
                    <div className="text-xs text-gray-500">{badge.sublabel}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ background: '#25D366' }}
                data-testid="hero-whatsapp-cta"
              >
                <MessageCircle size={20} />
                WhatsApp Us Now
              </a>
              <a
                href="tel:+971559954274"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border border-white/20 text-white hover:bg-white/5 transition-all"
                data-testid="hero-phone-cta"
              >
                <Phone size={20} />
                +971 55 995 4274
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight size={24} className="text-gray-500 rotate-90" />
        </div>
      </section>

      {/* Services Bar */}
      <section className="py-8 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <service.icon size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{service.title}</div>
                  <div className="text-xs text-gray-500">{service.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Our Products</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">LED Display Solutions for Dubai</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From fine-pitch indoor displays to weather-resistant outdoor billboards, 
              we supply the full range of LED screens for the UAE market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={cat.link || `/solutions/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all"
                data-testid={`product-cat-${cat.slug}`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
                </div>
                <div className="relative p-8">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.features.map((f, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                    View Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-cyan-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Why Brightluxx</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Dubai's Trusted LED Screen Partner
              </h2>
              <div className="space-y-4">
                {[
                  'Local warehouse in Dubai for immediate availability',
                  'Professional installation team based in UAE',
                  'After-sales support with same-day response',
                  'Government-approved supplier (ISO 9001 certified)',
                  'Competitive pricing with flexible payment terms',
                  '3-year warranty on all LED displays'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
                >
                  About Our Company <ArrowRight size={16} />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* Dubai Projects Grid */}
            <div className="grid grid-cols-2 gap-4">
              {DUBAI_PROJECTS.map((project, i) => (
                <div 
                  key={i}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 transition-colors"
                >
                  <div className="text-xs text-cyan-400 font-medium mb-1">{project.type}</div>
                  <div className="font-semibold text-white mb-2">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.size} installed</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      {caseStudies.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Portfolio</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">Recent Projects in Dubai</h2>
              </div>
              <Link to="/case-studies" className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseStudies.map((cs, i) => (
                <Link
                  key={i}
                  to={`/case-studies/${cs.slug}`}
                  className="group relative aspect-square rounded-xl overflow-hidden"
                  data-testid={`dubai-case-study-${cs.slug}`}
                >
                  <img 
                    src={cs.hero_image || cs.images?.[0]} 
                    alt={cs.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-xs text-cyan-400 mb-1">{cs.category}</div>
                    <div className="text-white font-medium text-sm line-clamp-2">{cs.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/20 to-cyan-800/10 border-y border-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote for your LED display project in Dubai. 
            Our team responds within 2 hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={20} />
              Get Quote on WhatsApp
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-gray-100 transition-all"
            >
              Request Formal Quote
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            <Phone size={14} className="inline mr-1" />
            Or call directly: <a href="tel:+971559954274" className="text-cyan-400 hover:underline">+971 55 995 4274</a>
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Learn more about our full <Link to="/dubai" className="text-cyan-400 hover:underline" data-testid="link-to-dubai-page">LED display company services in Dubai</Link> — areas served, regulations and case studies.
          </p>
        </div>
      </section>

      {/* FAQ Schema Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the delivery time for LED screens in Dubai?",
                a: "We offer same-day delivery within Dubai for in-stock items. Custom orders typically take 2-4 weeks including shipping from our manufacturing facilities."
              },
              {
                q: "Do you provide installation services in Dubai?",
                a: "Yes, we provide complete turnkey installation services across Dubai and the UAE. Our local team handles site surveys, installation, and configuration."
              },
              {
                q: "Can you supply LED screens for government projects?",
                a: "Yes, Brightluxx is an ISO 9001 certified supplier approved for government and semi-government projects in the UAE."
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

      <LocationFAQ data={LOCATION_CONTENT["/led-screen-suppliers-dubai"]} accent="cyan" />
    </div>
  );
}
