import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, XCircle, Shield, Clock, MapPin, Truck, 
  HeadphonesIcon, Award, Building2, Globe, Wrench, 
  Phone, MessageCircle, ChevronDown, ChevronUp,
  Star, Zap, Users, Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

// FadeInSection animation component
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Competitor data
const COMPETITORS = [
  {
    id: 'unilumin',
    name: 'Unilumin',
    origin: 'China (Shenzhen)',
    founded: '2004',
    speciality: 'MicroLED, COB, Fine Pitch',
    presence: 'Through distributors (Amaze Technologies)',
    leadTime: '4-8 weeks',
    support: 'Distributor-dependent',
    warranty: '2-3 years standard',
    minOrder: 'High MOQ typically',
    localStock: false,
    localSupport: false,
    arabicSupport: false,
    sameDay: false,
    products: ['UMini W Series (P0.7-P1.8)', 'Unatural Texture LED', 'UTV All-in-One', 'U-Shield Rental'],
    strengths: ['Strong R&D', 'Premium quality', 'Wide product range'],
    weaknesses: ['Long lead times', 'Distributor markup', 'Limited local support']
  },
  {
    id: 'absen',
    name: 'Absen',
    origin: 'China (Shenzhen)',
    founded: '2001',
    speciality: 'Rental, Corporate, Outdoor',
    presence: 'Through regional partners',
    leadTime: '4-8 weeks',
    support: 'Partner-dependent',
    warranty: '2-3 years standard',
    minOrder: 'Project-based',
    localStock: false,
    localSupport: false,
    arabicSupport: false,
    sameDay: false,
    products: ['KLCOB V2 (Control Room)', 'Absenicon X (Corporate)', 'A25 Series (Outdoor)', 'Neptune Pro (Rental)'],
    strengths: ['Award-winning designs', 'Energy efficient', 'Good brand recognition'],
    weaknesses: ['Premium pricing', 'Import delays', 'No local inventory']
  },
  {
    id: 'liantronics',
    name: 'Liantronics',
    origin: 'China (Shenzhen)',
    founded: '2003',
    speciality: 'Creative, Rental, Commercial',
    presence: 'Through distributors',
    leadTime: '4-8 weeks',
    support: 'Distributor-dependent',
    warranty: '2-3 years standard',
    minOrder: 'Varies by product',
    localStock: false,
    localSupport: false,
    arabicSupport: false,
    sameDay: false,
    products: ['BIM Plus Series', 'E-Swan Creative', 'MPA Pro II Outdoor', 'COB 0.9 Studio'],
    strengths: ['Creative shapes', 'Dual-sided displays', 'Competitive pricing'],
    weaknesses: ['Less brand awareness UAE', 'Limited local presence', 'Import complexity']
  }
];

const BRIGHTLUXX_ADVANTAGES = [
  {
    icon: MapPin,
    title: 'UAE Headquarters',
    desc: 'Based in Dubai since 2005. Direct local entity, not a distributor.',
    detail: 'Al Quoz Industrial Area 3, Dubai — visit our showroom anytime'
  },
  {
    icon: Package,
    title: 'Local Stock',
    desc: 'Ready inventory in Dubai warehouse for immediate availability.',
    detail: 'Popular models P1.5-P10 always in stock, no import wait times'
  },
  {
    icon: Truck,
    title: 'Same-Day Delivery',
    desc: 'Emergency stock available for urgent project requirements.',
    detail: 'Dubai delivery within 4 hours, UAE-wide within 24 hours'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Local Support',
    desc: 'Direct technical team in UAE, not overseas call centers.',
    detail: 'Arabic & English support, WhatsApp response in minutes'
  },
  {
    icon: Wrench,
    title: 'On-Site Installation',
    desc: 'Our own certified engineers, not subcontractors.',
    detail: '500+ successful installations across UAE & GCC'
  },
  {
    icon: Shield,
    title: 'ISO 9001 Certified',
    desc: 'Quality management system certified operations.',
    detail: 'Full traceability, documented processes, warranty backed locally'
  }
];

const COMPARISON_TABLE = [
  { feature: 'UAE Local Entity', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Dubai Warehouse Stock', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Same-Day Delivery', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: '24/7 Local Support', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Arabic Language Support', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'In-House Installation Team', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Direct Warranty (No Middleman)', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Showroom Visit Available', brightluxx: true, unilumin: false, absen: false, liantronics: false },
  { feature: 'Government Tender Experience', brightluxx: true, unilumin: true, absen: true, liantronics: true },
  { feature: 'MicroLED Technology', brightluxx: true, unilumin: true, absen: true, liantronics: true },
  { feature: 'COB Technology', brightluxx: true, unilumin: true, absen: true, liantronics: true },
  { feature: 'Custom Shapes', brightluxx: true, unilumin: true, absen: true, liantronics: true },
  { feature: 'Transparent LED', brightluxx: true, unilumin: true, absen: true, liantronics: true }
];

const FAQS = [
  {
    q: 'Why choose a local supplier over international brands?',
    a: 'International brands like Unilumin and Absen manufacture excellent products, but purchasing through distributors adds markup, delays, and support complexity. With Brightluxx, you get direct pricing, immediate stock access, local warranty service, and a team that can be on-site within hours — not weeks.'
  },
  {
    q: 'How does Brightluxx pricing compare to Unilumin or Absen?',
    a: 'Our pricing is typically 15-25% lower than international brands sold through UAE distributors, because we eliminate the middleman markup. We also offer flexible payment terms and free site surveys, which distributors rarely provide.'
  },
  {
    q: 'Can Brightluxx match the technical specifications of premium brands?',
    a: 'Yes. We offer the same core technologies (MicroLED, COB, Fine Pitch P0.7+) with comparable specifications. Our LumiMorph texture displays rival Unilumin\'s Unatural series, and our GlassMorph transparent LED matches Absen\'s transparency solutions — all with local support advantage.'
  },
  {
    q: 'What about warranty and after-sales for international brands?',
    a: 'International brand warranties often require shipping defective parts overseas, taking 4-8 weeks for resolution. Brightluxx provides on-site warranty service within 24-48 hours in the UAE, with spare parts always in local stock.'
  },
  {
    q: 'Do government projects accept Brightluxx as an approved supplier?',
    a: 'Yes. Brightluxx is registered with Dubai Municipality, Abu Dhabi DED, and multiple government procurement systems. We have completed projects for RTA, DEWA, Dubai Police, and various federal entities with full compliance documentation.'
  }
];

export default function CompareCompetitors() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedCompetitor, setExpandedCompetitor] = useState(null);

  return (
    <div className="min-h-screen bg-[#050508]" data-testid="compare-competitors-page">
      <SEO 
        title="Brightluxx vs Unilumin vs Absen | LED Display Comparison UAE"
        description="Compare Brightluxx with international LED brands like Unilumin, Absen, and Liantronics. Local UAE supplier advantages: same-day delivery, 24/7 support, no import delays."
        path="/compare-brands"
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInSection>
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              Honest Comparison
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              BRIGHTLUXX VS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                INTERNATIONAL BRANDS
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Considering Unilumin, Absen, or Liantronics? Here's an honest comparison 
              of what you get with a local UAE supplier versus importing through distributors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent('Hi, I\'d like to compare LED display options for my project')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-medium transition-all"
                data-testid="hero-whatsapp-cta"
              >
                <MessageCircle className="w-5 h-5" />
                Get Comparison Quote
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all"
              >
                <Phone className="w-5 h-5" />
                Speak to Expert
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              FEATURE COMPARISON
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              See how Brightluxx stacks up against international competitors on the factors that matter most for UAE projects.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="comparison-table">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-cyan-400 font-bold">Brightluxx</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Unilumin</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Absen</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Liantronics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_TABLE.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-white">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {row.brightluxx ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.unilumin ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.absen ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.liantronics ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Brightluxx Advantages */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              THE LOCAL ADVANTAGE
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              Why architects and contractors across UAE choose Brightluxx over imported alternatives.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRIGHTLUXX_ADVANTAGES.map((adv, idx) => (
              <FadeInSection key={idx} delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                    <adv.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{adv.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{adv.desc}</p>
                  <p className="text-cyan-400/70 text-xs">{adv.detail}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Cards */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              COMPETITOR OVERVIEW
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              Objective breakdown of what each international brand offers — and what they don't.
            </p>
          </FadeInSection>

          <div className="space-y-4">
            {COMPETITORS.map((comp, idx) => (
              <FadeInSection key={comp.id} delay={idx * 0.1}>
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                  <button
                    onClick={() => setExpandedCompetitor(expandedCompetitor === comp.id ? null : comp.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    data-testid={`competitor-${comp.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
                        <p className="text-sm text-gray-400">{comp.origin} • Founded {comp.founded}</p>
                      </div>
                    </div>
                    {expandedCompetitor === comp.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedCompetitor === comp.id && (
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Speciality</p>
                          <p className="text-sm text-white">{comp.speciality}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">UAE Presence</p>
                          <p className="text-sm text-white">{comp.presence}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Lead Time</p>
                          <p className="text-sm text-white">{comp.leadTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Warranty</p>
                          <p className="text-sm text-white">{comp.warranty}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-2">Key Products</p>
                          <ul className="space-y-1">
                            {comp.products.map((p, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gray-500" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-green-400 uppercase mb-2">Strengths</p>
                          <ul className="space-y-1">
                            {comp.strengths.map((s, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-amber-400 uppercase mb-2">Limitations (UAE)</p>
                          <ul className="space-y-1">
                            {comp.weaknesses.map((w, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                <XCircle className="w-3 h-3 text-amber-400" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Product Equivalents */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              BRIGHTLUXX EQUIVALENTS
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              Looking for a specific international product? Here's what Brightluxx offers as a locally-supported alternative.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="equivalents-table">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">International Product</th>
                    <th className="text-left py-4 px-4 text-cyan-400 font-bold">Brightluxx Equivalent</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Key Specs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Unilumin Unatural (Texture LED)</td>
                    <td className="py-4 px-4">
                      <Link to="/lumimorph" className="text-cyan-400 hover:text-cyan-300">LumiMorph Elite/Grande</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">P2.6-P6.2, 200+ textures, magnetic mount</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Unilumin UMini W (Fine Pitch)</td>
                    <td className="py-4 px-4">
                      <Link to="/products?category=cob-microled" className="text-cyan-400 hover:text-cyan-300">COB MicroLED Series</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">P0.7-P1.8, COB technology, 100,000hrs</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Absen KLCOB (Control Room)</td>
                    <td className="py-4 px-4">
                      <Link to="/products?category=cob-microled" className="text-cyan-400 hover:text-cyan-300">COB Control Room Series</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">24/7 rated, 15,000:1 contrast, low latency</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Absen A25 (Outdoor DOOH)</td>
                    <td className="py-4 px-4">
                      <Link to="/products?category=outdoor" className="text-cyan-400 hover:text-cyan-300">Outdoor Pro Series</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">P4-P10, 10,000 nits, IP65, energy efficient</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Liantronics BIM Plus-T (Transparent)</td>
                    <td className="py-4 px-4">
                      <Link to="/glassmorph" className="text-cyan-400 hover:text-cyan-300">GlassMorph LED Film</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">95% transparency, 2mm thin, retrofit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">Liantronics E-Swan (Creative)</td>
                    <td className="py-4 px-4">
                      <Link to="/pixelvue/creative-shapes" className="text-cyan-400 hover:text-cyan-300">PixelVue Creative Shapes</Link>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">Spheres, cubes, letters, custom geometry</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </FadeInSection>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <FadeInSection key={idx} delay={idx * 0.05}>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    data-testid={`faq-${idx}`}
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              READY TO COMPARE QUOTES?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Send us your project requirements and we'll provide a detailed comparison 
              showing how Brightluxx delivers better value with local advantages.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent('Hi, I\'d like a comparison quote for LED displays. I\'m currently considering [brand name].')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black rounded-full font-semibold transition-all shadow-lg shadow-cyan-500/25"
                data-testid="cta-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                Get Comparison Quote
              </a>
              <Link
                to="/tools/roi-calculator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all"
              >
                <Zap className="w-5 h-5" />
                Calculate ROI
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
