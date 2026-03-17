import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, TouchpadIcon, Fingerprint, Smartphone, Monitor, Zap, Shield } from 'lucide-react';
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
  { icon: Fingerprint, title: '40-Point IR Touch', desc: 'Industry-leading infrared touch technology supporting up to 40 simultaneous touch points for multi-user interaction.' },
  { icon: Monitor, title: '4K Ultra HD Display', desc: 'Crystal-clear 3840x2160 resolution with 178° viewing angles for stunning visuals from any position.' },
  { icon: Zap, title: 'Rapid Response', desc: '8ms touch response time ensures fluid, lag-free interactions for demanding applications.' },
  { icon: Shield, title: 'Tempered Glass', desc: '7H hardness tempered glass surface resists scratches and withstands heavy daily use.' },
];

const SIZES = [
  { size: '32"', resolution: '1920x1080', touch: '10-Point', ideal: 'Compact spaces, reception desks' },
  { size: '43"', resolution: '3840x2160', touch: '20-Point', ideal: 'Retail, wayfinding, product catalogs' },
  { size: '55"', resolution: '3840x2160', touch: '40-Point', ideal: 'Corporate lobbies, museums, exhibitions' },
  { size: '65"', resolution: '3840x2160', touch: '40-Point', ideal: 'Large venues, immersive experiences' },
  { size: '75"', resolution: '3840x2160', touch: '40-Point', ideal: 'Command centers, collaborative spaces' },
];

const APPLICATIONS = [
  { name: 'Retail Product Discovery', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png' },
  { name: 'Hotel Concierge', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png' },
  { name: 'Museum Interactive', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1da67c3e418012a294b24d90081d04dd38bbfbd8e2b3abf7035f6083d3999a36.png' },
  { name: 'Corporate Directory', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/1df2bc4f2a39b3b19413f809a4fa3c3011b85f2f0ceca0e3eca9059a71b418bd.png' },
];

const FAQS = [
  { q: 'What is the difference between IR and capacitive touch?', a: 'IR (infrared) touch uses a grid of infrared beams to detect touch, supporting gloved hands and any stylus. Capacitive touch requires direct skin contact or special styluses. Our IR technology is more versatile for commercial environments.' },
  { q: 'Can the kiosk work in bright environments?', a: 'Yes. With up to 700 cd/m² brightness and anti-glare coating options, our touch kiosks perform excellently in brightly lit retail spaces, lobbies with large windows, and outdoor-adjacent areas.' },
  { q: 'What software platforms are supported?', a: 'Our touch kiosks come pre-installed with Android 11 or Windows 10/11 Pro. Both support our free Kiosk Management Software for remote content updates, scheduling, and monitoring.' },
  { q: 'How durable is the touch surface?', a: 'The 7H hardness tempered glass withstands over 60 million touches without degradation. It resists scratches from keys, coins, and regular cleaning. We back this with a 2-year warranty on the touch panel.' },
  { q: 'Can I integrate payment systems?', a: 'The Touch Screen Kiosk can be upgraded with our payment module (NFC/Card) to create a complete self-service solution. Contact us for the Self-Service Kiosk bundle.' },
];

export default function TouchKioskPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="touch-kiosk-page">
      <SEO
        title="Touch Screen Kiosk — 40-Point IR Interactive Display | SignaTouch"
        description="Multi-touch interactive kiosks with 40-point IR technology, 4K display, and 8ms response time. Perfect for retail, hospitality, museums, and corporate environments."
        path="/signatouch/touch-kiosk"
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/9d94d952271c1bb0f9424f0cca282170183bd00b8e964f3c78227a01a0fc5402.png" 
            alt="Touch Screen Kiosk" 
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
                <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Touch Screen Kiosk</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-6">Interactive Engagement Redefined</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 mb-8">
                  Multi-touch interactive kiosks with industry-leading 40-point IR touch technology. 
                  Engage customers with responsive, intuitive experiences that drive results.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Quote
                  </Link>
                  <a href="#specs" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    View Specs
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
              { value: '40', unit: '-Point', label: 'IR Touch' },
              { value: '4K', unit: 'UHD', label: 'Resolution' },
              { value: '8ms', unit: '', label: 'Response Time' },
              { value: '700', unit: 'cd/m²', label: 'Brightness' },
            ].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-amber-400">{spec.unit}</span></div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technology</p>
              <h2 className="text-3xl font-extralight text-white">Advanced Touch Technology</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i + 1}>
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

      {/* Size Options */}
      <section id="specs" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Size Options</p>
              <h2 className="text-3xl font-extralight text-white">Choose Your Configuration</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="border border-neutral-800 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/50">
                      <th className="text-left p-4 text-neutral-400 font-medium">Screen Size</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">Resolution</th>
                      <th className="text-center p-4 text-neutral-400 font-medium">Touch Points</th>
                      <th className="text-left p-4 text-neutral-400 font-medium">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZES.map((size, i) => (
                      <tr key={i} className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-900/30 transition-colors">
                        <td className="p-4 text-white font-medium">{size.size}</td>
                        <td className="p-4 text-center text-neutral-300">{size.resolution}</td>
                        <td className="p-4 text-center text-amber-400">{size.touch}</td>
                        <td className="p-4 text-neutral-500">{size.ideal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Applications Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
              <h2 className="text-3xl font-extralight text-white">Engage Your Audience</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative overflow-hidden rounded-sm aspect-[3/4]">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium">{app.name}</h3>
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
              <h2 className="text-3xl font-extralight text-white">Full Specifications</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[
                    ['Panel Type', 'IPS LCD'],
                    ['Resolution', '4K UHD (3840x2160)'],
                    ['Brightness', '500-700 cd/m²'],
                    ['Contrast Ratio', '1200:1'],
                    ['Viewing Angle', '178°/178°'],
                    ['Response Time', '8ms'],
                    ['Color Depth', '1.07 Billion (10-bit)'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="text-white text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Touch & System</h3>
                <div className="space-y-3">
                  {[
                    ['Touch Type', 'Infrared (IR)'],
                    ['Touch Points', 'Up to 40'],
                    ['Touch Response', '8ms'],
                    ['Glass Hardness', '7H Tempered'],
                    ['OS Options', 'Android 11 / Windows 10/11'],
                    ['Connectivity', 'HDMI, USB, LAN, WiFi'],
                    ['Operating Temp', '0°C to 40°C'],
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
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">SignaTouch Family</p>
              <h2 className="text-3xl font-extralight text-white">Explore More Solutions</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/signatouch/smart-signage" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png" alt="Smart Signage Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-xs tracking-wider uppercase mb-1">Dynamic Content</p>
                  <h3 className="text-white text-xl font-light">Smart Signage Kiosk</h3>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/signatouch/self-service" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/e79c0dac3b6330c88d2466f982581e4348ce9ee6bf6058b9f5469df774382bcd.png" alt="Self-Service Kiosk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Engage Your Customers?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a quote for your touch screen kiosk project. Volume discounts available.
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
