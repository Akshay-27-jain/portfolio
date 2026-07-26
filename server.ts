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
- Email: jainakshay0804@gmail.com
- College: Walchand Institute of Technology, Solapur
- Degree: B.Tech in Computer Engineering (Pursuing)
- CGPA: 9.07 / 10.0
- Problem Solving: Solved 350+ DSA Problems across LeetCode, HackerRank (5★ Java badge), and CodeChef.

Technical Skills:
- Programming Languages: Java, Python, JavaScript (ES6+), SQL, HTML5, CSS3
- Frontend: React.js, Tailwind CSS, Bootstrap, Vite, Gradio
- Backend: Spring Boot, Spring Framework, Servlet, JSP, Node.js, Express.js, Flask
- Databases: PostgreSQL, MongoDB, MySQL
- AI & Machine Learning: Scikit-Learn, XGBoost, OpenCV, YOLOv8, TensorFlow Lite, Pandas, NumPy, Q-Learning
- APIs & Cloud: REST APIs, JWT, Gemini API, Docker, Render, Railway, Vercel, Postman
- Tools & DevOps: Git, GitHub, VS Code, IntelliJ IDEA, Google AI Studio, Figma

Experience:
1. Infosys Springboard | Virtual Intern – Java Full Stack Development (Early 2026 – Present)
   - Completed assignments focusing on Java full-stack technologies, backend architecture, and enterprise web component development using modern Java frameworks.
2. Walchand Institute of Technology | AI & Full Stack Developer (Academic) (2023 – Present)
   - Engineered production-style AI and full-stack applications using Java, Python, React, and Flask.
   - Designed scalable RESTful APIs with Spring Boot, Flask, and Express.js, integrating PostgreSQL and MongoDB.
   - Spearheaded end-to-end software design, testing, and deployment using Agile methodologies and Git.

Featured Projects:
1. AI Smart Exam Surveillance System (Python, Computer Vision, OpenCV):
   - AI-based proctoring system using computer vision to monitor exam environments and detect suspicious behavior in real-time.
2. AI Warehouse Optimization System (React, Flask, PostgreSQL, Scikit-Learn, XGBoost, Docker):
   - Warehouse management platform for demand forecasting, inventory allocation, and dead stock identification. Achieved 93.4% accuracy and reduced excess stock by 28%.
3. AI SaaS Customer Support Platform (React, Node.js, Express.js, PostgreSQL, Gemini API):
   - Multi-tenant SaaS platform with AI chatbot, ticket routing, and sentiment analysis. Automated 62% of queries and reduced response time from 4h to 18m.
4. Resource Allocation Simulator (Python, Q-Learning, Gradio):
   - Reinforcement learning simulation model for automated university class timetable generation with an interactive Gradio interface.
5. Edge-Optimized Computer Vision Monitor (Python, OpenCV, YOLOv8, TensorFlow Lite, React):
   - Edge AI system for real-time surveillance, occupancy analytics, and event detection with sub-50ms latency and 94% cloud bandwidth reduction.
6. Arise Edu (Full Stack Platform) (React, Node.js, Express.js, PostgreSQL, Tailwind CSS):
   - Digital learning platform with JWT auth, student progress dashboards, course management, and quiz portals.

Certifications & Achievements:
- Nasscom AI Code Sarathi: AI-assisted Coding Workshop & Mandatory Coursework Competence (Nasscom AI, Mar & Apr 2026).
- Certifications: NPTEL Edge Computing, Full Stack Web Development, Enterprise Java & Spring Boot, Machine Learning Fundamentals, SQL & PostgreSQL, REST API Development.
- Problem Solving: Solved 350+ Data Structures & Algorithms problems across LeetCode, HackerRank, and CodeChef.
- Development: Successfully built and deployed 5+ Full Stack Applications and multiple AI/ML software solutions.

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
