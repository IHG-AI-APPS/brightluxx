import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, MessageCircle, Zap, Ruler, Monitor, Building, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', accent = false }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border rounded-xl overflow-hidden
    ${accent ? 'border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.08)]' : 'border-white/[0.08]'}
    ${className}
  `}>
    {children}
  </div>
);

const PITCH_DATA = [
  { label: 'P0.9', pitch: 0.9, low: 22000, high: 40000, tech: 'COB/MiP', powerW: 250 },
  { label: 'P1.2', pitch: 1.2, low: 10000, high: 22000, tech: 'COB/MiP', powerW: 250 },
  { label: 'P1.5', pitch: 1.5, low: 6500, high: 14000, tech: 'MiP/SMD', powerW: 250 },
  { label: 'P1.9', pitch: 1.9, low: 4500, high: 9500, tech: 'MiP/SMD', powerW: 300 },
  { label: 'P2.5', pitch: 2.5, low: 3000, high: 7000, tech: 'SMD', powerW: 350 },
  { label: 'P3.9', pitch: 3.9, low: 2000, high: 5000, tech: 'SMD', powerW: 350 },
  { label: 'P4.8', pitch: 4.8, low: 1500, high: 4000, tech: 'SMD outdoor', powerW: 600 },
  { label: 'P6', pitch: 6.0, low: 1200, high: 3000, tech: 'SMD outdoor', powerW: 700 },
  { label: 'P8', pitch: 8.0, low: 900, high: 2200, tech: 'SMD outdoor', powerW: 750 },
  { label: 'P10', pitch: 10.0, low: 650, high: 1800, tech: 'SMD outdoor', powerW: 800 },
];

const FAQS = [
  { q: "How accurate are these LED display cost estimates?", a: "These are indicative budgetary ranges based on 2026 UAE market conditions. Actual pricing depends on brand, quantity, specific features, project timeline, and installation complexity." },
  { q: "What's included in 'total project cost'?", a: "Total project cost includes: LED display hardware, video processing system, mounting structure, cabling and power distribution, installation labour, commissioning and calibration, and 2-year spare parts." },
  { q: "Why is there such a wide price range?", a: "The range reflects brand tiers (premium vs value), quantity discounts, feature differences, and market conditions." },
];

function calc(width, height, pitchData) {
  const area = width * height;
  const p = pitchData;
  const hardwareLow = Math.round(area * p.low);
  const hardwareHigh = Math.round(area * p.high);
  const processingLow = Math.round(hardwareLow * 0.10);
  const processingHigh = Math.round(hardwareHigh * 0.15);
  const structureLow = Math.round(hardwareLow * 0.08);
  const structureHigh = Math.round(hardwareHigh * 0.12);
  const installLow = Math.round(hardwareLow * 0.10);
  const installHigh = Math.round(hardwareHigh * 0.15);
  const cablingLow = Math.round(hardwareLow * 0.05);
  const cablingHigh = Math.round(hardwareHigh * 0.08);
  const sparesLow = Math.round(hardwareLow * 0.03);
  const sparesHigh = Math.round(hardwareHigh * 0.05);
  const totalLow = hardwareLow + processingLow + structureLow + installLow + cablingLow + sparesLow;
  const totalHigh = hardwareHigh + processingHigh + structureHigh + installHigh + cablingHigh + sparesHigh;
  const totalPower = Math.round(area * p.powerW);
  const resW = Math.round((width * 1000) / p.pitch);
  const resH = Math.round((height * 1000) / p.pitch);

  return {
    area: Math.round(area * 10) / 10,
    hardwareLow, hardwareHigh, processingLow, processingHigh,
    structureLow, structureHigh, installLow, installHigh,
    cablingLow, cablingHigh, sparesLow, sparesHigh,
    totalLow, totalHigh, totalPower,
    resolution: `${resW.toLocaleString()} x ${resH.toLocaleString()}`,
    amps: Math.ceil(totalPower / 220),
  };
}

export default function BudgetEstimator() {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.25);
  const [selectedPitch, setSelectedPitch] = useState(4);

  const pitchData = PITCH_DATA[selectedPitch];
  const results = useMemo(() => calc(width, height, pitchData), [width, height, pitchData]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="budget-estimator-page">
      <SEO
        title="LED Display Budget Estimator — Cost Calculator UAE"
        description="Estimate LED display project costs for UAE. Enter screen size and pixel pitch to get instant hardware, installation, and total project budget estimates."
        path="/budget-estimator"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Budgetary Planning Tool</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" data-testid="budget-estimator-title">
              Budget
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 ml-3">Estimator</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Enter your screen dimensions and pixel pitch to get an instant project cost estimate including hardware, processing, structure, and installation.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Input Panel */}
            <FadeInSection delay={1}>
              <GlassCard className="p-6 lg:sticky lg:top-24" data-testid="budget-inputs">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign size={16} className="text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">Configuration</span>
                </div>

                {/* Screen Width */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Screen Width</label>
                    <span className="text-sm font-bold text-cyan-400">{width}m</span>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="0.25" value={width} 
                    onChange={e => setWidth(parseFloat(e.target.value))} 
                    className="w-full accent-cyan-400"
                    style={{ background: `linear-gradient(to right, #22d3ee ${(width-1)/29*100}%, rgba(255,255,255,0.1) ${(width-1)/29*100}%)` }}
                    data-testid="budget-width-slider" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>1m</span><span>30m</span></div>
                </div>

                {/* Screen Height */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Screen Height</label>
                    <span className="text-sm font-bold text-cyan-400">{height}m</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="15" step="0.25" value={height} 
                    onChange={e => setHeight(parseFloat(e.target.value))} 
                    className="w-full accent-cyan-400"
                    style={{ background: `linear-gradient(to right, #22d3ee ${(height-0.5)/14.5*100}%, rgba(255,255,255,0.1) ${(height-0.5)/14.5*100}%)` }}
                    data-testid="budget-height-slider" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>0.5m</span><span>15m</span></div>
                </div>

                {/* Pixel Pitch */}
                <div className="mb-6">
                  <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3">Pixel Pitch</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PITCH_DATA.map((p, i) => (
                      <button
                        key={p.label}
                        onClick={() => setSelectedPitch(i)}
                        className={`py-2.5 px-3 text-[10px] font-bold tracking-wider rounded-lg border transition-all ${
                          selectedPitch === i
                            ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                            : 'border-white/10 text-gray-400 hover:border-white/20 bg-white/[0.02]'
                        }`}
                        data-testid={`budget-pitch-${p.label}`}
                      >
                        {p.label} <span className="text-[8px] text-gray-500 block mt-0.5">{p.tech}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary box */}
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">Area</div>
                      <div className="text-lg font-bold text-cyan-400">{results.area} sqm</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">Resolution</div>
                      <div className="text-sm font-bold text-white">{results.resolution}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeInSection>

            {/* Results Panel */}
            <div data-testid="budget-results">
              <FadeInSection delay={2}>
                {/* Total */}
                <GlassCard accent className="p-6 mb-6" data-testid="budget-total">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">Total Project Estimate</span>
                    </div>
                    <span className="text-[9px] font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">2026 UAE MARKET</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    AED {results.totalLow.toLocaleString()} — {results.totalHigh.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mb-6">
                    Total installed cost for {results.area} sqm {pitchData.label} {pitchData.tech} LED display
                  </div>

                  {/* Line items */}
                  <div className="space-y-2">
                    {[
                      { label: 'LED Display Hardware', low: results.hardwareLow, high: results.hardwareHigh, pct: '55-60%', icon: Monitor },
                      { label: 'Video Processing', low: results.processingLow, high: results.processingHigh, pct: '10-15%', icon: Zap },
                      { label: 'Mounting Structure', low: results.structureLow, high: results.structureHigh, pct: '8-12%', icon: Building },
                      { label: 'Installation & Commissioning', low: results.installLow, high: results.installHigh, pct: '10-15%', icon: Ruler },
                      { label: 'Cabling & Power', low: results.cablingLow, high: results.cablingHigh, pct: '5-8%' },
                      { label: 'Spare Parts (2yr)', low: results.sparesLow, high: results.sparesHigh, pct: '3-5%' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300">{item.label}</span>
                          <span className="text-[10px] text-gray-500">({item.pct})</span>
                        </div>
                        <span className="text-sm font-bold text-white">AED {item.low.toLocaleString()} — {item.high.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-4 py-4 rounded-lg border-t border-white/[0.06] mt-3">
                      <span className="text-sm font-bold text-white">Total Project Estimate</span>
                      <span className="text-lg font-bold text-emerald-400">AED {results.totalLow.toLocaleString()} — {results.totalHigh.toLocaleString()}</span>
                    </div>
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={3}>
                {/* Hardware cost per sqm */}
                <GlassCard className="p-6 mb-6" data-testid="budget-per-sqm">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Hardware Cost Per SQM</span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-white">AED {pitchData.low.toLocaleString()}</span>
                    <span className="text-gray-500">—</span>
                    <span className="text-2xl font-bold text-white">{pitchData.high.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">per sqm</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {pitchData.label} {pitchData.tech} — hardware only. Multiply by 1.3-1.4x for total project cost.
                  </p>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={4}>
                {/* Power */}
                <GlassCard className="p-6 mb-6" data-testid="budget-power">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Electrical Requirement</span>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Power</div>
                      <div className="text-lg font-bold text-white">{results.totalPower.toLocaleString()} W</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Circuit</div>
                      <div className="text-lg font-bold text-white">{results.amps} A @ 220V</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Heat</div>
                      <div className="text-lg font-bold text-white">{Math.round(results.totalPower * 3.41).toLocaleString()} BTU/hr</div>
                    </div>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* CTAs */}
              <FadeInSection delay={5}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    data-testid="budget-quote-cta"
                  >
                    Get Formal Quote <ArrowRight size={16} />
                  </Link>
                  <a 
                    href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I used your budget estimator. I need a ${width}m x ${height}m ${pitchData.label} LED display. Estimated budget: AED ${results.totalLow.toLocaleString()} - ${results.totalHigh.toLocaleString()}. Can you provide a formal quotation?`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="budget-whatsapp-cta"
                  >
                    <MessageCircle size={16} /> WhatsApp with Estimate
                  </a>
                </div>
              </FadeInSection>

              <SectionDivider />

              <FadeInSection delay={6}>
                <GlassCard className="p-6 mb-12" style={{ borderColor: 'rgba(234,179,8,0.2)', background: 'rgba(234,179,8,0.05)' }}>
                  <span className="text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Important Notes</span>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>These estimates are for budgetary planning purposes only. Actual pricing depends on brand selection, quantity, specific features, and project timeline.</p>
                    <p><strong className="text-gray-300">Installation costs and structural work are not included</strong> in hardware estimates. These are quoted separately after a site survey.</p>
                    <p>Excludes: content creation, structural engineering calculations, municipality approvals, and ongoing CMS subscription fees.</p>
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={7}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with cost tables and BOQ template." />
                  <GlassCard className="p-6">
                    <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Related Tools</span>
                    <div className="space-y-2">
                      {[
                        { to: '/calculator', label: 'Full Screen Calculator' },
                        { to: '/value-engineering', label: 'Value Engineering Hub' },
                        { to: '/contractors/led-cost-per-sqm', label: 'LED Cost per sqm Guide' },
                        { to: '/compare', label: 'Product Comparison' },
                      ].map(link => (
                        <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white transition-colors">
                          <ArrowRight size={12} className="text-cyan-400" /> {link.label}
                        </Link>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
