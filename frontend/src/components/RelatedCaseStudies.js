import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * RelatedCaseStudies - Compact, elegant case studies cards for solution pages
 * Fetches and displays case studies that match the current solution's category
 * 
 * @param {string} solutionSlug - Current solution slug to match case studies
 * @param {string} solutionTitle - Current solution title for category matching
 * @param {number} limit - Max number of case studies to show (default: 3)
 */
export default function RelatedCaseStudies({ solutionSlug, solutionTitle, limit = 3 }) {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies`);
        if (res.ok) {
          const data = await res.json();
          const studies = data.case_studies || data || [];
          
          // Match case studies by category, title keywords, technology, or products_used
          const keywords = solutionTitle?.toLowerCase().split(/[\s&]+/) || [];
          const slugLower = solutionSlug?.toLowerCase() || '';
          
          const matched = studies.filter(cs => {
            const category = (cs.category || '').toLowerCase();
            const title = (cs.title || '').toLowerCase();
            const technology = (cs.technology || '').toLowerCase();
            const techId = (cs.tech_id || '').toLowerCase();
            const productsUsed = (cs.products_used || cs.tags || []).map(p => p.toLowerCase()).join(' ');
            
            // Match by:
            // 1. Category containing solution slug or keywords
            // 2. Technology matching
            // 3. Products used containing keywords
            return keywords.some(kw => 
              kw.length > 3 && (
                category.includes(kw) || 
                title.includes(kw) || 
                technology.includes(kw) ||
                productsUsed.includes(kw)
              )
            ) || 
            category.includes(slugLower) || 
            techId.includes(slugLower) ||
            technology.includes(slugLower);
          });
          
          // If no matches, show random featured ones
          const toShow = matched.length > 0 
            ? matched.slice(0, limit) 
            : studies.filter(cs => cs.featured).slice(0, limit);
          
          setCaseStudies(toShow);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseStudies();
  }, [solutionSlug, solutionTitle, limit]);

  // Don't render if no case studies
  if (!loading && caseStudies.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/5" data-testid="related-case-studies">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-cyan-400 text-[10px] font-bold tracking-[0.25em] uppercase block mb-1">
            Real Projects
          </span>
          <h3 className="text-lg font-bold text-white tracking-wide">Related Case Studies</h3>
        </div>
        <Link 
          to="/case-studies" 
          className="text-xs text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-white/5 rounded-lg h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug || cs._id} caseStudy={cs} />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Compact case study card - minimalist design
 */
function CaseStudyCard({ caseStudy }) {
  const image = caseStudy.images?.[0] || caseStudy.hero_image || '';
  
  return (
    <Link
      to={`/case-studies/${caseStudy.slug}`}
      className="group relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] rounded-lg overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
      data-testid={`case-study-card-${caseStudy.slug}`}
    >
      <div className="flex h-32">
        {/* Image - compact left side */}
        {image && (
          <div className="w-28 flex-shrink-0 relative overflow-hidden">
            <img
              src={image}
              alt={caseStudy.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050508]/80" />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          {/* Category badge */}
          <div>
            <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 rounded mb-2">
              {caseStudy.category || 'Project'}
            </span>
            <h4 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {caseStudy.title}
            </h4>
          </div>
          
          {/* Meta */}
          <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2">
            {caseStudy.client && (
              <span className="flex items-center gap-1 truncate">
                <Building2 size={10} />
                {caseStudy.client}
              </span>
            )}
            {caseStudy.location && (
              <span className="flex items-center gap-1 truncate">
                <MapPin size={10} />
                {caseStudy.location}
              </span>
            )}
          </div>
        </div>
        
        {/* Hover arrow indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={14} className="text-cyan-400" />
        </div>
      </div>
    </Link>
  );
}
