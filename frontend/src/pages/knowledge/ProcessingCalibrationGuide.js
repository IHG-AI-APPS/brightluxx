import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sliders, Monitor, Palette, Eye, Settings, Zap } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "What is LED display calibration and why does it matter?", a: "Calibration adjusts every LED module to match in brightness, colour temperature, and gamma curve. Without calibration, you'll see visible differences between panels — patches of different colour or brightness. Professional calibration uses a camera-based system to measure and correct thousands of measurement points across the entire screen." },
  { q: "What video processing system should I specify?", a: "For most commercial installations, Novastar or Colorlight systems are industry standards. Key specs: support for the screen's full resolution, 10-bit+ colour depth, HDR support (HLG/HDR10), genlock for broadcast environments, and backup/redundancy for 24/7 applications. Budget 10-15% of hardware cost for processing." },
  { q: "What is greyscale bit depth and why does it matter?", a: "Greyscale bit depth determines how many shades of grey (and by extension, colour) the display can render. 14-bit = 16,384 levels, 16-bit = 65,536 levels. Higher bit depth means smoother gradients, more accurate colour, and better low-brightness performance. For video content, specify minimum 14-bit. For broadcast/cinema, 16-bit." },
  { q: "How often should LED displays be recalibrated?", a: "Initial calibration at commissioning is essential. Recalibrate every 12-18 months for premium installations, or when modules are replaced. Outdoor displays may need more frequent calibration due to thermal cycling. Some systems support remote calibration which reduces maintenance visits." },
  { q: "What's the difference between sending card and receiving card?", a: "The sending card sits in the processing PC and converts the video signal to LED protocol. The receiving card sits inside each cabinet and controls the individual LED modules. A single sending card drives multiple receiving cards. For large screens, you need multiple outputs from the sending card or a fiber distribution system." },
  { q: "Do I need HDR for LED displays?", a: "HDR (High Dynamic Range) significantly improves image quality, especially for video content. LED displays are naturally suited for HDR due to their high brightness and contrast. Specify HDR10 or HLG support if the content pipeline supports it. Most premium LED processing systems now include HDR support at no extra cost." },
  { q: "What content management system for LED displays?", a: "For single-screen installations, a simple media player with scheduling software is sufficient. For multi-site networks, cloud-based CMS platforms (BrightSign, Scala, Signagelive) offer remote management, scheduling, playlists, and monitoring. Budget 3-5% of hardware cost for CMS. Ongoing SaaS fees are typically $10-30/screen/month." },
  { q: "What colour gamut should I specify?", a: "LED displays typically cover 100-120% of the sRGB gamut. For standard commercial content, sRGB coverage is sufficient. For cinema, broadcast, or art installations, specify DCI-P3 coverage (90%+). The LED chip brand (Nationstar, Cree, etc.) directly affects colour gamut performance." },
];

export default function ProcessingCalibrationGuide() {
  const faqJsonLd = buildFaqJsonLd(FAQS);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "LED Display Processing & Calibration — Specifier Guide",
    "description": "Complete guide to LED display video processing, calibration, colour management, and content systems. For architects, AV consultants, and specifiers.",
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-03-04",
  };

  return (
    <div className="pb-20" data-testid="knowledge-processing-calibration">
      <SEO
        title="LED Display Processing & Calibration Guide — Video Processing, Colour Management"
        description="Complete guide to LED display video processing, calibration, colour management, and content delivery. Specification tables, processing system comparison, and calibration workflows for AV specifiers."
        path="/knowledge/processing-calibration"
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <KnowledgeHero
        title="Processing & Calibration"
        subtitle="The 'invisible' specifications that define image quality. A guide to video processing, calibration, colour management, and content delivery for LED displays."
        breadcrumb="Processing & Calibration"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <SpecifierAnswerBox
              title="Processing & Calibration — Quick Spec"
              items={[
                'Video processing budget: 10-15% of LED hardware cost',
                'Minimum 14-bit greyscale for commercial video, 16-bit for broadcast/cinema',
                'Camera-based calibration at commissioning is non-negotiable — specify it',
                'Novastar and Colorlight are the two dominant processing platforms',
                'HDR10/HLG support should be standard for any 2026+ installation',
                'For multi-site: cloud CMS with remote monitoring ($10-30/screen/month)',
                'Recalibrate every 12-18 months, or when modules are replaced',
              ]}
              recommendation="AV consultants, systems integrators, and architects specifying high-end video walls"
            />

            {/* Processing System Comparison */}
            <h2 className="text-base font-bold tracking-wider mb-4">Processing System Comparison</h2>
            <ComparisonTable
              caption="LED VIDEO PROCESSING PLATFORMS"
              headers={['Specification', 'Novastar', 'Colorlight', 'Brompton']}
              rows={[
                ['Market Position', 'Industry standard', 'Cost-effective', 'Premium broadcast'],
                ['Max Resolution', '16K+ (cascaded)', '8K+', '8K+'],
                ['Bit Depth', '16-bit', '14-16 bit', '16-bit'],
                ['HDR Support', 'HDR10, HLG', 'HDR10', 'HDR10, HLG, Dolby Vision'],
                ['Redundancy', 'Hot backup available', 'Hot backup available', 'Seamless failover'],
                ['Calibration', 'Camera-based (NovaCLB)', 'Built-in tools', 'Tessera (industry best)'],
                ['Remote Mgmt', 'Cloud platform', 'Cloud platform', 'Limited'],
                ['Price Tier', '$$', '$', '$$$'],
                ['Best For', 'Commercial, rental', 'Budget installations', 'Broadcast, cinema'],
              ]}
            />

            <SectionDivider />

            {/* Calibration Workflow */}
            <h2 className="text-base font-bold tracking-wider mb-4">Calibration Workflow</h2>
            <div className="space-y-3 mb-10">
              {[
                { step: '01', title: 'Pre-Calibration', desc: 'Run display at full white for 100+ hours to stabilize LEDs. This "burn-in" period allows initial brightness decay to occur before calibration locks in settings.' },
                { step: '02', title: 'Camera Measurement', desc: 'A colour-calibrated camera captures brightness and colour data from every module. Software maps the entire screen\'s uniformity profile.' },
                { step: '03', title: 'Correction Coefficients', desc: 'Software calculates per-pixel correction factors for brightness, colour temperature (R/G/B balance), and gamma curve. These are stored in each receiving card.' },
                { step: '04', title: 'Verification', desc: 'Full-screen test patterns verify uniformity. Target: <3% brightness deviation and <0.003 colour deviation (CIE x,y) across the entire display.' },
                { step: '05', title: 'Profile Storage', desc: 'Calibration profiles are backed up. Multiple profiles can be stored (day mode, night mode, broadcast mode). Module replacement requires re-calibration of the replaced area only.' },
              ].map((item) => (
                <div key={item.step} className="glass-panel p-5 flex gap-4" data-testid={`calibration-step-${item.step}`}>
                  <div className="text-2xl font-bold text-[var(--blx-gold-3)] opacity-30 flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.12em] mb-1.5">{item.title}</h3>
                    <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Key Specifications Table */}
            <h2 className="text-base font-bold tracking-wider mb-4">Key Processing Specifications</h2>
            <ComparisonTable
              caption="WHAT TO SPECIFY"
              headers={['Parameter', 'Minimum', 'Recommended', 'Premium']}
              rows={[
                ['Greyscale Bit Depth', '12-bit', '14-bit', '16-bit'],
                ['Colour Depth', '8-bit per channel', '10-bit per channel', '12-bit per channel'],
                ['Colour Gamut', 'sRGB 100%', 'DCI-P3 85%+', 'DCI-P3 95%+'],
                ['Input Latency', '<3 frames', '<2 frames', '<1 frame'],
                ['HDR Format', 'None', 'HDR10', 'HDR10 + HLG + Dolby Vision'],
                ['Redundancy', 'None', 'Hot standby', 'Seamless failover'],
                ['Calibration', 'Manual', 'Camera-based', 'Camera + remote recalibration'],
                ['Signal Distribution', 'CAT6', 'Fiber optic', 'Fiber + redundant path'],
              ]}
            />

            <SectionDivider />

            {/* Content Management Section */}
            <h2 className="text-base font-bold tracking-wider mb-4">Content Management Systems</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: 'Single Screen / Simple', desc: 'BrightSign player + basic scheduling. No cloud fees. Good for: lobbies, single meeting rooms, simple video playback.', cost: '$500-1,500 one-time' },
                { title: 'Multi-Screen / Site', desc: 'Cloud CMS (Scala, Signagelive) with remote scheduling, playlists, and monitoring. Good for: hotels, malls, multi-zone installations.', cost: '$15-30/screen/month' },
                { title: 'Multi-Site Network', desc: 'Enterprise CMS with centralized management, content approval workflows, and real-time monitoring. Good for: retail chains, banks, QSR networks.', cost: '$20-50/screen/month' },
                { title: 'Interactive / Data-Driven', desc: 'API-driven content with real-time data feeds, touch interactivity, and AI-powered content optimization. Good for: wayfinding, smart signage, data dashboards.', cost: '$30-80/screen/month' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`cms-option-${i}`}>
                  <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{item.title}</h3>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-3">{item.desc}</p>
                  <div className="text-[0.625rem] font-bold text-[var(--blx-gold-3)]">{item.cost}</div>
                </div>
              ))}
            </div>

            <SectionDivider />

            <FAQSection faqs={FAQS} title="Processing & Calibration FAQ" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="cob-mip-smd"
              title="Processing Spec Pack"
              description="Complete specification guide for LED display processing systems. Includes comparison tables, calibration workflows, and what-to-ask-the-vendor checklist."
            />
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-1">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/refresh-rate-guide', label: 'Refresh Rate Guide' },
                  { to: '/knowledge/cms-multi-site', label: 'CMS for Multi-Site' },
                  { to: '/calculator', label: 'Screen Calculator' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
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
