import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_DATA = [
  {
    category: 'Products & Technology',
    items: [
      { q: 'What LED technologies does Brightluxx offer?', a: 'We offer a complete range: COB MicroLED, MiP, Fine Pitch Indoor, Outdoor SMD, Transparent LED, Creative/Flexible LED, 3D Anamorphic, All-in-One dvLED, Digital Signage, Smart TVs, and Custom LED Shapes. Our catalog includes 72+ products across 23 categories.' },
      { q: 'What is the difference between COB and SMD LED?', a: 'COB (Chip-on-Board) encapsulates LED chips in a protective epoxy layer, making it more durable, anti-glare, and ideal for close viewing. SMD (Surface-Mounted Device) uses individual LED packages — it is more cost-effective for larger pitch outdoor applications. COB offers superior quality; SMD offers better value at larger pitches.' },
      { q: 'How do I choose the right pixel pitch?', a: 'Pixel pitch depends on viewing distance. A general formula: minimum pitch (mm) = viewing distance (m) x 0.6. For example, 3m viewing distance needs P1.8mm. Use our Screen Calculator or Viewing Distance Calculator tool for precise recommendations.' },
      { q: 'Do you offer custom LED shapes?', a: 'Yes! We manufacture custom shapes including round, cube, cone, cylindrical, and wave designs. These are ideal for architectural centerpieces, retail displays, and branded installations.' },
      { q: 'What brightness level do I need?', a: 'Indoor controlled (museum, office): 400-600 nits. Indoor bright (retail, lobby): 800-1,200 nits. Semi-outdoor: 1,500-3,000 nits. Fully outdoor: 5,000-8,000 nits.' },
    ],
  },
  {
    category: 'Pricing & Quotation',
    items: [
      { q: 'How quickly can I get a quotation?', a: 'We provide detailed quotations within 48 hours. For standard products available in stock, quotes can be faster. Please note that installation costs and structural work are quoted separately after a site survey.' },
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
      { q: 'Where is Brightluxx located?', a: 'Our headquarters and warehouse are located at Jebel Ali Industrial Area 1, Dubai, UAE. We also have distribution partners in India.' },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div>
      <SEO title="FAQ — Brightluxx" description="Frequently asked questions about LED displays, pricing, installation, warranty, and more." path="/faq" />

      {/* Hero */}
      <section className="py-16 sm:py-24" data-testid="faq-hero">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">FAQ</div>
            <h1 className="mb-4">Frequently Asked Questions</h1>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider">Everything you need to know about LED displays, our products, and services.</p>
          </div>
          <div className="mt-8 max-w-md relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--blx-muted)] z-10" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-4 text-xs rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] focus:outline-none transition-colors"
              style={{ paddingLeft: '2.5rem' }}
              data-testid="faq-search"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20" data-testid="faq-content">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredData.map((cat) => (
            <div key={cat.category} className="mb-10" data-testid={`faq-category-${cat.category.toLowerCase().replace(/[\s&]/g, '-')}`}>
              <h2 className="text-sm font-bold tracking-widest mb-4 pb-2 border-b border-[var(--blx-border)]">{cat.category}</h2>
              <div className="space-y-2">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={key} className="glass-panel overflow-hidden" data-testid={`faq-item-${key}`}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-4 text-left"
                        data-testid={`faq-toggle-${key}`}
                      >
                        <span className="text-xs font-bold tracking-wider pr-4 flex items-start gap-2">
                          <HelpCircle size={14} className="text-[var(--blx-gold-3)] flex-shrink-0 mt-0.5" />
                          {item.q}
                        </span>
                        {isOpen ? <ChevronUp size={16} className="flex-shrink-0 text-[var(--blx-muted)]" /> : <ChevronDown size={16} className="flex-shrink-0 text-[var(--blx-muted)]" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pl-10">
                          <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="text-center py-16 text-[var(--blx-muted)] text-sm tracking-wider">No questions match your search.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center" data-testid="faq-cta">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="mb-3">Still Have Questions?</h2>
          <p className="text-xs text-[var(--blx-text-2)] mb-6 tracking-wider">Our team is ready to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-3">Contact Us</Link>
            <a href="https://wa.me/971559954274" target="_blank" rel="noopener noreferrer" className="btn-glass px-8 py-3">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
