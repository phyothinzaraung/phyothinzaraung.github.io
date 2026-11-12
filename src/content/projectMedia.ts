import type { Project, ProjectScreenshot } from './projects'

type Framing = 'device' | 'browser' | 'plain'
type ImageDetails = { width: number; height: number; frame: Framing }

function mobile(height: number, frame: Framing = 'plain'): ImageDetails {
  return { width: 640, height, frame }
}

// Dimensions of the largest WebP variant. Photos and existing mockups retain their own framing.
const images: Record<string, ImageDetails> = {
  burmobot: mobile(1428, 'device'),
  cmis: mobile(984),
  commotrade: mobile(979),
  'december-store': mobile(668),
  dictionary: mobile(1103),
  'digital-onbo': mobile(1033),
  excel: mobile(640),
  'excel-desktop': { width: 1280, height: 800, frame: 'plain' },
  'interview-buddy': mobile(790),
  'interview-buddy-desktop': { width: 1280, height: 720, frame: 'browser' },
  myotaw: mobile(1106),
  padamyar_fm: mobile(959),
  sarama: mobile(1001),
  sevennow: mobile(1090),
  travelicious: mobile(1079),
  'weatherly-current': mobile(1138, 'device'),
  'weatherly-search': mobile(1138, 'device'),
}

export type GalleryImage = ProjectScreenshot & ImageDetails
export function getProjectMediaType(project: Project) {
  return project.mediaType ?? (project.platforms.includes('Full-stack') ? 'web' : 'mobile')
}

export function getProjectScreenshots(project: Project): GalleryImage[] {
  const screenshots = project.screenshots ?? (project.image ? [{
    image: project.image, alt: `${project.name} project preview`, caption: `${project.name} project preview`,
  }] : [])
  return screenshots.flatMap((screenshot) => {
    const details = images[screenshot.image]
    return details ? [{ ...screenshot, ...details }] : []
  })
}

export function screenshotUrl(image: GalleryImage, width = image.width) {
  return `/media/${image.image}-${width}.webp`
}
