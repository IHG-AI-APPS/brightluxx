import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true, isDark = true, ...props }) => (
  <div 
    className={`
      backdrop-blur-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/80'} border ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'} rounded-lg
      ${hover ? `hover:${isDark ? 'bg-white/[0.06]' : 'bg-white'} hover:border-cyan-500/30` : ''}
      transition-all duration-500 ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

const FAQ_DATA = [
  {
    category: 'Products & Technology',
    items: [
      { q: 'What LED technologies does Brightluxx offer?', a: 'We offer a complete range: COB MicroLED, MiP, Fine Pitch Indoor, Outdoor SMD, Transparent LED, Creative/Flexible LED, 3D Anamorphic, All-in-One dvLED, Digital Signage, Smart TVs, and Custom LED Shapes. Our catalog includes 90+ products across 23 categories.' },
      { q: 'What is the difference between COB and SMD LED?', a: 'COB (Chip-on-Board) encapsulates LED chips in a protective epoxy layer, making it more durable, anti-glare, and ideal for close viewing. SMD (Surface-Mounted Device) uses individual LED packages — it is more cost-effective for larger pitch outdoor applications. COB offers superior quality; SMD offers better value at larger pitches.' },
      { q: 'How do I choose the right pixel pitch?', a: 'Pixel pitch depends on viewing distance. A general formula: minimum pitch (mm) = viewing distance (m) x 0.6. For example, 3m viewing distance needs P1.8mm. Use our Screen Calculator or Viewing Distance Calculator tool for precise recommendations.' },
      { q: 'Do you offer custom LED shapes?', a: 'Yes! We manufacture custom shapes including round, cube, cone, cylindrical, and wave designs. These are ideal for architectural centerpieces, retail displays, and branded installations.' },
      { q: 'What brightness level do I need?', a: 'Indoor controlled (museum, office): 400-600 nits. Indoor bright (retail, lobby): 800-1,200 nits. Semi-outdoor: 1,500-3,000 nits. Fully outdoor: 5,000-10,000 nits.' },
    ],
  },
  {
    category: 'Pricing & Quotation',
    items: [
      { q: 'How quickly can I get a quotation?', a: 'We provide detailed quotations within 2 hours during business hours. For standard products available in stock, quotes can be faster. Please note that installation costs and structural work are quoted separately after a site survey.' },
      { q: 'What is the approximate cost per square meter?', a: 'Costs vary by technology: P0.9 COB starts from AED 22,000/sqm, P1.5 from AED 6,500/sqm, P2.5 from AED 3,000/sqm, and outdoor P10 from AED 650/sqm. Use our Budget Estimator for accurate project-level estimates.' },
      { q: 'Does the quotation include installation?', a: 'Standard quotations cover hardware only. Installation, structural work, and commissioning are quoted separately after confirming site conditions, material availability, and risk assessment.' },
      { q: 'Do you offer financing or payment plans?', a: 'Yes, we offer flexible payment terms for projects. Typically: 30% advance, 60% before delivery, 10% after commissioning. Contact our sales team for project-specific arrangements.' },
    ],
  },
  {
    category: 'Installation & Support',
    items: [
      { q: 'Do you provide installation services?', a: 'Yes. We offer professional installation with certified technicians. This includes structural assessment, precision mounting, pixel calibration, content system setup, and operator training.' },
      { q: 'What warranty do you offer?', a: 'Standard 3-year warranty covering manufacturing defects and module failures. Extended warranty up to 5 years is available. Warranty covers free replacement of defective modules and components.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes, we offer preventive maintenance contracts including scheduled cleaning, calibration, firmware updates, and priority support. Maintenance plans start from AED 500/month depending on display size.' },
      { q: 'Is 24/7 technical support available?', a: 'Yes! Our support center operates 24/7 via phone and WhatsApp. We offer remote diagnostics and same-day on-site support within the UAE for contract clients.' },
      { q: 'Do you provide training?', a: 'Every installation includes operator training. We also offer CPD (Continuing Professional Development) sessions for architects and consultants through our Lunch & Learn programme.' },
    ],
  },
  {
    category: 'Delivery & Logistics',
    items: [
      { q: 'What is the typical delivery time?', a: 'For products in our Dubai warehouse: same-week delivery. For custom orders: 4-6 weeks from order confirmation. Express options available for urgent projects.' },
      { q: 'Do you deliver outside the UAE?', a: 'Yes, we deliver across the entire GCC (Saudi Arabia, Qatar, Bahrain, Oman, Kuwait) and MENA region. We handle customs clearance and project logistics.' },
      { q: 'Do you have stock available in Dubai?', a: 'Yes, we maintain over 2,000 sqm of LED displays in our Jebel Ali warehouse. Popular sizes and pixel pitches are available for immediate delivery.' },
    ],
  },
  {
    category: 'Company & Partnership',
    items: [
      { q: 'How long has Brightluxx been in business?', a: 'Brightluxx has been operating since 2005 — nearly 20 years of LED display expertise. We have completed 800+ projects and installed 1,500+ screens across the UAE and GCC.' },
      { q: 'Can I become a distributor or franchise partner?', a: 'Yes! We are actively expanding our distribution network. Visit our Distribution & Partners page to submit a franchise or distribution application.' },
      { q: 'Do you accept supplier registrations?', a: 'Yes. If you are a supplier of LED components, accessories, or related services, you can register through our Supplier Registration page.' },
      { q: 'Where is Brightluxx located?', a: 'Our headquarters and warehouse are located at Jebel Ali Industrial Area 1, Dubai, UAE. We also have distribution partners across the GCC region.' },
    ],
  },
];

export default function FAQ() {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme-aware classes
  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const inputBg = isDark ? 'bg-white/5' : 'bg-white';
  const inputBorder = isDark ? 'border-white/10' : 'border-neutral-300';
  const inputText = isDark ? 'text-white' : 'text-neutral-900';
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-neutral-200';

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = FAQ_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      !searchQuery ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  // Generate FAQ Schema with all questions
  const allFaqItems = FAQ_DATA.flatMap(cat => cat.items);
  const faqSchema = generateFAQSchema(allFaqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' }
  ]);

  return (
    <div className={`${pageBg} transition-colors duration-500`}>
      <SEO 
        title="FAQ — Frequently Asked Questions | Brightluxx LED Displays" 
        description="Frequently asked questions about LED displays, pricing, installation, warranty, and more. Get answers from UAE's leading LED display provider." 
        path="/faq"
        jsonLd={[faqSchema, breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden" data-testid="faq-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className={`absolute top-1/4 right-0 w-[400px] h-[400px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">FAQ</span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95] ${textPrimary}`}>
              Frequently Asked
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Questions
              </span>
            </h1>
            <p className={`${textSecondary} text-base md:text-lg max-w-xl tracking-wide leading-relaxed mb-10`}>
              Everything you need to know about LED displays, our products, and services.
            </p>
            
            {/* Search */}
            <div className="max-w-md relative">
              <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMuted}`} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full py-4 pr-4 text-sm blx-search-input ${inputBg} border ${inputBorder} focus:border-cyan-500/50 ${inputText} placeholder:${textMuted} outline-none transition-colors rounded-lg`}
                data-testid="faq-search"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-24" data-testid="faq-content">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24">
          {filteredData.map((cat, catIdx) => (
            <FadeInSection key={cat.category} delay={catIdx} className="mb-12">
              <div data-testid={`faq-category-${cat.category.toLowerCase().replace(/[\s&]/g, '-')}`}>
                <h2 className={`text-lg font-bold uppercase tracking-wide mb-6 pb-3 border-b ${borderColor} flex items-center gap-3`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                    {cat.category}
                  </span>
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, i) => {
                    const key = `${cat.category}-${i}`;
                    const isOpen = openItems[key];
                    return (
                      <GlassCard 
                        key={key} 
                        className="overflow-hidden" 
                        hover={false}
                        isDark={isDark}
                        data-testid={`faq-item-${key}`}
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-start justify-between p-5 text-left group"
                          data-testid={`faq-toggle-${key}`}
                        >
                          <span className={`text-sm font-bold tracking-wide pr-6 flex items-start gap-3 group-hover:text-cyan-400 transition-colors ${textPrimary}`}>
                            <HelpCircle size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="normal-case">{item.q}</span>
                          </span>
                          <div className={`w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-cyan-500/20' : ''}`}>
                            {isOpen ? (
                              <ChevronUp size={18} className="text-cyan-400" />
                            ) : (
                              <ChevronDown size={18} className={textMuted} />
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-5 pb-5 pl-14">
                                <p className={`text-sm ${textSecondary} leading-relaxed tracking-wide normal-case`}>
                                  {item.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </FadeInSection>
          ))}
          
          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <HelpCircle size={48} className={`mx-auto ${textMuted} mb-4`} />
              <p className={`${textMuted} tracking-wide`}>No questions match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" data-testid="faq-cta">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-[120px]`} />
        
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <GlassCard className="p-10 lg:p-16 text-center" hover={false} isDark={isDark}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Still Have Questions?
              </span>
              <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 ${textPrimary}`}>
                Our Team is Ready
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                  to Help
                </span>
              </h2>
              <p className={`${textSecondary} text-sm mb-10 tracking-wide max-w-md mx-auto`}>
                Get personalized answers from our LED display specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center justify-center gap-2"
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
                <a 
                  href="https://wa.me/971559954274" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${isDark ? 'bg-white/5' : 'bg-neutral-900/5'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-neutral-300'} hover:border-cyan-500/30 ${textPrimary} font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center justify-center gap-2`}
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
