import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Ruler, Zap, Thermometer, DollarSign, Cpu, Sun, Moon, Eye, MessageCircle, Download, Layers, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';

const PITCH_OPTIONS = [
  { pitch: 0.7, tech: 'COB/MiP', label: 'P0.7', tier: 'ultra' },
  { pitch: 0.9, tech: 'COB/MiP', label: 'P0.9', tier: 'ultra' },
  { pitch: 1.2, tech: 'COB/MiP/SMD', label: 'P1.2', tier: 'premium' },
  { pitch: 1.5, tech: 'MiP/SMD', label: 'P1.5', tier: 'premium' },
  { pitch: 1.9, tech: 'MiP/SMD', label: 'P1.9', tier: 'standard' },
  { pitch: 2.5, tech: 'SMD', label: 'P2.5', tier: 'standard' },
  { pitch: 3.9, tech: 'SMD', label: 'P3.9', tier: 'value' },
  { pitch: 4.8, tech: 'SMD', label: 'P4.8', tier: 'value' },
  { pitch: 6.0, tech: 'SMD outdoor', label: 'P6', tier: 'outdoor' },
  { pitch: 8.0, tech: 'SMD outdoor', label: 'P8', tier: 'outdoor' },
  { pitch: 10.0, tech: 'SMD outdoor', label: 'P10', tier: 'outdoor' },
];

const APPLICATIONS = [
  { id: 'boardroom', label: 'Boardroom', distRange: [2, 5], icon: '🏢' },
  { id: 'lobby', label: 'Hotel / Corp Lobby', distRange: [3, 10], icon: '🏨' },
  { id: 'retail', label: 'Retail / Shopfront', distRange: [1, 5], icon: '🛍' },
  { id: 'control', label: 'Control Room', distRange: [1.5, 3], icon: '📊' },
  { id: 'auditorium', label: 'Auditorium / Event', distRange: [5, 20], icon: '🎭' },
  { id: 'outdoor', label: 'Outdoor Billboard', distRange: [10, 80], icon: '📺' },
  { id: 'residential', label: 'Home Cinema', distRange: [2, 5], icon: '🏠' },
  { id: 'custom', label: 'Custom', distRange: [1, 100], icon: '⚙' },
];

const COST_PER_SQM = {
  0.7: [12000, 20000], 0.9: [8000, 14000], 1.2: [4000, 8000], 1.5: [2500, 5000],
  1.9: [1800, 3500], 2.5: [1200, 2500], 3.9: [800, 1800], 4.8: [600, 1500],
  6.0: [500, 1200], 8.0: [400, 900], 10.0: [300, 700],
};

function calcResults(params) {
  const { screenW, screenH, viewDist, contentType, isIndoor, application } = params;
  const area = screenW * screenH;

  // Ideal pitch from viewing distance
  const multiplier = contentType === 'text' ? 1.0 : contentType === 'mixed' ? 1.5 : 2.0;
  const idealPitch = viewDist / multiplier;

  // Find 3 closest pitches
  const sorted = [...PITCH_OPTIONS].sort((a, b) => Math.abs(a.pitch - idealPitch) - Math.abs(b.pitch - idealPitch));
  const recommended = sorted[0];
  const alternatives = sorted.slice(1, 3);

  // Resolution
  const calcRes = (p) => {
    const w = Math.round((screenW * 1000) / p);
    const h = Math.round((screenH * 1000) / p);
    return { w, h, total: w * h, label: `${w.toLocaleString()} x ${h.toLocaleString()}` };
  };

  const resolution = calcRes(recommended.pitch);

  // Resolution standard
  const getStandard = (w, h) => {
    if (w >= 7680) return '8K+';
    if (w >= 3840) return '4K UHD';
    if (w >= 2560) return 'QHD+';
    if (w >= 1920) return 'Full HD';
    if (w >= 1280) return 'HD';
    return 'Below HD';
  };

  // Brightness
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

  // Technology recommendation
  let techRec, techWhy;
  if (recommended.pitch <= 0.9) {
    techRec = 'COB'; techWhy = 'Sub-P1.0 pitch requires COB for best contrast and reliability. MiP is the cost-effective alternative.';
  } else if (recommended.pitch <= 1.5) {
    techRec = 'MiP'; techWhy = 'Best balance of quality and serviceability at this pitch. COB for premium; SMD for budget.';
  } else if (recommended.pitch <= 2.5) {
    techRec = 'MiP or SMD'; techWhy = 'SMD offers best value. MiP provides better contrast if budget allows.';
  } else {
    techRec = 'SMD'; techWhy = 'SMD is the proven, cost-effective choice at this pitch.';
  }

  // Power
  const powerPerSqm = isIndoor ? (recommended.pitch <= 1.5 ? 250 : 350) : 800;
  const totalPower = Math.round(area * powerPerSqm);
  const heatBtu = Math.round(totalPower * 3.41);

  // Cost
  const costRange = COST_PER_SQM[recommended.pitch] || [1000, 3000];
  const costLow = Math.round(area * costRange[0]);
  const costHigh = Math.round(area * costRange[1]);

  // Weight
  const weightPerSqm = isIndoor ? (recommended.pitch <= 1.5 ? 25 : 30) : 55;
  const totalWeight = Math.round(area * weightPerSqm);

  // Refresh rate
  const refreshRate = application === 'control' || application === 'boardroom' ? '3,840 Hz' :
    (application === 'auditorium' ? '7,680 Hz' : '3,840 Hz+');

  // IP rating
  const ipRating = !isIndoor ? 'IP65 front / IP54 rear' :
    (application === 'retail' ? 'IP30+' : 'IP20-IP30');

  return {
    recommended, alternatives, resolution,
    resStandard: getStandard(resolution.w, resolution.h),
    area: Math.round(area * 10) / 10,
    brightnessMin, brightnessMax, brightnessNote,
    techRec, techWhy,
    powerPerSqm, totalPower, heatBtu,
    costLow, costHigh, costRange,
    weightPerSqm, totalWeight,
    refreshRate, ipRating,
    minViewDist: Math.round(recommended.pitch * 1.5 * 10) / 10,
    comfortViewDist: Math.round(recommended.pitch * 2.5 * 10) / 10,
  };
}

const FAQS = [
  { q: "How does the LED screen calculator work?", a: "Enter your screen dimensions, viewing distance, content type, and environment. The calculator uses industry-standard formulas to recommend pixel pitch, resolution, brightness, technology, estimated cost, and power requirements. Results update instantly as you adjust parameters." },
  { q: "What pixel pitch should I specify for my project?", a: "The formula is: Minimum Viewing Distance (m) = Pixel Pitch (mm) x 1.5. For text-heavy content, use Pixel Pitch = Viewing Distance / 1.0. For mixed content, use / 1.5. For pure video, use / 2.0. Our calculator does this math automatically." },
  { q: "Are the cost estimates accurate?", a: "Cost ranges are based on 2026 market averages and include hardware only. Actual pricing depends on brand, quantity, features, and installation complexity. Use these estimates for budgetary planning and request a formal quotation for accurate project costing." },
  { q: "What does 'technology recommendation' mean?", a: "We recommend COB, MiP, or SMD LED technology based on your pixel pitch and application. COB for premium fine-pitch, MiP for mid-range with best value, SMD for larger pitches and outdoor. See our COB vs MiP vs SMD guide for full details." },
];

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
    <div className="pb-20" data-testid="calculator-page">
      <SEO
        title="LED Screen Calculator — Pixel Pitch, Resolution & Cost Estimator"
        description="Calculate the ideal LED display specification for your space. Instant pixel pitch, resolution, brightness, technology, cost, and power recommendations for architects and AV consultants."
        path="/calculator"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-8">
        <div className="absolute inset-0 blx-led-grid opacity-30" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">INTERACTIVE SPECIFICATION TOOL</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider mb-3" data-testid="calculator-page-title">Screen Calculator</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl" style={{ textTransform: 'none' }}>
            Enter your screen dimensions and viewing distance to get instant pixel pitch, resolution, technology, cost, and power recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Input Panel */}
          <div className="glass-panel p-6 self-start sticky top-20" data-testid="calculator-inputs">
            <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-6">CONFIGURATION</h3>

            {/* Application Type */}
            <div className="mb-5">
              <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">APPLICATION</label>
              <div className="grid grid-cols-2 gap-1.5">
                {APPLICATIONS.map(app => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setApplication(app.id);
                      if (app.id === 'outdoor') setIsIndoor(false);
                      else if (app.id !== 'custom') setIsIndoor(true);
                    }}
                    className={`py-2 px-2.5 text-[0.625rem] font-bold tracking-wider rounded-lg border transition-all ${
                      application === app.id
                        ? 'border-[var(--blx-gold-3)] text-[var(--blx-gold-3)]' + ' bg-[rgba(229,197,116,0.08)]'
                        : 'border-[var(--blx-border)] text-[var(--blx-text-2)] hover:border-[var(--blx-border-2)]'
                    }`}
                    data-testid={`calc-app-${app.id}`}
                  >
                    {app.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Screen Width */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">SCREEN WIDTH</label>
                <span className="text-sm font-bold text-[var(--blx-gold-3)]">{screenW}m</span>
              </div>
              <input type="range" min="1" max="30" step="0.25" value={screenW} onChange={e => setScreenW(parseFloat(e.target.value))} className="w-full accent-[var(--blx-gold-3)]" data-testid="calc-width-slider" />
              <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]"><span>1m</span><span>30m</span></div>
            </div>

            {/* Screen Height */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">SCREEN HEIGHT</label>
                <span className="text-sm font-bold text-[var(--blx-gold-3)]">{screenH}m</span>
              </div>
              <input type="range" min="0.5" max="15" step="0.25" value={screenH} onChange={e => setScreenH(parseFloat(e.target.value))} className="w-full accent-[var(--blx-gold-3)]" data-testid="calc-height-slider" />
              <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]"><span>0.5m</span><span>15m</span></div>
            </div>

            {/* Viewing Distance */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">VIEWING DISTANCE</label>
                <span className="text-sm font-bold text-[var(--blx-gold-3)]">{viewDist}m</span>
              </div>
              <input type="range" min="1" max="80" step="0.5" value={viewDist} onChange={e => setViewDist(parseFloat(e.target.value))} className="w-full accent-[var(--blx-gold-3)]" data-testid="calc-distance-slider" />
              <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]"><span>1m</span><span>80m</span></div>
            </div>

            {/* Content Type */}
            <div className="mb-4">
              <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">CONTENT TYPE</label>
              <div className="flex gap-2">
                {[
                  { id: 'text', label: 'Text / Data' },
                  { id: 'mixed', label: 'Mixed' },
                  { id: 'video', label: 'Video Only' },
                ].map(ct => (
                  <button
                    key={ct.id}
                    onClick={() => setContentType(ct.id)}
                    className={`flex-1 py-2 text-[0.625rem] font-bold tracking-wider rounded-lg border transition-all ${
                      contentType === ct.id
                        ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]'
                        : 'text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
                    }`}
                    data-testid={`calc-content-${ct.id}`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Environment */}
            <div className="mb-5">
              <label className="block text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">ENVIRONMENT</label>
              <div className="flex gap-2">
                <button onClick={() => setIsIndoor(true)} className={`flex-1 py-2 text-[0.625rem] font-bold tracking-wider rounded-lg border flex items-center justify-center gap-1.5 transition-all ${isIndoor ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)] border-[var(--blx-border)]'}`} data-testid="calc-env-indoor">
                  <Moon size={12} /> Indoor
                </button>
                <button onClick={() => setIsIndoor(false)} className={`flex-1 py-2 text-[0.625rem] font-bold tracking-wider rounded-lg border flex items-center justify-center gap-1.5 transition-all ${!isIndoor ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B] border-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)] border-[var(--blx-border)]'}`} data-testid="calc-env-outdoor">
                  <Sun size={12} /> Outdoor
                </button>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--blx-border)' }}>
              <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 text-center">SCALE PREVIEW</div>
              <div className="relative flex items-end justify-center" style={{ height: '100px' }}>
                {/* Screen */}
                <div
                  className="relative border-2 border-[var(--blx-gold-3)] rounded"
                  style={{
                    width: `${Math.min(Math.max(screenW / 30 * 100, 20), 100)}%`,
                    height: `${Math.min(Math.max(screenH / 15 * 80, 15), 80)}px`,
                    background: 'rgba(229,197,116,0.06)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[0.5rem] text-[var(--blx-gold-3)]">{screenW}m x {screenH}m</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Eye size={10} className="text-[var(--blx-muted)]" />
                <span className="text-[0.5rem] text-[var(--blx-muted)]">{viewDist}m viewing distance</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div data-testid="calculator-results">
            {/* Primary Recommendation */}
            <div className="glass-panel p-6 mb-6" data-testid="calc-primary-result">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">RECOMMENDED SPECIFICATION</h3>
                <span className="text-[0.5rem] font-bold tracking-wider px-2 py-1 rounded" style={{ background: 'rgba(229,197,116,0.08)', color: 'var(--blx-gold-3)' }}>INSTANT</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.1)' }}>
                  <Ruler size={14} className="text-[var(--blx-gold-3)] mb-1.5" />
                  <div className="text-lg font-bold text-[var(--blx-gold-3)]">{results.recommended.label}</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">PIXEL PITCH</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--blx-border)' }}>
                  <Monitor size={14} className="text-[var(--blx-text-2)] mb-1.5" />
                  <div className="text-sm font-bold">{results.resolution.label}</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{results.resStandard}</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--blx-border)' }}>
                  <Sun size={14} className="text-[var(--blx-text-2)] mb-1.5" />
                  <div className="text-sm font-bold">{results.brightnessMin.toLocaleString()}-{results.brightnessMax.toLocaleString()}</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">NITS</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--blx-border)' }}>
                  <Cpu size={14} className="text-[var(--blx-text-2)] mb-1.5" />
                  <div className="text-sm font-bold">{results.techRec}</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">TECHNOLOGY</div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Screen Area', value: `${results.area} sqm`, icon: Layers },
                  { label: 'Total Pixels', value: results.resolution.total.toLocaleString(), icon: Monitor },
                  { label: 'Min Viewing', value: `${results.minViewDist}m`, icon: Eye },
                  { label: 'Refresh Rate', value: results.refreshRate, icon: Zap },
                  { label: 'IP Rating', value: results.ipRating, icon: Info },
                  { label: 'Total Weight', value: `~${results.totalWeight} kg`, icon: Ruler },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <item.icon size={12} className="text-[var(--blx-muted)] flex-shrink-0" />
                    <div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.label}</div>
                      <div className="text-xs font-bold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Recommendation */}
            <div className="glass-panel p-6 mb-6" data-testid="calc-tech-rec">
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-3">TECHNOLOGY RECOMMENDATION</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Cpu size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <div>
                  <div className="text-base font-bold">{results.techRec}</div>
                  <p className="text-xs text-[var(--blx-text-2)] mt-1 leading-relaxed" style={{ textTransform: 'none' }}>{results.techWhy}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[0.625rem] text-[var(--blx-muted)]">
                <Info size={10} />
                <span style={{ textTransform: 'none' }}>{results.brightnessNote}</span>
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="glass-panel p-6" data-testid="calc-cost">
                <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">
                  <DollarSign size={14} className="inline -mt-0.5" /> ESTIMATED COST
                </h3>
                <div className="text-2xl font-bold mb-1">
                  ${results.costLow.toLocaleString()} — ${results.costHigh.toLocaleString()}
                </div>
                <div className="text-[0.625rem] text-[var(--blx-muted)] mb-4" style={{ textTransform: 'none' }}>
                  Hardware only. Based on ${results.costRange[0].toLocaleString()}-${results.costRange[1].toLocaleString()}/sqm x {results.area} sqm
                </div>
                <div className="space-y-1.5 text-[0.625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                  <div className="flex justify-between"><span>Processing system</span><span>Add 10-15%</span></div>
                  <div className="flex justify-between"><span>Installation</span><span>Add 10-20%</span></div>
                  <div className="flex justify-between"><span>Content creation</span><span>Variable</span></div>
                  <div className="flex justify-between border-t border-[var(--blx-hairline)] pt-1.5 mt-1.5 font-bold">
                    <span>Estimated total budget</span>
                    <span className="text-[var(--blx-gold-3)]">${Math.round(results.costLow * 1.25).toLocaleString()} — ${Math.round(results.costHigh * 1.35).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6" data-testid="calc-power">
                <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">
                  <Zap size={14} className="inline -mt-0.5" /> POWER & HVAC
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider">POWER CONSUMPTION</div>
                    <div className="text-base font-bold">{results.totalPower.toLocaleString()} W</div>
                    <div className="text-[0.5625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{results.powerPerSqm} W/sqm x {results.area} sqm</div>
                  </div>
                  <div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider">HEAT OUTPUT</div>
                    <div className="text-base font-bold">{results.heatBtu.toLocaleString()} BTU/hr</div>
                    <div className="text-[0.5625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>Factor this into HVAC calculations</div>
                  </div>
                  <div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider">ELECTRICAL REQUIREMENT</div>
                    <div className="text-base font-bold">{Math.ceil(results.totalPower / 220)} A @ 220V</div>
                    <div className="text-[0.5625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>Dedicated circuit recommended</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Pitches */}
            <div className="glass-panel p-6 mb-6" data-testid="calc-alternatives">
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-4">ALTERNATIVE OPTIONS</h3>
              <div className="grid grid-cols-3 gap-3">
                {[results.recommended, ...results.alternatives].map((opt, i) => {
                  const res = Math.round((screenW * 1000) / opt.pitch) + ' x ' + Math.round((screenH * 1000) / opt.pitch);
                  const cost = COST_PER_SQM[opt.pitch] || [1000, 3000];
                  return (
                    <div key={opt.pitch} className={`p-4 rounded-xl ${i === 0 ? '' : ''}`} style={{ background: i === 0 ? 'rgba(229,197,116,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(229,197,116,0.15)' : 'var(--blx-border)'}` }}>
                      {i === 0 && <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-2">RECOMMENDED</div>}
                      {i > 0 && <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2">{i === 1 ? 'BUDGET' : 'PREMIUM'}</div>}
                      <div className="text-lg font-bold text-[var(--blx-gold-3)]">{opt.label}</div>
                      <div className="text-[0.5625rem] text-[var(--blx-muted)] mt-1">{opt.tech}</div>
                      <div className="text-[0.5625rem] text-[var(--blx-text-2)] mt-2" style={{ textTransform: 'none' }}>{res} px</div>
                      <div className="text-[0.5625rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>${(results.area * cost[0]).toLocaleString()} — ${(results.area * cost[1]).toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="calc-quote-cta">
                Get Detailed Quote <ArrowRight size={14} />
              </Link>
              <a href={`https://wa.me/971559910711?text=${encodeURIComponent(`Hi, I used your screen calculator. I need a ${screenW}m x ${screenH}m LED display at ${viewDist}m viewing distance (${isIndoor ? 'indoor' : 'outdoor'}). The calculator recommended ${results.recommended.label}. Can you provide a detailed quotation?`)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="calc-whatsapp-cta">
                <MessageCircle size={14} /> WhatsApp with Results
              </a>
              <Link to="/knowledge/pixel-pitch-guide" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                Read Pixel Pitch Guide <ArrowRight size={14} />
              </Link>
            </div>

            <SectionDivider />

            {/* Sidebar-style cards in flow */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with viewing distance tables, resolution calculator, and cost analysis." />
              <div className="glass-panel p-5">
                <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS & GUIDES</h3>
                <div className="space-y-2">
                  {[
                    { to: '/compare', label: 'Product Comparison Tool' },
                    { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD Guide' },
                    { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                    { to: '/for-architects', label: 'For Architects & Consultants' },
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
