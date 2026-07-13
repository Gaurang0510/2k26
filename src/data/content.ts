export const heroContent = {
  badge: 'CLASSIFIED CASE FILE #2026',
  title: 'UPSURGE',
  subtitle: 'National Level Technical Festival',
  tagline: 'Every challenge leaves evidence. Every innovator solves the impossible.',
  primaryCta: '[ Begin Investigation ]',
  secondaryCta: '[ Explore Missions ]',
}

export const hudPanels = [
  { label: 'Case Status', value: 'ACTIVE', icon: 'status', variant: 'cyan' as const },
  { label: 'Threat Level', value: 'HIGH', icon: 'warning', variant: 'red' as const },
  { label: 'Investigations', value: '15', icon: 'folder', variant: 'white' as const },
  { label: 'Prize Pool', value: '₹3,00,000+', icon: 'trophy', variant: 'cyan' as const },
  { label: 'Participants', value: '2500+', icon: 'people', variant: 'white' as const },
  { label: 'Cities', value: '50+', icon: 'globe', variant: 'white' as const },
]

export const aboutContent = {
  badge: 'CASE BRIEFING // SECTION 01',
  title: 'Decoding the Future of Innovation',
  description:
    'UPSURGE 2026 is not just a technical festival — it\'s a classified operation. A convergence of the brightest minds in cybersecurity, digital forensics, and artificial intelligence. Enter the headquarters. Analyze the evidence. Crack the code.',
  features: [
    {
      title: 'Digital Forensics',
      description:
        'Dive deep into the art of digital evidence recovery, malware analysis, and cyber crime scene investigation.',
      icon: 'fingerprint',
    },
    {
      title: 'Cyber Intelligence',
      description:
        'Explore cutting-edge threat detection, network security, and real-time intrusion defense systems.',
      icon: 'shield',
    },
    {
      title: 'AI Investigation',
      description:
        'Leverage machine learning and neural networks to automate forensic analysis and pattern recognition.',
      icon: 'brain',
    },
  ],
  stats: [
    { label: 'Events', value: 15 },
    { label: 'Participants', value: 2500 },
    { label: 'Cities', value: 50 },
    { label: 'Prize Pool', value: 300000, prefix: '₹', suffix: '+' },
  ],
}

export const eventsContent = {
  badge: 'CLASSIFIED MISSIONS // SECTION 02',
  title: 'Active Investigations',
  description: 'Each mission is a test of skill, strategy, and technical mastery. Choose your operation.',
  events: [
    {
      id: 'ctf',
      category: 'Competition',
      title: 'Capture The Flag',
      description:
        'Exploit vulnerabilities, decrypt ciphers, and race through multi-layered security challenges in this high-stakes CTF competition.',
      difficulty: 'Expert',
      date: 'Day 1 — 10:00 AM',
      slots: 100,
    },
    {
      id: 'hackathon',
      category: 'Technical',
      title: 'Code Breach',
      description:
        'A 24-hour hackathon where teams build security solutions, forensic tools, and AI-powered defense systems.',
      difficulty: 'Advanced',
      date: 'Day 1-2 — 24hrs',
      slots: 200,
    },
    {
      id: 'forensics',
      category: 'Workshop',
      title: 'Digital Forensics Lab',
      description:
        'Hands-on workshop analyzing disk images, memory dumps, and network captures to solve simulated cyber crimes.',
      difficulty: 'Intermediate',
      date: 'Day 1 — 2:00 PM',
      slots: 50,
    },
    {
      id: 'ai-ml',
      category: 'Competition',
      title: 'Neural Network Ops',
      description:
        'Build and train AI models for anomaly detection, threat classification, and automated incident response.',
      difficulty: 'Advanced',
      date: 'Day 2 — 10:00 AM',
      slots: 80,
    },
    {
      id: 'robowars',
      category: 'Technical',
      title: 'Robo Wars',
      description:
        'Design, build, and battle autonomous robots in an arena of destruction. Engineering meets combat strategy.',
      difficulty: 'Expert',
      date: 'Day 2 — 1:00 PM',
      slots: 30,
    },
    {
      id: 'escape',
      category: 'Experience',
      title: 'Cyber Escape Room',
      description:
        'Race against the clock in a physical+digital escape room filled with ciphers, hardware puzzles, and logic traps.',
      difficulty: 'All Levels',
      date: 'Both Days',
      slots: 120,
    },
  ],
}

export const timelineContent = {
  badge: 'OPERATION TIMELINE // SECTION 03',
  title: 'Mission Schedule',
  entries: [
    {
      date: 'August 1, 2026',
      title: 'Registration Opens',
      description: 'Access granted. Begin assembling your team and register for classified operations.',
    },
    {
      date: 'August 20, 2026',
      title: 'Early Bird Deadline',
      description: 'Reduced clearance fees expire. Secure your position at discounted rates.',
    },
    {
      date: 'September 1, 2026',
      title: 'Pre-Event Workshops',
      description: 'Online briefing sessions begin. Get mission-ready with expert-led training modules.',
    },
    {
      date: 'September 10, 2026',
      title: 'Registration Closes',
      description: 'Final intake. All operative credentials must be submitted before this date.',
    },
    {
      date: 'September 15, 2026',
      title: 'Main Event — Day 1',
      description: 'Operations commence. CTF, Hackathon, Forensics Lab, and Escape Room go live.',
    },
    {
      date: 'September 16, 2026',
      title: 'Main Event — Day 2',
      description: 'Final rounds, Robo Wars, AI Showdown, and the Grand Closing Ceremony with awards.',
    },
  ],
}

export const sponsorsContent = {
  badge: 'INTEL PARTNERS // SECTION 04',
  title: 'Allied Organizations',
  description: 'Strategic partnerships powering the future of cyber investigation and innovation.',
  tiers: [
    {
      name: 'Platinum',
      sponsors: [
        { name: 'CyberCore Systems', initials: 'CS' },
        { name: 'NeuralNet Labs', initials: 'NL' },
      ],
    },
    {
      name: 'Gold',
      sponsors: [
        { name: 'DataForge Inc.', initials: 'DF' },
        { name: 'SecureVault', initials: 'SV' },
        { name: 'QuantumByte', initials: 'QB' },
      ],
    },
    {
      name: 'Silver',
      sponsors: [
        { name: 'CloudMesh', initials: 'CM' },
        { name: 'ByteShield', initials: 'BS' },
        { name: 'InfoPulse', initials: 'IP' },
        { name: 'TechNova', initials: 'TN' },
      ],
    },
  ],
}

export const galleryContent = {
  badge: 'VISUAL INTEL // SECTION 05',
  title: 'Evidence Archives',
  description: 'Declassified footage from previous operations.',
  items: [
    { title: 'Hackathon Arena', category: 'Competition' },
    { title: 'Keynote Briefing', category: 'Event' },
    { title: 'CTF War Room', category: 'Competition' },
    { title: 'Workshop Lab', category: 'Workshop' },
    { title: 'Robo Wars Arena', category: 'Technical' },
    { title: 'Closing Ceremony', category: 'Event' },
  ],
}

export const footerContent = {
  description: 'A classified operation by the brightest minds in cybersecurity, digital forensics, and AI innovation.',
  quickLinks: [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Gallery', href: '#gallery' },
  ],
  contactLinks: [
    { label: 'Security Protocol', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact Command', href: '#' },
  ],
  socials: [
    { platform: 'twitter', href: '#' },
    { platform: 'instagram', href: '#' },
    { platform: 'linkedin', href: '#' },
    { platform: 'github', href: '#' },
  ],
}
