type ProjectLink = { label: string; href: string; legacy?: boolean; unavailable?: boolean }

type ProjectPlatform = 'Android' | 'iOS' | 'Full-stack'
export const projectAreas = ['Mobile', 'Backend', 'Frontend', 'Full Stack'] as const
export type ProjectArea = typeof projectAreas[number]
export type ProjectScreenshot = { image: string; alt: string; caption: string }

type CaseStudy = {
  problem: string
  role: string
  architecture: string
  challenge: string
  solution: string
  outcome?: string
  related?: string[]
}

export type Project = {
  slug: string
  name: string
  category: string
  platforms: ProjectPlatform[]
  areas: ProjectArea[]
  summary: string
  image?: string
  mediaType?: 'mobile' | 'web' | 'other'
  tags: string[]
  context: string
  contributions: string[]
  links?: ProjectLink[]
  screenshots?: ProjectScreenshot[]
} & ({ caseStudy: CaseStudy; technical?: never } | { caseStudy?: never; technical: string })

export const projects: Project[] = [
  {
    slug: 'ai-interview-buddy', name: 'AI Interview Buddy', category: 'AI · Interview preparation', platforms: ['Full-stack'], image: 'interview-buddy-desktop',
    areas: ['Backend', 'Frontend', 'Full Stack'],
    summary: 'Turn a target role, topic, and difficulty into a structured practice session with AI-generated questions and suggested answers.',
    tags: ['React', 'TypeScript', 'Java 21', 'Spring Boot', 'Spring AI', 'PostgreSQL', 'JWT'],
    context: 'Interview Buddy is a full-stack application for creating role-specific interview sessions, reviewing suggested answers, and tracking practice progress.',
    contributions: ['Built the React session creation and practice flows and the Spring Boot APIs behind them.', 'Integrated AI question generation and implemented JWT-based registration and sign-in.'],
    screenshots: [
      { image: 'interview-buddy-desktop', alt: 'Interview Buddy desktop sign-in page with introduction and sign-in form', caption: 'Desktop sign-in page' },
      { image: 'interview-buddy', alt: 'Interview Buddy sign-in form in a narrow viewport', caption: 'Sign-in page at a narrow viewport' },
    ],
    caseStudy: {
      problem: 'Generic interview question lists don’t give candidates a way to practice for a particular role, topic, or difficulty.',
      role: 'Developer of the full-stack application.',
      architecture: 'A React and TypeScript frontend calls a Java 21 Spring Boot API. Spring Security manages JWT-based access, PostgreSQL stores interview sessions and questions, and Spring AI connects the backend to OpenAI.',
      challenge: 'Question generation changes session state. The interface, backend enum, and database constraint must represent the same state, including when a database was created before the current lifecycle.',
      solution: 'The project defines a shared progression from session creation through question generation and practice to completion. Its documentation specifies database migrations for older schemas.',
    },
    links: [{ label: 'View source on GitHub', href: 'https://github.com/phyothinzaraung/Interview-Buddy' }],
  },
  {
    slug: 'weatherly', name: 'Weatherly', category: 'Weather · Android', platforms: ['Android'], image: 'weatherly-current',
    areas: ['Mobile'],
    summary: 'Find current weather by city and read temperature, humidity, and UV conditions at a glance.',
    tags: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coroutines', 'WeatherAPI.com'],
    context: 'Weatherly is an Android app for searching current conditions by city, with weather icons and a breakdown of the readings returned by the weather API.',
    contributions: ['Built the Compose city search, weather details, and loading and error views.', 'Implemented weather retrieval and saved-city behavior through separate repositories and use cases.'],
    screenshots: [
      { image: 'weatherly-current', alt: 'Weatherly showing the current temperature, humidity, and UV for New York', caption: 'Current conditions for New York' },
      { image: 'weatherly-search', alt: 'Weatherly prompting the user to search for a city', caption: 'City search before a location is selected' },
    ],
    caseStudy: {
      problem: 'Users need a quick way to check current conditions for a city, including when an API request is still loading or has failed.',
      role: 'Developer of the independent Android project.',
      architecture: 'Compose screens use a WeatherViewModel. Domain use cases call repositories for current conditions and saved cities, with Retrofit handling requests to WeatherAPI.com.',
      challenge: 'A city search can return data, take time, or fail. Each state needs a clear presentation.',
      solution: 'The app separates loading, empty, error, and weather detail views and performs network work asynchronously with Kotlin coroutines.',
    },
    links: [{ label: 'View source on GitHub', href: 'https://github.com/phyothinzaraung/Weatherly' }],
  },
  {
    slug: 'healthcare-applications', name: 'Healthcare applications', category: 'Clinical software', platforms: ['Android'], image: 'cmis',
    areas: ['Mobile'],
    summary: 'Help clinic and hospital staff document care, including in settings where connectivity is limited.',
    tags: ['Android', 'Offline storage', 'Data sync', 'API integration'],
    context: 'At Koe Koe Tech I worked on Clinic Information Management, Doctor Note, and Hospital Information Management. The projects supported consultation records and clinical workflows in clinics and hospitals in Myanmar.',
    contributions: ['Worked with PSI Myanmar, clinicians, and hospital teams to understand requirements and document workflows.', 'Developed Android functionality and collaborated with designers and API engineers on integrations, testing, and updates.'],
    screenshots: [{ image: 'cmis', alt: 'Sun CMIS sign-in screen on an Android phone', caption: 'Clinic Information Management sign-in screen' }],
    caseStudy: {
      problem: 'Clinicians needed to capture records during consultations. In some clinics, a reliable connection was unavailable at the point of care.',
      role: 'Senior Mobile Developer at Koe Koe Tech IT Social Enterprise.',
      architecture: 'The Android clients supported clinical data entry and exchanged records with backend services. Clinic Information Management used local record storage with later synchronization.',
      challenge: 'Clinic staff could not depend on network access during every consultation, and hospital workflows differed by department.',
      solution: 'The clinic app allowed staff to save records locally and upload them when connected. On the hospital system, I interviewed departments and documented their workflows to inform the design.',
      outcome: 'The clinic system supported record entry in low-connectivity settings, including clinics in Chin State, Myanmar.',
      related: ['clinic-information-management', 'doctor-note', 'hospital-information-management'],
    },
  },
  {
    slug: '7now', name: '7NOW Android', category: 'Retail delivery', platforms: ['Android'], image: 'sevennow',
    areas: ['Mobile'],
    summary: 'Keep delivery customers informed with live order tracking, status updates, and notifications.',
    tags: ['Android', 'Jetpack Compose', 'REST APIs'],
    context: '7NOW lets customers order products from 7-Eleven stores and follow their deliveries. I worked on the Android app through Resolve Tech Solutions in 2024.',
    contributions: ['Developed and maintained features for order creation, tracking, and completion.', 'Integrated backend order data and live status updates through REST APIs.', 'Worked on handling network failures, delivery notifications, and the Compose tracking interface.'],
    screenshots: [{ image: 'sevennow', alt: 'Phone displaying the 7NOW launch screen', caption: '7NOW launch screen' }],
    caseStudy: {
      problem: 'Customers needed to know what was happening between placing an order and receiving it, including when a network request failed.',
      role: 'Android Developer at Resolve Tech Solutions, supporting 7-Eleven.',
      architecture: 'A Jetpack Compose order-tracking interface consumes order and status data from backend REST services. Delivery notifications provide updates outside the tracking screen.',
      challenge: 'The composable lifecycle could trigger repeated requests if network work was tied to rendering.',
      solution: 'I used DisposableEffect to tie cleanup to the composable lifecycle, and worked on error handling for network failures and on delivery status notifications.',
    },
    links: [{ label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.seven.eleven.phoenix' }, { label: 'Original Google Play search', href: 'https://play.google.com/store/search?q=7now&c=apps', legacy: true }],
  },
  {
    slug: 'kbz-digital-onboarding', name: 'KBZ Digital Onboarding', category: 'Banking', platforms: ['Android'], image: 'digital-onbo',
    areas: ['Mobile'],
    summary: 'Android workflows for opening accounts at KBZ Bank branches.',
    tags: ['Android', 'API integration', 'Banking'],
    context: 'Branch staff used the internal app to open savings, current, call, and deposit accounts.',
    contributions: ['Gathered requirements with business and project management teams and reviewed workflows with designers.', 'Developed Android features, maintained existing workflows, and coordinated with internal API and Oracle teams.', 'Supported internal releases, testing, and fixes for branch use.'],
    screenshots: [{ image: 'digital-onbo', alt: 'KBZ Digital Onboard welcome screen on an Android phone', caption: 'Digital Onboard welcome screen' }],
    caseStudy: {
      problem: 'Branch staff needed a digital workflow for opening several types of bank accounts across two backend versions.',
      role: 'Mobile Android Software Engineer at Kanbawza (KBZ) Bank.',
      architecture: 'The internal Android application used APIs maintained with the bank’s API and Oracle teams. Two application versions served different Oracle backend versions.',
      challenge: 'API behavior differed across backend versions, while the app still needed to support each branch workflow.',
      solution: 'I coordinated requirements and API behavior with the business and backend teams, maintained the Android workflows, and supported internal testing and releases for both versions.',
    },
  },
  {
    slug: 'clinic-information-management', name: 'Clinic Information Management', category: 'Healthcare', platforms: ['Android'],
    areas: ['Mobile'],
    summary: 'Clinical records that could be saved offline and synchronized later.',
    tags: ['Android', 'Offline storage', 'Data sync'],
    context: 'The Clinic Information Management System supported clinics in low-connectivity areas, including Chin State, Myanmar. Staff could record information locally and upload it once they reached a connected location.',
    contributions: ['Worked with PSI Myanmar on requirements, system design, and clinical workflows.', 'Developed the Android app with input from designers, API engineers, and doctors.', 'Maintained the application through updates, testing, and bug fixes.'],
    technical: 'The central challenge was preserving records locally and coordinating uploads when connectivity returned.',
  },
  {
    slug: 'burmobot', name: 'BurmoBot', category: 'Personal Android project', platforms: ['Android'], image: 'burmobot',
    areas: ['Mobile'],
    summary: 'An English-to-Burmese dictionary with a chat-style interface.',
    tags: ['Kotlin', 'Jetpack Compose', 'Clean Architecture'],
    context: 'BurmoBot presents dictionary lookups as a conversation. It keeps recent translations and favorites and provides text-to-speech pronunciation.',
    contributions: ['Built the interface with Jetpack Compose.', 'Used Room for recents and favorites, Hilt for dependency injection, and StateFlow for UI state.'],
    screenshots: [{ image: 'burmobot', alt: 'BurmoBot’s English-to-Burmese dictionary interface', caption: 'Dictionary interface' }],
    caseStudy: {
      problem: 'Dictionary users needed to look up English words in Burmese and return to useful translations later.',
      role: 'Developer of the independent Android project.',
      architecture: 'Clean Architecture separates Compose presentation, application logic, and data access. StateFlow exposes UI state, Hilt provides dependencies, and Room stores recents and favorites.',
      challenge: 'The conversational interface needed to manage lookup state while keeping history and favorites available across sessions.',
      solution: 'I separated transient UI state from persistent Room records and added text-to-speech for pronunciation.',
    },
    links: [{ label: 'View source on GitHub', href: 'https://github.com/phyothinzaraung/BurmoBot' }],
  },
  {
    slug: 'excel-explorer', name: 'Excel Explorer', category: 'Web application', platforms: ['Full-stack'], image: 'excel-desktop',
    areas: ['Backend', 'Frontend', 'Full Stack'],
    summary: 'Import spreadsheets into MySQL and manage their records in an ASP.NET Core app.',
    tags: ['C#', 'ASP.NET Core MVC', 'MySQL', 'Entity Framework Core'],
    context: 'The app allows users to upload Excel files and view, edit, or delete imported items.',
    contributions: ['Implemented spreadsheet import with EPPlus.', 'Built record management with Entity Framework Core and the Pomelo MySQL provider.'],
    technical: 'The application uses the repository pattern and dependency injection.',
    screenshots: [
      { image: 'excel-desktop', alt: 'Excel Explorer dashboard showing the imported records table', caption: 'Imported records dashboard' },
      { image: 'excel', alt: 'Excel Explorer displayed on a laptop', caption: 'Original project preview' },
    ],
    links: [{ label: 'View source on GitHub', href: 'https://github.com/phyothinzaraung/ExcelExplorer' }],
  },
  {
    slug: 'english-myanmar-dictionary', name: 'English–Myanmar Dictionary', category: 'Personal Android project', platforms: ['Android'], image: 'dictionary',
    areas: ['Mobile'],
    summary: 'An Android dictionary built with Compose, Room, and MVVM.',
    tags: ['Android', 'Jetpack Compose', 'Room', 'MVVM'],
    context: 'The app provides English-to-Myanmar word lookup on Android.',
    contributions: ['Built the dictionary interface with Compose and stored dictionary data with Room.'],
    technical: 'The project was an opportunity to learn Compose and apply MVVM to a dictionary app.',
    links: [{ label: 'View source on GitHub', href: 'https://github.com/phyothinzaraung/ENG_MM_Dictionary' }],
  },
  {
    slug: 'doctor-note', name: 'Doctor Note', category: 'Healthcare', platforms: ['Android'],
    areas: ['Mobile'],
    summary: 'A mobile medical records system for documenting patient consultations.',
    tags: ['Android', 'Clinical workflows'],
    context: 'Doctor Note helped clinicians record and access patient information during consultations.',
    contributions: ['Collected requirements with PSI Myanmar and doctors using the app.', 'Worked on system design, workflows, Android development, API integration, testing, and updates.'],
    technical: 'Designing an online payment workflow suited to local conditions was one of the challenges.',
    links: [{ label: 'Original Google Play listing', href: 'https://play.google.com/store/apps/details?id=com.koekoetech.cmis.lite', legacy: true, unavailable: true }],
  },
  {
    slug: 'hospital-information-management', name: 'Hospital Information Management', category: 'Healthcare', platforms: ['Android'],
    areas: ['Mobile'],
    summary: 'An electronic medical records system used by private hospitals in Yangon.',
    tags: ['Android', 'System design'],
    context: 'The hospital records system involved workflow analysis across departments at client sites.',
    contributions: ['Interviewed hospital departments and documented workflows with class, use case, and activity diagrams.', 'Developed the Android application, collaborated with design and API teams, and handled testing and fixes.'],
    technical: 'Understanding how workflows differed across client departments informed the system design.',
  },
  {
    slug: 'myo-taw', name: 'Myo Taw', category: 'Civic technology', platforms: ['iOS'], image: 'myotaw',
    areas: ['Mobile'],
    summary: 'A municipal services app with tax calculation, business licensing, and bill payment.',
    tags: ['Flutter', 'iOS'],
    context: 'The city development project served Taunggyi, Mawlamyine, and Hlaing Thar Yar.',
    contributions: ['Built the Flutter app for iOS, coordinated requirements with project management, and maintained features across updates.'],
    technical: 'The project was my first time using Flutter.',
    links: [{ label: 'Original App Store listing', href: 'https://apps.apple.com/mm/app/id1443057106', legacy: true, unavailable: true }],
  },
  {
    slug: 'sarama', name: 'Sarama', category: 'Education', platforms: ['Android'], image: 'sarama',
    areas: ['Mobile'],
    summary: 'An offline learning app with audio lessons on digital literacy and wellness.',
    tags: ['Android', 'Offline content'],
    context: 'The learning platform served Rohingya refugee communities in Rakhine State with audio lessons in two languages and health resources.',
    contributions: ['Built the Android application as its sole Android developer, working with project managers, designers, and the API team.', 'Maintained the app and added features across updates.'],
    technical: 'The app needed to keep learning materials accessible offline, using on-device storage.',
  },
  {
    slug: 'commotrade', name: 'Commotrade', category: 'Finance', platforms: ['Android'], image: 'commotrade',
    areas: ['Mobile'],
    summary: 'Market quotes, recent trades, and broker order entry on Android.',
    tags: ['Android', 'Market data'],
    context: 'Clients could access bid and ask quotes, last trade prices, and transaction information, then submit buy or sell orders to brokers.',
    contributions: ['Built and maintained the app as its sole Android developer and coordinated with project management, design, and API teams.'],
    technical: 'Understanding stock, gold, and currency trading workflows informed the app implementation.',
    links: [{ label: 'Original Google Play listing', href: 'https://play.google.com/store/apps/details?id=com.diamondbutterfly.commotrade.client', legacy: true, unavailable: true }],
  },
  {
    slug: 'padamyar-fm', name: 'Padamyar FM', category: 'Media', platforms: ['Android'], image: 'padamyar_fm',
    areas: ['Mobile'],
    summary: 'Radio app features for background news downloads and song requests.',
    tags: ['Android', 'Volley'],
    context: 'The Android app supported listeners of Padamyar FM Radio Station.',
    contributions: ['Developed background news downloads and song requests, and maintained features across updates.'],
    technical: 'The app used Volley for API requests.',
    links: [{ label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.nwt.padamyarfm' }],
  },
  {
    slug: 'december-store', name: 'December Store', category: 'Retail', platforms: ['iOS'], image: 'december-store',
    areas: ['Mobile'],
    summary: 'An iOS point-of-sale app for managing sales and inventory at a toy shop.',
    tags: ['iOS', 'Point of sale'],
    context: 'The application was built for the December Store toy shop.',
    contributions: ['Developed the iOS app, coordinated workflows and API access with other teams, and maintained features across updates.'],
    technical: 'This was my first iOS application.',
  },
  {
    slug: 'travelicious', name: 'Travelicious', category: 'Hospitality', platforms: ['Android', 'iOS'], image: 'travelicious',
    areas: ['Mobile'],
    summary: 'A supplier app for managing hotel and room information.',
    tags: ['Android', 'iOS', 'System design'],
    context: 'The freelance project supported hotel suppliers on a booking platform.',
    contributions: ['Prepared the proposal and wireframes, gathered client requirements, and designed the system and database.', 'Worked with design and API teams, developed Android and iOS supplier apps, and maintained features.'],
    technical: 'The project involved taking supplier workflows from initial requirements through mobile implementation.',
  },
]

const featuredSlugs = ['ai-interview-buddy', '7now', 'burmobot', 'kbz-digital-onboarding', 'healthcare-applications', 'weatherly']
export const featuredProjects = featuredSlugs.map((slug) => {
  const project = projects.find((item) => item.slug === slug)
  if (!project) throw new Error(`Missing featured project: ${slug}`)
  return project
})
export const projectUrl = (slug: string) => `/projects/${slug}/`
