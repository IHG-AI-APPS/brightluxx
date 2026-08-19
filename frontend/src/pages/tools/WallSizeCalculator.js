import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../contexts/ThemeContext';

export default function WallSizeCalculator() {
  const { isDark } = useTheme();
  const [distance, setDistance] = useState(6);
  const [roomWidth, setRoomWidth] = useState(8);
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const inputCls = `w-full rounded-xl border ${borderColor} ${isDark ? 'bg-white/5 text-white' : 'bg-white text-neutral-900'} px-4 py-3 text-sm`;

  // Rule of thumb: wall width ≈ viewing distance / 1.5 (16:9 immersive), capped by 85% of room width
  const idealWidth = Math.min(distance / 1.5, roomWidth * 0.85);
  const height = idealWidth * 9 / 16;
  const diagonalIn = Math.sqrt(idealWidth ** 2 + height ** 2) * 39.37;
  const pitch = distance <= 3 ? 'P1.2–P1.8' : distance <= 6 ? 'P1.8–P2.5' : distance <= 10 ? 'P2.5–P4' : 'P4–P6';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'} pt-28 pb-20`} data-testid="wall-size-calculator-page">
      <SEO
        title="LED Wall Size Calculator | What Size LED Screen Do I Need"
        description="Free LED wall size calculator: enter your viewing distance and room width to get the ideal LED wall dimensions, diagonal and recommended pixel pitch."
        path="/tools/led-wall-size-calculator"
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${textPrimary}`}>LED Wall Size Calculator</h1>
        <p className={`text-base mb-10 ${textSecondary}`}>
          Enter your typical viewing distance and available room width — we will recommend the ideal LED wall size and pixel pitch. For module counts use the <Link to="/led-calculator" className="text-cyan-400 hover:underline">LED module calculator</Link>, and check pixels with the <Link to="/tools/video-wall-resolution-calculator" className="text-cyan-400 hover:underline">resolution calculator</Link>.
        </p>
        <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 mb-8`}>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <label className="block">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Viewing distance (m)</span>
              <input type="number" min="1" max="100" value={distance} onChange={(e) => setDistance(Number(e.target.value) || 1)} className={`${inputCls} mt-2`} data-testid="wall-size-distance-input" />
            </label>
            <label className="block">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Room / facade width (m)</span>
              <input type="number" min="1" max="200" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value) || 1)} className={`${inputCls} mt-2`} data-testid="wall-size-room-input" />
            </label>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="wall-size-results">
            {[
              ['Recommended width', `${idealWidth.toFixed(1)} m`],
              ['Recommended height (16:9)', `${height.toFixed(1)} m`],
              ['Diagonal', `${Math.round(diagonalIn)}"`],
              ['Suggested pixel pitch', pitch],
            ].map(([k, v]) => (
              <div key={k} className={`rounded-xl border ${borderColor} p-4 text-center`}>
                <p className={`text-[11px] uppercase tracking-wider mb-1 ${textSecondary}`}>{k}</p>
                <p className="text-xl font-bold text-cyan-400">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`text-sm leading-relaxed space-y-3 ${textSecondary}`}>
          <h2 className={`text-xl font-bold ${textPrimary}`}>How LED wall size is calculated</h2>
          <p>A comfortable immersive LED wall is roughly viewing distance ÷ 1.5 wide in a 16:9 format, without exceeding about 85% of the available wall. Closer audiences need finer pixel pitch: use our <Link to="/viewing-distance" className="text-cyan-400 hover:underline">pixel pitch viewing distance calculator</Link> to confirm.</p>
          <p>Ready to price it? Get a same-day quotation from our <Link to="/dubai" className="text-cyan-400 hover:underline">LED screen supplier team in Dubai</Link> or estimate first with the <Link to="/calculator" className="text-cyan-400 hover:underline">cost calculator</Link>.</p>
        </div>
      </div>
    </div>
  );
}
