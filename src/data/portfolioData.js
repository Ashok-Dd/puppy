// ============================================================
// portfolioData.js — Single source of truth for Praharshitha's portfolio
// ============================================================

export const portfolioData = {
  // ── Personal Info ──
  personal: {
    name: "Praharshitha Illa",
    firstName: "Praharshitha",
    lastName: "Illa",
    title: "AI & Data Science Engineer",
    subtitle: "Third Year B.Tech · Computer Vision · LLM Systems · Full-Stack Engineering",
    tagline: "Building intelligent systems that see, understand, and decide.",
    bio: [
      "Motivated third-year B.Tech student specialising in AI & Data Science with hands-on experience building production-grade ML systems, computer vision pipelines, LLM-powered applications, and full-stack web products.",
      "Proficient in Python, React, FastAPI, and PyTorch with a strong foundation in agentic AI, RAG architectures, and real-time object detection. My systems are engineered to think, adapt, and solve.",
      "Actively seeking internship or entry-level roles in AI/ML, computer vision, or full-stack engineering — ready to launch into any mission.",
    ],
    location: "Vizag, India",
    email: "praharshithailla@gmail.com",
    phone: "+91 9701709515",
    linkedin: "https://www.linkedin.com/in/praharshitha1899",
    github: "https://github.com/Praharshithailla",
    degree: "B.Tech — AI & Data Science",
    year: "Third Year (2023–2027)",
    institution: "SRKR Engineering College",
    cgpa: 8.95,
    stats: [
      { num: "8.95", label: "CGPA / 10.0" },
      { num: "3+",   label: "Projects Built" },
      { num: "4+",   label: "Certifications" },
      { num: "5+",   label: "Tech Stacks" },
    ],
  },

  // ── Skills ──
  skills: [
    {
      id: "languages",
      category: "Languages",
      icon: "⌨",
      color: "#00e5ff",
      items: ["Python", "Java", "SQL"],
    },
    {
      id: "ai",
      category: "AI / ML / DL",
      icon: "🧠",
      color: "#a855f7",
      items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLM Apps", "RAG", "Vector DB"],
    },
    {
      id: "frameworks",
      category: "Frameworks",
      icon: "⚡",
      color: "#00ff88",
      items: ["React.js", "FastAPI", "Flask", "PyTorch", "YOLOv8", "Scikit-learn"],
    },
    {
      id: "data",
      category: "Data Analysis",
      icon: "📊",
      color: "#ffab00",
      items: ["EDA", "Pandas", "NumPy", "Matplotlib", "Statistical Analysis"],
    },
    {
      id: "tools",
      category: "Tools & DBs",
      icon: "🛠",
      color: "#00e5ff",
      items: ["MongoDB", "SQLite", "Git", "Postman", "Jupyter", "OpenCV"],
    },
    {
      id: "security",
      category: "Security & Auth",
      icon: "🔒",
      color: "#a855f7",
      items: ["JWT", "Role Access Control", "API Security"],
    },
    {
      id: "agentic",
      category: "Agentic AI",
      icon: "🚀",
      color: "#00ff88",
      items: ["RAG Pipelines", "Agent Workflows", "Memory Systems", "LLM Chains"],
    },
    {
      id: "cv",
      category: "Computer Vision",
      icon: "👁",
      color: "#ffab00",
      items: ["YOLOv8", "Object Detection", "Action Recognition", "Multi-Person Tracking", "OpenCV"],
    },
  ],

  // ── Projects ──
  projects: [
    {
      id: 1,
      title: "IntelliWatch",
      subtitle: "AI-Powered Surveillance System",
      status: "In Progress",
      statusColor: "orange",
      stack: ["YOLOv8", "OpenCV", "PyTorch", "Deep Learning", "Computer Vision"],
      accent: "#ff6b35",
      description:
        "Real-time computer vision pipeline on live CCTV feeds using YOLOv8 for object detection, multi-person tracking, and action recognition to identify threats such as fighting, loitering, and abnormal movement.",
      points: [
        "Engineering a real-time CV pipeline on live CCTV feeds using YOLOv8 for object detection, multi-person tracking, and action recognition to identify threats like fighting and loitering.",
        "Camera tamper detection (blackout, blur, freeze) with a rule-based threat scoring engine and automated email/push notification alerts.",
        "Integrating multi-camera support with a unified analytics dashboard for simultaneous feed monitoring.",
        "Designing the system for scalable deployment with low-latency inference optimised for edge hardware.",
      ],
      featured: true,
    },
    {
      id: 2,
      title: "Child Safety AI",
      subtitle: "Monitoring System",
      status: "Complete",
      statusColor: "green",
      stack: ["React", "Flask", "JWT", "Python", "ML"],
      accent: "#00ff88",
      description:
        "Real-time student behaviour monitoring dashboard with ML-based risk prediction and attention-level analytics.",
      points: [
        "Real-time student behaviour monitoring dashboard with ML-based risk prediction and attention-level analytics.",
        "Automated parent email alerts on flagged events with JWT-based role access control for teachers & admins.",
        "Visualised behaviour trends via interactive charts, enabling educators to identify patterns proactively.",
      ],
      featured: false,
    },
    {
      id: 3,
      title: "Agentic Knowledge",
      subtitle: "Assistant",
      status: "Complete",
      statusColor: "green",
      stack: ["FastAPI", "React", "LLMs", "RAG", "Vector DB"],
      accent: "#a855f7",
      description:
        "Production-ready RAG system with vector database retrieval enabling context-aware Q&A over uploaded documents with persistent memory for coherent multi-turn conversations.",
      points: [
        "Production-ready RAG system with vector database retrieval enabling context-aware Q&A over uploaded documents with persistent memory.",
        "Agentic workflows for complex multi-step reasoning — allowing the assistant to decompose queries and retrieve context.",
        "Scalable FastAPI backend with React chat UI supporting real-time streaming responses and modular LLM integration.",
      ],
      featured: false,
    },
  ],

  // ── Certifications ──
  certifications: [
    {
      name: "Data Analytics Job Simulation",
      org: "Deloitte",
      badge: "Verified Certification",
      icon: "📊",
      color: "#00e5ff",
    },
    {
      name: "Programming Essentials in C",
      org: "Cisco Networking Academy",
      badge: "Verified",
      icon: "🔧",
      color: "#ffab00",
    },
    {
      name: "Python Essentials 1 & 2",
      org: "Cisco Networking Academy",
      badge: "Verified",
      icon: "🐍",
      color: "#00ff88",
    },
    {
      name: "Introduction to Cyber Security",
      org: "Cisco Networking Academy",
      badge: "Verified",
      icon: "🛡",
      color: "#a855f7",
    },
  ],

  // ── LeetCode ──
  leetcode: {
    username: "praharshithailla1899",
  },

  // ── Theme Colors ──
  theme: {
    primary: "#ff1744",
    secondary: "#00e5ff",
    accent: "#a855f7",
    bg: "#020205",
  },
};
