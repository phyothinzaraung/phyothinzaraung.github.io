import { profile } from './content/portfolio'
import { projects, projectUrl, type Project } from './content/projects'

type PageMetadata = { path: string; title: string; description: string }
export type Route = PageMetadata & (
  { page: 'home' | 'archive' | 'not-found' } | { page: 'project'; project: Project }
)

const notFound: Route = {
  path: '/404.html',
  page: 'not-found',
  title: `Page not found | ${profile.name}`,
  description: 'This portfolio page could not be found.',
}

export const routes: Route[] = [
  { path: '/', page: 'home', title: `${profile.name} | ${profile.role}`, description: profile.summary },
  { path: '/projects/', page: 'archive', title: `Software Engineering Projects | ${profile.name}`, description: `Explore mobile, backend, frontend, and full-stack projects by ${profile.name}.` },
  ...projects.map((project): Route => ({
    path: projectUrl(project.slug),
    page: 'project',
    project,
    title: `${project.name} | ${profile.name}`,
    description: project.summary,
  })),
  notFound,
]

export function getRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '/')
  return routes.find((route) => route.path === path || route.path === `${path}/`) ?? notFound
}
