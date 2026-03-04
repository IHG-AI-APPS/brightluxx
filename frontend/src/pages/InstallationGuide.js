import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, CheckCircle2, AlertTriangle, Ruler, Weight, Wind, ThermometerSun, Wrench, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider, SpecPackCTA } from '../components/KnowledgeBase';
import QuickInquiry from '../components/QuickInquiry';

const METHODS = [
  {
    id: 'wall-mount',
    title: 'Wall-Mounted (Surface)',
    tagline: 'Most common indoor installation',
    desc: 'LED panels are mounted directly onto wall brackets attached to the structural wall or steel subframe. The display sits proud of the wall surface, with rear-access panels for maintenance.',
    when: 'Lobbies, boardrooms, retail feature walls, houses of worship, auditoriums',
    diagram: {
      type: 'wall',
      labels: ['Wall surface', 'Steel mounting rail', 'LED panel', 'Rear service gap', 'Floor'],
    },
    specs: [
      { label: 'Wall Load', value: '35-80 kg/m²', note: 'Depends on pixel pitch (finer = heavier)' },
      { label: 'Rear Clearance', value: '600-800 mm', note: 'Minimum for rear-access maintenance' },
      { label: 'Mounting Points', value: 'Every 600mm', note: 'M10/M12 anchor bolts into concrete' },
      { label: 'Structural Wall', value: 'Min 150mm concrete', note: 'Or steel subframe for drywall' },
      { label: 'Power Points', value: 'Top or side', note: 'One 32A circuit per 5-8 sqm' },
      { label: 'Data Cabling', value: 'Cat6 / Fiber', note: 'From control room to display location' },
    ],
    pros: ['Simplest and fastest installation', 'Easy rear-access maintenance', 'Cost-effective mounting hardware', 'Suitable for most indoor environments'],
    cons: ['Display protrudes 150-250mm from wall', 'Requires structural wall or subframe', 'Rear clearance reduces usable room depth', 'Visible edges and mounting frame'],
    gccNote: 'In GCC high-rises, verify wall construction before specifying. Many interior walls are lightweight block or drywall that cannot support LED weight. Always request structural engineer confirmation. For glass curtain wall buildings, a steel subframe tied to the slab is typically required.',
    steps: [
      'Structural survey — confirm wall capacity or design subframe',
      'Install steel mounting rails at specified centres (typically 600mm)',
      'Route power (32A dedicated circuits) and data (Cat6/fiber) cabling',
      'Mount LED cabinets onto rails from bottom to top',
      'Connect power and signal daisy-chain between cabinets',
      'Calibrate display — colour uniformity across all panels',
      'Final alignment and gap adjustment between cabinets',
    ],
  },
  {
    id: 'recessed',
    title: 'Recessed (Flush Mount)',
    tagline: 'Premium finish for luxury environments',
    desc: 'The LED display is installed within a wall cavity or purpose-built niche so the screen surface is flush with the surrounding wall. Creates a seamless, built-in appearance favoured in luxury retail, corporate headquarters, and high-end hospitality.',
    when: 'Luxury retail, 5-star hotels, corporate HQs, VIP lounges, museum galleries',
    diagram: {
      type: 'recessed',
      labels: ['Wall finish', 'Recessed niche', 'LED panel (flush)', 'Service void', 'Shadow gap trim'],
    },
    specs: [
      { label: 'Niche Depth', value: '250-400 mm', note: 'Panel depth + 100mm service space' },
      { label: 'Niche Width/Height', value: 'Display +20mm', note: 'Allow for 10mm shadow gap each side' },
      { label: 'Wall Load', value: '35-80 kg/m²', note: 'Plus niche framing structural load' },
      { label: 'Service Access', value: 'Front-service panels', note: 'Or rear access door/hidden corridor' },
      { label: 'Ventilation', value: 'Active extraction', note: 'Enclosed niche requires forced airflow' },
      { label: 'Trim/Finish', value: 'Shadow gap or flush', note: 'Coordinate with interior designer' },
    ],
    pros: ['Premium, seamless architectural appearance', 'Display surface flush with wall plane', 'Clean sight lines — no visible mounting hardware', 'Professional finish for luxury environments'],
    cons: ['Requires early coordination with architect', 'Higher construction cost (niche build-out)', 'Ventilation critical — enclosed space traps heat', 'Front-service panels needed if no rear access'],
    gccNote: 'In GCC luxury projects (5-star hotels, mall flagships), recessed installation is often mandatory in the design brief. Coordinate with the interior fit-out contractor early — the niche must be built during the shell & core or fit-out phase, not as an afterthought. HVAC engineers must account for the enclosed heat load.',
    steps: [
      'Coordinate niche dimensions with architect during design phase',
      'Build structural niche with correct depth, width, and height tolerances',
      'Install ventilation — intake at bottom, extraction at top of niche',
      'Route power and data cabling through service void',
      'Mount LED panels into niche using adjustable brackets',
      'Install trim/shadow gap detail around perimeter',
      'Commission — verify thermal performance in enclosed space',
    ],
  },
  {
    id: 'ceiling-hung',
    title: 'Ceiling-Hung (Suspended)',
    tagline: 'Double-sided and overhead displays',
    desc: 'LED displays are suspended from the ceiling structure using steel rods, cables, or truss systems. Common for double-sided displays in retail environments, overhead signage in transport hubs, and hanging banners in event spaces.',
    when: 'Airports, shopping malls, metro stations, event venues, retail atriums',
    diagram: {
      type: 'ceiling',
      labels: ['Ceiling slab', 'Steel suspension rods', 'Mounting truss', 'LED panel', 'Floor level'],
    },
    specs: [
      { label: 'Ceiling Load', value: '50-100 kg/m²', note: 'Per suspension point — verify slab capacity' },
      { label: 'Suspension Rods', value: 'M16 threaded rod', note: 'Minimum 4 points per display section' },
      { label: 'Display Weight', value: '30-65 kg/m²', note: 'Double for dual-sided configurations' },
      { label: 'Min Clearance', value: '2.4m to bottom', note: 'ADA/accessibility compliance minimum' },
      { label: 'Seismic Rating', value: 'Zone 2A typical', note: 'UAE seismic requirements apply' },
      { label: 'Wind Load', value: 'If exterior atrium', note: 'Calculate for open-air mall environments' },
    ],
    pros: ['Visible from multiple directions (dual-sided)', 'Does not occupy floor or wall space', 'Dramatic visual impact in tall spaces', 'Adjustable height post-installation'],
    cons: ['Complex structural engineering required', 'Difficult maintenance (height access)', 'Ceiling slab must support concentrated loads', 'Swing/vibration management needed'],
    gccNote: 'Many GCC malls have atrium spaces 15-30m high with suspended LED displays. Structural attachment to the roof truss or slab requires early coordination with the structural engineer. Dubai Civil Defence regulations mandate seismic restraints for suspended elements above public areas. Factor in maintenance access — scissor lifts or permanent catwalks.',
    steps: [
      'Structural engineer to confirm ceiling/slab capacity at attachment points',
      'Install embedded anchor plates or chemical anchors in concrete slab',
      'Fabricate and install steel suspension frame or truss system',
      'Attach LED cabinets to suspension frame with safety cables',
      'Route power and data via ceiling void or cable management system',
      'Level and align display — ensure plumb and square',
      'Install safety secondary retention (steel cables) per code',
    ],
  },
  {
    id: 'freestanding',
    title: 'Freestanding (Floor-Standing)',
    tagline: 'Flexible placement without wall attachment',
    desc: 'LED displays mounted on weighted floor bases or mobile stands that do not require wall or ceiling attachment. Ideal for temporary installations, events, showrooms, and spaces where structural modification is not possible.',
    when: 'Trade shows, pop-up retail, showrooms, event stages, rental applications',
    diagram: {
      type: 'freestanding',
      labels: ['LED panel', 'Vertical support frame', 'Weighted base plate', 'Levelling feet', 'Floor surface'],
    },
    specs: [
      { label: 'Base Weight', value: '2-3x display weight', note: 'Counterbalance for tip-over prevention' },
      { label: 'Floor Load', value: '150-300 kg/m²', note: 'Concentrated at base — verify floor rating' },
      { label: 'Max Height', value: '3-4m typical', note: 'Higher requires engineering analysis' },
      { label: 'Stability', value: 'Anti-tip rated', note: 'Must resist 50kg lateral force' },
      { label: 'Mobility', value: 'Optional castors', note: 'Lockable wheels for repositioning' },
      { label: 'Setup Time', value: '2-6 hours', note: 'Per display for standard configurations' },
    ],
    pros: ['No structural modifications required', 'Relocatable and reusable', 'Fast setup and teardown', 'Ideal for temporary or rental applications'],
    cons: ['Heavy base required for stability', 'Limited to smaller/medium displays', 'Base footprint occupies floor space', 'Cable management more visible'],
    gccNote: 'Freestanding LED displays are extremely popular at GCC events and exhibitions (GITEX, Cityscape, Arabian Travel Market). Rental companies stock modular freestanding systems. For permanent showroom use, ensure the base is engineered for the specific display weight — standard TV floor stands are not rated for commercial LED walls.',
    steps: [
      'Verify floor load capacity at intended location',
      'Assemble base frame with counterweight ballast',
      'Erect vertical support structure on levelled base',
      'Mount LED cabinets onto frame from bottom up',
      'Connect power and signal cabling with floor cable covers',
      'Level, align, and safety-check stability',
      'Mark exclusion zone around base if in public area',
    ],
  },
  {
    id: 'ground-stack',
    title: 'Ground-Supported (Stacking)',
    tagline: 'Large-format outdoor and event displays',
    desc: 'Large outdoor LED displays built up from ground level using stacked cabinets on a steel support structure or ground frame. The structure bears the full weight, allowing displays to reach significant heights without ceiling attachment.',
    when: 'Outdoor billboards, concert stages, sports venues, building facades, drive-in cinemas',
    diagram: {
      type: 'ground',
      labels: ['LED cabinets (stacked)', 'Steel support structure', 'Concrete foundation', 'Ground level', 'Guy wires (if tall)'],
    },
    specs: [
      { label: 'Foundation', value: 'Engineered concrete', note: 'Pad or pile foundation per soil report' },
      { label: 'Wind Load', value: 'Up to 200 km/h', note: 'UAE design wind speed for permanent structures' },
      { label: 'Structure', value: 'Hot-dip galvanised', note: 'Steel frame to resist GCC salt/humidity' },
      { label: 'Total Weight', value: '50-120 kg/m²', note: 'Display + structure + wind bracing' },
      { label: 'IP Rating', value: 'IP65 front / IP54 rear', note: 'Full weather protection for outdoor use' },
      { label: 'Permits', value: 'Municipality approval', note: 'Dubai/AD/Riyadh signage permits required' },
    ],
    pros: ['Supports very large display sizes (100+ sqm)', 'No ceiling or wall attachment needed', 'Engineered for outdoor wind and weather', 'Can be permanent or semi-permanent'],
    cons: ['Requires engineered foundation', 'Municipality permits and approvals needed', 'Higher structural steel costs', 'Access equipment needed for maintenance'],
    gccNote: 'Outdoor ground-supported LED structures in the GCC must be designed for extreme conditions: 50°C+ temperatures, sandstorms, and coastal humidity. All steel must be hot-dip galvanised or marine-grade. Dubai Municipality, Abu Dhabi DMT, and Riyadh Municipality each have specific signage regulations covering size, brightness, content, and operating hours. Allow 4-8 weeks for permit processing.',
    steps: [
      'Geotechnical soil investigation at installation site',
      'Structural engineer designs foundation and support frame',
      'Apply for municipality signage permits (4-8 weeks)',
      'Pour concrete foundation per engineered drawings',
      'Erect steel support structure with crane',
      'Install LED cabinets onto structure from bottom up',
      'Commission electrical, network, and content management system',
      'Final inspection and permit sign-off',
    ],
  },
  {
    id: 'curved',
    title: 'Curved & Creative',
    tagline: 'Non-standard shapes and artistic installations',
    desc: 'LED panels configured in concave, convex, S-curve, cylindrical, or completely custom shapes. Uses flexible LED panels or angled standard cabinets to create unique architectural features and immersive environments.',
    when: 'Brand experience centers, immersive rooms, museum exhibitions, architectural features, 3D anamorphic corners',
    diagram: {
      type: 'curved',
      labels: ['Curved steel subframe', 'Flexible LED panels', 'Adjustable mounting brackets', 'Custom radius template', 'Service access'],
    },
    specs: [
      { label: 'Min Radius', value: '500mm (flexible)', note: 'COB flexible panels achieve tightest curves' },
      { label: 'Panel Type', value: 'Flexible or angled', note: 'Flexible for smooth curves, angled for faceted' },
      { label: 'Subframe', value: 'Custom CNC steel', note: 'Precision-fabricated to exact curve profile' },
      { label: 'Pixel Pitch', value: 'P1.2-P2.5 typical', note: 'Finer pitch hides faceting on tight curves' },
      { label: 'Seam Visibility', value: 'Critical factor', note: 'Tighter curves = more visible panel gaps' },
      { label: 'Content', value: 'Custom mapped', note: 'Content must be mapped to exact geometry' },
    ],
    pros: ['Unique, one-of-a-kind visual impact', 'Creates immersive viewing experiences', 'Unlimited creative possibilities', 'Strong social media and PR potential'],
    cons: ['Significantly higher engineering cost', 'Custom subframe fabrication required', 'Content must be custom-produced for geometry', 'Panel gap visibility increases on tight curves'],
    gccNote: 'Creative LED installations are a growing trend in GCC premium projects — museum pavilions, brand experience centers, and flagship retail. 3D anamorphic corner displays (L-shaped for glasses-free 3D) are particularly popular in Dubai and Riyadh for their viral social media potential. Budget 2-3x the cost of flat installations for custom curved work.',
    steps: [
      'Design intent meeting with architect/interior designer',
      '3D modelling of exact curve geometry and panel layout',
      'Fabricate custom steel subframe to millimeter tolerances',
      'Install subframe with precision laser alignment',
      'Mount flexible or angled LED panels onto subframe',
      'Fine-adjust panel angles for seamless curve appearance',
      'Content mapping — calibrate to exact installed geometry',
      'Colour and brightness calibration across all surfaces',
    ],
  },
];

function InstallMethod({ method, isOpen, onToggle }) {
  return (
    <div
      className="mb-4 rounded-2xl overflow-hidden transition-all"
      style={{
        background: isOpen ? 'rgba(229,197,116,0.03)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isOpen ? 'rgba(229,197,116,0.15)' : 'var(--blx-border)'}`,
      }}
      data-testid={`install-method-${method.id}`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
        data-testid={`install-toggle-${method.id}`}
      >
        <div>
          <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-1">{method.tagline.toUpperCase()}</div>
          <h3 className="text-sm sm:text-base font-bold tracking-wider">{method.title}</h3>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-[var(--blx-gold-3)]" /> : <ChevronDown size={18} className="text-[var(--blx-muted)]" />}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6">
          <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-5" style={{ textTransform: 'none' }}>{method.desc}</p>

          <div className="text-[0.5625rem] text-[var(--blx-muted)] mb-5" style={{ textTransform: 'none' }}>
            <strong className="text-[var(--blx-text)]">Best for: </strong>{method.when}
          </div>

          {/* Technical Specs Grid */}
          <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3 flex items-center gap-2">
            <Ruler size={12} /> TECHNICAL SPECIFICATIONS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {method.specs.map((s, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--blx-hairline)' }}>
                <div className="text-[0.5rem] font-bold tracking-[0.12em] text-[var(--blx-muted)] mb-0.5">{s.label}</div>
                <div className="text-xs font-bold text-[var(--blx-gold-3)]">{s.value}</div>
                <div className="text-[0.5rem] text-[var(--blx-muted)] mt-0.5" style={{ textTransform: 'none' }}>{s.note}</div>
              </div>
            ))}
          </div>

          {/* Pros & Cons */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-success)] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={10} /> ADVANTAGES
              </div>
              <div className="space-y-1.5">
                {method.pros.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                    <CheckCircle2 size={10} className="text-[var(--blx-success)] mt-0.5 flex-shrink-0" /> {p}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[#E3935D] mb-2 flex items-center gap-1.5">
                <AlertTriangle size={10} /> CONSIDERATIONS
              </div>
              <div className="space-y-1.5">
                {method.cons.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                    <AlertTriangle size={10} className="text-[#E3935D] mt-0.5 flex-shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3 flex items-center gap-2">
            <Wrench size={12} /> INSTALLATION SEQUENCE
          </div>
          <div className="space-y-2 mb-5">
            {method.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[0.5rem] font-bold" style={{ background: 'rgba(229,197,116,0.1)', border: '1px solid rgba(229,197,116,0.15)', color: 'var(--blx-gold-3)' }}>
                  {i + 1}
                </div>
                <div className="text-[0.6875rem] text-[var(--blx-text-2)] pt-0.5" style={{ textTransform: 'none' }}>{step}</div>
              </div>
            ))}
          </div>

          {/* GCC Note */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(229,197,116,0.04)', border: '1px solid rgba(229,197,116,0.1)' }}>
            <div className="flex items-start gap-3">
              <ThermometerSun size={16} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-1">GCC REGION NOTE</div>
                <div className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{method.gccNote}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const FAQS = [
  { q: 'What is the best installation method for a corporate lobby?', a: 'For corporate lobbies, recessed (flush mount) provides the most premium appearance, while wall-mounted is the most cost-effective. The choice depends on the design intent and budget. If the lobby design is already finalized, wall-mounted is easier to retrofit. If designing from scratch, specify a recessed niche for a cleaner aesthetic.' },
  { q: 'Can LED displays be installed on glass curtain walls?', a: 'Not directly. Glass curtain walls cannot support LED display weight. The solution is a steel subframe that transfers load to the floor slab or ceiling structure, positioned behind or adjacent to the glass. Alternatively, transparent LED mesh can be applied to the glass surface for a lighter-weight solution.' },
  { q: 'How much rear clearance is needed behind an LED wall?', a: 'For rear-service installations, 600-800mm clearance is standard to allow a technician to access the back of the panels. Front-service panels require only 100-150mm clearance but are more expensive. For recessed installations without rear access, front-service panels are mandatory.' },
  { q: 'What structural wall strength is needed for wall-mounted LED?', a: 'A minimum 150mm reinforced concrete wall is recommended for direct mounting. Block walls (200mm+) with chemical anchors can also work. Drywall/gypsum partitions cannot support LED weight — a steel subframe tied to the structure above and below is required.' },
  { q: 'How long does a typical LED wall installation take?', a: 'Installation timeline varies by method: Wall-mounted 2-5 days (for 10-30 sqm), Recessed 1-2 weeks (including niche preparation), Ceiling-hung 3-7 days, Freestanding 2-6 hours. Large outdoor installations can take 2-4 weeks including foundation work. Content commissioning adds 1-3 days.' },
  { q: 'Do I need a structural engineer for LED display installation?', a: 'Yes, for all installations except small freestanding displays. A structural engineer should verify: wall/ceiling/floor load capacity, anchor point design, seismic restraints (required in UAE), and wind load calculations for outdoor installations. This is a standard requirement in GCC building regulations.' },
];

export default function InstallationGuide() {
  const [openMethod, setOpenMethod] = useState('wall-mount');

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="pb-20" data-testid="installation-guide">
      <SEO
        title="LED Display Installation Methods — Mounting Guide for Specifiers | Brightluxx"
        description="Complete guide to LED display installation methods: wall-mounted, recessed, ceiling-hung, freestanding, ground-supported, and curved. Structural requirements, GCC considerations, and step-by-step installation sequences."
        path="/installation-guide"
        jsonLd={[faqJsonLd, {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "LED Display Installation Methods — Complete Mounting Guide",
          "description": "Comprehensive guide to LED display installation and mounting methods for architects, MEP engineers, and contractors",
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
        }]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER GUIDE</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-3">
            Installation<br />Method Guide
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed" style={{ textTransform: 'none' }}>
            Comprehensive guide to LED display mounting methods with structural requirements, step-by-step sequences, and GCC-specific engineering considerations. Essential for architects, MEP engineers, and fit-out contractors.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Main Content */}
          <div>
            {/* Quick Nav */}
            <div className="flex flex-wrap gap-2 mb-8" data-testid="method-quick-nav">
              {METHODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setOpenMethod(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-[0.5625rem] font-bold tracking-wider transition-all ${
                    openMethod === m.id
                      ? 'bg-[rgba(229,197,116,0.15)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                      : 'bg-[rgba(255,255,255,0.04)] text-[var(--blx-muted)] border border-transparent hover:border-[var(--blx-border)]'
                  }`}
                  data-testid={`quick-nav-${m.id}`}
                >
                  {m.title.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Installation Methods */}
            {METHODS.map(m => (
              <InstallMethod
                key={m.id}
                method={m}
                isOpen={openMethod === m.id}
                onToggle={() => setOpenMethod(openMethod === m.id ? null : m.id)}
              />
            ))}

            <SectionDivider />

            {/* Comparison Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Method Comparison</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="comparison-table">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)]">Method</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)]">Cost</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)]">Complexity</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)]">Aesthetics</th>
                      <th className="py-3 px-4 text-left text-[0.5625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)]">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { method: 'Wall-Mounted', cost: 'Low', complexity: 'Low', aesthetics: 'Good', best: 'Most indoor spaces' },
                      { method: 'Recessed', cost: 'High', complexity: 'Medium', aesthetics: 'Premium', best: 'Luxury environments' },
                      { method: 'Ceiling-Hung', cost: 'Medium', complexity: 'High', aesthetics: 'Good', best: 'Malls, airports, events' },
                      { method: 'Freestanding', cost: 'Low', complexity: 'Low', aesthetics: 'Standard', best: 'Events, temporary' },
                      { method: 'Ground-Supported', cost: 'High', complexity: 'High', aesthetics: 'N/A', best: 'Outdoor, large-format' },
                      { method: 'Curved', cost: 'Very High', complexity: 'Very High', aesthetics: 'Exceptional', best: 'Brand, immersive' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[var(--blx-hairline)] hover:bg-[rgba(255,255,255,0.02)]">
                        <td className="py-2.5 px-4 text-xs font-bold">{row.method}</td>
                        <td className="py-2.5 px-4 text-xs text-[var(--blx-text-2)]">{row.cost}</td>
                        <td className="py-2.5 px-4 text-xs text-[var(--blx-text-2)]">{row.complexity}</td>
                        <td className="py-2.5 px-4 text-xs text-[var(--blx-gold-3)]">{row.aesthetics}</td>
                        <td className="py-2.5 px-4 text-[0.6875rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{row.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <SectionDivider />

            {/* General Considerations */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Universal Considerations for GCC Installations</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: ThermometerSun, title: 'Heat Management', desc: 'GCC ambient temperatures routinely exceed 45°C. All installations must include thermal analysis. Outdoor displays need direct sun shading and enhanced cooling. Indoor displays in non-air-conditioned spaces (e.g., warehouses) require active ventilation.' },
                { icon: Wind, title: 'Dust & Sand Protection', desc: 'IP65 front rating is minimum for outdoor installations. Even indoor spaces near loading docks or construction zones experience elevated dust. Specify conformal-coated PCBs and sealed cabinet designs for dusty environments.' },
                { icon: Weight, title: 'Structural Standards', desc: 'All structural calculations must comply with UAE/KSA building codes. Dubai Municipality requires PE-stamped structural drawings for any display over 5 sqm. Abu Dhabi DMT and Riyadh Municipality have similar requirements.' },
                { icon: Wrench, title: 'Maintenance Planning', desc: 'Design for maintenance access from day one. Specify front-service panels if rear access is impossible. Budget for annual calibration, spare cabinet inventory (5-10%), and preventive maintenance contracts.' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <item.icon size={16} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <h3 className="text-xs font-bold tracking-wider mb-2">{item.title}</h3>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <SectionDivider />
            <FAQSection faqs={FAQS} title="Frequently Asked Questions" />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Need Installation Engineering Support?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Our engineers provide full installation design including structural calculations, MEP coordination, and shop drawings for your specific project.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/design-assist" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="install-da-cta">
                  Request Design Assist <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/971559954274?text=Hi%2C%20I%20need%20installation%20engineering%20support%20for%20an%20LED%20display%20project" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="install-wa-cta">
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA packId="installation" title="Installation Spec Pack" description="Complete installation reference PDF with structural load tables, mounting details, clearance diagrams, and cable routing guides." />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TOOLS</h3>
              <div className="space-y-1">
                {[
                  { to: '/power-estimator', label: 'Power Estimator', desc: 'Electrical load & HVAC' },
                  { to: '/viewing-distance', label: 'Viewing Distance', desc: 'Pixel pitch vs. distance' },
                  { to: '/calculator', label: 'Screen Calculator', desc: 'Size, resolution & specs' },
                  { to: '/budget-estimator', label: 'Budget Estimator', desc: 'Project cost estimates' },
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

            {/* Checklist */}
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">PRE-INSTALL CHECKLIST</h3>
              <div className="space-y-2">
                {[
                  'Structural survey completed',
                  'MEP coordination done',
                  'Power circuits installed',
                  'Data cabling in place',
                  'HVAC load accounted for',
                  'Fire safety clearance',
                  'Municipality permits (outdoor)',
                  'Maintenance access designed',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>
                    <div className="w-4 h-4 rounded border border-[var(--blx-border)] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.06) 0%, rgba(183,142,58,0.03) 100%)', border: '1px solid rgba(229,197,116,0.12)' }}>
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">NEED SITE SUPPORT?</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Our installation engineers are based in UAE and available for site surveys, structural assessments, and installation supervision across the GCC.
              </p>
              <Link to="/contact" className="btn-gold w-full py-2.5 text-[0.625rem] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                Book Free Site Visit <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <QuickInquiry context="LED display installation and mounting" />
    </div>
  );
}
