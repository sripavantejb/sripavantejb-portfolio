export const profile = {
  name: "Sri Pavan Tej Balam",
  initials: "SP",
  pronouns: "He/Him",
  headline: "SDE Intern @ NxtWave · Co-Founder @ Editco Media",
  subHeadline: "Building scalable products & digital brands",
  location: "Hyderabad, Telangana, India",
  openToWork: true,
  tagline: "Every expert was once a beginner who refused to give up.",
  email: "sripavantejb@gmail.com",
  phone: "+91 89199 26373",
  phoneHref: "tel:+918919926373",
  whatsapp: "https://wa.me/918919926373",
  linkedin: "https://www.linkedin.com/in/sripavantejbalam",
  instagram: "https://www.instagram.com/editco.media/",
  editco: "https://editcomedia.com",
  about: [
    "As Co-Founder of Editco Media, I contribute to creating impactful content, fostering community engagement, and designing memorable branding strategies — driving growth through strategic planning, MERN stack development, and graphic design.",
    "I'm currently pursuing a Computer Science degree specializing in Data Science and Machine Learning at NxtWave Institute of Advanced Technologies, while working as an SDE Intern at NxtWave. I hold certifications in graphic design and frontend development, and I aspire to bridge technology and creativity to deliver work that actually moves the needle.",
  ],
  topSkills: ["C++", "Python", "MERN Stack", "Graphic Design", "Video Editing"],
} as const;

export const stats = [
  { label: "Agency revenue driven", value: "₹15,57,800+", note: "Editco Media, cumulative" },
  { label: "LinkedIn network", value: "500+", note: "connections · 6,207 followers" },
  { label: "National buildathons", value: "3", note: "1 win · 1 finalist · 1 Top 10" },
  { label: "Clinics converted", value: "2 / 2", note: "in 48 hours, ₹50,000+" },
] as const;

export type Experience = {
  title: string;
  org: string;
  type: string;
  dates: string;
  duration: string;
  location: string;
  arrangement: string;
  description: string;
  skills: string[];
};

export const experience: Experience[] = [
  {
    title: "Software Engineer (SDE Intern)",
    org: "NxtWave",
    type: "Internship",
    dates: "Dec 2025 – Present",
    duration: "9 mos",
    location: "Hyderabad, Telangana, India",
    arrangement: "On-site",
    description:
      "Immersed in a fast-paced environment, actively contributing to software development projects while enhancing technical skills and collaborating with a motivated engineering team.",
    skills: ["Engineering", "Python", "Data Science", "MEAN Stack", "JavaScript"],
  },
  {
    title: "Co-Founder",
    org: "Editco Media",
    type: "Self-employed",
    dates: "Jun 2025 – Present",
    duration: "1 yr 3 mos",
    location: "India",
    arrangement: "Hybrid",
    description:
      'Creative agency and digital-product studio. Positioning: "CREATE content that stops the scroll · INSPIRE a community · DESIGN a brand that feels unforgettable · STRATEGIZE a path to unstoppable growth."',
    skills: [
      "Web Development",
      "Client Relations",
      "Business Development",
      "SEO",
      "Content Strategy",
      "UI/UX Design",
      "Google & Meta Ads",
      "Video Editing",
    ],
  },
  {
    title: "President",
    org: "Media Council, NIAT",
    type: "Full-time (elected)",
    dates: "Mar 2025 – Present",
    duration: "1 yr 6 mos",
    location: "Hyderabad, Telangana, India",
    arrangement: "On-site",
    description:
      "Elected President of the NIAT College Media Council. Led media coverage, creative direction, and workshops across ~2 years of campus events.",
    skills: ["Leadership", "Team Leadership", "Management", "Team Building"],
  },
];

export type Project = {
  id: number;
  title: string;
  dates: string;
  org: string;
  link?: string;
  linkLabel?: string;
  stack: string[];
  description: string;
  highlights: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    id: 1,
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
    title: "Indian Kitchen — Recipe Web App",
    dates: "Jul – Aug 2025",
    org: "NIAT",
    link: "#",
    linkLabel: "Demo login: rahul / rahul@2021",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Digital platform for authentic Indian recipes — browse, search, and filter by ingredient or cuisine, with profiles, saved favourites, and recommendations.",
    highlights: [
      "Secure authentication",
      "Responsive UI/UX",
      "Scalable, production-like workflows",
    ],
    outcome: "Strengthened full-stack expertise across frontend, APIs, and database design.",
  },
  {
    id: 4,
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

export type AIBuild = {
  title: string;
  context: string;
  when: string;
  stack: string;
  points: string[];
  result: string;
};

export const aiBuilds: AIBuild[] = [
  {
    title: "WeA — n8n Automation Suite",
    context: "OpenAI × NxtWave Buildathon — Finalist (Nationals)",
    when: "Nov 2025",
    stack: "n8n, GenAI",
    points: [
      "Automated client outreach via email & WhatsApp sequences",
      "Automated invoicing, agent management & AI-generated content",
    ],
    result: "Finalist nationally · 197 reactions · 5,184 impressions. Team: Deepika Mundla, Harsha Polina.",
  },
  {
    title: "Voice-First AI Call Agent + Clinic CRM",
    context: "Editco Media — commercial product",
    when: "May 2026",
    stack: "Real-time voice AI, CRM, payments",
    points: [
      "Answers patient calls in real time & books appointments instantly",
      "CRM stores patient data, generates insights & handles payments",
    ],
    result: "Pitched to 2 clinics, both converted — ₹50,000+ in 48 hours.",
  },
  {
    title: "ISMIGS — State Macro Intelligence System",
    context: "OpenAI × NxtWave × IndiaAI Buildathon, Delhi — Top 10",
    when: "Mar 2026",
    stack: "Predictive models, unified data framework, publishing API",
    points: [
      "Unifies coal, energy & macroeconomic indicators into one framework",
      "AI crop insights, yield forecasting, and auto-published reports",
    ],
    result: "Top 10 nationally · 282 reactions · 5,240 impressions. Team: Harsha Polina, Deepika Mundla.",
  },
  {
    title: "Open Source — npm & VS Code",
    context: "npm, Inc. & microsoft/vscode",
    when: "2026",
    stack: "JavaScript / npm, issue triage",
    points: [
      "Published 2 npm packages + contributed to npm documentation",
      "Analysed real issues on one of GitHub's most-starred repos",
    ],
    result: "Earned the GRIT Award for Open Source Contribution.",
  },
];

export type Award = {
  title: string;
  issuer: string;
  when: string;
  detail: string;
  engagement?: string;
};

export const awards: Award[] = [
  {
    title: "1st Place — BRAVE Startup Programme",
    issuer: "NxtWave Institute of Innovation in Advanced Technologies",
    when: "Jul 2026",
    detail:
      "Won First Place with Editco Media after a 13-week programme, pitching to industry leaders including Midhula Devabhaktuni and Kishore Indukuri.",
    engagement: "131 reactions · 3,221 impressions",
  },
  {
    title: "GRIT Award — Open Source Contribution",
    issuer: "NxtWave / NIAT",
    when: "Jul 2026",
    detail: "For contributing to npm, Inc. documentation and publishing two npm packages used by developers worldwide.",
    engagement: "70 reactions · 1,921 impressions",
  },
  {
    title: "Top 10 Teams Nationally — ISMIGS",
    issuer: "OpenAI × NxtWave × IndiaAI Buildathon, Delhi",
    when: "Mar 2026",
    detail: "State-level macro intelligence & governance system, ranked in the national Top 10.",
    engagement: "282 reactions · 5,240 impressions",
  },
  {
    title: "Finalist — WeA Automation Suite",
    issuer: "OpenAI × NxtWave Buildathon",
    when: "Nov 2025",
    detail: "n8n automation suite for freelancers and creative agencies, selected as a national finalist.",
    engagement: "197 reactions · 5,184 impressions",
  },
  {
    title: "Elected President — Media Council, NIAT",
    issuer: "NIAT",
    when: "Aug 2025",
    detail: "Won the student election for President of the College Media Council, serving ~2 years.",
    engagement: "121 reactions · 2,738 impressions",
  },
  {
    title: "Invited to Pitch to India's Top HR Leaders",
    issuer: "Qualitest, OpenText, Capgemini, Tech Mahindra, Qentelli",
    when: "May 2026",
    detail: "Pitched on campus in a session on how AI is reshaping the future of work.",
    engagement: "191 reactions · 4,840 impressions",
  },
];

export type SkillGroup = { category: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages & Frameworks",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "React.js", "Node.js", "MERN Stack", "HTML", "CSS", "Bootstrap"],
  },
  {
    category: "Tools & Platforms",
    skills: ["MongoDB", "Prisma ORM", "Supabase", "Netlify", "Vercel", "Cursor", "Figma", "Framer", "Wix Studio", "n8n"],
  },
  {
    category: "Design & Media",
    skills: ["Graphic Design", "UI/UX Design", "Canva", "Adobe Photoshop", "DaVinci Resolve", "Video Editing"],
  },
  {
    category: "Growth & Strategy",
    skills: ["SEO", "Content Strategy", "Google Ads", "Meta Ads", "Business Development", "Client Relations"],
  },
  {
    category: "Leadership & Collaboration",
    skills: ["Team Leadership", "Management", "Team Building", "Communication", "Teamwork"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  { name: "Frontend Developer (React)", issuer: "HackerRank", issued: "Sep 2025", credentialId: "EC8DAECC9366" },
  { name: "Python", issuer: "HackerRank", issued: "Sep 2025", credentialId: "280F9264BF8E" },
  { name: "Certificate of Participation — Hackoverflow 9.0", issuer: "Unstop", issued: "Oct 2025", credentialId: "b5d13ad1" },
  { name: "Graphic Designing", issuer: "Canva", issued: "Jun 2025", credentialId: "0e6646" },
];

export type EducationItem = {
  institution: string;
  degree: string;
  field: string;
  dates: string;
  grade?: string;
};

export const education: EducationItem[] = [
  {
    institution: "NxtWave Institute of Advanced Technologies (NIAT)",
    degree: "Computer Science Program — Data Science & Machine Learning Specialization",
    field: "Computer Science",
    dates: "Jul 2024 – Jul 2028",
  },
  {
    institution: "Chaitanya Deemed to be University",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science",
    dates: "Aug 2024 – Aug 2028",
  },
  {
    institution: "Sri Viswa IIT and Medical Academy",
    degree: "Intermediate",
    field: "—",
    dates: "Jun 2022 – Mar 2024",
    grade: "A",
  },
  {
    institution: "Sri Chaitanya Olympiad School",
    degree: "Primary & Secondary Education",
    field: "—",
    dates: "Jun 2011 – Apr 2021",
    grade: "A",
  },
];

export type LeadershipItem = {
  title: string;
  detail: string;
};

export const leadership: LeadershipItem[] = [
  {
    title: "Master Video Editing Workshop 2025",
    detail: "Organised & led — collaboration with Tharun Naik (YouTuber, IIT Kharagpur). 104 reactions, 2,338 impressions.",
  },
  {
    title: "Edit Era — 3 Workshops",
    detail: "Conducted a 3-part workshop series teaching students video editing.",
  },
  {
    title: "Tharun Speaks Event",
    detail: "End-to-end media coverage for a motivational speaker & editor at NIAT.",
  },
  {
    title: "\"What's Inside NIAT\" — YouTube Channel",
    detail: "Founded & runs an EdTech, campus-insight content channel.",
  },
  {
    title: "2 Years of Campus Event Coverage",
    detail: "Starlit, Ugadhi & Onam celebrations, Gen AI Hackathon, 100 Days in NIAT, and cross-club creative support.",
  },
];
