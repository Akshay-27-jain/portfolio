export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'AI/ML' | 'Full Stack' | 'Edge CV' | 'Java Backend' | 'AI/LLM';
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  results: string[];
  futureImprovements: string[];
  architectureDiagram: {
    frontend: string;
    backend: string;
    database: string;
    aiEngine: string;
    flowSteps: string[];
  };
  databaseDesign?: string[];
  challenges: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    iconName: string;
    description: string;
    featured?: boolean;
  }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  cgpa?: string;
  focusAreas: string[];
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  badgeColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface CodingProfile {
  name: string;
  username: string;
  url: string;
  icon: string;
  stats: string;
  badge: string;
}
