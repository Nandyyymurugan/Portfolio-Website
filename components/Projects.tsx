"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/constants";

interface FeatureCard {
  icon: string;
  title: string;
  tag?: string;
  description: string;
}

interface ArchitectureTier {
  tier: string;
  title: string;
  desc: string;
  icon: string;
  badge: string;
}

interface ArchitectureData {
  summary: string;
  tiers: ArchitectureTier[];
  branches?: {
    title: string;
    items: { name: string; icon: string; sub?: string }[];
  };
  asciiDiagram: string;
}

interface ProblemSolution {
  problem: string;
  solution: string;
}

interface ProjectDetail extends Project {
  flagship?: boolean;
  tags: string[];
  archNodes: string[];
  stackBreakdown: [string, string[]][];
  overviewList?: string[];
  problemSolution?: ProblemSolution;
  featureCards?: FeatureCard[];
  architectureData?: ArchitectureData;
}

const ENRICHED_PROJECTS: ProjectDetail[] = [
  {
    ...PROJECTS[3], // EduNavigator
    flagship: true,
    tags: ["Flagship Project", "Final Year Project", "AI & Analytics", "10,000+ Questions", "Flask & SQLite"],
    archNodes: [
      "Admin & Assessment Dashboard",
      "Python / Flask REST API",
      "Syllabus Overlap & AI Analytics Engine",
      "SQLite Database (10,000+ Questions)",
      "Unified Career & Exam Portal",
    ],
    overviewList: [
      "Architected a full-stack platform managing a 10,000+ authenticated question repository across 14+ competitive exam sectors and school tracks.",
      "Engineered a custom Syllabus Overlap Engine identifying cross-exam synergies to maximize student selection ratios.",
      "Built an end-to-end IT Placement Training Hub covering 12 MNCs with 4-stage recruitment workflows and realistic assessments.",
      "Integrated Three.js gamified 3D roadmaps and real-time timed exam simulators with performance telemetry.",
    ],
    featureCards: [
      {
        icon: "📊",
        title: "Cross-Exam Syllabus Overlap Engine",
        tag: "14+ Sectors Compatibility",
        description:
          "Algorithmic overlap mapper that computes exact percentage compatibility across 14+ sectors (TNPSC, UPSC, SSC, Banking, RRB). Recommends parallel exam opportunities to save 100+ hours of redundant preparation.",
      },
      {
        icon: "🏢",
        title: "IT Placement Hub & 4-Stage Arena",
        tag: "12 Top Tech Giants",
        description:
          "Complete recruitment pipeline simulator for 12 top tech giants (TCS, Infosys, Zoho, Amazon, etc.) featuring student-friendly company dossiers, step-by-step solved rounds, and stage-wise mock tests.",
      },
      {
        icon: "⏱️",
        title: "10,000+ Q-Bank & Timed Simulator",
        tag: "Authentic Negative Marking",
        description:
          "Comprehensive question bank across school STEM and competitive sectors with authentic negative marking, sectional timers, instant score analytics, and step-by-step logic breakdowns.",
      },
      {
        icon: "🗺️",
        title: "3D Adventure Roadmap & AI Guidance",
        tag: "Three.js Gamification",
        description:
          "Interactive Three.js/Canvas gamified milestone roadmap with 30-day preparation phases, topic mastery trackers, and contextual in-page AI assistance for automated doubts resolution.",
      },
    ],
    stackBreakdown: [
      [
        "Frontend / Graphics",
        ["HTML5", "CSS3 (Glassmorphism)", "JavaScript", "Three.js / 3D Canvas"],
      ],
      [
        "Data & Algorithms",
        ["Jaccard Overlap Matrix", "Relational SQLite", "Timed Assessment Engine"],
      ],
      [
        "Backend Architecture",
        ["Python", "Flask REST API", "Modular Blueprints", "Session Security"],
      ],
    ],
    architectureData: {
      summary:
        "Multi-tiered pipeline connecting administrative authoring tools, RESTful API controllers, Jaccard overlap analytics, authenticated SQLite persistence, and a unified student delivery portal with 5 specialized sector hubs.",
      tiers: [
        {
          tier: "Tier 1",
          title: "Admin & Assessment Dashboard",
          badge: "Control Plane",
          icon: "🖥️",
          desc: "Question authoring, exam configurations, sector metadata controls, and administrative monitoring.",
        },
        {
          tier: "Tier 2",
          title: "Python / Flask REST API",
          badge: "Backend Gateway",
          icon: "🐍",
          desc: "Blueprint routers, session handling, authenticated test submissions, and JSON API endpoints.",
        },
        {
          tier: "Tier 3",
          title: "Syllabus Overlap & AI Analytics Engine",
          badge: "Core Intelligence",
          icon: "🧠",
          desc: "Jaccard similarity matrix computations, cross-exam synergies, and contextual in-page academic guidance.",
        },
        {
          tier: "Tier 4",
          title: "SQLite Database (10,000+ Questions)",
          badge: "Relational Persistence",
          icon: "🗄️",
          desc: "10,000+ authenticated question store across 14+ sectors, schema indexes, and test result telemetry.",
        },
        {
          tier: "Tier 5",
          title: "Unified Career & Exam Portal",
          badge: "Presentation Gateway",
          icon: "🌐",
          desc: "Interactive glassmorphic student client with Three.js gamified roadmaps and live assessment simulation.",
        },
      ],
      branches: {
        title: "Specialized Sector & Preparation Portals",
        items: [
          { name: "School Track", icon: "🎓", sub: "STEM Class 10/12" },
          { name: "Govt Aspirants", icon: "🏛️", sub: "TNPSC, UPSC, SSC" },
          { name: "Banking & RRB", icon: "🏦", sub: "IBPS, SBI & Railways" },
          { name: "IT Placement", icon: "🏢", sub: "12 MNC 4-Stage Arena" },
          { name: "Mock Test Arena", icon: "⚡", sub: "Timed Simulators" },
        ],
      },
      asciiDiagram: `┌──────────────────────────────────────────────┐
│        Admin & Assessment Dashboard          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│            Python / Flask REST API           │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│     Syllabus Overlap & AI Analytics Engine   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│       SQLite Database (10,000+ Questions)    │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│         Unified Career & Exam Portal         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
 [ School Track ]  [ Govt Aspirants ]  [ Banking & RRB ]  [ IT Placement ]  [ Mock Test Arena ]`,
    },
  },
  {
    ...PROJECTS[0], // TeamUp AI
    flagship: false,
    tags: [
      "Personal Project",
      "AI Project Manager",
      "Google Gemini 2.5 Flash",
      "Flask 3.1 & Python 3.13",
      "Zero-Login Magic Links",
    ],
    archNodes: [
      "Browser Client (REST & Jinja2)",
      "Flask Application Server",
      "Google Gemini 2.5 Flash Engine",
      "SQLite Database (teamup.db)",
    ],
    overviewList: [
      "Automated project management and delegation web platform engineered specifically for student squads, hackathons, and agile group initiatives.",
      "Decomposes high-level project topics into equitable, role-specific deliverables using Google Gemini 2.5 Flash structured JSON prompts.",
      "Issues zero-login 'magic links' with 12-character tokenized URLs for frictionless, one-click access without account creation.",
      "Provides the Team Lead with a centralized live command center displaying completion progress and scoped role authorization.",
    ],
    problemSolution: {
      problem:
        "When students or developers collaborate on group projects, manually dividing responsibilities fairly and chasing down updates often leads to unequal workloads and delayed deadlines. Heavy enterprise tools like Jira or Asana introduce unnecessary setup overhead and account creation friction.",
      solution:
        "TeamUp AI enables the Team Lead to create a project in seconds, prompts the LLM to generate optimized task allocations per member, and issues lightweight, zero-login 'magic links' to teammates while providing the Team Lead with a centralized live tracking dashboard.",
    },
    featureCards: [
      {
        icon: "🤖",
        title: "Automated AI Task Decomposition",
        tag: "Gemini 2.5 Flash",
        description:
          "Takes high-level project topics and automatically generates realistic, balanced sub-tasks tailored to each team member based on deadlines.",
      },
      {
        icon: "🔗",
        title: "Zero-Login Magic Links",
        tag: "12-Char Token Security",
        description:
          "Teammates do not need to register or remember passwords. Each member receives a secure, 12-character tokenized URL allowing one-click access to view and toggle their task status.",
      },
      {
        icon: "📊",
        title: "Centralized Team Lead Dashboard",
        tag: "Real-Time Telemetry",
        description:
          "A real-time command center for the project lead featuring an overall progress bar, live completion metrics, and copyable links for individual members.",
      },
      {
        icon: "🛡️",
        title: "Scoped Role Isolation",
        tag: "Granular Authorization",
        description:
          "Prevents accidental data overwrites by ensuring individual team members can only access and update the specific milestone assigned to them.",
      },
      {
        icon: "🎨",
        title: "Modern Glassmorphic SaaS Design",
        tag: "Dark Glassmorphism",
        description:
          "Complete with high-converting marketing views (Landing, Features, How It Works, Pricing) and interactive web app dashboards.",
      },
    ],
    stackBreakdown: [
      [
        "Backend",
        [
          "Python 3.13",
          "Flask 3.1",
          "RESTful APIs",
          "Sessionless Routing",
          "Jinja2 Templates",
        ],
      ],
      [
        "AI & LLM Integration",
        [
          "Google GenAI SDK",
          "Gemini 2.5 Flash Model",
          "Structured JSON Prompting",
          "Automated Task Decomposition",
        ],
      ],
      [
        "Database & ORM",
        [
          "SQLite 3",
          "Flask-SQLAlchemy",
          "Relational Schema Modeling",
          "Query Optimization",
        ],
      ],
      [
        "Frontend",
        [
          "HTML5",
          "Vanilla CSS3 (Glassmorphism)",
          "CSS Grid & Flexbox",
          "Vanilla JavaScript (ES6+ Fetch API)",
          "DOM Manipulation",
        ],
      ],
    ],
    architectureData: {
      summary:
        "Structured pipeline where the browser client interacts via REST APIs & Jinja2 with a Flask application server, orchestrates Google Gemini 2.5 Flash for strict JSON task delegation, and persists state across relational Project and Task entities via Flask-SQLAlchemy.",
      tiers: [
        {
          tier: "Tier 1",
          title: "Browser Client",
          badge: "REST & Jinja2 Views",
          icon: "🌐",
          desc: "Responsive glassmorphism UI dispatching asynchronous Fetch API JSON requests and rendering server-side Jinja2 dashboards.",
        },
        {
          tier: "Tier 2",
          title: "Flask Application Server",
          badge: "Python 3.13 / Flask 3.1",
          icon: "🐍",
          desc: "Core routing gateway, sessionless token validation, RESTful API endpoints, and business logic controller.",
        },
        {
          tier: "Tier 3",
          title: "Google Gemini 2.5 Flash",
          badge: "Strict JSON Prompting",
          icon: "🤖",
          desc: "Google GenAI SDK structured LLM integration decomposing high-level project topics into balanced, role-specific member tasks.",
        },
        {
          tier: "Tier 4",
          title: "SQLite Database: teamup.db",
          badge: "Flask-SQLAlchemy ORM",
          icon: "🗄️",
          desc: "Relational persistence store managing Project Entity (8-Char UUID, Topic, Deadline, Lead) and Task Entity (12-Char Secret Key, Member, Done Status).",
        },
      ],
      branches: {
        title: "Relational Schema & Access Control",
        items: [
          { name: "Project Entity", icon: "📁", sub: "8-Char UUID & Deadlines" },
          { name: "Task Entity", icon: "🔑", sub: "12-Char Tokenized Access" },
          { name: "Lead Dashboard", icon: "📊", sub: "Live Completion Metrics" },
          { name: "Member Portal", icon: "⚡", sub: "Zero-Login Magic Links" },
        ],
      },
      asciiDiagram: `[ Browser Client ]
       │  ▲
       │  │ REST (Fetch API / JSON) & Server-Side Jinja2
       ▼  │
[ Flask Application Server ] ── (Strict JSON Prompt) ──▶ [ Google Gemini 2.5 Flash ]
       │  ▲
       │  │ Flask-SQLAlchemy (ORM)
       ▼  │
[ SQLite Database: teamup.db ]
   ├── Project Entity (8-Char UUID, Topic, Deadline, Lead)
   └── Task Entity    (12-Char Secret Key, Member, Done Status)`,
    },
  },
  {
    ...PROJECTS[1], // FixBox
    flagship: false,
    tags: [
      "Full-Stack Platform",
      "COMPLETED",
      "Warranty Health Analytics",
      "Node.js & Express.js",
      "SQLite3 & Multer",
    ],
    archNodes: [
      "Browser / Frontend SPA",
      "Express.js Middleware (Auth Guard & Multer)",
      "Business Logic & Analytics Controllers",
      "SQLite Database (fixbox.sqlite)",
    ],
    overviewList: [
      "Designed and deployed a secure full-stack system featuring token-based authentication with PBKDF2 cryptographic hashing.",
      "Engineered an interactive Warranty Health Analytics engine calculating live protection scores and 30-day expiration urgency.",
      "Implemented nested relational data tracking connecting products with chronological repair histories and maintenance expenditures.",
      "Integrated robust multipart file handling (Multer) for receipt/invoice preservation and instantaneous retrieval.",
    ],
    featureCards: [
      {
        icon: "📦",
        title: "Digital Warranty Vault",
        tag: "Asset Registry",
        description:
          "Secure repository to register gadgets and home appliances with purchase dates, warranty end dates, serial numbers, and support contacts.",
      },
      {
        icon: "📄",
        title: "Invoice & Receipt Preservation",
        tag: "Multer Multipart Storage",
        description:
          "Direct upload of bill photos/PDFs with sanitized, timestamped storage to prevent receipt fading or loss during service claims.",
      },
      {
        icon: "📊",
        title: "Warranty Health & Analytics Engine",
        tag: "Coverage Scoring",
        description:
          "Dynamic percentage metric displaying overall active coverage ratio, paired with a 30-day urgency tracker and visual status badges (Active, Expiring Soon, Expired).",
      },
      {
        icon: "🔧",
        title: "Chronological Repair & Cost Tracker",
        tag: "Expenditure Aggregator",
        description:
          "Nested sub-system per product logging service dates, shop contacts, defect descriptions, and cumulative repair expenses (₹).",
      },
      {
        icon: "🔍",
        title: "Instant Search & Support Directory",
        tag: "Client-Side In-Memory",
        description:
          "Client-side search across product names, categories, and serial notes without reloading, plus a brand-agnostic directory for customer care numbers.",
      },
    ],
    stackBreakdown: [
      ["Core Stack", ["Node.js", "Express.js", "SQLite3"]],
      ["Client Side", ["HTML5", "CSS3", "Vanilla JS"]],
      ["Database & Storage", ["SQLite3", "Multer", "Local File Storage"]],
      [
        "Security & Utilities",
        ["PBKDF2 Hashing", "Bearer Token Auth", "CORS", "Crypto"],
      ],
      [
        "Features",
        [
          "Role Authentication",
          "PDF/Bill Uploads",
          "Health Analytics",
          "Repair Logs",
          "Expiry Tracker",
        ],
      ],
    ],
    architectureData: {
      summary:
        "Full-stack Express.js REST pipeline handling multipart form data, PBKDF2 authenticated sessions, disk-persisted receipt uploads via Multer, and parameterized SQL operations with ON DELETE CASCADE relational constraints.",
      tiers: [
        {
          tier: "Tier 1",
          title: "Browser / Frontend SPA",
          badge: "Client Interface",
          icon: "🌐",
          desc: "Vanilla JavaScript single-page application dispatching HTTP REST, Bearer Token headers, and Multipart Form data.",
        },
        {
          tier: "Tier 2",
          title: "Express.js Middleware & Auth Guard",
          badge: "PBKDF2 Cryptographic Security",
          icon: "🛡️",
          desc: "Token authorization middleware verifying PBKDF2 hashed session tokens and applying CORS security boundaries.",
        },
        {
          tier: "Tier 3",
          title: "File Ingestion: Multer Controller",
          badge: "Multipart /uploads/ Preservation",
          icon: "📁",
          desc: "Sanitizes, timestamps, and persists bill images and warranty PDFs directly into local storage for rapid retrieval.",
        },
        {
          tier: "Tier 4",
          title: "Business Logic & Analytics Controllers",
          badge: "Parameterized SQL Operations",
          icon: "⚙️",
          desc: "Calculates live warranty protection scores, 30-day expiration urgency matrices, and cumulative repair expenditures.",
        },
        {
          tier: "Tier 5",
          title: "SQLite Database (fixbox.sqlite)",
          badge: "Relational Persistence",
          icon: "🗄️",
          desc: "Relational schema maintaining Users, Sessions, Products, and Repairs tables with ON DELETE CASCADE constraints.",
        },
      ],
      branches: {
        title: "Relational Schema Entities (fixbox.sqlite)",
        items: [
          { name: "Users Table", icon: "👤", sub: "PBKDF2 Auth & Accounts" },
          { name: "Sessions Table", icon: "🔑", sub: "Bearer Token Store" },
          { name: "Products Table", icon: "📦", sub: "Invoices & Dates" },
          { name: "Repairs Table", icon: "🔧", sub: "ON DELETE CASCADE" },
        ],
      },
      asciiDiagram: `[ Browser / Frontend SPA ] 
       │ (HTTP REST / Bearer Token / Multipart Form)
       ▼
[ Express.js Middleware ] ──► [ Auth Guard (PBKDF2 Sessions) ]
       │
       ├──► File Uploads: Multer ──► [ /uploads/ Invoices & Bills ]
       │
       └──► Business Controllers
                 │ (Parameterized Queries)
                 ▼
       [ SQLite Database (fixbox.sqlite) ]
         ├── Users Table
         ├── Sessions Table
         ├── Products Table
         └── Repairs Table (ON DELETE CASCADE)`,
    },
  },
  {
    ...PROJECTS[2], // TwinSync
    flagship: false,
    tags: [
      "Industrial IoT",
      "ONGOING",
      "Digital Twin",
      "Predictive ML",
      "Streamlit SCADA",
    ],
    archNodes: [
      "Physical Tank Simulator (Noisy 1 Hz)",
      "IoT Telemetry Streamer",
      "Physics Ground Truth Engine",
      "Fault Diagnostic & State Deviation Engine",
      "Streamlit SCADA Dashboard",
    ],
    overviewList: [
      "Runs a real-time physics-driven digital twin that simulates ideal hydrodynamic and thermal states in a 1,000L industrial tank.",
      "Continuously tracks live telemetry deviations against mathematical ground truth to detect mechanical degradation before alarms trigger.",
      "Shifts plant operations from costly reactive maintenance to proactive predictive diagnostics, extending equipment lifespan.",
      "Equipped with an interactive Streamlit SCADA dashboard featuring dual-line charts, system health indexing (0-100%), and runtime fault injection.",
    ],
    problemSolution: {
      problem:
        "Industrial fluid systems are prone to silent mechanical degradation, valve blockages, pump wear, and sensor drift. Traditional threshold-based alarms often trigger too late, causing unplanned plant shutdowns.",
      solution:
        "TwinSync runs a physics-driven digital twin in real time that simulates ideal hydrodynamic and thermal states. It continuously tracks deviations between live sensor telemetry and mathematical ground truth, detecting failures before they escalate.",
    },
    featureCards: [
      {
        icon: "🌀",
        title: "Real-Time Physics-Based Digital Twin",
        tag: "1,000L Hydrodynamic Model",
        description:
          "Mirrors fluid dynamics in a 1,000L tank to establish dynamic baselines under varying operational loads.",
      },
      {
        icon: "⚠️",
        title: "Automated Multi-Class Fault Classification",
        tag: "Multi-Failure Detection",
        description:
          "Detects rapid level drops (< -3.0 L/s) for pump failure, surges (> 3.0 L/s) for valve blockage, sensor drift, and thermal runaway before safety cutoffs trigger.",
      },
      {
        icon: "📊",
        title: "System Health Score (0–100%)",
        tag: "Reliability Composite",
        description:
          "A weighted composite score summarizing total operational reliability in real time using rolling 10-step window rate-of-change telemetry.",
      },
      {
        icon: "🎛️",
        title: "Interactive Fault Injection Panel",
        tag: "Operator Sandbox",
        description:
          "Allows operators and QA engineers to trigger synthetic hardware failures to test diagnostic accuracy and system resilience.",
      },
      {
        icon: "🛠️",
        title: "Prescriptive Recovery Actions",
        tag: "Actionable Guidance",
        description:
          "Automatically pairs detected anomalies with actionable engineering guidance to reduce operator response time and prevent shutdowns.",
      },
    ],
    stackBreakdown: [
      [
        "Data & Modeling",
        ["Python", "Physics-based Twin", "Predictive ML", "State Deviation Algorithms"],
      ],
      [
        "IoT & Telemetry",
        [
          "Industrial IoT Sensors",
          "Tank Diagnostics",
          "Telemetry Stream (1 Hz)",
          "Realistic Sensor Noise Simulation",
        ],
      ],
      [
        "Visualization & SCADA",
        [
          "Streamlit SCADA Dashboard",
          "Dual-Line Charts (Real vs Twin)",
          "System Health Index (0-100%)",
          "Fault Injection Panel",
        ],
      ],
    ],
    architectureData: {
      summary:
        "Dual-pipeline predictive architecture coupling a physical tank simulator (level, inflow, outflow, temperature, pressure) with a zero-fault physics digital twin, evaluating state deviations (ΔLevel, ΔTemp, ΔPressure) in a rolling 10-step fault diagnostic engine to render real-time SCADA telemetry.",
      tiers: [
        {
          tier: "Tier 1",
          title: "Physical Tank Simulator",
          badge: "Hydrodynamic Dynamics",
          icon: "🏭",
          desc: "Simulates tank level, inflow, outflow, temperature, and pressure with realistic sensor noise modeling.",
        },
        {
          tier: "Tier 2",
          title: "IoT Telemetry Streamer",
          badge: "1 Hz Edge Streaming",
          icon: "📡",
          desc: "Simulated edge streamer broadcasting noisy real-time sensor packets at 1 Hz intervals.",
        },
        {
          tier: "Tier 3",
          title: "Digital Twin Engine (Physics Ground Truth)",
          badge: "Mathematical Baselines",
          icon: "🌀",
          desc: "Simulates ideal fluid dynamics and thermal states with zero faults to calculate state deviations (ΔLevel, ΔTemp, ΔPressure).",
        },
        {
          tier: "Tier 4",
          title: "Fault Diagnostic Engine",
          badge: "Rolling 10-Step Window",
          icon: "🧠",
          desc: "Rate-of-change classification with confidence scoring to identify pump failure, valve blockage, sensor drift, and thermal runaway.",
        },
        {
          tier: "Tier 5",
          title: "Streamlit SCADA Dashboard",
          badge: "Operator Command Center",
          icon: "🖥️",
          desc: "Dual-line charts (Real vs Twin), System Health Index (0-100%), active fault alarms, and runtime fault injection sandbox.",
        },
      ],
      branches: {
        title: "SCADA Diagnostics & Fault Alarms",
        items: [
          { name: "Pump Failure", icon: "🚨", sub: "Drop < -3.0 L/s" },
          { name: "Valve Blockage", icon: "⚠️", sub: "Surge > 3.0 L/s" },
          { name: "Sensor Drift", icon: "📉", sub: "Mathematical Variance" },
          { name: "Thermal Runaway", icon: "🔥", sub: "Temperature Spikes" },
          { name: "Fault Injection", icon: "🎛️", sub: "Interactive Sandbox" },
        ],
      },
      asciiDiagram: `┌─────────────────────────┐
│ Physical Tank Simulator │ (Level, Inflow, Outflow, Temp, Pressure)
└────────────┬────────────┘
             │ (Adds realistic sensor noise)
             ▼
┌─────────────────────────┐
│  IoT Telemetry Streamer │ (Simulated edge streaming at 1 Hz)
└──────┬───────────┬──────┘
       │           │
       │           ▼
       │  ┌────────────────────────┐
       │  │  Digital Twin Engine   │ (Physics ground truth; zero faults)
       │  └───────────┬────────────┘
       │              │
       │              ▼ (Calculates state deviations: ΔLevel, ΔTemp, ΔPressure)
       ▼              ▼
┌─────────────────────────────────┐
│   Fault Diagnostic Engine       │ (Rolling 10-step window rate-of-change + confidence scoring)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│    Streamlit SCADA Dashboard    │
│  • Dual-line Charts (Real vs Twin)
│  • System Health Index (0-100%)  │
│  • Active Fault Alarms          │
│  • Runtime Fault Injection Panel │
└─────────────────────────────────┘`,
    },
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "stack" | "features">("overview");
  const [archView, setArchView] = useState<"visual" | "ascii">("visual");
  const [copiedAscii, setCopiedAscii] = useState(false);

  const handleCopyAscii = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  };

  const openModal = (proj: ProjectDetail) => {
    setSelectedProject(proj);
    setActiveTab("overview");
    setArchView("visual");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">04 · Featured Projects</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">
            A curated portfolio of full-stack platforms, AI applications, and analytical systems verified from my resume. Click any card to inspect architecture and technical specifications.
          </p>
        </div>

        <div className="projects-grid">
          {ENRICHED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className={`project-card glass ${proj.flagship ? "flagship" : ""}`}
              onClick={() => openModal(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal(proj);
                }
              }}
            >
              <div>
                <div className="project-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-name">{proj.title}</div>
                <div className="project-tagline">{proj.subtitle} — {proj.description}</div>
                <div className="project-stack-preview">
                  {proj.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < proj.techStack.length - 1 && (
                        <span style={{ color: "var(--border-hair-2)" }}>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="project-arrow" aria-hidden="true">
                →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close project modal"
              >
                ✕
              </button>
              <div className="modal-tags">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="modal-title" id="modalTitle">
                {selectedProject.title}
              </h3>
              <p className="modal-tagline">
                {selectedProject.subtitle}
              </p>
              {selectedProject.githubUrl && (
                <div style={{ marginTop: "12px" }}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--signal-teal)",
                      borderColor: "rgba(255, 59, 48, 0.3)",
                      background: "rgba(255, 59, 48, 0.05)",
                    }}
                  >
                    <span>View Repository on GitHub</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>

            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`modal-tab ${activeTab === "architecture" ? "active" : ""}`}
                onClick={() => setActiveTab("architecture")}
              >
                Architecture
              </button>
              <button
                className={`modal-tab ${activeTab === "stack" ? "active" : ""}`}
                onClick={() => setActiveTab("stack")}
              >
                Tech Stack
              </button>
              <button
                className={`modal-tab ${activeTab === "features" ? "active" : ""}`}
                onClick={() => setActiveTab("features")}
              >
                Key Features
              </button>
            </div>

            <div className="modal-body">
              {activeTab === "overview" && (
                <div>
                  <div className="ms-block">
                    <h4>About the System</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  {selectedProject.overviewList ? (
                    <div className="ms-block">
                      <h4>System Overview &amp; Key Milestones</h4>
                      <div className="om-list">
                        {selectedProject.overviewList.map((item, idx) => (
                          <div key={idx} className="om-item">
                            <div className="om-num">{String(idx + 1).padStart(2, "0")}</div>
                            <div className="om-text">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="ms-block">
                      <h4>Resume Highlights</h4>
                      <ul className="ms-list">
                        {selectedProject.features.map((feat) => (
                          <li key={feat}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.problemSolution && (
                    <div className="ms-block">
                      <h4>The Problem &amp; The Solution</h4>
                      <div className="prob-sol-grid">
                        <div className="prob-card">
                          <h5>⚠️ The Problem</h5>
                          <p>{selectedProject.problemSolution.problem}</p>
                        </div>
                        <div className="sol-card">
                          <h5>💡 The Solution</h5>
                          <p>{selectedProject.problemSolution.solution}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="ms-block">
                    <h4>Status &amp; Category</h4>
                    <div className="ms-grid">
                      <div className="ms-stackcard">
                        <div className="k">Status</div>
                        <div className="v">{selectedProject.status}</div>
                      </div>
                      <div className="ms-stackcard">
                        <div className="k">Domain</div>
                        <div className="v">{selectedProject.category}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div>
                  {selectedProject.architectureData ? (
                    <div className="ms-block">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "16px",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <h4 style={{ margin: 0 }}>System Data Flow &amp; Architecture</h4>
                          <p style={{ margin: "4px 0 0", fontSize: "13px" }}>
                            {selectedProject.architectureData.summary}
                          </p>
                        </div>
                        <div className="arch-view-toggle">
                          <button
                            className={`arch-toggle-btn ${archView === "visual" ? "active" : ""}`}
                            onClick={() => setArchView("visual")}
                          >
                            Visual Pipeline
                          </button>
                          <button
                            className={`arch-toggle-btn ${archView === "ascii" ? "active" : ""}`}
                            onClick={() => setArchView("ascii")}
                          >
                            ASCII Schematic
                          </button>
                        </div>
                      </div>

                      {archView === "visual" ? (
                        <div className="arch-pipeline">
                          {selectedProject.architectureData.tiers.map((tier, idx) => (
                            <React.Fragment key={tier.title}>
                              <div className="arch-tier-card">
                                <div className="arch-tier-header">
                                  <div className="arch-tier-title-wrap">
                                    <div className="arch-tier-icon">{tier.icon}</div>
                                    <div className="arch-tier-title">{tier.title}</div>
                                  </div>
                                  <span className="arch-tier-badge">{tier.badge}</span>
                                </div>
                                <div className="arch-tier-desc">{tier.desc}</div>
                              </div>

                              {idx < (selectedProject.architectureData?.tiers.length ?? 0) - 1 && (
                                <div className="arch-connector-v">
                                  <div className="arch-connector-line" />
                                  <div className="arch-connector-pulse" />
                                  <div className="arch-connector-arrow">▼</div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}

                          {selectedProject.architectureData.branches && (
                            <div className="arch-branches-container">
                              <div className="arch-connector-v">
                                <div className="arch-connector-line" />
                                <div className="arch-connector-pulse" />
                                <div className="arch-connector-arrow">▼</div>
                              </div>
                              <div className="arch-branches-distributor">
                                <div className="arch-dist-stem" />
                                <div className="arch-dist-bar" />
                              </div>
                              <div className="arch-branch-grid">
                                {selectedProject.architectureData.branches.items.map((branch) => (
                                  <div key={branch.name} className="arch-branch-card">
                                    <div className="arch-branch-icon">{branch.icon}</div>
                                    <div className="arch-branch-name">{branch.name}</div>
                                    {branch.sub && <div className="arch-branch-sub">{branch.sub}</div>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="arch-ascii-card">
                          <div className="arch-ascii-header">
                            <span className="arch-ascii-title">Architecture Pipeline Schematic</span>
                            <button
                              className="arch-copy-btn"
                              onClick={() =>
                                handleCopyAscii(selectedProject.architectureData!.asciiDiagram)
                              }
                            >
                              {copiedAscii ? "✓ Copied" : "Copy Schematic"}
                            </button>
                          </div>
                          <pre className="arch-ascii-pre">
                            {selectedProject.architectureData.asciiDiagram}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ms-block">
                      <h4>System Data Flow</h4>
                      <p>
                        Structured layered architecture connecting the client view, API controllers, processing logic, and persistence layer:
                      </p>
                      <div className="arch-diagram">
                        {selectedProject.archNodes.map((node, i) => (
                          <React.Fragment key={node}>
                            <div className="arch-node">{node}</div>
                            {i < selectedProject.archNodes.length - 1 && (
                              <div className="arch-connector" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "stack" && (
                <div>
                  {selectedProject.stackBreakdown.map(([group, list]) => (
                    <div key={group} className="ms-block">
                      <h4>{group}</h4>
                      <div className="flex flex-wrap gap-2">
                        {list.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  {selectedProject.featureCards ? (
                    <div className="ms-block">
                      <h4>Key Architectural Features</h4>
                      <div className="feat-cards-grid">
                        {selectedProject.featureCards.map((card) => (
                          <div key={card.title} className="feat-card">
                            <div className="feat-card-top">
                              <div className="feat-card-icon">{card.icon}</div>
                              {card.tag && <span className="feat-card-tag">{card.tag}</span>}
                            </div>
                            <div className="feat-card-title">{card.title}</div>
                            <div className="feat-card-desc">{card.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="ms-block">
                      <h4>Core Capabilities</h4>
                      <div className="ms-grid">
                        {selectedProject.features.map((feat) => (
                          <div key={feat} className="ms-stackcard">
                            <div className="v">{feat}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
