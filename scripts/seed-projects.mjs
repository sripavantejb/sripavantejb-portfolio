import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sripavantejb";

if (!uri) {
  console.error("Missing MONGODB_URI. Run with: node --env-file=.env.local scripts/seed-projects.mjs");
  process.exit(1);
}

const projects = [
  {
    id: 1,
    order: 0,
    title: "Editco Media — Agency Management Platform",
    dates: "Oct 2025",
    org: "Editco Media",
    link: "https://editcomedia.com",
    linkLabel: "editcomedia.com",
    stack: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
    description:
      "Full-stack web app to manage clients, services, and project statuses, with a secure admin panel for monitoring client activity and internal workflows.",
    highlights: [
      "Component-based React frontend",
      "Node/Express REST APIs",
      "Secure auth & session management",
      "React hooks & Context API state",
    ],
    outcome: "Enhanced project visibility and cut administrative overhead for the agency.",
  },
  {
    id: 2,
    order: 1,
    title: "Ukusa Cafe — Real-Time MERN Website",
    dates: "Oct 2025",
    org: "Editco Media",
    link: "https://ukusa-cafe-y3wb.vercel.app/",
    linkLabel: "Live site",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "Cloudinary"],
    description:
      "Production-ready, mobile-first website for a local café — built for both customer engagement and owner efficiency.",
    highlights: [
      "Real-time menu updates, no reload",
      "Wishlist + seamless ordering flow",
      "Admin dashboard for menu, orders & gallery",
      "Zero-downtime Vercel deploys",
    ],
    outcome: "A repeatable, differentiated product template for cafés and SMEs.",
  },
  {
    id: 3,
    order: 2,
    title: "Indian Kitchen — Recipe Web App",
    dates: "Jul – Aug 2025",
    org: "NIAT",
    link: "#",
    linkLabel: "Demo login: rahul / rahul@2021",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Digital platform for authentic Indian recipes — browse, search, and filter by ingredient or cuisine, with profiles, saved favourites, and recommendations.",
    highlights: ["Secure authentication", "Responsive UI/UX", "Scalable, production-like workflows"],
    outcome: "Strengthened full-stack expertise across frontend, APIs, and database design.",
  },
  {
    id: 4,
    order: 3,
    title: "JobLink — Career Connection Platform",
    dates: "Aug 2025",
    org: "NIAT",
    stack: ["MERN Stack"],
    description:
      "Two-sided platform connecting job seekers with recruiters — profiles, applications, and application tracking for candidates; posting and applicant management for employers.",
    highlights: ["Full-stack web development", "REST APIs", "Responsive UI design"],
    outcome: "Demonstrated the ability to design scalable, user-friendly two-sided platforms.",
  },
  {
    id: 5,
    order: 4,
    title: "FARM AI — AI Crop Doctor",
    dates: "Jun 2025",
    org: "Independent build",
    stack: ["React", "Node.js", "Supabase", "Netlify", "Chatbot Dev"],
    description:
      "AI-powered web app built for Telugu-speaking and non-literate farmers, making farming easier, smarter, and more accessible.",
    highlights: [
      "Telugu voice assistant for farming Q&A",
      "Crop image analyser for disease detection",
      "Loan estimator by crop type, area & yield",
      "Crop stats dashboard + expert video call",
    ],
    outcome: "Accessibility-first agri-tech — voice & image interfaces replacing text literacy.",
  },
  {
    id: 6,
    order: 5,
    title: "ResumaGenius — ATS Resume Optimizer",
    dates: "Mar – Apr 2025",
    org: "NIAT",
    link: "https://resumechecker.niat.tech/#",
    linkLabel: "Live site",
    stack: ["HTML5", "CSS3", "JavaScript", "Gemini 2.0 Flash API"],
    description:
      "AI-powered resume analysis tool that helps job seekers optimize resumes for ATS, with instant scoring and feedback.",
    highlights: [
      "Real-time analysis via Gemini 2.0 Flash",
      "ATS compatibility score 0–100",
      "Built independently, end-to-end",
    ],
    outcome: "Tackles a real pain point in modern job applications.",
  },
  {
    id: 7,
    order: 6,
    title: "Organic Delights",
    dates: "Nov 2024",
    org: "NIAT",
    stack: ["HTML", "CSS", "Bootstrap", "Font Awesome"],
    description:
      "Web application connecting organic-product producers with customers interested in sustainable lifestyles.",
    highlights: [
      "Producer profiles & categorised catalogue",
      "Real-time inventory updates",
      "Direct buyer–seller communication",
    ],
    outcome: "Improved market visibility for small organic producers.",
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection("projects");

  for (const p of projects) {
    await col.updateOne({ id: p.id }, { $set: p }, { upsert: true });
  }

  const count = await col.countDocuments();
  console.log(`Seeded ${projects.length} projects. Collection now has ${count} documents.`);
} finally {
  await client.close();
}
