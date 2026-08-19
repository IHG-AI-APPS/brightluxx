import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Ruler, Zap, Thermometer, DollarSign, Cpu, Sun, Moon, Eye, MessageCircle, Layers, Info, Calculator, Sparkles } from 'lucide-react';
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

const PITCH_OPTIONS = [
  { pitch: 0.7, tech: 'COB', label: 'P0.7', tier: 'ultra' },
  { pitch: 0.9, tech: 'COB', label: 'P0.9', tier: 'ultra' },
  { pitch: 1.2, tech: 'COB/GOB', label: 'P1.2', tier: 'premium' },
  { pitch: 1.5, tech: 'GOB/MiP', label: 'P1.5', tier: 'premium' },
  { pitch: 1.9, tech: 'GOB/MiP', label: 'P1.9', tier: 'standard' },
  { pitch: 2.5, tech: 'GOB/MiP', label: 'P2.5', tier: 'standard' },
  { pitch: 3.9, tech: 'SMD/DIP', label: 'P3.9', tier: 'outdoor' },
  { pitch: 4.8, tech: 'SMD/DIP', label: 'P4.8', tier: 'outdoor' },
  { pitch: 6.0, tech: 'SMD/DIP outdoor', label: 'P6', tier: 'outdoor' },
  { pitch: 8.0, tech: 'SMD/DIP outdoor', label: 'P8', tier: 'outdoor' },
  { pitch: 10.0, tech: 'SMD/DIP outdoor', label: 'P10', tier: 'outdoor' },
];

const APPLICATIONS = [
  { id: 'boardroom', label: 'Boardroom', distRange: [2, 5] },
  { id: 'lobby', label: 'Hotel / Corp Lobby', distRange: [3, 10] },
  { id: 'retail', label: 'Retail / Shopfront', distRange: [1, 5] },
  { id: 'control', label: 'Control Room', distRange: [1.5, 3] },
  { id: 'auditorium', label: 'Auditorium / Event', distRange: [5, 20] },
  { id: 'outdoor', label: 'Outdoor Billboard', distRange: [10, 80] },
  { id: 'residential', label: 'Home Cinema', distRange: [2, 5] },
  { id: 'custom', label: 'Custom', distRange: [1, 100] },
];

const COST_PER_SQM = {
  0.7: [32000, 58000], 0.9: [24000, 44000], 1.2: [12000, 25000], 1.5: [8000, 16000],
  1.9: [5500, 11000], 2.5: [4000, 8500], 3.9: [2000, 5000], 4.8: [1500, 4000],
  6.0: [1200, 3000], 8.0: [900, 2200], 10.0: [650, 1800],
};

function calcResults(params) {
  const { screenW, screenH, viewDist, contentType, isIndoor, application } = params;
  const area = screenW * screenH;
  const multiplier = contentType === 'text' ? 2.0 : contentType === 'mixed' ? 1.5 : 1.0;
  const idealPitch = viewDist / multiplier;
  const sorted = [...PITCH_OPTIONS].sort((a, b) => Math.abs(a.pitch - idealPitch) - Math.abs(b.pitch - idealPitch));
  const recommended = sorted[0];
  const alternatives = sorted.slice(1, 3);

  const calcRes = (p) => {
    const w = Math.round((screenW * 1000) / p);
    const h = Math.round((screenH * 1000) / p);
    return { w, h, total: w * h, label: `${w.toLocaleString()} x ${h.toLocaleString()}` };
  };

  const resolution = calcRes(recommended.pitch);
  const getStandard = (w) => {
    if (w >= 7680) return '8K+';
    if (w >= 3840) return '4K UHD';
    if (w >= 2560) return 'QHD+';
    if (w >= 1920) return 'Full HD';
    if (w >= 1280) return 'HD';
    return 'Below HD';
  };

  let brightnessMin, brightnessMax, brightnessNote;
  if (!isIndoor) {
    brightnessMin = 5500; brightnessMax = 10000;
    brightnessNote = 'Full outdoor (UAE direct sun). Add 30% for south/west-facing.';
  } else if (application === 'control') {
    brightnessMin = 400; brightnessMax = 600;
    brightnessNote = 'Dark room environment — lower brightness for operator comfort.';
  } else if (application === 'residential') {
    brightnessMin = 400; brightnessMax = 800;
    brightnessNote = 'Home cinema — calibrated for dark room viewing with HDR support.';
  } else if (application === 'lobby') {
    brightnessMin = 800; brightnessMax = 2500;
    brightnessNote = 'Depends on ambient light. Glass facades may need higher brightness.';
  } else if (application === 'retail') {
    brightnessMin = 1000; brightnessMax = 1500;
    brightnessNote = 'Bright retail lighting. Transparent LED for windows needs 3,000-5,000 nits.';
  } else {
    brightnessMin = 600; brightnessMax = 1200;
    brightnessNote = 'Standard indoor with controlled lighting.';
  }

  let techRec, techWhy;
  if (!isIndoor) {
    if (recommended.pitch >= 6.0) {
      techRec = 'SMD or DIP'; techWhy = 'SMD and DIP are the proven, cost-effective outdoor technologies at this pitch.';
    } else {
      techRec = 'SMD outdoor'; techWhy = 'SMD outdoor-rated modules are widely used for weather resistance and brightness.';
    }
  } else {
    if (recommended.pitch <= 0.9) {
      techRec = 'COB'; techWhy = 'Sub-P1.0 pitch requires COB for best contrast and seamless surface.';
    } else if (recommended.pitch <= 1.5) {
      techRec = 'COB or GOB'; techWhy = 'COB offers best quality; GOB provides excellent protection at a better price point.';
    } else if (recommended.pitch <= 2.5) {
      techRec = 'GOB or MiP'; techWhy = 'GOB offers surface protection and better contrast. MiP provides good value.';
    } else {
      techRec = 'GOB/MiP'; techWhy = 'GOB and MiP are recommended for indoor applications.';
    }
  }

  let powerPerSqm, powerMax;
  if (!isIndoor) { powerPerSqm = 425; powerMax = 850; }
  else { powerPerSqm = 280; powerMax = 600; }
  const totalPower = Math.round(area * powerPerSqm);
  const totalPowerMax = Math.round(area * powerMax);
  const heatBtu = Math.round(totalPower * 3.41);
  const costRange = COST_PER_SQM[recommended.pitch] || [1000, 3000];
  const costLow = Math.round(area * costRange[0]);
  const costHigh = Math.round(area * costRange[1]);
  const weightPerSqm = isIndoor ? (recommended.pitch <= 1.5 ? 25 : 30) : 55;
  const totalWeight = Math.round(area * weightPerSqm);
  const refreshRate = application === 'control' || application === 'boardroom' ? '3,840 Hz' : '3,840 Hz+';
  const ipRating = !isIndoor ? 'IP65 front / IP54 rear' : (application === 'retail' ? 'IP30+' : 'IP20-IP30');

  return {
    recommended, alternatives, resolution,
    resStandard: getStandard(resolution.w),
    area: Math.round(area * 10) / 10,
    brightnessMin, brightnessMax, brightnessNote,
    techRec, techWhy, powerPerSqm, powerMax, totalPower, totalPowerMax, heatBtu,
    costLow, costHigh, costRange, weightPerSqm, totalWeight, refreshRate, ipRating,
    minViewDist: Math.round(recommended.pitch * 1.5 * 10) / 10,
    comfortViewDist: Math.round(recommended.pitch * 2.5 * 10) / 10,
  };
}

const FAQS = [
  { q: "How does the LED screen calculator work?", a: "Enter your screen dimensions, viewing distance, content type, and environment. The calculator uses industry-standard formulas to recommend pixel pitch, resolution, brightness, technology, estimated cost, and power requirements." },
  { q: "What pixel pitch should I specify for my project?", a: "The formula is: Minimum Viewing Distance (m) = Pixel Pitch (mm) x 1.5. Text-heavy content requires finer pixels. Our calculator does this math automatically." },
  { q: "Are the cost estimates accurate?", a: "Cost ranges are based on 2026 market averages. Actual pricing depends on brand, quantity, features, and installation complexity." },
];

const ResultMetric = ({ icon: Icon, label, value, sub, accent = false }) => (
  <div className={`p-4 rounded-xl ${accent ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
    <Icon size={14} className={accent ? 'text-cyan-400 mb-2' : 'text-gray-500 mb-2'} />
    <div className={`text-lg font-bold ${accent ? 'text-cyan-400' : 'text-white'}`}>{value}</div>
    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{label}</div>
    {sub && <div className="text-[10px] text-gray-400 mt-1">{sub}</div>}
  </div>
);

export default function ScreenCalculator() {
  const [screenW, setScreenW] = useState(4);
  const [screenH, setScreenH] = useState(2.25);
  const [viewDist, setViewDist] = useState(5);
  const [contentType, setContentType] = useState('mixed');
  const [isIndoor, setIsIndoor] = useState(true);
  const [application, setApplication] = useState('lobby');

  const results = useMemo(() => calcResults({
    screenW, screenH, viewDist, contentType, isIndoor, application,
  }), [screenW, screenH, viewDist, contentType, isIndoor, application]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="calculator-page">
      <SEO
        title="LED Screen Calculator — Pixel Pitch, Resolution & Cost Estimator"
        description="Calculate the ideal LED display specification for your space. Instant pixel pitch, resolution, brightness, technology, cost, and power recommendations."
        path="/calculator"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Interactive Specification Tool</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" data-testid="calculator-page-title">
              Screen
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">Calculator</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Enter your screen dimensions and viewing distance to get instant pixel pitch, resolution, technology, cost, and power recommendations.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Input Panel */}
            <FadeInSection delay={1}>
              <GlassCard className="p-6 lg:sticky lg:top-24" data-testid="calculator-inputs">
                <div className="flex items-center gap-2 mb-6">
                  <Calculator size={16} className="text-cyan-400" />
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Configuration</span>
                </div>

                {/* Application Type */}
                <div className="mb-6">
                  <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3">Application</label>
                  <div className="grid grid-cols-2 gap-2">
                    {APPLICATIONS.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          setApplication(app.id);
                          if (app.id === 'outdoor') setIsIndoor(false);
                          else if (app.id !== 'custom') setIsIndoor(true);
                        }}
                        className={`py-2.5 px-3 text-[10px] font-bold tracking-wider rounded-lg border transition-all ${
                          application === app.id
                            ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                            : 'border-white/10 text-gray-400 hover:border-white/20 bg-white/[0.02]'
                        }`}
                        data-testid={`calc-app-${app.id}`}
                      >
                        {app.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screen Width */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Screen Width</label>
                    <span className="text-sm font-bold text-cyan-400">{screenW}m</span>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="0.25" value={screenW} 
                    onChange={e => setScreenW(parseFloat(e.target.value))} 
                    className="w-full accent-cyan-400 bg-white/10 rounded-full h-2 appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #22d3ee ${(screenW-1)/29*100}%, rgba(255,255,255,0.1) ${(screenW-1)/29*100}%)` }}
                    data-testid="calc-width-slider" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>1m</span><span>30m</span></div>
                </div>

                {/* Screen Height */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Screen Height</label>
                    <span className="text-sm font-bold text-cyan-400">{screenH}m</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="15" step="0.25" value={screenH} 
                    onChange={e => setScreenH(parseFloat(e.target.value))} 
                    className="w-full accent-cyan-400"
                    style={{ background: `linear-gradient(to right, #22d3ee ${(screenH-0.5)/14.5*100}%, rgba(255,255,255,0.1) ${(screenH-0.5)/14.5*100}%)` }}
                    data-testid="calc-height-slider" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>0.5m</span><span>15m</span></div>
                </div>

                {/* Viewing Distance */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Viewing Distance</label>
                    <span className="text-sm font-bold text-cyan-400">{viewDist}m</span>
                  </div>
                  <input 
                    type="range" min="1" max="80" step="0.5" value={viewDist} 
                    onChange={e => setViewDist(parseFloat(e.target.value))} 
                    className="w-full accent-cyan-400"
                    style={{ background: `linear-gradient(to right, #22d3ee ${(viewDist-1)/79*100}%, rgba(255,255,255,0.1) ${(viewDist-1)/79*100}%)` }}
                    data-testid="calc-distance-slider" 
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>1m</span><span>80m</span></div>
                </div>

                {/* Content Type */}
                <div className="mb-5">
                  <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3">Content Type</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'text', label: 'Text / Data' },
                      { id: 'mixed', label: 'Mixed' },
                      { id: 'video', label: 'Video Only' },
                    ].map(ct => (
                      <button
                        key={ct.id}
                        onClick={() => setContentType(ct.id)}
                        className={`flex-1 py-2.5 text-[10px] font-bold tracking-wider rounded-lg border transition-all ${
                          contentType === ct.id
                            ? 'bg-cyan-500 text-black border-cyan-500'
                            : 'text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                        data-testid={`calc-content-${ct.id}`}
                      >
                        {ct.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Environment */}
                <div className="mb-6">
                  <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3">Environment</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsIndoor(true)} 
                      className={`flex-1 py-2.5 text-[10px] font-bold tracking-wider rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        isIndoor ? 'bg-cyan-500 text-black border-cyan-500' : 'text-gray-400 border-white/10'
                      }`} 
                      data-testid="calc-env-indoor"
                    >
                      <Moon size={12} /> Indoor
                    </button>
                    <button 
                      onClick={() => setIsIndoor(false)} 
                      className={`flex-1 py-2.5 text-[10px] font-bold tracking-wider rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        !isIndoor ? 'bg-cyan-500 text-black border-cyan-500' : 'text-gray-400 border-white/10'
                      }`} 
                      data-testid="calc-env-outdoor"
                    >
                      <Sun size={12} /> Outdoor
                    </button>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[9px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3 text-center">Scale Preview</div>
                  <div className="relative flex items-end justify-center h-24">
                    <div
                      className="relative border-2 border-cyan-500/50 rounded bg-cyan-500/10"
                      style={{
                        width: `${Math.min(Math.max(screenW / 30 * 100, 20), 100)}%`,
                        height: `${Math.min(Math.max(screenH / 15 * 80, 15), 80)}px`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] text-cyan-400 font-medium">{screenW}m x {screenH}m</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Eye size={10} className="text-gray-500" />
                    <span className="text-[10px] text-gray-500">{viewDist}m viewing distance</span>
                  </div>
                </div>
              </GlassCard>
            </FadeInSection>

            {/* Results Panel */}
            <div data-testid="calculator-results">
              <FadeInSection delay={2}>
                {/* Primary Recommendation */}
                <GlassCard accent className="p-6 mb-6" data-testid="calc-primary-result">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-cyan-400" />
                      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Recommended Specification</span>
                    </div>
                    <span className="text-[9px] font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">INSTANT</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <ResultMetric icon={Ruler} label="Pixel Pitch" value={results.recommended.label} accent />
                    <ResultMetric icon={Monitor} label={results.resStandard} value={results.resolution.label} />
                    <ResultMetric icon={Sun} label="Nits" value={`${results.brightnessMin.toLocaleString()}-${results.brightnessMax.toLocaleString()}`} />
                    <ResultMetric icon={Cpu} label="Technology" value={results.techRec} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Screen Area', value: `${results.area} sqm`, icon: Layers },
                      { label: 'Total Pixels', value: results.resolution.total.toLocaleString(), icon: Monitor },
                      { label: 'Min Viewing', value: `${results.minViewDist}m`, icon: Eye },
                      { label: 'Refresh Rate', value: results.refreshRate, icon: Zap },
                      { label: 'IP Rating', value: results.ipRating, icon: Info },
                      { label: 'Total Weight', value: `~${results.totalWeight} kg`, icon: Ruler },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                        <item.icon size={12} className="text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="text-[9px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                          <div className="text-xs font-bold text-white">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={3}>
                {/* Technology Recommendation */}
                <GlassCard className="p-6 mb-6" data-testid="calc-tech-rec">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu size={16} className="text-cyan-400" />
                    <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Technology Recommendation</span>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20">
                      <Cpu size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-1">{results.techRec}</div>
                      <p className="text-sm text-gray-400 leading-relaxed">{results.techWhy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-white/[0.02] px-3 py-2 rounded-lg">
                    <Info size={12} />
                    <span>{results.brightnessNote}</span>
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={4}>
                {/* Cost & Power */}
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <GlassCard className="p-6" data-testid="calc-cost">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign size={16} className="text-cyan-400" />
                      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Estimated Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      AED {results.costLow.toLocaleString()} — {results.costHigh.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500 mb-4">
                      Hardware only. AED {results.costRange[0].toLocaleString()}-{results.costRange[1].toLocaleString()}/sqm x {results.area} sqm
                    </div>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between text-gray-400"><span>Processing system</span><span>+10-15%</span></div>
                      <div className="flex justify-between text-gray-400"><span>Installation</span><span>+10-20%</span></div>
                      <div className="flex justify-between border-t border-white/[0.06] pt-2 mt-2 font-bold">
                        <span className="text-gray-300">Estimated total</span>
                        <span className="text-cyan-400">AED {Math.round(results.costLow * 1.25).toLocaleString()} — {Math.round(results.costHigh * 1.35).toLocaleString()}</span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6" data-testid="calc-power">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-cyan-400" />
                      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Power & HVAC</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Power (Avg / Max)</div>
                        <div className="text-lg font-bold text-white">{results.totalPower.toLocaleString()} W <span className="text-gray-400 font-normal">/ {results.totalPowerMax.toLocaleString()} W</span></div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Heat Output</div>
                        <div className="text-lg font-bold text-white">{results.heatBtu.toLocaleString()} BTU/hr</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Electrical</div>
                        <div className="text-lg font-bold text-white">{Math.ceil(results.totalPowerMax / 220)} A @ 220V</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </FadeInSection>

              <FadeInSection delay={5}>
                {/* Alternative Pitches */}
                <GlassCard className="p-6 mb-6" data-testid="calc-alternatives">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Alternative Options</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[results.recommended, ...results.alternatives].map((opt, i) => {
                      const res = Math.round((screenW * 1000) / opt.pitch) + ' x ' + Math.round((screenH * 1000) / opt.pitch);
                      const cost = COST_PER_SQM[opt.pitch] || [1000, 3000];
                      return (
                        <div key={opt.pitch} className={`p-4 rounded-xl ${i === 0 ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
                          <div className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-2 ${i === 0 ? 'text-cyan-400' : 'text-gray-500'}`}>
                            {i === 0 ? 'RECOMMENDED' : i === 1 ? 'BUDGET' : 'PREMIUM'}
                          </div>
                          <div className={`text-xl font-bold ${i === 0 ? 'text-cyan-400' : 'text-white'}`}>{opt.label}</div>
                          <div className="text-[10px] text-gray-500 mt-1">{opt.tech}</div>
                          <div className="text-[10px] text-gray-400 mt-2">{res} px</div>
                          <div className="text-[10px] text-gray-400">AED {(results.area * cost[0]).toLocaleString()} — {(results.area * cost[1]).toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={6}>
                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    data-testid="calc-quote-cta"
                  >
                    Get Detailed Quote <ArrowRight size={16} />
                  </Link>
                  <a 
                    href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I used your screen calculator. I need a ${screenW}m x ${screenH}m LED display at ${viewDist}m viewing distance (${isIndoor ? 'indoor' : 'outdoor'}). The calculator recommended ${results.recommended.label}. Can you provide a detailed quotation?`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="calc-whatsapp-cta"
                  >
                    <MessageCircle size={16} /> WhatsApp with Results
                  </a>
                </div>
              </FadeInSection>

              <SectionDivider />

              <FadeInSection delay={7}>
                {/* Related Tools */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with viewing distance tables and cost analysis." />
                  <GlassCard className="p-6">
                    <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Related Tools & Guides</span>
                    <div className="space-y-2">
                      {[
                        { to: '/resources', label: 'All Spec Packs & Resources' },
                        { to: '/compare', label: 'Product Comparison Tool' },
                        { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD Guide' },
                        { to: '/viewing-distance', label: 'Viewing Distance Calculator' },
                        { to: '/for-architects', label: 'For Architects & Consultants' },
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
      <section className="py-10">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-sm text-neutral-400 mb-3">More free LED tools:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-semibold">
            <Link to="/tools" className="text-cyan-400 hover:underline" data-testid="link-tools-hub">All Tools</Link>
            <Link to="/viewing-distance" className="text-cyan-400 hover:underline">Viewing Distance Calculator</Link>
            <Link to="/tools/led-wall-size-calculator" className="text-cyan-400 hover:underline">Wall Size Calculator</Link>
            <Link to="/tools/video-wall-resolution-calculator" className="text-cyan-400 hover:underline">Resolution Calculator</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
