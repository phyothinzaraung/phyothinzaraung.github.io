import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { m } from 'motion/react'
import { ProjectMedia } from './ProjectMedia'
import { getProjectMediaType, getProjectScreenshots } from '../content/projectMedia'
import { projectUrl, type Project } from '../content/projects'

export function SectionHeading({ id, label, title, children }: { id: string; label?: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      {label && <p className="eyebrow">{label}</p>}
      <h2 id={id}>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}

export function AnimatedSection({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <m.section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className={`section ${className}`}
      initial={{ y: 8 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </m.section>
  )
}

export function SkillBadge({ children }: { children: string }) {
  return <li className="skill-badge">{children}</li>
}

export function SkillList({ tags }: { tags: readonly string[] }) {
  return <ul className="tag-list">{tags.map((tag) => <SkillBadge key={tag}>{tag}</SkillBadge>)}</ul>
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const external = project.links?.find((link) => !link.legacy && !link.unavailable)
  const { name, slug } = project
  const split = getProjectMediaType(project) === 'mobile' && getProjectScreenshots(project).length === 1

  return (
    <article className={`project-card panel project-card--${slug}`}>
      <div className={`project-card-layout${split ? ' project-card-layout--split' : ''}`}>
        <ProjectMedia project={project} />
        <div className="project-copy">
          <p className="eyebrow">{project.category}</p>
          <h3>{name}</h3>
          <p>{project.summary}</p>
          {featured && (
            <p className="project-contribution"><strong>My contribution</strong>{project.contributions[0]}</p>
          )}
          <SkillList tags={featured ? project.tags.slice(0, 4) : project.tags} />
          <div className="project-actions">
            <a className="text-link" href={projectUrl(slug)} aria-label={`View Case Study for ${name}`}>
              View Case Study <ArrowRight size={16} aria-hidden="true" />
            </a>
            {external && <a className="project-external" href={external.href} aria-label={`${external.label} for ${name}`}>
              {external.href.includes('github.com/') ? 'GitHub' : external.label}<ArrowUpRight size={15} aria-hidden="true" />
            </a>}
          </div>
        </div>
      </div>
    </article>
  )
}

