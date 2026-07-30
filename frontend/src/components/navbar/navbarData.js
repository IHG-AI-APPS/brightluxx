import { Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, GraduationCap, Cpu, Eye, Zap, Layers, FileText, Monitor, Tv, ShoppingBag, Shapes, Settings, Package, Grid3X3, Building2, Theater, Globe, TrafficCone, Sparkles, Box, Cuboid, BookOpen, HelpCircle, Phone, Info, Factory, Users, Newspaper, FolderOpen, Shield, TrendingUp, Palette } from 'lucide-react';

export const productCategories = [
  {
    label: 'INDOOR DISPLAYS',
    items: [
      { name: 'COB MicroLED', cat: 'cob-microled', desc: 'Ultra-premium P0.4-P0.9' },
      { name: 'MiP LED', cat: 'mip', desc: 'Next-gen P0.7-P1.5' },
      { name: 'Fine Pitch Indoor', cat: 'indoor', desc: 'Corporate P1.8-P3' },
      { name: 'All-in-One dvLED', cat: 'all-in-one', desc: 'Plug & play solutions' },
      { name: 'Cinema LED', cat: 'cinema-led', desc: 'Theatre-grade P0.9-P1.2' },
      { name: 'DVLED Cinema', cat: 'dvled', desc: 'Direct-view cinema walls' },
    ],
  },
  {
    label: 'OUTDOOR DISPLAYS',
    items: [
      { name: 'Outdoor LED', cat: 'outdoor', desc: 'Weatherproof P4-P10' },
      { name: 'High Brightness 10K', cat: 'outdoor-hb', desc: 'Highway billboards' },
      { name: 'Coastal GOB', cat: 'outdoor-gob', desc: 'Beachfront & humid areas' },
      { name: 'Fine Pitch Outdoor', cat: 'outdoor-fp', desc: 'Luxury retail facades' },
      { name: 'Mesh Facade', cat: 'mesh', desc: 'Transparent building wraps' },
      { name: 'Road Signals', cat: 'road-signal', desc: 'Traffic & VMS displays' },
    ],
  },
  {
    label: 'CREATIVE & CUSTOM',
    items: [
      { name: 'Transparent LED', cat: 'transparent', desc: 'Glass facade displays' },
      { name: 'Flexible / Creative', cat: 'flexible', desc: 'Curved & custom shapes' },
      { name: 'Custom LED Shapes', cat: 'custom-shapes', desc: 'Round, cube, cone' },
      { name: 'LED Sphere', cat: 'sphere', desc: '360° spherical displays' },
      { name: 'Naked-Eye 3D', cat: 'naked-eye-3d', desc: 'Glasses-free 3D' },
      { name: 'Ceiling / Sky Screen', cat: 'ceiling-led', desc: 'Overhead displays' },
    ],
  },
  {
    label: 'SPECIALITY & READY-MADE',
    items: [
      { name: 'Signage Solutions', cat: 'signage-solutions', desc: 'Channel letters, menus, wayfinding', isLanding: '/signage-solutions' },
      { name: 'Digital Signage', cat: 'digital-signage', desc: 'Commercial displays & kiosks' },
      { name: 'Smart TVs', cat: 'smart-tv', desc: 'Commercial & outdoor TVs' },
      { name: 'Ready-Made', cat: 'ready-made', desc: 'Plug & play packages' },
      { name: 'Interactive Floor', cat: 'interactive', desc: 'Touch-responsive floors' },
      { name: 'Virtual Production', cat: 'virtual-production', desc: 'XR/VP stage panels' },
      { name: 'LED Poster / Totem', cat: 'poster-totem', desc: 'Standalone displays' },
      { name: 'Shelf Edge', cat: 'shelf-edge', desc: 'Retail strip displays' },
      { name: 'Accessories', cat: 'accessories', desc: 'Controllers, cables, mounts' },
    ],
  },
];

export const CATEGORY_ICONS = {
  'cob-microled': Cpu, 'mip': Cpu, 'indoor': Monitor, 'all-in-one': Tv,
  'cinema-led': MonitorPlay, 'dvled': MonitorPlay, 'outdoor': Monitor,
  'outdoor-hb': Monitor, 'outdoor-gob': Monitor, 'outdoor-fp': Monitor,
  'mesh': Eye, 'road-signal': Monitor, 'transparent': Eye,
  'flexible': Shapes, 'custom-shapes': Shapes, 'sphere': Shapes,
  'naked-eye-3d': Eye, 'ceiling-led': Layers, 'digital-signage': Monitor,
  'smart-tv': Tv, 'ready-made': ShoppingBag, 'interactive': Zap,
  'virtual-production': MonitorPlay, 'poster-totem': Monitor,
  'shelf-edge': Monitor, 'accessories': Settings,
  'signage-solutions': ShoppingBag,
};

export const solutionItems = [
  { name: 'Retail & Hospitality', id: 'retail', icon: ShoppingBag, desc: 'Shopfronts, malls, restaurants' },
  { name: 'Corporate & Offices', id: 'corporate', icon: Building2, desc: 'Boardrooms, lobbies, meeting rooms' },
  { name: 'Entertainment & Events', id: 'entertainment', icon: Theater, desc: 'Concerts, sports, exhibitions' },
  { name: 'Transportation', id: 'transportation', icon: TrafficCone, desc: 'Airports, metro, highways' },
  { name: 'Houses of Worship', id: 'worship', icon: Globe, desc: 'Churches, mosques, temples' },
  { name: 'Control Rooms', id: 'control-rooms', icon: Grid3X3, desc: 'Command centers, NOCs' },
  { name: 'Virtual Production', id: 'virtual-production', icon: Box, desc: 'XR stages, film sets' },
  { name: 'Architecture', id: 'architecture', icon: Cuboid, desc: 'Facade, media walls' },
];

export const techItems = [
  { name: 'COB Technology', id: 'cob', icon: Cpu, desc: 'Chip-on-board explained' },
  { name: 'GOB Protection', id: 'gob', icon: Shield, desc: 'Glue-on-board coating' },
  { name: 'MicroLED & MiP', id: 'microled', icon: Sparkles, desc: 'Next-gen pixel tech' },
  { name: 'HDR & Color', id: 'hdr', icon: Eye, desc: 'High dynamic range' },
  { name: 'Driving ICs', id: 'driving-ic', icon: Zap, desc: 'PWM & common cathode' },
];

export const toolsGroups = [
  {
    label: 'SPECIFIER TOOLS',
    links: [
      { name: 'Screen Calculator', path: '/calculator', icon: Calculator, desc: 'Size & resolution' },
      { name: 'Budget Estimator', path: '/budget-estimator', icon: DollarSign, desc: 'Project costing' },
      { name: 'ROI Calculator', path: '/tools/roi-calculator', icon: TrendingUp, desc: 'Investment analysis' },
      { name: 'Viewing Distance', path: '/viewing-distance', icon: Eye, desc: 'Optimal pitch calculator' },
      { name: 'Power Estimator', path: '/power-estimator', icon: Zap, desc: 'Electrical requirements' },
      { name: 'Technology Selector', path: '/technology-selector', icon: Cpu, desc: 'Find the right tech' },
    ],
  },
  {
    label: 'CONTRACTOR TOOLS',
    links: [
      { name: 'Project Planner', path: '/project-planner', icon: FileText, desc: 'Timeline & milestones' },
      { name: 'Installation Guide', path: '/installation-guide', icon: Wrench, desc: 'Step-by-step process' },
      { name: 'Spec Substitution', path: '/spec-substitution', icon: BarChart3, desc: 'Cross-reference products' },
      { name: 'Value Engineering', path: '/value-engineering', icon: Settings, desc: 'Cost optimization' },
      { name: 'CPD Programme', path: '/cpd-programme', icon: GraduationCap, desc: 'Professional development' },
    ],
  },
];

export const productFamilies = {
  lumimorph: {
    key: 'lumimorph', name: 'LUMIMORPH', path: '/lumimorph',
    color: 'cyan', colorClass: 'text-cyan-400', bgHover: 'hover:bg-cyan-500/10', borderColor: 'border-cyan-500/20',
    panelBorder: 'rgba(34,211,238,0.2)', hoverBg: 'hover:bg-cyan-500/10', hoverBgLight: 'hover:bg-cyan-50',
    items: [
      { name: 'Elite', path: '/lumimorph/elite', desc: 'P2.6 High Resolution', image: 'https://files.ihgbrands.com/nav-images_nav_ext_a31242107128.webp' },
      { name: 'Grande', path: '/lumimorph/grande', desc: 'P6.2 Large Scale', image: 'https://files.ihgbrands.com/nav-images_nav_ext_3b344ec59874.webp' },
      { name: 'Mini', path: '/lumimorph/mini', desc: 'Compact Modular', image: 'https://files.ihgbrands.com/nav-images_nav_ext_0625418d5c6f.webp' },
    ]
  },
  naturatex: {
    key: 'naturatex', name: 'NATURATEX', path: '/naturatex',
    color: 'emerald', colorClass: 'text-emerald-400', bgHover: 'hover:bg-emerald-500/10', borderColor: 'border-emerald-500/20',
    panelBorder: 'rgba(52,211,153,0.2)', hoverBg: 'hover:bg-emerald-500/10', hoverBgLight: 'hover:bg-emerald-50',
    items: [
      { name: 'HoloVeil', path: '/naturatex/holoveil', desc: 'Transparent Display', image: 'https://files.ihgbrands.com/nav-images_nav_ext_61e3269d0548.webp' },
    ]
  },
  signatouch: {
    key: 'signatouch', name: 'SIGNATOUCH', path: '/signatouch',
    color: 'amber', colorClass: 'text-amber-400', bgHover: 'hover:bg-amber-500/10', borderColor: 'border-amber-500/20',
    panelBorder: 'rgba(251,191,36,0.2)', hoverBg: 'hover:bg-amber-500/10', hoverBgLight: 'hover:bg-amber-50',
    items: [
      { name: 'Touch Kiosk', path: '/signatouch/touch-kiosk', desc: '40-Point IR Touch', image: 'https://files.ihgbrands.com/nav-images_nav_ext_fbac154254eb.webp' },
      { name: 'Smart Signage', path: '/signatouch/smart-signage', desc: 'Digital Displays', image: 'https://files.ihgbrands.com/nav-images_nav_ext_986865f74d23.webp' },
      { name: 'Self Service', path: '/signatouch/self-service', desc: 'Interactive Terminals', image: 'https://files.ihgbrands.com/nav-images_nav_ext_b7c53a5842b6.webp' },
    ]
  },
  glassmorph: {
    key: 'glassmorph', name: 'GLASSMORPH', path: '/glassmorph',
    color: 'violet', colorClass: 'text-violet-400', bgHover: 'hover:bg-violet-500/10', borderColor: 'border-violet-500/20',
    panelBorder: 'rgba(167,139,250,0.2)', hoverBg: 'hover:bg-violet-500/10', hoverBgLight: 'hover:bg-violet-50',
    items: [
      { name: 'Smart Film', path: '/glassmorph/smart-film', desc: 'PDLC Privacy Glass', image: 'https://files.ihgbrands.com/nav-images_nav_ext_d093b5d5e43a.webp' },
      { name: 'LED Film', path: '/glassmorph/led-film', desc: 'Transparent LED', image: 'https://files.ihgbrands.com/nav-images_nav_ext_b376ee066910.webp' },
      { name: 'Media Glass', path: '/glassmorph/media-glass', desc: 'Display Windows', image: 'https://files.ihgbrands.com/nav-images_nav_ext_cfb3068bee77.webp' },
      { name: 'Switchable Glass', path: '/glassmorph/switchable-glass', desc: 'Electrochromic', image: 'https://files.ihgbrands.com/nav-images_nav_ext_d84f066640ea.webp' },
      { name: 'Flying Display', path: '/glassmorph/flying-display', desc: 'Suspended LED', image: 'https://files.ihgbrands.com/nav-images_nav_ext_5141d2207f1b.webp' },
      { name: 'Hanging LED', path: '/glassmorph/hanging-led', desc: 'Ceiling Mounted', image: 'https://files.ihgbrands.com/nav-images_nav_ext_b8c329743d26.webp' },
    ]
  },
  pixelvue: {
    key: 'pixelvue', name: 'PIXELVUE', path: '/pixelvue',
    color: 'rose', colorClass: 'text-rose-400', bgHover: 'hover:bg-rose-500/10', borderColor: 'border-rose-500/20',
    panelBorder: 'rgba(251,113,133,0.2)', hoverBg: 'hover:bg-rose-500/10', hoverBgLight: 'hover:bg-rose-50',
    items: [
      { name: 'iPoster', path: '/pixelvue/iposter', desc: 'Digital Poster', image: 'https://files.ihgbrands.com/emergent-images/5dbac7e6889b544bf4f261844d917e7a8697ac08b30637e96f2c75218ad784be.png' },
      { name: 'iFlip', path: '/pixelvue/iflip', desc: 'Double-Sided LED', image: 'https://files.ihgbrands.com/emergent-images/a40dc162a0a88bf31bf94f0de5ed77952829b133c0de6c4dea05c07e49c4a405.png' },
      { name: 'UltraFlip', path: '/pixelvue/ultra-flip', desc: 'Premium Poster', image: 'https://files.ihgbrands.com/emergent-images/fa5bcff834efce178ae8a4c7f097e9349a31d7d833abb778099ee9f588b391ce.png' },
      { name: 'DigiStandee', path: '/pixelvue/digi-standee', desc: 'Digital Standee', image: 'https://files.ihgbrands.com/nav-images_nav_d59aa7fb_digital-signage-pro-55.webp' },
      { name: 'OOH Poster', path: '/pixelvue/ooh-poster', desc: 'Outdoor Display', image: 'https://files.ihgbrands.com/nav-images_nav_0193f21d_digital-signage-outdoor-75.webp' },
      { name: 'Unity', path: '/pixelvue/unity', desc: 'Modular System', image: 'https://files.ihgbrands.com/emergent-images/0f94ba2fb077d6c4bdf8613e9ec3fa9295c46a647cb8f37a7afc192b6e8a1f2c.png' },
      { name: 'Tetris', path: '/pixelvue/tetris', desc: 'Stackable Cubes', image: 'https://files.ihgbrands.com/nav-images_nav_ext_0625418d5c6f.webp' },
      { name: 'VideoBrick', path: '/pixelvue/videobrick', desc: 'Video Wall Bricks', image: 'https://files.ihgbrands.com/emergent-images/96812cb6f7543b43c96ed28c4759bc3b3da4e11f8c26d189bf0a878331e5e16b.png' },
      { name: 'iConference', path: '/pixelvue/iconference', desc: 'Meeting Room Display', image: 'https://files.ihgbrands.com/nav-images_nav_ext_61e3269d0548.webp' },
      { name: 'EzeeSign', path: '/pixelvue/ezeesign', desc: 'Easy Signage', image: 'https://files.ihgbrands.com/nav-images_nav_ext_fbac154254eb.webp' },
      { name: 'iShelf', path: '/pixelvue/ishelf', desc: 'Retail Shelf Display', image: 'https://files.ihgbrands.com/nav-images_nav_ext_b7c53a5842b6.webp' },
      { name: 'TableVision', path: '/pixelvue/tablevision', desc: 'Table Display', image: 'https://files.ihgbrands.com/nav-images_nav_d6ceb71c_plug-play-videowall-2x2.webp' },
    ]
  },
  artimmersive: {
    key: 'artimmersive', name: 'ART & XR', path: '/art-immersive',
    color: 'violet', colorClass: 'text-violet-400', bgHover: 'hover:bg-violet-500/10', borderColor: 'border-violet-500/20',
    panelBorder: 'rgba(139,92,246,0.2)', hoverBg: 'hover:bg-violet-500/10', hoverBgLight: 'hover:bg-violet-50',
    items: [
      { name: 'NFT Gallery Displays', path: '/products?category=art-immersive&sub=nft-gallery', desc: 'Digital Art Museums', image: 'https://files.ihgbrands.com/nav-images_nav_ext_5607981affc7.webp' },
      { name: 'Immersive Walls', path: '/products?category=art-immersive&sub=immersive-experience', desc: 'teamLab-style', image: 'https://files.ihgbrands.com/nav-images_nav_ext_a88d2305f712.webp' },
      { name: 'XR/Virtual Production', path: '/products?category=art-immersive&sub=virtual-production', desc: 'Film & TV Stages', image: 'https://files.ihgbrands.com/nav-images_nav_1aa1b696_bl-vpx150.webp' },
      { name: 'Metaverse LED', path: '/products?category=art-immersive&sub=metaverse', desc: 'Interactive Experiences', image: 'https://files.ihgbrands.com/nav-images_nav_ext_df8d37160688.webp' },
      { name: 'Sculptural LED', path: '/products?category=art-immersive&sub=sculptural', desc: 'Cylinders, Cubes, Waves', image: 'https://files.ihgbrands.com/nav-images_nav_ext_7f0dfb104596.webp' },
      { name: 'Public Art', path: '/products?category=art-immersive&sub=public-art', desc: 'Urban Landmarks', image: 'https://files.ihgbrands.com/nav-images_nav_ext_d3c8d248b59f.webp' },
    ]
  }
};

export const familyOrder = ['lumimorph', 'naturatex', 'signatouch', 'glassmorph', 'pixelvue', 'artimmersive'];

export const moreMenuSections = [
  {
    label: 'LIFESTYLE',
    items: [
      { name: 'Luxury Home Cinema', path: '/luxury-home-cinema', icon: Tv, desc: 'Indoor & outdoor cinema' },
      { name: 'Art & Immersive', path: '/art-immersive', icon: Palette, desc: 'NFT, XR & digital art' },
      { name: 'Signage Solutions', path: '/signage-solutions', icon: ShoppingBag, desc: 'Channel letters, menus & more' },
    ],
  },
  {
    label: 'TECHNOLOGIES',
    items: techItems.map(item => ({ name: item.name, path: `/technology/${item.id}`, icon: item.icon, desc: item.desc })),
  },
  {
    label: 'SPECIFIER TOOLS',
    items: toolsGroups[0].links,
  },
  {
    label: 'COMPANY',
    items: [
      { name: 'About Us', path: '/about', icon: Info, desc: 'Our story & mission' },
      { name: 'Compare Brands', path: '/compare-brands', icon: BarChart3, desc: 'Brightluxx vs competitors' },
      { name: 'Blog', path: '/blog', icon: Newspaper, desc: 'Latest news & insights' },
      { name: 'Contact Us', path: '/contact', icon: Phone, desc: 'Get in touch' },
      { name: 'FAQ', path: '/faq', icon: HelpCircle, desc: 'Common questions' },
      { name: 'Resources', path: '/resources', icon: FolderOpen, desc: 'Downloads & guides' },
      { name: 'Case Studies', path: '/case-studies', icon: BookOpen, desc: 'Project showcases' },
      { name: 'Factory Tour', path: '/factory-tour', icon: Factory, desc: 'Virtual facility tour' },
      { name: 'Distribution', path: '/distribution', icon: Users, desc: 'Partner with us' },
    ],
  },
];
