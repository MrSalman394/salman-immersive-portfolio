export type ProjectCategory = 'all' | 'ai-ml' | 'webgl' | 'systems' | 'fullstack';
export type ProjectStatus = 'production' | 'research' | 'in-progress';

export interface ProjectSummary {
  id: string;
  title: string;
  category: ProjectCategory;
  domain: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  architecture: string;
  keyMetrics: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: string;
}

export interface SkillCluster {
  id: string;
  label: string;
  signal: number;
  description: string;
  technologies: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  venue: string;
  date: string;
  abstract: string;
  focus: string;
  status: 'published' | 'preprint' | 'in-review';
  doiUrl?: string;
  pdfUrl?: string;
  bibtex: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export const profile = {
  name: 'Muhammad Salman',
  roles: ['Full Stack Developer', 'AI Researcher', 'Software Engineer'],
  highlights: [
    'Intelligent Full-Stack Systems & Role Portals',
    'Deep Transfer Learning & Computer Vision (IBCAST \'25 & ICCoR \'26)',
    'Enterprise Backend & Cryptographic Security Architectures',
  ],
  location: 'Bannu, Khyber Pakhtunkhwa, Pakistan',
  phone: '+92 321 6230206',
  email: 'isalman.consult@gmail.com',
  github: 'https://github.com/MrSalman394',
  linkedin: 'https://linkedin.com/in/muhammad-salman',
  languages: ['English (Fluent)', 'Urdu (Native)', 'Pashto (Native)'],
  interests: ['Game Development', 'Web Technologies', 'Problem Solving', 'Exploring New Tools', 'Tech Blogging', 'Outdoor Activities'],
  certifications: [
    'The Art of Web Craft: Mastering WordPress (2024)',
    'Git and GitHub for Beginners – Coursera (2024)',
    'CACIO-2024 Joint Event Participant (2024)',
  ],
  statement:
    'Full Stack Developer & AI Researcher building role-based web platforms, e-commerce applications, intelligent job recommendation engines, secure voting systems, and deep learning vision models.',
  availability: 'Open to Full-Stack Engineering, AI Development, and Technical Projects.',
};

export const skillClusters: SkillCluster[] = [
  {
    id: 'fullstack',
    label: 'Full Stack & Web Engineering',
    signal: 0.95,
    description: 'Role-based web portals, e-commerce web applications, REST API development, authentication, and database design.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Laravel', 'PHP', 'MySQL', 'REST APIs', 'WordPress'],
  },
  {
    id: 'ai-ml',
    label: 'AI & Deep Learning',
    signal: 0.90,
    description: 'AI job recommendation algorithms, deep transfer learning, hybrid CNN fusion architectures, and transparent medical vision models.',
    technologies: ['Deep Transfer Learning', 'Hybrid CNN Fusion', 'AI Recommendation', 'Computer Vision', 'Python'],
  },
  {
    id: 'software-eng',
    label: 'Software Systems & OOP',
    signal: 0.88,
    description: 'Object-oriented application design, desktop systems, database management, and version control workflows.',
    technologies: ['Java', 'OOP', 'Java Swing', 'MySQL', 'Git & GitHub', 'Security & CNIC Authentication'],
  },
];

export const projects: ProjectSummary[] = [
  {
    id: 'nexushireconnect',
    title: 'NexusHireConnect Job Portal',
    category: 'fullstack',
    domain: 'Full Stack & AI Development',
    status: 'production',
    tagline: 'Role-based job portal with AI-based job recommendation system & automated CV generator.',
    description:
      'Designed and developed a complete role-based job portal featuring an AI-based job recommendation system for optimized matching, interactive dashboards, CV generator, and authenticated REST APIs.',
    architecture: 'React + TypeScript + Node.js + PostgreSQL + AI Matching Pipeline',
    keyMetrics: ['AI-Based Job Matching', 'Built-in CV Generator', 'Role-Based Authentication'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI Recommendation', 'REST APIs'],
    githubUrl: 'https://github.com/MrSalman394',
    codeSnippet: `async function generateJobRecommendations(userSkills, jobList) {\n  const matches = await matchEngine.evaluate(userSkills, jobList);\n  return matches.sort((a, b) => b.score - a.score);\n}`,
  },
  {
    id: 'electrasuite-voting',
    title: 'ElectraSuite Voting System',
    category: 'fullstack',
    domain: 'Full Stack Web System',
    status: 'production',
    tagline: 'CNIC-based secure voting system with real-time election tracking & analytics.',
    description:
      'Developed a secure full-stack voting application utilizing CNIC-based identity verification, real-time vote tracking, and a comprehensive administrative panel for election management and analytics.',
    architecture: 'React + Laravel + MySQL + CNIC Security Layer',
    keyMetrics: ['CNIC Identity Verification', 'Real-Time Vote Tracking', 'Admin Election Analytics'],
    technologies: ['React', 'Laravel', 'MySQL', 'Authentication', 'Real-Time Tracking'],
    githubUrl: 'https://github.com/MrSalman394',
  },
  {
    id: 'e-commerce-web',
    title: 'E-Commerce Web Application',
    category: 'fullstack',
    domain: 'Full Stack Web Engineering',
    status: 'production',
    tagline: 'Full-featured online store with product catalog, shopping cart & user checkout.',
    description:
      'Designed and developed a responsive e-commerce web platform featuring product catalog search and filtering, dynamic shopping cart management, secure user authentication, order processing, and administrative inventory management.',
    architecture: 'React + TypeScript + Node.js / PHP + MySQL + Payment Gateway API',
    keyMetrics: ['Dynamic Cart & Checkout', 'Product Catalog Filtering', 'Admin Inventory Control'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MrSalman394',
    codeSnippet: `const addToCart = (product, quantity) => {\n  setCart((prev) => [...prev, { ...product, quantity }]);\n  updateCartTotal();\n};`,
  },
  {
    id: 'university-management-system',
    title: 'University Management System',
    category: 'systems',
    domain: 'Software Engineering',
    status: 'production',
    tagline: 'Desktop application for managing students, faculty, courses, and enrollments.',
    description:
      'Developed a comprehensive University Management System to manage students, faculty, courses, and enrollments using Java, object-oriented programming principles, and MySQL.',
    architecture: 'Java Swing GUI + OOP Architecture + MySQL Relational Database',
    keyMetrics: ['Complete Academic Workflow', 'OOP Architecture Design'],
    technologies: ['Java', 'OOP', 'Java Swing', 'MySQL'],
    githubUrl: 'https://github.com/MrSalman394',
  },
  {
    id: 'course-management-system',
    title: 'Course Management System',
    category: 'systems',
    domain: 'Web Application',
    status: 'production',
    tagline: 'Student enrollment, course tracking, and academic record management system.',
    description:
      'Built a web-based course management system enabling streamlined student course enrollment, progress tracking, and academic record management.',
    architecture: 'PHP Backend + MySQL Database + Responsive Web Interface',
    keyMetrics: ['Streamlined Student Enrollment', 'Automated Record Management'],
    technologies: ['PHP', 'MySQL', 'Web Technologies'],
    githubUrl: 'https://github.com/MrSalman394',
  },
];

export const research: ResearchItem[] = [
  {
    id: 'bone-fracture-detection',
    title: 'Towards Transparent Bone Fracture Detection',
    venue: '22nd IBCAST 2025, Murree, Pakistan',
    date: 'Feb 2025',
    abstract:
      'Presented research exploring transparent and explainable deep learning methodologies for accurate automated bone fracture detection in medical diagnostic imaging.',
    focus: 'Explainable AI & Medical Computer Vision',
    status: 'published',
    bibtex: `@inproceedings{salman2025bone,\n  title={Towards Transparent Bone Fracture Detection},\n  author={Salman, Muhammad},\n  booktitle={Proceedings of the 22nd International Bhurban Conference on Applied Sciences and Technology (IBCAST)},\n  address={Murree, Pakistan},\n  year={2025}\n}`,
  },
  {
    id: 'tomato-leaf-disease',
    title: 'Deep Transfer Learning with Hybrid CNN Fusion for Smart Tomato Leaf Disease Diagnosis',
    venue: 'ICCoR 2026',
    date: '2026',
    abstract:
      'Accepted for presentation and publication at ICCoR 2026. Proposes a novel deep transfer learning framework utilizing hybrid CNN fusion architectures for early and precise tomato leaf disease diagnosis in smart agriculture.',
    focus: 'Deep Learning & Agricultural Computer Vision',
    status: 'preprint',
    bibtex: `@inproceedings{salman2026tomato,\n  title={Deep Transfer Learning with Hybrid CNN Fusion for Smart Tomato Leaf Disease Diagnosis},\n  author={Salman, Muhammad},\n  booktitle={International Conference on Computing and Robotics (ICCoR)},\n  year={2026}\n}`,
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-nexus-hire',
    role: 'Full Stack & AI Developer',
    organization: 'NexusHireConnect — University of Wah',
    period: '2026 — Present',
    location: 'Wah, Pakistan',
    highlights: [
      'Engineered a complete role-based job platform using React, TypeScript, Node.js, and PostgreSQL.',
      'Implemented an AI-based job recommendation system for optimized candidate matching.',
      'Developed interactive recruiter dashboards, automated CV generator, and token-authenticated REST APIs.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI Matching', 'REST APIs'],
  },
  {
    id: 'exp-electrasuite',
    role: 'Full Stack Developer & AI Researcher',
    organization: 'ElectraSuite & IBCAST Research — University of Wah',
    period: '2025',
    location: 'Wah, Pakistan',
    highlights: [
      'Built a full-stack secure voting system using React, Laravel, and MySQL with CNIC identity verification.',
      'Presented peer-reviewed medical computer vision research at the 22nd IBCAST 2025 (Murree).',
      'Developed administrative election analytics and real-time ballot tracking pipelines.',
    ],
    technologies: ['React', 'Laravel', 'MySQL', 'CNIC Security', 'Deep Learning', 'PyTorch'],
  },
  {
    id: 'exp-systems-dev',
    role: 'Software Systems & Web Engineer',
    organization: 'Academic Projects & Independent Systems',
    period: '2024',
    location: 'Wah / Bannu, Pakistan',
    highlights: [
      'Developed desktop and web management systems using Java, Java Swing, PHP, MySQL, and OOP principles.',
      'Expanded technical foundations across Python, PyTorch, computer vision datasets, and Git workflows.',
    ],
    technologies: ['Java', 'Java Swing', 'PHP', 'MySQL', 'Python', 'OOP Architecture'],
  },
  {
    id: 'exp-academic-foundation',
    role: 'BS Software Engineering (Progressing)',
    organization: 'University of Wah',
    period: '2023 — 2027 (Expected)',
    location: 'Wah, Pakistan',
    highlights: [
      'Undergraduate studies focused on software architecture, algorithms, deep learning, databases, and system design.',
      'Targeting graduation in 2027 with dual specialization in Full Stack Web Engineering and Applied AI.',
    ],
    technologies: ['C', 'C++', 'Data Structures', 'Database Systems', 'Software Engineering'],
  },
];
