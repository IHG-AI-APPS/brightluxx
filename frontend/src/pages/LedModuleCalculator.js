import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid3X3, Ruler, Monitor, Zap, Weight, Eye, Maximize, Info, RotateCcw } from 'lucide-react';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';
import QuickInquiry from '../components/QuickInquiry';

const MODULE_PRESETS = [
  { label: '250 x 250 mm', w: 250, h: 250, type: 'Indoor Standard' },
  { label: '320 x 160 mm', w: 320, h: 160, type: 'Indoor Fine Pitch' },
  { label: '480 x 480 mm', w: 480, h: 480, type: 'Indoor Cabinet' },
  { label: '500 x 500 mm', w: 500, h: 500, type: 'Indoor / Rental' },
  { label: '500 x 1000 mm', w: 500, h: 1000, type: 'Rental / Outdoor' },
  { label: '640 x 640 mm', w: 640, h: 640, type: 'Outdoor Standard' },
  { label: '960 x 960 mm', w: 960, h: 960, type: 'Outdoor Large' },
  { label: '1000 x 1000 mm', w: 1000, h: 1000, type: 'Outdoor Billboard' },
];

const PITCH_OPTIONS = [
  { value: 0.7, label: 'P0.7', power: 180, weight: 8 },
  { value: 0.9, label: 'P0.9', power: 200, weight: 9 },
  { value: 1.2, label: 'P1.2', power: 220, weight: 10 },
  { value: 1.5, label: 'P1.5', power: 250, weight: 12 },
  { value: 1.9, label: 'P1.9', power: 280, weight: 14 },
  { value: 2.5, label: 'P2.5', power: 320, weight: 18 },
  { value: 3.0, label: 'P3', power: 350, weight: 20 },
  { value: 3.9, label: 'P3.9', power: 400, weight: 22 },
  { value: 4.0, label: 'P4', power: 420, weight: 24 },
  { value: 4.8, label: 'P4.8', power: 450, weight: 28 },
  { value: 5.0, label: 'P5', power: 460, weight: 30 },
  { value: 6.0, label: 'P6', power: 500, weight: 32 },
  { value: 8.0, label: 'P8', power: 550, weight: 35 },
  { value: 10.0, label: 'P10', power: 600, weight: 38 },
];

const FAQS = [
  { q: 'What is an LED module?', a: 'An LED module is the smallest building block of an LED display, consisting of a PCB board populated with LEDs arranged at a specific pixel pitch. Modules are assembled into cabinets (panels), and multiple cabinets form the complete display wall. Common module sizes include 250x250mm and 320x160mm for indoor, and 320x160mm or larger for outdoor.' },
  { q: 'What is an LED cabinet (panel)?', a: 'An LED cabinet (or panel) is a structural unit containing multiple LED modules, a power supply, and a receiving card. Cabinets are the primary unit used for installation. Common sizes include 500x500mm and 640x640mm. The cabinet size determines the modular grid for your LED wall and affects the achievable screen dimensions.' },
  { q: 'Why does module size matter?', a: 'Module/cabinet size determines the exact achievable dimensions of your LED wall, since screens must be built in whole-module increments. For example, with 500x500mm cabinets, your screen width can only be 500mm, 1000mm, 1500mm, etc. This calculator helps you find the optimal layout to match your desired size as closely as possible.' },
  { q: 'How do I calculate resolution?', a: 'Resolution is determined by dividing the total screen dimension (in mm) by the pixel pitch (in mm). For example, a 3000mm wide screen with P2.5 pitch has a horizontal resolution of 3000 ÷ 2.5 = 1,200 pixels. The calculator automatically computes this for both width and height.' },
  { q: 'What pixel pitch should I choose?', a: 'Pixel pitch depends primarily on viewing distance: the closer viewers stand, the finer the pitch needed. For control rooms (1-2m viewing), use P0.7-P1.2. For boardrooms (2-4m), P1.5-P2.5. For retail and lobbies (3-8m), P2.5-P4. For outdoor (5m+), P4-P10. Use our Viewing Distance Calculator for precise recommendations.' },
  { q: 'How is power consumption estimated?', a: 'Power consumption depends on pixel pitch, brightness, and content. Finer pitch displays (P0.7-P1.5) typically consume 180-280W per sqm at average brightness. Standard indoor (P2.5-P4) ranges 300-450W/sqm. Outdoor high-brightness displays can reach 500-700W/sqm. This calculator uses average brightness values for estimation. Always verify with manufacturer specs for MEP planning.' },
];

const REFERENCE_TABLE = [
  { pitch: 'P0.7', modSize: '320x160', cabSize: '480x480', resPerCab: '686x686', use: 'Control rooms, broadcast' },
  { pitch: 'P0.9', modSize: '320x160', cabSize: '480x480', resPerCab: '533x533', use: 'Command centres, boardrooms' },
  { pitch: 'P1.2', modSize: '250x250', cabSize: '500x500', resPerCab: '417x417', use: 'Corporate lobbies, showrooms' },
  { pitch: 'P1.5', modSize: '250x250', cabSize: '500x500', resPerCab: '333x333', use: 'Meeting rooms, retail' },
  { pitch: 'P1.9', modSize: '250x250', cabSize: '500x500', resPerCab: '263x263', use: 'Auditoriums, museums' },
  { pitch: 'P2.5', modSize: '320x160', cabSize: '640x640', resPerCab: '256x256', use: 'Large venues, houses of worship' },
  { pitch: 'P3.9', modSize: '250x250', cabSize: '500x500', resPerCab: '128x128', use: 'Events, rental, stages' },
  { pitch: 'P4.8', modSize: '250x250', cabSize: '500x1000', resPerCab: '104x208', use: 'Outdoor signage, stadiums' },
  { pitch: 'P6', modSize: '192x192', cabSize: '960x960', resPerCab: '160x160', use: 'Outdoor advertising' },
  { pitch: 'P8', modSize: '256x128', cabSize: '1024x1024', resPerCab: '128x128', use: 'Highway billboards' },
  { pitch: 'P10', modSize: '320x160', cabSize: '960x960', resPerCab: '96x96', use: 'Building-top, media facades' },
];

function calculate(targetW, targetH, modW, modH, pitchMm, powerPerSqm, weightPerSqm) {
  const modsWide = Math.ceil(targetW / modW);
  const modsHigh = Math.ceil(targetH / modH);
  const totalModules = modsWide * modsHigh;

  const actualW = modsWide * modW;
  const actualH = modsHigh * modH;
  const areaSqm = (actualW * actualH) / 1_000_000;

  const resW = Math.floor(actualW / pitchMm);
  const resH = Math.floor(actualH / pitchMm);
  const totalPixels = resW * resH;

  const isFHD = resW >= 1920 && resH >= 1080;
  const is4K = resW >= 3840 && resH >= 2160;

  const aspectRatio = actualW / actualH;
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(modsWide, modsHigh);
  const ratioW = modsWide / g;
  const ratioH = modsHigh / g;

  const maxPower = powerPerSqm * areaSqm;
  const avgPower = maxPower * 0.6;
  const weight = weightPerSqm * areaSqm;

  const minViewing = pitchMm;
  const optimalViewing = pitchMm * 3;
  const maxViewing = pitchMm * 8;

  return {
    modsWide, modsHigh, totalModules,
    actualW, actualH, areaSqm,
    resW, resH, totalPixels, isFHD, is4K,
    aspectRatio, ratioW, ratioH,
    maxPower, avgPower, weight,
    minViewing, optimalViewing, maxViewing,
  };
}

function ResultCard({ label, value, unit, icon: Icon, sub, testId }) {
  return (
    <div className="glass-panel p-4" data-testid={testId}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={14} className="text-[var(--blx-gold-3)]" />}
        <span className="text-[10px] tracking-[0.15em] text-[var(--blx-text-2)] font-bold">{label}</span>
      </div>
      <div className="text-lg font-bold">{value} <span className="text-xs text-[var(--blx-text-2)] font-normal">{unit}</span></div>
      {sub && <div className="text-[10px] text-[var(--blx-text-2)] mt-1">{sub}</div>}
    </div>
  );
}

function ModuleGrid({ modsWide, modsHigh }) {
  const maxCols = Math.min(modsWide, 20);
  const maxRows = Math.min(modsHigh, 12);
  const scaleW = modsWide > 20 ? 20 / modsWide : 1;
  const scaleH = modsHigh > 12 ? 12 / modsHigh : 1;
  const cols = Math.round(modsWide * Math.min(scaleW, scaleH));
  const rows = Math.round(modsHigh * Math.min(scaleW, scaleH));

  return (
    <div className="glass-panel p-5" data-testid="module-grid-visual">
      <div className="text-[10px] tracking-[0.15em] text-[var(--blx-gold-3)] font-bold mb-3">LAYOUT PREVIEW</div>
      <div className="flex justify-center">
        <div
          className="inline-grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${cols || 1}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: (cols || 1) * (rows || 1) }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-[2px] border border-[var(--blx-gold-3)]/20"
              style={{ background: 'rgba(229,197,116,0.06)' }}
            />
          ))}
        </div>
      </div>
      <div className="text-center mt-3 text-[10px] text-[var(--blx-text-2)]">
        {modsWide} wide x {modsHigh} high = {modsWide * modsHigh} modules/cabinets
      </div>
    </div>
  );
}

export default function LedModuleCalculator() {
  const [targetW, setTargetW] = useState(3000);
  const [targetH, setTargetH] = useState(2000);
  const [unit, setUnit] = useState('mm');
  const [moduleIdx, setModuleIdx] = useState(3); // 500x500 default
  const [pitchIdx, setPitchIdx] = useState(5);   // P2.5 default

  const mod = MODULE_PRESETS[moduleIdx];
  const pitch = PITCH_OPTIONS[pitchIdx];

  const toMm = (v) => unit === 'mm' ? v : unit === 'cm' ? v * 10 : v * 304.8;

  const results = useMemo(() => {
    const wMm = toMm(targetW);
    const hMm = toMm(targetH);
    if (wMm <= 0 || hMm <= 0) return null;
    return calculate(wMm, hMm, mod.w, mod.h, pitch.value, pitch.power, pitch.weight);
  }, [targetW, targetH, unit, moduleIdx, pitchIdx]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  const handleReset = () => {
    setTargetW(3000); setTargetH(2000); setUnit('mm');
    setModuleIdx(3); setPitchIdx(5);
  };

  return (
    <div className="pb-20" data-testid="led-module-calculator">
      <SEO
        title="LED Module & Cabinet Size Calculator"
        description="Calculate the exact number of LED modules or cabinets needed for your screen. Get resolution, power, weight, and layout visualization instantly. Free tool for specifiers and engineers."
        path="/led-calculator"
        jsonLd={faqJsonLd}
      />
      <QuickInquiry pageName="LED Module Calculator" />

      {/* Hero */}
      <div className="relative py-16 sm:py-20" style={{ background: 'linear-gradient(180deg, rgba(229,197,116,0.03) 0%, transparent 100%)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Grid3X3 size={16} className="text-[var(--blx-gold-3)]" />
            <span className="text-xs tracking-[0.2em] text-[var(--blx-gold-3)] font-bold">LED SIZING TOOL</span>
          </div>
          <h1 data-testid="led-calculator-title">LED Module & Cabinet Calculator</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-3 tracking-wider leading-relaxed max-w-2xl">
            Calculate the exact number of modules or cabinets needed for your desired screen size. Get resolution, power requirements, weight estimates, and a visual layout — all in one tool.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Panel */}
            <div className="glass-panel p-6 sm:p-8" data-testid="calculator-input-panel">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold tracking-wider">Screen Dimensions</h2>
                <button onClick={handleReset} className="btn-glass text-[10px] px-3 py-1.5 flex items-center gap-1.5" data-testid="reset-calculator">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Unit selector */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-[var(--blx-text-2)] tracking-wider">Unit:</span>
                <div className="flex gap-1">
                  {['mm', 'cm', 'ft'].map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider transition-all duration-200 ${
                        unit === u ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B]' : 'glass-panel hover:border-[var(--blx-gold-2)]'
                      }`}
                      data-testid={`unit-${u}`}
                    >
                      {u.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-xs font-bold mb-1.5 tracking-wider">
                    Target Width ({unit})
                  </label>
                  <input
                    type="number"
                    value={targetW}
                    onChange={(e) => setTargetW(Number(e.target.value))}
                    className="input-luxury w-full"
                    min="0"
                    step={unit === 'ft' ? 0.5 : unit === 'cm' ? 10 : 100}
                    data-testid="input-target-width"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 tracking-wider">
                    Target Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={targetH}
                    onChange={(e) => setTargetH(Number(e.target.value))}
                    className="input-luxury w-full"
                    min="0"
                    step={unit === 'ft' ? 0.5 : unit === 'cm' ? 10 : 100}
                    data-testid="input-target-height"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-xs font-bold mb-1.5 tracking-wider">Module / Cabinet Size</label>
                  <select
                    value={moduleIdx}
                    onChange={(e) => setModuleIdx(Number(e.target.value))}
                    className="input-luxury w-full"
                    data-testid="select-module-size"
                  >
                    {MODULE_PRESETS.map((m, i) => (
                      <option key={i} value={i}>{m.label} — {m.type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 tracking-wider">Pixel Pitch</label>
                  <select
                    value={pitchIdx}
                    onChange={(e) => setPitchIdx(Number(e.target.value))}
                    className="input-luxury w-full"
                    data-testid="select-pixel-pitch"
                  >
                    {PITCH_OPTIONS.map((p, i) => (
                      <option key={i} value={i}>{p.label} ({p.value}mm)</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dimension hint */}
              <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(229,197,116,0.04)', border: '1px solid rgba(229,197,116,0.1)' }}>
                <Info size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">
                  LED screens are built in whole-module increments. The actual size may differ slightly from your target to accommodate complete modules.
                </p>
              </div>
            </div>

            {/* Results */}
            {results && (
              <>
                <div className="glass-panel p-6 sm:p-8" data-testid="calculator-results">
                  <h2 className="text-base font-bold tracking-wider mb-6">Calculated Results</h2>

                  {/* Module count */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <ResultCard
                      icon={Grid3X3} label="MODULES WIDE" value={results.modsWide} unit="units"
                      testId="result-modules-wide"
                    />
                    <ResultCard
                      icon={Grid3X3} label="MODULES HIGH" value={results.modsHigh} unit="units"
                      testId="result-modules-high"
                    />
                    <ResultCard
                      icon={Grid3X3} label="TOTAL MODULES" value={results.totalModules} unit="units"
                      sub={`${results.modsWide} x ${results.modsHigh} grid`}
                      testId="result-total-modules"
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <ResultCard
                      icon={Ruler} label="ACTUAL WIDTH" value={(results.actualW / 1000).toFixed(2)} unit="m"
                      sub={`${results.actualW} mm`}
                      testId="result-actual-width"
                    />
                    <ResultCard
                      icon={Ruler} label="ACTUAL HEIGHT" value={(results.actualH / 1000).toFixed(2)} unit="m"
                      sub={`${results.actualH} mm`}
                      testId="result-actual-height"
                    />
                    <ResultCard
                      icon={Maximize} label="SCREEN AREA" value={results.areaSqm.toFixed(2)} unit="sqm"
                      sub={`Aspect ~${results.ratioW}:${results.ratioH}`}
                      testId="result-screen-area"
                    />
                  </div>

                  {/* Resolution */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <ResultCard
                      icon={Monitor} label="RESOLUTION" value={`${results.resW} x ${results.resH}`} unit="px"
                      sub={results.is4K ? '4K+ Ultra HD' : results.isFHD ? 'Full HD+' : `${(results.totalPixels / 1_000_000).toFixed(2)} MP`}
                      testId="result-resolution"
                    />
                    <ResultCard
                      icon={Monitor} label="TOTAL PIXELS" value={(results.totalPixels / 1_000_000).toFixed(2)} unit="megapixels"
                      testId="result-total-pixels"
                    />
                    <ResultCard
                      icon={Monitor} label="PIXEL PITCH" value={pitch.value} unit="mm"
                      sub={pitch.label}
                      testId="result-pixel-pitch"
                    />
                  </div>

                  {/* Power & Weight */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <ResultCard
                      icon={Zap} label="MAX POWER" value={results.maxPower.toFixed(0)} unit="W"
                      sub={`${(results.maxPower / 1000).toFixed(1)} kW`}
                      testId="result-max-power"
                    />
                    <ResultCard
                      icon={Zap} label="AVG POWER" value={results.avgPower.toFixed(0)} unit="W"
                      sub={`At ~60% brightness`}
                      testId="result-avg-power"
                    />
                    <ResultCard
                      icon={Weight} label="ESTIMATED WEIGHT" value={results.weight.toFixed(0)} unit="kg"
                      sub={`~${(results.weight / results.areaSqm).toFixed(0)} kg/sqm`}
                      testId="result-weight"
                    />
                  </div>

                  {/* Viewing Distance */}
                  <div className="grid grid-cols-3 gap-3">
                    <ResultCard
                      icon={Eye} label="MIN DISTANCE" value={results.minViewing.toFixed(1)} unit="m"
                      testId="result-min-distance"
                    />
                    <ResultCard
                      icon={Eye} label="OPTIMAL DISTANCE" value={results.optimalViewing.toFixed(1)} unit="m"
                      testId="result-optimal-distance"
                    />
                    <ResultCard
                      icon={Eye} label="MAX DISTANCE" value={results.maxViewing.toFixed(1)} unit="m"
                      testId="result-max-distance"
                    />
                  </div>
                </div>

                {/* Visual Grid */}
                <ModuleGrid modsWide={results.modsWide} modsHigh={results.modsHigh} />
              </>
            )}

            <SectionDivider />

            {/* Reference Table */}
            <div className="glass-panel overflow-hidden" data-testid="reference-table">
              <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">COMMON MODULE & CABINET SIZES</div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[var(--blx-border)]">
                      <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-[var(--blx-text-2)]">PITCH</th>
                      <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-[var(--blx-text-2)]">MODULE SIZE</th>
                      <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-[var(--blx-text-2)]">CABINET SIZE</th>
                      <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-[var(--blx-text-2)]">RES / CAB</th>
                      <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-[var(--blx-text-2)]">TYPICAL USE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REFERENCE_TABLE.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--blx-border)]/50 hover:bg-[var(--blx-gold-3)]/3 transition-colors">
                        <td className="px-4 py-2.5 font-bold text-[var(--blx-gold-3)]">{row.pitch}</td>
                        <td className="px-4 py-2.5 text-[var(--blx-text-2)]">{row.modSize}</td>
                        <td className="px-4 py-2.5 text-[var(--blx-text-2)]">{row.cabSize}</td>
                        <td className="px-4 py-2.5 text-[var(--blx-text-2)]">{row.resPerCab}</td>
                        <td className="px-4 py-2.5 text-[var(--blx-text-2)]">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <SectionDivider />

            {/* How It Works */}
            <div className="space-y-4" data-testid="how-it-works">
              <h2 className="text-base font-bold tracking-wider mb-4">How the Calculator Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: '01', title: 'Enter Dimensions', desc: 'Input your target screen width and height in mm, cm, or ft. Select your preferred module/cabinet size and pixel pitch.' },
                  { step: '02', title: 'Auto-Calculate', desc: 'The tool calculates the number of modules, actual dimensions (rounded to whole modules), total resolution, power draw, and weight.' },
                  { step: '03', title: 'Review & Specify', desc: 'Use the results for BOQ preparation, MEP planning, and structural load calculations. Download a spec pack for detailed documentation.' },
                ].map((s) => (
                  <div key={s.step} className="glass-panel p-5">
                    <span className="text-[10px] font-bold tracking-wider text-[var(--blx-gold-3)]">STEP {s.step}</span>
                    <h3 className="text-xs font-bold mt-2 mb-1.5">{s.title}</h3>
                    <p className="text-[11px] text-[var(--blx-text-2)] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <SectionDivider />

            {/* FAQs */}
            <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SpecPackCTA />

            <div className="glass-panel p-5" data-testid="related-tools">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS</h3>
              <div className="space-y-2">
                {[
                  { name: 'Screen Calculator', path: '/calculator', desc: 'Pixel pitch & resolution' },
                  { name: 'Viewing Distance', path: '/viewing-distance', desc: 'Pitch vs. distance' },
                  { name: 'Power Estimator', path: '/power-estimator', desc: 'Electrical load & HVAC' },
                  { name: 'Budget Estimator', path: '/budget-estimator', desc: 'Project cost estimates' },
                  { name: 'Installation Guide', path: '/installation-guide', desc: 'Mounting methods' },
                  { name: 'Project Planner', path: '/project-planner', desc: 'Full spec workflow' },
                ].map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--blx-gold-3)]/3 transition-colors group"
                    data-testid={`related-tool-${tool.path.slice(1)}`}
                  >
                    <div>
                      <div className="text-xs font-bold tracking-wider">{tool.name}</div>
                      <div className="text-[10px] text-[var(--blx-text-2)]">{tool.desc}</div>
                    </div>
                    <ArrowRight size={14} className="text-[var(--blx-text-2)] group-hover:text-[var(--blx-gold-3)] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5" style={{ borderColor: 'var(--blx-gold-2)', borderWidth: '2px' }} data-testid="design-assist-cta">
              <h3 className="text-sm font-bold mb-2">Need Help Specifying?</h3>
              <p className="text-[11px] text-[var(--blx-text-2)] mb-4 leading-relaxed">
                Our engineers can review your layout and recommend the optimal module configuration for your project.
              </p>
              <Link to="/design-assist" className="btn-gold w-full text-center flex items-center justify-center gap-2 text-xs" data-testid="design-assist-link">
                Free Design Assist <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
