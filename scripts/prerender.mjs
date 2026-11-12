import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pages, site } from '../.prerender/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const escapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => escapes[character])

for (const page of pages) {
  const isNotFound = page.path === '/404.html'
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const url = escapeHtml(site + page.path)
  const metadata = isNotFound ? '<meta name="robots" content="noindex" />' : [
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${site}/media/social-preview.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Phyo Thinzar Aung, software engineer specializing in full-stack and mobile development" />',
    '<meta name="twitter:card" content="summary_large_image" />',
  ].join('\n    ')

  const html = template
    .replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`)
    .replace('<!--page-metadata-->', () => metadata)
    .replace('<!--page-content-->', () => page.html)

  const output = join('dist', isNotFound ? '404.html' : `${page.path.slice(1)}index.html`)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

const publicPages = pages.filter(({ path }) => path !== '/404.html')
const urls = publicPages.map(({ path }) => `  <url><loc>${site}${path}</loc></url>`).join('\n')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`)
await cp('assets/img', 'dist/assets/img', { recursive: true, filter: (path) => !path.endsWith('/.DS_Store') })
await cp('phyo.jpeg', 'dist/phyo.jpeg')
