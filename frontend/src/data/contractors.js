/**
 * Contractor-focused content data.
 * Targets value engineering, specification substitution, and cost control searches.
 */

export const VALUE_ENGINEERING_TABLE = [
  {
    specified: 'P1.2 COB LED Wall',
    alternative: 'P1.5 MiP LED Wall',
    costImpact: '-30 to 40%',
    notes: 'Similar visual quality at 3m+ viewing. MiP offers excellent contrast with easier serviceability.',
    risk: 'low',
  },
  {
    specified: 'P0.9 COB Fine Pitch',
    alternative: 'P1.2 COB / MiP',
    costImpact: '-25 to 35%',
    notes: 'Suitable where minimum viewing distance is 2m+. Negligible quality difference at typical lobby distances.',
    risk: 'low',
  },
  {
    specified: 'LCD Video Wall (3x3)',
    alternative: 'dvLED All-in-One',
    costImpact: '-10 to 20%',
    notes: 'No bezels, lower maintenance, longer lifespan. TCO advantage over 5 years. Zero burn-in risk.',
    risk: 'low',
  },
  {
    specified: 'Custom Curved LED',
    alternative: 'Standard Cabinet + Trim',
    costImpact: '-20 to 30%',
    notes: 'Standard 500x500mm cabinets with custom trim achieve similar visual effect at lower cost.',
    risk: 'medium',
  },
  {
    specified: 'P2.5 Outdoor IP65',
    alternative: 'P3.9 Outdoor IP65',
    costImpact: '-25 to 35%',
    notes: 'For viewing distances 8m+. Same brightness and weather protection, lower resolution rarely noticeable.',
    risk: 'low',
  },
  {
    specified: 'Branded Tier-1 LED',
    alternative: 'Equivalent spec, alternate brand',
    costImpact: '-20 to 40%',
    notes: 'Same LED chip supplier (Nationstar/Kinglight), same driver IC. Performance matched to specification.',
    risk: 'medium',
  },
];

export const COST_BREAKDOWN = [
  { item: 'LED Display Modules', pct: '45-55%', notes: 'Cabinets, modules, power supplies' },
  { item: 'Video Processing', pct: '8-12%', notes: 'Novastar/Colorlight processors, sending cards' },
  { item: 'Mounting Structure', pct: '8-12%', notes: 'Steel frame, brackets, ground supports' },
  { item: 'Cabling & Power', pct: '5-8%', notes: 'Signal cables, power distribution, DB board' },
  { item: 'Installation Labour', pct: '10-15%', notes: 'Rigging, assembly, alignment, commissioning' },
  { item: 'Content System (CMS)', pct: '3-5%', notes: 'Playback hardware, software license' },
  { item: 'Spare Parts', pct: '3-5%', notes: 'Modules, power supplies, cables (2-year stock)' },
];

export const COST_PER_SQM_GUIDE = [
  { pitch: 'P0.7 - P0.9', tech: 'COB', range: '$8,000 - $20,000', use: 'Boardroom, control room, luxury lobby' },
  { pitch: 'P1.2', tech: 'COB / MiP', range: '$4,000 - $8,000', use: 'Corporate lobby, retail flagship, broadcast' },
  { pitch: 'P1.5', tech: 'MiP / SMD', range: '$2,500 - $5,000', use: 'Hotel lobby, meeting room, showroom' },
  { pitch: 'P1.9', tech: 'MiP / SMD', range: '$1,800 - $3,500', use: 'Conference, retail, reception' },
  { pitch: 'P2.5', tech: 'SMD', range: '$1,200 - $2,500', use: 'Mall atrium, ballroom, indoor general' },
  { pitch: 'P3.9', tech: 'SMD', range: '$800 - $1,800', use: 'Rental event, large format indoor' },
  { pitch: 'P4.8 - P6', tech: 'SMD Outdoor', range: '$500 - $1,500', use: 'Outdoor billboard, stadium, facade' },
  { pitch: 'P8 - P10', tech: 'SMD Outdoor', range: '$300 - $900', use: 'Highway billboard, rooftop, long distance' },
];

export const CONTRACTOR_FAQS = [
  {
    q: "Can I substitute COB with MiP to reduce costs?",
    a: "Yes, in most cases. MiP (MicroLED in Package) delivers 85-90% of COB's visual quality at 30-40% lower cost. The main trade-off is slightly lower contrast ratio in very dark environments. For viewing distances above 2m, most consultants accept MiP as an equivalent specification. Always submit a technical comparison sheet with your substitution request."
  },
  {
    q: "How do I get consultant approval for a spec substitution?",
    a: "Prepare a side-by-side comparison covering: pixel pitch, brightness (nits), contrast ratio, colour gamut, refresh rate, IP rating, service method, and warranty terms. If all parameters meet or exceed the original spec, most consultants approve. Include sample photos or a demo visit if possible. Brightluxx provides free substitution support documentation."
  },
  {
    q: "What is the typical cost per sqm for indoor LED in UAE?",
    a: "Indoor LED ranges from $1,200/sqm (P2.5 SMD) to $20,000/sqm (P0.7 COB). The most common specifications — P1.5 to P2.5 — cost $1,500-$5,000/sqm for hardware. Add 25-40% for processing, structure, installation, and CMS. Prices vary by quantity, brand, and project timeline."
  },
  {
    q: "dvLED vs LCD video wall — which is cheaper long-term?",
    a: "dvLED has a higher upfront cost but lower 5-year TCO. LCD video walls need panel replacements (burn-in), have visible bezels, and higher power consumption. dvLED has no bezels, 100,000+ hour lifespan, lower power per sqm, and zero burn-in. For 24/7 applications (control rooms, lobbies), dvLED breaks even in 2-3 years."
  },
  {
    q: "What spare parts should I include in my tender?",
    a: "Standard practice: 5% spare modules, 2x spare power supplies, 2x spare receiving cards, signal cables. For outdoor installations add: spare fans, gaskets, and locking mechanisms. Budget 3-5% of hardware cost for spares. Ensure spare modules are from the same production batch for colour consistency."
  },
  {
    q: "How do I calculate power requirements for LED walls?",
    a: "Indoor LED: 200-350W per sqm (average). Outdoor LED: 600-800W per sqm (max brightness). Multiply by screen area for total wattage. Add 20% headroom for the electrical circuit. Example: a 4m x 2.25m indoor P1.5 wall = 9 sqm x 250W = 2,250W = ~11A at 220V. Always specify a dedicated circuit."
  },
];

export const CONTRACTOR_SEO_PAGES = [
  {
    id: 'dvled-vs-lcd',
    title: 'dvLED vs LCD Video Wall — Cost & Performance Comparison',
    shortTitle: 'dvLED vs LCD',
    heroTagline: 'TOTAL COST OF OWNERSHIP ANALYSIS',
    heroDescription: 'Detailed comparison of direct-view LED (dvLED) and LCD video walls for UAE projects. Cost breakdown, performance specs, maintenance requirements, and 5-year TCO analysis to help contractors make informed specification decisions.',
    keywords: 'dvLED vs LCD video wall, LED vs LCD cost comparison, video wall UAE, dvLED cost per sqm',
    comparison: [
      { spec: 'Bezels / Seams', dvled: 'Seamless (zero bezels)', lcd: 'Visible bezels (1.7-3.5mm)' },
      { spec: 'Brightness', dvled: '600-1,500 nits (indoor)', lcd: '500-700 nits typical' },
      { spec: 'Lifespan', dvled: '100,000+ hours', lcd: '50,000-60,000 hours' },
      { spec: 'Burn-in Risk', dvled: 'None', lcd: 'High (static content)' },
      { spec: 'Power / sqm', dvled: '150-300W', lcd: '200-350W' },
      { spec: 'Weight / sqm', dvled: '25-35 kg', lcd: '35-50 kg' },
      { spec: 'Min. Viewing Dist.', dvled: 'Pitch x 1.5m', lcd: '~2m (bezel visible)' },
      { spec: 'Maintenance', dvled: 'Module swap (minutes)', lcd: 'Panel replacement (hours)' },
      { spec: 'Custom Sizes', dvled: 'Any size/ratio', lcd: 'Fixed panel sizes' },
      { spec: '5-Year TCO', dvled: 'Lower (no replacements)', lcd: 'Higher (panel degradation)' },
    ],
    tcoAnalysis: {
      scenario: '3m x 2m Video Wall (6 sqm), 16 hours/day operation',
      dvled: { hardware: 15000, install: 4000, power5yr: 2600, maintenance5yr: 500, total: 22100 },
      lcd: { hardware: 10000, install: 3000, power5yr: 3800, maintenance5yr: 4000, total: 20800 },
      note: 'LCD TCO increases sharply after year 3 due to panel burn-in replacements. For 24/7 use, dvLED TCO is 15-25% lower over 5 years.',
    },
    faqs: [
      { q: "Is dvLED more expensive than LCD video walls?", a: "Upfront, yes — dvLED typically costs 30-50% more. However, the 5-year total cost of ownership (TCO) is often lower because dvLED has no burn-in, no panel replacements, lower power consumption, and minimal maintenance. For 24/7 applications, dvLED breaks even in 2-3 years." },
      { q: "When should I specify LCD instead of dvLED?", a: "LCD video walls still make sense for: temporary installations (under 2 years), extremely tight budgets with low daily usage (under 8 hours), and situations where the bezel grid is acceptable. For any permanent installation with 12+ hours daily use, dvLED is the better specification." },
      { q: "Can I substitute dvLED for LCD in an existing tender?", a: "Yes. Prepare a specification comparison showing equivalent or superior performance. Key selling points: zero bezels, longer lifespan, lower maintenance. Most consultants accept dvLED substitutions when the pitch delivers equivalent or better viewing quality at the specified distance." },
    ],
  },
  {
    id: 'led-cost-per-sqm',
    title: 'LED Display Cost Per Square Meter — UAE 2026 Guide',
    shortTitle: 'LED Cost Guide',
    heroTagline: 'BUDGETARY PLANNING FOR CONTRACTORS',
    heroDescription: 'Comprehensive LED display pricing guide for UAE contractors. Hardware costs by pixel pitch, total project cost breakdown, and budgetary estimation tool. Updated for 2026 market conditions.',
    keywords: 'LED screen cost per sqm UAE, LED display price Dubai, LED wall cost, video wall cost UAE, LED billboard price',
    faqs: [
      { q: "How much does an LED video wall cost per sqm in UAE?", a: "LED display hardware costs range from $300/sqm (P10 outdoor) to $20,000/sqm (P0.7 COB). The most commonly specified indoor displays (P1.5-P2.5) cost $1,500-$5,000/sqm. Add 25-40% for processing, structure, installation, and commissioning to get total project cost." },
      { q: "What factors affect LED display pricing?", a: "Key factors: pixel pitch (smaller = more expensive), technology (COB > MiP > SMD), brand, quantity, indoor vs outdoor rating, front vs rear service, and project timeline. Rush orders and small quantities carry premiums of 10-20%." },
      { q: "How do I estimate total project cost from hardware cost?", a: "Multiply hardware cost by 1.3-1.4x for total installed cost. This covers: video processing (10-15%), mounting structure (8-12%), cabling (5-8%), installation labour (10-15%), CMS (3-5%), and spare parts (3-5%). For outdoor installations, add an additional 10-15% for weatherproofing and structural engineering." },
    ],
  },
  {
    id: 'led-installation-guide',
    title: 'LED Display Installation Guide — UAE Requirements',
    shortTitle: 'Installation Guide',
    heroTagline: 'SITE PREPARATION & INSTALLATION CHECKLIST',
    heroDescription: 'Complete LED display installation guide for UAE contractors. Site preparation, structural requirements, electrical specifications, environmental considerations for Gulf climate, and commissioning procedures.',
    keywords: 'LED wall installation guide UAE, video wall installation, LED screen mounting, LED display commissioning',
    checklist: [
      { phase: 'Pre-Installation', items: [
        'Confirm wall/floor structural capacity (LED: 25-55 kg/sqm + frame)',
        'Dedicated electrical circuit (capacity = total wattage + 20%)',
        'HVAC assessment (LED heat output: 200-800 BTU/hr per sqm)',
        'Network connectivity for CMS (CAT6 or fiber)',
        'Ambient light survey (determines brightness requirement)',
        'Access plan for delivery and installation equipment',
      ]},
      { phase: 'Structural', items: [
        'Steel frame fabrication per screen dimensions',
        'Level and plumb mounting points (±1mm tolerance)',
        'Anti-vibration mounts for building sway (high-rise)',
        'Seismic brackets if required by local code',
        'Cable management routes (power + signal)',
        'Service access provision (front-service or rear gap)',
      ]},
      { phase: 'Electrical', items: [
        'Dedicated DB board with MCBs and RCDs',
        'Power distribution to each cabinet row',
        'Earth bonding to building ground system',
        'Surge protection (SPD) — critical in UAE',
        'UPS consideration for control systems',
        'Emergency power-off (EPO) switch accessibility',
      ]},
      { phase: 'Installation', items: [
        'Cabinet alignment and leveling (pixel-level precision)',
        'Signal chain setup (sending card → receiving cards)',
        'Power-on sequence testing (section by section)',
        'Colour calibration (camera-based, full white balance)',
        'Content playback testing across resolution',
        'Brightness and colour uniformity verification',
      ]},
      { phase: 'UAE-Specific', items: [
        'Heat management: ensure HVAC compensates for LED heat load',
        'Dust protection: IP30+ for indoor, IP65 for outdoor',
        'Direct sunlight: anti-glare coating for glass-adjacent installs',
        'Humidity: corrosion-resistant connectors and cables',
        'Municipality approvals for outdoor installations',
        'Civil Defence approval for large indoor installations',
      ]},
    ],
    faqs: [
      { q: "What structural support is needed for an LED wall?", a: "Indoor LED walls weigh 25-35 kg/sqm (plus steel frame at ~15 kg/sqm). The wall or floor must support the total load. For drywall, use a freestanding steel frame anchored to the slab. For concrete walls, direct bracket mounting works. Always get structural engineer sign-off for walls exceeding 10 sqm." },
      { q: "What electrical requirements for LED displays in UAE?", a: "UAE uses 220V/50Hz. Indoor LED draws 200-350W per sqm (average). Provide a dedicated circuit rated at total wattage + 20% headroom. Install surge protection — UAE experiences voltage fluctuations. Three-phase power for screens exceeding 5kW total. Dedicated DB board with individual MCBs per screen section." },
      { q: "How to handle heat from LED walls in UAE?", a: "Indoor LED generates 680-1,200 BTU/hr per sqm. In UAE's climate, HVAC must compensate for this heat load. Rule of thumb: add 1 ton of cooling capacity per 10 sqm of indoor LED. Ensure air circulation behind the screen (minimum 100mm gap for rear-service, or use front-service cabinets flush to wall)." },
    ],
  },
];
