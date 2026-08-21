import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Globe2 } from 'lucide-react';
import SEO from '../components/SEO';
import { ARABIC_PAGE_BY_PATH } from '../data/arabicLandingPages';

const ArabicLandingPage = () => {
  const { pathname } = useLocation();
  const page = ARABIC_PAGE_BY_PATH[pathname === '/ar-ae' ? '/ar-ae/' : pathname];

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    return () => {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, []);

  if (!page) return null;

  const alternates = page.englishPath ? [{ hrefLang: 'en-AE', path: page.englishPath }, { hrefLang: 'x-default', path: page.englishPath }] : [];
  const faqs = page.faq.map(([question, answer]) => ({ question, answer }));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    inLanguage: 'ar-AE',
    url: `https://brightluxx.com${page.path}`,
    isPartOf: { '@type': 'WebSite', name: 'Brightluxx', url: 'https://brightluxx.com' }
  };

  return (
    <div className="arabic-landing min-h-screen bg-[#050508] text-white" dir="rtl" data-testid="arabic-landing-page">
      <SEO title={page.title} description={page.description} path={page.path} image={page.heroImage} keywords="شاشات LED, جدار فيديو, لافتات رقمية, الإمارات, دبي" locale="ar_AE" alternates={alternates} jsonLd={schema} faqs={faqs} />
      <section className="relative overflow-hidden border-b border-white/10" data-testid="arabic-hero-section">
        <img src={page.heroImage} alt="حلول شاشات LED من Brightluxx" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#050508] via-[#050508]/85 to-[#050508]/55" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-cyan-300" data-testid="arabic-page-eyebrow">{page.eyebrow}</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl" data-testid="arabic-page-heading">{page.h1}</h1>
            <p className="max-w-2xl text-base leading-8 text-white/80 md:text-lg" data-testid="arabic-page-introduction">{page.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={page.primaryLink} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-cyan-300" data-testid="arabic-primary-cta">
                {page.primaryLabel} <ArrowLeft size={17} aria-hidden="true" />
              </Link>
              <Link to={page.secondaryLink} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-300 hover:text-cyan-200" data-testid="arabic-secondary-cta">
                {page.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24" data-testid="arabic-content-sections">
        <div className="grid gap-14 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="border-t border-cyan-300/35 pt-6" data-testid={`arabic-section-${section.title}`}>
              <h2 className="mb-5 text-2xl font-bold leading-relaxed text-white md:text-3xl">{section.title}</h2>
              <p className="mb-7 text-sm leading-8 text-white/70 md:text-base">{section.text}</p>
              <ul className="space-y-4">
                {section.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/85"><CheckCircle2 className="mt-1 shrink-0 text-cyan-300" size={18} aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]" data-testid="arabic-faq-section">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-20">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-cyan-300">أسئلة شائعة</p>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">أسئلة تساعد على بدء القرار</h2>
          <div className="space-y-6">
            {page.faq.map(([question, answer], index) => <div key={question} className="border-b border-white/10 pb-6" data-testid={`arabic-faq-${index}`}><h3 className="mb-3 text-lg font-bold leading-relaxed">{question}</h3><p className="text-sm leading-8 text-white/70">{answer}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20" data-testid="arabic-language-navigation">
        <div className="flex flex-col justify-between gap-6 border-r-2 border-cyan-300 pr-6 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-bold">هل تفضل التصفح باللغة الإنجليزية؟</h2><p className="mt-2 text-sm text-white/65">تتوفر تفاصيل إضافية عن المنتجات والحلول على الموقع باللغة الإنجليزية.</p></div>
          <Link to={page.englishPath || '/'} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100" data-testid="arabic-language-switch-link"><Globe2 size={18} aria-hidden="true" /> English website</Link>
        </div>
      </section>
    </div>
  );
};

export default ArabicLandingPage;