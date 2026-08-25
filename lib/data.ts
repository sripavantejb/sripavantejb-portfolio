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
  instagram: "https://www.instagram.com/yours.tej/",
  github: "https://github.com/sripavantejb",
  leetcode: "https://leetcode.com/sripavantejb",
  npm: "https://www.npmjs.com/~sripavantejb",
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

/** A photograph featured on a role's detail page. */
export type RolePhoto = {
  src: string;
  /** Alt text — describes the photo for screen readers. */
  alt: string;
  /** Visible caption rendered under the photo. */
  caption: string;
  width: number;
  height: number;
};

/** An embedded social post (currently LinkedIn) featured on a role's detail page. */
export type PostEmbed = {
  /** Provider embed URL, e.g. https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:<id> */
  src: string;
  /** Accessible iframe title, and the caption shown under the post. */
  title: string;
  /** Fixed height in px — LinkedIn embeds do not report their own size. */
  height: number;
};

export type Experience = {
  slug: string;
  logo: string;
  title: string;
  org: string;
  type: string;
  dates: string;
  duration: string;
  location: string;
  arrangement: string;
  description: string;
  skills: string[];
  relatedProjectIds?: number[];
  relatedAwardTitles?: string[];
  relatedAIBuildTitles?: string[];
  showAllLeadership?: boolean;
  showEducationAndCerts?: boolean;
  statHighlightLabels?: string[];
  embeds?: PostEmbed[];
};

export const experience: Experience[] = [
  {
    slug: "nxtwave",
    logo: "/images/nxtwave-logo.jpg",
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
    showEducationAndCerts: true,
  },
  {
    slug: "editco-media",
    logo: "/images/editco-logo.jpg",
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
    relatedProjectIds: [1],
    relatedAIBuildTitles: ["Voice-First AI Call Agent + Clinic CRM"],
    relatedAwardTitles: ["1st Place — BRAVE Startup Programme"],
    statHighlightLabels: ["Agency revenue driven"],
  },
  {
    slug: "niat-media-council",
    logo: "/images/niat-media-council-logo.jpg",
    title: "President",
    org: "Media Council, NIAT",
    type: "Full-time (elected)",
    dates: "Mar 2025 – Present",
    duration: "1 yr 6 mos",
    location: "Hyderabad, Telangana, India",
    arrangement: "On-site",
    description:
      "Elected President of the NIAT College Media Council. Led media coverage, creative direction, and workshops across campus events.",
    skills: ["Leadership", "Team Leadership", "Management", "Team Building"],
    relatedAwardTitles: ["Elected President — Media Council, NIAT"],
    showAllLeadership: true,
    embeds: [
      {
        src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7262514961942286337?compact=1",
        title: "Media Council coverage on LinkedIn",
        height: 399,
      },
    ],
  },
];

export type Project = {
  id: number;
  title: string;
  dates: string;
  org: string;
  slug?: string;
  category?: string;
  role?: string;
  link?: string;
  linkLabel?: string;
  liveUrl?: string;
  stack: string[];
  description: string;
  highlights: string[];
  outcome: string;
};

// Project content now lives in MongoDB (see lib/models/project.ts) and is
// managed from /admin. scripts/seed-projects.mjs holds the original seed data.

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
];

export const hackathons = [
  {
    event: "OpenAI × NxtWave × IndiaAI Buildathon",
    result: "Top 10 Finalist",
    title: "ISMIGS — India State Macro Intelligence & Governance System",
    body: "Built an AI-powered intelligence platform that combines macroeconomic, agricultural, energy, and industrial datasets into decision-ready insights for state-level governance.",
    label: "Built around",
    tags: [
      "AI & Predictive Analytics",
      "Data Intelligence",
      "AgriTech",
      "Energy Analytics",
      "Role-Based Workflows",
    ],
    team: "Harsha Polina · Deepika Mundla",
    photos: [
      {
        src: "/images/hackathons/ismigs-pitch.jpg",
        alt: "Pitching ISMIGS on stage at India's Largest Gen AI Buildathon",
        caption: "On stage — pitching ISMIGS",
        width: 800,
        height: 533,
      },
      {
        src: "/images/hackathons/ismigs-finale.jpg",
        alt: "Finalists on stage at the Buildathon Grand Finale — India's Largest GenAI Innovation Challenge",
        caption: "Grand Finale — OpenAI × NxtWave × IndiaAI",
        width: 1024,
        height: 682,
      },
    ],
  },
  {
    event: "OpenAI × NxtWave Buildathon",
    result: "National Finalist",
    title: "WeA — AI Automation Suite",
    body: "Built an automation platform for freelancers and creative agencies using n8n + AI, automating client outreach, invoicing, agency operations, and AI-powered content creation.",
    label: "Automated",
    tags: ["Email & WhatsApp Outreach", "Invoicing", "Agent Management", "AI Images", "AI Videos"],
    team: "Harsha Polina · Deepika Mundla",
    photos: [
      {
        src: "/images/hackathons/wea-finalist.jpg",
        alt: "Team holding the OpenAI × NxtWave Buildathon Finalist trophy",
        caption: "National Finalist trophy",
        width: 800,
        height: 533,
      },
    ],
  },
  {
    event: "Build for Telangana Hackathon",
    result: "Prototype",
    title: "AI Crop Doctor",
    body: "Built a voice-first AI assistant designed for Telugu-speaking farmers, bringing agricultural guidance directly to the field.",
    label: "Features",
    tags: [
      "Telugu Voice AI",
      "Crop Disease Detection",
      "Weather",
      "Crop Analytics",
      "Expert Calls",
      "Loan Estimation",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Supabase", "Firebase", "AWS S3", "Google Speech", "Hugging Face"],
    when: "June 21, 2025",
    photos: [
      {
        src: "/images/hackathons/telangana-certificate.jpg",
        alt: "Certificate of participation for Build for Telangana Hackathon, awarded to Sri Pavan Tej Balam",
        caption: "Certificate of Participation — 21 June 2025",
        width: 800,
        height: 562,
        fit: "contain" as const,
      },
    ],
  },
] as const;

export const npmPackages = [
  {
    name: "npm-package-doctor",
    href: "https://www.npmjs.com/package/npm-package-doctor",
    description:
      "Analyze npm dependencies and generate package health, security, and maintainability reports.",
  },
  {
    name: "@sripavantejb/vibeshield",
    href: "https://www.npmjs.com/package/@sripavantejb/vibeshield",
    description:
      "A security-focused tool for AI-built and vibe-coded Node.js applications, designed to help identify issues before deployment.",
  },
] as const;

export type PressFeature = {
  publication: string;
  title: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
  stat: string;
  featured?: boolean;
};

export const pressFeatures: PressFeature[] = [
  {
    featured: true,
    publication: "City Air News",
    title:
      "AI Construction Platform developed by NIAT students Wins Heart of Mivi and Sid’s Farm Founders; Wins International Industry Trip to Learn",
    body: "BuildTrack was featured following its recognition at TakeOver 2026, where the AI-powered construction platform was presented to a high-profile jury. Coverage noted 120 clients already on the platform — a functioning business, not a prototype — and an international industry learning opportunity.",
    href: "https://www.cityairnews.com/content/ai-construction-platform-developed-by-niat-students-wins-heart-of-mivi-and-sids-farm-founders-wins-international-industry-trip-to-learn",
    image: {
      src: "/images/press/city-air-news.jpg",
      alt: "BuildTrack team receiving recognition on stage with Sid’s Farm and NIAT leaders at TakeOver 2026, as featured in City Air News",
    },
    stat: "114K+ Monthly Unique Visitors",
  },
  {
    publication: "Deccan Chronicle",
    title: "NIAT Students’ AI Construction Platform Wins International Industry Trip",
    body: "Featured in Deccan Chronicle for building BuildTrack, an AI-powered construction cost intelligence platform for construction companies.",
    href: "https://www.deccanchronicle.com/technology/in-other-news/niat-students-ai-construction-platform-wins-international-industry-trip-1971956",
    image: {
      src: "/images/press/deccan-chronicle.jpg",
      alt: "Screenshot hero from Deccan Chronicle — NIAT students receiving the TakeOver 2026 award on stage",
    },
    stat: "3.5M+ Monthly Unique Visitors",
  },
  {
    publication: "Construction World",
    title: "NIAT Students Develop AI Platform for Construction Sector",
    body: "Featured for developing an AI-powered platform focused on construction management, project visibility, procurement, inventory, and operations.",
    href: "https://www.constructionworld.in/latest-construction-news/real-estate-news/niat-students-develop-ai-platform-for-construction-sector/94641",
    image: {
      src: "/images/press/construction-world.jpg",
      alt: "Hero image from Construction World — BuildTrack team with the BRAVE award at TakeOver 2026",
    },
    stat: "200K+ Unique Visitors · 1M+ Monthly Page Views",
  },
  {
    publication: "The Financial Express",
    title: "Featured for building and taking AI-powered products from idea to real-world deployment.",
    body: "Coverage in one of India’s leading financial and business publications.",
    href: "https://www.financialexpress.com/jobs-career/education-more-than-jobs-how-indias-gen-z-is-powering-the-next-wave-of-tech-innovation-3894638/",
    image: {
      src: "/images/press/financial-express.jpg",
      alt: "Hero image from The Financial Express story on India’s Gen-Z builders and NIAT student products",
    },
    stat: "The Financial Express",
  },
  {
    publication: "Dailyhunt",
    title: "NIAT Students' AI Construction Platform",
    body: "Featured on Dailyhunt as part of the coverage surrounding BuildTrack’s recognition and international industry opportunity.",
    href: "https://www.cityairnews.com/content/ai-construction-platform-developed-by-niat-students-wins-heart-of-mivi-and-sids-farm-founders-wins-international-industry-trip-to-learn",
    image: {
      src: "/images/press/dailyhunt.jpg",
      alt: "BuildTrack team on stage at TakeOver 2026 — coverage syndicated across Dailyhunt",
    },
    stat: "155M+ App Installs · 13M+ Monthly Unique Visitors",
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
    when: "Mar 2025 – Present",
    detail: "Won the student election for President of the College Media Council.",
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
  stats?: string;
  role?: string;
  href?: string;
  hrefLabel?: string;
  events?: string[];
  photos?: RolePhoto[];
};

export const leadershipRole = {
  badge: "Elected President",
  org: "Media Council, NIAT",
  dates: "Mar 2025 – Present",
  duration: "1.5+ years",
  location: "Hyderabad · On-site",
  body: "Elected to lead the college media council. I lead a creative team across campus events, workshops, creative initiatives, and digital content — turning ideas into experiences for hundreds of students.",
  skills: ["Creative Direction", "Team Leadership", "Event Management", "Media"],
  href: "/experience/niat-media-council",
  photo: {
    src: "/images/leadership/media-council-team.jpg",
    alt: "Sri Pavan Tej Balam with the NIAT Media Council team in matching hoodies on campus",
    width: 2048,
    height: 1536,
  },
} as const;

export const leadership: LeadershipItem[] = [
  {
    title: "Master Video Editing Workshop 2025",
    detail:
      "Organized and led a hands-on video editing workshop in collaboration with Tharun Naik, YouTuber and IIT Kharagpur alumnus.",
    stats: "2,338+ impressions · 104 reactions",
    role: "Event Lead · Creative Direction · Coordination",
    photos: [
      {
        src: "/images/leadership/workshop-tharun.jpg",
        alt: "Selfie with Tharun Naik and students at the Master Video Editing Workshop 2025",
        caption: "With Tharun Naik and the workshop crew",
        width: 2048,
        height: 1152,
      },
    ],
  },
  {
    title: "Edit Era — 3-Part Workshop Series",
    detail:
      "Designed and conducted a three-part workshop series focused on video editing and creative production, helping students learn practical editing skills through hands-on sessions.",
    stats: "3 workshops · Student-led learning",
    role: "Video editing · Student learning",
  },
  {
    title: "Tharun Speaks",
    detail:
      "Led the end-to-end media operation for a large campus event — from planning and crew coordination to photography, videography, and post-event coverage.",
    role: "Planning · Crew Management · Photography · Videography",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7262514961942286337",
    hrefLabel: "View Event Coverage",
    photos: [
      {
        src: "/images/tharun-speaks-0.jpg",
        alt: "Sri Pavan Tej Balam with the Media Council crew in the venue corridor before the Tharun Speaks event",
        caption: "Crew on shoot day",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/tharun-speaks-1.jpg",
        alt: "Sri Pavan Tej Balam and the Media Council team among the audience at the Tharun Speaks event",
        caption: "With the audience",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/tharun-speaks-2.jpg",
        alt: "The full NIAT Media Council team assembled at the Tharun Speaks event",
        caption: "The full Media Council team",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    title: "What's Inside NIAT",
    detail:
      "Founded and ran a campus-focused YouTube channel exploring student life, campus culture, learning, and experiences at NIAT.",
    role: "Content Strategy · Production · Editing · Storytelling",
    href: "https://www.youtube.com/@wassuptej",
    hrefLabel: "Watch on YouTube",
  },
  {
    title: "2+ Years of Campus Event Coverage",
    detail:
      "From planning the shot list to getting the final content published, I helped turn campus moments into stories people could experience beyond the event.",
    href: "/experience/niat-media-council",
    hrefLabel: "View Media Council Coverage",
    events: ["Starlit", "Ugadi", "Onam", "Gen AI Hackathon", "100 Days in NIAT", "Cross-Club Events"],
  },
];
