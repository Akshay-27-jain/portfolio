import {
  Project,
  SkillCategory,
  Education,
  ExperienceItem,
  Achievement,
  Certification,
  BlogPost,
  CodingProfile
} from '../types';

export const PERSONAL_INFO = {
  name: "Akshay Jain",
  title: "Java Full Stack Developer | Software Engineer",
  cgpa: "9.07 / 10.0",
  taglines: [
    "Java Full Stack Developer",
    "Software Engineer",
    "Spring Boot & React Specialist",
    "REST API Architect",
    "Problem Solver"
  ],
  bio: "Software Engineering undergraduate specializing in Java full-stack development, with hands-on experience building REST APIs and full-stack applications using Java, Spring Boot, Spring Security, React, Next.js, and PostgreSQL. Skilled in implementing JWT-based authentication, relational database design, and CRUD-driven backend systems.",
  aboutTextExtended: [
    "I am Akshay Jain, a Computer Engineering student at Walchand Institute of Technology maintaining an outstanding academic standing of 9.07 / 10.0 CGPA.",
    "Specializing in Java full-stack development, I have hands-on experience building REST APIs and production applications using Java, Spring Boot, Spring Security, React, Next.js, and PostgreSQL.",
    "I excel at implementing JWT-based authentication, relational database schemas, and CRUD-driven backend systems, with additional exposure to Python, JavaScript, MySQL, MongoDB, and LLM API integrations.",
    "With a strong foundation in Data Structures & Algorithms and object-oriented programming, I design scalable, well-tested software and communicate technical decisions clearly to cross-functional teams."
  ],
  email: "jainakshay0804@gmail.com",
  phone: "+91 8618280477",
  location: "Solapur, Maharashtra, India",
  college: "Walchand Institute of Technology, Solapur",
  github: "https://github.com/Akshay-27-jain",
  linkedin: "https://www.linkedin.com/in/akshayjain",
  hackerrank: "https://www.hackerrank.com/profile/jainakshay0804",
  portfolioUrl: "https://portfolio-ten-murex-ot303crdie.vercel.app",
  resumeUrl: "#resume-download"
};

export const PROJECTS: Project[] = [
  {
    id: "subscription-tracker",
    title: "Subscription Tracker",
    subtitle: "Subscription & Renewal Management Platform",
    description: "Engineered a full-stack subscription management platform using Next.js, React, and PostgreSQL to track recurring services, billing cycles, and renewal dates with automated Resend email reminders and analytics dashboards.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://portfolio-ten-murex-ot303crdie.vercel.app",
    githubUrl: "https://github.com/Akshay-27-jain/Subscription-Tracker",
    technologies: ["Next.js", "React", "PostgreSQL", "Prisma", "Clerk", "Resend", "Recharts"],
    problem: "Users often forget recurring subscription billing cycles, leading to unexpected credit card charges and unused auto-renewals.",
    solution: "Subscription Tracker provides automated email alerts, billing countdowns, and graphical spending breakdowns so users retain total control of recurring expenses.",
    keyFeatures: [
      "Track recurring services, billing cycles, & renewal dates",
      "Clerk-based Authentication & Access Control",
      "Automated Resend Email Reminders for Upcoming Renewals",
      "Interactive Recharts-based Analytics Dashboards",
      "Optimized Database Access using Prisma ORM",
      "Responsive UI with Reusable React Components"
    ],
    results: [
      "Automated 100% of upcoming renewal email notifications",
      "Visualized monthly spending, active subscriptions, & expense trends",
      "Delivered sub-100ms database response times with Prisma ORM"
    ],
    futureImprovements: [
      "Integrate Open Banking APIs for auto-detecting bank subscriptions",
      "Support multi-currency conversion for global software tools",
      "Add shared family subscription cost splitting"
    ],
    architectureDiagram: {
      frontend: "Next.js 15, React 19, Tailwind CSS, Recharts",
      backend: "Next.js Server Actions & API Routes",
      database: "PostgreSQL Database with Prisma ORM",
      aiEngine: "Resend Email Notification Trigger Engine",
      flowSteps: [
        "User logs in securely via Clerk Auth",
        "Dashboard queries PostgreSQL via Prisma ORM for subscription renewal dates",
        "Resend cron serverless handler dispatches email alert prior to renewal",
        "Interactive Recharts visualizes monthly recurring spend breakdown"
      ]
    },
    databaseDesign: [
      "users (id, clerk_user_id, email, created_at)",
      "subscriptions (id, user_id, name, price, billing_cycle, renewal_date, category)",
      "reminders (id, subscription_id, trigger_date, is_sent)"
    ],
    challenges: [
      "Handling recurring cron schedule execution across serverless deployments",
      "Ensuring strict data isolation per authenticated Clerk user"
    ]
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    subtitle: "Enterprise Java & Spring Boot Operations Platform",
    description: "Architected a full-stack hospital management system using Java, Spring Boot, React, and PostgreSQL to manage patients, doctors, appointments, medical records, and hospital administrative workflows.",
    category: "Java Backend",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/Akshay-27-jain/Hospital-Management-System",
    githubUrl: "https://github.com/Akshay-27-jain/Hospital-Management-System",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "REST APIs"],
    problem: "Hospitals face paper record delays, appointment overlap errors, and cumbersome patient check-in workflows.",
    solution: "Centralized enterprise web platform delivering role-based dashboards, conflict-free appointment booking, and persistent electronic medical history.",
    keyFeatures: [
      "Patient Registration & Medical Record Management",
      "Doctor Shift Scheduling & Specialty Directory",
      "Engineered RESTful APIs and Role-Based Workflows (Admin, Doctor, Staff)",
      "Relational Database Schemas for Patient Records & Billing Data",
      "Responsive React Dashboards for Appointment Scheduling & Operations"
    ],
    results: [
      "Eliminated appointment scheduling collisions completely",
      "Streamlined patient record lookups across clinic staff",
      "Delivered robust role-based access security"
    ],
    futureImprovements: [
      "Add Telehealth video consultation portal",
      "Integrate automated SMS appointment notifications",
      "Incorporate HL7 / FHIR medical standards"
    ],
    architectureDiagram: {
      frontend: "React SPA with Tailwind CSS",
      backend: "Spring Boot REST Microservice Controller Layer",
      database: "PostgreSQL Relational DB",
      aiEngine: "Rules-Based Shift Validator & Schedule Conflict Checker",
      flowSteps: [
        "User accesses React dashboard and requests appointment",
        "Spring Boot REST Controller validates doctor schedule availability",
        "Data persisted transactionally in PostgreSQL",
        "Updated schedule pushed to admin and doctor portals"
      ]
    },
    databaseDesign: [
      "patients (id, first_name, last_name, contact, blood_group, created_at)",
      "doctors (id, name, specialization, fee, shift_schedule)",
      "appointments (id, patient_id, doctor_id, date, status, notes)",
      "medical_records (id, patient_id, diagnosis, prescription, date)"
    ],
    challenges: [
      "Designing clean relational database schemas for complex medical relationships",
      "Securing role-based authorization across patient data"
    ]
  },
  {
    id: "health-latency-ssl-monitoring",
    title: "Web Application Health & SSL Monitoring System",
    subtitle: "Synthetic Health, Latency & SSL Certificate Observability SaaS",
    description: "Engineered a full-stack observability platform using Java 21 and Spring Boot 3.4, performing real-time HTTP/HTTPS health checks and raw TCP probes with a multi-channel alert dispatcher (Slack, Discord, Webhooks, Java Mail).",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/Akshay-27-jain/Web-Application-Health-Response-Latency-SSL-Certificate-Expiry-Monitoring-System",
    githubUrl: "https://github.com/Akshay-27-jain/Web-Application-Health-Response-Latency-SSL-Certificate-Expiry-Monitoring-System",
    technologies: ["Java 21", "Spring Boot 3.4", "Spring Security", "JWT", "Spring Data JPA", "H2 Database", "Java Mail", "Webhooks"],
    problem: "System administrators lack unified visibility into domain uptime, SSL expiration risks, TCP port status, and web service degradation.",
    solution: "ChronosPulse probes HTTP status codes, SSL cert validity, TCP ports (Redis, Postgres, DNS), and latency continuously, dispatching instant webhooks/emails when outages occur.",
    keyFeatures: [
      "Real-Time HTTP/HTTPS Health Checks & TCP Probes (Redis, Postgres, DNS)",
      "Time-Series Metrics Persistence via Spring Data JPA & Latency Analytics (Min/Avg/Max)",
      "Multi-Channel Alert Dispatcher (Slack, Discord, Custom Webhooks, Java Mail HTML Alerts)",
      "Spring Security with JWT Authentication & BCrypt Hashing",
      "RBAC Security & SSRF-Defensive URL Validation",
      "Responsive Dark-Themed Dashboard with Live Filtering & Public Status Pages"
    ],
    results: [
      "Delivered sub-100ms domain & TCP port scanning speed",
      "Prevented SSL downtime risks with proactive warning alerts",
      "Zero SSRF security vulnerabilities verified through defensive URL validation"
    ],
    futureImprovements: [
      "Deploy distributed multi-region probe gateways",
      "Add anomaly detection for sudden latency spikes",
      "Integrate PagerDuty on-call escalation triggers"
    ],
    architectureDiagram: {
      frontend: "React Observability Dashboard with SVG Trend Charts",
      backend: "Java 21 & Spring Boot 3.4 Async Task Scheduler",
      database: "Spring Data JPA & Embedded H2 / PostgreSQL Store",
      aiEngine: "Synthetic Probe Engine & Latency Anomaly Evaluator",
      flowSteps: [
        "Spring Boot 3.4 scheduled worker executes HTTP/SSL & TCP probes",
        "Latency & SSL expiration metadata recorded via Spring Data JPA",
        "If status != 200 or SSL expiring, incident payload dispatched to Slack/Discord/Email webhooks",
        "Public status page updated dynamically with SVG trend charts"
      ]
    },
    databaseDesign: [
      "monitors (id, user_id, url, check_interval, status, last_checked)",
      "probe_logs (id, monitor_id, status_code, latency_ms, timestamp)",
      "ssl_certs (id, monitor_id, issuer, expiry_date, days_remaining)",
      "incidents (id, monitor_id, alert_type, payload, sent_at)"
    ],
    challenges: [
      "Preventing Server-Side Request Forgery (SSRF) vulnerabilities on user-supplied probe URLs",
      "Managing high-frequency asynchronous HTTP/TCP ping threads without memory overhead"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    skills: [
      { name: "Java", level: 94, iconName: "Coffee", description: "Core Java, OOP, Multithreading, Streams, Exception Handling", featured: true },
      { name: "Python", level: 88, iconName: "Code", description: "Scripting, FastAPI, Flask, Scikit-Learn, OpenCV", featured: true },
      { name: "JavaScript", level: 88, iconName: "FileCode", description: "ES6+, React, Next.js, Node.js, Async/Await", featured: true },
      { name: "SQL", level: 90, iconName: "Database", description: "Complex Queries, Joins, Relational Schema Design, Indexing", featured: true }
    ]
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Spring Boot", level: 92, iconName: "Server", description: "REST APIs, Spring Boot 3.4, Microservices Architecture", featured: true },
      { name: "Spring Security & JWT", level: 90, iconName: "ShieldCheck", description: "JWT Auth, BCrypt Hashing, RBAC, SSRF Prevention", featured: true },
      { name: "Spring Data JPA", level: 90, iconName: "Layers", description: "ORM Persistence, Repositories, Transaction Management", featured: true },
      { name: "REST APIs & Node.js", level: 92, iconName: "Globe", description: "REST API Design, Node.js, Express.js, Postman", featured: true }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 92, iconName: "Atom", description: "Custom Hooks, Context API, Reusable UI Components, Motion", featured: true },
      { name: "Next.js", level: 90, iconName: "Zap", description: "Next.js 15, Server Actions, App Router, SSR/SSG", featured: true }
    ]
  },
  {
    category: "Databases & ORM",
    skills: [
      { name: "PostgreSQL", level: 90, iconName: "Database", description: "Relational Schemas, Transactions, Indexing, Performance Tuning", featured: true },
      { name: "MySQL", level: 86, iconName: "Server", description: "ACID Transactions, Foreign Keys, Stored Procedures", featured: false },
      { name: "MongoDB", level: 84, iconName: "HardDrive", description: "NoSQL Document Collections, Aggregation Pipelines", featured: false },
      { name: "Prisma ORM", level: 88, iconName: "CheckSquare", description: "Type-Safe DB Client, Migrations, Relations", featured: true }
    ]
  },
  {
    category: "AI, Machine Learning & Tools",
    skills: [
      { name: "LLM APIs & Prompting", level: 90, iconName: "Sparkles", description: "Gemini API, LLM Services Integration, Prompt Engineering", featured: true },
      { name: "Tools & DevOps", level: 92, iconName: "Box", description: "Git, GitHub, Docker, Postman, Clerk, Resend", featured: true },
      { name: "Scikit-Learn & OpenCV", level: 84, iconName: "Activity", description: "Machine Learning Pipelines, Computer Vision Processing", featured: false }
    ]
  },
  {
    category: "Soft & Professional Skills",
    skills: [
      { name: "Problem Solving & DSA", level: 95, iconName: "Brain", description: "Algorithmic thinking, OOP principles, root cause debugging", featured: true },
      { name: "Effective Communication", level: 94, iconName: "MessageSquare", description: "Technical documentation, cross-functional collaboration", featured: true },
      { name: "Teamwork & Adaptability", level: 94, iconName: "Users", description: "Agile workflows, rapid tech adoption, team synergy", featured: true }
    ]
  }
];

export const EDUCATION: Education = {
  degree: "Bachelor of Technology (B.Tech) in Computer Engineering",
  institution: "Walchand Institute of Technology",
  location: "Solapur, Maharashtra, India",
  period: "2023 – Present (Pursuing)",
  status: "Undergraduate Degree",
  cgpa: "9.07 / 10.0",
  focusAreas: [
    "Java Enterprise Architecture",
    "Data Structures & Algorithms (DSA)",
    "Database Management Systems (DBMS)",
    "Operating Systems & Networks",
    "Full-Stack Web Development",
    "Spring Boot & REST API Design"
  ],
  highlights: [
    "Outstanding academic standing maintaining a 9.07 / 10.0 CGPA",
    "Hands-on engineering of production-style Java full-stack applications",
    "Deep technical focus in Data Structures & Algorithms, Object-Oriented Design, and Relational DBs"
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Virtual Intern — Java Full Stack Development",
    organization: "Infosys Springboard",
    period: "August 2026 – Present (Ongoing)",
    type: "Virtual Internship",
    description: "Completing hands-on assignments in Java full-stack development, strengthening backend architecture, enterprise application design, and practical software engineering skills.",
    highlights: [
      "Completing hands-on assignments in Java full-stack development",
      "Strengthening backend architecture, Spring Boot microservices, and enterprise web application design",
      "Demonstrating practical software engineering skills across full-stack assignments"
    ],
    technologies: ["Java", "Spring Boot", "REST APIs", "SQL", "React", "Web Technologies"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-hackerrank-java",
    title: "HackerRank Java (Basic) Certification",
    category: "Java Engineering",
    description: "Earned Certificate of Accomplishment for passing HackerRank's Java (Basic) skill certification test, validating core Java programming fundamentals.",
    metric: "Aug 2026",
    icon: "Coffee"
  },
  {
    id: "ach-citi",
    title: "Citi Technology Software Development Job Simulation",
    category: "Software Engineering",
    description: "Completed practical tasks including creating state diagrams, feature proposals, web data querying, and live data visualization on Forage.",
    metric: "Aug 2026",
    icon: "Award"
  },
  {
    id: "ach-nasscom",
    title: "Nasscom AI Code Sarathi Workshop",
    category: "AI & Innovation",
    description: "Completed AI-Assisted Coding Workshop; hands-on prompt engineering practice via Nasscom's prompt-to-production repo.",
    metric: "Mar – Apr 2026",
    icon: "Sparkles"
  },
  {
    id: "ach-cgpa",
    title: "Outstanding Academic CGPA",
    category: "Academic Excellence",
    description: "Maintained a 9.07 / 10.0 CGPA at Walchand Institute of Technology while building production software.",
    metric: "9.07 / 10.0 CGPA",
    icon: "GraduationCap"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-hackerrank-java",
    title: "HackerRank Java (Basic) Certification",
    issuer: "HackerRank",
    date: "Aug 2026",
    credentialId: "FFC4C4FA08EA",
    verifyUrl: "https://www.hackerrank.com/certificates/FFC4C4FA08EA",
    badgeColor: "from-emerald-500 via-teal-600 to-cyan-600"
  },
  {
    id: "cert-citi-forage",
    title: "Citi Technology Software Development Job Simulation",
    issuer: "Forage",
    date: "Aug 2026",
    credentialId: "6a79fcd821f7d70710259b64",
    verifyUrl: "https://github.com/Akshay-27-jain",
    badgeColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "cert-nasscom-ai",
    title: "Nasscom AI Code Sarathi — AI-assisted Coding Workshop",
    issuer: "Nasscom AI",
    date: "Mar – Apr 2026",
    credentialId: "NASSCOM-AI-SARATHI-2026",
    verifyUrl: "https://github.com/Akshay-27-jain",
    badgeColor: "from-rose-500 via-red-600 to-amber-600"
  }
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    name: "GitHub",
    username: "Akshay-27-jain",
    url: "https://github.com/Akshay-27-jain",
    icon: "Github",
    stats: "Full Stack & Java Projects",
    badge: "Active Contributor"
  },
  {
    name: "LinkedIn",
    username: "akshayjain",
    url: "https://www.linkedin.com/in/akshayjain",
    icon: "Linkedin",
    stats: "Professional Network",
    badge: "Connected"
  },
  {
    name: "HackerRank",
    username: "jainakshay0804",
    url: "https://www.hackerrank.com/profile/jainakshay0804",
    icon: "Terminal",
    stats: "Java (Basic) Certified",
    badge: "Verified Profile"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Real-Time Web Observability with Java 21 & Spring Boot 3.4",
    category: "Java & Backend Architecture",
    excerpt: "Architecting a full-stack observability platform for HTTP health checks, TCP probes, latency analytics, and JWT security with SSRF protection.",
    content: `Observability is crucial for modern enterprise web applications. When building our Health & SSL Monitoring System:

1. Leveraged Java 21 & Spring Boot 3.4 for real-time HTTP/HTTPS checks and raw TCP port probes (Redis, Postgres, DNS).
2. Secured endpoints with Spring Security, JWT authentication, BCrypt hashing, and SSRF-defensive URL validation.
3. Persisted metrics via Spring Data JPA to render dynamic SVG latency analytics charts and automated public status pages.`,
    date: "Aug 2026",
    readTime: "5 min read",
    tags: ["Java 21", "Spring Boot 3.4", "Spring Security", "JWT", "Observability"]
  },
  {
    id: "blog-2",
    title: "Full-Stack Subscription Management with Next.js, Prisma & Clerk",
    category: "Full Stack Development",
    excerpt: "How Subscription Tracker handles recurring billing cycles, Clerk user authentication, Recharts analytics, and automated Resend email reminders.",
    content: `Managing recurring subscriptions requires reliable countdown triggers and intuitive spending breakdowns:

1. Built Next.js 15 app router architecture with Prisma ORM for type-safe PostgreSQL access.
2. Implemented Clerk authentication and automated Resend email alerts prior to renewal dates.
3. Designed interactive Recharts spending dashboards with reusable React UI components.`,
    date: "Jul 2026",
    readTime: "4 min read",
    tags: ["Next.js", "React", "Prisma", "PostgreSQL", "Clerk"]
  }
];

export const TESTIMONIALS = [];
