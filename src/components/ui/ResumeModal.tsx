import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType
} from 'docx';
import {
  X,
  Printer,
  Copy,
  Download,
  Check,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Sparkles,
  ExternalLink,
  Mail,
  MapPin,
  FileText,
  Star,
  Eye,
  CheckCircle2,
  MessageSquare,
  Users,
  Brain,
  Clock,
  CheckSquare
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, ACHIEVEMENTS, CERTIFICATIONS } from '../../data/portfolioData';
import { useSound } from './SoundManager';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'ats'>('interactive');
  const { playClick, playSuccess } = useSound();

  if (!isOpen) return null;

  const plainTextResume = `===================================================================
AKSHAY JAIN - SOFTWARE ENGINEER & AI DEVELOPER
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
Current CGPA: 9.07 / 10.0 | College: ${PERSONAL_INFO.college}
GitHub: https://github.com/akshayjain | LinkedIn: https://linkedin.com/in/akshayjain
===================================================================

SUMMARY
-------------------------------------------------------------------
Full Stack & AI Developer currently pursuing B.Tech at Walchand Institute of Technology with an outstanding academic standing of 9.07 / 10.0 CGPA. Combines deep technical expertise in Java, Spring Boot, React, Python, PostgreSQL, and Machine Learning with exceptional communication, problem-solving, time management, and cross-functional team leadership skills. Proven track record of engineering production-ready applications, edge AI vision systems, and AI microservices.

EDUCATION
-------------------------------------------------------------------
Degree: ${EDUCATION.degree}
Institution: ${EDUCATION.institution}, ${EDUCATION.location}
Current CGPA: 9.07 / 10.0
Status: ${EDUCATION.status} (${EDUCATION.period})
Core Subjects: Data Structures & Algorithms, AI/ML, DBMS, Operating Systems, Web Technologies, Software Engineering, Java Architecture.

TECHNICAL SKILLS
-------------------------------------------------------------------
- Programming Languages: Java, Python, JavaScript (ES6+), SQL
- Frameworks & Backend: Spring Boot, Spring MVC, Servlets, JSP, Node.js, Express, REST APIs
- Frontend Development: React, Tailwind CSS, Motion, Responsive UI Design
- AI & Machine Learning: Scikit-Learn, XGBoost, OpenCV, YOLO, TensorFlow Lite, Gemini API
- Databases & Cloud Tools: PostgreSQL, MySQL, MongoDB, Docker, Git, GitHub, Postman, Google AI Studio

SOFT & PROFESSIONAL SKILLS
-------------------------------------------------------------------
- Effective Communication: Technical documentation, stakeholder presentations, active listening, clear architectural explanations
- Problem-Solving & DSA: Algorithmic thinking (350+ DSA problems solved), root cause analysis, analytical reasoning
- Leadership & Collaboration: Cross-functional team leadership, peer mentoring, hackathon project coordination
- Time Management & Agile: Sprint planning, milestone tracking, priority management, rapid iterative delivery under deadlines

FEATURED PROJECTS
-------------------------------------------------------------------
1. AI Warehouse Optimization System (React, Python, Flask, XGBoost, PostgreSQL)
   - Built demand forecasting platform using XGBoost achieving 93.4% prediction accuracy.
   - Reduced excess holding inventory by 28% through multi-warehouse inventory transfer algorithms.
   - Communicated architectural design to stakeholders and led cross-functional project execution.

2. AI SaaS Customer Support Platform (React, Node.js, Express, PostgreSQL, Gemini API)
   - Developed multi-tenant SaaS application with JWT security and sentiment-based ticket routing.
   - Reduced average query turnaround time from 4 hours to 18 minutes.

3. Edge-Optimized Computer Vision Monitor (Python, YOLO, TensorFlow Lite, WebSockets)
   - Quantized YOLO detection engine for low-power edge hardware, achieving 30+ FPS and 94% bandwidth reduction.

4. Hospital Management System (Java, JDBC, MySQL)
   - Engineered thread-safe Java enterprise desktop application managing patient records, shift scheduling, and itemized billing with zero SQL injection vulnerabilities.

PRACTICAL EXPERIENCE & LEADERSHIP
-------------------------------------------------------------------
Full Stack & AI Developer (Academic & Independent Projects)
Period: 2023 - Present | Location: Walchand Institute of Technology
- Designed, architected, and engineered end-to-end full stack web platforms, Java enterprise backends, and AI predictive engines.
- Utilized Agile principles for sprint delivery and AI-assisted development tools (Google AI Studio, Copilot) to accelerate delivery.
- Active participant in campus tech forums and developer hackathons, presenting technical solutions to peer groups and mentors.

HONORS, ACHIEVEMENTS & CERTIFICATIONS
-------------------------------------------------------------------
- Certified: AI-assisted Coding Workshop — Nasscom AI Code Sarathi (Nasscom AI, Mar & Apr 2026).
- Maintained top academic standing with a CGPA of 9.07 / 10.0 at Walchand Institute of Technology.
- Solved 350+ DSA algorithmic problems across LeetCode and HackerRank (5★ Java badge).
- Certified in Full Stack Web Development & Enterprise Java Spring Boot.
`;

  const handleCopyText = () => {
    playClick();
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };

  const handleDownloadMarkdown = () => {
    playClick();
    const blob = new Blob([plainTextResume], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Akshay_Jain_Resume_CGPA_9.07.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    playSuccess();
  };

  const handleDownloadDocx = async () => {
    playClick();
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Title Header
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'AKSHAY JAIN',
                    bold: true,
                    size: 32,
                    color: '0A2540',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'AI ENGINEER & FULL STACK DEVELOPER',
                    bold: true,
                    size: 22,
                    color: '006699',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Email: ${PERSONAL_INFO.email}   |   Location: ${PERSONAL_INFO.location}`,
                    size: 19,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Walchand Institute of Technology   |   Current CGPA: 9.07 / 10.0`,
                    bold: true,
                    size: 20,
                    color: '0088CC',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `GitHub: https://github.com/akshayjain   |   LinkedIn: https://linkedin.com/in/akshayjain`,
                    size: 18,
                    color: '555555',
                  }),
                ],
              }),
              new Paragraph({ text: '' }), // Spacer

              // EXECUTIVE SUMMARY
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'EXECUTIVE SUMMARY',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `High-achieving Software Engineering undergraduate at Walchand Institute of Technology holding an outstanding 9.07 CGPA. Combines deep technical fluency in Java, Spring Boot, React, Python, PostgreSQL, and Machine Learning with effective technical communication, analytical problem-solving, time management, and cross-functional team leadership. Track record of building production-grade full stack applications, edge AI vision systems, and microservices while communicating technical architectures clearly to stakeholders and peers.`,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({ text: '' }),

              // EDUCATION
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'EDUCATION',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${EDUCATION.degree}`, bold: true, size: 21 }),
                  new TextRun({ text: ` — ${EDUCATION.institution}, ${EDUCATION.location}`, size: 20 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `Academic Standing: `, bold: true, size: 20 }),
                  new TextRun({ text: `Current CGPA 9.07 / 10.0 (${EDUCATION.period}, ${EDUCATION.status})`, size: 20, color: '0088CC', bold: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `Core Specializations: `, bold: true, size: 19 }),
                  new TextRun({ text: `Data Structures & Algorithms, Artificial Intelligence, Machine Learning, DBMS, Operating Systems, Web Technologies, Software Engineering, Java Architecture.`, size: 19 }),
                ],
              }),
              new Paragraph({ text: '' }),

              // TECHNICAL SKILLS
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'TECHNICAL SKILLS',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              ...SKILL_CATEGORIES.map(
                (cat) =>
                  new Paragraph({
                    bullet: { level: 0 },
                    children: [
                      new TextRun({ text: `${cat.category}: `, bold: true, size: 20 }),
                      new TextRun({ text: cat.skills.map((s) => s.name).join(', '), size: 20 }),
                    ],
                  })
              ),
              new Paragraph({ text: '' }),

              // SOFT & LEADERSHIP SKILLS
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'SOFT & LEADERSHIP COMPETENCIES',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Effective Communication: ', bold: true, size: 20 }),
                  new TextRun({ text: 'Technical documentation, stakeholder presentations, active listening, clear architectural explanations.', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Problem Solving & DSA: ', bold: true, size: 20 }),
                  new TextRun({ text: 'Algorithmic thinking (350+ DSA problems solved), root cause analysis, analytical reasoning.', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Leadership & Collaboration: ', bold: true, size: 20 }),
                  new TextRun({ text: 'Cross-functional team leadership, peer mentoring, hackathon project coordination.', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Time Management & Agile: ', bold: true, size: 20 }),
                  new TextRun({ text: 'Sprint planning, milestone tracking, priority management, rapid iterative delivery under deadlines.', size: 20 }),
                ],
              }),
              new Paragraph({ text: '' }),

              // FEATURED PROJECTS
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'FEATURED PROJECTS',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              ...PROJECTS.flatMap((proj) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${proj.title} `, bold: true, size: 21 }),
                    new TextRun({ text: `(${proj.technologies.join(', ')})`, italics: true, size: 19, color: '555555' }),
                  ],
                }),
                new Paragraph({
                  children: [new TextRun({ text: proj.description, size: 19 })],
                }),
                ...proj.results.map(
                  (r) =>
                    new Paragraph({
                      bullet: { level: 0 },
                      children: [new TextRun({ text: r, size: 19 })],
                    })
                ),
                new Paragraph({ text: '' }),
              ]),

              // PRACTICAL EXPERIENCE
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'PRACTICAL EXPERIENCE & LEADERSHIP',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              ...EXPERIENCES.flatMap((exp) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${exp.role} `, bold: true, size: 21 }),
                    new TextRun({ text: `| ${exp.organization} (${exp.period})`, size: 19, color: '0088CC' }),
                  ],
                }),
                new Paragraph({
                  children: [new TextRun({ text: exp.description, size: 19 })],
                }),
                new Paragraph({ text: '' }),
              ]),

              // HONORS & ACHIEVEMENTS
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                  new TextRun({
                    text: 'HONORS, ACHIEVEMENTS & CERTIFICATIONS',
                    bold: true,
                    color: '0A2540',
                  }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Nasscom AI Code Sarathi: ', bold: true, size: 20 }),
                  new TextRun({ text: 'Completed AI-assisted Coding Workshop & demonstrated competence through mandatory coursework (Nasscom AI, Mar & Apr 2026).', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Maintained top academic standing with a CGPA of 9.07 / 10.0 at Walchand Institute of Technology.', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Solved 350+ DSA algorithmic problems across LeetCode and HackerRank (5★ Java badge).', size: 20 }),
                ],
              }),
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: 'Certified in Full Stack Web Development & Enterprise Java Spring Boot.', size: 20 }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Akshay_Jain_Resume_CGPA_9.07.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      playSuccess();
    } catch (err) {
      console.error('Failed to generate docx file:', err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl print:bg-white print:p-0 print:static"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl bg-[#090a12] border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black font-sans"
        >
          {/* Action Toolbar */}
          <div className="px-4 sm:px-6 py-4 border-b border-cyan-900/40 bg-gradient-to-r from-cyan-950/50 via-purple-950/30 to-black flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white font-mono flex items-center gap-2">
                  Akshay Jain Resume
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    CGPA: 9.07
                  </span>
                </h3>
                <p className="text-xs text-gray-400 font-mono">Official B.Tech Resume • Walchand Institute of Technology</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="bg-black/60 p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setViewMode('interactive')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'interactive'
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modern</span>
                </button>
                <button
                  onClick={() => setViewMode('ats')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'ats'
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>ATS Clean</span>
                </button>
              </div>

              {/* Copy Plain Text */}
              <button
                onClick={handleCopyText}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-200 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy ATS Plain Text Resume"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span className="hidden sm:inline">Copy Text</span>
                  </>
                )}
              </button>

              {/* Print PDF */}
              <button
                onClick={handlePrint}
                className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              {/* Download Word DOCX */}
              <button
                onClick={handleDownloadDocx}
                className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 hover:bg-blue-500/30 text-blue-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Download Word Document (.docx) Resume"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Download .DOCX</span>
                <span className="sm:hidden">.DOCX</span>
              </button>

              {/* Download Markdown */}
              <button
                onClick={handleDownloadMarkdown}
                className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 text-purple-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Download Markdown Resume"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline">Download .MD</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10 cursor-pointer ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Scrollable Document Container */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans print:overflow-visible print:p-0">
            {viewMode === 'interactive' ? (
              /* MODERN GLASS DESIGN RESUME */
              <div className="space-y-8 text-gray-200 print:text-black">
                {/* Header Section */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-black to-purple-950/40 border border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:bg-none print:border-b print:border-black print:p-0">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight print:text-black">
                      AKSHAY JAIN
                    </h1>
                    <p className="text-cyan-400 font-mono text-sm font-semibold mt-1 print:text-gray-700">
                      AI Engineer & Full Stack Developer
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-1 print:text-gray-600">
                      Walchand Institute of Technology • Solapur, Maharashtra, India
                    </p>
                  </div>

                  {/* Highlights Pill */}
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 print:border-black print:text-black">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                      <span className="font-bold text-white text-sm print:text-black">Current CGPA: 9.07 / 10.0</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-300 print:text-black">
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{PERSONAL_INFO.email}</span>
                      </a>
                      <span>•</span>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                        GitHub
                      </a>
                      <span>•</span>
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2 print:text-black">
                    <Sparkles className="w-4 h-4" />
                    Executive Recruiter Summary
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-300 bg-white/[0.02] p-4 rounded-2xl border border-white/5 print:bg-none print:border-none print:p-0 print:text-black font-sans">
                    High-achieving Software Engineering undergraduate at <strong>Walchand Institute of Technology</strong> holding a top <strong>9.07 CGPA</strong>. Combines deep technical fluency in Java, Spring Boot, React, Python, PostgreSQL, and Machine Learning with <strong>effective technical communication</strong>, <strong>analytical problem-solving</strong>, and <strong>cross-functional team leadership</strong>. Track record of building production-grade full stack applications, edge AI vision systems, and microservices while communicating technical architectures clearly to stakeholders and peers.
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2 print:text-black">
                    <GraduationCap className="w-4 h-4" />
                    Education & Academic Record
                  </h2>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 print:bg-none print:border-none print:p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-white print:text-black font-sans">
                        {EDUCATION.degree}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold print:bg-none print:text-black">
                        Current CGPA: 9.07 / 10.0
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
                      <span>{EDUCATION.institution}, Solapur</span>
                      <span className="text-gray-400 print:text-black">{EDUCATION.period} ({EDUCATION.status})</span>
                    </div>

                    <p className="text-xs text-gray-300 print:text-black leading-relaxed">
                      <strong>Core Specializations:</strong> Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Database Management Systems (PostgreSQL/MySQL), Web Technologies, Software Engineering, Java Architecture.
                    </p>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2 print:text-black">
                    <Code className="w-4 h-4" />
                    Technical Expertise & Stack
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 print:bg-none print:border-none print:p-0">
                        <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider print:text-black">
                          {cat.category}
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-mono print:text-black">
                          {cat.skills.map((s) => s.name).join(' • ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dedicated Soft & Professional Skills Section */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2 print:text-black">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Soft Skills & Leadership Competencies
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-cyan-500/20 space-y-1.5 print:bg-none print:border-none print:p-0">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-300 print:text-black">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        <span>Effective Communication</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">
                        Clear technical documentation, stakeholder presentations, active listening, and explaining complex AI/software architectures to non-technical audiences.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-purple-500/20 space-y-1.5 print:bg-none print:border-none print:p-0">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-purple-300 print:text-black">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span>Leadership & Team Collaboration</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">
                        Cross-functional team leadership, peer mentoring, hackathon project coordination, and fostering inclusive, high-performance team culture.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-emerald-500/20 space-y-1.5 print:bg-none print:border-none print:p-0">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-300 print:text-black">
                        <Brain className="w-4 h-4 text-emerald-400" />
                        <span>Problem-Solving & Analytical Thinking</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">
                        Algorithmic reasoning (350+ DSA problems solved), root cause analysis, edge case mitigation, and data-driven decision making.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-500/20 space-y-1.5 print:bg-none print:border-none print:p-0">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-300 print:text-black">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Time Management & Agile Execution</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">
                        Agile/Scrum sprint planning, task prioritization, milestone tracking, and delivering robust software under strict deadlines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2 print:text-black">
                    <Briefcase className="w-4 h-4" />
                    Key Software Projects
                  </h2>

                  <div className="space-y-4">
                    {PROJECTS.map((proj) => (
                      <div key={proj.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 print:bg-none print:border-b print:p-0 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-sm font-bold text-white print:text-black font-sans flex items-center gap-2">
                            {proj.title}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono print:hidden">
                              {proj.category}
                            </span>
                          </h3>
                          <span className="text-xs font-mono text-cyan-400 font-semibold print:text-black">
                            {proj.technologies.slice(0, 5).join(', ')}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">
                          {proj.description}
                        </p>

                        <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 font-sans print:text-black pl-1">
                          {proj.results.map((res, rIdx) => (
                            <li key={rIdx}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Experience */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2 print:text-black">
                    <Award className="w-4 h-4" />
                    Practical Engineering Experience
                  </h2>

                  <div className="space-y-3">
                    {EXPERIENCES.map((exp, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 print:bg-none print:border-none print:p-0">
                        <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
                          <span className="font-bold text-white print:text-black">{exp.role}</span>
                          <span className="text-cyan-400">{exp.period}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">{exp.organization}</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans print:text-black">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Recognized Credentials */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400 mb-3 flex items-center gap-2 print:text-black">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    Certifications & Recognized Credentials
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {CERTIFICATIONS.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/20 space-y-1.5 print:bg-none print:border-none print:p-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-white print:text-black font-sans">{cert.title}</h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 print:hidden">
                            {cert.date}
                          </span>
                        </div>
                        <p className="text-xs text-rose-300 font-mono print:text-black">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="text-[10px] text-gray-400 font-mono print:text-black">Credential ID: {cert.credentialId}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ATS CLEAN TEXT MODE */
              <div className="bg-white text-black p-8 rounded-2xl font-mono text-xs leading-relaxed space-y-6 shadow-inner print:p-0 print:shadow-none">
                <div className="text-center border-b border-black pb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wider">AKSHAY JAIN</h1>
                  <p className="mt-1">AI ENGINEER & FULL STACK DEVELOPER</p>
                  <p className="text-[11px] mt-1">
                    Email: {PERSONAL_INFO.email} | Location: {PERSONAL_INFO.location}
                  </p>
                  <p className="text-[11px] font-bold text-cyan-900 mt-1">
                    Institution: Walchand Institute of Technology | Current CGPA: 9.07 / 10.0
                  </p>
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Professional Summary</h2>
                  <p className="text-[11px] leading-relaxed">
                    Full Stack & AI Developer currently pursuing B.Tech at Walchand Institute of Technology with an outstanding CGPA of 9.07 / 10.0. Strong expertise in Java, Spring Boot, React, Python, PostgreSQL, and Machine Learning.
                  </p>
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Education</h2>
                  <p className="font-bold">{EDUCATION.degree}</p>
                  <p>{EDUCATION.institution}, {EDUCATION.location}</p>
                  <p className="font-bold">Current CGPA: 9.07 / 10.0 ({EDUCATION.period})</p>
                  <p className="text-[10px] mt-1">Focus Areas: Data Structures, AI/ML, DBMS, Operating Systems, Web Technologies, Java Software Architecture.</p>
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Technical Skills</h2>
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <p key={idx} className="text-[11px]">
                      <strong>{cat.category}:</strong> {cat.skills.map((s) => s.name).join(', ')}
                    </p>
                  ))}
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Soft & Leadership Skills</h2>
                  <p className="text-[11px]"><strong>Effective Communication:</strong> Technical documentation, stakeholder presentations, active listening & clear architectural explanations.</p>
                  <p className="text-[11px]"><strong>Leadership & Collaboration:</strong> Cross-functional team leadership, peer mentoring & hackathon project coordination.</p>
                  <p className="text-[11px]"><strong>Problem-Solving & Analytical Thinking:</strong> Algorithmic problem solving (350+ DSA problems solved) & root-cause debugging.</p>
                  <p className="text-[11px]"><strong>Time Management & Agile Delivery:</strong> Sprint planning, milestone tracking, task prioritization & iterative execution under deadlines.</p>
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Key Projects</h2>
                  {PROJECTS.map((proj) => (
                    <div key={proj.id} className="mb-3">
                      <p className="font-bold">{proj.title} | Technologies: {proj.technologies.join(', ')}</p>
                      <p className="text-[10px]">{proj.description}</p>
                      {proj.results.map((r, i) => (
                        <p key={i} className="text-[10px] pl-2">• {r}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="font-bold uppercase border-b border-black pb-1 mb-2 text-sm">Achievements & Certifications</h2>
                  <p className="text-[11px]">• <strong>Nasscom AI Code Sarathi:</strong> AI-assisted Coding Workshop & Mandatory Coursework Competence (Nasscom AI, Mar & Apr 2026).</p>
                  <p className="text-[11px]">• Maintained CGPA of 9.07 / 10.0 throughout B.Tech degree at Walchand Institute of Technology.</p>
                  <p className="text-[11px]">• Solved 350+ algorithmic DSA problems on LeetCode and HackerRank.</p>
                  <p className="text-[11px]">• Certified in Full Stack Web Development & Enterprise Java Spring Boot.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
