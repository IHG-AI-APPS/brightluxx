import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Ruler, MessageCircle, Monitor, Zap, ArrowLeftRight } from 'lucide-react';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';
import QuickInquiry from '../components/QuickInquiry';

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
  { label: 'Control Room', distance: 1.5, icon: Monitor },
  { label: 'Boardroom', distance: 3, icon: Monitor },
  { label: 'Corporate Lobby', distance: 5, icon: Monitor },
  { label: 'Retail Store', distance: 3, icon: Monitor },
  { label: 'Conference / Event', distance: 8, icon: Monitor },
  { label: 'Auditorium', distance: 15, icon: Monitor },
  { label: 'Outdoor Street', distance: 10, icon: Eye },
  { label: 'Highway Billboard', distance: 30, icon: Eye },
  { label: 'Stadium', distance: 50, icon: Eye },
];

const FAQS = [
  { q: 'How is LED viewing distance calculated?', a: 'The industry standard formula is: Optimal Viewing Distance (m) = Pixel Pitch (mm) x 3. This means a P2.5 LED display has an optimal viewing distance of 7.5 meters. Below this distance, individual pixels may become visible. The minimum distance where the image looks acceptable is roughly Pixel Pitch x 1, and the maximum effective distance is approximately Pixel Pitch x 8.' },
  { q: 'What happens if the viewing distance is too close?', a: 'If viewers are closer than the minimum viewing distance, they will see individual pixels (the "screen door effect"). This is particularly noticeable with text content and high-contrast images. The solution is to specify a finer pixel pitch or increase the minimum viewing distance through physical barriers or furniture placement.' },
  { q: 'Does content type affect the required pixel pitch?', a: 'Yes. Text-heavy content (menus, data dashboards, presentations) requires finer pixel pitch because text pixelation is more noticeable than video pixelation. For predominantly video content, you can use a wider pixel pitch at the same viewing distance. Our calculator accounts for this with a content multiplier.' },
  { q: 'What pixel pitch is recommended for a 3-meter viewing distance?', a: 'For a 3-meter viewing distance, P0.9 to P1.5 is recommended depending on content type. For video-dominant content, P1.5 works well. For text-heavy content (control rooms, data displays), P0.9 to P1.2 provides crisp text readability.' },
  { q: 'How does ambient light affect viewing distance?', a: 'Ambient light does not change the pixel pitch requirement, but it affects perceived image quality at distance. In bright outdoor environments, higher brightness (5,000+ nits) is needed to maintain contrast at the designed viewing distance. Indoor environments with controlled lighting are more forgiving.' },
  { q: 'What is the "retina distance" for LED displays?', a: 'The retina distance is where the human eye can no longer distinguish individual pixels. For LED displays, this is approximately Pixel Pitch (mm) x 3.4 meters. At this distance and beyond, the image appears smooth and continuous, similar to how Apple defines "Retina" for their displays.' },
];

function calcFromPitch(pitchMm, contentType) {
  const contentMultiplier = contentType === 'text' ? 0.8 : contentType === 'video' ? 1.2 : 1.0;
  const minDist = pitchMm * 1.0 * contentMultiplier;
  const optimalDist = pitchMm * 3.0 * contentMultiplier;
  const maxDist = pitchMm * 8.0;
  const retinaDist = pitchMm * 3.4 * contentMultiplier;
  return { minDist, optimalDist, maxDist, retinaDist };
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

  const activeResult = mode === 'pitch-to-distance' ? distResults : pitchResults;

  return (
    <div className="pb-20" data-testid="viewing-distance-calculator">
      <SEO
        title="LED Viewing Distance Calculator — Find the Right Pixel Pitch | Brightluxx"
        description="Calculate the optimal viewing distance for any LED pixel pitch, or find the right pixel pitch for your viewing distance. Free tool for architects, consultants, and specifiers."
        path="/viewing-distance"
        jsonLd={[faqJsonLd, {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LED Viewing Distance Calculator",
          "description": "Calculate optimal viewing distance for LED displays based on pixel pitch and content type",
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
            Viewing Distance<br />Calculator
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed" style={{ textTransform: 'none' }}>
            Find the optimal pixel pitch for your viewing distance, or calculate the ideal viewing range for a specific pixel pitch. Essential for LED display specification.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8" data-testid="mode-toggle">
          <button
            onClick={() => setMode('pitch-to-distance')}
            className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs font-bold tracking-wider transition-all ${
              mode === 'pitch-to-distance'
                ? 'bg-[rgba(229,197,116,0.12)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                : 'glass-panel text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
            }`}
            data-testid="mode-pitch-to-distance"
          >
            <Ruler size={14} className="inline mr-2" />
            I know the Pixel Pitch
          </button>
          <button
            onClick={() => setMode('distance-to-pitch')}
            className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs font-bold tracking-wider transition-all ${
              mode === 'distance-to-pitch'
                ? 'bg-[rgba(229,197,116,0.12)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                : 'glass-panel text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
            }`}
            data-testid="mode-distance-to-pitch"
          >
            <Eye size={14} className="inline mr-2" />
            I know the Viewing Distance
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Calculator Panel */}
          <div>
            <div className="glass-panel p-6 sm:p-8 mb-8" data-testid="calculator-panel">
              {/* Input */}
              {mode === 'pitch-to-distance' ? (
                <div className="mb-6">
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">PIXEL PITCH</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0.7"
                      max="20"
                      step="0.1"
                      value={pitch}
                      onChange={e => setPitch(parseFloat(e.target.value))}
                      className="flex-1 accent-[var(--blx-gold-3)]"
                      data-testid="pitch-slider"
                    />
                    <div className="w-24 text-center">
                      <span className="text-2xl font-bold text-[var(--blx-gold-3)]" data-testid="pitch-value">{pitch.toFixed(1)}</span>
                      <span className="text-xs text-[var(--blx-muted)] ml-1">mm</span>
                    </div>
                  </div>
                  {/* Quick Select */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {PITCH_DATA.filter(p => [0.9, 1.2, 1.5, 2.5, 3.9, 6.0, 10.0].includes(p.pitch)).map(p => (
                      <button
                        key={p.pitch}
                        onClick={() => setPitch(p.pitch)}
                        className={`px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider transition-all ${
                          Math.abs(pitch - p.pitch) < 0.05
                            ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                            : 'bg-[rgba(255,255,255,0.04)] text-[var(--blx-muted)] border border-transparent hover:border-[var(--blx-border)]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">VIEWING DISTANCE</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0.5"
                      max="100"
                      step="0.5"
                      value={distance}
                      onChange={e => setDistance(parseFloat(e.target.value))}
                      className="flex-1 accent-[var(--blx-gold-3)]"
                      data-testid="distance-slider"
                    />
                    <div className="w-28 text-center">
                      <span className="text-2xl font-bold text-[var(--blx-gold-3)]" data-testid="distance-value">{distance.toFixed(1)}</span>
                      <span className="text-xs text-[var(--blx-muted)] ml-1">meters</span>
                    </div>
                  </div>
                  {/* Presets */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {PRESETS.map(p => (
                      <button
                        key={p.label}
                        onClick={() => setDistance(p.distance)}
                        className={`px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider transition-all ${
                          Math.abs(distance - p.distance) < 0.25
                            ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                            : 'bg-[rgba(255,255,255,0.04)] text-[var(--blx-muted)] border border-transparent hover:border-[var(--blx-border)]'
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
                <label className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-3 block">CONTENT TYPE</label>
                <div className="flex gap-2">
                  {[
                    { id: 'text', label: 'Text / Data', desc: 'Dashboards, menus, presentations' },
                    { id: 'mixed', label: 'Mixed', desc: 'Text + video, general use' },
                    { id: 'video', label: 'Video / Images', desc: 'Full-motion video, cinematic' },
                  ].map(ct => (
                    <button
                      key={ct.id}
                      onClick={() => setContentType(ct.id)}
                      className={`flex-1 p-3 rounded-xl text-center transition-all ${
                        contentType === ct.id
                          ? 'bg-[rgba(229,197,116,0.1)] border border-[rgba(229,197,116,0.2)]'
                          : 'bg-[rgba(255,255,255,0.03)] border border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
                      }`}
                      data-testid={`content-${ct.id}`}
                    >
                      <div className={`text-[0.625rem] font-bold tracking-wider ${contentType === ct.id ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{ct.label}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] mt-0.5" style={{ textTransform: 'none' }}>{ct.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-[var(--blx-hairline)] pt-6" data-testid="results-section">
                {mode === 'pitch-to-distance' ? (
                  <>
                    <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">VIEWING DISTANCE RESULTS</div>

                    {/* Visual Distance Bar */}
                    <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--blx-hairline)' }}>
                      <div className="relative h-10 mb-2">
                        <div className="absolute inset-y-0 left-0 right-0 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
                        {/* Min zone - red/orange */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-l-full"
                          style={{
                            width: `${Math.min((distResults.minDist / distResults.maxDist) * 100, 100)}%`,
                            background: 'rgba(227,93,93,0.15)',
                            borderRight: '2px solid rgba(227,93,93,0.5)',
                          }}
                        />
                        {/* Optimal zone - gold */}
                        <div
                          className="absolute inset-y-0"
                          style={{
                            left: `${(distResults.minDist / distResults.maxDist) * 100}%`,
                            width: `${((distResults.optimalDist - distResults.minDist) / distResults.maxDist) * 100}%`,
                            background: 'rgba(229,197,116,0.15)',
                            borderRight: '2px solid rgba(229,197,116,0.5)',
                          }}
                        />
                        {/* Retina marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5"
                          style={{
                            left: `${(distResults.retinaDist / distResults.maxDist) * 100}%`,
                            background: 'rgba(111,211,155,0.5)',
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[0.5rem] text-[var(--blx-muted)]">
                        <span>0m</span>
                        <span style={{ textTransform: 'none' }}>Min: {distResults.minDist.toFixed(1)}m</span>
                        <span style={{ textTransform: 'none' }}>Optimal: {distResults.optimalDist.toFixed(1)}m</span>
                        <span style={{ textTransform: 'none' }}>Max: {distResults.maxDist.toFixed(1)}m</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(227,93,93,0.06)', border: '1px solid rgba(227,93,93,0.15)' }}>
                        <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[#E35D5D] mb-1">MINIMUM</div>
                        <div className="text-lg font-bold" data-testid="result-min-distance">{distResults.minDist.toFixed(1)}m</div>
                        <div className="text-[0.5rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>Pixels may be visible</div>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.15)' }}>
                        <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-1">OPTIMAL</div>
                        <div className="text-lg font-bold text-[var(--blx-gold-3)]" data-testid="result-optimal-distance">{distResults.optimalDist.toFixed(1)}m</div>
                        <div className="text-[0.5rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>Best image quality</div>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(111,211,155,0.06)', border: '1px solid rgba(111,211,155,0.15)' }}>
                        <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-success)] mb-1">RETINA</div>
                        <div className="text-lg font-bold" data-testid="result-retina-distance">{distResults.retinaDist.toFixed(1)}m</div>
                        <div className="text-[0.5rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>Pixels invisible to eye</div>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--blx-border)' }}>
                        <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1">MAXIMUM</div>
                        <div className="text-lg font-bold" data-testid="result-max-distance">{distResults.maxDist.toFixed(1)}m</div>
                        <div className="text-[0.5rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>Content still readable</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RECOMMENDED PIXEL PITCH</div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'PREMIUM', data: pitchResults.premium, style: { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--blx-border)' } },
                        { label: 'RECOMMENDED', data: pitchResults.recommended, style: { background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.15)' } },
                        { label: 'BUDGET', data: pitchResults.budget, style: { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--blx-border)' } },
                      ].map(item => (
                        <div key={item.label} className="p-4 rounded-xl" style={item.style}>
                          <div className={`text-[0.5rem] font-bold tracking-[0.15em] mb-2 ${item.label === 'RECOMMENDED' ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)]'}`}>{item.label}</div>
                          <div className={`text-xl font-bold ${item.label === 'RECOMMENDED' ? 'text-[var(--blx-gold-3)]' : ''}`} data-testid={`result-${item.label.toLowerCase()}-pitch`}>{item.data.label}</div>
                          <div className="text-[0.5rem] text-[var(--blx-muted)] mt-1">{item.data.tech}</div>
                          <div className="text-[0.5625rem] text-[var(--blx-text-2)] mt-2" style={{ textTransform: 'none' }}>{item.data.use}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-lg text-[0.625rem] text-[var(--blx-text-2)]" style={{ background: 'rgba(229,197,116,0.04)', textTransform: 'none' }}>
                      Ideal pixel pitch for {distance}m viewing distance with {contentType} content: <strong className="text-[var(--blx-gold-3)]">{pitchResults.idealPitch.toFixed(1)}mm</strong>. Closest available: {pitchResults.recommended.label}.
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="vd-quote-cta">
                Get Detailed Quote <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent(
                  mode === 'pitch-to-distance'
                    ? `Hi, I used your viewing distance calculator. I need a ${pitch}mm pixel pitch LED display. Optimal viewing distance: ${distResults.optimalDist.toFixed(1)}m. Can you provide a quotation?`
                    : `Hi, I used your viewing distance calculator. My viewing distance is ${distance}m. Recommended pixel pitch: ${pitchResults.recommended.label}. Can you provide a quotation?`
                )}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2"
                data-testid="vd-whatsapp-cta"
              >
                <MessageCircle size={14} /> WhatsApp with Results
              </a>
            </div>

            <SectionDivider />

            {/* Reference Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Pixel Pitch & Viewing Distance Reference</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="reference-table">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Pixel Pitch</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Min Distance</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">Optimal</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Max Distance</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Technology</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)]">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PITCH_DATA.map(p => {
                      const res = calcFromPitch(p.pitch, 'mixed');
                      return (
                        <tr key={p.pitch} className="border-b border-[var(--blx-hairline)] hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="py-2.5 px-4 text-sm font-bold text-[var(--blx-gold-3)]">{p.label}</td>
                          <td className="py-2.5 px-4 text-xs" style={{ textTransform: 'none' }}>{res.minDist.toFixed(1)}m</td>
                          <td className="py-2.5 px-4 text-xs font-bold" style={{ textTransform: 'none' }}>{res.optimalDist.toFixed(1)}m</td>
                          <td className="py-2.5 px-4 text-xs" style={{ textTransform: 'none' }}>{res.maxDist.toFixed(1)}m</td>
                          <td className="py-2.5 px-4 text-xs text-[var(--blx-text-2)]">{p.tech}</td>
                          <td className="py-2.5 px-4 text-[0.6875rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{p.use}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <SectionDivider />

            {/* How It Works */}
            <h2 className="text-lg font-bold tracking-wider mb-6">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="glass-panel p-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Ruler size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold tracking-wider mb-2">Minimum Distance</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>
                  <strong>Pixel Pitch x 1.0</strong> — The closest distance before individual pixels become visible. Acceptable for quick glances but not sustained viewing.
                </p>
              </div>
              <div className="glass-panel p-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Eye size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold tracking-wider mb-2">Optimal Distance</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>
                  <strong>Pixel Pitch x 3.0</strong> — The sweet spot. Image appears smooth, text is crisp, and the full screen is comfortably within the field of view.
                </p>
              </div>
              <div className="glass-panel p-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <ArrowLeftRight size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-xs font-bold tracking-wider mb-2">Maximum Distance</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>
                  <strong>Pixel Pitch x 8.0</strong> — Beyond this, content becomes difficult to read. The display is still visible but fine detail is lost.
                </p>
              </div>
            </div>

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={FAQS} title="Frequently Asked Questions" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA packId="pixel-pitch" title="Pixel Pitch Spec Pack" description="Complete pixel pitch reference PDF with viewing distance tables, resolution calculator, and cost analysis." />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS</h3>
              <div className="space-y-1">
                {[
                  { to: '/calculator', label: 'Screen Calculator', desc: 'Size, resolution & specs' },
                  { to: '/budget-estimator', label: 'Budget Estimator', desc: 'Project cost estimates' },
                  { to: '/compare', label: 'Compare Products', desc: 'Side-by-side comparison' },
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

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">TECHNICAL GUIDES</h3>
              <div className="space-y-1">
                {[
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.06) 0%, rgba(183,142,58,0.03) 100%)', border: '1px solid rgba(229,197,116,0.12)' }}>
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">NEED HELP SPECIFYING?</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Our engineers can recommend the exact pixel pitch, brightness, and technology for your project.
              </p>
              <Link to="/design-assist" className="btn-gold w-full py-2.5 text-[0.625rem] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                Free Design Assist <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <QuickInquiry context="LED display viewing distance specification" />
    </div>
  );
}
