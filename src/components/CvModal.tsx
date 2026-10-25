import React, { useEffect } from 'react';
import { X, Download, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-full max-w-5xl h-[88vh] rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-200 bg-white">
          <div>
            <h2 id="cv-modal-title" className="text-lg font-bold text-zinc-950">
              Curriculum Vitae — {PROFILE.fullName}
            </h2>
            <p className="text-xs text-zinc-500">
              Data Scientist · ML &amp; MLOps Engineer · AI Agent Developer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.cvPdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open PDF Tab</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.cvPdfPath}
              download="Jawhar_Ben_Soussia_CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Curriculum Vitae preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-100">
          <iframe
            src={PROFILE.cvPdfPath}
            title="Jawhar Ben Soussia Curriculum Vitae PDF"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
