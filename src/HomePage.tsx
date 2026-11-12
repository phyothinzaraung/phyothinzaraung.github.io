import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Mail } from 'lucide-react'
import { AnimatedSection, SectionHeading } from './components/ContentComponents'
import { ExperienceTimeline, SkillsGrid } from './components/CareerSections'
import { Hero } from './components/Hero'
import { ProjectGallery } from './components/ProjectGallery'
import { RoboticsLab } from './components/RoboticsLab'
import { currentEducation, educationHistory } from './content/education'
import { certificate, profile, socialLinks, writing } from './content/portfolio'
import { featuredProjects } from './content/projects'

export function HomePage() {
  return (
    <>
      <Hero />

      <div className="shell">
        <AnimatedSection id="about" className="about-section">
          <SectionHeading id="about-title" title="About me" />
          <div className="about-copy">
            <p>{profile.about}</p>
            <p>{profile.mobileExperience}</p>
            <p>I began studying Artificial Intelligence at the {currentEducation.school} in {currentEducation.startDate}.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects">
          <div className="section-topline">
            <SectionHeading id="projects-title" title="Featured projects">Full-stack applications, backend services, web interfaces, and production mobile apps.</SectionHeading>
            <a className="text-link" href="/projects/">All projects <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <ProjectGallery projects={featuredProjects} featured />
        </AnimatedSection>

        <AnimatedSection id="experience">
          <SectionHeading id="experience-title" title="Experience" />
          <ExperienceTimeline />
        </AnimatedSection>

        <AnimatedSection id="skills">
          <SectionHeading id="skills-title" title="Skills" />
          <SkillsGrid />
        </AnimatedSection>

        <RoboticsLab />

        <AnimatedSection id="blogs">
          <div className="section-topline">
            <SectionHeading id="blogs-title" title="Writing" />
            <a className="text-link" href={socialLinks[2].href}>More on Medium <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <ul className="writing-list">
            {writing.map((article) => (
              <li key={article.href}>
                <a href={article.href} className="writing-row">
                  <span className="section-icon"><BookOpen size={19} aria-hidden="true" /></span>
                  <div><h3>{article.title}</h3><p>{article.description}</p></div>
                  <span className="writing-source">{article.source}</span>
                  <ArrowUpRight className="writing-arrow" size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection id="education">
          <SectionHeading id="education-title" title="Education & certification" />
          <div className="education-grid">
            <ul className="education-list">
              {/* <li className="panel education-current">
                <span className="section-icon"><GraduationCap size={22} aria-hidden="true" /></span>
                <div className="education-current-copy">
                  <p className="education-school">{currentEducation.school}</p>
                  <h3>{currentEducation.title}</h3>
                  <p className="education-meta">
                    <span>{currentEducation.format}</span>
                    <span>{currentEducation.status} {currentEducation.startDate}</span>
                  </p>
                </div>
              </li> */}
              {educationHistory.map((entry) => <li key={entry.title}><h3>{entry.title}</h3><p>{entry.school}</p><span>{entry.dates}</span></li>)}
            </ul>
            <article id="certification" className="panel certificate">
              <span className="section-icon"><GraduationCap size={22} aria-hidden="true" /></span>
              <h3>{certificate.title}</h3>
              <p>{certificate.issuer}</p>
              <a className="text-link" href={certificate.href}>View credential <ArrowUpRight size={17} aria-hidden="true" /></a>
            </article>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contactme">
          <div className="panel contact-panel">
            <SectionHeading id="contactme-title" label="Contact" title="Let’s talk engineering.">Reach out about software engineering opportunities in full-stack, backend, frontend, or mobile development.</SectionHeading>
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" /> Email me</a>
              <a className="button button-secondary" href={socialLinks[1].href}>LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
