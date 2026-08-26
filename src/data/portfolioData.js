// ============================================================
// portfolioData.js — Centralized configuration for Niharika's Creative Portfolio
// All links, profile info, and video showcase content in one place.
// ============================================================

export const personalInfo = {
  name: "Niharika",
  firstName: "Niharika",
  brandName: "Niharika",
  title: "Video Editor & Motion Designer",
  location: "Bangalore, Karnataka, India - 560025",
  phone: null, // Removed per request
  emails: {
    primary: "niharika.kk100@gmail.com",
  },
  summary:
    "Freelance Video Editor & Motion Designer passionate about creating cinematic, engaging, and high-impact content that captures attention from the very first second.",
  resumeUrl: "/Niharika_Resume.pdf",
};

export const socialLinks = {
  instagram: null,
  github: null,
  linkedin: null,
};


export const heroContent = {
  greeting: "Hi, I'm Niharika",
  titleHighlight: "Video Editor & Motion Designer",
  subtitle:
    "I transform raw footage into polished, compelling stories through creative editing, motion graphics, sound design, and cinematic storytelling.",
  ctaPrimary: { text: "Explore Portfolio", href: "#projects" },
  ctaSecondary: {
    text: "Let's Talk",
    href: "#contact",
  },



  ctaResume: { text: "Download Resume", href: "/Niharika_Resume.pdf" },
};

export const aboutContent = {
  heading: "Cinematic Storyteller",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Niharika</span>, a freelance Video Editor & Motion Designer based in Bangalore, India. I specialize in turning raw footage into high-impact visual narratives using premium editing, sound design, and custom graphics.`,
  techStack: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
};

export const skillsContent = {
  badge: "My Creative Process",
  heading: "How I Turn Raw Ideas Into Cinematic Masterpieces",
  description:
    "I follow a structured, collaborative, and artistic editing workflow designed to deliver high-retention, industry-standard video content.",
  cards: [
    {
      number: "01",
      title: "Discover",
      text: "Understanding the brand voice, core message, target audience, and mood to build a strong creative brief.",
    },
    {
      number: "02",
      title: "Storyboard",
      text: "Drafting the visual rhythm, narrative pacing, and layout ideas before editing to ensure a coherent structural flow.",
    },
    {
      number: "03",
      title: "Edit",
      text: "Assembling the footage with pixel-perfect cuts, cinematic pacing, visual hooks, and tight narrative alignment.",
    },
    {
      number: "04",
      title: "Motion",
      text: "Enhancing the edit with custom 2D/3D titles, smooth transitions, kinetic typography, and advanced sound design.",
    },
    {
      number: "05",
      title: "Deliver",
      text: "Final color grading, sound mastering, audio leveling, and optimization for the highest resolution distribution.",
    },
  ],
  endText: "Ready to launch!",
};

// Software Suite (formerly Technical Skills)
export const technicalSkills = {
  categories: [
    {
      title: "Video Editing",
      skills: [
        { name: "Adobe Premiere Pro", level: 100 },
        { name: "DaVinci Resolve", level: 85 },
      ]
    },
    {
      title: "Motion Graphics",
      skills: [
        { name: "Adobe After Effects", level: 90 },
      ]
    },
    {
      title: "Sound Design",
      skills: [
        { name: "Adobe Audition", level: 85 },
      ]
    },
    {
      title: "Design & Assets",
      skills: [
        { name: "Adobe Photoshop", level: 85 },
        { name: "Adobe Illustrator", level: 75 },
      ]
    },
    {
      title: "Workflow & Export",
      skills: [
        { name: "Adobe Media Encoder", level: 90 },
      ]
    }
  ]
};

// Creative Skills (formerly Soft Skills)
export const softSkillsList = [
  { name: "Video Editing", icon: "🎬", desc: "Expert assembly, pacing, multi-cam synchronization, and visual structure." },
  { name: "Motion Design", icon: "✨", desc: "Crafting fluid vector, UI, shape, and typographic animations." },
  { name: "Motion Graphics", icon: "🎨", desc: "Dynamic screen layouts, 2D overlays, lower-thirds, and titles." },
  { name: "Cinematic Storytelling", icon: "🎥", desc: "Structuring engaging narrative arches that maximize viewer retention." },
  { name: "Color Grading", icon: "🎨", desc: "Color correction, custom LUT tuning, skin-tone matching, and mood setting." },
  { name: "Sound Design", icon: "🔊", desc: "Audio cleanup, SFX placement, background layering, and dynamic leveling." },
  { name: "Visual Effects (VFX)", icon: "✨", desc: "Compositing, green screen keying, tracking, and custom transitions." },
  { name: "Typography", icon: "T", desc: "Pacing font layers, choosing fonts, and styling clean screen text." },
  { name: "Short-Form Content", icon: "📱", desc: "Fast-paced hooks, retention editing, and captions optimized for Reels/Shorts." },
  { name: "Commercial Editing", icon: "💼", desc: "High-impact direct response ads, commercials, and brand films." }
];

// Video Showcase Projects
export const projects = [
  {
    id: "brand-film",
    number: "01",
    badge: "🔥 Centerpiece Work",
    title: "Brand Film Showcase",
    category: "Brand Films",
    description: "A cinematic brand identity film combining atmospheric visuals, deep color grading, and organic sound design to communicate core company values.",
    techTags: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    videoUrl: "/videos/brand-film.mp4",
    posterUrl: "/videos/thumbnails/brand-film.jpg",
    client: "Lifestyle Brand",
    duration: "0:45",
    isFlagship: true,
  },
  {
    id: "podcast-editing",
    number: "02",
    badge: "🎙️ Podcast",
    title: "Podcast Narrative Edit",
    category: "Podcast Editing",
    description: "Multi-camera studio podcast edit structured with dynamic zoom cuts, audio track compression, noise reduction, and custom captioned overlays.",
    techTags: ["Premiere Pro", "Audition", "Photoshop"],
    videoUrl: "/videos/podcast-editing.mp4",
    posterUrl: "/videos/thumbnails/podcast-editing.jpg",
    client: "Digital Creator",
    duration: "1:20",
    isFlagship: false,
  },
  {
    id: "brand-edit",
    number: "03",
    badge: "🎬 Brand Edit",
    title: "Brand Identity Film",
    category: "Brand Films",
    description: "A sleek brand commercial edit combining atmospheric visuals, bold color grading, and rhythmic sound design.",
    techTags: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    videoUrl: "/videos/brand-edit.mp4",
    posterUrl: "/videos/thumbnails/brand-edit.jpg",
    client: "Corporate Client",
    duration: "0:55",
    isFlagship: false,
  },
  {
    id: "commercial-edit",
    number: "04",
    badge: "💼 Commercial",
    title: "Commercial Advertising Reel",
    category: "Commercials",
    description: "High-octane commercial ad featuring punchy transitions, bold graphics, and precision sound design engineered for audience conversion.",
    techTags: ["Premiere Pro", "After Effects", "Audition"],
    videoUrl: "/videos/commercial-edit.mp4",
    posterUrl: "/videos/thumbnails/commercial-edit.jpg",
    client: "Commercial Agency",
    duration: "1:10",
    isFlagship: false,
  },
  {
    id: "documentary-edit",
    number: "05",
    badge: "🎥 Documentary",
    title: "Documentary Feature Edit",
    category: "Documentary Editing",
    description: "A compelling storytelling documentary edit focusing on interview pacing, emotional rhythm, atmospheric color grading, and ambient audio.",
    techTags: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    videoUrl: "/videos/documentary-edit.mp4",
    posterUrl: "/videos/thumbnails/documentary-edit.jpg",
    client: "Independent Film",
    duration: "1:45",
    isFlagship: false,
  },
  {
    id: "fashion-edit",
    number: "06",
    badge: "✨ Fashion",
    title: "Fashion & Style Showcase",
    category: "Fashion & Lifestyle",
    description: "Stylish, fast-paced fashion lookbook reel with synchronized beat-matching, stylized color contrast, and elegant visual motion.",
    techTags: ["Premiere Pro", "After Effects"],
    videoUrl: "/videos/fashion-edit.mp4",
    posterUrl: "/videos/thumbnails/fashion-edit.jpg",
    client: "Fashion Label",
    duration: "0:40",
    isFlagship: false,
  },
  {
    id: "map-animation-edit",
    number: "07",
    badge: "🗺️ Animation",
    title: "Cartographic Map Motion",
    category: "Motion Graphics",
    description: "Custom 3D/2D animated map sequence designed for geographic storytelling, historical context, and documentary graphics.",
    techTags: ["After Effects", "Photoshop", "Illustrator"],
    videoUrl: "/videos/map-animation-edit.mp4",
    posterUrl: "/videos/thumbnails/map-animation-edit.jpg",
    client: "Educational Media",
    duration: "0:30",
    isFlagship: false,
  },
  {
    id: "motion-graphics-edit",
    number: "08",
    badge: "🎨 Motion Design",
    title: "Kinetic Motion Graphics Showcase",
    category: "Motion Graphics",
    description: "High-energy motion graphics showcase incorporating kinetic typography, vector transitions, and animated logo elements.",
    techTags: ["After Effects", "Illustrator"],
    videoUrl: "/videos/motion-graphics-edit.mp4",
    posterUrl: "/videos/thumbnails/motion-graphics-edit.jpg",
    client: "Digital Agency",
    duration: "0:35",
    isFlagship: false,
  },
  {
    id: "real-estate-edit",
    number: "09",
    badge: "🏠 Architecture",
    title: "Luxury Real Estate Tour",
    category: "Real Estate",
    description: "Cinematic architectural walkthrough featuring smooth gimbal stabilization, natural lighting enhancements, and ambient sound design.",
    techTags: ["Premiere Pro", "DaVinci Resolve"],
    videoUrl: "/videos/real-estate-edit.mp4",
    posterUrl: "/videos/thumbnails/real-estate-edit.jpg",
    client: "Real Estate Agency",
    duration: "1:15",
    isFlagship: false,
  },
  {
    id: "talking-head-edit",
    number: "10",
    badge: "🗣️ Interview",
    title: "Talking Head & Interview Edit",
    category: "Corporate & Interviews",
    description: "Clean, engaging interview edit with multi-cam switching, jump-cut smoothing, background audio cleanup, and dynamic lower-thirds.",
    techTags: ["Premiere Pro", "Audition"],
    videoUrl: "/videos/talking-head-edit.mp4",
    posterUrl: "/videos/thumbnails/talking-head-edit.jpg",
    client: "Media Brand",
    duration: "1:05",
    isFlagship: false,
  },
  {
    id: "wedding-edit",
    number: "11",
    badge: "💍 Wedding Film",
    title: "Cinematic Wedding Highlights",
    category: "Events & Weddings",
    description: "Heartfelt cinematic wedding highlight film featuring storytelling audio clips, warm color tones, and seamless emotional pacing.",
    techTags: ["Premiere Pro", "DaVinci Resolve"],
    videoUrl: "/videos/wedding-edit.mp4",
    posterUrl: "/videos/thumbnails/wedding-edit.jpg",
    client: "Event Production",
    duration: "2:15",
    isFlagship: false,
  },
];

export const certificates = {
  featured: [
    {
      id: "creagenix-cert",
      title: "Video Editing and Motion Graphics Course",
      issuer: "Creagenix Academy",
      date: "11 December 2024",
      certId: "CAX/2024/12678",
      imageUrl: "/certificate.jpg",
      description: "Official Certificate of Completion for Video Editing and Motion Graphics conducted by Creagenix Academy.",
    }
  ],
  viewAllUrl: null,
};

// Client Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Founder & Lead Creator",
    company: "TechGyan Media",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
    initials: "AS",
    projectType: "Tech & YouTube Reel",
    rating: 5,
    quote: "Niharika completely elevated our YouTube content quality. Her jump-cut pacing, clean kinetic typography, and audio leveling doubled our viewer retention within two months. She understands creator storytelling better than anyone!",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Marketing Head",
    company: "Lumina Skincare India",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    initials: "PN",
    projectType: "D2C Brand Commercial",
    rating: 5,
    quote: "Working with Niharika on our festive ad campaign was a delight. The color grading, sound design, and slick motion graphics turned our raw campaign footage into a high-converting Instagram reel & brand hero video.",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Podcast Host & Producer",
    company: "The Founder's Uncut Podcast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    initials: "RK",
    projectType: "Multi-Cam Podcast Edit",
    rating: 5,
    quote: "Editing multi-cam studio podcasts with multiple speakers is tough, but Niharika handles it effortlessly. Crisp audio noise reduction, smooth angle switches, and custom animated lower-thirds. Super reliable delivery!",
  },
  {
    id: 4,
    name: "Ananya Deshmukh",
    role: "Documentary Filmmaker",
    company: "Studio Katha Films",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    initials: "AD",
    projectType: "Documentary Feature",
    rating: 5,
    quote: "Niharika has an incredible narrative eye. She brought emotional depth to our documentary through subtle pacing, ambient sound layering, and seamless scene transitions. Truly top-tier editing talent!",
  }
];

export const education = {
  degree: null, // Hidden per request
  institution: null,
  cgpa: null,
  graduation: null,
  twelfth: null,
  tenth: null,
};

export const footerContent = {
  taglines: [
    "Video Editing & Motion Graphics",
    "Cinematic Storytelling · Color Grading",
    "Creative Direction & Design",
  ],
  credential: "70+ Design Projects · 50+ Video Edits",
  copyright: `© ${new Date().getFullYear()} Niharika | Creative Portfolio`,
};

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
