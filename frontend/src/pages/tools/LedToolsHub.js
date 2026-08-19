import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { ArrowRight, Ruler, Monitor, Eye, Grid3X3, Calculator, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TOOLS = [
  { path: '/viewing-distance', icon: Eye, name: 'Pixel Pitch Viewing Distance Calculator', desc: 'Find the right pixel pitch for your audience distance — or the minimum viewing distance for a given pitch.' },
  { path: '/tools/led-wall-size-calculator', icon: Ruler, name: 'LED Wall Size Calculator', desc: 'Work out the ideal LED wall dimensions for your room size and viewing distance.' },
  { path: '/tools/video-wall-resolution-calculator', icon: Monitor, name: 'Video Wall Resolution Calculator', desc: 'Convert wall dimensions and pixel pitch into exact resolution and total pixels.' },
  { path: '/led-calculator', icon: Grid3X3, name: 'LED Module Calculator', desc: 'Calculate how many LED modules and cabinets your wall needs, with power and weight.' },
  { path: '/calculator', icon: Calculator, name: 'LED Screen Cost Calculator', desc: 'Estimate a budget range for your LED screen by size, pitch and environment.' },
  { path: '/tools/roi-calculator', icon: TrendingUp, name: 'LED Advertising ROI Calculator', desc: 'Project payback for advertising screens from impressions and ad slots.' },
];

export default function LedToolsHub() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'} pt-28 pb-20`} data-testid="tools-hub-page">
      <SEO
        title="Free LED Screen Calculators & Tools | Brightluxx UAE"
        description="Free LED display tools: pixel pitch viewing distance calculator, LED wall size calculator, video wall resolution calculator, module calculator and cost estimator."
        path="/tools"
      />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${textPrimary}`}>LED Screen Calculators &amp; Tools</h1>
        <p className={`text-base max-w-2xl mb-12 ${textSecondary}`}>
          Plan your LED display project with the same tools our engineers use. Size your wall, pick the right pixel pitch, check the resolution and estimate your budget — then <Link to="/contact" className="text-cyan-400 hover:underline">send us the numbers</Link> for a firm quotation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((t, i) => (
            <Link key={t.path} to={t.path} className={`${cardBg} border ${borderColor} rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group block`} data-testid={`tool-card-${i}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <t.icon size={24} className="text-cyan-400" />
              </div>
              <h2 className={`text-base font-semibold mb-2 group-hover:text-cyan-400 transition-colors ${textPrimary}`}>{t.name}</h2>
              <p className={`text-sm ${textSecondary}`}>{t.desc}</p>
              <span className="text-cyan-400 text-xs font-semibold inline-flex items-center gap-1 mt-3">Open Tool <ArrowRight size={12} /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
