import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, MessageCircle, Download, Zap, Ruler, Monitor, Building } from 'lucide-react';
import SEO from '../components/SEO';
import { buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';

const PITCH_DATA = [
  { label: 'P0.9', pitch: 0.9, low: 8000, high: 14000, tech: 'COB/MiP', powerW: 250 },
  { label: 'P1.2', pitch: 1.2, low: 4000, high: 8000, tech: 'COB/MiP', powerW: 250 },
  { label: 'P1.5', pitch: 1.5, low: 2500, high: 5000, tech: 'MiP/SMD', powerW: 250 },
  { label: 'P1.9', pitch: 1.9, low: 1800, high: 3500, tech: 'MiP/SMD', powerW: 300 },
  { label: 'P2.5', pitch: 2.5, low: 1200, high: 2500, tech: 'SMD', powerW: 350 },
  { label: 'P3.9', pitch: 3.9, low: 800, high: 1800, tech: 'SMD', powerW: 350 },
  { label: 'P4.8', pitch: 4.8, low: 600, high: 1500, tech: 'SMD outdoor', powerW: 600 },
  { label: 'P6', pitch: 6.0, low: 500, high: 1200, tech: 'SMD outdoor', powerW: 700 },
  { label: 'P8', pitch: 8.0, low: 400, high: 900, tech: 'SMD outdoor', powerW: 750 },
  { label: 'P10', pitch: 10.0, low: 300, high: 700, tech: 'SMD outdoor', powerW: 800 },
];

const FAQS = [
  { q: "How accurate are these LED display cost estimates?", a: "These are indicative budgetary ranges based on 2026 UAE market conditions. Actual pricing depends on brand, quantity, specific features, project timeline, and installation complexity. Use these estimates for initial budgeting and request a formal quotation for accurate project costing." },
  { q: "What's included in 'total project cost'?", a: "Total project cost includes: LED display hardware (modules, cabinets, power supplies), video processing system, mounting structure, cabling and power distribution, installation labour, commissioning and calibration, content management system, and 2-year spare parts. It excludes: content creation, structural engineering, and ongoing CMS subscription fees." },
  { q: "Why is there such a wide price range?", a: "The range reflects brand tiers (premium vs value), quantity discounts, feature differences (front vs rear service, brightness levels), and market conditions. The low end represents competitive pricing for standard specifications, while the high end covers premium brands with enhanced features." },
];

function calc(width, height, pitchData, isOutdoor) {
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
    hardwareLow, hardwareHigh,
    processingLow, processingHigh,
    structureLow, structureHigh,
    installLow, installHigh,
    cablingLow, cablingHigh,
    sparesLow, sparesHigh,
    totalLow, totalHigh,
    totalPower,
    resolution: `${resW.toLocaleString()} x ${resH.toLocaleString()}`,
    amps: Math.ceil(totalPower / 220),
  };
}

export default function BudgetEstimator() {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.25);
  const [selectedPitch, setSelectedPitch] = useState(4);
  const [isOutdoor, setIsOutdoor] = useState(false);

  const pitchData = PITCH_DATA[selectedPitch];
  const results = useMemo(() => calc(width, height, pitchData, isOutdoor), [width, height, pitchData, isOutdoor]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="pb-20" data-testid="budget-estimator-page">
      <SEO
        title="LED Display Budget Estimator — Cost Calculator UAE"
        description="Estimate LED display project costs for UAE. Enter screen size and pixel pitch to get instant hardware, installation, and total project budget estimates. Updated 2026 pricing."
        path="/budget-estimator"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-8">
        <div className="absolute inset-0 blx-led-grid opacity-30" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">BUDGETARY PLANNING TOOL</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider mb-3" data-testid="budget-estimator-title">Budget Estimator</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl" style={{ textTransform: 'none' }}>
            Enter your screen dimensions and pixel pitch to get an instant project cost estimate. Includes hardware, processing, structure, installation, and spare parts.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Input Panel */}
          <div className="glass-panel p-6 self-start sticky top-20" data-testid="budget-inputs">
            <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-6">CONFIGURATION</h3>

            {/* Screen Width */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">SCREEN WIDTH</label>
                <span className="text-sm font-bold text-[var(--blx-gold-3)]">{width}m</span>
              </div>
              <input type="range" min="1" max="30" step="0.25" value={width} onChange={e => setWidth(parseFloat(e.target.value))} className="w-full accent-[var(--blx-gold-3)]" data-testid="budget-width-slider" />
              <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]"><span>1m</span><span>30m</span></div>
            </div>

            {/* Screen Height */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">SCREEN HEIGHT</label>
                <span className="text-sm font-bold text-[var(--blx-gold-3)]">{height}m</span>
              </div>
              <input type="range" min="0.5" max="15" step="0.25" value={height} onChange={e => setHeight(parseFloat(e.target.value))} className="w-full accent-[var(--blx-gold-3)]" data-testid="budget-height-slider" />
              <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]"><span>0.5m</span><span>15m</span></div>
            </div>

            {/* Pixel Pitch */}
            <div className="mb-5">
              <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">PIXEL PITCH</label>
              <div className="grid grid-cols-2 gap-1.5">
                {PITCH_DATA.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setSelectedPitch(i)}
                    className={`py-2 px-2.5 text-[0.625rem] font-bold tracking-wider rounded-lg border transition-all ${
                      selectedPitch === i
                        ? 'border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] bg-[rgba(229,197,116,0.08)]'
                        : 'border-[var(--blx-border)] text-[var(--blx-text-2)] hover:border-[var(--blx-border-2)]'
                    }`}
                    data-testid={`budget-pitch-${p.label}`}
                  >
                    {p.label} <span className="text-[0.5rem] text-[var(--blx-muted)]">{p.tech}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary box */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.1)' }}>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">AREA</div>
                  <div className="text-sm font-bold text-[var(--blx-gold-3)]">{results.area} sqm</div>
                </div>
                <div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">RESOLUTION</div>
                  <div className="text-sm font-bold">{results.resolution}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div data-testid="budget-results">
            {/* Total */}
            <div className="glass-panel p-6 mb-6" data-testid="budget-total">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">TOTAL PROJECT ESTIMATE</h3>
                <span className="text-[0.5rem] font-bold tracking-wider px-2 py-1 rounded" style={{ background: 'rgba(229,197,116,0.08)', color: 'var(--blx-gold-3)' }}>2026 UAE MARKET</span>
              </div>
              <div className="text-3xl font-bold mb-2">
                ${results.totalLow.toLocaleString()} — ${results.totalHigh.toLocaleString()}
              </div>
              <div className="text-[0.625rem] text-[var(--blx-muted)] mb-6" style={{ textTransform: 'none' }}>
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
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ textTransform: 'none' }}>{item.label}</span>
                      <span className="text-[0.5rem] text-[var(--blx-muted)]">({item.pct})</span>
                    </div>
                    <span className="text-xs font-bold">${item.low.toLocaleString()} — ${item.high.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-3 py-3 rounded-lg border-t border-[var(--blx-hairline)] mt-2 pt-3">
                  <span className="text-xs font-bold">Total Project Estimate</span>
                  <span className="text-sm font-bold text-[var(--blx-gold-3)]">${results.totalLow.toLocaleString()} — ${results.totalHigh.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Hardware cost per sqm */}
            <div className="glass-panel p-6 mb-6" data-testid="budget-per-sqm">
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">HARDWARE COST PER SQM</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold">${pitchData.low.toLocaleString()}</span>
                <span className="text-[var(--blx-muted)]">—</span>
                <span className="text-2xl font-bold">${pitchData.high.toLocaleString()}</span>
                <span className="text-xs text-[var(--blx-muted)]">per sqm</span>
              </div>
              <p className="text-[0.625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                {pitchData.label} {pitchData.tech} — hardware only. Multiply by 1.3-1.4x for total project cost.
              </p>
            </div>

            {/* Power */}
            <div className="glass-panel p-6 mb-6" data-testid="budget-power">
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">ELECTRICAL REQUIREMENT</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">POWER</div>
                  <div className="text-base font-bold">{results.totalPower.toLocaleString()} W</div>
                </div>
                <div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">CIRCUIT</div>
                  <div className="text-base font-bold">{results.amps} A @ 220V</div>
                </div>
                <div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">HEAT</div>
                  <div className="text-base font-bold">{Math.round(results.totalPower * 3.41).toLocaleString()} BTU/hr</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="budget-quote-cta">
                Get Formal Quote <ArrowRight size={14} />
              </Link>
              <a href={`https://wa.me/971559910711?text=${encodeURIComponent(`Hi, I used your budget estimator. I need a ${width}m x ${height}m ${pitchData.label} LED display. Estimated budget: $${results.totalLow.toLocaleString()} - $${results.totalHigh.toLocaleString()}. Can you provide a formal quotation?`)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="budget-whatsapp-cta">
                <MessageCircle size={14} /> WhatsApp with Estimate
              </a>
            </div>

            <SectionDivider />

            <div className="glass-panel p-6 mb-10" style={{ background: 'rgba(229,197,116,0.04)', border: '1px solid rgba(229,197,116,0.1)' }}>
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-3">IMPORTANT NOTES</h3>
              <div className="space-y-2 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                <p>These estimates are for budgetary planning purposes only. Actual pricing depends on brand selection, quantity, specific features, and project timeline.</p>
                <p>Excludes: content creation, structural engineering calculations, municipality approvals, and ongoing CMS subscription fees.</p>
                <p>For a formal quotation, contact our sales team with your project details.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with cost tables, viewing distance guide, and BOQ template." />
              <div className="glass-panel p-5">
                <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS</h3>
                <div className="space-y-2">
                  {[
                    { to: '/calculator', label: 'Full Screen Calculator' },
                    { to: '/value-engineering', label: 'Value Engineering Hub' },
                    { to: '/contractors/led-cost-per-sqm', label: 'LED Cost per sqm Guide' },
                    { to: '/compare', label: 'Product Comparison' },
                  ].map(link => (
                    <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                      <ArrowRight size={12} className="text-[var(--blx-gold-3)]" /> {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
