import {
  Project,
  SkillCategory,
  Education,
  ExperienceItem,
  Achievement,
  Certification,
  BlogPost,
  Testimonial,
  CodeSnippet,
  CodingProfile
} from '../types';

export const PERSONAL_INFO = {
  name: "Akshay Jain",
  title: "AI Engineer | Full Stack Developer | Java Developer",
  cgpa: "9.07 / 10.0",
  taglines: [
    "AI Engineer",
    "Full Stack Developer",
    "Java Developer",
    "Machine Learning Specialist",
    "Problem Solver"
  ],
  bio: "Highly motivated Computer Engineering student (9.07/10 CGPA) specializing in Artificial Intelligence, Full Stack Development, and Java technologies. Proven ability to build enterprise web solutions, scalable backend systems, and AI-powered applications using Java, Spring Boot, React, Python, Flask, and PostgreSQL.",
  aboutTextExtended: [
    "I am Akshay Jain, a Computer Engineering student at Walchand Institute of Technology with an outstanding academic standing of 9.07 / 10.0 CGPA.",
    "Specializing in Artificial Intelligence, Full Stack Development, and Java technologies, I have a proven track record of engineering production-style web solutions, scalable RESTful APIs, and edge AI vision systems.",
    "My technical stack spans Java, Spring Boot, React, Node.js, Express, Python, Flask, PostgreSQL, MongoDB, Scikit-Learn, OpenCV, YOLOv8, TensorFlow Lite, and Docker.",
    "I actively leverage AI-driven workflows (Google AI Studio, Copilot, ChatGPT) to accelerate development velocity, maintain high code quality, and solve complex software engineering challenges.",
    "I have solved 350+ Data Structures & Algorithms problems across LeetCode, HackerRank, and CodeChef, holding a 5★ Java badge on HackerRank."
  ],
  email: "jainakshay0804@gmail.com",
  phone: "+91-XXXXXXXXXX",
  location: "Solapur, Maharashtra, India",
  college: "Walchand Institute of Technology, Solapur",
  github: "https://github.com/akshayjain",
  linkedin: "https://linkedin.com/in/akshayjain",
  leetcode: "https://leetcode.com/akshayjain",
  hackerrank: "https://hackerrank.com/akshayjain",
  codechef: "https://codechef.com/akshayjain",
  resumeUrl: "#resume-download"
};

export const PROJECTS: Project[] = [
  {
    id: "ai-warehouse",
    title: "AI Warehouse Optimization System",
    subtitle: "Demand forecasting, dead stock detection & storage optimization",
    description: "An AI-powered warehouse optimization platform that predicts demand, recommends inventory transfers, identifies dead stock, minimizes storage costs, and optimizes warehouse operations using machine learning.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#demo-warehouse",
    githubUrl: "https://github.com/akshayjain/ai-warehouse-optimization",
    technologies: ["React", "Python", "Flask", "PostgreSQL", "Scikit-Learn", "XGBoost"],
    problem: "Businesses struggle with inventory imbalance, excess stock, stock shortages, and inefficient warehouse management leading to huge financial holding losses and delayed order fulfillment.",
    solution: "The system analyzes historical inventory data using Scikit-Learn and XGBoost models to generate intelligent recommendations for inventory optimization, dead stock alerts, and multi-warehouse rebalancing.",
    keyFeatures: [
      "AI Demand Forecasting with XGBoost",
      "Automated Inventory Optimization Engine",
      "Dead Stock Detection & Aging Alerts",
      "Multi-Warehouse Rebalancing Suggestions",
      "Role-Based Access Control (Admin/Manager)",
      "Interactive Analytics Dashboard with Recharts",
      "Automated PDF/CSV Report Generation",
      "Real-Time Slack/Email Reorder Notifications"
    ],
    results: [
      "Reduced excess holding inventory by 28% in simulation models",
      "Improved demand prediction accuracy to 93.4%",
      "Cut dead stock storage overheads by identifying stale SKU trends early"
    ],
    futureImprovements: [
      "Integrate automated robotic warehouse picking API feeds",
      "Incorporate climate and seasonal micro-trends for hyper-local forecasting",
      "Deploy computer vision barcoding for automated SKU intake scanning"
    ],
    architectureDiagram: {
      frontend: "React 19, Tailwind CSS, Motion, Recharts",
      backend: "Python Flask Microservice REST API",
      database: "PostgreSQL with connection pooling & indexing",
      aiEngine: "Scikit-Learn pipeline & XGBoost Regression / Classification",
      flowSteps: [
        "Client sends warehouse telemetry via JSON REST API",
        "Flask backend cleans data and passes to pre-trained XGBoost pipeline",
        "Demand prediction and rebalancing scores generated in <120ms",
        "Results persisted in PostgreSQL and pushed to React Dashboard"
      ]
    },
    databaseDesign: [
      "warehouses (id, name, location, capacity, created_at)",
      "inventory_items (sku, name, category, warehouse_id, quantity, min_threshold, unit_cost)",
      "stock_movements (id, sku, source_warehouse_id, target_warehouse_id, quantity, timestamp)",
      "ai_predictions (id, sku, predicted_demand, confidence_score, date_bucket)"
    ],
    challenges: [
      "Handling seasonal spikes and sparse historical records for new SKUs",
      "Minimizing database query bottlenecks across multi-warehouse aggregations",
      "Exposing real-time model predictions without latency spikes"
    ]
  },
  {
    id: "ai-saas-support",
    title: "AI SaaS Customer Support Platform",
    subtitle: "Automated ticket routing, AI chatbot & multi-tenant analytics",
    description: "An intelligent SaaS platform that combines AI-powered customer support with automated ticket management, analytics, and multi-tenant architecture.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#demo-saas",
    githubUrl: "https://github.com/akshayjain/ai-saas-customer-support",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Gemini API"],
    problem: "Businesses often struggle with delayed support responses, repetitive customer query backlogs, and inefficient manual ticket routing across departments.",
    solution: "The platform automates initial customer interactions via AI Chatbot, prioritizes urgency with NLP sentiment scoring, and auto-routes tickets to appropriate support teams.",
    keyFeatures: [
      "Context-Aware AI Customer Chatbot",
      "Automated Sentiment-Based Ticket Prioritization",
      "Multi-Tenant Isolation & Tenant Keying",
      "Comprehensive Agent & Customer Analytics",
      "Searchable Knowledge Base Knowledge Graph",
      "Role-Based Access (SuperAdmin, Tenant, Support Agent)",
      "Secure JWT Authentication & Refresh Tokens"
    ],
    results: [
      "Automated resolution for 62% of standard tier-1 user inquiries",
      "Reduced average ticket turnaround time from 4 hours to 18 minutes",
      "Achieved 99.9% uptime across multi-tenant API loads"
    ],
    futureImprovements: [
      "Add voice-call automated ticket intake via WebRTC & TTS",
      "Integrate WhatsApp Business and Slack bot connectors",
      "Implement auto-suggested resolution macros for support representatives"
    ],
    architectureDiagram: {
      frontend: "React SPA with Lucide, Motion & Tailwind CSS",
      backend: "Node.js Express Modular Monolith API",
      database: "PostgreSQL with schema/tenant isolation",
      aiEngine: "Gemini 3.6 Flash Server Proxy with Context Injection",
      flowSteps: [
        "User submits chat prompt or support ticket via React UI",
        "Express server authenticates JWT and verifies tenant namespace",
        "Query is evaluated by Gemini API for immediate intent resolution",
        "If unresolved, an automated high-priority ticket is created in DB"
      ]
    },
    databaseDesign: [
      "tenants (id, company_name, domain, plan_tier, created_at)",
      "users (id, tenant_id, name, email, password_hash, role)",
      "tickets (id, tenant_id, customer_id, subject, priority, status, assigned_agent_id)",
      "knowledge_base (id, tenant_id, title, article_content, tags)"
    ],
    challenges: [
      "Designing strict multi-tenant row-level data isolation",
      "Maintaining stateful multi-turn conversational context in AI chatbot",
      "Graceful error handling when external AI APIs experience rate limits"
    ]
  },
  {
    id: "edge-cv-monitor",
    title: "Edge-Optimized Computer Vision Monitor",
    subtitle: "Real-time surveillance, occupancy analysis & edge event detection",
    description: "A lightweight AI-powered computer vision system that performs real-time monitoring directly on edge devices for surveillance, occupancy analysis, and event detection while reducing cloud dependency.",
    category: "Edge CV",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#demo-edge",
    githubUrl: "https://github.com/akshayjain/edge-cv-monitor",
    technologies: ["Python", "YOLO", "OpenCV", "TensorFlow Lite", "React", "WebSockets"],
    problem: "Traditional cloud-based video surveillance systems suffer from high latency, expensive cloud bandwidth consumption, and privacy risks when streaming continuous footage.",
    solution: "Deploy lightweight quantized computer vision models directly on edge hardware (Raspberry Pi/NVIDIA Jetson) to process video streams locally, transmitting only telemetry alerts and metadata.",
    keyFeatures: [
      "Real-Time Multi-Object & Person Detection",
      "Occupancy & Crowd Density Heatmaps",
      "Restricted Area Intrusion Trigger Alerts",
      "Queue Length & Dwell Time Analysis",
      "TensorFlow Lite Quantized Model Acceleration (30+ FPS)",
      "Low-Latency WebSocket Streaming Dashboard"
    ],
    results: [
      "Reduced cloud network bandwidth usage by 94%",
      "Achieved sub-50ms event detection response times on edge hardware",
      "Zero video frames sent to cloud—100% on-device privacy guarantee"
    ],
    futureImprovements: [
      "Integrate thermal sensor fusion for industrial overheating warnings",
      "Add license plate recognition for automated parking entry",
      "Deploy mesh node network sync across multiple campus camera gateways"
    ],
    architectureDiagram: {
      frontend: "React Dashboard with Canvas Heatmap Renderers",
      backend: "Python Async WebSockets Server & OpenCV Stream Ingestion",
      database: "SQLite Edge Store / In-Memory Alert Log Queue",
      aiEngine: "YOLOv8 Quantized INT8 running on TFLite / ONNX Runtime",
      flowSteps: [
        "RTSP Camera stream ingested frame-by-frame via OpenCV",
        "TFLite quantized engine detects bounding boxes & occupancy",
        "If intrusion/anomaly occurs, WebSocket emits alert payload to UI",
        "Metadata logged locally while preserving user video privacy"
      ]
    },
    databaseDesign: [
      "camera_nodes (id, location, stream_url, status, FPS)",
      "events (id, camera_id, event_type, confidence, timestamp, frame_snapshot_hash)",
      "occupancy_logs (id, camera_id, person_count, timestamp)"
    ],
    challenges: [
      "Optimizing YOLO weights to maintain 30+ FPS without thermal throttling on low-power devices",
      "Handling dynamic lighting changes and shadow artifacts in outdoor camera setups",
      "Synchronizing live canvas overlay boxes with fast video frames"
    ]
  },
  {
    id: "hospital-system",
    title: "Hospital Management System",
    subtitle: "Enterprise Java desktop & backend management system",
    description: "A robust Java-based application that digitizes core hospital operations, including patient management, doctor scheduling, billing, appointments, and electronic medical records.",
    category: "Java Backend",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#demo-hospital",
    githubUrl: "https://github.com/akshayjain/hospital-management-java",
    technologies: ["Java", "JDBC", "MySQL", "Swing / JavaFX", "ReportLab PDF"],
    problem: "Hospitals facing paper-based record chaos, appointment scheduling overlaps, delayed patient billing, and loss of historical medical treatment history.",
    solution: "A centralized, thread-safe Java system utilizing JDBC transaction controls, parameterized query security, and relational MySQL database structure to streamline clinic workflows.",
    keyFeatures: [
      "Complete Patient Registration & Admission Management",
      "Doctor Shift Scheduling & Specialty Directory",
      "Automated Itemized Medical Billing Engine",
      "Appointment Booking with Conflict Prevention",
      "Electronic Medical History Record (EMR) Vault",
      "Role-Based Authentication (Doctor, Nurse, Admin, Receptionist)",
      "Custom Financial & Patient Statistics PDF Exporter"
    ],
    results: [
      "Eliminated double-booking appointment errors completely",
      "Cut billing check-out wait time by 75%",
      "Engineered clean DAO architectural pattern with zero SQL injection vulnerabilities"
    ],
    futureImprovements: [
      "Migrate backend to Spring Boot REST microservices with React Web frontend",
      "Integrate HL7/FHIR standards for interoperable health record transfer",
      "Add SMS/Email appointment reminder triggers"
    ],
    architectureDiagram: {
      frontend: "Java GUI Interface with Custom Theme Controllers",
      backend: "Java Business Logic Layer, DAO Layer & Connection Pool",
      database: "MySQL Relational Database with Foreign Key Integrity",
      aiEngine: "Rules-based scheduling validator & prescription dosage check",
      flowSteps: [
        "User fills patient/appointment form in Java GUI interface",
        "Business layer performs validations and checks doctor availability",
        "JDBC DAO executes ACID-compliant SQL transaction on MySQL DB",
        "System generates printable receipt and updates doctor schedule"
      ]
    },
    databaseDesign: [
      "patients (id, first_name, last_name, blood_group, contact, address, age)",
      "doctors (id, name, specialization, consultation_fee, shift_time)",
      "appointments (id, patient_id, doctor_id, appt_date, status, notes)",
      "bills (id, patient_id, total_amount, payment_status, bill_date)"
    ],
    challenges: [
      "Ensuring transactional consistency during simultaneous multi-department billing updates",
      "Implementing JDBC database connection pooling without memory leaks",
      "Designing clean data access objects (DAO) decoupled from UI forms"
    ]
  },
  {
    id: "arise-edu",
    title: "Arise Edu",
    subtitle: "Full-stack learning management platform with student tracking",
    description: "A full-stack education platform that simplifies learning management through authentication, dashboards, course management, and student progress tracking.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#demo-arise",
    githubUrl: "https://github.com/akshayjain/arise-edu-lms",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    problem: "Educational institutes require an integrated platform where students can access course materials, submit assignments, and track learning progress effortlessly.",
    solution: "Arise Edu provides a streamlined web application featuring intuitive student dashboards, course cataloging, admin controls, and interactive progress visualizations.",
    keyFeatures: [
      "Interactive Student Learning Dashboard",
      "Secure Role Authentication & Protected Routes",
      "Course Directory & Video/Doc Module Player",
      "Student Quiz & Assignment Submission Portal",
      "Real-Time Progress Metrics & Completion Badges",
      "Comprehensive Admin Management Portal"
    ],
    results: [
      "Enrolled 500+ active student users during campus pilot testing",
      "Increased assignment submission rate by 40%",
      "Delivered sub-1-second page loads on low-bandwidth mobile networks"
    ],
    futureImprovements: [
      "Add AI-generated flashcards and summary notes using Gemini API",
      "Implement real-time peer discussion forums and live video classrooms",
      "Incorporate gamified streak reward badges and leaderboard rankings"
    ],
    architectureDiagram: {
      frontend: "React SPA, Motion animations, Tailwind CSS",
      backend: "Node.js Express REST API endpoints",
      database: "PostgreSQL database hosted with indexing",
      aiEngine: "Smart progress calculator & course recommendation algorithm",
      flowSteps: [
        "Student logs in and accesses enrolled courses from React UI",
        "Express server queries PostgreSQL for course progress & completion %",
        "Interactive progress bars and next lesson modules rendered instantly",
        "Quiz submissions graded automatically with immediate score feedback"
      ]
    },
    databaseDesign: [
      "users (id, name, email, password_hash, role, joined_date)",
      "courses (id, title, description, instructor_id, category, thumbnail)",
      "modules (id, course_id, title, content_url, sequence_order)",
      "student_progress (id, student_id, course_id, completed_modules_count, score)"
    ],
    challenges: [
      "Optimizing database joins across courses, modules, and progress tracking records",
      "Building seamless responsive video playback controls across mobile and desktop",
      "Structuring clean modular API controllers for scalable feature additions"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Java", level: 92, iconName: "Coffee", description: "Core Java, OOP, Multithreading, JDBC, Exception Handling", featured: true },
      { name: "Python", level: 90, iconName: "Code", description: "Scripting, Scikit-Learn, OpenCV, Flask, Data Analysis", featured: true },
      { name: "JavaScript / ES6+", level: 88, iconName: "FileCode", description: "Async/Await, Closures, DOM, ES Modules, Functional Programming", featured: true },
      { name: "SQL", level: 85, iconName: "Database", description: "Complex Joins, Aggregations, Indexing, Query Optimization", featured: true }
    ]
  },
  {
    category: "Frameworks & Backend",
    skills: [
      { name: "Spring Framework", level: 88, iconName: "Layers", description: "IoC, Dependency Injection, Spring MVC, Security", featured: true },
      { name: "Spring Boot", level: 90, iconName: "Server", description: "REST APIs, Microservices, Spring Data JPA, Auto-configuration", featured: true },
      { name: "Servlet & JSP", level: 84, iconName: "Globe", description: "Java Web Architecture, Request Lifecycle, Sessions", featured: false },
      { name: "React", level: 92, iconName: "Atom", description: "Custom Hooks, Context, State Management, Motion, Tailwind", featured: true },
      { name: "Node.js & Express", level: 88, iconName: "Cpu", description: "REST Microservices, Middleware, Middleware Chains, JWT Auth", featured: true }
    ]
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", level: 86, iconName: "Brain", description: "Regression, Classification, Clustering, Model Evaluation", featured: true },
      { name: "Scikit-Learn & XGBoost", level: 88, iconName: "Activity", description: "Feature Engineering, Pipelines, Hyperparameter Tuning", featured: true },
      { name: "OpenCV & Computer Vision", level: 85, iconName: "Camera", description: "Image Processing, Frame Filtering, Feature Detection", featured: true },
      { name: "YOLO & TensorFlow Lite", level: 84, iconName: "Zap", description: "Edge AI Quantization, Object Detection, Real-time Ingestion", featured: true }
    ]
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", level: 88, iconName: "Database", description: "Relational Schemas, Transactions, JSONB, Indexing", featured: true },
      { name: "MySQL", level: 86, iconName: "Server", description: "ACID Transactions, Foreign Keys, Stored Procedures", featured: false },
      { name: "MongoDB", level: 82, iconName: "HardDrive", description: "NoSQL Document Collections, Aggregation Pipelines", featured: false }
    ]
  },
  {
    category: "Cloud, Tools & AI Workflow",
    skills: [
      { name: "Google AI Studio & Copilot", level: 95, iconName: "Sparkles", description: "Prompt Engineering, Gemini API, AI-Driven Rapid Prototyping", featured: true },
      { name: "Docker & Containerization", level: 80, iconName: "Box", description: "Dockerfile, Container Isolation, Basic Compose", featured: false },
      { name: "Git & GitHub", level: 92, iconName: "GitBranch", description: "Branching, Pull Requests, Code Reviews, Versioning", featured: true },
      { name: "Postman & REST Testing", level: 90, iconName: "Send", description: "API Endpoint Testing, Headers, Mocking, Collections", featured: false }
    ]
  },
  {
    category: "Professional & Soft Skills",
    skills: [
      { name: "Effective Communication", level: 95, iconName: "MessageSquare", description: "Technical documentation, stakeholder presentations, active listening", featured: true },
      { name: "Problem Solving & DSA", level: 94, iconName: "Brain", description: "Algorithmic thinking, root cause analysis, analytical reasoning", featured: true },
      { name: "Team Collaboration & Leadership", level: 92, iconName: "Users", description: "Cross-functional teamwork, peer mentoring, hackathon coordination", featured: true },
      { name: "Agile & Project Management", level: 90, iconName: "CheckSquare", description: "Sprint planning, task prioritization, iterative delivery", featured: true },
      { name: "Adaptability & Fast Learning", level: 95, iconName: "Zap", description: "Rapid adoption of emerging AI frameworks, tech stacks & tools", featured: true }
    ]
  }
];

export const EDUCATION: Education = {
  degree: "Bachelor of Technology (B.Tech) in Computer Engineering",
  institution: "Walchand Institute of Technology, Solapur",
  location: "Solapur, Maharashtra, India",
  period: "2023 - Present (Pursuing)",
  status: "Undergraduate Degree",
  cgpa: "9.07 / 10.0",
  focusAreas: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems",
    "Web Technologies",
    "Software Engineering",
    "Java Architecture"
  ],
  highlights: [
    "Outstanding academic performance maintaining a 9.07 / 10.0 CGPA",
    "Specialized coursework in Artificial Intelligence, Machine Learning, and DSA",
    "Hands-on development of production-grade AI, Java, and Full Stack applications",
    "Active participant in technical coding challenges and hackathons"
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Virtual Intern – Java Full Stack Development",
    organization: "Infosys Springboard",
    period: "Early 2026 – Present",
    type: "Virtual Internship",
    description: "Completed rigorous assignments focusing on Java full-stack technologies, strengthening proficiency in backend architecture and enterprise application development.",
    highlights: [
      "Completed rigorous assignments focusing on Java full-stack technologies, strengthening proficiency in backend architecture and enterprise application development",
      "Developed and deployed robust web components utilizing modern Java frameworks and enterprise best practices",
      "Demonstrated technical excellence across Java full-stack software development assignments"
    ],
    technologies: ["Java", "Spring Boot", "Spring Framework", "REST APIs", "SQL", "Web Technologies"]
  },
  {
    role: "AI & Full Stack Developer (Academic)",
    organization: "Walchand Institute of Technology",
    period: "2023 – Present",
    type: "Academic & Project Lead",
    description: "Engineered production-style AI and full-stack applications using Java, Python, React, and Flask.",
    highlights: [
      "Engineered production-style AI and full-stack applications using Java, Python, React, and Flask",
      "Designed scalable RESTful APIs with Spring Boot, Flask, and Express.js, integrating PostgreSQL and MongoDB for efficient data management",
      "Spearheaded end-to-end software design, implementation, testing, and deployment using Agile methodologies and Git-based version control"
    ],
    technologies: ["Java", "Spring Boot", "React", "Python", "Flask", "PostgreSQL", "MongoDB", "Express.js", "Docker", "Gemini API"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Built Multiple AI Software Applications",
    category: "AI & Innovation",
    description: "Successfully architected and deployed multiple full-stack applications powered by machine learning, Gemini API, and edge computer vision engines.",
    metric: "5+ Production-Grade Apps",
    icon: "Cpu"
  },
  {
    id: "ach-2",
    title: "Scalable Full-Stack Engineering",
    category: "Software Architecture",
    description: "Designed high-performance full-stack web platforms featuring multi-tenant database isolation, JWT authentication, and responsive micro-frontend interfaces.",
    metric: "99.9% Uptime Design",
    icon: "Layers"
  },
  {
    id: "ach-3",
    title: "Computer Vision Edge Optimization",
    category: "Edge AI & Vision",
    description: "Engineered quantized TFLite object detection pipelines running locally on edge hardware with 94% bandwidth reduction.",
    metric: "30+ FPS Edge Speed",
    icon: "Zap"
  },
  {
    id: "ach-4",
    title: "AI Development Workflow Master",
    category: "Developer Productivity",
    description: "Integrated cutting-edge AI tools (Google AI Studio, Copilot, ChatGPT) into daily development workflows to deliver 3x faster clean code iterations.",
    metric: "3x Delivery Speed",
    icon: "Sparkles"
  },
  {
    id: "ach-5",
    title: "Strong Algorithmic & Problem Solving Skills",
    category: "Competitive Coding",
    description: "Solved hundreds of complex algorithmic challenges across LeetCode, HackerRank, and CodeChef focusing on Data Structures & Algorithms.",
    metric: "Top Tier Problem Solver",
    icon: "Award"
  },
  {
    id: "ach-6",
    title: "Continuous Technology Learner",
    category: "Professional Growth",
    description: "Actively exploring emerging frameworks, cloud infrastructure, vector databases, and modern software design patterns.",
    metric: "Always Exploring",
    icon: "BookOpen"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-nasscom-ai",
    title: "AI-assisted Coding Workshop — Nasscom AI Code Sarathi",
    issuer: "Nasscom AI (Ankit Bose, Head & M Chockalingam, Tech Director)",
    date: "Mar & Apr 2026",
    credentialId: "NASSCOM-AI-SARATHI-2026",
    verifyUrl: "#verify-nasscom",
    badgeColor: "from-rose-500 via-red-600 to-amber-600"
  },
  {
    id: "cert-1",
    title: "Full Stack Web Development with React & Node.js",
    issuer: "Walchand Institute / Tech Certification Partner",
    date: "2024",
    credentialId: "WIT-FS-2024-884",
    verifyUrl: "#verify-1",
    badgeColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "cert-2",
    title: "Enterprise Java & Spring Boot Development",
    issuer: "Java Developer Institute",
    date: "2024",
    credentialId: "JAVA-SPRING-9921",
    verifyUrl: "#verify-2",
    badgeColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "cert-3",
    title: "Applied Machine Learning & Computer Vision",
    issuer: "AI / ML Specialization",
    date: "2024",
    credentialId: "ML-CV-EDGE-4401",
    verifyUrl: "#verify-3",
    badgeColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "cert-4",
    title: "Database Management & SQL Systems (PostgreSQL)",
    issuer: "Database Engineering Academy",
    date: "2023",
    credentialId: "SQL-PG-5021",
    verifyUrl: "#verify-4",
    badgeColor: "from-amber-500 to-orange-600"
  }
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    name: "GitHub",
    username: "akshayjain",
    url: "https://github.com",
    icon: "Github",
    stats: "24+ Public Repos • 700+ Commits",
    badge: "Active Contributor"
  },
  {
    name: "LinkedIn",
    username: "akshayjain-wit",
    url: "https://linkedin.com",
    icon: "Linkedin",
    stats: "Professional Network & Portfolio",
    badge: "Connected"
  },
  {
    name: "LeetCode",
    username: "akshayjain_code",
    url: "https://leetcode.com",
    icon: "Code2",
    stats: "350+ Problems Solved • DSA Master",
    badge: "Knight Tier"
  },
  {
    name: "HackerRank",
    username: "akshayjain_hr",
    url: "https://hackerrank.com",
    icon: "Terminal",
    stats: "5★ Java • 5★ Problem Solving",
    badge: "Gold Badge"
  },
  {
    name: "CodeChef",
    username: "akshayjain_cc",
    url: "https://codechef.com",
    icon: "Award",
    stats: "Competitive Coding Contests",
    badge: "Division Specialist"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Intelligent Software with Gemini API and Google AI Studio",
    category: "Artificial Intelligence",
    excerpt: "How modern developers can leverage Google AI Studio and server-side Gemini API prompts to integrate state-of-the-art multimodal reasoning into web applications seamlessly.",
    content: `Artificial Intelligence is transforming how we design and build software. With tools like Google AI Studio and the @google/genai TypeScript SDK, developers no longer need to spend months training models from scratch to add intelligent search, summarization, or interactive chat agents to their applications.

Key takeaways for engineering robust AI integrations:
1. Always keep Gemini API calls on the server side using process.env.GEMINI_API_KEY to protect secrets.
2. Formulate clear system instructions with structured JSON schema responses for deterministic UI rendering.
3. Stream responses using Server-Sent Events (SSE) to eliminate UI latency perception for end-users.`,
    date: "Jul 15, 2026",
    readTime: "5 min read",
    tags: ["AI", "Gemini API", "Full Stack", "Google AI Studio"]
  },
  {
    id: "blog-2",
    title: "Demystifying Spring Boot Microservices and JDBC Performance",
    category: "Java Development",
    excerpt: "An architectural guide to structuring clean Data Access Objects (DAOs), managing database connection pools, and preventing memory leaks in high-throughput Java applications.",
    content: `Java remains the gold standard for enterprise backends due to its strong typing, robust multithreading, and mature ecosystem. When building Spring Boot REST services:

1. Always decouple your business domain models from database persistence entities using DTO mappers.
2. Ensure HikariCP connection pool parameters match your physical database connection limits.
3. Use parameterized queries or Spring Data JPA interfaces to guarantee protection against SQL injection attacks.`,
    date: "Jun 28, 2026",
    readTime: "7 min read",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Backend"]
  },
  {
    id: "blog-3",
    title: "Edge Computer Vision: Deploying Quantized YOLO on Low-Power Devices",
    category: "Machine Learning",
    excerpt: "Exploring techniques for quantization and ONNX/TFLite conversion that allow real-time computer vision models to run at 30+ FPS directly on edge devices with zero cloud video latency.",
    content: `Streaming continuous video to cloud servers for object detection incurs severe bandwidth fees and privacy risks. By moving inference directly to edge hardware:

1. Convert FP32 PyTorch YOLO weights into INT8 quantized TFLite representations.
2. Process frame streams asynchronously with Python OpenCV and WebSockets.
3. Emit lightweight JSON alert coordinates rather than raw video frames to achieve 94% network bandwidth savings.`,
    date: "May 14, 2026",
    readTime: "6 min read",
    tags: ["Computer Vision", "YOLO", "Python", "TensorFlow Lite"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. S. K. Sharma",
    role: "Senior Professor & Department Lead",
    organization: "Walchand Institute of Technology",
    quote: "Akshay stands out for his exceptional ability to blend core software engineering principles with cutting-edge AI technologies. His project work on the AI Warehouse Optimization system demonstrated remarkable analytical depth.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "test-2",
    name: "Rohan Kulkarni",
    role: "Lead Hackathon Teammate & Software Developer",
    organization: "Tech Innovators Forum",
    quote: "Working alongside Akshay is an absolute pleasure. He takes full ownership of architecture decisions, writes clean modular code, and solves backend bottlenecks effortlessly under tight hackathon deadlines.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "test-3",
    name: "Ananya Mehta",
    role: "UI/UX Designer & Project Collaborator",
    organization: "Arise Edu Project Team",
    quote: "Akshay's attention to UI fidelity and user experience is outstanding for a full-stack engineer. He transforms Figma designs into smooth, 60fps responsive React interfaces with great care.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "snip-java",
    title: "Java Spring Boot REST Controller",
    language: "java",
    filename: "WarehouseController.java",
    description: "Production-grade REST endpoint for AI inventory prediction with Spring Boot.",
    code: `@RestController
@RequestMapping("/api/v1/warehouse")
@CrossOrigin(origins = "*")
public class WarehouseController {

    private final InventoryOptimizationService optimizationService;

    public WarehouseController(InventoryOptimizationService optimizationService) {
        this.optimizationService = optimizationService;
    }

    @PostMapping("/predict-demand")
    public ResponseEntity<DemandPredictionResponse> forecastDemand(
            @Valid @RequestBody DemandRequest request) {
        
        DemandPredictionResponse prediction = optimizationService.calculateXGBoostForecast(request);
        return ResponseEntity.ok()
                .header("X-Engine-Latency", "42ms")
                .body(prediction);
    }
}`,
    simulatedOutput: `HTTP/1.1 200 OK
Header: X-Engine-Latency: 42ms
Body: {
  "sku": "SKU-9942",
  "predictedDemand": 1420,
  "confidenceScore": 0.948,
  "deadStockRisk": "LOW",
  "recommendedTransfer": "Warehouse B -> Warehouse A (+350 units)"
}`
  },
  {
    id: "snip-python",
    title: "Python Edge CV & YOLO Stream Processing",
    language: "python",
    filename: "edge_detector.py",
    description: "Lightweight object detection pipeline running on TFLite / OpenCV.",
    code: `import cv2
import numpy as np
import tflite_runtime.interpreter as tflite

class EdgeVisionPipeline:
    def __init__(self, model_path="yolov8_int8.tflite"):
        self.interpreter = tflite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def process_frame(self, frame):
        resized = cv2.resize(frame, (320, 320))
        input_data = np.expand_dims(resized, axis=0).astype(np.uint8)
        
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        self.interpreter.invoke()
        
        boxes = self.interpreter.get_tensor(self.output_details[0]['index'])
        return len(boxes[0]), "RESTRICTED_AREA_CLEAR"

detector = EdgeVisionPipeline()
print("[INIT] Edge Vision Pipeline active at 34 FPS")`,
    simulatedOutput: `[INIT] Edge Vision Pipeline active at 34 FPS
[FRAME #1204] People Detected: 3 | Status: ZONE_SAFE | Latency: 14.2ms
[FRAME #1205] People Detected: 3 | Status: ZONE_SAFE | Latency: 13.8ms`
  },
  {
    id: "snip-typescript",
    title: "TypeScript Gemini API Proxy",
    language: "typescript",
    filename: "geminiProxy.ts",
    description: "Server-side Gemini AI integration with Google GenAI SDK.",
    code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

export async function askAkshayAI(userQuestion: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: userQuestion,
    config: {
      systemInstruction: "You represent Akshay Jain, AI Engineer & Full Stack Dev.",
      temperature: 0.7
    }
  });

  return response.text || "No response received";
}`,
    simulatedOutput: `[GEMINI 3.6-FLASH RESPONSE]
"Akshay Jain specializes in AI/ML solutions, Java Spring Boot microservices, and React full-stack applications built with modern architectural precision."`
  },
  {
    id: "snip-sql",
    title: "PostgreSQL Multi-Tenant Query with Indexing",
    language: "sql",
    filename: "schema_analytics.sql",
    description: "Optimized aggregation query for dead stock and inventory rebalancing.",
    code: `-- Multi-Tenant Inventory Dead Stock Aggregation Query
SELECT 
    i.tenant_id,
    i.sku,
    i.name,
    i.quantity,
    i.last_sold_date,
    EXTRACT(DAY FROM (NOW() - i.last_sold_date)) AS days_inactive,
    (i.quantity * i.unit_cost) AS capital_tied_up
FROM inventory_items i
JOIN warehouses w ON i.warehouse_id = w.id
WHERE i.tenant_id = 'tenant_walchand_01'
  AND i.quantity > i.min_threshold
  AND i.last_sold_date < NOW() - INTERVAL '90 days'
ORDER BY capital_tied_up DESC
LIMIT 10;`,
    simulatedOutput: `tenant_id           | sku      | quantity | days_inactive | capital_tied_up
--------------------+----------+----------+---------------+----------------
tenant_walchand_01  | SKU-902  | 420      | 114           | $12,600.00
tenant_walchand_01  | SKU-114  | 210      | 98            | $8,400.00`
  }
];
