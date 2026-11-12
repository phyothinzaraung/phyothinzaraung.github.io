import { useRef, useSyncExternalStore } from 'react'
import { ArrowDownToLine, ArrowUp, Braces, Moon, Sun } from 'lucide-react'
import { m, useScroll } from 'motion/react'
import { navigation, profile, socialLinks } from '../content/portfolio'

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => 'light')

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('portfolio-theme', next)
    } catch {
      // The current page still uses the selected theme when storage is unavailable.
    }
  }

  return (
    <button className="icon-button theme-toggle" type="button" aria-label="Dark theme" aria-pressed={theme === 'dark'} onClick={toggleTheme}>
      <Sun className="theme-sun" aria-hidden="true" size={18} />
      <Moon className="theme-moon" aria-hidden="true" size={18} />
    </button>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <m.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}

export function Navbar({ home }: { home: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null)
  const menuButton = useRef<HTMLElement>(null)

  function closeMenu(href: string) {
    if (menu.current) menu.current.open = false
    if (!home) return

    const destination = document.getElementById(href.slice(2))
    destination?.focus({ preventScroll: true })
  }

  return (
    <header className="site-header">
      <ScrollProgress />
      <div className="shell nav-inner">
        <a href={home ? '#page-top' : '/'} className="wordmark">
          <span className="brand-mark"><Braces size={19} aria-hidden="true" /></span>
          <span>{profile.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navigation.filter((item) => !item.mobileOnly).map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="button button-secondary nav-resume" href={profile.resume} download>
            <ArrowDownToLine size={16} aria-hidden="true" /> Résumé
          </a>
          <details
            className="mobile-menu"
            ref={menu}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && event.currentTarget.open) {
                event.currentTarget.open = false
                menuButton.current?.focus()
              }
            }}
          >
            <summary className="icon-button" aria-label="Navigation menu" ref={(element) => { menuButton.current = element }}>
              <span className="menu-glyph" aria-hidden="true"><span /><span /></span>
            </summary>
            <nav className="mobile-panel" aria-label="Mobile primary">
              {navigation.map(({ href, label }) => <a href={href} key={href} onClick={() => closeMenu(href)}>{label}</a>)}
              <a href={profile.resume} download>Download résumé</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

export function Footer({ home }: { home: boolean }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>{profile.name}</span>
        <nav aria-label="Social profiles" className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="back-top" href={home ? '#page-top' : '#main-content'}>Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
