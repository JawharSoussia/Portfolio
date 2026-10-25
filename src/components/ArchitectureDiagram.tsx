import React from 'react';

interface ArchitectureDiagramProps {
  type: 'studyos' | 'vulnweb' | 'water' | 'fullstack';
  compact?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ type, compact = false }) => {
  if (type === 'studyos') {
    return (
      <div className={`w-full overflow-hidden rounded-xl bg-zinc-950 text-zinc-100 ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-[11px] font-mono text-zinc-400">
          <span>System Topology · StudyOS Multi-Agent RAG</span>
          <span className="tabular-nums text-blue-400">Relevance ≥ 70%</span>
        </div>
        <svg
          viewBox="0 0 680 210"
          className="w-full h-auto"
          role="img"
          aria-label="StudyOS Multi-Agent AI Architecture Diagram showing PDF ingestion into ChromaDB, LangGraph RAG verification, CrewAI agents, LoRA LLM, and FastAPI MLflow deployment"
        >
          <defs>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-zinc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717a" />
            </marker>
          </defs>

          {/* Subtle background grid */}
          <pattern id="grid-studyos" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#18181b" strokeWidth="1" />
          </pattern>
          <rect width="680" height="210" fill="url(#grid-studyos)" />

          {/* Node 1: Course PDFs -> ChromaDB */}
          <rect x="14" y="24" width="136" height="72" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="26" y="46" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">01 · INGESTION</text>
          <text x="26" y="65" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">10–30 Course PDFs</text>
          <text x="26" y="82" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">bge-small → ChromaDB</text>

          {/* Node 1B: LoRA Fine-Tuned Weights */}
          <rect x="14" y="116" width="136" height="72" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="26" y="138" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">FINE-TUNING</text>
          <text x="26" y="157" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">LoRA / PEFT LLM</text>
          <text x="26" y="174" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">Mistral-7B · 200+ Q&amp;A</text>

          {/* Connector 1 -> 2 */}
          <line x1="150" y1="60" x2="188" y2="85" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
          <line x1="150" y1="152" x2="188" y2="122" stroke="#71717a" strokeWidth="1.4" markerEnd="url(#arrow-zinc)" />

          {/* Node 2: Stateful LangGraph */}
          <rect x="194" y="48" width="154" height="114" rx="10" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          <text x="208" y="72" fill="#60a5fa" fontSize="10" fontFamily="JetBrains Mono, monospace">02 · STATEFUL GRAPH</text>
          <text x="208" y="93" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">LangGraph Verifier</text>
          <text x="208" y="112" fill="#cbd5e1" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Retrieval Grading</text>
          <text x="208" y="128" fill="#cbd5e1" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Citation Enforcement</text>
          <text x="208" y="147" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">PyTorch MLP Classifier</text>

          {/* Connector 2 -> 3 */}
          <line x1="348" y1="105" x2="386" y2="105" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

          {/* Node 3: CrewAI Multi-Agent */}
          <rect x="392" y="48" width="132" height="114" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="405" y="72" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">03 · MULTI-AGENT</text>
          <text x="405" y="93" fill="#fafafa" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">CrewAI + AutoGen</text>
          <text x="405" y="112" fill="#a1a1aa" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Study Plan Agent</text>
          <text x="405" y="128" fill="#a1a1aa" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">10-QCM Quiz Agent</text>
          <text x="405" y="147" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">RAG Tool Calling</text>

          {/* Connector 3 -> 4 */}
          <line x1="524" y1="84" x2="554" y2="64" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
          <line x1="524" y1="126" x2="554" y2="146" stroke="#71717a" strokeWidth="1.4" markerEnd="url(#arrow-zinc)" />

          {/* Node 4A: FastAPI + Streamlit */}
          <rect x="560" y="24" width="106" height="72" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="572" y="46" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">SERVING</text>
          <text x="572" y="65" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">FastAPI + UI</text>
          <text x="572" y="82" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">Streamlit App</text>

          {/* Node 4B: MLflow + Docker */}
          <rect x="560" y="116" width="106" height="72" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="572" y="138" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">MLOPS</text>
          <text x="572" y="157" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">MLflow · CI/CD</text>
          <text x="572" y="174" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">Docker Compose</text>
        </svg>
      </div>
    );
  }

  if (type === 'vulnweb') {
    return (
      <div className={`w-full overflow-hidden rounded-xl bg-zinc-950 text-zinc-100 ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-[11px] font-mono text-zinc-400">
          <span>System Topology · VulNweb Threat Detection</span>
          <span className="tabular-nums text-blue-400">+15% Accuracy · -10% FP</span>
        </div>
        <svg
          viewBox="0 0 640 175"
          className="w-full h-auto"
          role="img"
          aria-label="VulNweb Real-Time Cyber Threat Architecture showing Chrome Extension, FastAPI REST API, XGBoost plus Heuristic Fusion, and Azure App Service deployment"
        >
          <defs>
            <marker id="arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
            </marker>
          </defs>
          <rect width="640" height="175" fill="#09090b" />
          <rect x="16" y="34" width="168" height="106" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="30" y="58" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">01 · BROWSER EDGE</text>
          <text x="30" y="80" fill="#fafafa" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Chrome Extension</text>
          <text x="30" y="100" fill="#a1a1aa" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Live URL &amp; DOM Capture</text>
          <text x="30" y="120" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">Validated on 3 Browsers</text>

          <line x1="184" y1="87" x2="226" y2="87" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-v)" />

          <rect x="232" y="26" width="184" height="122" rx="10" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          <text x="248" y="50" fill="#60a5fa" fontSize="10" fontFamily="JetBrains Mono, monospace">02 · AGENTIC FUSION</text>
          <text x="248" y="72" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">XGBoost + Heuristics</text>
          <text x="248" y="93" fill="#cbd5e1" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Lexical URL Scoring</text>
          <text x="248" y="110" fill="#cbd5e1" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Anomaly &amp; Threat Intel</text>
          <text x="248" y="131" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">200+ Benchmark URLs</text>

          <line x1="416" y1="87" x2="458" y2="87" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-v)" />

          <rect x="464" y="34" width="160" height="106" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="478" y="58" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">03 · CLOUD RUNTIME</text>
          <text x="478" y="80" fill="#fafafa" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">FastAPI on Azure</text>
          <text x="478" y="100" fill="#a1a1aa" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">Azure App Service</text>
          <text x="478" y="120" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">Docker · CI/CD Pipeline</text>
        </svg>
      </div>
    );
  }

  if (type === 'water') {
    return (
      <div className={`w-full overflow-hidden rounded-xl bg-zinc-950 text-zinc-100 ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-[11px] font-mono text-zinc-400">
          <span>System Topology · Streaming Water ETL/ELT</span>
          <span className="tabular-nums text-blue-400">-40% Stream Latency</span>
        </div>
        <svg
          viewBox="0 0 640 175"
          className="w-full h-auto"
          role="img"
          aria-label="Water and Agriculture Streaming Pipeline showing 5+ Satellite and Weather APIs, Apache Kafka and MinIO, Apache Airflow dbt PostgreSQL, and Real-Time Analytics"
        >
          <defs>
            <marker id="arrow-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
            </marker>
          </defs>
          <rect width="640" height="175" fill="#09090b" />
          <rect x="14" y="34" width="138" height="106" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="26" y="58" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">01 · SOURCES</text>
          <text x="26" y="80" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">5+ External Feeds</text>
          <text x="26" y="100" fill="#a1a1aa" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Satellite Telemetry</text>
          <text x="26" y="118" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">Weather &amp; Soil APIs</text>

          <line x1="152" y1="87" x2="180" y2="87" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-w)" />

          <rect x="186" y="28" width="142" height="118" rx="10" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          <text x="198" y="52" fill="#60a5fa" fontSize="10" fontFamily="JetBrains Mono, monospace">02 · STREAMING</text>
          <text x="198" y="74" fill="#ffffff" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Apache Kafka</text>
          <text x="198" y="94" fill="#cbd5e1" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Event Broker + MinIO</text>
          <text x="198" y="112" fill="#cbd5e1" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Raw Object Lake</text>
          <text x="198" y="131" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">-40% vs Batch ETL</text>

          <line x1="328" y1="87" x2="356" y2="87" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-w)" />

          <rect x="362" y="34" width="134" height="106" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="374" y="58" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">03 · TRANSFORM</text>
          <text x="374" y="80" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Airflow + dbt</text>
          <text x="374" y="100" fill="#a1a1aa" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">PostgreSQL · Pandas</text>
          <text x="374" y="118" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">Docker on Azure</text>

          <line x1="496" y1="87" x2="522" y2="87" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-w)" />

          <rect x="528" y="34" width="98" height="106" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
          <text x="538" y="58" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">04 · SERVE</text>
          <text x="538" y="80" fill="#fafafa" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Live BI</text>
          <text x="538" y="100" fill="#a1a1aa" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Irrigation</text>
          <text x="538" y="116" fill="#a1a1aa" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Dashboard</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-100 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-[11px] font-mono text-zinc-400">
        <span>System Topology · Modular TypeScript Architecture</span>
        <span className="tabular-nums text-blue-400">Typed State &amp; REST</span>
      </div>
      <svg
        viewBox="0 0 640 150"
        className="w-full h-auto"
        role="img"
        aria-label="Modular TypeScript Client, State & Domain Engine, and Persistence Architecture"
      >
        <defs>
          <marker id="arrow-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
          </marker>
        </defs>
        <rect width="640" height="150" fill="#09090b" />
        <rect x="20" y="28" width="175" height="94" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
        <text x="34" y="52" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">01 · PRESENTATION</text>
        <text x="34" y="74" fill="#fafafa" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Reactive UI Views</text>
        <text x="34" y="95" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">TypeScript · Tailwind</text>

        <line x1="195" y1="75" x2="232" y2="75" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-f)" />

        <rect x="238" y="24" width="175" height="102" rx="10" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
        <text x="252" y="48" fill="#60a5fa" fontSize="10" fontFamily="JetBrains Mono, monospace">02 · DOMAIN CORE</text>
        <text x="252" y="70" fill="#ffffff" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">State &amp; Business Logic</text>
        <text x="252" y="91" fill="#cbd5e1" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">Deterministic Validation</text>
        <text x="252" y="109" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">REST / Rule Evaluators</text>

        <line x1="413" y1="75" x2="450" y2="75" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-f)" />

        <rect x="456" y="28" width="164" height="94" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.2" />
        <text x="470" y="52" fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono, monospace">03 · DATA &amp; OPS</text>
        <text x="470" y="74" fill="#fafafa" fontSize="12.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Structured Storage</text>
        <text x="470" y="95" fill="#a1a1aa" fontSize="10" fontFamily="JetBrains Mono, monospace">GitHub CI · Production</text>
      </svg>
    </div>
  );
};
