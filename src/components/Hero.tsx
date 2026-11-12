import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Code2, Terminal } from 'lucide-react'
import { hero, profile, socialLinks } from '../content/portfolio'

export function Hero() {
  const { opening, continuation, highlight } = hero.headline

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-role"><span aria-hidden="true" />{profile.role}</p>
            <h1 id="hero-title" aria-label={`${opening} ${continuation} ${highlight}`}>
              <span className="hero-opening">{opening}</span>{' '}
              <span className="hero-continuation">
                {continuation} <span className="hero-highlight">{highlight}</span>
              </span>
            </h1>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View Projects <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="button button-secondary" href={profile.resume} download>
                <ArrowDownToLine size={17} aria-hidden="true" /> Download Resume
              </a>
            </div>
            <nav className="hero-socials" aria-label="Professional profiles">
              {socialLinks.slice(0, 2).map(({ href, label }) => (
                <a key={label} href={href}>{label}<ArrowUpRight size={14} aria-hidden="true" /></a>
              ))}
            </nav>
          </div>

          <div className="hero-visual">
            <div className="hero-frame">
              <Terminal className="hero-terminal" size={20} aria-hidden="true" />
              <span className="hero-frame-controls" aria-hidden="true"><i /><i /><i /></span>
              <div className="hero-orbits" aria-hidden="true" />
              <div className="hero-avatar">
                <img
                  src="/media/profile_pic-640.webp"
                  srcSet="/media/profile_pic-320.webp 320w, /media/profile_pic-640.webp 640w"
                  sizes="(min-width: 900px) 250px, 128px"
                  width={640}
                  height={640}
                  alt={profile.name}
                  decoding="async"
                />
                <span className="hero-initials" aria-hidden="true">{hero.initials}</span>
              </div>
              <Code2 className="hero-code" size={23} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="hero-footer">
          <ul className="hero-technologies" aria-label="Technologies">
            {hero.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <a className="hero-scroll" href="#about">
            <span>Scroll to About</span><ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
