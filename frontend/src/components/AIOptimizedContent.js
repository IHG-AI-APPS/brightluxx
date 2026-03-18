/**
 * AI-Optimized Content Components
 * These components are designed to be easily parsed by AI/LLM systems
 * for accurate citations and knowledge extraction.
 */

import React from 'react';
import { Info, CheckCircle, HelpCircle, Lightbulb, MapPin, Calendar, Award } from 'lucide-react';

/**
 * AIFactsBox - Structured facts that AI can easily extract
 * Uses semantic HTML and clear labeling for AI parsing
 */
export const AIFactsBox = ({ 
  title = "Quick Facts",
  facts = [],
  entityName,
  entityType = "Product",
  isDark = true 
}) => {
  const bgColor = isDark ? 'bg-cyan-500/5' : 'bg-cyan-50';
  const borderColor = isDark ? 'border-cyan-500/20' : 'border-cyan-200';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  return (
    <aside 
      className={`${bgColor} border ${borderColor} rounded-lg p-6`}
      aria-label={`${title} about ${entityName}`}
      itemScope
      itemType={`https://schema.org/${entityType}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Info size={18} className="text-cyan-400" />
        <h3 className={`font-bold uppercase tracking-wide text-sm ${textPrimary}`}>
          {title}
        </h3>
      </div>
      
      {entityName && (
        <p className={`${textSecondary} text-sm mb-4`} itemProp="name">
          <strong className={textPrimary}>{entityName}</strong>
        </p>
      )}
      
      <dl className="space-y-3">
        {facts.map((fact, i) => (
          <div key={i} className="flex justify-between items-start gap-4">
            <dt className={`${textSecondary} text-sm`}>{fact.label}</dt>
            <dd className={`${textPrimary} text-sm font-medium text-right`} itemProp={fact.itemProp}>
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};

/**
 * AIQuickAnswer - Direct answer format for voice search & AI extraction
 * Provides a clear, concise answer that AI can quote directly
 */
export const AIQuickAnswer = ({
  question,
  answer,
  source,
  isDark = true
}) => {
  const bgColor = isDark ? 'bg-white/[0.02]' : 'bg-neutral-50';
  const borderColor = isDark ? 'border-white/[0.08]' : 'border-neutral-200';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  return (
    <article 
      className={`${bgColor} border ${borderColor} rounded-lg p-6`}
      itemScope 
      itemType="https://schema.org/Question"
    >
      <div className="flex items-start gap-3 mb-3">
        <HelpCircle size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
        <h4 
          className={`${textPrimary} font-medium`}
          itemProp="name"
        >
          {question}
        </h4>
      </div>
      
      <div 
        itemScope 
        itemType="https://schema.org/Answer" 
        itemProp="acceptedAnswer"
        className="pl-8"
      >
        <p 
          className={`${textSecondary} text-sm leading-relaxed`}
          itemProp="text"
        >
          {answer}
        </p>
        
        {source && (
          <cite className="text-xs text-cyan-400 mt-2 block not-italic">
            Source: {source}
          </cite>
        )}
      </div>
    </article>
  );
};

/**
 * AICompanyFactSheet - Structured company information for AI Knowledge Panels
 */
export const AICompanyFactSheet = ({ isDark = true }) => {
  const bgColor = isDark ? 'bg-gradient-to-br from-cyan-500/10 to-transparent' : 'bg-gradient-to-br from-cyan-50 to-white';
  const borderColor = isDark ? 'border-cyan-500/20' : 'border-cyan-200';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  const companyFacts = [
    { icon: Calendar, label: "Founded", value: "2005", itemProp: "foundingDate" },
    { icon: MapPin, label: "Headquarters", value: "Dubai, UAE", itemProp: "location" },
    { icon: Award, label: "Specialization", value: "LED Display Solutions", itemProp: "knowsAbout" },
    { icon: CheckCircle, label: "Markets Served", value: "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman", itemProp: "areaServed" },
  ];

  return (
    <aside 
      className={`${bgColor} border ${borderColor} rounded-lg p-8`}
      itemScope 
      itemType="https://schema.org/Organization"
      aria-label="About Brightluxx"
    >
      <h3 className={`font-bold uppercase tracking-wide text-lg mb-6 ${textPrimary}`}>
        <span itemProp="name">Brightluxx</span> — Company Overview
      </h3>
      
      {/* AI-readable summary paragraph */}
      <p className={`${textSecondary} text-sm leading-relaxed mb-6`} itemProp="description">
        Brightluxx is a UAE-based LED display manufacturer and solutions provider, founded in 2005. 
        The company specializes in premium LED video walls, transparent displays, digital signage, 
        and interactive touch screens for retail, corporate, hospitality, and outdoor applications 
        across the Gulf Cooperation Council (GCC) region.
      </p>
      
      <dl className="grid grid-cols-2 gap-4">
        {companyFacts.map((fact, i) => (
          <div key={i} className="flex items-start gap-3">
            <fact.icon size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <dt className={`text-xs ${textSecondary} uppercase tracking-wider`}>{fact.label}</dt>
              <dd className={`text-sm ${textPrimary} font-medium`} itemProp={fact.itemProp}>
                {fact.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
      
      {/* Hidden but machine-readable data */}
      <meta itemProp="url" content="https://brightluxx.com" />
      <meta itemProp="telephone" content="+971-55-995-4274" />
      <meta itemProp="email" content="info@brightluxx.com" />
    </aside>
  );
};

/**
 * AIProductSummary - Concise product summary for AI extraction
 */
export const AIProductSummary = ({
  name,
  category,
  tagline,
  keyFeatures = [],
  priceRange,
  availability = "Available",
  isDark = true
}) => {
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  return (
    <div 
      className="sr-only"
      itemScope 
      itemType="https://schema.org/Product"
      aria-hidden="true"
    >
      {/* Machine-readable product summary - hidden visually but available to AI */}
      <h1 itemProp="name">{name}</h1>
      <p itemProp="description">
        {name} is a {category} LED display by Brightluxx. {tagline}. 
        Key features include: {keyFeatures.join(', ')}. 
        {priceRange && `Price range: ${priceRange}.`} 
        Currently {availability.toLowerCase()}.
      </p>
      <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
        <meta itemProp="name" content="Brightluxx" />
      </span>
      <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="availability" content={`https://schema.org/${availability === 'Available' ? 'InStock' : 'OutOfStock'}`} />
        <meta itemProp="priceCurrency" content="AED" />
      </span>
    </div>
  );
};

/**
 * VoiceSearchFAQ - Conversational FAQ format optimized for voice search
 */
export const VoiceSearchFAQ = ({
  faqs = [],
  productName,
  isDark = true
}) => {
  const bgColor = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const borderColor = isDark ? 'border-white/[0.08]' : 'border-neutral-200';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  // Convert FAQs to voice-search friendly format
  const voiceFriendlyFAQs = faqs.map(faq => ({
    ...faq,
    // Prepend conversational phrases
    voiceQuestion: faq.question.startsWith('What') || faq.question.startsWith('How') || faq.question.startsWith('Why')
      ? faq.question
      : `What is ${faq.question.toLowerCase()}`,
    // Make answers more conversational
    voiceAnswer: faq.answer
  }));

  return (
    <section 
      className={`${bgColor} border ${borderColor} rounded-lg p-6`}
      aria-label={`Frequently asked questions about ${productName}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={18} className="text-cyan-400" />
        <h3 className={`font-bold uppercase tracking-wide text-sm ${textPrimary}`}>
          Common Questions
        </h3>
      </div>
      
      <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
        {voiceFriendlyFAQs.slice(0, 5).map((faq, i) => (
          <article 
            key={i}
            itemScope 
            itemType="https://schema.org/Question"
            itemProp="mainEntity"
          >
            <h4 
              className={`${textPrimary} font-medium mb-2`}
              itemProp="name"
            >
              {faq.voiceQuestion}
            </h4>
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p 
                className={`${textSecondary} text-sm leading-relaxed`}
                itemProp="text"
              >
                {faq.voiceAnswer}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/**
 * AIDefinitionBlock - Clear definitions for technical terms
 * Helps AI understand and explain technical concepts
 */
export const AIDefinitionBlock = ({
  term,
  definition,
  relatedTerms = [],
  isDark = true
}) => {
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  
  return (
    <dl 
      className="mb-4"
      itemScope 
      itemType="https://schema.org/DefinedTerm"
    >
      <dt className={`${textPrimary} font-bold`} itemProp="name">
        {term}
      </dt>
      <dd className={`${textSecondary} text-sm mt-1`} itemProp="description">
        {definition}
      </dd>
      {relatedTerms.length > 0 && (
        <dd className="text-xs text-cyan-400 mt-2">
          Related: {relatedTerms.join(', ')}
        </dd>
      )}
    </dl>
  );
};

export default {
  AIFactsBox,
  AIQuickAnswer,
  AICompanyFactSheet,
  AIProductSummary,
  VoiceSearchFAQ,
  AIDefinitionBlock
};
