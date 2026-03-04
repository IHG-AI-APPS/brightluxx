import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, Lock, Cpu, Eye, Building2, ShoppingBag, Briefcase, Stethoscope, Plane, Sparkles, Sun, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL;

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

/* ─── Recommendation Engine ─── */
const TECHNOLOGIES = {
  microled: { name: 'MicroLED', pitch: 'P0.4 — P0.9', path: '/technology/microled', caseStudy: '/case-studies/jumeirah-al-naseem-lobby', specPack: 'cob-mip-smd' },
  'cob-led': { name: 'COB LED', pitch: 'P0.6 — P1.2', path: '/technology/cob-led', caseStudy: '/case-studies/dubai-mall-flagship-retail', specPack: 'cob-mip-smd' },
  'mip-led': { name: 'MiP LED', pitch: 'P0.7 — P1.5', path: '/technology/mip-led', caseStudy: null, specPack: 'cob-mip-smd' },
  'fine-pitch-led': { name: 'Fine Pitch LED', pitch: 'P1.2 — P2.5', path: '/technology/fine-pitch-led', caseStudy: '/case-studies/adnoc-hq-command-center', specPack: 'corporate-control' },
  'all-in-one-dvled': { name: 'All-in-One dvLED', pitch: 'P0.9 — P1.8', path: '/technology/all-in-one-dvled', caseStudy: '/case-studies/cleveland-clinic-abu-dhabi', specPack: 'corporate-control' },
  'transparent-led': { name: 'Transparent LED', pitch: 'P2.6 — P10', path: '/technology/transparent-led', caseStudy: '/case-studies/the-view-at-the-palm-transparent', specPack: 'outdoor-dooh' },
  '3d-anamorphic-led': { name: '3D Anamorphic LED', pitch: 'P2.5 — P4.0', path: '/technology/3d-anamorphic-led', caseStudy: '/case-studies/kapsarc-3d-anamorphic', specPack: 'outdoor-dooh' },
  'creative-led': { name: 'Creative LED', pitch: 'P1.5 — P4.0', path: '/technology/creative-led', caseStudy: '/case-studies/expo-city-dubai-event-hall', specPack: 'retail-hospitality' },
  'media-facade': { name: 'Media Facade', pitch: 'P3.9 — P25', path: '/technology/media-facade', caseStudy: null, specPack: 'outdoor-dooh' },
};

function getRecommendation(answers) {
  const scores = {};
  Object.keys(TECHNOLOGIES).forEach(k => { scores[k] = 0; });

  // Application scoring
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

  // Viewing distance scoring
  const viewScores = {
    close: { microled: 4, 'cob-led': 3, 'mip-led': 3, 'all-in-one-dvled': 2 },
    mid: { 'cob-led': 3, 'fine-pitch-led': 3, 'all-in-one-dvled': 3, 'mip-led': 2 },
    far: { 'fine-pitch-led': 3, 'creative-led': 3, 'transparent-led': 2, '3d-anamorphic-led': 2 },
    'very-far': { 'media-facade': 4, '3d-anamorphic-led': 3, 'transparent-led': 2, 'creative-led': 2 },
  };
  if (viewScores[answers.viewing]) {
    Object.entries(viewScores[answers.viewing]).forEach(([k, v]) => { scores[k] += v; });
  }

  // Environment scoring
  const envScores = {
    'indoor-controlled': { microled: 3, 'cob-led': 3, 'all-in-one-dvled': 3, 'fine-pitch-led': 2 },
    'indoor-bright': { 'cob-led': 3, 'fine-pitch-led': 2, 'all-in-one-dvled': 2, 'transparent-led': 2 },
    'semi-outdoor': { 'fine-pitch-led': 2, 'transparent-led': 3, '3d-anamorphic-led': 2, 'media-facade': 2 },
    outdoor: { 'media-facade': 4, '3d-anamorphic-led': 3, 'transparent-led': 2 },
  };
  if (envScores[answers.environment]) {
    Object.entries(envScores[answers.environment]).forEach(([k, v]) => { scores[k] += v; });
  }

  // Priority scoring
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

  // Budget scoring
  const budgetScores = {
    premium: { microled: 4, 'cob-led': 2, 'creative-led': 1 },
    mid: { 'cob-led': 3, 'fine-pitch-led': 3, 'mip-led': 2, 'all-in-one-dvled': 2 },
    value: { 'fine-pitch-led': 3, 'all-in-one-dvled': 3, 'media-facade': 1 },
  };
  if (budgetScores[answers.budget]) {
    Object.entries(budgetScores[answers.budget]).forEach(([k, v]) => { scores[k] += v; });
  }

  // Sort by score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0];
  const secondary = sorted[1];
  const tertiary = sorted[2];

  return {
    primary: { id: primary[0], score: primary[1], ...TECHNOLOGIES[primary[0]] },
    secondary: { id: secondary[0], score: secondary[1], ...TECHNOLOGIES[secondary[0]] },
    tertiary: { id: tertiary[0], score: tertiary[1], ...TECHNOLOGIES[tertiary[0]] },
  };
}

function getReasoning(answers, rec) {
  const reasons = [];
  if (answers.priority === 'transparency') reasons.push(`Transparency was your top priority, making ${rec.primary.name} the clear choice.`);
  else if (answers.priority === 'wow') reasons.push(`For maximum WOW factor in ${answers.application} applications, ${rec.primary.name} delivers the most dramatic visual impact.`);
  else if (answers.priority === 'image-quality') reasons.push(`${rec.primary.name} offers the highest image quality with superior contrast and colour accuracy.`);
  else if (answers.priority === 'budget') reasons.push(`${rec.primary.name} provides the best balance of performance and cost efficiency for ${answers.application} projects.`);
  else reasons.push(`${rec.primary.name} offers excellent durability and reliability for continuous operation.`);

  if (answers.viewing === 'close') reasons.push(`At under 2m viewing distance, the ${rec.primary.pitch} pixel pitch ensures no visible pixel structure.`);
  else if (answers.viewing === 'very-far') reasons.push(`At 10m+ viewing distance, the wider pixel pitch of ${rec.primary.pitch} is optimally cost-effective without sacrificing perceived image quality.`);

  if (answers.environment === 'outdoor' || answers.environment === 'semi-outdoor') reasons.push('The recommended technology is rated for the environmental conditions including brightness, IP protection, and thermal management.');

  return reasons;
}

export default function TechnologySelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [leadGated, setLeadGated] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleSelect = (value) => {
    const updated = { ...answers, [currentStep.id]: value };
    setAnswers(updated);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const rec = getRecommendation(answers);
      await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'technology_selector',
          application: `Tech Selector: ${rec.primary.name} (${answers.application})`,
        }),
      });
      setLeadGated(false);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setLeadGated(true);
    setForm({ name: '', email: '', company: '', role: '' });
  };

  const rec = showResult ? getRecommendation(answers) : null;
  const reasons = rec ? getReasoning(answers, rec) : [];

  return (
    <div className="pb-20" data-testid="technology-selector-page">
      <SEO
        title="Technology Selector Quiz — Find the Right LED Display | Brightluxx"
        description="Answer 5 questions to get a personalized LED display technology recommendation for your project. Interactive tool for architects, consultants, and contractors."
        path="/technology-selector"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LED Technology Selector",
          "description": "Interactive quiz to recommend the right LED display technology based on project requirements.",
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "applicationCategory": "BusinessApplication"
        }}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-8">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">INTERACTIVE TOOL</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider leading-tight mb-3">Technology Selector</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-lg mx-auto" style={{ textTransform: 'none' }}>
            Answer 5 questions about your project and get a personalized LED technology recommendation with pixel pitch, specification, and case study.
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6">

        {!showResult ? (
          /* ─── Quiz Steps ─── */
          <div data-testid="quiz-step-container">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">
                  STEP {step + 1} OF {STEPS.length}
                </span>
                <span className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--blx-gold-3)' }} data-testid="quiz-progress-bar" />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              {step > 0 && (
                <button onClick={handleBack} className="flex items-center gap-1 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-muted)] hover:text-[var(--blx-text-2)] transition-colors mb-4" data-testid="quiz-back-button">
                  <ArrowLeft size={12} /> Back
                </button>
              )}
              <h2 className="text-base sm:text-lg font-bold tracking-wider mb-2" data-testid="quiz-question">{currentStep.question}</h2>
              <p className="text-xs text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{currentStep.subtitle}</p>
            </div>

            {/* Options */}
            <div className="space-y-3" data-testid="quiz-options">
              {currentStep.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left glass-panel p-4 sm:p-5 flex items-center gap-4 hover:border-[rgba(229,197,116,0.3)] transition-all duration-200 group ${
                    answers[currentStep.id] === opt.value ? 'border-[rgba(229,197,116,0.4)]' : ''
                  }`}
                  data-testid={`quiz-option-${opt.value}`}
                >
                  {opt.icon && (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                      <opt.icon size={18} className="text-[var(--blx-gold-3)]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-xs font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{opt.label}</div>
                    <div className="text-[0.6875rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{opt.desc}</div>
                  </div>
                  <ChevronRight size={16} className="text-[var(--blx-muted)] group-hover:text-[var(--blx-gold-3)] transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ─── Results ─── */
          <div data-testid="quiz-result-container">
            <div className="text-center mb-8">
              <CheckCircle2 size={32} className="mx-auto text-[var(--blx-gold-3)] mb-3" />
              <h2 className="text-lg font-bold tracking-wider mb-2">Your Recommendation</h2>
              <p className="text-xs text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>
                Based on your project requirements, here's our technology recommendation.
              </p>
            </div>

            {/* Primary Recommendation */}
            <div className="glass-panel p-6 sm:p-8 mb-4" style={{ borderColor: 'rgba(229,197,116,0.25)' }} data-testid="quiz-primary-result">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">RECOMMENDED TECHNOLOGY</div>
              <h3 className="text-xl font-bold tracking-wider mb-1">{rec.primary.name}</h3>
              <div className="text-sm text-[var(--blx-gold-3)] mb-4">Pixel Pitch: {rec.primary.pitch}</div>

              {leadGated ? (
                /* Lead Gate */
                <div data-testid="quiz-lead-gate">
                  <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-lg" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.12)' }}>
                    <Lock size={14} className="text-[var(--blx-gold-3)]" />
                    <span className="text-xs text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>Enter your details to unlock the full recommendation with reasoning, alternatives, and downloadable spec pack.</span>
                  </div>
                  <form onSubmit={handleUnlock} className="space-y-3" data-testid="quiz-unlock-form">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="input-luxury w-full" placeholder="Full name *" data-testid="quiz-field-name" />
                      <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="input-luxury w-full" placeholder="Work email *" data-testid="quiz-field-email" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input type="text" value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} className="input-luxury w-full" placeholder="Company *" data-testid="quiz-field-company" />
                      <select value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} className="input-luxury w-full" data-testid="quiz-field-role">
                        <option value="">Your role *</option>
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="AV Consultant">AV Consultant</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {error && <p className="text-red-400 text-xs" data-testid="quiz-form-error">{error}</p>}
                    <button type="submit" disabled={submitting} className={`btn-gold w-full px-6 py-3.5 text-xs font-bold tracking-[0.15em] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`} data-testid="quiz-unlock-button">
                      {submitting ? 'Unlocking...' : 'Unlock Full Recommendation'}
                    </button>
                  </form>
                </div>
              ) : (
                /* Unlocked Result */
                <div data-testid="quiz-unlocked-result">
                  {/* Reasoning */}
                  <div className="space-y-2 mb-6">
                    {reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{r}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Link to={rec.primary.path} className="btn-gold px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="quiz-tech-link">
                      View {rec.primary.name} Guide <ArrowRight size={12} />
                    </Link>
                    {rec.primary.caseStudy && (
                      <Link to={rec.primary.caseStudy} className="btn-glass px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="quiz-case-link">
                        See Case Study <ArrowRight size={12} />
                      </Link>
                    )}
                    <Link to="/design-assist" className="btn-glass px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="quiz-da-link">
                      Request Design Assist <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Alternatives (always visible) */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[rec.secondary, rec.tertiary].map((alt, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`quiz-alt-${i}`}>
                  <div className="text-[0.45rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1">ALTERNATIVE {i + 1}</div>
                  <div className="text-xs font-bold tracking-wider mb-0.5">{alt.name}</div>
                  <div className="text-[0.6875rem] text-[var(--blx-gold-3)]">Pitch: {alt.pitch}</div>
                  {!leadGated && (
                    <Link to={alt.path} className="inline-flex items-center gap-1 mt-2 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] hover:gap-2 transition-all">
                      View Guide <ArrowRight size={10} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Restart */}
            <div className="text-center">
              <button onClick={handleRestart} className="text-xs text-[var(--blx-muted)] hover:text-[var(--blx-text-2)] transition-colors" data-testid="quiz-restart-button">
                Start Over with Different Requirements
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
