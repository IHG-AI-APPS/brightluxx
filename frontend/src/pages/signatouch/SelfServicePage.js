import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, CreditCard, Smartphone, Receipt, Shield, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const BENEFITS = [
  { icon: Clock, title: 'Reduce Wait Times', desc: '70% faster transactions than traditional counters. Customers complete orders in under 2 minutes.', stat: '70%' },
  { icon: Users, title: 'Labor Optimization', desc: 'Redeploy staff from order-taking to high-value customer service and preparation.', stat: '30%' },
  { icon: CreditCard, title: 'Increase Order Value', desc: 'Upselling prompts and visual menus increase average transaction by 15-25%.', stat: '+22%' },
  { icon: Shield, title: 'Reduce Errors', desc: 'Customer-controlled ordering eliminates miscommunication and reduces order errors.', stat: '95%' },
];

const PAYMENT_OPTIONS = [
  { name: 'NFC Contactless', desc: 'Apple Pay, Google Pay, Samsung Pay', icon: Smartphone },
  { name: 'Card Reader', desc: 'EMV chip, magnetic stripe, tap', icon: CreditCard },
  { name: 'Receipt Printer', desc: 'Thermal 80mm, QR digital receipts', icon: Receipt },
];

const INDUSTRIES = [
  { 
    name: 'Quick Service Restaurants',
    desc: 'Self-ordering kiosks that reduce lines and increase average ticket size.',
    features: ['Menu upselling', 'Order customization', 'Loyalty integration'],
    image: 'https://files.ihgbrands.com/emergent-images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png'
  },
  { 
    name: 'Hotels & Hospitality',
    desc: 'Self check-in/check-out terminals that streamline guest experience.',
    features: ['Room key dispensing', 'Concierge services', 'F&B ordering'],
    image: 'https://files.ihgbrands.com/emergent-images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png'
  },
  { 
    name: 'Healthcare',
    desc: 'Patient check-in and wayfinding that reduces administrative burden.',
    features: ['Appointment check-in', 'Insurance verification', 'Queue management'],
    image: 'https://files.ihgbrands.com/emergent-images/842b07e428fe30f175b67d1d00a180c927813b1d29cef9bed286e5ebb851099f.png'
  },
  { 
    name: 'Retail & Convenience',
    desc: 'Self-checkout and product lookup that enhances shopping efficiency.',
    features: ['Barcode scanning', 'Product information', 'Mobile payment'],
    image: 'https://files.ihgbrands.com/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png'
  },
];

const FAQS = [
  { q: 'What payment methods are supported?', a: 'Our Self-Service Kiosk supports all major payment methods: NFC contactless (Apple Pay, Google Pay, Samsung Pay), EMV chip cards, magnetic stripe, and PIN-based transactions. We can also integrate with your existing POS and payment processor.' },
  { q: 'Can it integrate with our existing POS system?', a: 'Yes. We provide APIs and pre-built integrations for major POS systems including Oracle MICROS, Square, Toast, Lightspeed, and custom solutions. Our team handles the integration as part of the deployment.' },
  { q: 'What happens when the kiosk needs service?', a: 'The kiosk includes remote monitoring that alerts you to issues before customers notice them. Our support team can resolve most issues remotely. For hardware issues, we offer next-business-day on-site service in UAE.' },
  { q: 'How secure are payment transactions?', a: 'All payment processing is PCI-DSS compliant with point-to-point encryption (P2PE). Card data never touches the kiosk OS — it goes directly to the payment processor through the certified terminal.' },
  { q: 'What is the warranty and support?', a: 'Standard 2-year warranty covering all hardware components. Extended warranty and premium support packages available. All kiosks include our remote management platform for software updates and monitoring.' },
];

export default function SelfServicePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="self-service-page">
      <SEO
        title="Self-Service Kiosk — Payment & Ordering Solutions | SignaTouch"
        description="Complete self-service kiosks with NFC payment, card reader, and receipt printer. Reduce wait times by 70% and increase order value by 22%. For QSR, hospitality, healthcare, and retail."
        path="/signatouch/self-service"
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://files.ihgbrands.com/emergent-images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png" 
            alt="Self-Service Kiosk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>

        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/signatouch" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> All SignaTouch Products
            </Link>
          </div>

          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn>
                <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">SignaTouch</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Self-Service Kiosk</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-6">Empower Customers. Optimize Operations.</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 mb-8">
                  Complete self-service solutions with integrated payment, thermal printing, and robust 
                  software. Reduce wait times, increase order values, and free your staff for higher-value tasks.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Quote
                  </Link>
                  <a href="#industries" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    Industry Solutions
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-16 px-6 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit.title || benefit.label} delay={i}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                    <benefit.icon size={20} className="text-amber-400" />
                  </div>
                  <div className="text-3xl font-light text-white mb-1">{benefit.stat}</div>
                  <div className="text-white font-medium text-sm mb-1">{benefit.title}</div>
                  <div className="text-neutral-600 text-xs">{benefit.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Integration */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img 
                src="https://files.ihgbrands.com/emergent-images/1df2bc4f2a39b3b19413f809a4fa3c3011b85f2f0ceca0e3eca9059a71b418bd.png" 
                alt="Payment Integration" 
                className="rounded-sm w-full"
              />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Payment Integration</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Seamless Transactions</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Accept every payment method your customers prefer. Our PCI-DSS compliant payment module 
                integrates with major payment processors and supports the latest contactless technology.
              </p>
              
              <div className="space-y-4 mb-8">
                {PAYMENT_OPTIONS.map((option) => (
                  <div key={option.title} className="flex items-start gap-4 p-4 border border-neutral-800 rounded-sm">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <option.icon size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{option.name}</h3>
                      <p className="text-neutral-500 text-sm">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {['PCI-DSS Compliant', 'P2PE Encryption', 'EMV Certified'].map((cert) => (
                  <span key={cert} className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Check size={12} /> {cert}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Industry Solutions</p>
              <h2 className="text-3xl font-extralight text-white">Tailored for Your Business</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <FadeIn key={industry.title} delay={i + 1}>
                <div className="group border border-neutral-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img src={industry.image} alt={industry.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light text-white mb-2">{industry.name}</h3>
                    <p className="text-neutral-500 text-sm mb-4">{industry.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {industry.features.map((feature, j) => (
                        <span key={j} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p>
              <h2 className="text-3xl font-extralight text-white">Full Specifications</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display & Touch</h3>
                <div className="space-y-3">
                  {[
                    ['Screen Size', '21.5" / 27" / 32"'],
                    ['Resolution', 'FHD (1920x1080)'],
                    ['Touch Type', '10-Point Capacitive'],
                    ['Brightness', '250-350 cd/m²'],
                    ['Panel Type', 'IPS LCD'],
                    ['Orientation', 'Portrait / Landscape'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">System</h3>
                <div className="space-y-3">
                  {[
                    ['Processor', 'Intel i5 / AMD Ryzen 5'],
                    ['Memory', '8GB DDR4'],
                    ['Storage', '256GB SSD'],
                    ['OS', 'Windows 10/11 IoT'],
                    ['Connectivity', 'WiFi 6, Gigabit LAN, 4G'],
                    ['Power', '200W'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Payment Module</h3>
                <div className="space-y-3">
                  {[
                    ['Card Reader', 'EMV Chip + Magnetic'],
                    ['Contactless', 'NFC (ISO 14443)'],
                    ['PIN Pad', 'PCI PTS 5.x Certified'],
                    ['Compliance', 'PCI-DSS, P2PE'],
                    ['Encryption', 'TDES/AES'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Peripherals</h3>
                <div className="space-y-3">
                  {[
                    ['Printer', '80mm Thermal (auto-cut)'],
                    ['Scanner', '1D/2D Barcode'],
                    ['Camera', '2MP (optional)'],
                    ['Enclosure', 'Steel + Tempered Glass'],
                    ['Lock', 'Secure access panel'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
              <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">SignaTouch Family</p>
              <h2 className="text-3xl font-extralight text-white">Explore More Solutions</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/signatouch/touch-kiosk" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png" alt="Touch Screen Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-xs tracking-wider uppercase mb-1">Interactive Engagement</p>
                  <h3 className="text-white text-xl font-light">Touch Screen Kiosk</h3>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/signatouch/smart-signage" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png" alt="Smart Signage Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-xs tracking-wider uppercase mb-1">Dynamic Content</p>
                  <h3 className="text-white text-xl font-light">Smart Signage Kiosk</h3>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-amber-500/5 border-t border-amber-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Operations?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a quote for your self-service kiosk deployment. Volume pricing and custom configurations available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Quote
            </Link>
            <Link to="/signatouch" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
              All Products
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
