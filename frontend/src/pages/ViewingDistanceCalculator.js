import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Ruler, MessageCircle, Monitor, ArrowLeftRight, Calculator } from 'lucide-react';
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

const PITCH_DATA = [
  { pitch: 0.7, label: 'P0.7', tech: 'COB MicroLED', use: 'Control rooms, broadcast studios' },
  { pitch: 0.9, label: 'P0.9', tech: 'COB MicroLED', use: 'Boardrooms, command centers' },
  { pitch: 1.2, label: 'P1.2', tech: 'COB / MiP', use: 'Corporate lobbies, showrooms' },
  { pitch: 1.5, label: 'P1.5', tech: 'MiP / SMD', use: 'Meeting rooms, retail feature walls' },
  { pitch: 1.9, label: 'P1.9', tech: 'MiP / SMD', use: 'Conference halls, museums' },
  { pitch: 2.5, label: 'P2.5', tech: 'SMD', use: 'Auditoriums, houses of worship' },
  { pitch: 3.9, label: 'P3.9', tech: 'SMD', use: 'Large venues, sports bars' },
  { pitch: 4.8, label: 'P4.8', tech: 'SMD', use: 'Stadiums, mall atriums' },
  { pitch: 6.0, label: 'P6', tech: 'SMD Outdoor', use: 'Street-level outdoor signs' },
  { pitch: 8.0, label: 'P8', tech: 'SMD Outdoor', use: 'Highway-facing billboards' },
  { pitch: 10.0, label: 'P10', tech: 'SMD Outdoor', use: 'Long-distance outdoor displays' },
  { pitch: 16.0, label: 'P16', tech: 'SMD Outdoor', use: 'Building-top, media facades' },
  { pitch: 20.0, label: 'P20', tech: 'LED Mesh', use: 'Media facades, transparent mesh' },
];

const PRESETS = [
  { label: 'Control Room', distance: 1.5 },
  { label: 'Boardroom', distance: 3 },
  { label: 'Corporate Lobby', distance: 5 },
  { label: 'Retail Store', distance: 3 },
  { label: 'Conference / Event', distance: 8 },
  { label: 'Auditorium', distance: 15 },
  { label: 'Outdoor Street', distance: 10 },
  { label: 'Highway Billboard', distance: 30 },
  { label: 'Stadium', distance: 50 },
];

const FAQS = [
  { q: 'How is LED viewing distance calculated?', a: 'The industry standard formula is: Optimal Viewing Distance (m) = Pixel Pitch (mm) x 3. This means a P2.5 LED display has an optimal viewing distance of 7.5 meters.' },
  { q: 'What happens if the viewing distance is too close?', a: 'If viewers are closer than the minimum viewing distance, they will see individual pixels (the "screen door effect"). The solution is to specify a finer pixel pitch.' },
  { q: 'Does content type affect the required pixel pitch?', a: 'Yes. Text-heavy content requires finer pixel pitch because text pixelation is more noticeable than video pixelation.' },
  { q: 'What pixel pitch is recommended for a 3-meter viewing distance?', a: 'For a 3-meter viewing distance, P0.9 to P1.5 is recommended depending on content type.' },
  { q: 'What is the "retina distance" for LED displays?', a: 'The retina distance is where the human eye can no longer distinguish individual pixels — approximately Pixel Pitch (mm) x 3.4 meters.' },
];

function calcFromPitch(pitchMm, contentType) {
  const contentMultiplier = contentType === 'text' ? 0.8 : contentType === 'video' ? 1.2 : 1.0;
  return {
    minDist: pitchMm * 1.0 * contentMultiplier,
    optimalDist: pitchMm * 3.0 * contentMultiplier,
    maxDist: pitchMm * 8.0,
    retinaDist: pitchMm * 3.4 * contentMultiplier,
  };
}

function calcFromDistance(distM, contentType) {
  const contentMultiplier = contentType === 'text' ? 0.8 : contentType === 'video' ? 1.2 : 1.0;
  const idealPitch = distM / (3.0 * contentMultiplier);
  const sorted = [...PITCH_DATA].sort((a, b) => Math.abs(a.pitch - idealPitch) - Math.abs(b.pitch - idealPitch));
  return {
    recommended: sorted[0],
    premium: sorted.find(p => p.pitch < sorted[0].pitch) || sorted[1],
    budget: sorted.find(p => p.pitch > sorted[0].pitch) || sorted[2],
    idealPitch,
  };
}

export default function ViewingDistanceCalculator() {
  const [mode, setMode] = useState('pitch-to-distance');
  const [pitch, setPitch] = useState(2.5);
  const [distance, setDistance] = useState(5);
  const [contentType, setContentType] = useState('mixed');

  const faqJsonLd = buildFaqJsonLd(FAQS);
  const distResults = useMemo(() => calcFromPitch(pitch, contentType), [pitch, contentType]);
  const pitchResults = useMemo(() => calcFromDistance(distance, contentType), [distance, contentType]);

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="viewing-distance-calculator">
      <SEO
        title="LED Viewing Distance Calculator — Find the Right Pixel Pitch | Brightluxx"
        description="Calculate the optimal viewing distance for any LED pixel pitch, or find the right pixel pitch for your viewing distance."
        path="/viewing-distance"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Specifier Tool</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">
              Viewing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">Distance</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Find the optimal pixel pitch for your viewing distance, or calculate the ideal viewing range for a specific pixel pitch.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Mode Toggle */}
          <FadeInSection delay={1}>
            <div className="flex flex-wrap gap-3 mb-8" data-testid="mode-toggle">
              <button
                onClick={() => setMode('pitch-to-distance')}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold tracking-wider transition-all ${
                  mode === 'pitch-to-distance'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:border-white/20'
                }`}
                data-testid="mode-pitch-to-distance"
              >
                <Ruler size={16} /> I know the Pixel Pitch
              </button>
              <button
                onClick={() => setMode('distance-to-pitch')}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold tracking-wider transition-all ${
                  mode === 'distance-to-pitch'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:border-white/20'
                }`}
                data-testid="mode-distance-to-pitch"
              >
                <Eye size={16} /> I know the Viewing Distance
              </button>
            </div>
          </FadeInSection>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Calculator Panel */}
            <div>
              <FadeInSection delay={2}>
                <GlassCard className="p-6 md:p-8 mb-8" data-testid="calculator-panel">
                  {/* Input */}
                  {mode === 'pitch-to-distance' ? (
                    <div className="mb-6">
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3 block">Pixel Pitch</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range" min="0.7" max="20" step="0.1" value={pitch}
                          onChange={e => setPitch(parseFloat(e.target.value))}
                          className="flex-1 accent-cyan-400"
                          style={{ background: `linear-gradient(to right, #22d3ee ${((pitch-0.7)/19.3)*100}%, rgba(255,255,255,0.1) ${((pitch-0.7)/19.3)*100}%)` }}
                          data-testid="pitch-slider"
                        />
                        <div className="w-24 text-center">
                          <span className="text-2xl font-bold text-cyan-400" data-testid="pitch-value">{pitch.toFixed(1)}</span>
                          <span className="text-xs text-gray-500 ml-1">mm</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {PITCH_DATA.filter(p => [0.9, 1.2, 1.5, 2.5, 3.9, 6.0, 10.0].includes(p.pitch)).map(p => (
                          <button
                            key={p.pitch}
                            onClick={() => setPitch(p.pitch)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                              Math.abs(pitch - p.pitch) < 0.05
                                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                                : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3 block">Viewing Distance</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range" min="0.5" max="100" step="0.5" value={distance}
                          onChange={e => setDistance(parseFloat(e.target.value))}
                          className="flex-1 accent-cyan-400"
                          style={{ background: `linear-gradient(to right, #22d3ee ${((distance-0.5)/99.5)*100}%, rgba(255,255,255,0.1) ${((distance-0.5)/99.5)*100}%)` }}
                          data-testid="distance-slider"
                        />
                        <div className="w-28 text-center">
                          <span className="text-2xl font-bold text-cyan-400" data-testid="distance-value">{distance.toFixed(1)}</span>
                          <span className="text-xs text-gray-500 ml-1">meters</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {PRESETS.map(p => (
                          <button
                            key={p.label}
                            onClick={() => setDistance(p.distance)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all ${
                              Math.abs(distance - p.distance) < 0.25
                                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                                : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Type */}
                  <div className="mb-6">
                    <label className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-3 block">Content Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'text', label: 'Text / Data', desc: 'Dashboards, menus' },
                        { id: 'mixed', label: 'Mixed', desc: 'Text + video' },
                        { id: 'video', label: 'Video / Images', desc: 'Full-motion video' },
                      ].map(ct => (
                        <button
                          key={ct.id}
                          onClick={() => setContentType(ct.id)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            contentType === ct.id
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/20'
                          }`}
                          data-testid={`content-${ct.id}`}
                        >
                          <div className={`text-xs font-bold tracking-wider ${contentType === ct.id ? 'text-cyan-400' : 'text-white'}`}>{ct.label}</div>
                          <div className="text-[9px] text-gray-500 mt-0.5">{ct.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t border-white/[0.06] pt-6" data-testid="results-section">
                    {mode === 'pitch-to-distance' ? (
                      <>
                        <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Viewing Distance Results</span>

                        {/* Visual Distance Bar */}
                        <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="relative h-10 mb-2">
                            <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-white/[0.04]" />
                            <div
                              className="absolute inset-y-0 left-0 rounded-l-full bg-red-500/15"
                              style={{ width: `${Math.min((distResults.minDist / distResults.maxDist) * 100, 100)}%`, borderRight: '2px solid rgba(239,68,68,0.5)' }}
                            />
                            <div
                              className="absolute inset-y-0 bg-cyan-500/15"
                              style={{
                                left: `${(distResults.minDist / distResults.maxDist) * 100}%`,
                                width: `${((distResults.optimalDist - distResults.minDist) / distResults.maxDist) * 100}%`,
                                borderRight: '2px solid rgba(34,211,238,0.5)'
                              }}
                            />
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-emerald-400/50"
                              style={{ left: `${(distResults.retinaDist / distResults.maxDist) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[9px] text-gray-500">
                            <span>0m</span>
                            <span>Min: {distResults.minDist.toFixed(1)}m</span>
                            <span>Optimal: {distResults.optimalDist.toFixed(1)}m</span>
                            <span>Max: {distResults.maxDist.toFixed(1)}m</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <div className="text-[9px] font-bold tracking-[0.15em] text-red-400 uppercase mb-1">Minimum</div>
                            <div className="text-lg font-bold text-white" data-testid="result-min-distance">{distResults.minDist.toFixed(1)}m</div>
                            <div className="text-[9px] text-gray-500">Pixels may be visible</div>
                          </div>
                          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <div className="text-[9px] font-bold tracking-[0.15em] text-cyan-400 uppercase mb-1">Optimal</div>
                            <div className="text-lg font-bold text-cyan-400" data-testid="result-optimal-distance">{distResults.optimalDist.toFixed(1)}m</div>
                            <div className="text-[9px] text-gray-500">Best image quality</div>
                          </div>
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-[9px] font-bold tracking-[0.15em] text-emerald-400 uppercase mb-1">Retina</div>
                            <div className="text-lg font-bold text-white" data-testid="result-retina-distance">{distResults.retinaDist.toFixed(1)}m</div>
                            <div className="text-[9px] text-gray-500">Pixels invisible to eye</div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="text-[9px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-1">Maximum</div>
                            <div className="text-lg font-bold text-white" data-testid="result-max-distance">{distResults.maxDist.toFixed(1)}m</div>
                            <div className="text-[9px] text-gray-500">Content still readable</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Recommended Pixel Pitch</span>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'PREMIUM', data: pitchResults.premium, style: 'bg-white/[0.03] border-white/[0.06]' },
                            { label: 'RECOMMENDED', data: pitchResults.recommended, style: 'bg-cyan-500/10 border-cyan-500/20' },
                            { label: 'BUDGET', data: pitchResults.budget, style: 'bg-white/[0.03] border-white/[0.06]' },
                          ].map(item => (
                            <div key={item.label} className={`p-4 rounded-xl ${item.style} border`}>
                              <div className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-2 ${item.label === 'RECOMMENDED' ? 'text-cyan-400' : 'text-gray-500'}`}>{item.label}</div>
                              <div className={`text-xl font-bold ${item.label === 'RECOMMENDED' ? 'text-cyan-400' : 'text-white'}`} data-testid={`result-${item.label.toLowerCase()}-pitch`}>{item.data.label}</div>
                              <div className="text-[10px] text-gray-500 mt-1">{item.data.tech}</div>
                              <div className="text-[10px] text-gray-400 mt-2">{item.data.use}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 rounded-lg text-sm text-gray-400 bg-cyan-500/5 border border-cyan-500/10">
                          Ideal pixel pitch for {distance}m: <strong className="text-cyan-400">{pitchResults.idealPitch.toFixed(1)}mm</strong>. Closest: {pitchResults.recommended.label}.
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* CTAs */}
              <FadeInSection delay={3}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link 
                    to="/contact" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    data-testid="vd-quote-cta"
                  >
                    Get Detailed Quote <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`https://wa.me/971559954274?text=${encodeURIComponent(
                      mode === 'pitch-to-distance'
                        ? `Hi, I used your viewing distance calculator. I need a ${pitch}mm pixel pitch LED display. Optimal viewing distance: ${distResults.optimalDist.toFixed(1)}m. Can you provide a quotation?`
                        : `Hi, I used your viewing distance calculator. My viewing distance is ${distance}m. Recommended pixel pitch: ${pitchResults.recommended.label}. Can you provide a quotation?`
                    )}`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-6 py-3 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="vd-whatsapp-cta"
                  >
                    <MessageCircle size={16} /> WhatsApp with Results
                  </a>
                </div>
              </FadeInSection>

              <SectionDivider />

              {/* Reference Table */}
              <FadeInSection delay={4}>
                <h2 className="text-xl font-bold tracking-wide text-white mb-6">Pixel Pitch & Viewing Distance Reference</h2>
                <GlassCard className="overflow-hidden mb-12" data-testid="reference-table">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Pitch</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Min</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-cyan-400 uppercase">Optimal</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Max</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Technology</th>
                          <th className="py-3 px-4 text-left text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">Typical Use</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PITCH_DATA.map(p => {
                          const res = calcFromPitch(p.pitch, 'mixed');
                          return (
                            <tr key={p.pitch} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                              <td className="py-2.5 px-4 text-sm font-bold text-cyan-400">{p.label}</td>
                              <td className="py-2.5 px-4 text-xs text-gray-400">{res.minDist.toFixed(1)}m</td>
                              <td className="py-2.5 px-4 text-xs font-bold text-white">{res.optimalDist.toFixed(1)}m</td>
                              <td className="py-2.5 px-4 text-xs text-gray-400">{res.maxDist.toFixed(1)}m</td>
                              <td className="py-2.5 px-4 text-xs text-gray-500">{p.tech}</td>
                              <td className="py-2.5 px-4 text-[11px] text-gray-500">{p.use}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </FadeInSection>

              {/* How It Works */}
              <FadeInSection delay={5}>
                <h2 className="text-xl font-bold tracking-wide text-white mb-6">How It Works</h2>
                <div className="grid sm:grid-cols-3 gap-4 mb-12">
                  {[
                    { icon: Ruler, title: 'Minimum Distance', desc: 'Pixel Pitch x 1.0 — The closest distance before individual pixels become visible.' },
                    { icon: Eye, title: 'Optimal Distance', desc: 'Pixel Pitch x 3.0 — The sweet spot. Image appears smooth, text is crisp.' },
                    { icon: ArrowLeftRight, title: 'Maximum Distance', desc: 'Pixel Pitch x 8.0 — Beyond this, content becomes difficult to read.' },
                  ].map((item, i) => (
                    <GlassCard key={i} className="p-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20">
                        <item.icon size={18} className="text-cyan-400" />
                      </div>
                      <h3 className="text-sm font-bold tracking-wider text-white mb-2">{item.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  ))}
                </div>
              </FadeInSection>

              <SectionDivider />
              <FadeInSection delay={6}>
                <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <FadeInSection delay={3}>
                <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with viewing distance tables and cost analysis." />
              </FadeInSection>

              <FadeInSection delay={4}>
                <GlassCard className="p-5">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Related Tools</span>
                  <div className="space-y-2">
                    {[
                      { to: '/calculator', label: 'Screen Calculator', desc: 'Size, resolution & specs' },
                      { to: '/budget-estimator', label: 'Budget Estimator', desc: 'Project cost estimates' },
                      { to: '/compare', label: 'Compare Products', desc: 'Side-by-side comparison' },
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

              <FadeInSection delay={5}>
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Need Help Specifying?</span>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Our engineers can recommend the exact pixel pitch for your project.
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
      <QuickInquiry context="LED display viewing distance specification" />
    </div>
  );
}
