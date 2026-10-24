export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  status: "Personal Project" | "COMPLETED" | "ONGOING" | "Final Year Project";
  description: string;
  features: string[];
  techStack: string[];
  visualType: "teamup-nodes" | "warranty-tracker" | "digital-twin" | "career-analytics";
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillItem {
  name: string;
  category: "Programming & Languages" | "Data & Analytics" | "AI & Machine Learning" | "Web & Database" | "Professional Skills";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  bullets?: string[];
  technologies: string[];
  type: "Artificial Intelligence" | "Data Analytics";
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  scoreLabel: string;
  score: string;
  location?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface EventItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  type: "Workshop" | "Hackathon" | "Project Expo";
}

export const PERSONAL_INFO = {
  name: "Nanthini Murugan",
  role: "Data Analyst",
  eyebrow: "ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
  headline: "Hi, I'm Nanthini Murugan",
  typingTitles: [
    "Data Analyst",
    "AI & Data Science Student",
    "Python Developer",
    "AI/ML Enthusiast",
    "Data Visualization Enthusiast"
  ],
  bio: "Aspiring Data Analyst with a strong foundation in Python, SQL, data visualization, and analytical problem-solving. Passionate about transforming raw data into meaningful insights to support business decision-making. Experienced in AI and data analytics projects, with a commitment to continuous learning and professional growth.",
  email: "nanthinimurugan88@gmail.com",
  phone: "+91 9600617163",
  location: "Neyveli, Cuddalore, Tamil Nadu",
  college: "IFET College of Engineering",
  degree: "Bachelor of Technology - Artificial Intelligence and Data Science",
  batch: "2023 - 2027",
  cgpa: "8.9",
  resumePath: "/resume.pdf",
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nanthini-murugan-6048aa32b",
  github: "https://github.com/Nandyyymurugan",
  email: "mailto:nanthinimurugan88@gmail.com",
  phone: "tel:+919600617163",
  youtube: "",
};

export const ABOUT_STATS = [
  {
    value: 8.9,
    suffix: "",
    decimals: 1,
    label: "CGPA",
    sublabel: "B.Tech AI & Data Science",
  },
  {
    value: 2,
    suffix: "",
    decimals: 0,
    label: "Internships",
    sublabel: "AI & Data Analytics",
  },
  {
    value: 10,
    suffix: "K+",
    decimals: 0,
    label: "Question Bank",
    sublabel: "EduNavigator Project",
  },
  {
    value: 14,
    suffix: "+",
    decimals: 0,
    label: "Competitive Sectors",
    sublabel: "Exam Compatibility",
  },
  {
    value: 5,
    suffix: "",
    decimals: 0,
    label: "Core Projects",
    sublabel: "From Resume",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "btech",
    institution: "IFET College of Engineering",
    degree: "Bachelor of Technology - Artificial Intelligence and Data Science",
    period: "2023 - 2027",
    scoreLabel: "CGPA",
    score: "8.9",
    location: "Villupuram, Tamil Nadu",
  },
  {
    id: "hsc",
    institution: "St. Joseph Of Cluny Matriculation Higher Secondary School",
    degree: "HSC - Computer Science",
    period: "2022 - 2023",
    scoreLabel: "Percentage",
    score: "81%",
    location: "Neyveli, Tamil Nadu",
  },
  {
    id: "sslc",
    institution: "St. Joseph Of Cluny Matriculation Higher Secondary School",
    degree: "SSLC",
    period: "2020 - 2021",
    scoreLabel: "Percentage",
    score: "Pass",
    location: "Neyveli, Tamil Nadu",
  },
];

// Exact 15 skills from the resume
export const RESUME_SKILLS: SkillItem[] = [
  { name: "Python", category: "Programming & Languages" },
  { name: "SQL", category: "Data & Analytics" },
  { name: "HTML", category: "Web & Database" },
  { name: "CSS", category: "Web & Database" },
  { name: "C", category: "Programming & Languages" },
  { name: "Java", category: "Programming & Languages" },
  { name: "Database Management", category: "Web & Database" },
  { name: "AI / ML", category: "AI & Machine Learning" },
  { name: "NLP", category: "AI & Machine Learning" },
  { name: "Web Development", category: "Web & Database" },
  { name: "Full Stack Development", category: "Web & Database" },
  { name: "Data Visualization", category: "Data & Analytics" },
  { name: "Excel", category: "Data & Analytics" },
  { name: "Analytical Problem Solving", category: "Professional Skills" },
  { name: "Communication", category: "Professional Skills" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-languify",
    role: "Artificial Intelligence with Python Intern",
    company: "Languify (Powered by Coincent)",
    location: "Online",
    period: "Aug 2024 - Sep 2024",
    type: "Artificial Intelligence",
    summary:
      "Worked with Python to analyze datasets and implement machine learning techniques. Gained hands-on experience in data preprocessing, model development, and data-driven problem solving.",
    bullets: [
      "Worked with Python to analyze diverse datasets and implement machine learning techniques.",
      "Gained hands-on experience in data preprocessing, model development, and data-driven problem solving.",
    ],
    technologies: ["Python", "Machine Learning", "Data Preprocessing", "Model Development", "Data-driven Problem Solving"],
  },
  {
    id: "exp-nextgen",
    role: "Data Analytics Intern",
    company: "NextGen Technologies Pvt. Ltd.",
    location: "Remote / Hybrid",
    period: "Feb 2025 (15 Days)",
    type: "Data Analytics",
    summary:
      "Performed end-to-end data analysis and developed predictive ML models.",
    bullets: [
      "Performed end-to-end data analysis and developed predictive ML models using Python (Pandas, scikit-learn).",
      "Created interactive dashboards in Tableau to communicate data-driven insights to stakeholders.",
    ],
    technologies: ["Python", "Pandas", "scikit-learn", "Tableau", "Data Analysis", "Predictive ML"],
  },
];

// Exact 4 Projects from the resume
export const PROJECTS: Project[] = [
  {
    id: "teamup-ai",
    number: "01",
    title: "TeamUp AI",
    subtitle: "AI-Powered Project Delegation & Management Platform",
    category: "AI & Full-Stack Application",
    status: "Personal Project",
    description:
      "AI-powered project management and delegation web platform engineered specifically for student squads, hackathons, and agile group initiatives. It automatically breaks down project topics into equitable, role-specific deliverables using Google Gemini AI.",
    features: [
      "Automated AI Task Decomposition (Google Gemini 2.5 Flash)",
      "Zero-Login Magic Links (12-char secure member tokens)",
      "Centralized Team Lead Dashboard with live completion telemetry",
      "Scoped Role Isolation & data overwrite protection",
      "Modern Glassmorphic SaaS Design with responsive marketing & app views",
    ],
    techStack: [
      "Python 3.13",
      "Flask 3.1",
      "Google GenAI SDK",
      "Gemini 2.5 Flash",
      "SQLite 3",
      "Flask-SQLAlchemy",
      "HTML5",
      "Vanilla CSS3",
      "Vanilla JavaScript",
    ],
    visualType: "teamup-nodes",
  },
  {
    id: "fixbox",
    number: "02",
    title: "FixBox",
    subtitle: "Full-Stack Warranty & Repair Management Platform",
    category: "Full-Stack Web Platform",
    status: "COMPLETED",
    description:
      "Centralized full-stack warranty and repair management platform designed to eliminate paper clutter and prevent financial losses from missed warranty claims. It digitizes invoices, tracks warranties with automated alerts, and calculates maintenance expenditure through health analytics.",
    features: [
      "Token-based authentication with PBKDF2 cryptographic hashing",
      "Interactive Warranty Health Analytics engine with 30-day expiration urgency",
      "Nested relational data tracking connecting products with chronological repair logs",
      "Robust multipart file handling (Multer) for receipt/invoice preservation",
      "Instant client-side search and brand-agnostic support directory",
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "SQLite3",
      "Multer",
      "PBKDF2 Hashing",
      "HTML5",
      "CSS3",
      "Vanilla JS",
    ],
    visualType: "warranty-tracker",
  },
  {
    id: "twinsync",
    number: "03",
    title: "TwinSync",
    subtitle: "Industrial IoT & Physics-Based Digital Twin for Predictive Maintenance",
    category: "Industrial IoT & Predictive AI",
    status: "ONGOING",
    description:
      "Industrial IoT & physics-driven digital twin that simulates ideal hydrodynamic and thermal states in real time. It continuously tracks live sensor deviations to predict pump failures, valve blockages, sensor drift, and thermal runaway before plant shutdowns occur.",
    features: [
      "Real-time physics-based digital twin mirroring fluid dynamics in a 1,000L tank.",
      "Multi-class fault classification (pump failure, valve blockage, sensor drift, thermal runaway).",
      "System Health Score (0-100%) summarizing operational reliability in real time.",
      "Streamlit SCADA dashboard with dual-line charts and interactive fault injection panel.",
      "Prescriptive recovery actions to eliminate unplanned plant downtime.",
    ],
    techStack: ["Python", "Streamlit", "Industrial IoT", "Physics-based Twin", "Data Visualization", "Predictive ML"],
    visualType: "digital-twin",
  },
  {
    id: "edunavigator",
    number: "04",
    title: "EduNavigator",
    subtitle: "AI-Powered Career & Exam Preparation Engine",
    category: "AI & Educational Analytics",
    status: "Final Year Project",
    description:
      "Architected a full-stack platform managing a 10,000+ question repository across 14+ sectors, featuring an algorithmic Syllabus Overlap Engine, 12 MNC IT Placement Hub, and 3D gamified roadmaps.",
    features: [
      "Cross-Exam Syllabus Overlap Engine (computes exact compatibility across 14+ sectors)",
      "IT Placement Hub & 4-Stage Arena (12 Tech Giants recruitment simulators)",
      "10,000+ Q-Bank & Timed Exam Simulator (negative marking & instant analytics)",
      "3D Adventure Roadmap & AI Guidance (Three.js gamification & in-page AI Tutor)",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Three.js",
      "Python",
      "Flask",
      "SQLite",
      "Jaccard Overlap Matrix",
    ],
    visualType: "career-analytics",
  },
];

// Exact 6 Certifications from resume
export const CERTIFICATIONS: Certification[] = [
  {
    id: "ibm-ai",
    name: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
  },
  {
    id: "infosys-prompt",
    name: "Prompt Engineering",
    issuer: "Infosys Springboard",
  },
  {
    id: "infosys-ai-all",
    name: "Artificial Intelligence for All",
    issuer: "Infosys Springboard",
  },
  {
    id: "infosys-genai",
    name: "Generative AI for All",
    issuer: "Infosys Springboard",
  },
  {
    id: "nptel",
    name: "NPTEL Certification",
    issuer: "NPTEL",
  },
  {
    id: "ccna",
    name: "CCNA Certification",
    issuer: "Cisco Networking Academy",
  },
];

// Exact 5 Workshops, Hackathons & Project Expos from resume
export const WORKSHOPS_AND_EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "Visual Insights: Data Storytelling with Python & Tableau",
    organization: "ISTE Student Chapter, IFET College of Engineering",
    type: "Workshop",
  },
  {
    id: "event-2",
    title: "Web Development Workshop",
    organization: "Top Engineers India",
    location: "IIT Madras Research Park",
    type: "Workshop",
  },
  {
    id: "event-3",
    title: "IFET Hack Warriors'26",
    organization: "IFET College of Engineering",
    location: "24-Hour National Level Hackathon",
    type: "Hackathon",
  },
  {
    id: "event-4",
    title: "HackIndia 2026",
    organization: "HackIndia",
    location: "National Web3 & AI Hackathon",
    type: "Hackathon",
  },
  {
    id: "event-5",
    title: "Sustainable Innovations Project Expo 2025",
    organization: "IFET College of Engineering",
    type: "Project Expo",
  },
];

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Internships", href: "#internships" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
];
