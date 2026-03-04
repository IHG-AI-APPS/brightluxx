import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Video, Monitor } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "What refresh rate avoids moire on camera?", a: "For smartphone cameras (most common scenario), 3,840Hz eliminates visible banding. For professional broadcast/cinema cameras, specify 7,680Hz minimum. For slow-motion replay (sports/events), 7,680Hz+ is essential. COB and MiP panels with smooth surfaces naturally reduce moire at any refresh rate." },
  { q: "Why do LED displays flicker on my phone camera?", a: "Flicker appears when the display's refresh rate is close to your phone's frame rate (30/60fps). Below 1,920Hz, most phone cameras will show horizontal bands or flicker. At 3,840Hz+, the refresh is fast enough that every camera frame captures a complete image with no visible artefacts." },
  { q: "Is 1,920Hz enough for indoor displays?", a: "For human viewing only (no photography/video), 1,920Hz is technically sufficient. However, in 2026, virtually every space has people taking photos and videos. We recommend 3,840Hz as the baseline for ALL installations, including offices. The cost premium is minimal." },
  { q: "What is greyscale bit depth and why does it matter?", a: "Bit depth determines how many brightness levels each colour channel can display. 14-bit (16,384 levels) is standard; 16-bit (65,536 levels) is premium. Higher bit depth eliminates colour banding in gradients and shadows. For medical imaging or colour-critical work, 16-bit minimum." },
  { q: "Does higher refresh rate use more power?", a: "Marginally. The power difference between 1,920Hz and 3,840Hz is typically 5-10%, driven by the driver IC (MBI, Chipone). The visual and camera-friendly benefits far outweigh this small power increase. Always specify the higher refresh rate." },
  { q: "What processing system handles high refresh rates?", a: "Novastar (A10s Pro, A8s) and Brompton (Tessera S8/SX40) are the industry leaders for high refresh rate processing. These systems also provide advanced colour calibration, HDR tone mapping, and anti-moire features. Specify the processing system in your tender documents." },
];

export default function RefreshRateGuide() {
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="pb-20" data-testid="knowledge-refresh-rate">
      <SEO
        title="Refresh Rate & Camera Guide — LED Displays"
        description="How to specify LED display refresh rates for camera-friendly installations. Eliminate flicker, banding, and moire patterns. Includes greyscale bit depth guide and processing system recommendations."
        path="/knowledge/refresh-rate-guide"
        jsonLd={[faqJsonLd]}
      />
      <KnowledgeHero title="Refresh Rate &amp; Camera Guide" subtitle="In 2026, every LED display is photographed and filmed by visitors. A display that looks great to the eye but terrible on camera is a failed specification." breadcrumb="Refresh Rate" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <SpecifierAnswerBox
              title="Refresh Rate Quick Reference"
              items={[
                "Human eye: flicker visible below ~60Hz",
                "Smartphone cameras: banding visible below 1,920Hz",
                "Phone camera safe: 3,840Hz (recommended minimum for ALL installations)",
                "Professional broadcast camera safe: 7,680Hz",
                "Slow-motion video safe: 7,680Hz+",
                "COB/MiP panels produce less moire than SMD at any refresh rate",
                "Greyscale 16-bit minimum for colour-critical applications",
              ]}
              recommendation="All installations where visitors may photograph or film — retail, hospitality, events, corporate, broadcast"
            />

            <h2 className="text-lg font-bold tracking-wider mb-4">Why Refresh Rate Matters</h2>
            <div className="glass-panel p-6 mb-8">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Refresh rate (Hz) is how many times per second the display redraws its image. Low refresh rates cause visible flicker and horizontal scan lines through cameras. In 2026, with everyone filming on smartphones, this is a critical specification.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Monitor, value: '60 Hz', label: 'Human comfort minimum' },
                  { icon: Camera, value: '3,840 Hz', label: 'Phone camera safe' },
                  { icon: Video, value: '7,680 Hz', label: 'Broadcast safe' },
                ].map(item => (
                  <div key={item.label} className="text-center py-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <item.icon size={20} className="text-[var(--blx-gold-3)] mx-auto mb-2" />
                    <div className="text-sm font-bold text-[var(--blx-gold-3)]">{item.value}</div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider mt-1" style={{ textTransform: 'none' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">Refresh Rate by Application</h2>
            <ComparisonTable
              headers={['Application', 'Min Refresh', 'Recommended', 'Reasoning']}
              rows={[
                ['Office / internal use', '1,920 Hz', '3,840 Hz', 'Staff photograph screens'],
                ['Retail / public space', '3,840 Hz', '3,840 Hz', 'Customers film constantly'],
                ['Hotel lobby / F&B', '3,840 Hz', '3,840 Hz', 'Social media content'],
                ['Broadcast studio', '3,840 Hz', '7,680 Hz', 'Professional cameras'],
                ['Live event / concert', '3,840 Hz', '7,680 Hz', 'Broadcast + phones'],
                ['Museum / gallery', '3,840 Hz', '3,840 Hz', 'Visitor photography'],
                ['Outdoor advertising', '1,920 Hz', '3,840 Hz', 'Camera distance helps'],
                ['Corporate boardroom', '3,840 Hz', '3,840 Hz', 'Video conferencing'],
              ]}
              caption="REFRESH RATE SPECIFICATION TABLE"
            />

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-4">Moire Pattern Prevention</h2>
            <div className="glass-panel p-6 mb-8">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Moire patterns appear as wavy interference lines when a camera's sensor grid interferes with the LED pixel grid. Prevention strategies:
              </p>
              <ul className="space-y-2">
                {[
                  'Higher refresh rate is the primary solution — 3,840Hz eliminates most moire',
                  'COB/MiP panels with smooth encapsulated surfaces produce significantly less moire than SMD',
                  'Smaller pixel pitch reduces moire visibility at close camera distances',
                  'Anti-moire diffuser films can be applied (accept 5-10% brightness reduction)',
                  'Novastar and Brompton processing systems include software anti-moire settings',
                  'Camera angle adjustment — shooting perpendicular to the display minimises moire',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--blx-gold-3)] font-bold text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-xs text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">Greyscale &amp; Bit Depth</h2>
            <ComparisonTable
              headers={['Bit Depth', 'Greyscale Levels', 'Total Colours', 'Use Case']}
              rows={[
                ['14-bit', '16,384 per channel', '4.4 trillion', 'Standard indoor'],
                ['16-bit', '65,536 per channel', '281 trillion', 'Premium / broadcast'],
                ['18-bit', '262,144 per channel', '18+ quadrillion', 'Ultra-premium / medical'],
              ]}
              caption="GREYSCALE BIT DEPTH COMPARISON"
            />

            <SectionDivider />
            <FAQSection faqs={FAQS} />

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">Get Camera-Friendly Spec <ArrowRight size={14} /></Link>
              <a href={`https://wa.me/971559954274?text=${encodeURIComponent("Hi, I need a camera-friendly LED display specification for my project. Can you help?")}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]">WhatsApp a Specialist</a>
            </div>
          </div>

          <aside className="space-y-6">
            <SpecPackCTA packId="refresh-rate" title="Refresh Rate & Camera Spec Pack" description="Complete refresh rate guide with camera compatibility tables, moire prevention strategies, and processing system recommendations." />
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-2">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/ip-rating-guide', label: 'IP Rating Guide' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={12} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
