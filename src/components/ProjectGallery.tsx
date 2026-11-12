import { useState } from 'react'
import { projectAreas, type Project, type ProjectArea } from '../content/projects'
import { ProjectCard } from './ContentComponents'

const filters = ['All', ...projectAreas] as const

export function ProjectGallery({ projects, featured = false }: { projects: Project[]; featured?: boolean }) {
  const [area, setArea] = useState<ProjectArea | 'All'>('All')
  const visibleProjects = area === 'All' ? projects : projects.filter((project) => project.areas.includes(area))
  const gridClass = featured ? 'featured-grid' : 'archive-grid'
  const count = visibleProjects.length

  return (
    <>
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects by area">
          {filters.map((filter) => (
            <button key={filter} type="button" aria-pressed={area === filter} onClick={() => setArea(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <p className="project-count" role="status">{count} {count === 1 ? 'project' : 'projects'}</p>
      </div>
      {count > 0 && (
        <div className={featured && area === 'All' ? `${gridClass} featured-grid-all` : gridClass}>
          {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} featured={featured} />)}
        </div>
      )}
    </>
  )
}
