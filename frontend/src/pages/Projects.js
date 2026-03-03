import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';
import { MapPin, Maximize2, Building, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SECTORS = [
  { value: '', label: 'All Sectors' },
  { value: 'retail', label: 'Retail' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'events', label: 'Events' },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeSector) params.sector = activeSector;
        const res = await getProjects(params);
        setProjects(res.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeSector]);

  return (
    <div className="py-20" data-testid="projects-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display mb-2" data-testid="projects-page-title">Projects</h1>
          <p className="text-sm text-[var(--blx-text-2)]">Real installations across UAE and MENA.</p>
        </div>

        {/* Sector Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SECTORS.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveSector(s.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors duration-200 ${
                activeSector === s.value
                  ? 'bg-[var(--blx-gold-3)] text-[#0A0A0A] border-[var(--blx-gold-3)]'
                  : 'bg-transparent text-[var(--blx-text-2)] border-[var(--blx-border)] hover:border-[var(--blx-border-2)]'
              }`}
              data-testid="projects-filter-button"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <Building size={48} className="mx-auto text-[var(--blx-muted)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-sm text-[var(--blx-text-2)]">Try a different sector filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="product-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                data-testid="project-case-study-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="category-badge">{project.sector}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-[var(--blx-text-2)] mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {project.location}
                    </span>
                    {project.screen_size && (
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} /> {project.screen_size}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--blx-muted)] line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-display mb-3">Have a project in mind?</h3>
          <Link
            to="/contact"
            className="btn-gold px-8 py-3.5 text-sm inline-flex items-center gap-2"
            data-testid="projects-cta-contact"
          >
            Discuss Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
          data-testid="project-detail-modal"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
              data-testid="project-detail-close"
            >
              <X size={16} />
            </button>

            <img
              src={selectedProject.image_url}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="category-badge">{selectedProject.sector}</span>
                <span className="text-xs text-[var(--blx-muted)]">{selectedProject.location}</span>
              </div>
              <h2 className="text-2xl font-display mb-1">{selectedProject.title}</h2>
              {selectedProject.client_name && (
                <p className="text-sm text-[var(--blx-gold-3)] mb-4">{selectedProject.client_name}</p>
              )}
              <p className="text-sm text-[var(--blx-text-2)] mb-6 leading-relaxed">{selectedProject.description}</p>

              {/* Metrics */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="text-center p-3 bg-[var(--blx-bg-raised)] rounded-xl border border-[var(--blx-border)]">
                      <div className="text-lg font-semibold text-[var(--blx-gold-3)]">{m.value}</div>
                      <div className="text-xs text-[var(--blx-muted)]">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Used */}
              {selectedProject.technologies_used && selectedProject.technologies_used.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--blx-muted)] mb-2">Products Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies_used.map((t, i) => (
                      <span key={i} className="category-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              <a href="/contact" className="btn-gold w-full py-3 text-sm text-center block" data-testid="project-detail-cta">
                Discuss a Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
