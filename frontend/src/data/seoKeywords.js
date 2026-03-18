/**
 * SEO Keywords Data for Brightluxx
 * Organized by category with search intent and target pages
 */

// Primary high-volume keywords
export const PRIMARY_KEYWORDS = {
  // Supplier/Company keywords
  'led-screen-supplier-dubai': {
    primary: 'LED screen supplier Dubai',
    secondary: ['LED display supplier Dubai', 'LED screen company Dubai', 'LED supplier UAE'],
    longTail: ['best LED screen supplier in Dubai', 'top LED display company Dubai'],
    intent: 'commercial',
    targetPage: '/led-screen-suppliers-dubai'
  },
  'led-video-wall-uae': {
    primary: 'LED video wall UAE',
    secondary: ['video wall Dubai', 'LED wall display UAE', 'digital video wall'],
    longTail: ['LED video wall installation UAE', 'commercial video wall Dubai'],
    intent: 'commercial',
    targetPage: '/products'
  },
  
  // Product category keywords
  'outdoor-led-screen': {
    primary: 'outdoor LED screen Dubai',
    secondary: ['outdoor LED display UAE', 'outdoor digital signage', 'LED billboard Dubai'],
    longTail: ['outdoor LED screen price Dubai', 'high brightness LED screen outdoor'],
    intent: 'transactional',
    targetPage: '/products?category=outdoor'
  },
  'indoor-led-display': {
    primary: 'indoor LED display Dubai',
    secondary: ['indoor LED screen UAE', 'indoor video wall', 'fine pitch LED indoor'],
    longTail: ['indoor LED display for conference room', 'retail LED screen indoor'],
    intent: 'transactional',
    targetPage: '/products?category=indoor'
  },
  'transparent-led': {
    primary: 'transparent LED screen UAE',
    secondary: ['glass LED display', 'see-through LED Dubai', 'transparent video wall'],
    longTail: ['transparent LED for retail storefront', 'glass facade LED screen'],
    intent: 'commercial',
    targetPage: '/glassmorph'
  },
  
  // Technology keywords
  'microled-display': {
    primary: 'MicroLED display Dubai',
    secondary: ['MicroLED screen UAE', 'micro LED video wall', 'premium LED display'],
    longTail: ['MicroLED vs traditional LED Dubai', 'best MicroLED display supplier'],
    intent: 'informational',
    targetPage: '/technology/microled'
  },
  'cob-led': {
    primary: 'COB LED display UAE',
    secondary: ['chip on board LED', 'COB video wall', 'COB LED screen Dubai'],
    longTail: ['COB LED vs SMD comparison', 'COB LED for control room'],
    intent: 'informational',
    targetPage: '/technology/cob-led'
  }
};

// Regional keywords
export const REGIONAL_KEYWORDS = {
  dubai: {
    keywords: ['LED screen Dubai', 'video wall Dubai', 'digital signage Dubai', 'LED display supplier Dubai'],
    localTerms: ['Dubai Marina LED', 'Downtown Dubai display', 'JBR LED screen']
  },
  abuDhabi: {
    keywords: ['LED screen Abu Dhabi', 'video wall Abu Dhabi', 'LED display Abu Dhabi'],
    localTerms: ['ADGM LED display', 'Yas Island video wall', 'Saadiyat LED screen']
  },
  saudiArabia: {
    keywords: ['LED screen Saudi Arabia', 'video wall Riyadh', 'LED display Jeddah', 'Vision 2030 LED'],
    localTerms: ['NEOM LED screens', 'Riyadh Season display', 'Red Sea Project LED']
  },
  gcc: {
    keywords: ['LED screen GCC', 'video wall Middle East', 'LED supplier Gulf'],
    localTerms: ['Qatar LED display', 'Kuwait video wall', 'Bahrain LED screen']
  }
};

// Application/Industry keywords
export const APPLICATION_KEYWORDS = {
  retail: ['retail LED display', 'shopping mall video wall', 'store digital signage', 'shopfront LED screen'],
  corporate: ['corporate LED wall', 'conference room display', 'boardroom video wall', 'office LED screen'],
  hospitality: ['hotel LED display', 'restaurant digital signage', 'lobby video wall', 'resort LED screen'],
  events: ['event LED screen', 'concert video wall', 'exhibition display', 'rental LED Dubai'],
  outdoor: ['billboard LED Dubai', 'highway digital sign', 'outdoor advertising LED', 'DOOH display'],
  transportation: ['airport LED display', 'metro station screen', 'transport hub signage', 'wayfinding display'],
  healthcare: ['hospital digital signage', 'clinic LED display', 'healthcare video wall'],
  education: ['university LED screen', 'school digital signage', 'education video wall']
};

// Long-tail buyer intent keywords
export const BUYER_INTENT_KEYWORDS = {
  transactional: [
    'LED screen price Dubai',
    'buy LED video wall UAE',
    'LED display installation cost',
    'LED screen rental price Dubai',
    'commercial LED screen quote',
    'bulk LED display order UAE'
  ],
  comparison: [
    'Brightluxx vs Unilumin',
    'best LED screen supplier Dubai',
    'LED display company comparison UAE',
    'top video wall brands Dubai',
    'Absen vs local LED supplier'
  ],
  informational: [
    'how to choose LED pixel pitch',
    'LED screen brightness for outdoor',
    'video wall vs projector comparison',
    'LED display maintenance guide',
    'what is COB LED technology'
  ]
};

// Meta description templates
export const META_TEMPLATES = {
  product: (name, spec) => 
    `${name} LED display with ${spec}. Premium quality, local UAE stock, same-day delivery. Get a free quote from Brightluxx Dubai.`,
  
  category: (category) => 
    `Explore ${category} LED displays from Brightluxx Dubai. ISO certified, 15+ years experience, 500+ installations. Request free site survey.`,
  
  solution: (industry) => 
    `Professional LED display solutions for ${industry} in UAE & GCC. Custom design, expert installation, 24/7 support. Contact Brightluxx today.`,
  
  technology: (tech) => 
    `Learn about ${tech} LED technology. Technical specifications, applications, and benefits. Brightluxx - UAE's trusted LED display expert.`,
  
  location: (location) => 
    `LED screen supplier in ${location}. Local stock, fast delivery, professional installation. 15+ years serving UAE & GCC. Get quote now.`
};

// Title tag templates (45-65 characters)
export const TITLE_TEMPLATES = {
  product: (name) => `${name} | LED Display Dubai`,
  category: (cat) => `${cat} LED Screens | Supplier Dubai UAE`,
  solution: (sol) => `${sol} LED Solutions | Brightluxx Dubai`,
  technology: (tech) => `${tech} Technology | LED Displays UAE`,
  location: (loc) => `LED Screen Supplier ${loc} | Brightluxx`
};

// Alt tag templates for images
export const ALT_TAG_TEMPLATES = {
  productHero: (name, spec) => `${name} ${spec} LED display Brightluxx`,
  installation: (location, type) => `${type} LED screen installation ${location}`,
  application: (industry, type) => `${type} LED display for ${industry} Dubai`,
  caseStudy: (project, location) => `${project} LED project ${location}`,
  technology: (tech, detail) => `${tech} LED technology ${detail} close-up`
};

// Generate keywords string for meta tag
export function generateKeywords(category, subcategories = []) {
  const baseKeywords = [
    'LED display',
    'LED screen',
    'video wall',
    'digital signage',
    'Brightluxx',
    'Dubai',
    'UAE'
  ];
  
  const categoryKeywords = PRIMARY_KEYWORDS[category]?.secondary || [];
  const allKeywords = [...baseKeywords, ...categoryKeywords, ...subcategories];
  
  return [...new Set(allKeywords)].join(', ');
}

// Generate structured FAQ data for schema
export function generateFAQData(questions) {
  return questions.map(q => ({
    question: q.q,
    answer: q.a
  }));
}
