import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Thermometer, MessageCircle, Cable, Gauge, Sun, Moon, DollarSign, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';
import QuickInquiry from '../components/QuickInquiry';

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
  { q: 'How much electricity does an LED display consume?', a: 'Power consumption depends on pixel pitch, brightness, content, and display size. A typical indoor P2.5 LED display consumes 130-360 W/sqm (average to maximum). A 10 sqm display running 12 hours daily at average brightness costs approximately AED 115/month in the UAE.' },
  { q: 'What is the difference between max and average power?', a: 'Maximum power is drawn when all LEDs display full white at full brightness — this rarely happens in practice. Average power (typically 30-40% of max) represents real-world content with mixed colours and brightness levels. Design your electrical infrastructure for max power, but calculate running costs on average power.' },
  { q: 'How does brightness affect power consumption?', a: 'Power consumption scales roughly linearly with brightness. Running at 50% brightness reduces power consumption by approximately 40-50%. In indoor environments, displays rarely need more than 50-60% brightness, significantly reducing actual power consumption.' },
  { q: 'Do I need dedicated air conditioning for an LED display?', a: 'Yes, for most installations. LED displays convert approximately 60-70% of electrical input into heat. A 10 sqm indoor display can generate 4,500-12,000 BTU/h of heat. In GCC climates, additional HVAC capacity must be factored into the MEP design. Our calculator provides BTU estimates.' },
  { q: 'What circuit breaker size do I need for an LED display?', a: 'Circuit breaker sizing should be based on maximum power draw plus a 25% safety margin. For a 10 sqm P2.5 display on single-phase 220V: (3,600W × 1.25) / 220V = 20.5A, requiring a 25A breaker. Always consult a licensed electrician and follow local DEWA/ADDC regulations.' },
  { q: 'How does pixel pitch affect power consumption?', a: 'Finer pixel pitches (P0.9, P1.2) consume more power per square meter because they pack more LEDs into the same area. P0.9 can consume up to 620 W/sqm at full white, while P3.9 uses around 300 W/sqm. However, finer pitches are typically used for smaller displays, so total consumption may be similar.' },
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

  return {
    area, pd, rate,
    maxPowerW, avgPowerW, maxPowerkW, avgPowerkW,
    dailykWh, monthlykWh, annualkWh,
    monthlyCost, annualCost,
    heatBTU, heatTons,
    maxAmps, breakerSize, voltage, cableSize,
    co2Annual,
  };
}

function ResultCard({ label, value, unit, accent, sub, testId }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: accent ? 'rgba(229,197,116,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${accent ? 'rgba(229,197,116,0.15)' : 'var(--blx-border)'}` }}>
      <div className={`text-[0.5rem] font-bold tracking-[0.15em] mb-1 ${accent ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)]'}`}>{label}</div>
      <div className={`text-lg font-bold ${accent ? 'text-[var(--blx-gold-3)]' : ''}`} data-testid={testId}>
        {value}<span className="text-xs font-normal text-[var(--blx-muted)] ml-1">{unit}</span>
      </div>
      {sub && <div className="text-[0.5rem] text-[var(--blx-muted)] mt-0.5" style={{ textTransform: 'none' }}>{sub}</div>}
    </div>
  );
}

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
    <div className="pb-20" data-testid="power-consumption-estimator">
      <SEO
        title="LED Power Consumption Estimator — Electrical Load Calculator | Brightluxx"
        description="Calculate LED display power consumption, electrical load, HVAC heat output, and running costs. Free tool for MEP engineers, architects, and specifiers in UAE/GCC."
        path="/power-estimator"
        jsonLd={[faqJsonLd, {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LED Power Consumption Estimator",
          "description": "Calculate power consumption, electrical load, and running costs for LED displays",
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
        }]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER TOOL</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-3">
            Power Consumption<br />Estimator
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed" style={{ textTransform: 'none' }}>
            Calculate electrical load, running costs, heat output, and infrastructure requirements for any LED display. Essential for MEP specification in UAE/GCC projects.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Calculator */}
          <div>
            <div className="glass-panel p-6 sm:p-8 mb-8" data-testid="power-calc-panel">
              {/* Display Size */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">WIDTH (METERS)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min="0.5" max="20" step="0.5" value={width}
                      onChange={e => setWidth(parseFloat(e.target.value))}
                      className="flex-1 accent-[var(--blx-gold-3)]"
                      data-testid="width-slider"
                    />
                    <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center" data-testid="width-value">{width}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">HEIGHT (METERS)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min="0.5" max="12" step="0.5" value={height}
                      onChange={e => setHeight(parseFloat(e.target.value))}
                      className="flex-1 accent-[var(--blx-gold-3)]"
                      data-testid="height-slider"
                    />
                    <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center" data-testid="height-value">{height}</span>
                  </div>
                </div>
              </div>

              {/* Pixel Pitch */}
              <div className="mb-6">
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">PIXEL PITCH</label>
                <div className="flex flex-wrap gap-1.5">
                  {POWER_DATA.map((p, i) => (
                    <button
                      key={p.pitch}
                      onClick={() => setPitchIdx(i)}
                      className={`px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider transition-all ${
                        pitchIdx === i
                          ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                          : 'bg-[rgba(255,255,255,0.04)] text-[var(--blx-muted)] border border-transparent hover:border-[var(--blx-border)]'
                      }`}
                      data-testid={`pitch-btn-${p.label.toLowerCase()}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="text-[0.5rem] text-[var(--blx-muted)] mt-1.5" style={{ textTransform: 'none' }}>{POWER_DATA[pitchIdx].tech} — Max {POWER_DATA[pitchIdx].maxW} W/sqm</div>
              </div>

              {/* Brightness */}
              <div className="mb-6">
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">AVERAGE BRIGHTNESS</label>
                <div className="flex items-center gap-3">
                  <Moon size={14} className="text-[var(--blx-muted)]" />
                  <input
                    type="range" min="10" max="100" step="5" value={brightness}
                    onChange={e => setBrightness(parseInt(e.target.value))}
                    className="flex-1 accent-[var(--blx-gold-3)]"
                    data-testid="brightness-slider"
                  />
                  <Sun size={14} className="text-[var(--blx-gold-3)]" />
                  <span className="text-lg font-bold text-[var(--blx-gold-3)] w-14 text-center" data-testid="brightness-value">{brightness}%</span>
                </div>
              </div>

              {/* Usage & Rate */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">HOURS PER DAY</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min="1" max="24" step="1" value={hoursPerDay}
                      onChange={e => setHoursPerDay(parseInt(e.target.value))}
                      className="flex-1 accent-[var(--blx-gold-3)]"
                      data-testid="hours-slider"
                    />
                    <span className="text-lg font-bold text-[var(--blx-gold-3)] w-14 text-center" data-testid="hours-value">{hoursPerDay}h</span>
                  </div>
                </div>
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">ELECTRICITY RATE</label>
                  <div className="flex flex-wrap gap-1.5">
                    {ELECTRICITY_RATES.map((er, i) => (
                      <button
                        key={er.id}
                        onClick={() => setRateIdx(i)}
                        className={`px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider transition-all ${
                          rateIdx === i
                            ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                            : 'bg-[rgba(255,255,255,0.04)] text-[var(--blx-muted)] border border-transparent hover:border-[var(--blx-border)]'
                        }`}
                        data-testid={`rate-btn-${er.id}`}
                      >
                        {er.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-[var(--blx-hairline)] pt-6" data-testid="power-results">
                {/* Power */}
                <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3 flex items-center gap-2">
                  <Zap size={12} /> POWER CONSUMPTION
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <ResultCard label="DISPLAY AREA" value={r.area.toFixed(1)} unit="m²" sub={`${width}m × ${height}m`} testId="result-area" />
                  <ResultCard label="MAX POWER" value={r.maxPowerkW.toFixed(1)} unit="kW" sub={`${r.maxPowerW.toLocaleString()}W at full white`} testId="result-max-power" />
                  <ResultCard label="AVG POWER" value={r.avgPowerkW.toFixed(1)} unit="kW" accent sub={`${Math.round(r.avgPowerW).toLocaleString()}W at ${brightness}% brightness`} testId="result-avg-power" />
                  <ResultCard label="DAILY USAGE" value={r.dailykWh.toFixed(1)} unit="kWh" sub={`${hoursPerDay} hours/day`} testId="result-daily" />
                </div>

                {/* Running Costs */}
                <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3 flex items-center gap-2">
                  <DollarSign size={12} /> RUNNING COSTS ({r.rate.label})
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <ResultCard label="MONTHLY" value={`${r.rate.symbol} ${Math.round(r.monthlyCost).toLocaleString()}`} unit="" accent sub={`${r.monthlykWh.toFixed(0)} kWh/month`} testId="result-monthly-cost" />
                  <ResultCard label="ANNUAL" value={`${r.rate.symbol} ${Math.round(r.annualCost).toLocaleString()}`} unit="" sub={`${r.annualkWh.toFixed(0)} kWh/year`} testId="result-annual-cost" />
                  <ResultCard label="CO2 / YEAR" value={`${(r.co2Annual / 1000).toFixed(1)}`} unit="tons" sub="Based on GCC grid average" testId="result-co2" />
                </div>

                {/* MEP Specifications */}
                <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3 flex items-center gap-2">
                  <Cable size={12} /> MEP SPECIFICATIONS
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <ResultCard label="MAX CURRENT" value={r.maxAmps.toFixed(1)} unit="A" sub={`At ${r.voltage}V single phase`} testId="result-amps" />
                  <ResultCard label="BREAKER SIZE" value={r.breakerSize} unit="A" accent sub="Including 25% safety margin" testId="result-breaker" />
                  <ResultCard label="CABLE SIZE" value={r.cableSize} unit="" sub="Recommended minimum" testId="result-cable" />
                  <ResultCard label="HEAT OUTPUT" value={Math.round(r.heatBTU).toLocaleString()} unit="BTU/h" sub={`${r.heatTons.toFixed(1)} tons cooling`} testId="result-heat" />
                </div>

                {/* GCC Heat Warning */}
                <div className="p-4 rounded-xl mb-2" style={{ background: 'rgba(229,197,116,0.04)', border: '1px solid rgba(229,197,116,0.1)' }}>
                  <div className="flex items-start gap-3">
                    <Thermometer size={16} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                    <div className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>
                      <strong className="text-[var(--blx-gold-3)]">GCC Climate Note:</strong> In UAE/Saudi Arabia, ambient temperatures regularly exceed 45°C. LED displays generate {r.heatTons.toFixed(1)} tons of heat load that must be offset by HVAC. For outdoor installations, add 30-40% additional cooling capacity. Ensure rear-access ventilation space of minimum 600mm.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="power-quote-cta">
                Get Detailed Quote <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent(
                  `Hi, I used your power consumption estimator. I need a ${width}m × ${height}m ${POWER_DATA[pitchIdx].label} LED display (${r.area.toFixed(1)} sqm). Max power: ${r.maxPowerkW.toFixed(1)}kW, breaker: ${r.breakerSize}A, heat: ${Math.round(r.heatBTU)} BTU/h. Can you provide a quotation with MEP specifications?`
                )}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2"
                data-testid="power-whatsapp-cta"
              >
                <MessageCircle size={14} /> WhatsApp with Specs
              </a>
            </div>

            <SectionDivider />

            {/* Reference Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Power Consumption by Pixel Pitch</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="power-reference-table">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Pitch</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Max W/sqm</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">Avg W/sqm</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">10sqm Max kW</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">10sqm Heat BTU/h</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POWER_DATA.map(p => (
                      <tr key={p.pitch} className="border-b border-[var(--blx-hairline)] hover:bg-[rgba(255,255,255,0.02)]">
                        <td className="py-2.5 px-4 text-sm font-bold text-[var(--blx-gold-3)]">{p.label}</td>
                        <td className="py-2.5 px-4 text-xs">{p.maxW}</td>
                        <td className="py-2.5 px-4 text-xs font-bold">{p.avgW}</td>
                        <td className="py-2.5 px-4 text-xs">{(p.maxW * 10 / 1000).toFixed(1)} kW</td>
                        <td className="py-2.5 px-4 text-xs">{Math.round(p.maxW * 10 * 3.412).toLocaleString()}</td>
                        <td className="py-2.5 px-4 text-xs text-[var(--blx-text-2)]">{p.tech}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <SectionDivider />

            {/* How to Use */}
            <h2 className="text-lg font-bold tracking-wider mb-6">What This Tells Your MEP Engineer</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Zap, title: 'Electrical Load', desc: 'Size the dedicated circuit, breaker, and cable for the display. Always design for maximum power draw with 25% headroom.' },
                { icon: Thermometer, title: 'Cooling Requirement', desc: 'LED heat output in BTU/h helps HVAC engineers size additional cooling capacity. Critical in GCC where ambient temps exceed 45°C.' },
                { icon: DollarSign, title: 'Operating Budget', desc: 'Monthly and annual electricity costs help project managers and building owners plan ongoing operational expenditure.' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <item.icon size={16} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <h3 className="text-xs font-bold tracking-wider mb-2">{item.title}</h3>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Tips */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Power-Saving Tips for LED Displays</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: 'Smart Brightness Scheduling', desc: 'Reduce brightness during low-traffic hours (e.g., 40% at night for indoor lobbies). Saves 30-50% on electricity and extends LED lifespan.' },
                { title: 'Ambient Light Sensors', desc: 'Auto-dim based on room lighting conditions. Most modern controllers support this natively. Prevents over-driving LEDs in dim environments.' },
                { title: 'Content Optimization', desc: 'Dark-themed content with black backgrounds consumes significantly less power than white/bright content. LED pixels draw zero watts when displaying pure black.' },
                { title: 'Scheduled Power-Off', desc: 'Completely power down displays during non-business hours rather than leaving on standby. A 10 sqm display saves ~1,000 kWh/year by turning off 8 hours nightly.' },
              ].map((tip, i) => (
                <div key={i} className="glass-panel p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold tracking-wider mb-1.5">{tip.title}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{tip.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />
            <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA packId="power-consumption" title="Power & MEP Spec Pack" description="Complete electrical specification reference including cable sizing tables, breaker selection, and HVAC load calculations." />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS</h3>
              <div className="space-y-1">
                {[
                  { to: '/calculator', label: 'Screen Calculator', desc: 'Size, resolution & specs' },
                  { to: '/viewing-distance', label: 'Viewing Distance', desc: 'Pixel pitch vs. distance' },
                  { to: '/budget-estimator', label: 'Budget Estimator', desc: 'Project cost estimates' },
                  { to: '/technology-selector', label: 'Technology Selector', desc: 'Find the right LED tech' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" />
                    <div>
                      <div className="text-xs font-bold tracking-wider">{link.label}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{link.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.06) 0%, rgba(183,142,58,0.03) 100%)', border: '1px solid rgba(229,197,116,0.12)' }}>
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">NEED MEP SUPPORT?</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Our engineers provide full MEP coordination including electrical schematics, HVAC load calculations, and structural requirements.
              </p>
              <Link to="/design-assist" className="btn-gold w-full py-2.5 text-[0.625rem] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                Free Design Assist <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <QuickInquiry context="LED power consumption and MEP specification" />
    </div>
  );
}
