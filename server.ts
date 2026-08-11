import "dotenv/config";
import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory stats for visitor counter & applause
let visitorCount = 1248;
let applauseCount = 382;

const AKSHAY_CONTEXT = `
You are the AI Assistant embedded in Akshay Jain's interactive 3D portfolio website.
Answer as an intelligent, charismatic, friendly, and technically sharp representative for Akshay Jain.

Biography:
- Name: Akshay Jain
- Title: AI Engineer | Full Stack Developer | Java Developer
- Location: Solapur, Maharashtra, India
- Phone: +91 8618280477
- Email: jainakshay0804@gmail.com
- Portfolio: https://portfolio-ten-murex-ot303crdie.vercel.app
- GitHub: https://github.com/Akshay-27-jain
- LinkedIn: https://www.linkedin.com/in/akshay-jain-636499327/
- College: Walchand Institute of Technology, Solapur
- Degree: B.Tech in Computer Engineering (Pursuing, 2023 - Present)
- CGPA: 9.07 / 10.0

Technical Skills:
- Languages: Java, Python, JavaScript, SQL
- Web Development: React, Next.js, FastAPI, Spring Boot, Node.js, REST APIs
- Databases: PostgreSQL, MySQL, MongoDB
- AI & Machine Learning: LLM APIs, Scikit-Learn, OpenCV
- Tools: Git, GitHub, Docker, Postman
- Soft Skills: Problem Solving, Communication, Teamwork, Adaptability

Featured Projects:
1. Subscription Tracker — Subscription & Renewal Management Platform:
   - Tech Stack: Next.js, React, PostgreSQL, Prisma, Clerk, Resend, Recharts
   - Full-stack platform tracking recurring services, renewal dates, and expenses with automated Resend email reminders & Recharts spending analytics.
2. Hospital Management System:
   - Tech Stack: Java, Spring Boot, React, PostgreSQL, REST APIs
   - Enterprise hospital operations platform managing patients, doctors, appointments, medical records, and role-based workflows with Spring Boot APIs.
3. ChronosPulse — Synthetic Health & SSL Certificate Observability SaaS:
   - Tech Stack: Java 21, Spring Boot 3.4, Spring Security (JWT), Spring Data JPA, Java Mail, H2 Database
   - Real-time observability platform tracking website availability, response latency, and SSL expiration dates with Slack/Discord webhooks & SSRF protection.

Experience:
- Infosys Springboard | Virtual Intern — Java Full Stack Development (August 2026 – Present Ongoing)
  - Completing assignments focused on Java full-stack technologies, backend architecture, and enterprise web application development.

Education & Certifications:
- B.Tech in Computer Engineering at Walchand Institute of Technology (CGPA: 9.07 / 10.0)
- Nasscom AI Code Sarathi | Nasscom AI (Mar – Apr 2026)
- Citi Technology Software Development Job Simulation | Forage (Aug 2026)

Keep your answers concise, engaging, helpful, and formatted neatly with Markdown. If asked about resume, offer the direct download button or summarize key technical highlights.
`;

// AI Chat Endpoint using Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
        reply: "Hello! I am Akshay's AI Assistant. Gemini API key is required to activate live conversational answers, but feel free to browse his projects and experience above!"
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const promptText = `
User question: "${message}"

Respond concisely and accurately based on Akshay Jain's background and achievements. Use Markdown formatting.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction: AKSHAY_CONTEXT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm here to answer any questions about Akshay's projects, skills, and background!";
    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      error: err.message || "Failed to generate AI response",
      reply: "I am currently undergoing network calibration! Feel free to explore Akshay's project portfolio directly on the page, or email him at jainakshay0804@gmail.com."
    });
  }
});

// Analytics Counter Endpoint
app.get("/api/analytics", (req, res) => {
  visitorCount += 1;
  res.json({ visitors: visitorCount, applause: applauseCount });
});

app.post("/api/applause", (req, res) => {
  applauseCount += 1;
  res.json({ applause: applauseCount });
});

// GitHub API Proxy / Mock Summary Endpoint
app.get("/api/github", async (req, res) => {
  try {
    res.json({
      username: "akshayjain",
      public_repos: 24,
      stars: 186,
      contributions_this_year: 742,
      top_languages: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
      streak: "48 days",
      recent_commits: [
        { repo: "AI-Warehouse-Optimization", msg: "Optimize XGBoost demand forecast pipeline", time: "2 hours ago" },
        { repo: "SaaS-Customer-Support", msg: "Implement multi-tenant JWT middleware", time: " Yesterday" },
        { repo: "Edge-CV-Monitor", msg: "Deploy lightweight YOLOv8 on TFLite runtime", time: "3 days ago" },
        { repo: "Hospital-Management-System", msg: "Add JDBC batch billing processor", time: "5 days ago" }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch github stats" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
