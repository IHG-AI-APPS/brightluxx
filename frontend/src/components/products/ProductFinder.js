import React, { useState } from 'react';
import { ArrowRight, MessageCircle, RotateCcw } from 'lucide-react';
import { trackEvent } from '../../lib/tracker';

const STEPS = [
  { id: 'environment', question: 'Where will the display be used?', options: [['indoor', 'Indoor'], ['outdoor', 'Outdoor']] },
  { id: 'application', question: 'What is the main application?', options: [['retail', 'Retail'], ['corporate', 'Corporate'], ['hospitality', 'Hospitality'], ['control-room', 'Control room'], ['advertising', 'Digital advertising'], ['education', 'Education'], ['home-cinema', 'Home cinema'], ['other', 'Other']] },
  { id: 'viewing', question: 'Approximate viewing distance?', options: [['close', 'Close'], ['medium', 'Medium'], ['long', 'Long'], ['unknown', 'Not sure']] },
  { id: 'priority', question: 'What matters most?', options: [['quality', 'Highest image quality'], ['brightness', 'High brightness'], ['transparent', 'Transparent'], ['interactive', 'Interactive'], ['large-format', 'Large format'], ['efficiency', 'Budget efficiency'], ['unknown', 'Not sure']] },
];

const chooseCategory = (answers) => {
  if (answers.priority === 'transparent') return 'transparent';
  if (answers.priority === 'interactive') return 'interactive';
  if (answers.environment === 'outdoor' || answers.priority === 'brightness' || answers.application === 'advertising') return 'outdoor';
  if (answers.application === 'control-room' || answers.priority === 'quality' || answers.viewing === 'close') return 'cob-microled';
  if (answers.application === 'home-cinema') return 'cinema-led';
  if (answers.priority === 'large-format') return 'flexible';
  return answers.environment === 'indoor' ? 'indoor' : 'all-in-one';
};

export const ProductFinder = ({ onApply }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const activeStep = STEPS[step];
  const complete = step === STEPS.length;

  const selectOption = (value) => {
    const next = { ...answers, [activeStep.id]: value };
    setAnswers(next);
    if (step === STEPS.length - 1) {
      setStep(STEPS.length);
      trackEvent('product_finder_completed', { category: chooseCategory(next) });
    } else setStep(step + 1);
  };

  const restart = () => { setAnswers({}); setStep(0); trackEvent('product_finder_started', { restart: true }); };
  const category = complete ? chooseCategory(answers) : null;

  return (
    <section id="product-finder" className="border-y border-white/10 bg-white/[0.03]" data-testid="product-finder">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-cyan-400">Guided selection</p>
        {!complete ? <><h2 className="mt-3 text-2xl font-bold text-white">{activeStep.question}</h2><div className="mt-7 flex flex-wrap gap-3">{activeStep.options.map(([value, label]) => <button key={value} type="button" onClick={() => selectOption(value)} className="min-h-11 border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300 hover:bg-cyan-300/10" data-testid={`product-finder-${activeStep.id}-${value}`}>{label}</button>)}</div><p className="mt-6 text-xs text-white/50">Step {step + 1} of {STEPS.length}</p></> : <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h2 className="text-2xl font-bold text-white">A focused starting point for your brief</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">We’ve selected a relevant product category. Review the results, then speak with an engineer if the site requirements are still developing.</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={() => onApply(category)} className="inline-flex min-h-11 items-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-bold text-black" data-testid="product-finder-view-results">View recommendations <ArrowRight size={16} aria-hidden="true" /></button><a href="/contact" className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-5 py-3 text-sm font-bold text-white hover:border-cyan-300" data-testid="product-finder-engineer-link" onClick={() => trackEvent('talk_to_engineer_clicked', { source: 'product_finder' })}><MessageCircle size={16} aria-hidden="true" /> Talk to an Engineer</a><button type="button" onClick={restart} className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-white/70 hover:text-white" data-testid="product-finder-restart"><RotateCcw size={15} aria-hidden="true" /> Start again</button></div></div>}
      </div>
    </section>
  );
};