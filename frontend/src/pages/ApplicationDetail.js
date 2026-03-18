import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Store, Building2, Briefcase, Stethoscope, Plane, Theater, Trophy, GraduationCap, Sun, CheckCircle, Zap, Eye, Ruler, Shield, X, ChevronLeft, ChevronRight, Lightbulb, Target, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import CdnImage from '../components/CdnImage';
import { generateSolutionAlt } from '../utils/altTagUtils';

const API = process.env.REACT_APP_BACKEND_URL || '';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const APPLICATIONS_DATA = {
  'shopfront-signage': {
    name: 'Shopfront Signage',
    tagline: 'High-Impact Retail Displays That Drive Foot Traffic',
    icon: Store,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    description: 'Transform your storefront into a dynamic advertising platform with LED displays that capture attention day and night. From window displays to facade-mounted signage, our solutions are engineered for the demanding UAE retail environment.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/254fe27311306074019389a9674e154e6930cfa5a095b5f26fad6465a581a41d.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/2a8354553d675b8761c0ae9c9361fb72e37971527a09dd533ec64fdfa97b8f42.png',
    ],
    challenges: [
      { title: 'High Ambient Light', desc: 'UAE storefronts face intense sunlight requiring 3,000-7,000+ nits brightness for visibility.', icon: Sun },
      { title: 'Space Constraints', desc: 'Narrow shopfronts and window installations need slim, lightweight solutions.', icon: Ruler },
      { title: 'Content Flexibility', desc: 'Retail needs frequent content updates for promotions, sales, and seasonal campaigns.', icon: Lightbulb },
      { title: '24/7 Operation', desc: 'Shopping districts operate late; displays must run continuously without overheating.', icon: Zap },
    ],
    solutions: [
      { title: 'Transparent LED', desc: 'See-through displays for glass facades that maintain natural light while showing content.', link: '/products/transparent-led' },
      { title: 'High-Brightness Outdoor', desc: 'P4-P10 outdoor-rated displays with 5,000-10,000 nits for direct sunlight visibility.', link: '/products?category=outdoor' },
      { title: 'Window LED Posters', desc: 'Slim LED poster displays for window installations with easy content management.', link: '/products/led-poster' },
    ],
    specs: [
      { label: 'Brightness', value: '3,000-10,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P2.5-P10', icon: Ruler },
      { label: 'IP Rating', value: 'IP65 (outdoor)', icon: Shield },
      { label: 'Viewing Distance', value: '1-30 meters', icon: Eye },
    ],
    caseStudyTags: ['retail', 'signage', 'shopfront'],
    faqs: [
      { q: 'What brightness is needed for a Dubai shopfront?', a: 'For direct sunlight exposure, 5,000-7,000 nits minimum. South/west-facing facades may need 8,000-10,000 nits. Shaded or covered areas can use 3,000-5,000 nits.' },
      { q: 'Can LED displays be installed on glass storefronts?', a: 'Yes, transparent LED displays are specifically designed for glass installations, offering 60-85% transparency while displaying vibrant content.' },
      { q: 'What is the lifespan of shopfront LED signage?', a: 'Quality outdoor LED displays last 50,000-100,000 hours (10-15 years) with proper maintenance and cooling.' },
    ],
    relatedSolution: 'retail',
  },
  'hospitality': {
    name: 'Hospitality & Hotels',
    tagline: 'Elevate Guest Experiences with Stunning Visual Displays',
    icon: Building2,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png',
    description: 'Create memorable first impressions in hotel lobbies, enhance dining experiences in restaurants, and deliver seamless information in conference facilities. Our hospitality solutions blend technology with elegance for the UAE\'s world-class hotels and resorts.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/16840d02833caf602880257ce47f7a291e9f9ad0f04733cc51e57005582d34b5.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7aee51984ef7428e636c2f56a202a90b74cac515bc9d49b80327e9c74a76d42e.png',
    ],
    challenges: [
      { title: 'Aesthetic Integration', desc: 'Displays must complement luxury interior design without appearing industrial.', icon: Eye },
      { title: 'Ambient Lighting Varies', desc: 'From bright lobbies to dim restaurants, displays need adaptive brightness.', icon: Sun },
      { title: 'Content Localization', desc: 'Multi-language support and culturally appropriate content for international guests.', icon: Target },
      { title: 'Quiet Operation', desc: 'Guest areas require silent, fanless operation for comfortable environments.', icon: Shield },
    ],
    solutions: [
      { title: 'COB MicroLED', desc: 'Seamless, high-contrast displays with no visible pixel structure for premium lobbies.', link: '/technology/cob-led' },
      { title: 'All-in-One dvLED', desc: 'Integrated display systems with built-in processing for meeting rooms and conferences.', link: '/technology/all-in-one-dvled' },
      { title: 'Creative LED', desc: 'Custom shapes and curved displays for architectural feature walls.', link: '/technology/creative-led' },
    ],
    specs: [
      { label: 'Brightness', value: '400-1,500 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P0.9-P2.5', icon: Ruler },
      { label: 'Contrast', value: '10,000:1+', icon: Eye },
      { label: 'Power', value: '200-400 W/sqm', icon: Zap },
    ],
    caseStudyTags: ['hospitality', 'hotel', 'lobby', 'restaurant'],
    faqs: [
      { q: 'What pixel pitch is recommended for hotel lobbies?', a: 'For viewing distances of 3-8 meters typical in hotel lobbies, P1.2-P1.9 provides excellent image quality without visible pixels.' },
      { q: 'Can LED displays be curved for architectural features?', a: 'Yes, flexible LED modules allow concave and convex installations. Creative LED solutions can wrap around columns or create immersive curved walls.' },
      { q: 'How do you manage content across multiple hotel displays?', a: 'Centralized CMS platforms allow scheduling, multi-zone content, and remote management across all property displays.' },
    ],
    relatedSolution: 'hospitality',
  },
  'retail-malls': {
    name: 'Retail & Shopping Malls',
    tagline: 'Immersive Experiences That Transform Shopping Destinations',
    icon: Store,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png',
    description: 'From spectacular atrium installations to interactive brand activations, LED displays are transforming UAE malls into entertainment destinations. Create landmark installations that drive social media engagement and foot traffic.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/254fe27311306074019389a9674e154e6930cfa5a095b5f26fad6465a581a41d.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/fe43f22500af65dab2a6a06f5df2fe660523726339ac9581b781476767b0b9b4.png',
    ],
    challenges: [
      { title: 'Large-Scale Installations', desc: 'Mall atriums require massive displays (100+ sqm) with complex structural integration.', icon: Ruler },
      { title: 'High Foot Traffic', desc: 'Displays must withstand continuous viewing from multiple angles and distances.', icon: Eye },
      { title: 'Brand Experiences', desc: 'Retailers want interactive, immersive experiences that differentiate their stores.', icon: Lightbulb },
      { title: 'Content Management', desc: 'Multiple advertisers and tenants need scheduled, zoned content delivery.', icon: Target },
    ],
    solutions: [
      { title: '3D Anamorphic LED', desc: 'Glasses-free 3D content that creates viral social media moments.', link: '/technology/3d-anamorphic-led' },
      { title: 'Fine Pitch Indoor', desc: 'High-resolution displays for close-viewing retail environments.', link: '/technology/fine-pitch-led' },
      { title: 'Transparent LED', desc: 'Glass facade displays that maintain store visibility while advertising.', link: '/technology/transparent-led' },
    ],
    specs: [
      { label: 'Brightness', value: '800-2,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P1.5-P4', icon: Ruler },
      { label: 'Refresh Rate', value: '3,840 Hz+', icon: Zap },
      { label: 'Viewing Angle', value: '160°+', icon: Eye },
    ],
    caseStudyTags: ['retail', 'mall', 'shopping', 'brand'],
    faqs: [
      { q: 'What makes 3D anamorphic LED displays work?', a: '3D anamorphic displays use corner installations and specially created content to create depth illusions without glasses. The effect is strongest from specific viewing angles.' },
      { q: 'How are large mall displays installed?', a: 'Large installations require structural engineering, custom mounting systems, and phased installation. Our team handles everything from initial survey to final calibration.' },
      { q: 'Can multiple brands share advertising on mall displays?', a: 'Yes, CMS platforms support scheduled content from multiple advertisers with dayparting, duration control, and proof-of-play reporting.' },
    ],
    relatedSolution: 'retail',
  },
  'corporate': {
    name: 'Corporate & Offices',
    tagline: 'Professional Display Solutions for Modern Workplaces',
    icon: Briefcase,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    description: 'Empower presentations, enhance collaboration, and create impressive reception areas with LED solutions designed for corporate environments. From boardrooms to command centers, we deliver professional-grade visual experiences.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/360269c4ce8437e2a7dd7fa3c5d599bbb66da0fc5194f99377a2705002a857c7.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/a379f5353c57d10c3ccb272e021b119bde5d9c6101d9a4d4f71817893955204d.png',
    ],
    challenges: [
      { title: 'Seamless Presentations', desc: 'Boardrooms need displays that work flawlessly with laptops, video conferencing, and collaboration tools.', icon: Target },
      { title: 'All-Day Viewing', desc: 'Meeting rooms require comfortable brightness levels for extended use without eye strain.', icon: Eye },
      { title: 'IT Integration', desc: 'Displays must integrate with existing AV systems, room booking, and corporate networks.', icon: Wrench },
      { title: 'Professional Aesthetics', desc: 'Executive spaces demand premium finishes and clean cable management.', icon: Shield },
    ],
    solutions: [
      { title: 'All-in-One dvLED', desc: 'Complete display systems with built-in processing, ideal for meeting rooms.', link: '/technology/all-in-one-dvled' },
      { title: 'Fine Pitch LED', desc: 'Ultra-high resolution for close viewing in boardrooms and executive offices.', link: '/technology/fine-pitch-led' },
      { title: 'Control Room LED', desc: 'Mission-critical displays for NOCs, SOCs, and command centers.', link: '/technology/control-room-led' },
    ],
    specs: [
      { label: 'Brightness', value: '400-800 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P0.7-P1.9', icon: Ruler },
      { label: 'Processing', value: 'Built-in 4K', icon: Zap },
      { label: 'Input', value: 'HDMI 2.1/USB-C', icon: Eye },
    ],
    caseStudyTags: ['corporate', 'office', 'boardroom', 'command'],
    faqs: [
      { q: 'What size LED display is recommended for a boardroom?', a: 'For a typical 10-15 person boardroom, a 138-165 inch (3.5-4.2m) diagonal display provides excellent visibility from all seats.' },
      { q: 'Can LED displays replace projectors in meeting rooms?', a: 'Yes, LED displays offer superior brightness (no need for dimmed rooms), better color accuracy, and zero maintenance compared to projectors.' },
      { q: 'How do LED video walls integrate with video conferencing?', a: 'Modern LED displays include built-in processing with USB-C/HDMI inputs, compatible with Teams, Zoom, and other platforms. Optional camera/microphone integration is available.' },
    ],
    relatedSolution: 'corporate',
  },
  'healthcare': {
    name: 'Healthcare',
    tagline: 'Clear Communication for Critical Care Environments',
    icon: Stethoscope,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png',
    description: 'Improve patient experience and operational efficiency with LED displays designed for healthcare environments. From wayfinding to waiting room entertainment, our solutions meet the unique requirements of hospitals and medical facilities.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ae5cc82c28141702c52b9a389f559c1c2e64abf5788d43dd5cab81ab40e71394.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/20ff688183452b421340a26c5f7272a9fcb806cb4d30add3d3434cb033be1933.png',
    ],
    challenges: [
      { title: 'Infection Control', desc: 'Smooth, sealed surfaces that can be easily cleaned and disinfected.', icon: Shield },
      { title: 'Patient Comfort', desc: 'Low brightness options for sensitive environments. Flicker-free for long viewing.', icon: Eye },
      { title: 'Critical Information', desc: 'Real-time integration with hospital systems for queue management and wayfinding.', icon: Target },
      { title: 'Reliability', desc: 'Mission-critical displays for emergency departments and operating theaters.', icon: Zap },
    ],
    solutions: [
      { title: 'All-in-One dvLED', desc: 'Sealed, easy-to-clean displays for waiting areas and patient information.', link: '/technology/all-in-one-dvled' },
      { title: 'Fine Pitch Indoor', desc: 'High-resolution displays for detailed medical imaging and training.', link: '/technology/fine-pitch-led' },
    ],
    specs: [
      { label: 'Brightness', value: '300-600 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P1.2-P2.5', icon: Ruler },
      { label: 'Flicker', value: 'PWM 3,840 Hz+', icon: Zap },
      { label: 'Surface', value: 'IP30+ Sealed', icon: Shield },
    ],
    caseStudyTags: ['healthcare', 'hospital', 'medical'],
    faqs: [
      { q: 'Are LED displays safe for hospital environments?', a: 'Yes, modern LED displays meet healthcare facility requirements. GOB and COB surfaces are sealed and easy to clean. Low EMI emissions are suitable for sensitive equipment areas.' },
      { q: 'Can displays integrate with hospital information systems?', a: 'Yes, displays can connect to queue management, wayfinding, and patient information systems via standard APIs and protocols.' },
      { q: 'What certifications are required for healthcare LED displays?', a: 'Displays should meet IEC 60601-1 for medical electrical equipment safety. CE, FCC, and UL certifications ensure compliance with safety and EMI standards.' },
    ],
    relatedSolution: 'corporate',
  },
  'transportation': {
    name: 'Transportation & Airports',
    tagline: 'Mission-Critical Displays for Moving Millions',
    icon: Plane,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png',
    description: 'From flight information displays to metro wayfinding, our transportation solutions deliver reliable performance for critical passenger communications. Designed for 24/7 operation in demanding environments.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/40271a3de773f454b67f00a2b6d21cb496b28c6d96f4c3890d055ef06991f979.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/51def6d71b2956b099c4c00d843cdad1fcde69379e77fa31d6d2c42ddcc07d60.png',
    ],
    challenges: [
      { title: '24/7 Reliability', desc: 'Critical information systems require 99.99% uptime with redundant processing.', icon: Shield },
      { title: 'Long Viewing Distances', desc: 'Large terminals need displays visible from 50+ meters in bright environments.', icon: Eye },
      { title: 'Data Integration', desc: 'Real-time feeds from FIDS, ARINC, and transit management systems.', icon: Target },
      { title: 'High Traffic Areas', desc: 'Displays must be durable and vandal-resistant in public spaces.', icon: Wrench },
    ],
    solutions: [
      { title: 'High-Brightness Indoor', desc: 'Displays for departure halls, ticketing areas, and gate information.', link: '/products?category=indoor' },
      { title: 'Outdoor LED', desc: 'Weather-resistant displays for transit stops and station exteriors.', link: '/products?category=outdoor' },
      { title: 'Control Room LED', desc: 'Command center displays for operations monitoring.', link: '/technology/control-room-led' },
    ],
    specs: [
      { label: 'Uptime', value: '99.99%', icon: Shield },
      { label: 'Brightness', value: '1,000-2,000 nits', icon: Sun },
      { label: 'Integration', value: 'ARINC/SITA', icon: Zap },
      { label: 'Redundancy', value: 'Dual PSU/Signal', icon: CheckCircle },
    ],
    caseStudyTags: ['transportation', 'airport', 'transit', 'metro'],
    faqs: [
      { q: 'What redundancy features are important for FIDS displays?', a: 'Dual power supplies, hot-swappable modules, redundant signal paths, and automatic failover to backup content are essential for mission-critical FIDS applications.' },
      { q: 'How do LED displays integrate with airport systems?', a: 'Displays connect to ARINC/SITA Type-B messaging, CUTE workstations, and airport operational databases via standard protocols.' },
      { q: 'What maintenance is required for 24/7 airport displays?', a: 'Front-serviceable modules allow maintenance without taking down the entire display. Preventive maintenance typically includes cleaning and calibration every 6-12 months.' },
    ],
    relatedSolution: 'transportation',
  },
  'entertainment': {
    name: 'Entertainment & Cinemas',
    tagline: 'Immersive Experiences That Captivate Audiences',
    icon: Theater,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png',
    description: 'Transform entertainment venues with LED technology that delivers stunning visual experiences. From cinema screens to museum installations, create memorable moments that audiences will never forget.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f9de65cfc89b9659c1b078e8086075bfcb92c37a325d7251cda608d859dcf755.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/085c5152d8cf0eebf7a6c56406448f78f7ffeaf9e345eec76fcfe22d45afa880.png',
    ],
    challenges: [
      { title: 'Cinema-Grade Quality', desc: 'Displays must meet DCI standards for color accuracy and contrast in dark environments.', icon: Eye },
      { title: 'Large Format', desc: 'Cinema screens often exceed 10 meters wide, requiring seamless installation.', icon: Ruler },
      { title: 'Content Delivery', desc: 'Integration with cinema servers and content protection (DRM) systems.', icon: Shield },
      { title: 'Acoustic Transparency', desc: 'Sound must pass through or around displays without degradation.', icon: Lightbulb },
    ],
    solutions: [
      { title: 'Cinema LED', desc: 'DCI-certified displays for commercial cinema applications.', link: '/technology/cinema-led' },
      { title: 'Creative LED', desc: 'Custom shapes and immersive installations for museums and attractions.', link: '/technology/creative-led' },
      { title: 'Fine Pitch LED', desc: 'Premium home cinema and screening room displays.', link: '/technology/fine-pitch-led' },
    ],
    specs: [
      { label: 'Color Gamut', value: 'DCI-P3', icon: Eye },
      { label: 'Contrast', value: '100,000:1', icon: Sun },
      { label: 'HDR', value: 'Dolby Vision', icon: Zap },
      { label: 'Frame Rate', value: '120fps HFR', icon: CheckCircle },
    ],
    caseStudyTags: ['entertainment', 'cinema', 'museum', 'attraction'],
    faqs: [
      { q: 'How do LED cinema screens compare to projectors?', a: 'LED screens offer superior brightness (no degradation over time), perfect blacks, consistent image quality from all seats, and no bulb replacements. They excel in ambient light conditions where projectors struggle.' },
      { q: 'Can LED displays meet DCI certification requirements?', a: 'Yes, top-tier LED cinema screens meet DCI specifications for color space (P3), peak luminance, black level, and uniformity. Samsung Onyx and Christie are certified solutions.' },
      { q: 'What is the typical lifespan of a cinema LED screen?', a: 'LED cinema screens typically last 100,000+ hours (20+ years of typical cinema operation) with minimal maintenance, compared to 2,000-4,000 hours for projector bulbs.' },
    ],
    relatedSolution: 'entertainment',
  },
  'sports-events': {
    name: 'Sports & Events',
    tagline: 'Electrify Audiences with Stadium-Scale Displays',
    icon: Trophy,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png',
    description: 'From massive stadium scoreboards to ribbon displays, create unforgettable experiences for fans and sponsors. Our sports solutions are built for extreme reliability in demanding live event environments.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/22225955d577ff43bd679bda5b298f35aa4226558ec0750785a5e4f0a09750aa.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/07761210154255d013573596ebb872b6c03610990a806a27e4ded7164b327fd6.png',
    ],
    challenges: [
      { title: 'Extreme Brightness', desc: 'Outdoor stadiums require 7,000-12,000 nits to compete with direct sunlight.', icon: Sun },
      { title: 'Camera Capture', desc: 'High refresh rates (7,680 Hz+) prevent flicker on broadcast cameras.', icon: Eye },
      { title: 'Weather Exposure', desc: 'Displays must withstand rain, dust, and extreme temperatures.', icon: Shield },
      { title: 'Live Production', desc: 'Real-time graphics, replays, and sponsor content require seamless integration.', icon: Zap },
    ],
    solutions: [
      { title: 'Stadium Perimeter LED', desc: 'Dynamic advertising boards around the pitch.', link: '/products?category=outdoor' },
      { title: 'Scoreboard/Centerhung', desc: 'Massive multi-sided displays for scoreboards and replays.', link: '/products?category=outdoor' },
      { title: 'Mobile/Rental LED', desc: 'Quick-deploy solutions for concerts and temporary events.', link: '/products?category=rental' },
    ],
    specs: [
      { label: 'Brightness', value: '7,000-12,000 nits', icon: Sun },
      { label: 'Refresh Rate', value: '7,680 Hz+', icon: Zap },
      { label: 'Protection', value: 'IP65/IP68', icon: Shield },
      { label: 'Viewing', value: '100+ meters', icon: Eye },
    ],
    caseStudyTags: ['sports', 'stadium', 'events', 'concert'],
    faqs: [
      { q: 'Why is high refresh rate important for stadium displays?', a: 'High refresh rates (7,680 Hz+) prevent visible flicker and black bands when captured by broadcast cameras. This is critical for televised events and social media content.' },
      { q: 'How do perimeter LED displays handle advertising changes?', a: 'Modern perimeter systems integrate with sports graphics platforms for real-time sponsor rotations, dynamic content based on game events, and virtual advertising for different broadcast regions.' },
      { q: 'What IP rating is required for outdoor stadium displays?', a: 'IP65 minimum for protected locations, IP68 for displays exposed to direct rain. UAE stadiums should also consider dust ingress (IP6X) and extreme heat operation.' },
    ],
    relatedSolution: 'events',
  },
  'education': {
    name: 'Education',
    tagline: 'Transform Learning with Interactive Visual Technology',
    icon: GraduationCap,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png',
    description: 'Engage students and enhance learning outcomes with LED displays designed for educational environments. From interactive classrooms to campus-wide digital signage, empower educators with visual technology.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ece677e88cab7bac3c4414cd4fb4457d8f4dd1bce07e43712f6e8bcdf764c9dd.png',
    ],
    challenges: [
      { title: 'Interactive Learning', desc: 'Classrooms need touch-enabled displays for collaborative learning.', icon: Lightbulb },
      { title: 'Long Usage Hours', desc: 'Educational displays run 8-12 hours daily; reliability is critical.', icon: Zap },
      { title: 'Budget Constraints', desc: 'Schools need cost-effective solutions with low total cost of ownership.', icon: Target },
      { title: 'Easy Maintenance', desc: 'IT staff need simple management across multiple classrooms.', icon: Wrench },
    ],
    solutions: [
      { title: 'Interactive LED', desc: 'Touch-enabled displays for collaborative learning environments.', link: '/products?category=interactive' },
      { title: 'All-in-One dvLED', desc: 'Complete display systems for lecture halls and auditoriums.', link: '/technology/all-in-one-dvled' },
      { title: 'Fine Pitch LED', desc: 'High-resolution displays for detailed educational content.', link: '/technology/fine-pitch-led' },
    ],
    specs: [
      { label: 'Brightness', value: '400-800 nits', icon: Sun },
      { label: 'Touch', value: 'IR 20-point', icon: Ruler },
      { label: 'Lifespan', value: '50,000+ hrs', icon: Zap },
      { label: 'Management', value: 'Cloud CMS', icon: Shield },
    ],
    caseStudyTags: ['education', 'school', 'university', 'classroom'],
    faqs: [
      { q: 'What is the best display size for a typical classroom?', a: 'For a classroom of 30 students with viewing distances of 3-8 meters, an 86-98 inch display provides optimal visibility. Larger lecture halls may require 110-138 inch or larger.' },
      { q: 'How do interactive LED displays work?', a: 'Interactive LED displays use infrared (IR) touch technology with 10-40 touch points for multi-user collaboration. They integrate with annotation software, interactive whiteboard apps, and wireless screen sharing.' },
      { q: 'What is the total cost of ownership for educational LED displays?', a: 'LED displays have lower TCO than projectors due to no lamp replacements, minimal maintenance, and longer lifespan (50,000+ hours vs. 2,000-4,000 hours for projector lamps).' },
    ],
    relatedSolution: 'education',
  },
  'outdoor-billboards': {
    name: 'Outdoor & Billboards',
    tagline: 'Maximum Impact for Outdoor Advertising',
    icon: Sun,
    heroImage: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    description: 'Dominate the outdoor advertising landscape with LED billboards and media facades that deliver unmatched visibility. From highway spectaculars to building-wrap installations, capture attention 24/7.',
    gallery: [
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6911b0d55c61839f131d3217cc8e5bdd2c73e339919a1c04826c8dfd79eaf7f0.png',
      'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/557b0ddabad0adc0fba81b320821a3adf782837c1aa705d6b13b9c4a5dac87eb.png',
    ],
    challenges: [
      { title: 'Extreme Brightness', desc: 'UAE sunlight demands 8,000-12,000 nits for daytime visibility.', icon: Sun },
      { title: 'Weather Resistance', desc: 'Displays must handle dust storms, rain, and 50°C+ temperatures.', icon: Shield },
      { title: 'Remote Management', desc: 'Billboard networks need centralized content management and monitoring.', icon: Target },
      { title: 'Energy Efficiency', desc: 'Large displays require power optimization for operational cost control.', icon: Zap },
    ],
    solutions: [
      { title: 'High-Brightness Outdoor', desc: 'P4-P20 displays rated for extreme outdoor conditions.', link: '/products?category=outdoor' },
      { title: 'Media Facade', desc: 'Building-integrated displays for architectural advertising.', link: '/technology/media-facade' },
      { title: 'Transparent Mesh', desc: 'See-through displays for building facades and skywalks.', link: '/technology/transparent-led' },
    ],
    specs: [
      { label: 'Brightness', value: '7,000-12,000 nits', icon: Sun },
      { label: 'Pixel Pitch', value: 'P4-P20', icon: Ruler },
      { label: 'Operating Temp', value: '-20 to 60°C', icon: Zap },
      { label: 'Protection', value: 'IP65/IP68', icon: Shield },
    ],
    caseStudyTags: ['outdoor', 'billboard', 'dooh', 'media facade'],
    faqs: [
      { q: 'What pixel pitch is appropriate for highway billboards?', a: 'For viewing distances of 50-200 meters typical of highway billboards, P10-P16 provides excellent visibility while optimizing cost. Closer urban billboards may use P6-P10.' },
      { q: 'How do outdoor LED billboards handle UAE summer heat?', a: 'Quality outdoor displays include intelligent thermal management, automatic brightness adjustment, and are rated for continuous operation up to 50-60°C ambient temperature.' },
      { q: 'What are the typical power requirements for outdoor LED billboards?', a: 'Outdoor LED displays consume approximately 300-600W per square meter at maximum brightness. Energy-saving modes and automatic brightness adjustment can reduce consumption by 40-60%.' },
    ],
    relatedSolution: 'outdoor',
  },
};

// Image Gallery Modal
const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (currentIndex === null || !images?.length) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <motion.div 
        className="max-w-6xl w-full mx-6"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <img 
          src={images[currentIndex]} 
          alt="Gallery" 
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
        <div className="text-center mt-4 text-gray-400 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ApplicationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const app = APPLICATIONS_DATA[slug];

  useEffect(() => {
    if (!app) return;
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`${API}/api/case-studies`);
        const data = await response.json();
        const studies = data.case_studies || data || [];
        const filtered = studies.filter(cs => 
          app.caseStudyTags.some(tag => 
            cs.category?.toLowerCase().includes(tag) || 
            cs.tags?.some(t => t.toLowerCase().includes(tag))
          )
        ).slice(0, 3);
        setCaseStudies(filtered);
      } catch (err) {
        console.error('Failed to fetch case studies:', err);
      }
    };
    fetchCaseStudies();
  }, [app]);

  const handlePrevImage = () => {
    if (!app?.gallery?.length) return;
    setGalleryIndex(prev => prev === 0 ? app.gallery.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    if (!app?.gallery?.length) return;
    setGalleryIndex(prev => prev === app.gallery.length - 1 ? 0 : prev + 1);
  };

  if (!app) {
    return (
      <div className="bg-[#050508] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Application Not Found</h1>
          <p className="text-gray-400 mb-6">The application you're looking for doesn't exist.</p>
          <Link to="/applications" className="bg-cyan-500 text-black px-6 py-3 font-bold uppercase tracking-wider">
            View All Applications
          </Link>
        </div>
      </div>
    );
  }

  const Icon = app.icon;

  return (
    <div className="bg-[#050508] min-h-screen" data-testid={`application-detail-${slug}`}>
      <SEO
        title={`${app.name} LED Displays | ${app.tagline} Dubai UAE`}
        description={`${app.description.slice(0, 140)} Expert LED installation for ${app.name.toLowerCase()} in UAE & GCC.`}
        path={`/applications/${slug}`}
        keywords={`${app.name} LED display, ${app.name.toLowerCase()} video wall, ${app.name.toLowerCase()} digital signage, Dubai, UAE`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Applications', path: '/applications' },
          { name: app.name, path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": `LED Display Solutions for ${app.name}`,
          "name": `${app.name} LED Displays`,
          "description": app.description,
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "areaServed": ["Dubai", "Abu Dhabi", "UAE", "Saudi Arabia", "GCC"]
        }}
      />

      {/* Dramatic Full-Width Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={app.heroImage} 
            alt={`LED display solutions for ${app.name} industry Dubai`}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/20" />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full">
            <FadeInSection>
              <Breadcrumbs 
                items={[
                  { name: 'Home', path: '/' },
                  { name: 'Applications', path: '/applications' },
                  { name: app.name, path: null }
                ]}
                className="mb-8"
              />
              
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
                  <Icon size={32} className="text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-3" data-testid="application-title">
                    {app.name}
                  </h1>
                  <p className="text-xl text-cyan-400 font-medium tracking-wide">{app.tagline}</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
                {app.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                >
                  Get Quote <ArrowRight size={16} />
                </Link>
                <Link 
                  to={`/solutions/${app.relatedSolution}`}
                  className="bg-white/5 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                >
                  View Solutions <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      <section className="py-10 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {app.specs.map((spec, i) => (
                <div key={i} className="text-center p-4">
                  <spec.icon size={24} className="text-cyan-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{spec.value}</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">{spec.label}</div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Image Gallery Section */}
      {app.gallery && app.gallery.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection delay={2}>
              <div className="mb-8">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Visual Showcase</span>
                <h2 className="text-2xl font-bold tracking-wide text-white">Real-World Installations</h2>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-4">
              {app.gallery.map((img, i) => (
                <FadeInSection key={i} delay={3 + i}>
                  <div 
                    className="group cursor-pointer relative rounded-xl overflow-hidden h-64 md:h-80"
                    onClick={() => setGalleryIndex(i)}
                  >
                    <img 
                      src={img} 
                      alt={`${app.name} installation ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Eye size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions - With Icons */}
      <section className="py-16 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <FadeInSection delay={4}>
              <div className="mb-8">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Understanding Your Needs</span>
                <h2 className="text-2xl font-bold tracking-wide text-white">Industry Challenges</h2>
              </div>
              <div className="space-y-4">
                {app.challenges.map((c, i) => {
                  const ChallengeIcon = c.icon || Lightbulb;
                  return (
                    <GlassCard key={i} className="p-5" hover={false}>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <ChallengeIcon size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold tracking-wider text-white mb-1">{c.title}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </FadeInSection>

            {/* Solutions */}
            <FadeInSection delay={5}>
              <div className="mb-8">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Our Recommendations</span>
                <h2 className="text-2xl font-bold tracking-wide text-white">Recommended Solutions</h2>
              </div>
              <div className="space-y-4">
                {app.solutions.map((s, i) => (
                  <Link key={i} to={s.link} className="block group">
                    <GlassCard className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                            <CheckCircle size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold tracking-wider text-white mb-1 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection delay={6}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Real Projects</span>
                  <h2 className="text-2xl font-bold tracking-wide text-white">Related Case Studies</h2>
                </div>
                <Link to="/case-studies" className="text-sm font-bold tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((cs, i) => (
                <FadeInSection key={cs._id || i} delay={7 + i}>
                  <Link to={`/case-studies/${cs.slug || cs._id}`} className="group block">
                    <GlassCard className="overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        {cs.image_url_card || cs.image_url || cs.images?.[0] ? (
                          <CdnImage 
                            src={cs.image_url_card || cs.image_url || cs.images?.[0]} 
                            alt={cs.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            w={400}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                            <Building2 size={48} className="text-white/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="text-[9px] font-bold tracking-[0.15em] text-cyan-400 uppercase mb-2">{cs.category || cs.location}</div>
                        <h3 className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">{cs.title}</h3>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={8}>
            <div className="mb-8">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Common Questions</span>
              <h2 className="text-2xl font-bold tracking-wide text-white">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.faqs.map((faq, i) => (
              <FadeInSection key={i} delay={9 + i}>
                <GlassCard className="p-6 h-full" hover={false}>
                  <h3 className="text-sm font-bold tracking-wider text-white mb-3">{faq.q}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                </GlassCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection delay={10}>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-cyan-500/20" />
              <div className="absolute inset-0 backdrop-blur-3xl" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />

              <div className="relative p-10 lg:p-14">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Start Your {app.name} Project</span>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                      Ready to
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">Get Started?</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Our team specializes in {app.name.toLowerCase()} LED solutions for the UAE market. Get a custom quotation and site survey.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 lg:justify-end">
                    <Link 
                      to="/contact" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    >
                      Get Quote <ArrowRight size={16} />
                    </Link>
                    <Link 
                      to={`/solutions/${app.relatedSolution}`}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                    >
                      View Solutions <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {galleryIndex !== null && app.gallery && (
          <ImageModal 
            images={app.gallery}
            currentIndex={galleryIndex}
            onClose={() => setGalleryIndex(null)}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
