import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { Footer, Navbar } from './components/SiteChrome'
import { HomePage } from './HomePage'
import { NotFoundPage, ProjectCaseStudyPage, ProjectsPage } from './ProjectPages'
import type { Route } from './routes'

export function App({ route }: { route: Route }) {
  const home = route.page === 'home'
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div id="page-top">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar home={home} />
          <main id="main-content" tabIndex={-1}>
            {home && <HomePage />}
            {route.page === 'archive' && <ProjectsPage />}
            {route.page === 'project' && <ProjectCaseStudyPage project={route.project} />}
            {route.page === 'not-found' && <NotFoundPage />}
          </main>
          <Footer home={home} />
        </div>
      </LazyMotion>
    </MotionConfig>
  )
}
