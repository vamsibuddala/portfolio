# 🌌 Recruiter-Focused 3D Personal Portfolio

A stunning, recruiter-optimized 3D personal portfolio web application built with **React**, **Three.js (React Three Fiber + Drei)**, **Tailwind CSS**, and **Framer Motion**. Designed to grab a hiring manager's or technical recruiter's attention within 5 seconds while remaining lightweight, fast-loading, and 100% ATS-friendly.

---

## 🚀 Key Features

### 1. 3D Avatar & Interactive Hero Workspace
- **Floating 3D Workspace**: Features an obsidian floating island, sleek standing desk, futuristic laptop with pulsing glow screen, desk succulent, and orbiting holographic tech emblems.
- **Full-Body Stylized Avatar**: Includes breathing animation, waving greeting gesture on mount/welcome, head tracking cursor position, and jaw/mouth movements modulated by audio amplitude.
- **Easy Custom GLB Swap**: Drop your custom Ready Player Me, Mixamo, or Blender avatar file directly into `/public/avatar.glb`! The application automatically detects it and renders your model.
- **Voice Welcome Engine**:
  - Full-screen splash screen with asset loading progress and "Enter Portfolio" audio unlock.
  - Spoken welcome audio greeting: plays `/public/audio/welcome.mp3` with automatic fallback to browser `speechSynthesis` using `phoneticName`.
  - Live synchronized speech captions for accessibility and mute recruiters.
  - Session etiquette: plays once per session, with replay greeting button and sound mute toggle.
- **Interactive Speech Bubble & Name Origin**:
  - Speech bubble with typewriter animation.
  - "What does my name mean?" interactive card explaining the meaning and heritage of your name.

### 2. Recruiter Fast View (1-Screen Summary)
- Sticky top header and bottom-right floating pill that opens an executive recruiter summary.
- Displays: total experience, latest role, notice period, location, work model, top 8 core skills, education, visa status, 1-click copy for email/phone, and tracked resume download.

### 3. Complete Page Sections (ATS-Friendly DOM)
1. **Hero**: 3D scene, name, role, value proposition, "Download Resume", "Hire Me", "View Projects".
2. **About Me**: Narrative architectural story, employment preferences, languages.
3. **Skills**: Interactive **3D Rotating Skill Galaxy** paired with ATS progress bars across Frontend & 3D, Backend, Databases, Cloud & DevOps, and Leadership.
4. **Experience**: Animated vertical timeline with company, role, dates, and 3 measurable impact bullets per role.
5. **Projects**: Interactive **3D tilt cards** with problem-to-solution-to-result breakdowns, tags, demo, and GitHub links. Cards react to hover and trigger avatar attentiveness.
6. **Education & Certifications**: Academic degrees and verified industry credentials with badges.
7. **Achievements**: Metric counters (Years experience, apps shipped, monthly users, Lighthouse 98/100).
8. **Testimonials**: Endorsement cards with star ratings (gracefully auto-hides if empty).
9. **Resume**: Embedded document preview sheet and instant PDF download.
10. **Contact**: Working message transmission form (Formspree / direct), email, phone, location, LinkedIn, GitHub, LeetCode, WhatsApp.

---

## 📁 Folder Structure

```
profile/
├── public/
│   ├── avatar.glb          # <-- Drop your custom 3D avatar GLB file here
│   ├── audio/
│   │   └── welcome.mp3     # <-- Drop your custom pre-recorded voice audio here
│   ├── favicon.svg         # Glowing Cyber Aurora SVG icon
│   ├── sitemap.xml         # SEO search engine sitemap
│   └── resume.pdf          # Your downloadable resume PDF
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── AvatarModel.jsx          # 3D Avatar (GLB loader + procedural fallback)
│   │   │   ├── CameraController.jsx     # Scroll & mouse parallax 3D camera
│   │   │   ├── HeroCanvas.jsx           # Canvas wrapper & lighting
│   │   │   ├── SkillGalaxyCanvas.jsx    # 3D orbiting skill orbs galaxy
│   │   │   ├── StarfieldParticles.jsx   # Cyber space glowing particle stardust
│   │   │   └── WorkspaceEnvironment.jsx # Floating desk, laptop, succulent, tech icons
│   │   ├── hero/
│   │   │   └── HeroOverlay.jsx          # Speech bubble, name meaning, action CTAs
│   │   ├── icons/
│   │   │   └── BrandIcons.jsx           # GitHub, LinkedIn, Twitter/X SVGs
│   │   ├── layout/
│   │   │   ├── Navbar.jsx               # Sticky nav, recruiter button, audio toggle
│   │   │   └── Footer.jsx               # Technology credits & back-to-top
│   │   ├── projects/
│   │   │   └── ProjectCard.jsx          # 3D tilt physics & Problem-Solution-Result card
│   │   ├── recruiter/
│   │   │   └── RecruiterQuickViewModal.jsx # 1-screen ATS recruiter executive view
│   │   ├── sections/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── AchievementsSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── EducationSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── ResumeSection.jsx
│   │   │   └── TestimonialsSection.jsx
│   │   └── IntroSplash.jsx              # Loading progress bar & audio unlock modal
│   ├── data/
│   │   └── portfolio.js                 # 🌟 SINGLE CENTRAL DATA STORE FOR ALL CONTENT
│   ├── hooks/
│   │   └── useVoiceWelcome.js           # Audio engine, Web Audio Analyser & Speech API
│   ├── App.jsx                          # Main view orchestration & scroll tracking
│   ├── index.css                        # Cyber Aurora tokens, glassmorphism & typography
│   └── main.jsx
├── index.html                           # SEO meta tags, Open Graph & JSON-LD Person schema
├── tailwind.config.js                   # Cyber Aurora color palette & glowing shadows
├── vite.config.js                       # Vite build configuration
└── package.json
```

---

## 🛠️ Setup and Run Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔄 How to Customize Your Content & 3D Assets

### 1. Update All Text & Resume Details in One Place
Open [`src/data/portfolio.js`](file:///c:/Users/91888/Downloads/profile/src/data/portfolio.js). Every single text string, bullet point, project, skill, and link is driven by this file:
- `personal.name`: Your display name
- `personal.phoneticName`: How your name should be spoken by the avatar voice (e.g. `"Pri-yaa"`, `"Ah-lex"`)
- `personal.role`: Your title (e.g. `"Full Stack Developer"`, `"AI Systems Engineer"`)
- `personal.valueProposition`: Your 1-line hook
- `personal.nameOrigin`: Meaning and fun fact for the interactive flip card
- `recruiterSummary`: Top 8 skills and key facts shown in the Recruiter Quick View
- `skillsCategories`: Categorized skills and proficiency levels (1-100)
- `experience`: Work history with 3 measurable impact bullets per role
- `projects`: Featured projects with Problem -> Solution -> Result breakdown
- `contact.formspreeEndpoint`: Paste your Formspree endpoint URL to receive messages directly to your inbox

### 2. Replace the 3D Avatar (.glb)
1. Export or download your 3D avatar as a `.glb` file (e.g., from [Ready Player Me](https://readyplayer.me) or [Mixamo](https://www.mixamo.com)).
2. Place the file at:
   ```
   public/avatar.glb
   ```
3. The application will automatically detect this file and display your model in place of the procedural avatar!

### 3. Replace the Voice Welcome Audio (.mp3)
1. Record your 5-8 second greeting or generate an AI voiceover:
   > *"Hi, I'm [Your Name]. Welcome to my portfolio. I'm a [Your Role]. Scroll down to explore my work."*
2. Save the MP3 file at:
   ```
   public/audio/welcome.mp3
   ```
3. If no file is present, the app automatically falls back to the browser's high-quality Web Speech API using your `phoneticName`.

---

## 🌐 Deployment Steps

### Deploy to Vercel
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**. Your 3D portfolio will be live with free global CDN and HTTPS!

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **"Deploy site"**.
