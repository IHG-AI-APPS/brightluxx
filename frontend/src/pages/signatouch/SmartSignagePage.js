import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Eye, Sparkles, Layers, Palette, Lightbulb, Monitor } from 'lucide-react';
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

const FEATURES = [
  { icon: Eye, title: '45% Transparency', desc: 'See-through display technology creates a floating holographic effect while maintaining full visibility of products behind.' },
  { icon: Sparkles, title: 'OLED Technology', desc: 'Self-emissive pixels deliver perfect blacks, infinite contrast, and vibrant colors without backlight bleed.' },
  { icon: Layers, title: 'Slim Profile', desc: 'Ultra-thin 5.7mm panel depth allows seamless integration into display cases, windows, and architectural elements.' },
  { icon: Palette, title: 'Wide Color Gamut', desc: '99% DCI-P3 coverage ensures accurate brand colors and stunning visual fidelity for premium content.' },
];

const USE_CASES = [
  { 
    title: 'Luxury Retail',
    desc: 'Overlay product information and brand stories on physical merchandise displays.',
    image: 'https://files.ihgbrands.com/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png',
    stats: ['60% increase in dwell time', 'Premium brand perception']
  },
  { 
    title: 'Museum Exhibits',
    desc: 'Add interactive information layers to artifacts without obstructing views.',
    image: 'https://files.ihgbrands.com/emergent-images/1da67c3e418012a294b24d90081d04dd38bbfbd8e2b3abf7035f6083d3999a36.png',
    stats: ['Enhanced visitor engagement', 'Preserve artifact visibility']
  },
  { 
    title: 'Automotive Showrooms',
    desc: 'Display vehicle specs and customization options alongside physical models.',
    image: 'https://files.ihgbrands.com/emergent-images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png',
    stats: ['Interactive configuration', 'Futuristic brand image']
  },
];

const FAQS = [
  { q: 'How does the transparent display work?', a: 'The Smart Signage Kiosk uses transparent OLED technology where each pixel emits its own light. When a pixel is "off" (displaying black), it becomes fully transparent, allowing you to see through to whatever is behind the display.' },
  { q: 'What content works best on transparent displays?', a: 'Content with dark/black backgrounds works best as black pixels become transparent. Text, graphics, and video with transparent backgrounds create the stunning "floating imagery" effect. We provide content guidelines and templates.' },
  { q: 'Can it be used in bright environments?', a: 'With 600 cd/m² brightness, the display is suitable for most indoor retail environments. For very bright areas with direct sunlight, we recommend positioning away from windows or using our high-brightness variant (1000 cd/m²).' },
  { q: 'What sizes are available?', a: 'Standard sizes include 55" and 65" panels. Multiple panels can be combined for larger installations. Custom sizes may be available for large-volume projects.' },
  { q: 'How is content managed?', a: 'Includes our SignaControl CMS for remote content management, scheduling, and real-time updates. Supports HDMI input for live feeds and integrates with most digital signage platforms.' },
];

export default function SmartSignagePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="smart-signage-page">
      <SEO
        title="Smart Signage Kiosk — Transparent OLED Display | SignaTouch"
        description="Transparent OLED displays with 45% transparency and 600 cd/m² brightness. Create floating holographic experiences for luxury retail, museums, and premium brand activations."
        path="/signatouch/smart-signage"
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://files.ihgbrands.com/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png" 
            alt="Smart Signage Kiosk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/signatouch" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> All SignaTouch Products
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6 py-16">
            <div className="max-w-2xl">
              <FadeIn>
                <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">SignaTouch</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Smart Signage Kiosk</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-6">Floating Imagery. Premium Impact.</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 mb-8">
                  Transparent OLED technology creates stunning holographic displays where digital content 
                  appears to float in mid-air. Perfect for luxury retail and premium brand experiences.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Demo
                  </Link>
                  <a href="#use-cases" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    See Use Cases
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

      {/* Quick Specs */}
      <section className="py-12 px-6 border-b border-neutral-800 bg-amber-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '45%', unit: '', label: 'Transparency' },
              { value: '600', unit: 'cd/m²', label: 'Brightness' },
              { value: '5.7', unit: 'mm', label: 'Panel Depth' },
              { value: '∞:1', unit: '', label: 'Contrast Ratio' },
            ].map((spec) => (
              <FadeIn key={spec.label} delay={0}>
                <div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-amber-400">{spec.unit}</span></div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">The Technology</p>
              <h2 className="text-3xl font-extralight text-white leading-tight mb-6">
                See Through to a New Reality
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Unlike traditional displays that block what's behind them, transparent OLED allows viewers to see 
                physical objects while digital content overlays the view. This creates an unprecedented "mixed reality" 
                experience without headsets or special equipment.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                When pixels display black, they become completely transparent. When they display color, 
                they appear to float in space. The result is magical — digital information that enhances 
                rather than replaces the physical world.
              </p>
              <div className="space-y-3">
                {['Perfect for product showcases', 'No special glasses required', 'Works with existing display cases', 'Remote content management included'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check size={16} className="text-amber-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={1}>
              <img 
                src="https://files.ihgbrands.com/emergent-images/842b07e428fe30f175b67d1d00a180c927813b1d29cef9bed286e5ebb851099f.png" 
                alt="Transparent OLED Technology" 
                className="rounded-sm w-full"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Advantages</p>
              <h2 className="text-3xl font-extralight text-white">Why Transparent OLED</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <FadeIn key={feature.title}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={24} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
              <h2 className="text-3xl font-extralight text-white">Transform Any Space</h2>
            </div>
          </FadeIn>

          <div className="space-y-16">
            {USE_CASES.map((useCase, i) => (
              <FadeIn key={feature.title}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <img src={useCase.image} alt={useCase.title} className="rounded-sm w-full" />
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="text-2xl font-light text-white mb-4">{useCase.title}</h3>
                    <p className="text-neutral-400 mb-6">{useCase.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {useCase.stats.map((stat, j) => (
                        <span key={j} className="bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm">
                          {stat}
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
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p>
              <h2 className="text-3xl font-extralight text-white">Specifications</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[
                    ['Panel Type', 'Transparent OLED'],
                    ['Resolution', 'FHD (1920x1080)'],
                    ['Transparency', '45%'],
                    ['Brightness', '600 cd/m²'],
                    ['Contrast Ratio', 'Infinite (OLED)'],
                    ['Color Gamut', '99% DCI-P3'],
                    ['Viewing Angle', '178°/178°'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical & System</h3>
                <div className="space-y-3">
                  {[
                    ['Panel Depth', '5.7mm'],
                    ['Available Sizes', '55", 65"'],
                    ['Frame', 'Minimal bezel aluminum'],
                    ['Mounting', 'Wall, ceiling, floor stand'],
                    ['Media Player', 'Built-in Android'],
                    ['Connectivity', 'HDMI 2.0, USB, WiFi, LAN'],
                    ['Power', '150W typical'],
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
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
              <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={feature.title}>
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
              <Link to="/signatouch/self-service" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png" alt="Self-Service Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-xs tracking-wider uppercase mb-1">Streamlined Operations</p>
                  <h3 className="text-white text-xl font-light">Self-Service Kiosk</h3>
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
          <h2 className="text-3xl font-extralight text-white mb-6">Create Unforgettable Experiences</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo to see transparent OLED in action. Our team will help design the perfect solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Demo
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
