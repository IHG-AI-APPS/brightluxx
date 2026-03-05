import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight, Download, MessageCircle, CheckCircle2, Zap, Eye, Ruler, DollarSign, Layers, Send } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

const APPLICATIONS = [
  { id: 'corporate-lobby', label: 'Corporate Lobby' },
  { id: 'boardroom', label: 'Boardroom / Meeting Room' },
  { id: 'retail-store', label: 'Retail / Flagship Store' },
  { id: 'hospitality', label: 'Hotel / Restaurant' },
  { id: 'control-room', label: 'Control / Command Room' },
  { id: 'museum-gallery', label: 'Museum / Gallery' },
  { id: 'auditorium', label: 'Auditorium / Event Hall' },
  { id: 'outdoor-signage', label: 'Outdoor Signage / Billboard' },
  { id: 'stadium', label: 'Stadium / Sports Venue' },
  { id: 'house-of-worship', label: 'House of Worship' },
];

const PITCHES = [0.9, 1.2, 1.5, 1.9, 2.5, 3.9, 4.8, 6.0, 8.0, 10.0, 16.0];
const PITCH_POWER = {
  0.9: { maxW: 620, avgW: 220, tech: 'COB MicroLED', cost: 3500 },
  1.2: { maxW: 550, avgW: 195, tech: 'COB / MiP', cost: 2800 },
  1.5: { maxW: 480, avgW: 170, tech: 'MiP / SMD', cost: 2200 },
  1.9: { maxW: 420, avgW: 150, tech: 'MiP / SMD', cost: 1800 },
  2.5: { maxW: 360, avgW: 130, tech: 'SMD', cost: 1400 },
  3.9: { maxW: 300, avgW: 110, tech: 'SMD', cost: 900 },
  4.8: { maxW: 280, avgW: 100, tech: 'SMD', cost: 700 },
  6.0: { maxW: 450, avgW: 160, tech: 'SMD Outdoor', cost: 600 },
  8.0: { maxW: 500, avgW: 180, tech: 'SMD Outdoor', cost: 500 },
  10.0: { maxW: 550, avgW: 200, tech: 'SMD Outdoor', cost: 400 },
  16.0: { maxW: 600, avgW: 220, tech: 'SMD Outdoor', cost: 350 },
};

function calcSpec(p) {
  const cMult = p.contentType === 'text' ? 0.8 : p.contentType === 'video' ? 1.2 : 1.0;
  const idealPitch = p.viewingDistance / (3.0 * cMult);
  const best = PITCHES.reduce((a, b) => Math.abs(b - idealPitch) < Math.abs(a - idealPitch) ? b : a);
  const premium = PITCHES.filter(x => x < best).reduce((a, b) => Math.abs(b - idealPitch) < Math.abs(a - idealPitch) ? b : a, best);
  const pw = PITCH_POWER[best];
  const area = p.width * p.height;
  const bF = p.brightness / 100;
  const maxKW = pw.maxW * area / 1000;
  const avgKW = pw.avgW * area * bF / 1000;
  const dailyKWh = avgKW * p.hoursPerDay;
  const monthlyAED = dailyKWh * 30 * 0.29;
  const annualAED = dailyKWh * 365 * 0.29;
  const heatBTU = pw.maxW * area * 3.412;
  const maxAmps = pw.maxW * area / 220;
  const breaker = Math.ceil(maxAmps * 1.25 / 5) * 5;
  const sizeCat = area < 10 ? 'small' : area > 30 ? 'large' : 'medium';
  const env = p.environment;
  const methods = { indoor: { small: 'Wall-Mounted', medium: 'Wall-Mounted or Recessed', large: 'Wall-Mounted with Steel Subframe' }, outdoor: { small: 'Wall-Mounted (IP65)', medium: 'Ground-Supported', large: 'Ground-Supported with Foundation' } };
  const install = (methods[env] || methods.indoor)[sizeCat];
  const bLow = pw.cost * area * 0.8;
  const bHigh = pw.cost * area * 1.3;
  return { idealPitch: idealPitch.toFixed(1), best, premium, tech: pw.tech, area: area.toFixed(1), maxKW: maxKW.toFixed(1), avgKW: avgKW.toFixed(1), dailyKWh: dailyKWh.toFixed(1), monthlyAED: Math.round(monthlyAED), annualAED: Math.round(annualAED), heatBTU: Math.round(heatBTU), heatTons: (heatBTU / 12000).toFixed(1), maxAmps: maxAmps.toFixed(1), breaker, install, bLow: Math.round(bLow), bHigh: Math.round(bHigh), totalLow: Math.round(bLow * 1.25 + 3000), totalHigh: Math.round(bHigh * 1.25 + 8000), minView: (best * 1).toFixed(1), optView: (best * 3).toFixed(1), maxView: (best * 8).toFixed(1) };
}

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8" data-testid="step-indicator">
      {Array.from({ length: total }, (_, i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < current ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B]' : i === current ? 'border-2 border-[var(--blx-gold-3)] text-[var(--blx-gold-3)]' : 'border border-[var(--blx-border)] text-[var(--blx-muted)]'}`}>
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          {i < total - 1 && <div className={`flex-1 h-px ${i < current ? 'bg-[var(--blx-gold-3)]' : 'bg-[var(--blx-border)]'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function ProjectPlanner() {
  const [step, setStep] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [p, setP] = useState({
    projectName: '',
    application: 'corporate-lobby',
    environment: 'indoor',
    width: 4,
    height: 2.5,
    viewingDistance: 5,
    contentType: 'mixed',
    hoursPerDay: 12,
    brightness: 70,
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const upd = (k, v) => setP(prev => ({ ...prev, [k]: v }));
  const spec = useMemo(() => calcSpec(p), [p]);

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`${API}/api/project-planner/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_name: p.projectName || 'LED Display Project',
          application: p.application,
          environment: p.environment,
          width: p.width,
          height: p.height,
          viewing_distance: p.viewingDistance,
          content_type: p.contentType,
          hours_per_day: p.hoursPerDay,
          brightness: p.brightness,
          name: p.name,
          email: p.email,
          phone: p.phone,
          company: p.company,
        }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Brightluxx_Project_Spec_${(p.projectName || 'Project').replace(/\s+/g, '_')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="pb-20" data-testid="project-planner">
      <SEO
        title="LED Project Planner — Complete Specification Generator | Brightluxx"
        description="Enter your project details once and get a complete LED display specification: recommended pixel pitch, power requirements, installation method, and budgetary estimate in a downloadable PDF."
        path="/project-planner"
      />

      {/* Hero */}
      <div className="relative pt-24 pb-10">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 relative">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER TOOL</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-3">
            Project Planner
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed">
            Enter your project details once — get a complete specification including pixel pitch, power requirements, installation method, and budgetary estimate. Download as a professional PDF.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <StepIndicator current={step} total={4} />

        {/* Step 0: Project Basics */}
        {step === 0 && (
          <div className="glass-panel p-6 sm:p-8" data-testid="step-0">
            <h2 className="text-base font-bold tracking-wider mb-6">Project Details</h2>
            <div className="space-y-5">
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">PROJECT NAME (OPTIONAL)</label>
                <input type="text" placeholder="e.g. Dubai Mall Flagship Store" value={p.projectName} onChange={e => upd('projectName', e.target.value)} className="input-luxury w-full text-sm py-3 px-4" data-testid="input-project-name" />
              </div>
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">APPLICATION TYPE</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {APPLICATIONS.map(a => (
                    <button key={a.id} onClick={() => upd('application', a.id)} className={`p-3 rounded-xl text-xs font-bold tracking-wider text-left transition-all ${p.application === a.id ? 'bg-[rgba(229,197,116,0.1)] border border-[rgba(229,197,116,0.2)] text-[var(--blx-gold-3)]' : 'bg-[rgba(255,255,255,0.03)] border border-[var(--blx-border)] text-[var(--blx-text-2)] hover:border-[var(--blx-border-2)]'}`} data-testid={`app-${a.id}`}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">ENVIRONMENT</label>
                <div className="flex gap-3">
                  {['indoor', 'outdoor'].map(env => (
                    <button key={env} onClick={() => upd('environment', env)} className={`flex-1 p-3 rounded-xl text-xs font-bold tracking-wider text-center transition-all ${p.environment === env ? 'bg-[rgba(229,197,116,0.1)] border border-[rgba(229,197,116,0.2)] text-[var(--blx-gold-3)]' : 'bg-[rgba(255,255,255,0.03)] border border-[var(--blx-border)] text-[var(--blx-text-2)]'}`} data-testid={`env-${env}`}>
                      {env.charAt(0).toUpperCase() + env.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setStep(1)} className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="next-step-1">
                Display Size <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Dimensions */}
        {step === 1 && (
          <div className="glass-panel p-6 sm:p-8" data-testid="step-1">
            <h2 className="text-base font-bold tracking-wider mb-6">Display Dimensions & Viewing</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">WIDTH (METERS)</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0.5" max="20" step="0.5" value={p.width} onChange={e => upd('width', parseFloat(e.target.value))} className="flex-1 accent-[var(--blx-gold-3)]" data-testid="slider-width" />
                    <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center">{p.width}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">HEIGHT (METERS)</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0.5" max="12" step="0.5" value={p.height} onChange={e => upd('height', parseFloat(e.target.value))} className="flex-1 accent-[var(--blx-gold-3)]" data-testid="slider-height" />
                    <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center">{p.height}</span>
                  </div>
                </div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(229,197,116,0.04)' }}>
                <span className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">DISPLAY AREA: </span>
                <span className="text-lg font-bold text-[var(--blx-gold-3)]" data-testid="display-area">{(p.width * p.height).toFixed(1)}</span>
                <span className="text-xs text-[var(--blx-muted)] ml-1">m²</span>
              </div>
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">VIEWING DISTANCE (METERS)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0.5" max="100" step="0.5" value={p.viewingDistance} onChange={e => upd('viewingDistance', parseFloat(e.target.value))} className="flex-1 accent-[var(--blx-gold-3)]" data-testid="slider-distance" />
                  <span className="text-xl font-bold text-[var(--blx-gold-3)] w-16 text-center">{p.viewingDistance}m</span>
                </div>
                <div className="text-[0.5rem] text-[var(--blx-muted)] mt-1">Distance from the closest typical viewer to the display</div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(0)} className="btn-glass px-5 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={() => setStep(2)} className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="next-step-2">
                Usage & Content <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Usage */}
        {step === 2 && (
          <div className="glass-panel p-6 sm:p-8" data-testid="step-2">
            <h2 className="text-base font-bold tracking-wider mb-6">Usage & Content</h2>
            <div className="space-y-6">
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">CONTENT TYPE</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[{ id: 'text', l: 'Text / Data', d: 'Dashboards, menus' }, { id: 'mixed', l: 'Mixed', d: 'Text + video, general' }, { id: 'video', l: 'Video / Cinematic', d: 'Full-motion video' }].map(ct => (
                    <button key={ct.id} onClick={() => upd('contentType', ct.id)} className={`flex-1 p-3 rounded-xl text-center transition-all ${p.contentType === ct.id ? 'bg-[rgba(229,197,116,0.1)] border border-[rgba(229,197,116,0.2)]' : 'bg-[rgba(255,255,255,0.03)] border border-[var(--blx-border)]'}`} data-testid={`ct-${ct.id}`}>
                      <div className={`text-[0.625rem] font-bold tracking-wider ${p.contentType === ct.id ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{ct.l}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] mt-0.5">{ct.d}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">OPERATING HOURS PER DAY</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="1" max="24" step="1" value={p.hoursPerDay} onChange={e => upd('hoursPerDay', parseInt(e.target.value))} className="flex-1 accent-[var(--blx-gold-3)]" data-testid="slider-hours" />
                  <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center">{p.hoursPerDay}h</span>
                </div>
              </div>
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-2 block">AVERAGE BRIGHTNESS</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="10" max="100" step="5" value={p.brightness} onChange={e => upd('brightness', parseInt(e.target.value))} className="flex-1 accent-[var(--blx-gold-3)]" data-testid="slider-brightness" />
                  <span className="text-xl font-bold text-[var(--blx-gold-3)] w-14 text-center">{p.brightness}%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="btn-glass px-5 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={() => setStep(3)} className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="next-step-3">
                View Results <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div data-testid="step-3">
            {/* Summary Header */}
            <div className="glass-panel p-6 sm:p-8 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold tracking-wider">Your LED Specification</h2>
                <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">{p.projectName || 'LED DISPLAY PROJECT'}</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">SIZE</div>
                  <div className="text-sm font-bold">{p.width}m x {p.height}m</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)]">{spec.area} m²</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">DISTANCE</div>
                  <div className="text-sm font-bold">{p.viewingDistance}m</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)]">{p.contentType} content</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">APPLICATION</div>
                  <div className="text-sm font-bold">{p.application.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)]">{p.environment}</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">USAGE</div>
                  <div className="text-sm font-bold">{p.hoursPerDay}h/day</div>
                  <div className="text-[0.5rem] text-[var(--blx-muted)]">{p.brightness}% brightness</div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {/* Pixel Pitch */}
              <div className="glass-panel p-5">
                <div className="flex items-center gap-2 text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4"><Eye size={12} /> RECOMMENDED PIXEL PITCH</div>
                <div className="text-center p-4 rounded-xl mb-3" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.15)' }}>
                  <div className="text-3xl font-bold text-[var(--blx-gold-3)]" data-testid="result-pitch">P{spec.best}</div>
                  <div className="text-xs text-[var(--blx-text-2)]">{spec.tech}</div>
                </div>
                <div className="space-y-1.5 text-[0.6875rem] text-[var(--blx-text-2)]">
                  <div className="flex justify-between"><span>Premium option:</span><span className="font-bold">P{spec.premium}</span></div>
                  <div className="flex justify-between"><span>Min viewing:</span><span>{spec.minView}m</span></div>
                  <div className="flex justify-between"><span>Optimal viewing:</span><span className="text-[var(--blx-gold-3)] font-bold">{spec.optView}m</span></div>
                  <div className="flex justify-between"><span>Max effective:</span><span>{spec.maxView}m</span></div>
                </div>
              </div>

              {/* Power */}
              <div className="glass-panel p-5">
                <div className="flex items-center gap-2 text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4"><Zap size={12} /> POWER REQUIREMENTS</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-[0.625rem] text-[var(--blx-muted)]">Max Power</span>
                    <span className="text-sm font-bold" data-testid="result-max-power">{spec.maxKW} kW</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg" style={{ background: 'rgba(229,197,116,0.04)' }}>
                    <span className="text-[0.625rem] text-[var(--blx-gold-3)]">Avg Power</span>
                    <span className="text-sm font-bold text-[var(--blx-gold-3)]" data-testid="result-avg-power">{spec.avgKW} kW</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-[0.625rem] text-[var(--blx-muted)]">Monthly (UAE)</span>
                    <span className="text-sm font-bold">AED {spec.monthlyAED.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-[0.625rem] text-[var(--blx-muted)]">Heat Output</span>
                    <span className="text-sm font-bold">{spec.heatBTU.toLocaleString()} BTU/h</span>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="glass-panel p-5">
                <div className="flex items-center gap-2 text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4"><Layers size={12} /> INSTALLATION METHOD</div>
                <div className="text-sm font-bold mb-3" data-testid="result-install">{spec.install}</div>
                <div className="space-y-1.5 text-[0.6875rem] text-[var(--blx-text-2)]">
                  <div className="flex justify-between"><span>Circuit breaker:</span><span className="font-bold">{spec.breaker}A</span></div>
                  <div className="flex justify-between"><span>Max current:</span><span>{spec.maxAmps}A at 220V</span></div>
                  <div className="flex justify-between"><span>Cooling needed:</span><span>{spec.heatTons} tons</span></div>
                </div>
                <Link to="/installation-guide" className="mt-3 inline-flex items-center gap-1 text-[0.5625rem] text-[var(--blx-gold-3)] font-bold tracking-wider hover:gap-2 transition-all">
                  View full installation guide <ArrowRight size={10} />
                </Link>
              </div>

              {/* Budget */}
              <div className="glass-panel p-5">
                <div className="flex items-center gap-2 text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4"><DollarSign size={12} /> BUDGETARY ESTIMATE</div>
                <div className="text-center p-4 rounded-xl mb-3" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.15)' }}>
                  <div className="text-[0.5rem] text-[var(--blx-muted)] mb-1">TOTAL PROJECT RANGE (USD)</div>
                  <div className="text-xl font-bold text-[var(--blx-gold-3)]" data-testid="result-budget">${spec.totalLow.toLocaleString()} — ${spec.totalHigh.toLocaleString()}</div>
                </div>
                <div className="space-y-1.5 text-[0.6875rem] text-[var(--blx-text-2)]">
                  <div className="flex justify-between"><span>LED hardware:</span><span>${spec.bLow.toLocaleString()} — ${spec.bHigh.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Installation:</span><span>${Math.round(spec.bLow * 0.15).toLocaleString()} — ${Math.round(spec.bHigh * 0.15).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Content system:</span><span>$3,000 — $8,000</span></div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="glass-panel p-6 sm:p-8 mb-4">
              <h3 className="text-sm font-bold tracking-wider mb-4">Download Full Specification PDF</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] mb-5">
                Enter your details to receive a branded PDF specification report with all calculations, recommendations, and budgetary estimates.
              </p>
              <p className="text-[10px] text-[var(--blx-text-2)] mb-5 leading-relaxed" data-testid="planner-disclaimer">
                Note: Budgetary estimates are indicative and cover hardware only. Installation costs and structural work are quoted separately after a site survey confirms conditions, material availability, and structural requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <input type="text" placeholder="Name *" value={p.name} onChange={e => upd('name', e.target.value)} className="input-luxury text-xs py-2.5 px-3" data-testid="pdf-name" />
                <input type="text" placeholder="Company" value={p.company} onChange={e => upd('company', e.target.value)} className="input-luxury text-xs py-2.5 px-3" data-testid="pdf-company" />
                <input type="email" placeholder="Work Email *" value={p.email} onChange={e => upd('email', e.target.value)} className="input-luxury text-xs py-2.5 px-3" data-testid="pdf-email" />
                <input type="tel" placeholder="Phone" value={p.phone} onChange={e => upd('phone', e.target.value)} className="input-luxury text-xs py-2.5 px-3" data-testid="pdf-phone" />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={downloadPDF}
                  disabled={downloading || !p.name || !p.email}
                  className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2 disabled:opacity-50"
                  data-testid="download-pdf-btn"
                >
                  {downloading ? <div className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full animate-spin" /> : <Download size={14} />}
                  Download PDF Report
                </button>
                <a
                  href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I used your Project Planner. I need a ${p.width}m x ${p.height}m P${spec.best} ${p.environment} LED display for ${p.application.replace(/-/g, ' ')}. Budget range: $${spec.totalLow.toLocaleString()}-$${spec.totalHigh.toLocaleString()}. Can you provide a detailed quotation?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2"
                  data-testid="planner-whatsapp"
                >
                  <MessageCircle size={14} /> WhatsApp with Specs
                </a>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="btn-glass px-5 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <ArrowLeft size={14} /> Adjust Parameters
              </button>
              <button onClick={() => { setStep(0); setP(prev => ({ ...prev, name: '', email: '', phone: '', company: '' })); }} className="btn-glass px-5 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                Start New Project <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
