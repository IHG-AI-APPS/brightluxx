import React, { useState, useRef, useEffect } from 'react';
import HoneypotFields from '../components/HoneypotFields';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, Lock, Cpu, Eye, Building2, ShoppingBag, Briefcase, Stethoscope, Plane, Sparkles, Sun, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

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

const GlassCard = ({ children, className = '', accent = false }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border rounded-xl overflow-hidden
    ${accent ? 'border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.08)]' : 'border-white/[0.08]'}
    ${className}
  `}>
    {children}
  </div>
);

const STEPS = [
  {
    id: 'application',
    question: 'What type of project is this?',
    subtitle: 'This determines the typical viewing conditions and content requirements.',
    options: [
      { value: 'hospitality', label: 'Hospitality / Hotel', icon: Building2, desc: 'Lobby, restaurant, conference, pool' },
      { value: 'retail', label: 'Retail / Mall', icon: ShoppingBag, desc: 'Storefront, in-store, mall common area' },
      { value: 'corporate', label: 'Corporate / Office', icon: Briefcase, desc: 'Boardroom, lobby, command center' },
      { value: 'healthcare', label: 'Healthcare', icon: Stethoscope, desc: 'Wayfinding, patient info, lobby' },
      { value: 'transport', label: 'Transport / Airport', icon: Plane, desc: 'FIDS, wayfinding, advertising' },
      { value: 'entertainment', label: 'Entertainment / Museum', icon: Sparkles, desc: 'Immersive, stage, exhibition' },
      { value: 'outdoor', label: 'Outdoor / Facade', icon: Sun, desc: 'Billboard, media facade, signage' },
    ],
  },
  {
    id: 'viewing',
    question: 'What is the primary viewing distance?',
    subtitle: 'The distance from the display to where most viewers will stand.',
    options: [
      { value: 'close', label: 'Under 2 metres', desc: 'Touchscreen distance — boardrooms, retail counters' },
      { value: 'mid', label: '2 — 5 metres', desc: 'Lobby walls, meeting rooms, small retail' },
      { value: 'far', label: '5 — 10 metres', desc: 'Mall atriums, large lobbies, airports' },
      { value: 'very-far', label: '10 metres +', desc: 'Outdoor billboards, stadiums, facades' },
    ],
  },
  {
    id: 'environment',
    question: 'What is the installation environment?',
    subtitle: 'This affects brightness, IP rating, and cooling requirements.',
    options: [
      { value: 'indoor-controlled', label: 'Indoor — Controlled Light', desc: 'Office, boardroom, museum, cinema' },
      { value: 'indoor-bright', label: 'Indoor — High Ambient Light', desc: 'Mall, retail, lobby with glass facades' },
      { value: 'semi-outdoor', label: 'Semi-Outdoor', desc: 'Covered terrace, airport gate, pool area' },
      { value: 'outdoor', label: 'Fully Outdoor', desc: 'Billboard, building facade, stadium' },
    ],
  },
  {
    id: 'priority',
    question: 'What is the #1 priority?',
    subtitle: 'If you had to choose one thing that matters most for this project.',
    options: [
      { value: 'image-quality', label: 'Image Quality', desc: 'Colour accuracy, contrast, no visible pixels' },
      { value: 'budget', label: 'Budget Efficiency', desc: 'Best value without over-specifying' },
      { value: 'durability', label: 'Durability & Reliability', desc: '24/7 operation, low maintenance, long life' },
      { value: 'transparency', label: 'Transparency', desc: 'See-through display on glass or facade' },
      { value: 'wow', label: 'WOW Factor', desc: 'Landmark, social media, immersive experience' },
    ],
  },
  {
    id: 'budget',
    question: 'What is the budget positioning?',
    subtitle: 'This helps us recommend the right technology tier.',
    options: [
      { value: 'premium', label: 'Premium', desc: 'Best-in-class, no compromise on quality' },
      { value: 'mid', label: 'Mid-Range', desc: 'Good quality, sensible investment' },
      { value: 'value', label: 'Value-Optimized', desc: 'Maximum impact within budget constraints' },
    ],
  },
];

const TECHNOLOGIES = {
  microled: { name: 'MicroLED', pitch: 'P0.4 — P0.9', path: '/technology/microled', caseStudy: '/case-studies/jumeirah-al-naseem-lobby' },
  'cob-led': { name: 'COB LED', pitch: 'P0.6 — P1.2', path: '/technology/cob-led', caseStudy: '/case-studies/dubai-mall-flagship-retail' },
  'mip-led': { name: 'MiP LED', pitch: 'P0.7 — P1.5', path: '/technology/mip-led', caseStudy: null },
  'fine-pitch-led': { name: 'Fine Pitch LED', pitch: 'P1.2 — P2.5', path: '/technology/fine-pitch-led', caseStudy: '/case-studies/adnoc-hq-command-center' },
  'all-in-one-dvled': { name: 'All-in-One dvLED', pitch: 'P0.9 — P1.8', path: '/technology/all-in-one-dvled', caseStudy: '/case-studies/cleveland-clinic-abu-dhabi' },
  'transparent-led': { name: 'Transparent LED', pitch: 'P2.6 — P10', path: '/technology/transparent-led', caseStudy: '/case-studies/the-view-at-the-palm-transparent' },
  '3d-anamorphic-led': { name: '3D Anamorphic LED', pitch: 'P2.5 — P4.0', path: '/technology/3d-anamorphic-led', caseStudy: '/case-studies/kapsarc-3d-anamorphic' },
  'creative-led': { name: 'Creative LED', pitch: 'P1.5 — P4.0', path: '/technology/creative-led', caseStudy: '/case-studies/expo-city-dubai-event-hall' },
  'media-facade': { name: 'Media Facade', pitch: 'P3.9 — P25', path: '/technology/media-facade', caseStudy: null },
};

function getRecommendation(answers) {
  const scores = {};
  Object.keys(TECHNOLOGIES).forEach(k => { scores[k] = 0; });

  const appScores = {
    hospitality: { microled: 4, 'cob-led': 3, 'fine-pitch-led': 2, 'creative-led': 2 },
    retail: { 'cob-led': 4, 'transparent-led': 3, '3d-anamorphic-led': 2, 'creative-led': 2 },
    corporate: { 'fine-pitch-led': 4, 'all-in-one-dvled': 3, 'cob-led': 2, microled: 2 },
    healthcare: { 'all-in-one-dvled': 4, 'fine-pitch-led': 3, 'cob-led': 1 },
    transport: { 'fine-pitch-led': 4, 'all-in-one-dvled': 3, 'transparent-led': 2 },
    entertainment: { 'creative-led': 4, microled: 3, '3d-anamorphic-led': 3, 'media-facade': 2 },
    outdoor: { 'media-facade': 4, '3d-anamorphic-led': 3, 'transparent-led': 3 },
  };
  if (appScores[answers.application]) {
    Object.entries(appScores[answers.application]).forEach(([k, v]) => { scores[k] += v; });
  }

  const viewScores = {
    close: { microled: 4, 'cob-led': 3, 'mip-led': 3, 'all-in-one-dvled': 2 },
    mid: { 'cob-led': 3, 'fine-pitch-led': 3, 'all-in-one-dvled': 3, 'mip-led': 2 },
    far: { 'fine-pitch-led': 3, 'creative-led': 3, 'transparent-led': 2, '3d-anamorphic-led': 2 },
    'very-far': { 'media-facade': 4, '3d-anamorphic-led': 3, 'transparent-led': 2, 'creative-led': 2 },
  };
  if (viewScores[answers.viewing]) {
    Object.entries(viewScores[answers.viewing]).forEach(([k, v]) => { scores[k] += v; });
  }

  const envScores = {
    'indoor-controlled': { microled: 3, 'cob-led': 3, 'all-in-one-dvled': 3, 'fine-pitch-led': 2 },
    'indoor-bright': { 'cob-led': 3, 'fine-pitch-led': 2, 'all-in-one-dvled': 2, 'transparent-led': 2 },
    'semi-outdoor': { 'fine-pitch-led': 2, 'transparent-led': 3, '3d-anamorphic-led': 2, 'media-facade': 2 },
    outdoor: { 'media-facade': 4, '3d-anamorphic-led': 3, 'transparent-led': 2 },
  };
  if (envScores[answers.environment]) {
    Object.entries(envScores[answers.environment]).forEach(([k, v]) => { scores[k] += v; });
  }

  const prioScores = {
    'image-quality': { microled: 5, 'cob-led': 4, 'mip-led': 3 },
    budget: { 'fine-pitch-led': 4, 'all-in-one-dvled': 3, 'mip-led': 2 },
    durability: { 'cob-led': 4, 'fine-pitch-led': 3, 'all-in-one-dvled': 3 },
    transparency: { 'transparent-led': 6, 'media-facade': 2 },
    wow: { '3d-anamorphic-led': 5, 'creative-led': 4, microled: 2, 'media-facade': 3 },
  };
  if (prioScores[answers.priority]) {
    Object.entries(prioScores[answers.priority]).forEach(([k, v]) => { scores[k] += v; });
  }

  const budgetScores = {
    premium: { microled: 4, 'cob-led': 2, 'creative-led': 1 },
    mid: { 'cob-led': 3, 'fine-pitch-led': 3, 'mip-led': 2, 'all-in-one-dvled': 2 },
    value: { 'fine-pitch-led': 3, 'all-in-one-dvled': 3, 'media-facade': 1 },
  };
  if (budgetScores[answers.budget]) {
    Object.entries(budgetScores[answers.budget]).forEach(([k, v]) => { scores[k] += v; });
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return {
    primary: { id: sorted[0][0], score: sorted[0][1], ...TECHNOLOGIES[sorted[0][0]] },
    secondary: { id: sorted[1][0], score: sorted[1][1], ...TECHNOLOGIES[sorted[1][0]] },
    tertiary: { id: sorted[2][0], score: sorted[2][1], ...TECHNOLOGIES[sorted[2][0]] },
  };
}

function getReasoning(answers, rec) {
  const reasons = [];
  if (answers.priority === 'transparency') reasons.push(`Transparency was your top priority, making ${rec.primary.name} the clear choice.`);
  else if (answers.priority === 'wow') reasons.push(`For maximum WOW factor in ${answers.application} applications, ${rec.primary.name} delivers the most dramatic visual impact.`);
  else if (answers.priority === 'image-quality') reasons.push(`${rec.primary.name} offers the highest image quality with superior contrast and colour accuracy.`);
  else if (answers.priority === 'budget') reasons.push(`${rec.primary.name} provides the best balance of performance and cost efficiency.`);
  else reasons.push(`${rec.primary.name} offers excellent durability and reliability for continuous operation.`);

  if (answers.viewing === 'close') reasons.push(`At under 2m viewing distance, the ${rec.primary.pitch} pixel pitch ensures no visible pixel structure.`);
  else if (answers.viewing === 'very-far') reasons.push(`At 10m+ viewing distance, the wider pixel pitch of ${rec.primary.pitch} is optimally cost-effective.`);

  if (answers.environment === 'outdoor' || answers.environment === 'semi-outdoor') reasons.push('The recommended technology is rated for the environmental conditions including brightness and IP protection.');

  return reasons;
}

export default function TechnologySelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [leadGated, setLeadGated] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', fax: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleSelect = (value) => {
    const updated = { ...answers, [currentStep.id]: value };
    setAnswers(updated);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) { setError('Please fill in all required fields.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const rec = getRecommendation(answers);
      await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'technology_selector', application: `Tech Selector: ${rec.primary.name} (${answers.application})` }),
      });
      setLeadGated(false);
    } catch { setError('Network error. Please try again.'); }
    finally { setSubmitting(false); }
  };

  const handleRestart = () => { setStep(0); setAnswers({}); setShowResult(false); setLeadGated(true); setForm({ name: '', email: '', company: '', role: '' }); };

  const rec = showResult ? getRecommendation(answers) : null;
  const reasons = rec ? getReasoning(answers, rec) : [];

  return (
    <div className="bg-[#050508] min-h-screen" data-testid="technology-selector-page">
      <SEO
        title="Technology Selector Quiz — Find the Right LED Display | Brightluxx"
        description="Answer 5 questions to get a personalized LED display technology recommendation for your project."
        path="/technology-selector"
      />

      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Interactive Tool</span>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Technology
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-3">Selector</span>
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto tracking-wide leading-relaxed">
              Answer 5 questions about your project and get a personalized LED technology recommendation with pixel pitch, specification, and case study.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[800px] mx-auto px-6">
          {!showResult ? (
            <div data-testid="quiz-step-container">
              {/* Progress Bar */}
              <FadeInSection delay={1}>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Step {step + 1} of {STEPS.length}</span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden bg-white/[0.06]">
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      data-testid="quiz-progress-bar" 
                    />
                  </div>
                </div>
              </FadeInSection>

              {/* Question */}
              <FadeInSection delay={2}>
                <div className="mb-6">
                  {step > 0 && (
                    <button onClick={handleBack} className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-500 hover:text-gray-300 transition-colors mb-4" data-testid="quiz-back-button">
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white mb-2" data-testid="quiz-question">{currentStep.question}</h2>
                  <p className="text-sm text-gray-500">{currentStep.subtitle}</p>
                </div>
              </FadeInSection>

              {/* Options */}
              <div className="space-y-3" data-testid="quiz-options">
                {currentStep.options.map((opt, i) => (
                  <FadeInSection key={opt.value} delay={3 + i * 0.5}>
                    <button
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left p-5 rounded-xl flex items-center gap-4 transition-all duration-300 group backdrop-blur-xl bg-white/[0.03] border hover:border-cyan-500/30 hover:bg-white/[0.06] ${
                        answers[currentStep.id] === opt.value ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-white/[0.08]'
                      }`}
                      data-testid={`quiz-option-${opt.value}`}
                    >
                      {opt.icon && (
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-white/10">
                          <opt.icon size={20} className="text-cyan-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.desc}</div>
                      </div>
                      <ChevronRight size={18} className="text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    </button>
                  </FadeInSection>
                ))}
              </div>
            </div>
          ) : (
            /* Results */
            <div data-testid="quiz-result-container">
              <FadeInSection>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30">
                    <CheckCircle2 size={32} className="text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-wide text-white mb-2">Your Recommendation</h2>
                  <p className="text-sm text-gray-500">Based on your project requirements, here's our technology recommendation.</p>
                </div>
              </FadeInSection>

              {/* Primary Recommendation */}
              <FadeInSection delay={1}>
                <GlassCard accent className="p-6 md:p-8 mb-6" data-testid="quiz-primary-result">
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Recommended Technology</span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-1">{rec.primary.name}</h3>
                  <div className="text-base text-cyan-400 font-medium mb-5">Pixel Pitch: {rec.primary.pitch}</div>

                  {leadGated ? (
                    <div data-testid="quiz-lead-gate">
                      <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <Lock size={16} className="text-purple-400 flex-shrink-0" />
                        <span className="text-xs text-gray-400">Enter your details to unlock the full recommendation with reasoning, alternatives, and downloadable spec pack.</span>
                      </div>
                      <form onSubmit={handleUnlock} className="space-y-3" data-testid="quiz-unlock-form">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input 
                            type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} 
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                            placeholder="Full name *" data-testid="quiz-field-name" 
                          />
                          <input 
                            type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} 
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                            placeholder="Work email *" data-testid="quiz-field-email" 
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input 
                            type="text" value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} 
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                            placeholder="Company *" data-testid="quiz-field-company" 
                          />
                          <select 
                            value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} 
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                            data-testid="quiz-field-role"
                          >
                            <option value="" className="bg-[#0a0a0f]">Your role *</option>
                            <option value="Architect" className="bg-[#0a0a0f]">Architect</option>
                            <option value="Interior Designer" className="bg-[#0a0a0f]">Interior Designer</option>
                            <option value="AV Consultant" className="bg-[#0a0a0f]">AV Consultant</option>
                            <option value="Contractor" className="bg-[#0a0a0f]">Contractor</option>
                            <option value="Project Manager" className="bg-[#0a0a0f]">Project Manager</option>
                            <option value="Other" className="bg-[#0a0a0f]">Other</option>
                          </select>
                        </div>
                        {error && <p className="text-red-400 text-xs" data-testid="quiz-form-error">{error}</p>}
                        <HoneypotFields value={form.fax} onChange={e => setForm(p => ({...p, fax: e.target.value}))} />
                        <button 
                          type="submit" 
                          disabled={submitting} 
                          className={`w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-6 py-3.5 transition-all text-sm ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'}`}
                          data-testid="quiz-unlock-button"
                        >
                          {submitting ? 'Unlocking...' : 'Unlock Full Recommendation'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div data-testid="quiz-unlocked-result">
                      <div className="space-y-3 mb-6">
                        {reasons.map((r, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-400">{r}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <Link to={rec.primary.path} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-2 text-xs" data-testid="quiz-tech-link">
                          View {rec.primary.name} Guide <ArrowRight size={14} />
                        </Link>
                        {rec.primary.caseStudy && (
                          <Link to={rec.primary.caseStudy} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-2 text-xs" data-testid="quiz-case-link">
                            See Case Study <ArrowRight size={14} />
                          </Link>
                        )}
                        <Link to="/design-assist" className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-2 text-xs" data-testid="quiz-da-link">
                          Request Design Assist <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </FadeInSection>

              {/* Alternatives */}
              <FadeInSection delay={2}>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[rec.secondary, rec.tertiary].map((alt, i) => (
                    <GlassCard key={i} className="p-5" data-testid={`quiz-alt-${i}`}>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-1 block">Alternative {i + 1}</span>
                      <div className="text-sm font-bold tracking-wider text-white mb-0.5">{alt.name}</div>
                      <div className="text-xs text-cyan-400">Pitch: {alt.pitch}</div>
                      {!leadGated && (
                        <Link to={alt.path} className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold tracking-wider text-cyan-400 hover:gap-2.5 transition-all">
                          View Guide <ArrowRight size={12} />
                        </Link>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </FadeInSection>

              {/* Restart */}
              <FadeInSection delay={3}>
                <div className="text-center">
                  <button onClick={handleRestart} className="text-sm text-gray-500 hover:text-gray-300 transition-colors" data-testid="quiz-restart-button">
                    Start Over with Different Requirements
                  </button>
                </div>
              </FadeInSection>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
