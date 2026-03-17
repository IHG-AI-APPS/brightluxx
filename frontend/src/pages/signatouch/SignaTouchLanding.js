import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Monitor, TouchpadIcon, ShoppingCart, Building2, Plane, Stethoscope, Building, UtensilsCrossed } from 'lucide-react';
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

const PRODUCTS = [
  {
    id: 'touch-kiosk',
    name: 'Touch Screen Kiosk',
    tagline: 'Interactive Engagement',
    desc: 'Multi-touch interactive kiosks with IR touch technology for engaging customer experiences.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png',
    specs: { sizes: '30″-77″', touch: '40-Point IR' },
    link: '/signatouch/touch-kiosk',
  },
  {
    id: 'smart-signage',
    name: 'Smart Signage Kiosk',
    tagline: 'Dynamic Content',
    desc: 'Transparent OLED displays with floating imagery effect for premium brand experiences.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png',
    specs: { transparency: '45%', brightness: '600 cd/m²' },
    link: '/signatouch/smart-signage',
  },
  {
    id: 'self-service',
    name: 'Self-Service Kiosk',
    tagline: 'Streamlined Operations',
    desc: 'Complete self-service solutions with payment integration for retail and hospitality.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png',
    specs: { payment: 'NFC/Card', os: 'Android/Windows' },
    link: '/signatouch/self-service',
  },
];

const INDUSTRIES = [
  { name: 'Retail', icon: ShoppingCart, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png' },
  { name: 'Hospitality', icon: Building2, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png' },
  { name: 'Healthcare', icon: Stethoscope, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/842b07e428fe30f175b67d1d00a180c927813b1d29cef9bed286e5ebb851099f.png' },
  { name: 'Corporate', icon: Building, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1df2bc4f2a39b3b19413f809a4fa3c3011b85f2f0ceca0e3eca9059a71b418bd.png' },
  { name: 'Transportation', icon: Plane, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f47cf0d6cc2932b068222b44d2405775e6738934b20f9eda2dd0a4bd4e0a48ff.png' },
  { name: 'F&B', icon: UtensilsCrossed, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png' },
];

const STATS = [
  { value: '63%', label: 'of consumers say digital kiosks grab their attention' },
  { value: '47%', label: 'increase in brand awareness with interactive displays' },
  { value: '29%', label: 'boost in customer spending with self-service kiosks' },
];

const FAQS = [
  { q: 'What screen sizes are available?', a: 'We offer standard commercial-grade options in 30″, 48″, 55″, and 77″. Custom sizes are not available at this time.' },
  { q: 'What color options are available?', a: 'Three standard finishes: Silver Gray, Gold, and Dark Blue. Custom colors available for orders of 10+ units.' },
  { q: 'What is the expected lifespan?', a: 'Each kiosk supports 30,000 to 50,000 hours of use. We recommend up to 18 hours of daily operation for optimal longevity.' },
  { q: 'What operating systems are supported?', a: 'Kiosks come with Android and Windows options. Choose the one that fits your software requirements.' },
  { q: 'Do you offer bulk discounts?', a: 'Yes, we offer volume-based discounts of 10-15% for larger orders. All kiosks include full service and warranty support.' },
];

export default function SignaTouchLanding() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="signatouch-landing">
      <SEO
        title="SignaTouch — Digital Signage Kiosks | Brightluxx UAE"
        description="Interactive digital signage kiosks for retail, hospitality, healthcare, and corporate environments. Touch screen, transparent OLED, and self-service solutions."
        path="/signatouch"
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png" 
            alt="SignaTouch Kiosk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        </div>

        <div className="relative flex flex-col min-h-screen">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Brightluxx
            </Link>
          </div>

          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-20">
            <div className="max-w-2xl">
              <FadeIn>
                <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Digital Signage Solutions</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight mb-4">SignaTouch</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-8">
                  Interactive Kiosks. Elevated Experiences.
                </p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-lg mb-10">
                  Transform customer engagement with intelligent digital signage kiosks. 
                  From transparent OLED displays to self-service solutions, deploy interactive 
                  experiences that drive results.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Quote
                  </Link>
                  <a href="#products" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    View Products
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-neutral-800 bg-amber-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-4xl font-light text-amber-400 mb-2">{stat.value}</div>
                <div className="text-neutral-500 text-sm">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Range</p>
              <h2 className="text-4xl font-extralight text-white">Choose Your Solution</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.id} delay={i + 1}>
                <div className="group bg-neutral-900/30 border border-neutral-800 rounded-sm overflow-hidden hover:border-amber-500/30 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-amber-400 text-xs tracking-wider uppercase mb-2">{product.tagline}</p>
                    <h3 className="text-xl font-light text-white mb-3">{product.name}</h3>
                    <p className="text-neutral-500 text-sm mb-4">{product.desc}</p>
                    <div className="flex gap-4 mb-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-white font-medium text-sm">{value}</div>
                          <div className="text-neutral-600 text-[10px] uppercase">{key}</div>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="text-white text-sm font-medium inline-flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                      Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
              <h2 className="text-4xl font-extralight text-white">Solutions for Every Industry</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((industry, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative overflow-hidden rounded-sm aspect-square">
                  <img src={industry.image} alt={industry.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <industry.icon size={24} className="text-amber-400 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">{industry.name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1da67c3e418012a294b24d90081d04dd38bbfbd8e2b3abf7035f6083d3999a36.png" 
                alt="Interactive Kiosk" 
                className="rounded-sm w-full"
              />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technology</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Enterprise-Grade Performance</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Built for demanding commercial environments with high transparency, low latency, 
                and strong anti-interference capability. Designed for up to 18 hours of daily operation.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: '178°', label: 'Viewing Angle' },
                  { value: '600', label: 'Brightness (cd/m²)' },
                  { value: '45%', label: 'Transparency' },
                  { value: '150,000:1', label: 'Contrast Ratio' },
                ].map((spec, i) => (
                  <div key={i}>
                    <div className="text-2xl font-light text-white">{spec.value}</div>
                    <div className="text-neutral-600 text-xs uppercase">{spec.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {['1-Year Warranty with S/N verification', 'Android & Windows OS options', 'HDMI high-resolution support', 'Custom 9630 motherboard for stability'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check size={16} className="text-amber-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Available Sizes</p>
              <h2 className="text-3xl font-extralight text-white">Standard Commercial Options</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="grid grid-cols-4 gap-4">
              {['30″', '48″', '55″', '77″'].map((size, i) => (
                <div key={i} className="border border-neutral-800 rounded-sm p-6 text-center hover:border-amber-500/30 transition-colors">
                  <div className="text-3xl font-light text-white mb-1">{size}</div>
                  <div className="text-neutral-600 text-xs uppercase">Screen Size</div>
                </div>
              ))}
            </div>
            <p className="text-center text-neutral-500 text-sm mt-6">
              Color options: Silver Gray, Gold, Dark Blue. Custom colors available for 10+ unit orders.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
              <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
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
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">Other Product Lines</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/lumimorph" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="/artmorph-assets/grande-hero.jpg" alt="LumiMorph" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-cyan-400 text-xs tracking-wider uppercase mb-1">Textured Luminous Panels</p>
                  <h3 className="text-white text-xl font-light">LumiMorph</h3>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/naturatex" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png" alt="NaturaTex" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-emerald-400 text-xs tracking-wider uppercase mb-1">Texture Screen Technology</p>
                  <h3 className="text-white text-xl font-light">NaturaTex</h3>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Deploy Interactive Kiosks?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a quote for your digital signage project. Bulk discounts available for larger deployments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Quote
            </Link>
            <Link to="/case-studies" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
              View Projects
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
