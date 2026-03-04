import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, Clock, Wrench, FileText, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { SpecifierAnswerBox, ComparisonTable, FAQSection, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';

const SLA_SPEC_BOX = [
  'LED display SLAs typically cover 3-5 years, but critical terms vary dramatically between vendors',
  'Key metrics: uptime guarantee (%), response time (hours), parts availability (%), and MTTR (hours)',
  'UAE/GCC climate requires specific SLA clauses for heat-related failures and dust ingress',
  'Most vendor SLAs exclude content management, network, and power supply failures — these gaps cost projects',
  'A strong SLA should define "resolution" vs "response" — many vendors promise fast response but slow resolution',
  'Always negotiate spare parts inventory held locally in UAE — shipping from China adds 2-4 weeks downtime',
  'Penalty clauses (liquidated damages) are rare in standard SLAs — request them for mission-critical installations',
];

const SLA_COMPARISON = {
  headers: ['SLA Element', 'Basic (Standard)', 'Professional', 'Enterprise / Mission-Critical'],
  rows: [
    ['Uptime Guarantee', '95%', '99%', '99.9%'],
    ['Response Time', '48 hours', '24 hours', '4 hours'],
    ['Resolution Time (MTTR)', 'Not defined', '72 hours', '24 hours'],
    ['On-Site Support', 'By request', 'Next business day', 'Same-day'],
    ['Spare Parts', 'Ship from factory', 'Regional warehouse', 'On-site buffer stock'],
    ['Remote Monitoring', 'Not included', 'Included', '24/7 NOC monitoring'],
    ['Preventive Maintenance', 'None', 'Annual', 'Quarterly'],
    ['Penalty Clauses', 'None', 'Credit for downtime', 'Liquidated damages'],
    ['Firmware Updates', 'None', 'Annual', 'As available'],
    ['Typical Price (% of CAPEX/yr)', '0%', '5-8%', '10-15%'],
  ],
};

const COMMON_GAPS = [
  {
    title: 'Response vs Resolution Confusion',
    severity: 'Critical',
    desc: 'Many SLAs promise "4-hour response" but this means acknowledging your ticket — not fixing the display. MTTR (Mean Time to Repair) is what matters. A vendor may respond in 4 hours but take 2 weeks to ship replacement parts.',
    fix: 'Define both response time AND resolution time separately. Tie penalties to resolution, not response.',
  },
  {
    title: 'No Local Spare Parts Inventory',
    severity: 'Critical',
    desc: 'If the vendor has no spare modules in UAE/GCC, any hardware failure requires shipping from China or Korea (2-4 weeks). For a hotel lobby or command center, this is unacceptable.',
    fix: 'Require the vendor to hold 5-10% spare modules locally. Define maximum procurement time for replacement parts.',
  },
  {
    title: 'Climate Exclusions',
    severity: 'High',
    desc: 'Standard SLAs often exclude failures caused by "environmental conditions." In the GCC, temperatures exceed 50C and humidity can reach 90%. Semi-outdoor installations are especially vulnerable.',
    fix: 'Ensure the SLA explicitly covers operation within UAE climate parameters. Require IP-rated enclosures for semi-outdoor.',
  },
  {
    title: 'Software & Content Not Covered',
    severity: 'High',
    desc: 'Most hardware SLAs explicitly exclude CMS software, content management, and network connectivity. When the display goes black due to a software crash, the hardware vendor says "not our problem."',
    fix: 'Negotiate a combined hardware + software SLA, or ensure you have separate support contracts for CMS and network.',
  },
  {
    title: 'No Uptime Guarantee',
    severity: 'High',
    desc: 'Many vendor SLAs have no measurable uptime commitment. Without this, there is no accountability for repeated failures or extended downtime.',
    fix: 'Define minimum uptime (99% = 87.6 hours downtime/year). Include monitoring to measure actual uptime objectively.',
  },
  {
    title: 'Warranty Voiding Traps',
    severity: 'Medium',
    desc: 'Some SLAs void the warranty if a third-party contractor performs any work on the display — including running a new cable or adjusting a bracket. This traps you into using the vendor for even minor tasks.',
    fix: 'Define exactly what actions void the warranty. Ensure routine maintenance by your facilities team is permitted.',
  },
  {
    title: 'No Escalation Path',
    severity: 'Medium',
    desc: 'When the local support team cannot resolve an issue, there is no defined path to escalate to the manufacturer or a senior engineer. Issues linger for weeks.',
    fix: 'Require a documented escalation matrix with names, contact details, and time-bound escalation triggers.',
  },
  {
    title: 'End-of-Life Parts Risk',
    severity: 'Medium',
    desc: 'LED modules are typically manufactured for 3-5 years. After that, replacement modules may not be available, or new modules may not colour-match the original display.',
    fix: 'Require the vendor to guarantee parts availability for the SLA duration. Include colour-matching requirements for replacement modules.',
  },
];

const FAQS = [
  { q: 'What is a typical LED display SLA duration?', a: 'Standard SLAs in the UAE market range from 1-5 years. Most vendors offer 2-3 year hardware warranties as standard, with optional extended SLA contracts for years 3-5. For mission-critical installations (command centers, hospitals), we recommend a minimum 5-year SLA with annual renewal options.' },
  { q: 'How much does an SLA cost?', a: 'SLA pricing is typically expressed as a percentage of the initial hardware CAPEX per year. Basic SLAs (parts warranty only) are included in the purchase price. Professional SLAs with on-site support and spare parts cost 5-8% of CAPEX annually. Enterprise/mission-critical SLAs with 24/7 monitoring and 4-hour resolution cost 10-15% per year.' },
  { q: 'Should I buy the SLA from the LED manufacturer or the local integrator?', a: 'In most cases, the local integrator is the better choice for SLA because they provide on-site support. However, ensure the integrator has a back-to-back agreement with the manufacturer for parts supply and technical escalation. The integrator should not be solely responsible for hardware defects — the manufacturer must stand behind their product.' },
  { q: 'What uptime should I specify for my LED display?', a: 'It depends on the application. Retail and hospitality: 95-99% is standard. Corporate boardrooms: 99%. Command centers and transport: 99.9% minimum. Note that 99% uptime still allows 87.6 hours of downtime per year — nearly 4 full days. For truly critical applications, insist on 99.9% (8.7 hours/year) with penalty clauses.' },
  { q: 'Can I negotiate SLA terms with LED display vendors?', a: 'Absolutely. Most vendors start with a template SLA that favors them. Key terms to negotiate: resolution time (not just response time), local spare parts inventory, penalty clauses for missed SLA targets, climate-specific coverage for UAE/GCC, and escalation procedures. Vendors competing for large projects are usually willing to improve their SLA terms.' },
  { q: 'What should I do if my current SLA has gaps?', a: 'Use our SLA Gap Analysis Checklist to audit your current agreement. Identify the most critical gaps (spare parts, resolution time, uptime guarantees) and approach your vendor for an SLA amendment or upgrade. If the vendor is unwilling to address critical gaps, consider this when planning your next procurement.' },
];

const CHECKLIST_ITEMS = [
  { category: 'Uptime & Availability', items: ['Minimum uptime percentage defined', 'Measurement method specified (remote monitoring required)', 'Planned maintenance windows excluded from uptime calculation', 'Penalty clauses for uptime breaches'] },
  { category: 'Response & Resolution', items: ['Response time defined (hours to acknowledge)', 'Resolution time / MTTR defined (hours to fix)', 'Different tiers for severity levels (critical, major, minor)', 'Escalation matrix with contacts and timeframes'] },
  { category: 'Parts & Inventory', items: ['Spare parts held locally in UAE/GCC', 'Maximum procurement time for replacement parts', 'Colour matching guaranteed for replacement modules', 'End-of-life parts availability commitment'] },
  { category: 'On-Site Support', items: ['On-site engineer availability (next day / same day / resident)', 'After-hours and weekend support defined', 'Holiday support coverage (UAE public holidays)', 'Preventive maintenance schedule included'] },
  { category: 'Environment & Climate', items: ['UAE climate parameters explicitly covered', 'Semi-outdoor/outdoor installations have IP rating requirements', 'Cooling system maintenance included', 'Dust filtration and cleaning schedule defined'] },
  { category: 'Software & Integration', items: ['CMS software support included or separate', 'Firmware update schedule and testing process', 'Network and connectivity support defined', 'Third-party integration support (BMS, AV matrix)'] },
  { category: 'Commercial Terms', items: ['SLA duration and renewal terms', 'Price escalation caps for renewals', 'Termination clauses and notice periods', 'Insurance and liability coverage'] },
];

export default function SlaGuide() {
  return (
    <div className="pb-20" data-testid="sla-guide-page">
      <SEO
        title="LED Display SLA Gap Analysis — Service Level Agreement Guide | Brightluxx"
        description="Comprehensive guide to LED display Service Level Agreements for UAE/GCC. Identify common SLA gaps, compare warranty tiers, and download our free SLA audit checklist for architects and contractors."
        path="/sla-guide"
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "LED Display SLA Gap Analysis — Service Level Agreement Guide",
          "description": "Comprehensive guide to LED display Service Level Agreements for UAE/GCC projects.",
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
          "datePublished": "2026-03-04",
        }]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-12 mb-8">
        <div className="absolute inset-0 blx-led-grid" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/knowledge" className="hover:text-[var(--blx-text-2)] transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">SLA Gap Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight">LED Display SLA Gap Analysis</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-3 max-w-2xl tracking-wider leading-relaxed" style={{ textTransform: 'none' }}>
            A specifier's guide to evaluating and negotiating LED display Service Level Agreements. Identify the 8 most common SLA gaps, compare warranty tiers, and protect your project from costly downtime.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            <SpecifierAnswerBox
              title="SLA Gap Analysis — Specifier Quick Reference"
              items={SLA_SPEC_BOX}
              recommendation="Architects specifying LED displays, AV consultants writing tender documents, contractors evaluating vendor proposals, and facilities managers reviewing existing maintenance contracts."
            />

            {/* Comparison Table */}
            <h2 className="text-base font-bold tracking-wider mb-4">SLA Tier Comparison</h2>
            <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed" style={{ textTransform: 'none' }}>
              LED display SLAs generally fall into three tiers. Understanding these tiers helps you specify the appropriate level of service for your project's criticality and budget.
            </p>
            <ComparisonTable
              caption="SLA TIER COMPARISON"
              headers={SLA_COMPARISON.headers}
              rows={SLA_COMPARISON.rows}
            />

            <SectionDivider />

            {/* Common Gaps */}
            <h2 className="text-base font-bold tracking-wider mb-4" id="gaps">8 Common SLA Gaps</h2>
            <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed" style={{ textTransform: 'none' }}>
              After reviewing hundreds of LED display SLAs across UAE and GCC projects, these are the most frequent and costly gaps we encounter. Each gap includes a recommended fix you can add to your specification or tender document.
            </p>
            <div className="space-y-4 mb-10">
              {COMMON_GAPS.map((gap, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`sla-gap-${i}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xs font-bold tracking-[0.12em] flex items-center gap-2">
                      <AlertTriangle size={14} className={gap.severity === 'Critical' ? 'text-red-400' : gap.severity === 'High' ? 'text-amber-400' : 'text-[var(--blx-muted)]'} />
                      {gap.title}
                    </h3>
                    <span className={`text-[0.45rem] font-bold tracking-[0.2em] px-2 py-0.5 rounded-full ${
                      gap.severity === 'Critical' ? 'bg-red-400/10 text-red-400' :
                      gap.severity === 'High' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-[rgba(255,255,255,0.06)] text-[var(--blx-muted)]'
                    }`}>
                      {gap.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-3" style={{ textTransform: 'none' }}>{gap.desc}</p>
                  <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.12)' }}>
                    <span className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)]">FIX: </span>
                    <span className="text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{gap.fix}</span>
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* SLA Checklist */}
            <h2 className="text-base font-bold tracking-wider mb-4" id="checklist">SLA Audit Checklist</h2>
            <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed" style={{ textTransform: 'none' }}>
              Use this checklist to audit your current LED display SLA or to build requirements for a new tender. Each item should be explicitly addressed in your Service Level Agreement.
            </p>
            <div className="space-y-4 mb-10">
              {CHECKLIST_ITEMS.map((section, si) => (
                <div key={si} className="glass-panel p-5" data-testid={`sla-checklist-${si}`}>
                  <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">{section.category.toUpperCase()}</div>
                  <div className="space-y-2">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded border border-[var(--blx-border)] flex-shrink-0 mt-0.5" />
                        <span className="text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={FAQS} title="SLA FAQ" />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Need SLA Review Support?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Our technical team can review your existing LED display SLA and identify gaps. Free for architects and consultants specifying Brightluxx products.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  Request SLA Review <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/971559910711" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559910711" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="sla-checklist"
              title="SLA Audit Checklist PDF"
              description="Download the complete SLA Gap Analysis checklist. Includes all 7 categories, 28 audit items, and a vendor comparison scorecard."
            />

            <div className="glass-panel p-5">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">ON THIS PAGE</div>
              <div className="space-y-2">
                <a href="#gaps" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <AlertTriangle size={10} className="text-[var(--blx-gold-3)]" /> 8 Common SLA Gaps
                </a>
                <a href="#checklist" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <CheckCircle2 size={10} className="text-[var(--blx-gold-3)]" /> SLA Audit Checklist
                </a>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">RELATED RESOURCES</div>
              <div className="space-y-2">
                <Link to="/value-engineering" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Value Engineering Hub
                </Link>
                <Link to="/for-architects" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> For Architects
                </Link>
                <Link to="/knowledge" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Knowledge Base
                </Link>
                <Link to="/case-studies" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Case Studies
                </Link>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">KEY SLA METRICS</div>
              <div className="space-y-3">
                {[
                  { label: '99% Uptime', value: '87.6 hrs downtime/year' },
                  { label: '99.5% Uptime', value: '43.8 hrs downtime/year' },
                  { label: '99.9% Uptime', value: '8.7 hrs downtime/year' },
                  { label: '99.99% Uptime', value: '52.6 mins downtime/year' },
                ].map((metric, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[0.6875rem] font-bold text-[var(--blx-text)]">{metric.label}</span>
                    <span className="text-[0.5625rem] text-[var(--blx-muted)]">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
