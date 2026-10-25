import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search, RefreshCw } from 'lucide-react';
import { GitHubRepoSeed, INITIAL_GITHUB_REPOS, PROFILE } from '../data/portfolioData';

interface LiveGitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  fork?: boolean;
}

const CURATED_DESCRIPTIONS: Record<string, string> = {
  studyos:
    'Multi-Agent AI Study Assistant built with LangGraph, CrewAI, ChromaDB RAG, LoRA/PEFT LLM fine-tuning, MLflow, and FastAPI.',
  'Water-Resource-Management-System':
    'End-to-end streaming & batch data pipeline (Kafka, Airflow, dbt, PostgreSQL, MinIO, Azure) optimizing agricultural water resources in Tunisia.',
  'VulNweb-':
    'Real-Time Cyber Threat Surveillance System pairing a Chrome extension with a FastAPI + XGBoost URL threat classifier on Azure.',
  'Voice-Assistant-Prototype-':
    'Conversational Python voice assistant prototype integrating speech recognition, intent routing, and automated task execution.',
  Cyber_Sec_Card_Game:
    'Interactive TypeScript tactical card game modeling offensive security vectors and defensive mitigations for cybersecurity training.',
  'Finova-Mobile-App':
    'Cross-platform personal finance and analytics mobile application built with JavaScript and React Native.',
  'plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy':
    'Full-stack administrative management platform for BrainTrain Academy handling enrollments, cohorts, and scheduling.',
  CPU_Blog:
    'Editorial community blog and event publication platform created for CPU ISIMM student organization.',
};

function formatRepoTitle(rawName: string): string {
  if (rawName === 'studyos') return 'StudyOS';
  if (rawName === 'VulNweb-') return 'VulNweb';
  if (rawName === 'CPU_Blog') return 'CPU ISIMM Blog';
  if (rawName === 'plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy') {
    return 'BrainTrain Academy Admin Platform';
  }
  return rawName.replace(/[-_]+/g, ' ').trim();
}

function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '2026';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepoSeed[]>(INITIAL_GITHUB_REPOS);
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [syncNote, setSyncNote] = useState<string>('Synced with github.com/JawharSoussia');

  const syncFromGitHub = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        'https://api.github.com/users/JawharSoussia/repos?sort=updated&per_page=20',
        { headers: { Accept: 'application/vnd.github+json' } }
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const liveData: LiveGitHubRepo[] = await response.json();
      const mapped: GitHubRepoSeed[] = liveData
        .filter((r) => !r.fork && r.name.toLowerCase() !== 'jawharsoussia')
        .map((r) => ({
          id: r.id,
          name: r.name,
          html_url: r.html_url,
          description:
            CURATED_DESCRIPTIONS[r.name] ||
            (r.description ? r.description.replace(/\*\*/g, '') : 'Open-source engineering repository by Jawhar Ben Soussia.'),
          language: r.name === 'studyos' ? 'Python · Jupyter' : r.language || 'Software',
          updated_at: r.updated_at,
          category: 'Open Source',
        }));

      if (mapped.length > 0) {
        setRepos(mapped);
        setSyncNote(`Live data verified (${mapped.length} public repositories)`);
      }
    } catch {
      setSyncNote('Showing verified snapshot from github.com/JawharSoussia');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void syncFromGitHub();
  }, []);

  const languageTabs = ['All', 'Python', 'TypeScript', 'JavaScript', 'HTML'];

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesLang =
        languageFilter === 'All' ||
        repo.language.toLowerCase().includes(languageFilter.toLowerCase());
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        repo.description.toLowerCase().includes(q) ||
        repo.language.toLowerCase().includes(q);
      return matchesLang && matchesSearch;
    });
  }, [repos, languageFilter, searchQuery]);

  return (
    <div className="mt-16 border-t border-zinc-200 pt-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-zinc-500">Open-Source Index · {syncNote}</p>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-950">
            Public GitHub Repositories
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Interactive Language Filter Tabs */}
          <div
            className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1"
            role="tablist"
            aria-label="Filter repositories by primary language"
          >
            {languageTabs.map((lang) => (
              <button
                key={lang}
                type="button"
                role="tab"
                aria-selected={languageFilter === lang}
                onClick={() => setLanguageFilter(lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  languageFilter === lang
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repositories..."
              aria-label="Filter GitHub repositories"
              className="h-9 w-48 sm:w-56 rounded-lg border border-zinc-200 bg-white pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => void syncFromGitHub()}
            disabled={isRefreshing}
            aria-label="Refresh GitHub repositories"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-8 text-center">
          <p className="text-sm text-zinc-600">No repositories match the current filter.</p>
          <button
            type="button"
            onClick={() => {
              setLanguageFilter('All');
              setSearchQuery('');
            }}
            className="mt-3 inline-flex items-center rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 hover:bg-zinc-50/90 transition-colors"
            >
              <div className="min-w-0 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-950 group-hover:text-blue-600 transition-colors">
                    {formatRepoTitle(repo.name)}
                  </span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{repo.language}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-mono tabular-nums text-zinc-500">
                    Updated {formatMonthYear(repo.updated_at)}
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 group-hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
                <span className="font-mono">{repo.name}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-end">
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>Explore full GitHub profile ({PROFILE.githubHandle})</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
