import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  EDUCATION,
  HERO_METRICS,
  LEADERSHIP,
  PROFILE,
  PROJECTS,
  PortfolioProject,
  ProjectCategory,
  SKILL_GROUPS,
  WORK_EXPERIENCE,
} from './data/portfolioData';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { GitHubSection } from './components/GitHubSection';
import { Analytics } from '@vercel/analytics/react';

type HeroBlueprintKey = 'studyos' | 'vulnweb' | 'water';

const HERO_BLUEPRINTS: { key: HeroBlueprintKey; label: string; projectId: string }[] = [
  { key: 'studyos', label: 'StudyOS RAG', projectId: 'studyos' },
  { key: 'vulnweb', label: 'VulNweb ML', projectId: 'vulnweb' },
  { key: 'water', label: 'Kafka Water ETL', projectId: 'water-pipeline' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [heroBlueprint, setHeroBlueprint] = useState<HeroBlueprintKey>('studyos');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'brief' | null>(null);

  // Contact Inquiry Composer State
  const [senderName, setSenderName] = useState<string>('');
  const [senderOrg, setSenderOrg] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<string>('Data Science / AI Engineering Role');
  const [messageBody, setMessageBody] = useState<string>('');

  const filteredProjects = useMemo(() => {
    if (activeCategory === ProjectCategory.ALL) return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeHeroProject = useMemo(() => {
    const target = HERO_BLUEPRINTS.find((b) => b.key === heroBlueprint);
    return PROJECTS.find((p) => p.id === target?.projectId) || PROJECTS[0];
  }, [heroBlueprint]);

  const handleCopy = async (text: string, field: 'email' | 'phone' | 'brief') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    } catch {
      // Fallback textarea copy
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    }
  };

  const mapSkillDomainToCategory = (domainId: string): ProjectCategory => {
    switch (domainId) {
      case 'ml-ai':
      case 'mlops-devops':
        return ProjectCategory.AI_AGENTS;
      case 'data-eng':
        return ProjectCategory.DATA_ENG;
      case 'cybersec':
        return ProjectCategory.CYBERSEC;
      case 'backend-frontend':
        return ProjectCategory.FULLSTACK;
      default:
        return ProjectCategory.ALL;
    }
  };

  const composedSubject = `[Portfolio Inquiry] ${inquiryType}${senderOrg ? ` — ${senderOrg}` : ''}`;
  const composedBody = [
    `Hello Jawhar,`,
    ``,
    messageBody.trim() ||
      `I reviewed your engineering portfolio and CV and would like to connect regarding ${inquiryType}.`,
    ``,
    senderName ? `Best regards,\n${senderName}${senderOrg ? ` (${senderOrg})` : ''}` : `Best regards,`,
  ].join('\n');

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    composedSubject
  )}&body=${encodeURIComponent(composedBody)}`;

  const ribbonItems = [
    'Multi-Agent AI Systems',
    'Stateful LangGraph RAG',
    'LoRA / PEFT Fine-Tuning',
    'Apache Kafka Streaming ETL',
    'MLOps & Docker Compose',
    'Real-Time Cyber Threat Detection',
    'FastAPI & Azure Cloud',
  ];

  return (
    <div id="top" className="min-h-screen bg-[#FAFAFA] text-zinc-950">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-[#FAFAFA]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {PROFILE.shortName}
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
          >
            <a
              href="#projects"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
            <a
              href="#capabilities"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#leadership"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Community
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span>Curriculum Vitae</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* SPLIT-SCREEN HERO + FULL-WIDTH KPI STRIP */}
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Typographic Hierarchy & Primary Action */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-zinc-600">
                  {PROFILE.kicker}
                </p>

                <h1 className="mt-4 text-[clamp(2.25rem,3.9vw,3.65rem)] font-bold leading-[1.08] tracking-tight text-zinc-950 text-balance">
                  {PROFILE.headline}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600">
                  {PROFILE.lead}
                </p>
              </div>

              <div className="mt-9 pt-6 border-t border-zinc-200/80">
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#projects"
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Inspect Selected Works
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <FileText className="h-4 w-4 text-zinc-600" aria-hidden="true" />
                    <span>Preview Official CV</span>
                  </button>
                  <a
                    href={PROFILE.cvPdfPath}
                    download="Jawhar_Ben_Soussia_CV.pdf"
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>
                </div>

                {/* Clean unboxed social & identity links */}
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-600">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:text-blue-600 transition-colors"
                  >
                    <span>GitHub ({PROFILE.githubHandle})</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:text-blue-600 transition-colors"
                  >
                    <span>LinkedIn ({PROFILE.linkedinHandle})</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-mono hover:text-blue-600 transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Matching-Height Engineering Monograph & Live Architecture Switcher */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 flex flex-col justify-between">
                {/* Profile Header with Resilient Portrait */}
                <div className="flex items-center gap-4 pb-5 border-b border-zinc-200">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                    {!avatarError ? (
                      <img
                        src={PROFILE.avatarPath}
                        alt="Portrait of Jawhar Ben Soussia"
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarError(true)}
                        className="h-full w-full object-cover object-[52%_30%] scale-125"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 font-display text-xl font-bold text-white">
                        JB
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-950 truncate">
                      {PROFILE.fullName}
                    </h2>
                    <p className="mt-0.5 text-xs text-zinc-600 leading-relaxed">
                      {PROFILE.roles.join(' · ')}
                    </p>
                    <p className="mt-1 text-xs font-mono text-zinc-500">
                      ISIMM Monastir · Open to Engineering Roles
                    </p>
                  </div>
                </div>

                {/* Interactive System Blueprint Previewer */}
                <div className="my-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-zinc-600">
                      Architecture Blueprints
                    </span>
                    <div
                      className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1"
                      role="tablist"
                      aria-label="Preview flagship system blueprints"
                    >
                      {HERO_BLUEPRINTS.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          role="tab"
                          aria-selected={heroBlueprint === item.key}
                          onClick={() => setHeroBlueprint(item.key)}
                          className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                            heroBlueprint === item.key
                              ? 'bg-white text-zinc-950 shadow-xs'
                              : 'text-zinc-600 hover:text-zinc-950'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ArchitectureDiagram type={heroBlueprint} compact />
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-200 text-xs">
                  <span className="text-zinc-600 truncate">
                    {activeHeroProject.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(activeHeroProject)}
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FULL-WIDTH 4-COLUMN QUANTITATIVE PROOF ROW BELOW HERO SPLIT */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            {HERO_METRICS.map((item, idx) => (
              <div
                key={idx}
                className={
                  idx > 0
                    ? 'sm:border-l sm:border-zinc-200 sm:pl-6 first:pl-0'
                    : ''
                }
              >
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums tracking-tight text-zinc-950">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">
                  {item.unit}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                  {item.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SUBTLE EDITORIAL MARQUEE SECTION DIVIDER */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-y border-zinc-200 bg-white py-3.5 select-none"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono text-zinc-500">
            {[...ribbonItems, ...ribbonItems].map((phrase, idx) => (
              <span key={idx} className="inline-flex items-center gap-8 whitespace-nowrap">
                <span>{phrase}</span>
                <span className="text-zinc-300">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* 01. SELECTED ENGINEERING WORKS (DYNAMIC BENTO + GITHUB INDEX) */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-zinc-500">01 · Case Studies &amp; Systems</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                01. Selected Engineering Works
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
                End-to-end systems spanning multi-agent RAG orchestration, browser-native ML threat intelligence, and streaming data engineering. Click any system to inspect its full topology and benchmark metrics.
              </p>
            </div>

            {/* Interactive Category Filter Control */}
            <div
              className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-200/70 p-1 self-start lg:self-auto"
              role="tablist"
              aria-label="Filter engineering case studies by discipline"
            >
              {Object.values(ProjectCategory).map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === category
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Bento Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const isWide =
                project.featuredSpan === 'wide' &&
                (activeCategory === ProjectCategory.ALL ||
                  activeCategory === ProjectCategory.AI_AGENTS);

              return (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect case study: ${project.title}`}
                  className={`group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 transition-colors duration-150 hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  {isWide ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-6 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
                            <span className="tabular-nums">{project.index}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{project.period}</span>
                          </div>

                          <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 group-hover:text-blue-600 transition-colors text-balance">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600">
                            {project.summary}
                          </p>

                          <div className="mt-6 grid grid-cols-3 gap-4 border-y border-zinc-200 py-4">
                            {project.metrics.map((m, i) => (
                              <div key={i}>
                                <div className="font-mono text-lg font-bold tabular-nums text-zinc-950">
                                  {m.value}
                                </div>
                                <div className="mt-0.5 text-xs text-zinc-500 leading-snug">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <p className="text-xs font-mono text-zinc-600 leading-relaxed">
                            {project.stack.join(' · ')}
                          </p>
                          <div className="mt-5 flex items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                              <span>Inspect System Architecture</span>
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
                            >
                              <span>{project.repoName}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <ArchitectureDiagram type={project.diagramType} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
                          <span className="tabular-nums">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{project.period}</span>
                        </div>

                        <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 group-hover:text-blue-600 transition-colors text-balance">
                          {project.title}
                        </h3>

                        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                          {project.summary}
                        </p>

                        {project.diagramType !== 'fullstack' && (
                          <div className="mt-5">
                            <ArchitectureDiagram type={project.diagramType} compact />
                          </div>
                        )}

                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-zinc-200 pt-4">
                          {project.metrics.map((m, i) => (
                            <div key={i}>
                              <div className="font-mono text-base font-bold tabular-nums text-zinc-950">
                                {m.value}
                              </div>
                              <div className="mt-0.5 text-xs text-zinc-500 leading-snug">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 border-t border-zinc-200 pt-4">
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed">
                          {project.stack.join(' · ')}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                            <span>Inspect Case Study</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-950 transition-colors truncate max-w-[220px]"
                          >
                            <span className="truncate">GitHub Source</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Live-Synced GitHub Open-Source Repository Index */}
          <GitHubSection />
        </section>

        {/* 02. WORK EXPERIENCE & ACADEMIC TRAJECTORY */}
        <section id="experience" className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-zinc-500">02 · Industry &amp; Academia</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                02. Experience &amp; Academic Trajectory
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Production software delivery across Agile teams paired with graduate research in Data Science and Strategic Operations Management at ISIMM.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left 7 Columns: Professional Experience */}
              <div className="lg:col-span-7">
                <h3 className="text-sm font-semibold text-zinc-950 pb-4 border-b border-zinc-200">
                  Professional Experience
                </h3>
                <div className="divide-y divide-zinc-200">
                  {WORK_EXPERIENCE.map((job) => (
                    <div key={job.id} className="py-8 first:pt-6 last:pb-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-xl font-bold text-zinc-950">
                          {job.role} <span className="font-normal text-zinc-400">—</span>{' '}
                          <span className="text-zinc-800">{job.company}</span>
                        </h4>
                        <span className="text-xs font-mono tabular-nums text-zinc-500">
                          {job.period} · {job.location}
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-mono text-blue-600">
                        Verified Outcome: {job.impactMetric}
                      </p>

                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-600">
                        {job.highlights.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>

                      <p className="mt-4 text-xs font-mono text-zinc-500">
                        {job.competencies.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Academic Degrees */}
              <div className="lg:col-span-5">
                <h3 className="text-sm font-semibold text-zinc-950 pb-4 border-b border-zinc-200">
                  Academic Degrees
                </h3>
                <div className="divide-y divide-zinc-200">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id} className="py-8 first:pt-6 last:pb-0">
                      <p className="text-xs font-mono tabular-nums text-zinc-500">
                        {edu.period} · {edu.location}
                      </p>
                      <h4 className="mt-2 text-lg font-bold text-zinc-950 text-balance">
                        {edu.degree}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-zinc-700">
                        {edu.institution}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                        Focus: {edu.focus}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Spoken Languages Block */}
                <div className="mt-8 border-t border-zinc-200 pt-8">
                  <h3 className="text-sm font-semibold text-zinc-950">Spoken Languages</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-700">
                    {PROFILE.spokenLanguages.map((item, idx) => (
                      <React.Fragment key={item.language}>
                        {idx > 0 && <span aria-hidden="true" className="text-zinc-400">·</span>}
                        <span>
                          <strong className="font-semibold text-zinc-950">{item.language}</strong>{' '}
                          <span className="text-zinc-500">({item.proficiency})</span>
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03. TECHNICAL CAPABILITIES SPECIFICATION */}
        <section id="capabilities" className="border-t border-zinc-200 bg-[#FAFAFA]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-zinc-500">03 · Engineering Stack</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                03. Technical Capabilities
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Production tooling across agentic LLM frameworks, distributed streaming pipelines, reproducible MLOps, full-stack APIs, and offensive/defensive cybersecurity.
              </p>
            </div>

            <div className="mt-10 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
              {SKILL_GROUPS.map((group, idx) => (
                <div
                  key={group.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 sm:p-7 items-start"
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-zinc-400">
                      <span>0{idx + 1}</span>
                    </div>
                    <h3 className="mt-1 text-base font-bold text-zinc-950">{group.domain}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{group.summary}</p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-sm font-mono leading-relaxed text-zinc-800">
                      {group.skills.join(' · ')}
                    </p>
                  </div>

                  <div className="lg:col-span-2 lg:text-right">
                    <a
                      href="#projects"
                      onClick={() => setActiveCategory(mapSkillDomainToCategory(group.id))}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
                    >
                      <span>Related Works</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04. LEADERSHIP, TEACHING & CYBERSECURITY COMMUNITY */}
        <section id="leadership" className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            {LEADERSHIP.map((item) => (
              <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <p className="text-xs font-mono text-zinc-500">
                    04 · Leadership &amp; Technical Instruction
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                    04. Community &amp; Security Instruction
                  </h2>

                  <div className="mt-6">
                    <div className="text-xs font-mono tabular-nums text-zinc-500">
                      {item.period}
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-zinc-950">
                      {item.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-blue-600">
                      {item.organization}
                    </p>

                    <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-600">
                      {item.highlights.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Claim-to-Proof Adjacent Quantitative Metrics */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8">
                  {item.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="pb-4 border-b border-zinc-200 last:border-b-0 [&:nth-last-child(2)]:border-b-0"
                    >
                      <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-950">
                        {metric.value}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05. DIRECT CONTACT & INQUIRY COMPOSER */}
        <section id="contact" className="border-t border-zinc-200 bg-[#FAFAFA]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Verified Contact Coordinates */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-500">05 · Direct Channels</p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                    05. Initiate an Engineering Conversation
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600">
                    Available for Data Science, Machine Learning / MLOps, and Full-Stack AI Engineering internships, junior roles, and technical collaborations.
                  </p>

                  <div className="mt-8 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
                    {/* Email Row */}
                    <div className="flex items-center justify-between gap-4 p-4 sm:px-5">
                      <div className="min-w-0">
                        <div className="text-xs text-zinc-500">Email</div>
                        <a
                          href={`mailto:${PROFILE.email}`}
                          className="mt-0.5 block font-mono text-sm font-medium text-zinc-950 hover:text-blue-600 truncate"
                        >
                          {PROFILE.email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleCopy(PROFILE.email, 'email')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedField === 'email' ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Phone Row */}
                    <div className="flex items-center justify-between gap-4 p-4 sm:px-5">
                      <div className="min-w-0">
                        <div className="text-xs text-zinc-500">Direct Phone</div>
                        <a
                          href={PROFILE.phoneHref}
                          className="mt-0.5 block font-mono text-sm tabular-nums font-medium text-zinc-950 hover:text-blue-600"
                        >
                          {PROFILE.phone}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleCopy(PROFILE.phone, 'phone')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* LinkedIn Row */}
                    <a
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-4 sm:px-5 hover:bg-zinc-50 transition-colors"
                    >
                      <div>
                        <div className="text-xs text-zinc-500">LinkedIn</div>
                        <div className="mt-0.5 text-sm font-medium text-zinc-950">
                          {PROFILE.linkedinHandle}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 shrink-0" aria-hidden="true" />
                    </a>

                    {/* GitHub Row */}
                    <a
                      href={PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-4 sm:px-5 hover:bg-zinc-50 transition-colors"
                    >
                      <div>
                        <div className="text-xs text-zinc-500">GitHub</div>
                        <div className="mt-0.5 text-sm font-medium text-zinc-950">
                          {PROFILE.githubHandle}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Based in {PROFILE.location} · Remote &amp; Relocation Ready</span>
                </div>
              </div>

              {/* Right Column: Structured Direct Inquiry Composer */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = mailtoHref;
                  }}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
                >
                  <h3 className="text-lg font-bold text-zinc-950">Compose Direct Inquiry</h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    Formats a structured message directly to {PROFILE.email} or copies the brief to your clipboard.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-xs font-medium text-zinc-700 mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="h-10 w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sender-org"
                        className="block text-xs font-medium text-zinc-700 mb-1.5"
                      >
                        Company or Institution
                      </label>
                      <input
                        id="sender-org"
                        type="text"
                        value={senderOrg}
                        onChange={(e) => setSenderOrg(e.target.value)}
                        placeholder="Engineering Team"
                        className="h-10 w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="inquiry-scope"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Topic
                    </label>
                    <select
                      id="inquiry-scope"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="h-10 w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 text-sm text-zinc-950 focus:border-blue-600 focus:bg-white focus:outline-none"
                    >
                      <option value="Data Science / AI Engineering Role">
                        Data Science / AI Engineering Role
                      </option>
                      <option value="ML & MLOps Engineering Internship / Position">
                        ML &amp; MLOps Engineering Internship / Position
                      </option>
                      <option value="Multi-Agent RAG or Data Pipeline Collaboration">
                        Multi-Agent RAG or Data Pipeline Collaboration
                      </option>
                      <option value="Cybersecurity Workshop / CTF Speaking">
                        Cybersecurity Workshop / CTF Speaking
                      </option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Project or Role Details
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      placeholder="Share role scope, timeline, or technical stack..."
                      className="w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] p-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Send via Email Client</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleCopy(
                            `To: ${PROFILE.email}\nSubject: ${composedSubject}\n\n${composedBody}`,
                            'brief'
                          )
                        }
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 text-xs font-medium text-zinc-800 hover:bg-zinc-100 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedField === 'brief' ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                            <span>Inquiry Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy Inquiry Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={PROFILE.cvPdfPath}
                      download="Jawhar_Ben_Soussia_CV.pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors whitespace-nowrap"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Download CV (PDF)</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-6 py-8 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PROFILE.fullName}. Monastir, Tunisia.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="hover:text-zinc-950 transition-colors"
            >
              Preview CV
            </button>
            <a
              href={PROFILE.cvPdfPath}
              download="Jawhar_Ben_Soussia_CV.pdf"
              className="hover:text-zinc-950 transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </footer>

      {/* CASE STUDY LIGHTBOX MODAL */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* EMBEDDED CURRICULUM VITAE PDF MODAL */}
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />

      {/* VERCEL WEB ANALYTICS */}
      <Analytics />
    </div>
  );
}
