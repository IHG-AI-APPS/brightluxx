import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../contexts/ThemeContext';

const PITCHES = [0.9, 1.2, 1.5, 1.8, 2.5, 3, 4, 5, 6, 8, 10];

export default function ResolutionCalculator() {
  const { isDark } = useTheme();
  const [w, setW] = useState(4);
  const [h, setH] = useState(2.25);
  const [pitch, setPitch] = useState(2.5);
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const inputCls = `w-full rounded-xl border ${borderColor} ${isDark ? 'bg-white/5 text-white' : 'bg-white text-neutral-900'} px-4 py-3 text-sm`;

  const resW = Math.round((w * 1000) / pitch);
  const resH = Math.round((h * 1000) / pitch);
  const total = resW * resH;
  const contentRec = resW >= 3840 ? '4K UHD or higher' : resW >= 1920 ? 'Full HD (1080p)' : resW >= 1280 ? 'HD (720p)' : 'Custom / scaled content';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'} pt-28 pb-20`} data-testid="resolution-calculator-page">
      <SEO
        title="Video Wall Resolution Calculator | LED Pixel Count Tool"
        description="Free video wall resolution calculator: enter LED wall width, height and pixel pitch to get exact resolution, total pixels and recommended content format."
        path="/tools/video-wall-resolution-calculator"
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${textPrimary}`}>Video Wall Resolution Calculator</h1>
        <p className={`text-base mb-10 ${textSecondary}`}>
          Convert your LED wall dimensions and pixel pitch into exact resolution. Not sure of the wall size yet? Start with the <Link to="/tools/led-wall-size-calculator" className="text-cyan-400 hover:underline">LED wall size calculator</Link>.
        </p>
        <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 mb-8`}>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <label className="block">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Wall width (m)</span>
              <input type="number" min="0.5" step="0.5" value={w} onChange={(e) => setW(Number(e.target.value) || 0.5)} className={`${inputCls} mt-2`} data-testid="resolution-width-input" />
            </label>
            <label className="block">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Wall height (m)</span>
              <input type="number" min="0.5" step="0.25" value={h} onChange={(e) => setH(Number(e.target.value) || 0.5)} className={`${inputCls} mt-2`} data-testid="resolution-height-input" />
            </label>
            <label className="block">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Pixel pitch (mm)</span>
              <select value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className={`${inputCls} mt-2`} data-testid="resolution-pitch-select">
                {PITCHES.map(p => <option key={p} value={p}>P{p}</option>)}
              </select>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="resolution-results">
            {[
              ['Resolution', `${resW} × ${resH} px`],
              ['Total pixels', total.toLocaleString()],
              ['Pixel density', `${Math.round(1000000 / (pitch * pitch)).toLocaleString()} px/m²`],
              ['Content format', contentRec],
            ].map(([k, v]) => (
              <div key={k} className={`rounded-xl border ${borderColor} p-4 text-center`}>
                <p className={`text-[11px] uppercase tracking-wider mb-1 ${textSecondary}`}>{k}</p>
                <p className="text-lg font-bold text-cyan-400">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`text-sm leading-relaxed space-y-3 ${textSecondary}`}>
          <h2 className={`text-xl font-bold ${textPrimary}`}>How video wall resolution works</h2>
          <p>Resolution = dimension in millimetres ÷ pixel pitch. A 4m × 2.25m wall at P2.5 gives 1600 × 900 pixels; the same wall at P1.2 gives 3333 × 1875 — near-4K. Finer pitch costs more per square metre: see our <Link to="/contractors/led-cost-per-sqm" className="text-cyan-400 hover:underline">LED cost per sqm guide</Link> or ask our <Link to="/dubai" className="text-cyan-400 hover:underline">Dubai LED display company</Link> for a quote.</p>
        </div>
      </div>
    </div>
  );
}
