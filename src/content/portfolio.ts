export const profile = {
  name: 'Phyo Thinzar Aung',
  role: 'Software Engineer | Full-Stack & Mobile Development',
  site: 'https://phyothinzaraung.github.io',
  email: 'phyothinzarr.aung@gmail.com',
  resume: '/assets/img/PA_RESUME.pdf',
  summary: 'Software Engineer specializing in mobile development, backend systems, and modern web applications.',
  about: 'I build full-stack applications with Java, Spring Boot, React, TypeScript, and PostgreSQL. My project work spans backend APIs, data storage, and the web interfaces that use them.',
  mobileExperience: 'My professional experience includes mobile development in delivery, banking, and healthcare. I’ve worked on live order tracking, account onboarding, and clinical records that can be saved offline and synchronized later.',
}

export const hero = {
  headline: {
    opening: 'Building scalable software,',
    continuation: 'from mobile applications to',
    highlight: 'full-stack platforms.',
  },
  initials: 'PTA',
  technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Kotlin', 'Jetpack Compose'],
}

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/phyothinzaraung' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/phyothinzaraung/' },
  { label: 'Medium', href: 'https://medium.com/@phyothinzaraung' },
  { label: 'YouTube', href: 'https://www.youtube.com/@phyo-thinzar-aung' },
]

export const navigation = [
  { label: 'About', href: '/#about', mobileOnly: true },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills', mobileOnly: true },
  { label: 'Learning Lab', href: '/#lab' },
  { label: 'Writing', href: '/#blogs' },
  { label: 'Education', href: '/#education', mobileOnly: true },
  { label: 'Contact', href: '/#contactme' },
]

type Role = {
  title: string
  company: string
  location: string
  dates: string
  highlight?: string
  description: string
  contributions: string[]
  technologies: string[]
  projects: string[]
}

export const roles: Role[] = [
  {
    title: 'Android Developer',
    company: 'Resolve Tech Solutions',
    location: 'Irving, Texas',
    dates: 'Jun 2024 – Aug 2024',
    highlight: '7NOW · 7-Eleven client',
    description: 'Maintained order tracking and delivery status features for 7-Eleven’s 7NOW Android app.',
    contributions: [
      'Updated Order Tracker to refresh delivery status through backend APIs.',
      'Maintained the GoldPass and SEUser libraries and collaborated on unit testing and code reviews.',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'StateFlow', 'Hilt', 'REST APIs', 'JUnit'],
    projects: ['7now'],
  },
  {
    title: 'Mobile Android Software Engineer',
    company: 'Kanbawza (KBZ) Bank',
    location: 'Yangon, Myanmar',
    dates: 'Mar 2022 – Jan 2023',
    highlight: 'Digital onboarding and payments',
    description: 'Led Android development for digital onboarding and payment workflows with backend, QA, and product teams.',
    contributions: [
      'Developed branch account-opening workflows and coordinated integrations across two Oracle backend versions.',
      'Supported testing and managed updates for KBZPay and KBZPay Partner across Google Play, Huawei, and Mi Stores.',
    ],
    technologies: ['Android Jetpack', 'Navigation', 'RxJava', 'Koin', 'Oracle integration', 'IDMission'],
    projects: ['kbz-digital-onboarding'],
  },
  {
    title: 'Senior Mobile Developer',
    company: 'Koe Koe Tech IT Social Enterprise',
    location: 'Yangon, Myanmar',
    dates: 'Nov 2016 – Feb 2022',
    highlight: 'Healthcare and civic software',
    description: 'Guided mobile teams and developed applications for healthcare, education, and government services.',
    contributions: [
      'Worked with clinical teams to document workflows and build Android features for consultation records.',
      'Helped support offline record entry and later synchronization for clinics with limited connectivity.',
      'Collaborated with design and QA on unit, integration, and user acceptance testing.',
    ],
    technologies: ['Android', 'Swift', 'Dart', 'SQLite', 'Realm', 'Firebase', 'Google Cloud', 'REST APIs'],
    projects: ['healthcare-applications', 'clinic-information-management', 'doctor-note', 'myo-taw'],
  },
  {
    title: 'Android Developer',
    company: 'Diamond Butterfly Trading Company',
    location: 'Yangon, Myanmar',
    dates: 'Jan 2016 – Oct 2016',
    description: 'Built and maintained Commotrade, an Android app for market information and broker orders.',
    contributions: ['Integrated WebSockets for live market data and coordinated delivery with design, API, and project teams.'],
    technologies: ['Java', 'Android', 'WebSockets', 'MVC', 'SQLite'],
    projects: ['commotrade'],
  },
  {
    title: 'Junior Android Developer',
    company: 'Bagan Innovation Technology',
    location: 'Yangon, Myanmar',
    dates: 'Jan 2015 – Jun 2015',
    description: 'Developed features for Android news, FM radio, and agriculture apps.',
    contributions: ['Implemented user-requested features across the three app areas.'],
    technologies: ['Java', 'Android', 'Eclipse ADT', 'MVC', 'SQLite'],
    projects: [],
  },
]

export const skills = [
  {
    id: 'full-stack',
    title: 'Full-Stack Application Development',
    status: 'Project experience',
    description: 'Connect web interfaces, backend APIs, and databases into complete workflows.',
    preview: ['Spring Boot', 'React', 'PostgreSQL'],
    detail: 'In AI Interview Buddy, I built the React practice workflow, its Spring Boot API, and the PostgreSQL persistence behind interview sessions.',
    technologies: ['Java', 'TypeScript', 'Spring Security', 'JWT'],
    link: { label: 'AI Interview Buddy case study', href: '/projects/ai-interview-buddy/' },
  },
  {
    id: 'backend',
    title: 'Backend Development',
    status: 'Professional and project experience',
    description: 'Integrate production mobile apps with APIs and build backend services for independent projects.',
    preview: ['Java', 'Spring Boot', 'REST APIs', 'Node.js'],
    detail: 'At 7NOW and KBZ I worked on API integrations. In AI Interview Buddy I built a Spring Boot API with JWT authentication and integrated OpenAI through Spring AI.',
    technologies: ['Spring Security', 'Spring AI', 'JWT', 'Express', 'ASP.NET Core', 'Retrofit', 'WebSockets'],
    link: { label: 'AI Interview Buddy case study', href: '/projects/ai-interview-buddy/' },
  },
  {
    id: 'mobile',
    title: 'Android and Mobile Development',
    status: 'Professional experience',
    description: 'Build and maintain mobile apps for delivery, banking, and clinical workflows.',
    preview: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDK'],
    detail: 'My mobile work includes order tracking, account onboarding, and offline clinical records. I’ve also built apps for iOS.',
    technologies: ['Android Jetpack', 'Coroutines', 'Flow', 'RxJava', 'Room', 'Hilt', 'Koin', 'Flutter', 'Dart', 'Swift', 'iOS', 'Kotlin Multiplatform'],
    link: { label: '7NOW Android case study', href: '/projects/7now/' },
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    status: 'Project experience',
    description: 'Build web interfaces for workflows such as interview setup and practice.',
    preview: ['React', 'TypeScript', 'JavaScript'],
    detail: 'AI Interview Buddy uses React and TypeScript for session creation, question review, and interview practice.',
    technologies: ['HTML', 'CSS', 'Vite', 'AngularJS'],
    link: { label: 'AI Interview Buddy case study', href: '/projects/ai-interview-buddy/' },
  },
  {
    id: 'data',
    title: 'Cloud and Databases',
    status: 'Professional and project experience',
    description: 'Use local storage for mobile workflows and relational databases for full-stack apps.',
    preview: ['PostgreSQL', 'Room', 'SQLite', 'AWS'],
    detail: 'At Koe Koe Tech I worked with SQLite, Realm, Firebase, and Google Cloud. AI Interview Buddy uses PostgreSQL for interview sessions and practice data.',
    technologies: ['Firebase', 'Realm', 'Google Cloud', 'MySQL', 'MongoDB'],
    link: { label: 'Healthcare applications case study', href: '/projects/healthcare-applications/' },
  },
  {
    id: 'architecture',
    title: 'Architecture and Testing',
    status: 'Professional and project experience',
    description: 'Separate application responsibilities and test behavior across interfaces and services.',
    preview: ['Clean Architecture', 'MVVM', 'RESTful services'],
    detail: 'I contributed to test planning and code reviews on 7NOW. In BurmoBot, I separated presentation, application logic, and data access.',
    technologies: ['JUnit', 'MVC', 'MVP', 'MVI', 'Mockito', 'Espresso', 'Robolectric', 'GitHub', 'Bitbucket'],
    link: { label: 'BurmoBot case study', href: '/projects/burmobot/' },
  },
] as const

export const certificate = {
  title: 'Google Play Store Listing Certificate',
  issuer: 'Google · Nov 2024',
  href: 'https://www.credential.net/78f8d86d-5055-4c75-88a2-11878b44a5f7#acc.EV6ZhbN9',
}

export const writing = [
  { title: 'Choosing an architecture pattern that scales', description: 'Questions to ask when choosing an architecture for future development.', source: 'Medium', href: 'https://medium.com/@phyothinzaraung/how-can-you-ensure-your-chosen-architecture-pattern-remains-scalable-for-future-development-ef4fab6db428' },
  { title: 'Advantages and disadvantages of Kotlin', description: 'A look at Kotlin’s strengths and trade-offs for developers.', source: 'Medium', href: 'https://medium.com/@phyothinzaraung/advantages-and-disadvantages-of-kotlin-0bb40d2a2023' },
  { title: 'Jetpack Compose interview Q&A', description: '30 interview questions and answers for Android developers.', source: 'Notion', href: 'https://tundra-order-124.notion.site/Jetpack-Compose-Interview-Questions-and-Answers-7469e47c1bcb4a45a69b7b4d4ec5eacf' },
  { title: 'Android developer interview preparation', description: 'A collection of Android developer interview questions and answers.', source: 'GitHub', href: 'https://github.com/phyothinzaraung/AndroidDeveloperInterview' },
]
