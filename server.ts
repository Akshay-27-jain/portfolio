import "dotenv/config";
import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// ── AI Context ──────────────────────────────────────────────────────────────
const AKSHAY_CONTEXT = `
You are the AI Assistant embedded in Akshay Jain's portfolio website.
Answer as an intelligent, friendly, and technically sharp representative for Akshay Jain.

Biography:
- Name: Akshay Jain
- Title: Java Full Stack Developer | Software Engineer
- Location: Solapur, Maharashtra, India
- Phone: +91 8618280477
- Email: jainakshay0804@gmail.com
- GitHub: https://github.com/Akshay-27-jain
- LinkedIn: https://www.linkedin.com/in/akshay-jain-636499327/
- College: Walchand Institute of Technology, Solapur
- Degree: B.Tech in Computer Engineering (Pursuing, 2023 - Present)
- CGPA: 9.07 / 10.0

Technical Skills:
- Languages: Java, Python, JavaScript, SQL
- Web Development: React, Next.js, Spring Boot, Node.js, REST APIs
- Databases: PostgreSQL, MySQL, MongoDB, Prisma ORM
- AI & Tools: Gemini API, LLM integration, Git, GitHub, Docker, Postman

Featured Projects:
1. Subscription Tracker — Next.js, React, PostgreSQL, Prisma, Clerk, Resend, Recharts
2. Hospital Management System — Java, Spring Boot, React, PostgreSQL, REST APIs
3. Web Application Health & SSL Monitoring — Java 21, Spring Boot 3.4, Spring Security, JWT

Experience:
- Infosys Springboard | Virtual Intern — Java Full Stack Development (August 2026 – Present)

Certifications:
- HackerRank Java (Basic) Certification (Aug 2026)
- Citi Technology Software Development Job Simulation | Forage (Aug 2026)
- Nasscom AI Code Sarathi Workshop (Mar–Apr 2026)

Keep answers concise, engaging, and formatted with Markdown.
`;

// ── Gemini AI Chat ───────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not configured.",
        reply: "Hi! I'm Akshay's AI Assistant. The API key isn't set up yet — feel free to explore his projects or email him at jainakshay0804@gmail.com!"
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Try models in order — fallback if one is overloaded (503) or deprecated (404)
    const models = ["gemini-3.6-flash", "gemini-3.8-flash"];
    let lastError: any = null;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: `User question: "${message}"\n\nRespond concisely and accurately. Use Markdown formatting.`,
          config: {
            systemInstruction: AKSHAY_CONTEXT,
            temperature: 0.7,
          },
        });
        return res.json({ reply: response.text || "Ask me anything about Akshay's skills and projects!" });
      } catch (err: any) {
        lastError = err;
        // Only retry on 503 (overload) or 404 (model deprecated)
        if (err.status === 503 || err.status === 404) {
          console.warn(`Model ${model} failed (${err.status}), trying next...`);
          continue;
        }
        throw err; // Other errors — don't retry
      }
    }

    throw lastError;
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      error: err.message,
      reply: "I'm having a moment — please email Akshay directly at jainakshay0804@gmail.com."
    });
  }
});

// ── Contact Form — Real SMTP Email ───────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("Gmail SMTP credentials not configured.");
    return res.status(500).json({ error: "Email service not configured." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: `"${name}" <${email}>`,
      to: gmailUser,
      subject: `[Portfolio] ${subject || "New Message"} — from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f14; color: #f8fafc; padding: 32px; border-radius: 16px; border: 1px solid #374151;">
          <h2 style="color: #818cf8; margin-top: 0;">📬 New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 100px;">From:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 13px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Subject:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 13px;">${subject || '—'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #374151; margin: 16px 0;" />
          <h3 style="color: #a5b4fc; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message:</h3>
          <p style="color: #cbd5e1; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #374151; margin: 24px 0 16px;" />
          <p style="color: #6b7280; font-size: 12px;">Sent from your portfolio website · Reply directly to <a href="mailto:${email}" style="color: #818cf8;">${email}</a></p>
        </div>
      `,
    });

    console.log(`✅ Contact email sent from ${name} <${email}>`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error("Nodemailer Error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

// ── GitHub Live API ───────────────────────────────────────────────────────────
app.get("/api/github", async (req, res) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/Akshay-27-jain", {
        headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "portfolio-app" }
      }),
      fetch("https://api.github.com/users/Akshay-27-jain/repos?per_page=100&sort=updated", {
        headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "portfolio-app" }
      })
    ]);

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    const repos = Array.isArray(reposData) ? reposData : [];
    const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);

    // Count languages
    const langMap: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
    });
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);

    // Recent repos
    const recentRepos = repos.slice(0, 6).map((r: any) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      updated_at: r.updated_at,
    }));

    return res.json({
      username: userData.login || "Akshay-27-jain",
      public_repos: userData.public_repos || repos.length,
      followers: userData.followers || 0,
      total_stars: totalStars,
      top_languages: topLanguages.length > 0 ? topLanguages : ["Java", "JavaScript", "Python"],
      recent_repos: recentRepos,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    // Fallback to static data
    return res.json({
      username: "Akshay-27-jain",
      public_repos: 10,
      followers: 0,
      total_stars: 0,
      top_languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
      recent_repos: [],
    });
  }
});

// ── Analytics ────────────────────────────────────────────────────────────────
let visitorCount = 1248;

app.get("/api/analytics", (req, res) => {
  visitorCount += 1;
  res.json({ visitors: visitorCount });
});

// ── Server startup ────────────────────────────────────────────────────────────
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
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    console.log(`   Gmail SMTP: ${process.env.GMAIL_USER ? "✅ configured" : "❌ not set"}`);
    console.log(`   Gemini AI:  ${process.env.GEMINI_API_KEY ? "✅ configured" : "❌ not set"}`);
  });
}

startServer();
