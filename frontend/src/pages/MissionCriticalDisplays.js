import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, Shield, Server, Clock, Radio, Building2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FAQS = [
  { q: 'What makes an LED display "mission-critical" grade?', a: '24/7-rated components, redundant power supplies and receiving cards, front-serviceable modules, dual signal paths and guaranteed response-time SLAs. Consumer or standard commercial walls are not designed for continuous unattended operation.' },
  { q: 'Do you supply control room LED displays in Abu Dhabi and Dubai?', a: 'Yes — we are an LED display manufacturer partner, distributor and integrator for the UAE, with delivered command-center work including the ADNOC headquarters control room in Abu Dhabi. We support government, energy, transport and security operators across the GCC.' },
  { q: 'What pixel pitch is right for a command and control center?', a: 'Most control rooms use P0.9 to P1.5 fine-pitch COB or MicroLED so operators at 2–5 metres can read dense dashboards without visible pixels. We demo the options in our Dubai showroom against your actual SCADA or video-management content.' },
  { q: 'Can you meet government procurement and security requirements?', a: 'Yes — we provide compliance documentation, on-premise (non-cloud) control options, vetted installation staff and maintenance contracts with defined response times, structured to pass UAE government and system-integrator procurement review.' },
];

export default function MissionCriticalDisplays() {
  const { isDark } = useTheme();
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050508]' : 'bg-neutral-50'} pt-28 pb-20`} data-testid="mission-critical-page">
      <SEO
        title="Mission-Critical & Command Center LED Displays UAE | Brightluxx"
        description="Control room LED displays and command & control center screens for UAE government, energy and security operators. Manufacturer, distributor and integrator — Abu Dhabi & Dubai. ADNOC HQ delivered."
        path="/mission-critical-displays"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Government &amp; Enterprise</span>
        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-5 ${textPrimary}`}>Mission-Critical &amp; Command Center Displays</h1>
        <p className={`text-base max-w-3xl mb-4 ${textSecondary}`}>
          Brightluxx designs, supplies and integrates control room LED displays and command &amp; control center display screens for UAE and GCC operators — as manufacturer partner, distributor and integrator in one. Our mission-critical walls run 24/7 with redundant power, dual signal paths and guaranteed-response maintenance.
        </p>
        <p className={`text-base max-w-3xl mb-10 ${textSecondary}`}>
          Delivered work includes the <Link to="/case-studies/adnoc-hq-command-center" className="text-cyan-400 hover:underline" data-testid="mc-adnoc-link">ADNOC HQ Command Center in Abu Dhabi</Link> and passenger-information systems for Riyadh Metro. See also our <Link to="/solutions/control-rooms" className="text-cyan-400 hover:underline">control room solutions</Link> and <Link to="/abu-dhabi" className="text-cyan-400 hover:underline">Abu Dhabi team</Link>.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[
            { icon: Clock, t: '24/7 Rated Operation', d: 'Components, thermals and drivers specified for continuous unattended running — not standard commercial duty cycles.' },
            { icon: Server, t: 'Full Redundancy', d: 'Dual power supplies, backup receiving cards and redundant processing so a single failure never blanks the wall.' },
            { icon: Shield, t: 'Secure & Compliant', d: 'On-premise control, vetted staff and documentation prepared for government and SI procurement review.' },
            { icon: Radio, t: 'Any Source, One Wall', d: 'SCADA, VMS, broadcast feeds and dashboards windowed onto one seamless fine-pitch canvas.' },
          ].map((c) => (
            <div key={c.t} className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4"><c.icon size={22} className="text-cyan-400" /></div>
              <h2 className={`text-base font-semibold mb-2 ${textPrimary}`}>{c.t}</h2>
              <p className={`text-sm ${textSecondary}`}>{c.d}</p>
            </div>
          ))}
        </div>
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>Sectors We Serve</h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-14">
          {['Government command & control centers (Abu Dhabi, Dubai, GCC)', 'Energy & utilities operations rooms — oil, gas, power grid', 'Transport control — metro, airports, road traffic management', 'Security & emergency operations centers (911/999 dispatch)', 'Network operations centers (NOC/SOC) for telecom & banking', 'Defense and critical infrastructure monitoring'].map((s) => (
            <li key={s} className={`flex items-start gap-3 text-sm ${textSecondary}`}><CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />{s}</li>
          ))}
        </ul>
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-6 ${textPrimary}`}>Mission-Critical Display FAQs</h2>
        <div className="space-y-4 mb-14">
          {FAQS.map((f, i) => (
            <div key={i} className={`${cardBg} border ${borderColor} rounded-xl p-5`} data-testid={`mc-faq-${i}`}>
              <h3 className={`text-sm font-semibold mb-2 ${textPrimary}`}>{f.q}</h3>
              <p className={`text-sm leading-relaxed ${textSecondary}`}>{f.a}</p>
            </div>
          ))}
        </div>
        <div className={`${cardBg} border ${borderColor} rounded-2xl p-8 text-center`}>
          <h2 className={`text-2xl font-bold mb-3 ${textPrimary}`}>Specifying a control room display?</h2>
          <p className={`text-sm mb-6 max-w-xl mx-auto ${textSecondary}`}>Send us your RFP or room drawings — we respond with compliant specifications, redundancy schema and budget within 48 hours.</p>
          <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2" data-testid="mc-cta">
            Request Specification Pack <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
