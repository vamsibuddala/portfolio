/**
 * PORTFOLIO CENTRAL DATA FILE
 * =====================================================================
 * All content throughout this website is driven from this single file.
 * Personalized with Vamsi Krishna Buddala's CV & Portfolio details.
 * =====================================================================
 */

export const portfolioData = {
  // -------------------------------------------------------------
  // 1. PERSONAL INFORMATION & IDENTITY
  // -------------------------------------------------------------
  personal: {
    // Full display name
    name: "Vamsi Krishna Buddala",
    initials: "VB",

    // Phonetic name for Web Speech API text-to-speech pronunciation
    phoneticName: "Vamsi Krishna Buddala",

    // Primary professional title
    role: "MSc Data Science & Artificial Intelligence Student",
    shortRole: "Data Science & AI Engineer",
    navRole: "MSc Data Science & AI | Sheffield Hallam",

    // 1-line powerful recruiter hook
    valueProposition: "First-year MSc Data Science and AI student seeking a placement year to apply technical knowledge to real-world business challenges through data-driven decision-making, predictive machine learning, and innovative solutions.",

    // Location
    location: "Sheffield, United Kingdom (Open to UK Relocation & Remote)",

    // Notice Period / Availability
    availability: "Seeking Placement Year (2026/2027) / Immediate Internships",
    statusBadge: "Actively Seeking Placement Year",
    yearsExperience: "Graduate / Intern",

    // Work preferences
    workPreferences: {
      type: "Placement Year / Internship / Hybrid / Remote",
      relocation: "Open to UK Relocation & Worldwide Remote",
      employmentType: "Placement Year / Data Science Intern / Graduate AI Role",
    },

    // Name Origin & Meaning card
    nameOrigin: {
      meaning: "Harmony, Creativity & Insight",
      origin: "Sanskrit roots representing vision, dedication, and analytical clarity",
      funFact: "Passionate about combining deep learning algorithms with real-world civic, urban, and business challenges.",
    },

    // Languages spoken
    languages: [
      "English (Fluent / Professional)",
      "Telugu (Native / Mother-tongue)"
    ],

    // Career Mission Story
    bioStory: [
      "I am a first-year MSc Data Science and Artificial Intelligence student at Sheffield Hallam University with a solid academic foundation in B.Tech Artificial Intelligence and Data Science. I am actively seeking an industry placement year to apply my analytical capabilities and machine learning expertise to complex, data-driven business challenges.",
      "During my Data Analytics internship at Data Valley, I conducted end-to-end data preprocessing, cleaning, anomaly detection, and visualization in Python, designing interactive dashboards in Power BI and Jupyter Notebook that streamlined KPI reporting and improved decision-making accuracy.",
      "My project work includes developing 'Civic Care', a crowdsourced hazard reporting platform featuring TensorFlow/Keras image classification for automated road defect detection, and designing an AI-based adaptive traffic management system that dynamically minimizes intersection congestion using real-time camera and sensor telemetry."
    ],

    // Spoken welcome greeting for 3D avatar voice engine
    spokenWelcomeText: "Hello, I'm Vamsi Krishna Buddala. Welcome to my interactive portfolio. I am an MSc Data Science and Artificial Intelligence student at Sheffield Hallam University seeking a placement year. Feel free to explore my machine learning projects, data analytics dashboards, and academic competencies.",
  },

  // -------------------------------------------------------------
  // 2. 3D AVATAR CONFIGURATION & GLB PATH
  // -------------------------------------------------------------
  avatarConfig: {
    glbPath: "/avatar.glb",
    audioPath: "/audio/welcome.mp3",
    gender: "Smart Casual / Professional",
    skinTone: "#d49b7a",
    shirtColor: "#0f172a",
    accentColor: "#38bdf8",
    hairColor: "#18181b",
    hasGlasses: false,
    glassesFrameColor: "#38bdf8",
    heightBuild: "Athletic / Modern Silhouette",
  },

  // -------------------------------------------------------------
  // 3. RECRUITER QUICK-VIEW SUMMARY
  // -------------------------------------------------------------
  recruiterSummary: {
    headline: "First-year MSc Data Science & AI student seeking placement year in data analytics, machine learning, and AI engineering",
    currentFocus: "Machine learning models, computer vision, data pipelines, Power BI dashboards & predictive analytics",
    topSkills: [
      "Python",
      "Data Analysis & Preprocessing",
      "TensorFlow & Keras",
      "Power BI Dashboards",
      "Jupyter Notebook",
      "React.js & Node.js",
      "MongoDB & SQL",
      "Algorithms & Data Structures"
    ],
    latestRole: "Data Analytics Intern at Data Valley, India (Dec 2025 – Apr 2026)",
    educationSummary: "MSc Data Science & AI (Sheffield Hallam University) | B.Tech AI & Data Science",
    visaStatus: "Eligible for UK Placement Year / Full-Time Placement",
    resumeDownloadUrl: "#resume",
  },

  // -------------------------------------------------------------
  // 4. KEY ACHIEVEMENTS (Animated Counters)
  // -------------------------------------------------------------
  achievements: [
    { label: "Dashboard KPIs Built", value: 15, suffix: "+", description: "In Power BI & Jupyter for business reporting" },
    { label: "Image Classification Accuracy", value: 94, suffix: "%", description: "Hazard detection on Civic Care platform" },
    { label: "Technical Events Led", value: 8, suffix: "+", description: "As Technical Club Vice President" },
    { label: "Core Academic Modules", value: 6, suffix: " High Dist.", description: "Algorithms, Advanced Prog, AI & Data Viz" },
  ],

  // -------------------------------------------------------------
  // 5. SKILLS (Grouped by category with proficiency 1-100)
  // -------------------------------------------------------------
  skillsCategories: [
    {
      name: "Data Science & AI",
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: "Python", level: 95, icon: "Terminal" },
        { name: "Data Cleaning & Preprocessing", level: 93, icon: "Database" },
        { name: "TensorFlow & Keras", level: 88, icon: "Cpu" },
        { name: "Image Classification / CV", level: 86, icon: "Box" },
        { name: "Data Visualization (Seaborn/Matplotlib)", level: 90, icon: "Sparkles" },
        { name: "Algorithms & Data Structures", level: 89, icon: "Code2" },
      ]
    },
    {
      name: "Analytics & BI",
      color: "from-purple-400 to-indigo-500",
      skills: [
        { name: "Power BI Dashboards", level: 92, icon: "Layers" },
        { name: "Jupyter Notebook", level: 95, icon: "Terminal" },
        { name: "KPI Reporting & Analytics", level: 90, icon: "Gauge" },
        { name: "Exploratory Data Analysis (EDA)", level: 92, icon: "Compass" },
        { name: "Pandas & NumPy", level: 94, icon: "Database" },
      ]
    },
    {
      name: "Full Stack & Databases",
      color: "from-emerald-400 to-teal-500",
      skills: [
        { name: "React.js", level: 85, icon: "React" },
        { name: "Node.js & Express", level: 82, icon: "Server" },
        { name: "MongoDB", level: 84, icon: "HardDrive" },
        { name: "HTML5 & Modern CSS", level: 90, icon: "Palette" },
        { name: "Google Maps API & REST", level: 86, icon: "Network" },
      ]
    },
    {
      name: "Tools & Productivity",
      color: "from-amber-400 to-rose-500",
      skills: [
        { name: "MS Office (Word, PowerPoint, Excel)", level: 96, icon: "FileCode" },
        { name: "Git & GitHub", level: 88, icon: "GitBranch" },
        { name: "VS Code", level: 92, icon: "Code2" },
        { name: "Software Architecture", level: 85, icon: "Layers" },
      ]
    },
    {
      name: "Leadership & Soft Skills",
      color: "from-pink-400 to-purple-500",
      skills: [
        { name: "Analytical Problem Solving", level: 95, icon: "Zap" },
        { name: "Written & Verbal Communication", level: 92, icon: "MessageSquare" },
        { name: "Team Leadership & Coordination", level: 90, icon: "Users" },
        { name: "Academic & Tech Presentations", level: 89, icon: "Compass" },
        { name: "Adaptability & Quick Learning", level: 94, icon: "Sparkles" },
      ]
    }
  ],

  // -------------------------------------------------------------
  // 6. WORK EXPERIENCE (Vertical Timeline with Measurable Bullets)
  // -------------------------------------------------------------
  experience: [
    {
      id: "exp-1",
      company: "Data Valley",
      role: "Data Analytics Intern",
      period: "Dec 2025 — Apr 2026",
      location: "India (Hybrid / Remote)",
      type: "Internship",
      highlight: {
        metric: "Power BI & Jupyter",
        label: "Analytics Stack",
        color: "text-cyan-400 bg-cyan-950/70 border-cyan-500/30"
      },
      bullets: [
        "Conducted end-to-end data preprocessing, cleaning, anomaly filtering, and exploratory visualization to extract reliable analytical insights and improve decision-making accuracy.",
        "Built dynamic executive dashboards in Power BI and Jupyter Notebook, enabling clear real-time reporting of key business KPIs and operational trends.",
        "Utilized Python data science stack (Pandas, NumPy, Matplotlib) to automate repetitive data wrangling tasks, reducing manual preparation time."
      ],
      technologies: ["Python", "Power BI", "Jupyter Notebook", "Pandas", "NumPy", "Data Visualization", "EDA"],
    },
    {
      id: "exp-2",
      company: "Technical Club, Usha Rama College of Engineering and Technology",
      role: "Vice President & Technical Lead",
      period: "2024 — 2026",
      location: "India",
      type: "Leadership & Extracurricular",
      highlight: {
        metric: "8+ Events Led",
        label: "Campus Impact",
        color: "text-purple-400 bg-purple-950/70 border-purple-500/30"
      },
      bullets: [
        "Managed and directed a core student committee to organize and execute high-impact technical events, coding hackathons, and technology workshops.",
        "Encouraged students to participate in coding challenges, explore emerging AI tools, and collaborate on hands-on software projects.",
        "Demonstrated ability to lead and coordinate group projects, ensuring deliverables were completed efficiently, transparently, and on schedule."
      ],
      technologies: ["Team Leadership", "Event Coordination", "Technical Mentorship", "Public Speaking", "Project Planning"],
    },
    {
      id: "exp-3",
      company: "Retail Operations",
      role: "Retail Assistant",
      period: "2024 — 2025",
      location: "India / UK",
      type: "Part-Time Experience",
      highlight: {
        metric: "Logical Resolution",
        label: "Customer Support",
        color: "text-emerald-400 bg-emerald-950/70 border-emerald-500/30"
      },
      bullets: [
        "Experienced in identifying customer and operational issues quickly and implementing logical, customer-focused solutions under peak retail hours.",
        "Developed strong verbal communication, active listening, and conflict resolution skills during daily interactions with diverse customer profiles.",
        "Collaborated closely with colleagues to maintain accurate inventory tracking, POS checkout integrity, and organized store presentation."
      ],
      technologies: ["Problem Solving", "Customer Communication", "Inventory Coordination", "Teamwork", "Adaptability"],
    }
  ],

  // -------------------------------------------------------------
  // 7. FEATURED & SHOWCASE PROJECTS (Problem -> Solution -> Result)
  // -------------------------------------------------------------
  projects: [
    {
      id: "proj-1",
      featured: true,
      title: "Civic Care : Smart Road Safety and Hazard Reporting Platform",
      subtitle: "Crowdsourced Infrastructure Safety Platform with AI Image Classification",
      category: "AI & Full Stack",
      tags: ["React.js", "Node.js", "MongoDB", "TensorFlow", "Keras", "Google Maps API"],
      problem: "Municipal authorities face delays identifying and prioritizing hazardous road defects such as potholes, waterlogging, and streetlight failures due to fragmented reporting channels.",
      solution: "Developed a crowdsourced web-based platform to report and monitor road hazards, implementing deep learning image classification (TensorFlow/Keras) to automatically detect hazard types and pin locations using Google Maps API.",
      result: "Automated hazard detection workflows, cutting manual inspection overhead and enabling municipal teams to prioritize urgent road repairs efficiently.",
      gradient: "from-cyan-500/20 via-blue-600/20 to-purple-600/20",
      accentColor: "#00f2fe",
      previewBadge: "AI Hazard Detection",
    },
    {
      id: "proj-2",
      featured: true,
      title: "AI-Based Adaptive Traffic Management System",
      subtitle: "Intelligent Traffic Light Control Leveraging Deep Learning & Computer Vision",
      category: "Computer Vision & AI",
      tags: ["Python", "TensorFlow", "OpenCV", "Real-Time Telemetry", "Deep Learning"],
      problem: "Fixed-timer traffic lights fail to adapt to sudden vehicle flow variations, leading to excessive waiting times, avoidable carbon emissions, and intersection gridlock.",
      solution: "An AI-based traffic light control system analyzing real-time data from cameras and sensors to evaluate traffic density, vehicle flow, and congestion patterns to dynamically adjust signal timings.",
      result: "Adaptive approach reduces waiting times, minimizes fuel consumption, and enhances road safety by ensuring smoother traffic movement.",
      gradient: "from-purple-500/20 via-indigo-600/20 to-pink-600/20",
      accentColor: "#a855f7",
      previewBadge: "Smart City AI",
    }
  ],

  // -------------------------------------------------------------
  // 8. EDUCATION & CERTIFICATIONS
  // -------------------------------------------------------------
  education: [
    {
      degree: "MSc Data Science and Artificial Intelligence",
      institution: "Sheffield Hallam University, United Kingdom",
      period: "2026 — Current",
      grade: "First Year (In Progress)",
      highlights: "Relevant Modules: Algorithms and Data Structures, Advanced Programming, Data Visualization, Software Architecture, AI Fundamentals, Data Fundamentals.",
    },
    {
      degree: "Bachelor of Technology, Artificial Intelligence and Data Science",
      institution: "Usha Rama College of Engineering and Technology, India",
      period: "2022 — 2026",
      grade: "First Class with Distinction",
      highlights: "Comprehensive coursework in Machine Learning, Statistical Inference, Database Systems, Computer Vision, and Object-Oriented Software Engineering.",
    }
  ],

  certifications: [
    {
      title: "Data Analytics Internship Credential",
      issuer: "Data Valley, India",
      date: "2026",
      credentialUrl: "https://www.datavalley.ai",
      badgeCode: "DV-DA-2026",
    },
    {
      title: "Technical Club Leadership & Event Coordination",
      issuer: "Usha Rama College of Engineering and Technology",
      date: "2025",
      credentialUrl: "#",
      badgeCode: "UR-TECH-VP",
    },
    {
      title: "Deep Learning & Image Classification (TensorFlow/Keras)",
      issuer: "Applied AI Project Credential",
      date: "2025",
      credentialUrl: "#",
      badgeCode: "TF-KERAS-VISION",
    }
  ],

  // -------------------------------------------------------------
  // 9. TESTIMONIALS & ENDORSEMENTS (Optional)
  // -------------------------------------------------------------
  testimonials: [],

  // -------------------------------------------------------------
  // 10. CONTACT & SOCIAL CHANNELS
  // -------------------------------------------------------------
  contact: {
    email: "vamsibuddala21@gmail.com",
    phone: "07344796845",
    location: "Sheffield, United Kingdom",
    callToAction: "Seeking a placement year in Data Science, Machine Learning, or AI where I can apply my analytical skills and drive measurable value. Let's connect!",
    
    // Form service endpoint: Formspree
    formspreeEndpoint: "https://formspree.io/f/sample_portfolio",

    socials: {
      github: "https://github.com/vamsibuddala21",
      linkedin: "https://linkedin.com/in/vamsi-krishna-buddala",
      twitter: "https://twitter.com/vamsibuddala",
      whatsapp: "https://wa.me/447344796845",
      leetcode: "https://leetcode.com/u/vamsibuddala21",
    }
  },

  // -------------------------------------------------------------
  // 11. RESUME PREVIEW CONTENT
  // -------------------------------------------------------------
  resume: {
    fileName: "Vamsi_Krishna_Buddala_CV.pdf",
    downloadUrl: "/resume.pdf",
    lastUpdated: "October 2026",
    summaryBullets: [
      "First-year MSc Data Science and AI student at Sheffield Hallam University seeking a placement year",
      "Hands-on experience in data preprocessing, exploratory analysis, and building interactive Power BI & Jupyter dashboards",
      "Developed deep learning image classification in TensorFlow/Keras for 'Civic Care' road hazard platform",
      "Proven leadership as Technical Club Vice President with strong written, verbal, and teamwork skills"
    ]
  }
};
