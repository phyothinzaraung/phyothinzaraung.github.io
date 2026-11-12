import { useId, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Activity, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { getProjectMediaType, getProjectScreenshots, screenshotUrl, type GalleryImage } from '../content/projectMedia'
import type { Project } from '../content/projects'

function MissingPreview() {
  return <div className="project-preview-empty"><Activity size={23} aria-hidden="true" /> <span>Screenshot unavailable</span></div>
}

function Screenshot({ screenshot, priority, onOpen }: {
  screenshot: GalleryImage
  priority: boolean
  onOpen: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <MissingPreview />

  const { alt, width, height, frame } = screenshot
  const variants = width > 640 ? [320, 640, width] : [320, width]
  return (
    <a className={`screenshot-frame screenshot-frame--${frame}`} href={screenshotUrl(screenshot)}
      aria-label={`Enlarge screenshot: ${alt}`} onClick={onOpen}>
      {frame === 'browser' && <span className="screenshot-browser-bar" aria-hidden="true"><i /><i /><i /></span>}
      <img
        src={screenshotUrl(screenshot, 640)}
        srcSet={variants.map((size) => `${screenshotUrl(screenshot, size)} ${size}w`).join(', ')}
        sizes={width > 640 ? '(min-width: 760px) 580px, 90vw' : '(min-width: 560px) 264px, 75vw'}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        style={{ aspectRatio: `${width} / ${height}` }}
        width={width}
        height={height}
        alt={alt}
        onError={() => setFailed(true)}
      />
      <span className="screenshot-zoom" aria-hidden="true"><Maximize2 size={16} /></span>
    </a>
  )
}

export function ProjectMedia({ project, priority = false, gallery = false }: {
  project: Project
  priority?: boolean
  gallery?: boolean
}) {
  const screenshots = getProjectScreenshots(project)
  const type = getProjectMediaType(project)
  const shown = gallery ? screenshots : screenshots.slice(0, type === 'mobile' ? 3 : 1)
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const current = screenshots[selected]

  function show(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (!dialog.current?.showModal || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setSelected(index)
    setOpen(true)
    dialog.current.showModal()
  }

  function step(delta: number) {
    setSelected((index) => (index + delta + screenshots.length) % screenshots.length)
  }

  function handleKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (screenshots.length < 2 || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()
    step(event.key === 'ArrowRight' ? 1 : -1)
  }

  if (!shown.length) return <div className="project-media project-media--empty"><MissingPreview /></div>

  return (
    <div className={`project-media project-media--${type} project-media--${project.slug}${gallery ? ' project-media--gallery' : ''}`}>
      <div className={`screenshot-set screenshot-set--${shown.length === 1 ? 'single' : 'multiple'}`}>
        {shown.map((screenshot, index) => (
          <figure className={screenshot.width >= screenshot.height ? 'screenshot-landscape' : 'screenshot-portrait'} key={screenshot.image}>
            <Screenshot screenshot={screenshot} priority={priority && index === 0} onOpen={(event) => show(event, index)} />
            {gallery && <figcaption>{screenshot.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {!gallery && screenshots.length > 1 && (
        <button className="screenshot-count" type="button" onClick={() => {
          if (!dialog.current?.showModal) return
          setSelected(0)
          setOpen(true)
          dialog.current.showModal()
        }}>{screenshots.length} screenshots</button>
      )}
      <dialog className={`screenshot-dialog${current && current.height > current.width ? ' screenshot-dialog--portrait' : ''}`} ref={dialog} aria-labelledby={titleId} onKeyDown={handleKeys}
        onClose={() => setOpen(false)} onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}>
        <div className="screenshot-dialog-inner">
          <header className="screenshot-dialog-header">
            <h2 id={titleId}>{project.name} screenshots</h2>
            <button type="button" className="screenshot-dialog-control" aria-label="Close screenshot viewer"
              onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button>
          </header>
          {open && current && (
            <figure className="screenshot-dialog-content">
              <img key={current.image} src={screenshotUrl(current)} width={current.width} height={current.height} alt={current.alt} />
              <figcaption>
                <span aria-live="polite">{current.caption}{screenshots.length > 1 && ` · ${selected + 1} of ${screenshots.length}`}</span>
                {screenshots.length > 1 && (
                  <span className="screenshot-dialog-actions">
                    <button type="button" className="screenshot-dialog-control" aria-label="Previous screenshot" onClick={() => step(-1)}><ChevronLeft size={22} aria-hidden="true" /></button>
                    <button type="button" className="screenshot-dialog-control" aria-label="Next screenshot" onClick={() => step(1)}><ChevronRight size={22} aria-hidden="true" /></button>
                  </span>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </dialog>
    </div>
  )
}
