import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-zinc-200 p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 border-b border-zinc-200 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
              <span className="tabular-nums">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{project.period}</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance"
            >
              {project.title}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-zinc-600">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study modal"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quantitative Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-zinc-200">
          {project.metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-2xl font-bold font-mono tabular-nums text-zinc-950">
                {metric.value}
              </div>
              <div className="mt-1 text-xs text-zinc-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* System Architecture Diagram */}
        <div className="mt-6">
          <ArchitectureDiagram type={project.diagramType} />
        </div>

        {/* Architectural Pipeline Stages */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-zinc-200 pt-6">
          {project.architectureNodes.map((node) => (
            <div key={node.stage}>
              <div className="text-xs font-mono text-zinc-500 tabular-nums">{node.stage}</div>
              <div className="mt-1 text-sm font-semibold text-zinc-950">{node.title}</div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">{node.detail}</p>
            </div>
          ))}
        </div>

        {/* Problem & Solution */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-200 pt-8">
          <div>
            <h3 className="text-base font-semibold text-zinc-950">Problem Context</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{project.problem}</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-950">Architectural Solution</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {project.architectureOverview}
            </p>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="mt-8 border-t border-zinc-200 pt-8">
          <h3 className="text-base font-semibold text-zinc-950">Implementation &amp; Verified Outcomes</h3>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700">
                <Check className="h-4 w-4 text-blue-600 shrink-0 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unboxed Technical Stack & Repository Action */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-200 pt-6">
          <div>
            <div className="text-xs font-medium text-zinc-500">Technical Stack</div>
            <p className="mt-1 text-xs font-mono text-zinc-800 leading-relaxed">
              {project.stack.join(' · ')}
            </p>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span>View Source on GitHub</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
