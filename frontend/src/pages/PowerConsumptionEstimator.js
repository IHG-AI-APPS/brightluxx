import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Thermometer, MessageCircle, Cable, Sun, Moon, DollarSign, Lightbulb, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';
import QuickInquiry from '../components/QuickInquiry';

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

const POWER_DATA = [
  { pitch: 0.9, label: 'P0.9', maxW: 620, avgW: 220, tech: 'COB MicroLED' },
  { pitch: 1.2, label: 'P1.2', maxW: 550, avgW: 195, tech: 'COB / MiP' },
  { pitch: 1.5, label: 'P1.5', maxW: 480, avgW: 170, tech: 'MiP / SMD' },
  { pitch: 1.9, label: 'P1.9', maxW: 420, avgW: 150, tech: 'MiP / SMD' },
  { pitch: 2.5, label: 'P2.5', maxW: 360, avgW: 130, tech: 'SMD' },
  { pitch: 3.9, label: 'P3.9', maxW: 300, avgW: 110, tech: 'SMD' },
  { pitch: 4.8, label: 'P4.8', maxW: 280, avgW: 100, tech: 'SMD' },
  { pitch: 6.0, label: 'P6', maxW: 450, avgW: 160, tech: 'SMD Outdoor' },
  { pitch: 8.0, label: 'P8', maxW: 500, avgW: 180, tech: 'SMD Outdoor' },
  { pitch: 10.0, label: 'P10', maxW: 550, avgW: 200, tech: 'SMD Outdoor' },
  { pitch: 16.0, label: 'P16', maxW: 600, avgW: 220, tech: 'SMD Outdoor' },
];

const ELECTRICITY_RATES = [
  { id: 'uae', label: 'UAE (DEWA/ADDC)', rate: 0.08, currency: 'AED', symbol: 'AED', factor: 0.29 },
  { id: 'ksa', label: 'Saudi Arabia (SEC)', rate: 0.048, currency: 'SAR', symbol: 'SAR', factor: 0.18 },
  { id: 'intl', label: 'International Avg', rate: 0.15, currency: 'USD', symbol: '$', factor: 0.15 },
];

const FAQS = [
  { q: 'How much electricity does an LED display consume?', a: 'A typical indoor P2.5 LED display consumes 130-360 W/sqm (average to maximum). A 10 sqm display running 12 hours daily costs approximately AED 115/month in the UAE.' },
  { q: 'What is the difference between max and average power?', a: 'Maximum power is drawn when all LEDs display full white at full brightness. Average power (typically 30-40% of max) represents real-world content.' },
  { q: 'Do I need dedicated air conditioning for an LED display?', a: 'Yes, LED displays convert approximately 60-70% of electrical input into heat. A 10 sqm indoor display can generate 4,500-12,000 BTU/h of heat.' },
  { q: 'What circuit breaker size do I need for an LED display?', a: 'Circuit breaker sizing should be based on maximum power draw plus a 25% safety margin. Always consult a licensed electrician.' },
];

function calcPower({ width, height, pitchIdx, brightness, hoursPerDay, rateIdx }) {
  const pd = POWER_DATA[pitchIdx];
  const rate = ELECTRICITY_RATES[rateIdx];
  const area = width * height;
  const brightnessFactor = brightness / 100;

  const maxPowerW = pd.maxW * area;
  const avgPowerW = pd.avgW * area * brightnessFactor;
  const maxPowerkW = maxPowerW / 1000;
  const avgPowerkW = avgPowerW / 1000;
  const dailykWh = avgPowerkW * hoursPerDay;
  const monthlykWh = dailykWh * 30;
  const annualkWh = dailykWh * 365;
  const monthlyCost = monthlykWh * rate.factor;
  const annualCost = annualkWh * rate.factor;
  const heatBTU = maxPowerW * 3.412;
  const heatTons = heatBTU / 12000;
  const voltage = 220;
  const maxAmps = maxPowerW / voltage;
  const breakerSize = Math.ceil((maxAmps * 1.25) / 5) * 5;
  const cableSize = maxAmps <= 20 ? '2.5mm²' : maxAmps <= 32 ? '4mm²' : maxAmps <= 45 ? '6mm²' : maxAmps <= 60 ? '10mm²' : '16mm²+';
  const co2Annual = annualkWh * 0.4;

  return { area, pd, rate, maxPowerW, avgPowerW, maxPowerkW, avgPowerkW, dailykWh, monthlykWh, annualkWh, monthlyCost, annualCost, heatBTU, heatTons, maxAmps, breakerSize, voltage, cableSize, co2Annual };
}

const ResultCard = ({ label, value, unit, accent, sub, testId }) => (
  <div className={`p-4 rounded-xl ${accent ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
    <div className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-1 ${accent ? 'text-cyan-400' : 'text-gray-500'}`}>{label}</div>
    <div className={`text-lg font-bold ${accent ? 'text-cyan-400' : 'text-white'}`} data-testid={testId}>
      {value}<span className="text-xs font-normal text-gray-500 ml-1">{unit}</span>
    </div>
    {sub && <div className="text-[10px] text-gray-500 mt-0.5">{sub}</div>}
  </div>
);

export default function PowerConsumptionEstimator() {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [pitchIdx, setPitchIdx] = useState(4);
  const [brightness, setBrightness] = useState(70);
  const [hoursPerDay, setHoursPerDay] = useState(12);
  const [rateIdx, setRateIdx] = useState(0);

  const faqJsonLd = buildFaqJsonLd(FAQS);
  const r = useMemo(() => calcPower({ width, height, pitchIdx, brightness, hoursPerDay, rateIdx }), [width, height, pitchIdx, brightness, hoursPerDay, rateIdx]);

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="power-consumption-estimator">
      <SEO
        title="LED Power Consumption Estimator — Electrical Load Calculator | Brightluxx"
        description="Calculate LED display power consumption, electrical load, HVAC heat output, and running costs. Free tool for MEP engineers."
        path="/power-estimator"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Specifier Tool</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">
              Power
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 ml-3">Estimator</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Calculate electrical load, running costs, heat output, and infrastructure requirements for any LED display.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Calculator */}
            <div>
              <FadeInSection delay={1}>
                <GlassCard className="p-6 md:p-8 mb-8" data-testid="power-calc-panel">
                  {/* Display Size */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2 block">Width (meters)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range" min="0.5" max="20" step="0.5" value={width}
                          onChange={e => setWidth(parseFloat(e.target.value))}
                          className="flex-1 accent-cyan-400"
                          style={{ background: `linear-gradient(to right, #22d3ee ${((width-0.5)/19.5)*100}%, rgba(255,255,255,0.1) ${((width-0.5)/19.5)*100}%)` }}
                          data-testid="width-slider"
                        />
                        <span className="text-xl font-bold text-cyan-400 w-14 text-center" data-testid="width-value">{width}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2 block">Height (meters)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range" min="0.5" max="12" step="0.5" value={height}
                          onChange={e => setHeight(parseFloat(e.target.value))}
                          className="flex-1 accent-cyan-400"
                          style={{ background: `linear-gradient(to right, #22d3ee ${((height-0.5)/11.5)*100}%, rgba(255,255,255,0.1) ${((height-0.5)/11.5)*100}%)` }}
                          data-testid="height-slider"
                        />
                        <span className="text-xl font-bold text-cyan-400 w-14 text-center" data-testid="height-value">{height}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pixel Pitch */}
                  <div className="mb-6">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3 block">Pixel Pitch</label>
                    <div className="flex flex-wrap gap-2">
                      {POWER_DATA.map((p, i) => (
                        <button
                          key={p.pitch}
                          onClick={() => setPitchIdx(i)}
                          className={`px-3 py-2 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                            pitchIdx === i
                              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                              : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                          }`}
                          data-testid={`pitch-btn-${p.label.toLowerCase()}`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-2">{POWER_DATA[pitchIdx].tech} — Max {POWER_DATA[pitchIdx].maxW} W/sqm</div>
                  </div>

                  {/* Brightness */}
                  <div className="mb-6">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2 block">Average Brightness</label>
                    <div className="flex items-center gap-3">
                      <Moon size={14} className="text-gray-500" />
                      <input
                        type="range" min="10" max="100" step="5" value={brightness}
                        onChange={e => setBrightness(parseInt(e.target.value))}
                        className="flex-1 accent-cyan-400"
                        style={{ background: `linear-gradient(to right, #22d3ee ${((brightness-10)/90)*100}%, rgba(255,255,255,0.1) ${((brightness-10)/90)*100}%)` }}
                        data-testid="brightness-slider"
                      />
                      <Sun size={14} className="text-yellow-400" />
                      <span className="text-lg font-bold text-cyan-400 w-14 text-center" data-testid="brightness-value">{brightness}%</span>
                    </div>
                  </div>

                  {/* Usage & Rate */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2 block">Hours Per Day</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range" min="1" max="24" step="1" value={hoursPerDay}
                          onChange={e => setHoursPerDay(parseInt(e.target.value))}
                          className="flex-1 accent-cyan-400"
                          style={{ background: `linear-gradient(to right, #22d3ee ${((hoursPerDay-1)/23)*100}%, rgba(255,255,255,0.1) ${((hoursPerDay-1)/23)*100}%)` }}
                          data-testid="hours-slider"
                        />
                        <span className="text-lg font-bold text-cyan-400 w-12 text-center" data-testid="hours-value">{hoursPerDay}h</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2 block">Electricity Rate</label>
                      <div className="flex flex-wrap gap-2">
                        {ELECTRICITY_RATES.map((er, i) => (
                          <button
                            key={er.id}
                            onClick={() => setRateIdx(i)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                              rateIdx === i
                                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                                : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                            }`}
                            data-testid={`rate-btn-${er.id}`}
                          >
                            {er.id.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t border-white/[0.06] pt-6" data-testid="power-results">
                    {/* Power */}
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                      <Zap size={14} /> Power Consumption
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <ResultCard label="Display Area" value={r.area.toFixed(1)} unit="m²" sub={`${width}m × ${height}m`} testId="result-area" />
                      <ResultCard label="Max Power" value={r.maxPowerkW.toFixed(1)} unit="kW" sub={`${r.maxPowerW.toLocaleString()}W full white`} testId="result-max-power" />
                      <ResultCard label="Avg Power" value={r.avgPowerkW.toFixed(1)} unit="kW" accent sub={`${Math.round(r.avgPowerW).toLocaleString()}W at ${brightness}%`} testId="result-avg-power" />
                      <ResultCard label="Daily Usage" value={r.dailykWh.toFixed(1)} unit="kWh" sub={`${hoursPerDay} hours/day`} testId="result-daily" />
                    </div>

                    {/* Running Costs */}
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                      <DollarSign size={14} /> Running Costs ({r.rate.label})
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <ResultCard label="Monthly" value={`${r.rate.symbol} ${Math.round(r.monthlyCost).toLocaleString()}`} unit="" accent sub={`${r.monthlykWh.toFixed(0)} kWh/month`} testId="result-monthly-cost" />
                      <ResultCard label="Annual" value={`${r.rate.symbol} ${Math.round(r.annualCost).toLocaleString()}`} unit="" sub={`${r.annualkWh.toFixed(0)} kWh/year`} testId="result-annual-cost" />
                      <ResultCard label="CO2 / Year" value={`${(r.co2Annual / 1000).toFixed(1)}`} unit="tons" sub="GCC grid average" testId="result-co2" />
                    </div>

                    {/* MEP Specifications */}
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                      <Cable size={14} /> MEP Specifications
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <ResultCard label="Max Current" value={r.maxAmps.toFixed(1)} unit="A" sub={`At ${r.voltage}V single phase`} testId="result-amps" />
                      <ResultCard label="Breaker Size" value={r.breakerSize} unit="A" accent sub="Including 25% safety margin" testId="result-breaker" />
                      <ResultCard label="Cable Size" value={r.cableSize} unit="" sub="Recommended minimum" testId="result-cable" />
                      <ResultCard label="Heat Output" value={Math.round(r.heatBTU).toLocaleString()} unit="BTU/h" sub={`${r.heatTons.toFixed(1)} tons cooling`} testId="result-heat" />
                    </div>

                    {/* GCC Heat Warning */}
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <Thermometer size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-400 leading-relaxed">
                          <strong className="text-yellow-400">GCC Climate Note:</strong> LED displays generate {r.heatTons.toFixed(1)} tons of heat load that must be offset by HVAC. For outdoor installations, add 30-40% additional cooling capacity.
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* CTAs */}
              <FadeInSection delay={2}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    data-testid="power-quote-cta"
                  >
                    Get Detailed Quote <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`https://wa.me/971559954274?text=${encodeURIComponent(
                      `Hi, I used your power consumption estimator. I need a ${width}m × ${height}m ${POWER_DATA[pitchIdx].label} LED display (${r.area.toFixed(1)} sqm). Max power: ${r.maxPowerkW.toFixed(1)}kW, breaker: ${r.breakerSize}A, heat: ${Math.round(r.heatBTU)} BTU/h. Can you provide a quotation?`
                    )}`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="power-whatsapp-cta"
                  >
                    <MessageCircle size={16} /> WhatsApp with Specs
                  </a>
                </div>
              </FadeInSection>

              <SectionDivider />

              {/* Reference Table */}
              <FadeInSection delay={3}>
                <h2 className="text-xl font-bold tracking-wide text-white mb-6">Power Consumption by Pixel Pitch</h2>
                <GlassCard className="overflow-hidden mb-12" data-testid="power-reference-table">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Pitch</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Max W/sqm</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-cyan-400 uppercase">Avg W/sqm</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">10sqm Max kW</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">10sqm Heat BTU/h</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Technology</th>
                        </tr>
                      </thead>
                      <tbody>
                        {POWER_DATA.map(p => (
                          <tr key={p.pitch} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                            <td className="py-2.5 px-4 text-sm font-bold text-cyan-400">{p.label}</td>
                            <td className="py-2.5 px-4 text-xs text-gray-400">{p.maxW}</td>
                            <td className="py-2.5 px-4 text-xs font-bold text-white">{p.avgW}</td>
                            <td className="py-2.5 px-4 text-xs text-gray-400">{(p.maxW * 10 / 1000).toFixed(1)} kW</td>
                            <td className="py-2.5 px-4 text-xs text-gray-400">{Math.round(p.maxW * 10 * 3.412).toLocaleString()}</td>
                            <td className="py-2.5 px-4 text-xs text-gray-500">{p.tech}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Tips */}
              <FadeInSection delay={4}>
                <h2 className="text-xl font-bold tracking-wide text-white mb-6">Power-Saving Tips</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {[
                    { title: 'Smart Brightness Scheduling', desc: 'Reduce brightness during low-traffic hours. Saves 30-50% on electricity.' },
                    { title: 'Ambient Light Sensors', desc: 'Auto-dim based on room lighting conditions.' },
                    { title: 'Content Optimization', desc: 'Dark-themed content consumes significantly less power.' },
                    { title: 'Scheduled Power-Off', desc: 'Turn off displays during non-business hours.' },
                  ].map((tip, i) => (
                    <GlassCard key={i} className="p-5">
                      <div className="flex items-start gap-3">
                        <Lightbulb size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-bold tracking-wider text-white mb-1">{tip.title}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed">{tip.desc}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </FadeInSection>

              <SectionDivider />
              <FadeInSection delay={5}>
                <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <FadeInSection delay={2}>
                <SpecPackCTA packId="power-consumption" title="Power & MEP Spec Pack" description="Complete electrical specification reference including cable sizing tables and HVAC load calculations." />
              </FadeInSection>

              <FadeInSection delay={3}>
                <GlassCard className="p-5">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Related Tools</span>
                  <div className="space-y-2">
                    {[
                      { to: '/calculator', label: 'Screen Calculator', desc: 'Size, resolution & specs' },
                      { to: '/viewing-distance', label: 'Viewing Distance', desc: 'Pixel pitch vs. distance' },
                      { to: '/budget-estimator', label: 'Budget Estimator', desc: 'Project cost estimates' },
                      { to: '/technology-selector', label: 'Technology Selector', desc: 'Find the right LED tech' },
                    ].map(link => (
                      <Link key={link.to} to={link.to} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors">
                        <ArrowRight size={12} className="text-cyan-400" />
                        <div>
                          <div className="text-xs font-bold tracking-wider text-white">{link.label}</div>
                          <div className="text-[10px] text-gray-500">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={4}>
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Need MEP Support?</span>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Our engineers provide full MEP coordination including electrical schematics and HVAC load calculations.
                  </p>
                  <Link to="/design-assist" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-4 py-2.5 w-full text-center transition-all inline-flex items-center justify-center gap-2 text-xs">
                    Free Design Assist <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeInSection>
            </aside>
          </div>
        </div>
      </section>
      <QuickInquiry context="LED power consumption and MEP specification" />
    </div>
  );
}
