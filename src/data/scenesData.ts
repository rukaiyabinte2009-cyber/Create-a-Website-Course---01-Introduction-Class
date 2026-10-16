import type { Scene } from '../types/video.ts';

export const SCENES: Scene[] = [
  {
    id: 1,
    slug: 'the-first-spark',
    title: 'The First Spark',
    subtitle: 'From a blank screen to the first line of code',
    duration: 25,
    voiceover:
      'Every digital experience begins somewhere. With an idea. A problem waiting to be solved. And a few instructions that tell a machine what to do.',
    onScreenText: ['AN IDEA.', 'A FEW INSTRUCTIONS.', 'A WORLD OF POSSIBILITIES.'],
    visualDirection:
      'Complete darkness. A faint electronic hum. A tiny cyan cursor blinks at the center of the frame. One line of code types out character by character: "const future = createWorld();". At the final character, a spark of light bursts into hundreds of luminous particles that begin weaving an interconnected digital network.',
    soundCues: ['Deep cinematic sub-bass', 'Mechanical keyboard clicks', 'Particle spark burst'],
    techTags: ['Terminal', 'Code Spark', 'Initialization'],
    aiPromptSnippet:
      'Ultra-cinematic 8k render, minimalist deep navy-black screen, center blinking neon cyan cursor `> _`, glowing code typing character by character, sparks erupting into luminous particle network, volumetric light bloom, Octane Render style, unreal engine 5, moody futuristic lighting.'
  },
  {
    id: 2,
    slug: 'digital-universe-logos',
    title: 'The Digital Universe',
    subtitle: 'Logos emerge from the center and slide into a living constellation',
    duration: 38,
    voiceover:
      'Think about the things you use every day. Your bank. Your school. Instagram, Facebook, X. Different services. Different purposes. Yet behind these digital experiences lies something they all depend on: software.',
    onScreenText: ['BANKING.', 'EDUCATION.', 'SOCIAL CONNECTION.', 'SOFTWARE.'],
    visualDirection:
      'Camera flies through a glowing neon tunnel into a central glowing energy sphere. Now the requested signature sequence: A 3D Bank vault icon pops up in the exact center and smoothly glides to the left with an electric trail. A 3D School graduation icon pops up from the center and glides to the right. Then Instagram, Facebook, and X (along with YouTube & TikTok) pop up in rapid sequence and fan out into an orbiting constellation. Electric blue laser lines connect them back to the glowing core. The camera pulls back dramatically to reveal an enormous interconnected cyber city pulsing with light trails and highway data streams.',
    soundCues: ['Laser whooshes as icons slide', 'Harmonic synth build', 'Massive cinematic bass drop on SOFTWARE'],
    techTags: ['Constellation', 'Brand Ecosystem', 'Cyber City'],
    aiPromptSnippet:
      'A luminous cyan cyber sphere in dark space. Sleek 3D icons (bank building, school cap, Instagram, Facebook, X logo) pop from center and orbit with glowing laser trails. Camera zooms out to reveal a vast futuristic cyber city grid with glowing fiber-optic highway data streams, isometric neon architecture, cinematic depth of field.'
  },
  {
    id: 3,
    slug: 'what-is-software',
    title: 'What is Software?',
    subtitle: 'Turning human ideas into tools that solve real problems',
    duration: 32,
    voiceover:
      'So, what exactly is software? Software is simply a collection of instructions that tells a computer or device how to perform tasks. It can calculate a result, play a song, manage a classroom, or process a payment. Software is how we turn human ideas into tools that people can actually use.',
    onScreenText: ['SOFTWARE', '=', 'INSTRUCTIONS', '+', 'LOGIC', '+', 'PURPOSE'],
    visualDirection:
      'Camera zooms into an elegant 3D holographic circuit board. Pulses of electric gold and cyan light travel through logic gates. The microprocessor morphs into a calculator, a streaming music player, a student grading dashboard, and a secure checkout counter. Floating holographic UI panels orbit the processor.',
    soundCues: ['Microprocessor electrical hum', 'Data routing clicks', 'Hologram expansion sound'],
    techTags: ['Microprocessor', 'Logic Gates', 'Transformations'],
    aiPromptSnippet:
      'Glowing 3D printed circuit board with luminous golden and cyan traces pulsing with electricity, holographic user interfaces unfolding in floating glass cards (calculator, music player, school dashboard, payment terminal), dark studio background, hyper-detailed tech visual.'
  },
  {
    id: 4,
    slug: 'three-digital-forms',
    title: 'Website, Web App, or Mobile App?',
    subtitle: 'Understanding the 3 primary forms of digital experiences',
    duration: 40,
    voiceover:
      'A website is a collection of pages you visit in a browser to learn and explore. A web application goes further, letting you do real work directly inside the browser—like banking, managing a classroom, or booking a trip. A mobile application lives on your phone, taking advantage of cameras, sensors, and instant notifications. Different forms, same power: solving problems with code.',
    onScreenText: [
      'WEBSITE — INFORM & CONNECT',
      'WEB APP — INTERACT & WORK',
      'MOBILE APP — USE ON THE GO'
    ],
    visualDirection:
      'A sleek dark-mode laptop floats in 3D space displaying a school website with announcement banners. The camera pushes in as the page morphs into an interactive Web App with live charts, search queries, and grade calculators. Then the browser window decomposes into floating glass tiles and reassembles as a 3D smartphone with push notifications and touch interactions.',
    soundCues: ['Mechanical laptop hinge sound', 'UI morphing shimmer', 'Mobile notification chime'],
    techTags: ['Responsive', 'Web App', 'Native Mobile'],
    aiPromptSnippet:
      '3D floating laptop and smartphone displaying synchronized modern interfaces, glassmorphism UI cards with glowing cyan borders, notification badges popping up, clean tech demonstration, dark minimalist aesthetic.'
  },
  {
    id: 5,
    slug: 'how-a-website-works',
    title: 'How Does a Website Work?',
    subtitle: 'The millisecond journey across the global internet',
    duration: 36,
    voiceover:
      'When you type a website address, your browser asks the Domain Name System, or DNS, where to find it. A request travels through undersea cables and satellite links to a server. The server replies in milliseconds with three building blocks: HTML for structure, CSS for visual design, and JavaScript for interactivity.',
    onScreenText: ['URL → DNS → SERVER → RESPONSE', 'HTML (STRUCTURE)', 'CSS (DESIGN)', 'JS (INTERACTION)'],
    visualDirection:
      'A browser address bar types "my-website.com". A glowing laser packet shoots into an orbital 3D wireframe globe, down into undersea glowing fiber cables, arriving at a hyper-modern server rack room. The server lights flash gold, emitting response packets. On return, the webpage assembles in 3 distinct layers: a wireframe skeleton (HTML), vibrant colors and typography (CSS), and live animated buttons (JavaScript).',
    soundCues: ['Typing sound', 'High-speed packet zip', 'Server hum', '3-layer assembly chord'],
    techTags: ['DNS Lookup', 'TCP/IP', 'HTML/CSS/JS Trinity'],
    aiPromptSnippet:
      'High-speed digital packet traveling along fiber-optic cables under a digital globe, arriving at a towering futuristic server rack corridor glowing with cyan and gold lights, three floating transparent layers representing HTML wireframe, CSS color styles, and JavaScript interactive code.'
  },
  {
    id: 6,
    slug: 'why-build-a-website',
    title: 'Why Should You Build a Website?',
    subtitle: 'Tailored for Teachers, Students, and Professionals',
    duration: 38,
    voiceover:
      'For teachers: a website is your classroom companion—sharing lesson notes, homework, and notices beyond school hours. For students: it is your personal portfolio—showing colleges and employers what you can actually build. For professionals and freelancers: it is your 24/7 digital storefront, building credibility while you sleep.',
    onScreenText: [
      'TEACHERS: DIGITAL CLASSROOM',
      'STUDENTS: PROOF-OF-WORK PORTFOLIO',
      'PROFESSIONALS: 24/7 CLIENT STOREFRONT'
    ],
    visualDirection:
      'The screen splits into three 3D floating stage pedestals: 1. Education Portal with live syllabus, student homework upload, and class updates. 2. Student Portfolio with interactive project cards, GitHub links, and skill badges. 3. Freelancer Agency storefront with testimonial carousel, pricing tiers, and a live client booking form. A beam of light bridges all three into a single badge: "YOUR VOICE ONLINE".',
    soundCues: ['Soft camera glide', 'Subtle card flip sound effects', 'Empowering musical chime'],
    techTags: ['Education', 'Portfolio', 'Freelance'],
    aiPromptSnippet:
      'Three floating 3D glass display pedestals in dark room: one showing a modern digital classroom interface, one showing an impressive student developer portfolio, and one showing a sleek professional freelancer services page, warm golden accent lighting.'
  },
  {
    id: 7,
    slug: 'development-environment',
    title: 'Behind the Scenes: Live Coding',
    subtitle: 'Terminals, packages, and instant browser synchronization',
    duration: 48,
    voiceover:
      'Now let’s look under the hood. Developers use command line tools and package managers like npm to bring in pre-built building blocks. With a single command, thousands of lines of tested code are installed in seconds. When you edit a line of code in your editor, your browser updates instantly right before your eyes.',
    onScreenText: ['NPM CREATE VITE@LATEST', 'NPM INSTALL', 'LIVE HOT RELOAD', 'CODE TURNS INTO REALITY'],
    visualDirection:
      'Full-screen VS Code editor and dark terminal. Real commands type out: `npm create vite@latest my-site`, `cd my-site`, `npm install`. A flurry of real packages stream down the terminal with green checkmarks. The project folder tree branches out in 3D. In the editor, lines of code are written: changing `<h1>Welcome</h1>` to `<h1>Hello World</h1>` and modifying a CSS color. The adjacent preview browser window refreshes instantly with a ripple effect!',
    soundCues: ['Rapid authentic mechanical typing', 'Terminal stream chatter', 'Hot reload swoosh'],
    techTags: ['Node.js', 'Vite', 'NPM', 'Live Dev Server'],
    aiPromptSnippet:
      'Photorealistic dark VS Code interface next to an integrated glowing cyan Linux terminal, authentic npm install package stream scrolling rapidly, 3D project folder tree expanding, split-screen live web browser re-rendering instantly upon code edit.'
  },
  {
    id: 8,
    slug: 'languages-behind-magic',
    title: 'The Languages Behind the Magic',
    subtitle: 'From frontend styling to backend APIs and databases',
    duration: 35,
    voiceover:
      'There isn’t just one programming language, and you don’t need to learn them all at once. HTML, CSS, and JavaScript build what users see. TypeScript brings confidence and structure. Python and C# power backend logic and APIs. And SQL stores the data. Different tools for different jobs, working in harmony.',
    onScreenText: ['HTML5 + CSS3 + JS', 'TYPESCRIPT', 'PYTHON + C#', 'SQL DATABASES'],
    visualDirection:
      'A floating 3D architecture diagram. Orbiting language badges (HTML5 orange shield, CSS3 blue badge, JavaScript yellow JS, TypeScript blue TS, Python yellow-blue snakes, C# purple diamond, SQL cylinder database) glow and emit data streams connecting a frontend web interface, through a REST API pipeline, into a relational database.',
    soundCues: ['Harmonic chord progression', 'Data pipe hum', 'Database query chime'],
    techTags: ['Frontend', 'Backend', 'Database Architecture'],
    aiPromptSnippet:
      'Floating 3D isometric tech stack architecture with glowing emblem badges for HTML5, CSS3, JavaScript, TypeScript, Python, C#, and SQL database cylinders, data streams flowing between frontend client and backend server, sci-fi cyber aesthetic.'
  },
  {
    id: 9,
    slug: 'cyber-security',
    title: 'Cybersecurity: Build It, Protect It',
    subtitle: 'Securing users, passwords, and sensitive information',
    duration: 38,
    voiceover:
      'Building is only half the story. A website handles passwords, student records, and payments. If it isn’t protected, attacks can happen. Cybersecurity isn’t an afterthought—it is built into every line: strong passwords, two-factor authentication, encrypted HTTPS connections, and safe databases.',
    onScreenText: ['PROTECT BY DESIGN', 'TWO-FACTOR AUTH', 'HTTPS / SSL ENCRYPTED', 'INPUT SANITIZATION'],
    visualDirection:
      'A server cube floats surrounded by incoming red digital threat darts. A multi-layered hexagonal energy shield activates with a resounding hum, vaporizing the threats. A password field morphs from "123456" (red weak) to "Tr0ng#K3y!99" (green 100% secure). A phone mock displays an SMS 2FA notification approved with a green checkmark. A golden HTTPS padlock locks firmly into place.',
    soundCues: ['Low threat alert pulse', 'Energy shield activation buzz', 'Lock snap sound'],
    techTags: ['Encryption', 'HTTPS/TLS', 'MFA', 'Data Protection'],
    aiPromptSnippet:
      'Towering digital server stack with glowing 3D holographic security padlock, electric blue and golden hexagonal forcefield deflecting red threat vectors, two-factor authentication token confirmation, dark cyber command center.'
  },
  {
    id: 10,
    slug: 'website-goes-live',
    title: 'The Website Goes Live!',
    subtitle: '"This website didn\'t exist 60 seconds ago."',
    duration: 42,
    voiceover:
      'And then, the moment that changes everything. With one click, your code is compiled, deployed to the cloud, and assigned a live HTTPS link. You pull out your phone, scan the QR code, and there it is—live on the global internet for anyone in the world to see.',
    onScreenText: ['BUILDING...', 'DEPLOYED TO CLOUD', 'LIVE HTTPS URL', 'SCAN TO VIEW ON MOBILE'],
    visualDirection:
      'A deployment progress bar hits 100% with a burst of golden particle fireworks. A live URL flashes: `https://my-site.run.app`. A dynamic QR code expands in the center. Next to it, a 3D smartphone scans the QR code and opens the exact live website! The camera rotates 360 degrees showing both laptop and phone in an inspirational studio setting.',
    soundCues: ['Deploy progress whoosh', 'Triumphant fanfare chord', 'Phone camera scan beep'],
    techTags: ['Cloud Deploy', 'QR Code', 'Global Edge CDN'],
    aiPromptSnippet:
      'High-tech deployment celebration with glowing neon progress bar reaching 100%, 3D golden particle burst, scannable QR code hologram floating next to a smartphone displaying the live responsive website, cinematic lighting.'
  },
  {
    id: 11,
    slug: 'your-turn',
    title: 'Now It’s Your Turn',
    subtitle: 'Your 5-stage project path to your own live website',
    duration: 35,
    voiceover:
      'You don’t need a computer science degree to start. You don’t need to memorize hundreds of commands. All you need is curiosity and a step-by-step roadmap. In this course, you will plan, design, code, secure, and publish your own website with a real link to share with family, friends, or clients.',
    onScreenText: ['1. PLAN', '2. BUILD', '3. DESIGN', '4. SECURE', '5. PUBLISH LIVE'],
    visualDirection:
      'A glowing interactive 5-step roadmap unfolds across the screen like illuminated digital stepping stones. Each milestone lights up in succession: 1. Idea & Purpose, 2. HTML & Code Blocks, 3. Responsive Styling, 4. Security & Forms, 5. Going Live on the Cloud. An inspiring human-centric graphic shows a user reaching out and starting stage 1.',
    soundCues: ['Progressive uplifting piano/synth notes', 'Milestone chime pulses'],
    techTags: ['Curriculum', 'Project-Based', 'Confidence'],
    aiPromptSnippet:
      'Five glowing futuristic glass stepping stones forming an illuminated roadmap in deep navy space: Plan, Build, Design, Secure, Publish. Luminous cyan connection lines, inspiring educational journey motif.'
  },
  {
    id: 12,
    slug: 'final-title-reveal',
    title: 'Your Website, Live Today',
    subtitle: 'Let’s build something real together',
    duration: 26,
    voiceover:
      'Welcome to the beginning of your software journey. Don’t just watch others build the future. Build it yourself. Your website, live today. Let’s get started.',
    onScreenText: ['YOUR WEBSITE, LIVE TODAY', 'LEARN. BUILD. PUBLISH.', 'ENROLL NOW'],
    visualDirection:
      'The background fades to velvet midnight navy. A laser beam of electric cyan draws the headline: "YOUR WEBSITE, LIVE TODAY" in bold kinetic typography with a golden rim light. The glowing devices (laptop, tablet, phone) sit proudly beneath it. A pulsing "START BUILDING" button glows warmly.',
    soundCues: ['Grand cinematic orchestral swell', 'Reverberant chime', 'Deep inspirational bass finish'],
    techTags: ['Grand Finale', 'Call To Action', 'Launch'],
    aiPromptSnippet:
      'Cinematic movie title screen with 3D metallic gold and glowing cyan typography reading "YOUR WEBSITE, LIVE TODAY", floating sleek laptop and phone displaying modern web interfaces, subtle particle dust, lens flare, premium software commercial ending.'
  }
];
