import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SkillList } from './components/ContentComponents'
import { ProjectMedia } from './components/ProjectMedia'
import { getProjectScreenshots } from './content/projectMedia'
import { ProjectGallery } from './components/ProjectGallery'
import { projects, projectUrl, type Project } from './content/projects'

export function ProjectsPage() {
  return (
    <div className="shell inner-page">
      <a className="text-link back-link" href="/#projects"><ArrowLeft size={17} aria-hidden="true" /> Featured projects</a>
      <h1>Project archive</h1>
      <p className="page-intro">Explore mobile applications, backend services, web interfaces, and full-stack projects.</p>
      <ProjectGallery projects={projects} />
    </div>
  )
}

export function ProjectCaseStudyPage({ project }: { project: Project }) {
  const { caseStudy } = project
  const links = project.links?.filter((link) => !link.unavailable) ?? []
  const screenshots = getProjectScreenshots(project)
  const related = projects.filter((item) => caseStudy?.related?.includes(item.slug))

  return (
    <article className="shell inner-page">
      <a className="text-link back-link" href="/projects/"><ArrowLeft size={17} aria-hidden="true" /> All projects</a>
      <header className="case-header">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="page-intro">{project.summary}</p>
          <SkillList tags={project.platforms} />
        </div>
        <ProjectMedia project={project} priority />
      </header>

      <div className="case-layout">
        <div className="case-body">
          <section><h2>Overview</h2><p>{project.context}</p></section>
          {caseStudy && <section><h2>Problem statement</h2><p>{caseStudy.problem}</p></section>}
          <section>
            <h2>My role and contributions</h2>
            {caseStudy && <p>{caseStudy.role}</p>}
            <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          {caseStudy ? (
            <>
              <section><h2>Architecture</h2><p>{caseStudy.architecture}</p></section>
              <div className="case-decisions">
                <section className="panel"><h2>Engineering challenge</h2><p>{caseStudy.challenge}</p></section>
                <section className="panel"><h2>Solution</h2><p>{caseStudy.solution}</p></section>
              </div>
              {caseStudy.outcome && <section><h2>Outcome</h2><p>{caseStudy.outcome}</p></section>}
            </>
          ) : <section><h2>Technical considerations</h2><p>{project.technical}</p></section>}
        </div>

        <aside className="panel case-sidebar" aria-label="Project technology and links">
          <h2>Technology stack</h2>
          <SkillList tags={project.tags} />
          {links.length > 0 && (
            <div className="case-links">
              <h2>External links</h2>
              {links.map((link) => (
                <a key={link.href} className="text-link" href={link.href}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
              ))}
            </div>
          )}
        </aside>
      </div>

      {screenshots.length > 0 && (
        <section className="case-screenshots">
          <h2>Screenshots</h2>
          <ProjectMedia project={project} gallery />
        </section>
      )}

      {related.length > 0 && (
        <section className="case-related">
          <h2>Related projects</h2>
          <ul>{related.map((item) => <li key={item.slug}><a className="text-link" href={projectUrl(item.slug)}>{item.name}<ArrowRight size={16} aria-hidden="true" /></a></li>)}</ul>
        </section>
      )}
    </article>
  )
}

export function NotFoundPage() {
  return (
    <div className="shell inner-page not-found">
      <h1>Page not found</h1>
      <a href="/" className="text-link"><ArrowLeft size={17} aria-hidden="true" /> Back to the homepage</a>
    </div>
  )
}
