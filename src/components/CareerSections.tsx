import { ArrowUpRight, BriefcaseBusiness, ChevronDown, Database, Layers3, PanelsTopLeft, Server, Smartphone, Workflow } from 'lucide-react'
import { roles, skills } from '../content/portfolio'
import { projects, projectUrl } from '../content/projects'
import { SkillList } from './ContentComponents'

const skillIcons = {
  'full-stack': Workflow,
  mobile: Smartphone,
  backend: Server,
  frontend: PanelsTopLeft,
  data: Database,
  architecture: Layers3,
}

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {roles.map((role) => (
        <li key={role.company} className={`timeline-entry${role.highlight ? ' timeline-entry-featured' : ''}`}>
          <div className="timeline-meta">
            <span className="timeline-marker" aria-hidden="true"><BriefcaseBusiness size={13} /></span>
            <p>{role.dates}</p>
            <span>{role.location}</span>
          </div>
          <article className="panel timeline-card">
            {role.highlight && <p className="eyebrow timeline-highlight">{role.highlight}</p>}
            <h3>{role.title}</h3>
            <p className="timeline-company">{role.company}</p>
            <p className="timeline-description">{role.description}</p>
            <details className="timeline-details">
              <summary aria-label={`Role details for ${role.company}`}>
                Role details <ChevronDown className="disclosure-icon" size={17} aria-hidden="true" />
              </summary>
              <div className="timeline-detail-body">
                <div>
                  <h4>Key contributions</h4>
                  <ul className="timeline-contributions">
                    {role.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                  </ul>
                </div>
                <div>
                  <h4>Technologies</h4>
                  <SkillList tags={role.technologies} />
                </div>
                {role.projects.length > 0 && (
                  <ul className="timeline-projects" aria-label="Related case studies">
                    {role.projects.map((slug) => (
                      <li key={slug}>
                        <a className="text-link" href={projectUrl(slug)}>
                          {projects.find((project) => project.slug === slug)?.name}<ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          </article>
        </li>
      ))}
    </ol>
  )
}

export function SkillsGrid() {
  return (
    <div className="skills-grid">
      {skills.map((group) => {
        const Icon = skillIcons[group.id]
        return (
          <article className="panel skills-panel" key={group.id}>
            <span className="section-icon"><Icon size={21} aria-hidden="true" /></span>
            <p className="skill-status">{group.status}</p>
            <h3>{group.title}</h3>
            <p className="skill-description">{group.description}</p>
            <SkillList tags={group.preview} />
            <details className="skill-details">
              <summary aria-label={`How I use these tools: ${group.title}`}>
                How I use these tools <ChevronDown className="disclosure-icon" size={17} aria-hidden="true" />
              </summary>
              <div className="skill-detail-body">
                <p>{group.detail}</p>
                <SkillList tags={group.technologies} />
                <a className="text-link" href={group.link.href}>{group.link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </details>
          </article>
        )
      })}
    </div>
  )
}
