import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid3X3, Ruler, Monitor, Zap, Scale, Eye, Maximize, Info, RotateCcw } from 'lucide-react';
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
  { q: 'What is an LED module?', a: 'An LED module is the smallest building block of an LED display, consisting of a PCB board populated with LEDs arranged at a specific pixel pitch.' },
  { q: 'What is an LED cabinet (panel)?', a: 'An LED cabinet is a structural unit containing multiple LED modules, a power supply, and a receiving card.' },
  { q: 'Why does module size matter?', a: 'Module/cabinet size determines the exact achievable dimensions of your LED wall, since screens must be built in whole-module increments.' },
  { q: 'How do I calculate resolution?', a: 'Resolution is determined by dividing the total screen dimension (in mm) by the pixel pitch (in mm).' },
];

const REFERENCE_TABLE = [
  { pitch: 'P0.7', modSize: '320x160', cabSize: '480x480', resPerCab: '686x686', use: 'Control rooms, broadcast' },
  { pitch: 'P0.9', modSize: '320x160', cabSize: '480x480', resPerCab: '533x533', use: 'Command centres, boardrooms' },
  { pitch: 'P1.2', modSize: '250x250', cabSize: '500x500', resPerCab: '417x417', use: 'Corporate lobbies, showrooms' },
  { pitch: 'P1.5', modSize: '250x250', cabSize: '500x500', resPerCab: '333x333', use: 'Meeting rooms, retail' },
  { pitch: 'P2.5', modSize: '320x160', cabSize: '640x640', resPerCab: '256x256', use: 'Large venues, houses of worship' },
  { pitch: 'P3.9', modSize: '250x250', cabSize: '500x500', resPerCab: '128x128', use: 'Events, rental, stages' },
  { pitch: 'P6', modSize: '192x192', cabSize: '960x960', resPerCab: '160x160', use: 'Outdoor advertising' },
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

  return { modsWide, modsHigh, totalModules, actualW, actualH, areaSqm, resW, resH, totalPixels, isFHD, is4K, ratioW, ratioH, maxPower, avgPower, weight, minViewing, optimalViewing, maxViewing };
}

function ResultCard({ label, value, unit, icon: Icon, sub, testId, accent = false }) {
  return (
    <div className={`p-4 rounded-xl ${accent ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.03] border border-white/[0.06]'}`} data-testid={testId}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={14} className={accent ? 'text-cyan-400' : 'text-gray-500'} />}
        <span className={`text-[9px] tracking-[0.15em] uppercase font-bold ${accent ? 'text-cyan-400' : 'text-gray-500'}`}>{label}</span>
      </div>
      <div className={`text-lg font-bold ${accent ? 'text-cyan-400' : 'text-white'}`}>{value} <span className="text-xs text-gray-500 font-normal">{unit}</span></div>
      {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function ModuleGrid({ modsWide, modsHigh }) {
  const scaleW = modsWide > 20 ? 20 / modsWide : 1;
  const scaleH = modsHigh > 12 ? 12 / modsHigh : 1;
  const cols = Math.round(modsWide * Math.min(scaleW, scaleH));
  const rows = Math.round(modsHigh * Math.min(scaleW, scaleH));

  return (
    <GlassCard className="p-5" data-testid="module-grid-visual">
      <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Layout Preview</span>
      <div className="flex justify-center">
        <div className="inline-grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${cols || 1}, minmax(0, 1fr))` }}>
          {Array.from({ length: (cols || 1) * (rows || 1) }).map((_, i) => (
            <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-[2px] border border-cyan-500/20 bg-cyan-500/5" />
          ))}
        </div>
      </div>
      <div className="text-center mt-3 text-xs text-gray-500">
        {modsWide} wide x {modsHigh} high = {modsWide * modsHigh} modules/cabinets
      </div>
    </GlassCard>
  );
}

export default function LedModuleCalculator() {
  const [targetW, setTargetW] = useState(3000);
  const [targetH, setTargetH] = useState(2000);
  const [unit, setUnit] = useState('mm');
  const [moduleIdx, setModuleIdx] = useState(3);
  const [pitchIdx, setPitchIdx] = useState(5);

  const mod = MODULE_PRESETS[moduleIdx];
  const pitch = PITCH_OPTIONS[pitchIdx];
  const toMm = useCallback((v) => unit === 'mm' ? v : unit === 'cm' ? v * 10 : v * 304.8, [unit]);

  const results = useMemo(() => {
    const wMm = toMm(targetW);
    const hMm = toMm(targetH);
    if (wMm <= 0 || hMm <= 0) return null;
    return calculate(wMm, hMm, mod.w, mod.h, pitch.value, pitch.power, pitch.weight);
  }, [targetW, targetH, toMm, mod.w, mod.h, pitch.value, pitch.power, pitch.weight]);

  const faqJsonLd = buildFaqJsonLd(FAQS);
  const handleReset = () => { setTargetW(3000); setTargetH(2000); setUnit('mm'); setModuleIdx(3); setPitchIdx(5); };

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="led-module-calculator">
      <SEO
        title="LED Module & Cabinet Size Calculator"
        description="Calculate the exact number of LED modules or cabinets needed for your screen. Get resolution, power, weight, and layout visualization."
        path="/led-calculator"
        jsonLd={faqJsonLd}
      />
      <QuickInquiry pageName="LED Module Calculator" />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="flex items-center gap-2 mb-4">
              <Grid3X3 size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">LED Sizing Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" data-testid="led-calculator-title">
              Module
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-3">Calculator</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Calculate the exact number of modules or cabinets needed for your desired screen size. Get resolution, power, weight estimates, and a visual layout.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <FadeInSection delay={1}>
                <GlassCard className="p-6 md:p-8" data-testid="calculator-input-panel">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold tracking-wider text-white">Screen Dimensions</h2>
                    <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-gray-400 bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all" data-testid="reset-calculator">
                      <RotateCcw size={12} /> Reset
                    </button>
                  </div>

                  {/* Unit selector */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-gray-500 tracking-wider">Unit:</span>
                    <div className="flex gap-2">
                      {['mm', 'cm', 'ft'].map((u) => (
                        <button
                          key={u}
                          onClick={() => setUnit(u)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                            unit === u ? 'bg-cyan-500 text-black' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:border-white/20'
                          }`}
                          data-testid={`unit-${u}`}
                        >
                          {u.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-xs font-bold mb-2 tracking-wider text-gray-400">Target Width ({unit})</label>
                      <input
                        type="number"
                        value={targetW}
                        onChange={(e) => setTargetW(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                        min="0"
                        data-testid="input-target-width"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 tracking-wider text-gray-400">Target Height ({unit})</label>
                      <input
                        type="number"
                        value={targetH}
                        onChange={(e) => setTargetH(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                        min="0"
                        data-testid="input-target-height"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-xs font-bold mb-2 tracking-wider text-gray-400">Module / Cabinet Size</label>
                      <select
                        value={moduleIdx}
                        onChange={(e) => setModuleIdx(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                        data-testid="select-module-size"
                      >
                        {MODULE_PRESETS.map((m, i) => (
                          <option key={i} value={i} className="bg-[#0a0a0f]">{m.label} — {m.type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 tracking-wider text-gray-400">Pixel Pitch</label>
                      <select
                        value={pitchIdx}
                        onChange={(e) => setPitchIdx(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all"
                        data-testid="select-pixel-pitch"
                      >
                        {PITCH_OPTIONS.map((p, i) => (
                          <option key={i} value={i} className="bg-[#0a0a0f]">{p.label} ({p.value}mm)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                    <Info size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      LED screens are built in whole-module increments. The actual size may differ slightly from your target.
                    </p>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* Results */}
              {results && (
                <>
                  <FadeInSection delay={2}>
                    <GlassCard className="p-6 md:p-8" data-testid="calculator-results">
                      <h2 className="text-lg font-bold tracking-wider text-white mb-6">Calculated Results</h2>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <ResultCard icon={Grid3X3} label="Modules Wide" value={results.modsWide} unit="units" testId="result-modules-wide" />
                        <ResultCard icon={Grid3X3} label="Modules High" value={results.modsHigh} unit="units" testId="result-modules-high" />
                        <ResultCard icon={Grid3X3} label="Total Modules" value={results.totalModules} unit="units" sub={`${results.modsWide} x ${results.modsHigh} grid`} testId="result-total-modules" accent />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <ResultCard icon={Ruler} label="Actual Width" value={(results.actualW / 1000).toFixed(2)} unit="m" sub={`${results.actualW} mm`} testId="result-actual-width" />
                        <ResultCard icon={Ruler} label="Actual Height" value={(results.actualH / 1000).toFixed(2)} unit="m" sub={`${results.actualH} mm`} testId="result-actual-height" />
                        <ResultCard icon={Maximize} label="Screen Area" value={results.areaSqm.toFixed(2)} unit="sqm" sub={`Aspect ~${results.ratioW}:${results.ratioH}`} testId="result-screen-area" />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <ResultCard icon={Monitor} label="Resolution" value={`${results.resW} x ${results.resH}`} unit="px" sub={results.is4K ? '4K+ Ultra HD' : results.isFHD ? 'Full HD+' : `${(results.totalPixels / 1_000_000).toFixed(2)} MP`} testId="result-resolution" accent />
                        <ResultCard icon={Monitor} label="Total Pixels" value={(results.totalPixels / 1_000_000).toFixed(2)} unit="megapixels" testId="result-total-pixels" />
                        <ResultCard icon={Monitor} label="Pixel Pitch" value={pitch.value} unit="mm" sub={pitch.label} testId="result-pixel-pitch" />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <ResultCard icon={Zap} label="Max Power" value={results.maxPower.toFixed(0)} unit="W" sub={`${(results.maxPower / 1000).toFixed(1)} kW`} testId="result-max-power" />
                        <ResultCard icon={Zap} label="Avg Power" value={results.avgPower.toFixed(0)} unit="W" sub="At ~60% brightness" testId="result-avg-power" />
                        <ResultCard icon={Scale} label="Est. Weight" value={results.weight.toFixed(0)} unit="kg" sub={`~${(results.weight / results.areaSqm).toFixed(0)} kg/sqm`} testId="result-weight" />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <ResultCard icon={Eye} label="Min Distance" value={results.minViewing.toFixed(1)} unit="m" testId="result-min-distance" />
                        <ResultCard icon={Eye} label="Optimal" value={results.optimalViewing.toFixed(1)} unit="m" testId="result-optimal-distance" accent />
                        <ResultCard icon={Eye} label="Max Distance" value={results.maxViewing.toFixed(1)} unit="m" testId="result-max-distance" />
                      </div>
                    </GlassCard>
                  </FadeInSection>

                  <FadeInSection delay={3}>
                    <ModuleGrid modsWide={results.modsWide} modsHigh={results.modsHigh} />
                  </FadeInSection>
                </>
              )}

              <SectionDivider />

              {/* Reference Table */}
              <FadeInSection delay={4}>
                <GlassCard className="overflow-hidden" data-testid="reference-table">
                  <div className="px-5 pt-5 pb-2 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Common Module & Cabinet Sizes</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-gray-500 uppercase">Pitch</th>
                          <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-gray-500 uppercase">Module</th>
                          <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-gray-500 uppercase">Cabinet</th>
                          <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-gray-500 uppercase">Res/Cab</th>
                          <th className="px-4 py-3 text-left text-[10px] tracking-wider font-bold text-gray-500 uppercase">Typical Use</th>
                        </tr>
                      </thead>
                      <tbody>
                        {REFERENCE_TABLE.map((row, i) => (
                          <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-2.5 font-bold text-cyan-400">{row.pitch}</td>
                            <td className="px-4 py-2.5 text-gray-400">{row.modSize}</td>
                            <td className="px-4 py-2.5 text-gray-400">{row.cabSize}</td>
                            <td className="px-4 py-2.5 text-gray-400">{row.resPerCab}</td>
                            <td className="px-4 py-2.5 text-gray-500">{row.use}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </FadeInSection>

              <SectionDivider />
              <FadeInSection delay={5}>
                <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeInSection delay={2}>
                <SpecPackCTA />
              </FadeInSection>

              <FadeInSection delay={3}>
                <GlassCard className="p-5" data-testid="related-tools">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Related Tools</span>
                  <div className="space-y-2">
                    {[
                      { name: 'Screen Calculator', path: '/calculator', desc: 'Pixel pitch & resolution' },
                      { name: 'Viewing Distance', path: '/viewing-distance', desc: 'Pitch vs. distance' },
                      { name: 'Power Estimator', path: '/power-estimator', desc: 'Electrical load & HVAC' },
                      { name: 'Budget Estimator', path: '/budget-estimator', desc: 'Project cost estimates' },
                    ].map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                        data-testid={`related-tool-${tool.path.slice(1)}`}
                      >
                        <div>
                          <div className="text-xs font-bold tracking-wider text-white">{tool.name}</div>
                          <div className="text-[10px] text-gray-500">{tool.desc}</div>
                        </div>
                        <ArrowRight size={14} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </FadeInSection>

              <FadeInSection delay={4}>
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-500/20" data-testid="design-assist-cta">
                  <h3 className="text-sm font-bold mb-2 text-white">Need Help Specifying?</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Our engineers can review your layout and recommend the optimal module configuration.
                  </p>
                  <Link to="/design-assist" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-4 py-2.5 w-full text-center transition-all inline-flex items-center justify-center gap-2 text-xs" data-testid="design-assist-link">
                    Free Design Assist <ArrowRight size={14} />
                  </Link>
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
