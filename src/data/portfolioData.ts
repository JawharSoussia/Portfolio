export enum ProjectCategory {
  ALL = 'All Work',
  AI_AGENTS = 'AI & Agents',
  DATA_ENG = 'Data Engineering',
  CYBERSEC = 'Cybersecurity & ML',
  FULLSTACK = 'Full-Stack & Mobile',
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ArchitectureNode {
  stage: string;
  title: string;
  detail: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  period: string;
  category: ProjectCategory;
  featuredSpan: 'wide' | 'standard';
  summary: string;
  problem: string;
  architectureOverview: string;
  highlights: string[];
  stack: string[];
  metrics: ProjectMetric[];
  diagramType: 'studyos' | 'vulnweb' | 'water' | 'fullstack';
  architectureNodes: ArchitectureNode[];
  githubUrl: string;
  repoName: string;
}

export interface WorkItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  impactMetric: string;
  highlights: string[];
  competencies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  focus: string;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
  metrics: ProjectMetric[];
}

export interface SkillGroup {
  id: string;
  domain: string;
  summary: string;
  skills: string[];
}

export interface GitHubRepoSeed {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
  category: string;
}

export const PROFILE = {
  fullName: 'Jawhar Ben Soussia',
  shortName: 'Jawhar Ben Soussia',
  roles: ['Data Scientist', 'ML & MLOps Engineer', 'AI Agent Developer'],
  kicker: 'Monastir, Tunisia · M.Sc. Data Science & AI Systems Engineering',
  headline: 'Architecting multi-agent AI systems, streaming data pipelines, and real-time threat intelligence.',
  lead: 'Data Scientist and Software Engineer specializing in stateful LangGraph & CrewAI workflows, Retrieval-Augmented Generation, low-latency Kafka ETL pipelines, and production MLOps deployments across FastAPI, Docker, and Azure.',
  email: 'Soussiajawhar2@gmail.com',
  phone: '+216 93 508 293',
  phoneHref: 'tel:+21693508293',
  location: 'Monastir, Tunisia',
  githubUrl: 'https://github.com/JawharSoussia',
  githubHandle: 'github.com/JawharSoussia',
  linkedinUrl: 'https://www.linkedin.com/in/soussia-jawhar/',
  linkedinHandle: 'linkedin.com/in/soussia-jawhar',
  cvPdfPath: '/assets/aistudio/Jawhar_BS_f7164684.pdf',
  avatarPath: '/assets/jawhar_avatar.jpg',
  spokenLanguages: [
    { language: 'Arabic', proficiency: 'Native' },
    { language: 'French', proficiency: 'Fluent' },
    { language: 'English', proficiency: 'Professional' },
  ],
};

export const HERO_METRICS = [
  {
    value: '≥ 70%',
    unit: 'Cited RAG Relevance',
    context: 'Validated across 20 benchmark questions over 10–30 ingested university course PDFs in StudyOS (2026)',
  },
  {
    value: '-40%',
    unit: 'Streaming ETL Latency',
    context: 'Latency reduction vs. batch-only processing across 5+ satellite and weather feeds via Apache Kafka (2026)',
  },
  {
    value: '-20%',
    unit: 'Deployment Cycle Time',
    context: 'Achieved across 3 production full-stack modules and 30+ resolved GitLab issues at TANIT Company (2025)',
  },
  {
    value: '100+',
    unit: 'Students Trained',
    context: 'Delivered across 5+ cybersecurity sessions with 95% satisfaction for CPU ISIMM & IEEE CS (2025–Present)',
  },
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: 'studyos',
    index: '01',
    title: 'StudyOS — Multi-Agent AI Study Assistant',
    subtitle: 'Stateful LangGraph RAG, CrewAI Orchestration & LoRA Fine-Tuned LLMs',
    period: '09/2026 – Present',
    category: ProjectCategory.AI_AGENTS,
    featuredSpan: 'wide',
    summary:
      'End-to-end multi-agent academic intelligence platform ingesting 10–30 course PDFs into ChromaDB for cited retrieval, automated study planning, quiz synthesis, and fine-tuned domain Q&A.',
    problem:
      'University coursework spans dense, multi-chapter PDFs where generic LLMs hallucinate formulas or lose source provenance. Students need grounded citations alongside structured study schedules and self-assessment quizzes.',
    architectureOverview:
      'Combines Hugging Face bge-small dense embeddings in ChromaDB with a stateful LangGraph verification graph to suppress hallucinations, paired with a CrewAI multi-agent team for study plan & 10-QCM quiz generation, LoRA/PEFT fine-tuned TinyLlama/Mistral-7B weights, and MLflow experiment tracking inside a multi-stage Docker Compose stack.',
    highlights: [
      'Architected an end-to-end AI system ingesting 10–30 course PDFs into a ChromaDB vector store (Hugging Face bge-small embeddings) achieving cited RAG responses with ≥ 70% relevance across 20 test questions.',
      'Built a stateful LangGraph workflow with retrieval grading to reduce hallucinations; orchestrated a CrewAI agent team generating personalized study plans and 10-QCM quizzes from student notes via a custom RAG tool.',
      'Fine-tuned open-source LLMs (TinyLlama / Mistral-7B) using LoRA/PEFT on 200+ course Q&A pairs and trained a custom PyTorch intent/topic classifier from scratch (EmbeddingBag + MLP).',
      'Deployed via FastAPI backend and Streamlit UI with MLflow experiment tracking, GitHub Actions CI/CD pipelines, and a reproducible multi-stage Docker Compose stack.',
    ],
    stack: [
      'Python',
      'LangGraph',
      'CrewAI',
      'AutoGen',
      'RAG',
      'ChromaDB',
      'LoRA/PEFT',
      'PyTorch',
      'MLflow',
      'FastAPI',
      'Streamlit',
      'Docker',
    ],
    metrics: [
      { value: '≥ 70%', label: 'Cited RAG relevance (20-question eval)' },
      { value: '200+', label: 'Course Q&A pairs for LoRA/PEFT tuning' },
      { value: '10–30', label: 'Course PDFs indexed per workspace' },
    ],
    diagramType: 'studyos',
    architectureNodes: [
      {
        stage: '01 · Ingestion',
        title: 'PDF Chunking & bge-small',
        detail: '10–30 course PDFs embedded into ChromaDB vector store with page-level metadata.',
      },
      {
        stage: '02 · Stateful RAG',
        title: 'LangGraph Hallucination Guard',
        detail: 'Retrieves, grades relevance (≥ 70%), and enforces grounded inline citations.',
      },
      {
        stage: '03 · Agent Crew',
        title: 'CrewAI + LoRA LLM + PyTorch MLP',
        detail: 'Synthesizes study plans & 10-QCM quizzes; TinyLlama/Mistral-7B tuned on 200+ Q&A.',
      },
      {
        stage: '04 · MLOps Delivery',
        title: 'FastAPI · Streamlit · MLflow',
        detail: 'Tracked experiments, GitHub Actions CI/CD, and multi-stage Docker Compose.',
      },
    ],
    githubUrl: 'https://github.com/JawharSoussia/studyos',
    repoName: 'JawharSoussia/studyos',
  },
  {
    id: 'vulnweb',
    index: '02',
    title: 'VulNweb — Real-Time Cyber Threat Monitoring System',
    subtitle: 'Browser-Native Agentic Threat Detection & XGBoost Heuristic Fusion on Azure',
    period: '01/2026 – 03/2026',
    category: ProjectCategory.CYBERSEC,
    featuredSpan: 'standard',
    summary:
      'Agentic browser security system pairing a cross-browser Chrome extension with a containerized FastAPI + XGBoost inference engine deployed on Azure App Service.',
    problem:
      'Signature-only blocklists miss zero-day phishing URLs and malware distribution endpoints, while aggressive heuristics suffer from high false-positive rates during everyday browsing.',
    architectureOverview:
      'Captures live navigation telemetry inside a lightweight browser extension and scores URLs in real time via a REST-served XGBoost classifier fused with structural anomaly indicators and threat intelligence checks, shipped via Docker + CI/CD to Azure App Service.',
    highlights: [
      'Engineered an agentic threat detection workflow combining a Chrome browser extension with a FastAPI backend serving an XGBoost ML classifier over REST on Azure App Service.',
      'Designed ML + heuristic fusion (lexical URL scoring + structural anomaly indicators), delivering ~15% accuracy gain and 10% fewer false positives across 200+ test URLs.',
      'Validated end-to-end extension compatibility, inference latency, and alert explainability across 3 desktop browsers with automated Docker + GitHub Actions CI/CD.',
    ],
    stack: [
      'AI Agent',
      'Python',
      'XGBoost',
      'FastAPI',
      'Chrome Extension',
      'Azure App Service',
      'Docker',
      'CI/CD',
    ],
    metrics: [
      { value: '+15%', label: 'Detection accuracy gain via heuristic fusion' },
      { value: '-10%', label: 'False positive rate across 200+ URLs' },
      { value: '3 Browsers', label: 'Cross-browser validation coverage' },
    ],
    diagramType: 'vulnweb',
    architectureNodes: [
      {
        stage: '01 · Edge Capture',
        title: 'Browser Extension Telemetry',
        detail: 'Intercepts URL lexical features, DOM signals & certificate indicators across 3 browsers.',
      },
      {
        stage: '02 · Hybrid Scoring',
        title: 'XGBoost + Heuristic Fusion',
        detail: 'Combines ML classification with anomaly scoring (+15% accuracy, -10% false positives).',
      },
      {
        stage: '03 · Cloud Serving',
        title: 'FastAPI on Azure App Service',
        detail: 'Containerized Docker microservice with automated GitHub Actions CI/CD deployment.',
      },
    ],
    githubUrl: 'https://github.com/JawharSoussia/VulNweb-',
    repoName: 'JawharSoussia/VulNweb-',
  },
  {
    id: 'water-pipeline',
    index: '03',
    title: 'Water & Agriculture Resource Optimization Pipeline',
    subtitle: 'Streaming Satellite & Weather ETL/ELT with Kafka, Airflow, dbt & Azure',
    period: '12/2025 – 03/2026',
    category: ProjectCategory.DATA_ENG,
    featuredSpan: 'standard',
    summary:
      'End-to-end streaming and batch data platform ingesting 5+ satellite and meteorological sources to optimize agricultural irrigation and regional water monitoring in Tunisia.',
    problem:
      'Agricultural water allocation in arid regions suffers when satellite evapotranspiration and weather station feeds are processed only in delayed daily batches.',
    architectureOverview:
      'Streams multi-source weather and remote-sensing telemetry through Apache Kafka to cut end-to-end latency by ~40%, landing raw objects in MinIO and transforming analytical marts in PostgreSQL via dbt and Apache Airflow DAGs on Azure.',
    highlights: [
      'Built an end-to-end ETL/ELT pipeline ingesting 5+ satellite and weather APIs; Apache Kafka streaming reduced data processing latency by ~40% compared to batch-only ingestion.',
      'Orchestrated transformations and data quality checks with Apache Airflow, PostgreSQL, dbt, MinIO object storage, and Pandas inside a containerized Azure Docker environment.',
      'Delivered curated regional water-stress and irrigation efficiency metrics to a real-time analytics dashboard for farmers and resource planners.',
    ],
    stack: [
      'Apache Kafka',
      'Apache Airflow',
      'dbt',
      'PostgreSQL',
      'MinIO',
      'Pandas',
      'Azure',
      'Docker',
    ],
    metrics: [
      { value: '-40%', label: 'Processing latency vs. batch-only ETL' },
      { value: '5+ Feeds', label: 'Satellite & weather APIs ingested' },
      { value: 'Real-Time', label: 'Analytics marts via dbt & PostgreSQL' },
    ],
    diagramType: 'water',
    architectureNodes: [
      {
        stage: '01 · Multi-Source Feeds',
        title: '5+ Satellite & Weather APIs',
        detail: 'Continuous telemetry ingestion for soil moisture, precipitation, and reservoir state.',
      },
      {
        stage: '02 · Stream & Lake',
        title: 'Apache Kafka & MinIO',
        detail: 'Event streaming cuts processing latency by ~40% while persisting raw bronze partitions.',
      },
      {
        stage: '03 · Warehouse & BI',
        title: 'Airflow · dbt · PostgreSQL',
        detail: 'Scheduled DAGs model analytical tables powering live water optimization dashboards.',
      },
    ],
    githubUrl: 'https://github.com/JawharSoussia/Water-Resource-Management-System',
    repoName: 'JawharSoussia/Water-Resource-Management-System',
  },
  {
    id: 'cyber-sec-card-game',
    index: '04',
    title: 'CyberSec Tactical Card Game',
    subtitle: 'Interactive Threat-Defense Simulation for Security Education',
    period: '2026',
    category: ProjectCategory.CYBERSEC,
    featuredSpan: 'standard',
    summary:
      'Turn-based TypeScript cybersecurity card battler translating offensive penetration techniques and blue-team mitigations into interactive strategic play for workshop learners.',
    problem:
      'Introductory security workshops often rely on passive slides before students grasp how attack surfaces, patches, and incident response interact dynamically.',
    architectureOverview:
      'TypeScript state-machine engine modeling network assets, attack vectors, cryptographic defenses, and incident mitigation turns for classroom & club training.',
    highlights: [
      'Modeled real-world attack/defense mechanics (SQLi, phishing, firewall rules, cryptographic patching) in a deterministic TypeScript game state engine.',
      'Designed to complement university cybersecurity awareness sessions and CTF onboarding at ISIMM.',
    ],
    stack: ['TypeScript', 'React', 'State Machines', 'Cybersecurity Pedagogy', 'CTF Design'],
    metrics: [
      { value: 'TypeScript', label: 'Deterministic turn-state rule engine' },
      { value: 'Red vs Blue', label: 'Offensive & defensive security mechanics' },
    ],
    diagramType: 'fullstack',
    architectureNodes: [
      {
        stage: '01 · Rule Engine',
        title: 'Typed Threat & Defense Deck',
        detail: 'Encodes vulnerabilities, exploits, and mitigations with deterministic resolution.',
      },
      {
        stage: '02 · Simulation Loop',
        title: 'Interactive Turn Evaluator',
        detail: 'Calculates network posture, incident impact, and countermeasure chains.',
      },
    ],
    githubUrl: 'https://github.com/JawharSoussia/Cyber_Sec_Card_Game',
    repoName: 'JawharSoussia/Cyber_Sec_Card_Game',
  },
  {
    id: 'braintrain-platform',
    index: '05',
    title: 'BrainTrain Academy Administrative Platform',
    subtitle: 'Full-Stack Academic Operations, Scheduling & Enrollment Suite',
    period: '2025',
    category: ProjectCategory.FULLSTACK,
    featuredSpan: 'standard',
    summary:
      'TypeScript full-stack management platform streamlining student enrollments, instructor scheduling, cohort tracking, and administrative reporting for BrainTrain Academy.',
    problem:
      'Manual spreadsheet workflows created bottlenecks across cohort registrations, attendance tracking, and instructor allocation.',
    architectureOverview:
      'Modular TypeScript web application pairing role-scoped administrative views with RESTful persistence and structured relational reporting.',
    highlights: [
      'Centralized student enrollment lifecycle, course cohort scheduling, and administrative reporting inside a unified TypeScript interface.',
      'Structured clean REST endpoints and modular UI views for staff and program coordinators.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'REST APIs', 'SQL'],
    metrics: [
      { value: 'Full-Stack', label: 'End-to-end administrative workflow' },
      { value: 'TypeScript', label: 'Type-safe frontend & API contracts' },
    ],
    diagramType: 'fullstack',
    architectureNodes: [
      {
        stage: '01 · Client Portal',
        title: 'Role-Based Admin Workspace',
        detail: 'Cohort management, enrollment tracking, and schedule views in TypeScript.',
      },
      {
        stage: '02 · Service Layer',
        title: 'REST API & Relational Store',
        detail: 'Validated business rules for student records, sessions, and reporting.',
      },
    ],
    githubUrl:
      'https://github.com/JawharSoussia/plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy',
    repoName: 'JawharSoussia/plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy',
  },
];

export const WORK_EXPERIENCE: WorkItem[] = [
  {
    id: 'tanit',
    role: 'Software Engineering Intern',
    company: 'TANIT Company',
    period: '01/2025 – 06/2025',
    location: 'Monastir, Tunisia',
    impactMetric: '-20% deployment cycle time · 30+ GitLab issues resolved',
    highlights: [
      'Delivered full-stack features across 3 production modules (React, Node.js, and FastAPI) within a 5-person Agile engineering team, reducing deployment cycle time by 20%.',
      'Executed across 15+ technical competencies including REST API design, CI/CD pipeline automation, SQL query optimization, and Scrum ceremonies — resolving 30+ tracked GitLab issues.',
    ],
    competencies: ['React', 'Node.js', 'FastAPI', 'REST APIs', 'CI/CD Pipelines', 'SQL Optimization', 'GitLab', 'Agile / Scrum'],
  },
  {
    id: 'smart-vision',
    role: 'Technical Lead',
    company: 'Ste Smart Vision',
    period: '06/2024 – 09/2024',
    location: 'Tunisia',
    impactMetric: '~30% faster incident response · 2-engineer team leadership',
    highlights: [
      'Led a 2-engineer technical team across network infrastructure and software systems operations.',
      'Standardized deployment and operational runbooks, cutting production incident response time by approximately 30%.',
    ],
    competencies: ['Technical Leadership', 'Network Infrastructure', 'Deployment Standardization', 'Incident Response'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'msc-isimm',
    degree: 'M.Sc. Data Science & Strategic Operations Management',
    institution: 'ISIMM (Higher Institute of Informatics and Mathematics of Monastir)',
    location: 'Monastir, Tunisia',
    period: '09/2025 – Present',
    focus: 'Machine Learning, Agentic AI, Statistical Modeling, MLOps, Big Data Pipelines & Operations Research',
  },
  {
    id: 'bsc-isimm',
    degree: 'B.Sc. Software Engineering & Fundamental Computer Science',
    institution: 'ISIMM (Higher Institute of Informatics and Mathematics of Monastir)',
    location: 'Monastir, Tunisia',
    period: '09/2022 – 06/2025',
    focus: 'Algorithms, Distributed Systems, Databases, Software Architecture, Networks & Security',
  },
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    id: 'cpu-ieee',
    role: 'Cybersecurity Instructor & CTF Organizer',
    organization: 'CPU ISIMM Organization & IEEE Computer Society',
    period: '09/2025 – Present',
    highlights: [
      'Delivered hands-on cybersecurity awareness and offensive/defensive fundamentals training to 100+ university students across 5+ structured sessions, achieving a 95% participant satisfaction rate.',
      'Designed and organized a Capture The Flag competition (10+ custom challenges across cryptography, web exploitation, and forensics) at Polytech Monastir alongside a dedicated IEEE technical workshop (40+ participants).',
      'Co-organized the ISIMM Cyberbot Robotics Competition, coordinating technical operations for 50+ participants and driving +20% year-over-year growth.',
    ],
    metrics: [
      { value: '100+', label: 'Students trained across 5+ sessions' },
      { value: '95%', label: 'Training satisfaction score' },
      { value: '10+ Challenges', label: 'Polytech Monastir CTF authored' },
      { value: '+20% YoY', label: 'Cyberbot Robotics participant growth' },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'ml-ai',
    domain: 'Machine Learning & Agentic AI',
    summary: 'Multi-agent orchestration, grounded RAG pipelines, parameter-efficient LLM fine-tuning, and deep learning.',
    skills: [
      'LangChain',
      'LangGraph',
      'CrewAI',
      'AutoGen',
      'RAG',
      'LLMs',
      'LoRA/PEFT',
      'XGBoost',
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'NLP',
      'Deep Learning',
      'Agentic AI',
    ],
  },
  {
    id: 'data-eng',
    domain: 'Data Engineering & Streaming ETL',
    summary: 'Low-latency event streaming, workflow orchestration, lakehouse storage, and analytical modeling.',
    skills: [
      'Apache Kafka',
      'Apache Airflow',
      'Apache Spark',
      'dbt',
      'PostgreSQL',
      'ChromaDB',
      'MinIO',
      'Pandas',
      'SQL',
      'Data Visualization',
    ],
  },
  {
    id: 'mlops-devops',
    domain: 'MLOps, Cloud & DevOps',
    summary: 'Experiment tracking, reproducible container stacks, automated CI/CD pipelines, and cloud deployment.',
    skills: [
      'MLflow',
      'Docker',
      'GitHub Actions',
      'CI/CD',
      'Azure (App Service)',
      'Git / GitLab',
      'Kubernetes (familiar)',
    ],
  },
  {
    id: 'backend-frontend',
    domain: 'Full-Stack, APIs & Mobile',
    summary: 'High-throughput Python inference APIs, modern reactive web interfaces, and cross-platform mobile apps.',
    skills: [
      'FastAPI',
      'Python',
      'Node.js',
      'Express.js',
      'REST APIs',
      'MongoDB',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Streamlit',
      'React Native',
    ],
  },
  {
    id: 'cybersec',
    domain: 'Cybersecurity & Threat Intelligence',
    summary: 'ML-assisted phishing/malware URL detection, CTF challenge engineering, and network security.',
    skills: [
      'Threat Detection',
      'CTF Design',
      'Cryptography',
      'Network Security',
      'Penetration Testing',
    ],
  },
];

export const INITIAL_GITHUB_REPOS: GitHubRepoSeed[] = [
  {
    id: 1,
    name: 'studyos',
    html_url: 'https://github.com/JawharSoussia/studyos',
    description:
      'Multi-Agent AI Study Assistant built with LangGraph, CrewAI, ChromaDB RAG, LoRA/PEFT LLM fine-tuning, MLflow, and FastAPI.',
    language: 'Jupyter Notebook · Python',
    updated_at: '2026-10-21T15:26:50Z',
    category: 'Agentic AI',
  },
  {
    id: 2,
    name: 'Water-Resource-Management-System',
    html_url: 'https://github.com/JawharSoussia/Water-Resource-Management-System',
    description:
      'End-to-end streaming & batch data pipeline (Kafka, Airflow, dbt, PostgreSQL, MinIO, Azure) optimizing agricultural water resources in Tunisia.',
    language: 'Python',
    updated_at: '2026-10-11T14:14:49Z',
    category: 'Data Engineering',
  },
  {
    id: 3,
    name: 'VulNweb-',
    html_url: 'https://github.com/JawharSoussia/VulNweb-',
    description:
      'Real-Time Cyber Threat Surveillance System pairing a Chrome extension with a FastAPI + XGBoost URL threat classifier on Azure.',
    language: 'Python',
    updated_at: '2026-10-11T13:22:30Z',
    category: 'Cybersecurity & ML',
  },
  {
    id: 4,
    name: 'Voice-Assistant-Prototype-',
    html_url: 'https://github.com/JawharSoussia/Voice-Assistant-Prototype-',
    description:
      'Conversational Python voice assistant prototype integrating speech recognition, intent routing, and automated task execution.',
    language: 'Python',
    updated_at: '2026-05-30T15:35:10Z',
    category: 'AI & Speech',
  },
  {
    id: 5,
    name: 'Cyber_Sec_Card_Game',
    html_url: 'https://github.com/JawharSoussia/Cyber_Sec_Card_Game',
    description:
      'Interactive TypeScript tactical card game modeling offensive security vectors and defensive mitigations for cybersecurity training.',
    language: 'TypeScript',
    updated_at: '2026-05-30T15:30:59Z',
    category: 'Cybersecurity',
  },
  {
    id: 6,
    name: 'Finova-Mobile-App',
    html_url: 'https://github.com/JawharSoussia/Finova-Mobile-App',
    description:
      'Cross-platform personal finance and analytics mobile application built with JavaScript and React Native.',
    language: 'JavaScript',
    updated_at: '2026-03-15T15:22:04Z',
    category: 'Mobile',
  },
  {
    id: 7,
    name: 'plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy',
    html_url:
      'https://github.com/JawharSoussia/plateforme-pour-la-gestion-administrative-de-BrainTrain-Academy',
    description:
      'Full-stack administrative management platform for BrainTrain Academy handling enrollments, cohorts, and scheduling.',
    language: 'TypeScript',
    updated_at: '2025-07-05T12:32:12Z',
    category: 'Full-Stack',
  },
  {
    id: 8,
    name: 'CPU_Blog',
    html_url: 'https://github.com/JawharSoussia/CPU_Blog',
    description:
      'Editorial community blog and event publication platform created for CPU ISIMM student organization.',
    language: 'HTML',
    updated_at: '2025-07-05T11:58:46Z',
    category: 'Community Web',
  },
];
