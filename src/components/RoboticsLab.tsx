import { ArrowUpRight, Blocks, Check, Code2, Compass, FlaskConical, GitBranch, Waypoints } from 'lucide-react'
import { roboticsMilestones } from '../content/robotics/milestones'
import { roboticsProjects } from '../content/robotics/projects'
import { roboticsRoadmap, type LearningStatus } from '../content/robotics/roadmap'
import { AnimatedSection, SectionHeading, SkillList } from './ContentComponents'

const trackIcons = { ros: Waypoints, languages: Code2, math: GitBranch }
const statusStyles: Record<LearningStatus, string> = {
  Learning: 'learning',
  'In Progress': 'in-progress',
  Completed: 'completed',
  Planned: 'planned',
}

function LabStatus({ status }: { status: LearningStatus }) {
  return <span className={`lab-status lab-status--${statusStyles[status]}`}>{status}</span>
}

export function RoboticsLab() {
  const completed = roboticsMilestones.filter(({ status }) => status === 'Completed').length
  const projectGroups = [
    { kind: 'simulation', title: 'Simulation experiments', Icon: FlaskConical, empty: 'Experiment notes will appear here once I have a run to share.' },
    { kind: 'project', title: 'Future robotics projects', Icon: Blocks, empty: 'Project entries will appear here as I define their scope.' },
  ] as const

  return (
    <AnimatedSection id="lab">
      <div className="panel lab-intro">
        <div className="lab-intro-copy">
          <SectionHeading id="lab-title" title="Robotics Learning Lab">
            I’m expanding from Android and full-stack development into robotics software engineering. I use this lab to track what I’m studying and record what I learn from each exercise.
          </SectionHeading>
        </div>
        <div className="lab-intro-art" aria-hidden="true"><Waypoints size={75} strokeWidth={1} /></div>
      </div>

      <div className="lab-dashboard">
        <section className="lab-roadmap" aria-labelledby="lab-roadmap-title">
          <h3 id="lab-roadmap-title">Learning roadmap</h3>
          {roboticsRoadmap.map((track) => {
            const Icon = trackIcons[track.id]
            return (
              <article className="panel lab-track" key={track.id}>
                <span className="section-icon"><Icon size={21} aria-hidden="true" /></span>
                <div>
                  <h4>{track.title}</h4>
                  <p>{track.description}</p>
                  <SkillList tags={track.topics} />
                </div>
              </article>
            )
          })}
        </section>

        <section className="panel lab-milestones" aria-labelledby="lab-milestones-title">
          <div className="lab-progress">
            <h3 id="lab-milestones-title">Learning milestones</h3>
            <p><strong>{completed}</strong> of {roboticsMilestones.length} completed</p>
            <progress value={completed} max={roboticsMilestones.length} aria-label="Completed robotics learning milestones" />
          </div>
          <ol className="lab-milestone-list">
            {roboticsMilestones.map((milestone) => (
              <li key={milestone.id}>
                <span className={`lab-milestone-marker lab-status--${statusStyles[milestone.status]}`} aria-hidden="true">
                  {milestone.status === 'Completed' && <Check size={12} />}
                </span>
                <div className="lab-milestone-heading">
                  <h4>{milestone.title}</h4>
                  <LabStatus status={milestone.status} />
                </div>
                <p>{milestone.check}</p>
                {milestone.evidence && (
                  <a className="text-link" href={milestone.evidence.href}>{milestone.evidence.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="lab-project-groups">
        {projectGroups.map(({ kind, title, Icon, empty }) => {
          const entries = roboticsProjects.filter((project) => project.kind === kind)
          return (
            <section key={kind} aria-labelledby={`lab-${kind}-title`}>
              <h3 id={`lab-${kind}-title`}>{title}</h3>
              <div className="lab-project-list">
                {entries.map((entry) => (
                  <article className="panel lab-project" key={entry.id}>
                    <div className="lab-project-heading">
                      <span className="section-icon"><Icon size={21} aria-hidden="true" /></span>
                      <LabStatus status={entry.status} />
                    </div>
                    <h4>{entry.title}</h4>
                    <p>{entry.description}</p>
                    {entry.tools && <SkillList tags={entry.tools} />}
                    {entry.link && <a className="text-link" href={entry.link.href}>{entry.link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>}
                  </article>
                ))}
                {entries.length === 0 && (
                  <div className="panel lab-project lab-project-empty">
                    <span className="section-icon"><Compass size={21} aria-hidden="true" /></span>
                    <p>{empty}</p>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
