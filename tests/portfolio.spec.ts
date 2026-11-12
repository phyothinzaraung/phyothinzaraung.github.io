import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('mobile keyboard navigation supports dismissal, skip links and section focus', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()

  const trigger = page.locator('summary[aria-label="Navigation menu"]')
  const mobileNav = page.getByRole('navigation', { name: 'Mobile primary' })
  await trigger.press('Enter')
  const projects = mobileNav.getByRole('link', { name: 'Projects', exact: true })
  await expect(projects).toBeVisible()
  await projects.press('Escape')
  await expect(mobileNav).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.press('Enter')
  await mobileNav.getByRole('link', { name: 'Download résumé' }).press('Tab')
  await expect(mobileNav).toBeHidden()

  await trigger.press('Space')
  await projects.press('Enter')
  await expect(page).toHaveURL('/#projects')
  await expect(page.locator('#projects')).toBeFocused()
  await expect(mobileNav).toBeHidden()
})

test('navigates from the homepage to a case study and back to the archive', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL('/#projects')
  await page.getByRole('link', { name: 'View Case Study for 7NOW Android' }).click()
  await expect(page).toHaveURL('/projects/7now/')
  await expect(page.getByRole('heading', { name: '7NOW Android', level: 1 })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Architecture' })).toBeVisible()
  await page.getByRole('link', { name: 'All projects', exact: true }).click()
  await expect(page).toHaveURL('/projects/')
  await expect(page.getByRole('heading', { name: 'Project archive' })).toBeVisible()
})

test('archive filters show verified engineering areas and include iOS under Mobile', async ({ page }) => {
  await page.goto('/projects/')
  const controls = page.getByRole('group', { name: 'Filter projects by area' })
  const archive = page.locator('.archive-grid')
  const initialCount = await archive.getByRole('article').count()
  expect(initialCount).toBeGreaterThan(3)

  for (const [area, shown, hidden] of [
    ['Mobile', ['7NOW Android', 'December Store'], 'AI Interview Buddy'],
    ['Backend', ['AI Interview Buddy', 'Excel Explorer'], '7NOW Android'],
    ['Frontend', ['AI Interview Buddy', 'Excel Explorer'], 'Weatherly'],
    ['Full Stack', ['AI Interview Buddy', 'Excel Explorer'], 'December Store'],
  ] as const) {
    const button = controls.getByRole('button', { name: area, exact: true })
    await button.press('Enter')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    for (const name of shown) {
      await expect(archive.getByRole('heading', { name, exact: true })).toBeVisible()
    }
    await expect(archive.getByRole('heading', { name: hidden, exact: true })).toHaveCount(0)
    const count = await archive.getByRole('article').count()
    expect(count).toBeLessThan(initialCount)
    await expect(page.getByRole('status')).toHaveText(`${count} projects`)
  }

  await controls.getByRole('button', { name: 'All', exact: true }).click()
  await expect(archive.getByRole('article')).toHaveCount(initialCount)
})

test('homepage leads with full-stack work and filters featured projects', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Building scalable software, from mobile applications to full-stack platforms.')
  await expect(page.locator('.hero-description')).toHaveText('Software Engineer specializing in mobile development, backend systems, and modern web applications.')
  const featured = page.locator('#projects')
  await expect(featured.getByRole('article').first().getByRole('heading')).toHaveText('AI Interview Buddy')
  await featured.getByRole('button', { name: 'Backend', exact: true }).press('Enter')
  await expect(featured.getByRole('article')).toHaveCount(1)
  await expect(featured.getByRole('status')).toHaveText('1 project')
  await featured.getByRole('button', { name: 'Mobile', exact: true }).press('Enter')
  await expect(featured.getByRole('heading', { name: '7NOW Android', exact: true })).toBeVisible()
  await expect(featured.getByRole('heading', { name: 'AI Interview Buddy', exact: true })).toHaveCount(0)
})

test('theme changes survive a reload and navigation between pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Dark theme' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')
  await toggle.press('Enter')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('link', { name: 'All projects', exact: true }).click()
  await expect(page).toHaveURL('/projects/')
  await page.reload()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await toggle.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
})

test('résumé downloads as a PDF and email links open the documented address', async ({ page, request }) => {
  await page.goto('/')
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download Resume', exact: true }).click()
  expect((await download).suggestedFilename()).toBe('PA_RESUME.pdf')
  const response = await request.get('/assets/img/PA_RESUME.pdf')
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  await expect(page.getByRole('link', { name: 'Email me', exact: true })).toHaveAttribute('href', 'mailto:phyothinzarr.aung@gmail.com')
})

test('reduced motion suppresses entrance animations and scroll progress', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.hero-opening')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  await expect(page.locator('#projects')).toHaveCSS('transform', 'none')
  await expect(page.locator('.scroll-progress')).toBeHidden()
})

test('gallery images load on demand and the case study prioritizes its cover', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const galleryImages = await page.locator('.featured-grid img').all()
  expect(galleryImages.length).toBeGreaterThan(0)
  for (const image of galleryImages) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0)
  }
  await page.goto('/projects/7now/')
  const cover = page.locator('.case-header img')
  await expect(cover).toHaveAttribute('fetchpriority', 'high')
  await expect.poll(() => cover.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0)
})

test('screenshot viewer enlarges mobile images and supports keyboard navigation and dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 750 })
  await page.goto('/projects/')
  const weatherly = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Weatherly', exact: true }) })
  const trigger = weatherly.getByRole('link', { name: /Enlarge screenshot/ }).first()
  await trigger.press('Enter')
  const viewer = page.getByRole('dialog', { name: 'Weatherly screenshots' })
  await expect(viewer).toBeVisible()
  await expect(viewer.getByRole('button', { name: 'Close screenshot viewer' })).toBeFocused()
  await expect(viewer.getByRole('img', { name: /current temperature/ })).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(viewer.getByRole('img', { name: /search for a city/ })).toBeVisible()
  await expect(viewer.getByText(/2 of 2/)).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(viewer).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('archive shows a compact fallback for missing and failed screenshots', async ({ page }) => {
  await page.route('**/media/sevennow-*.webp', (route) => route.abort())
  await page.goto('/projects/')
  const card = (name: string) => page.getByRole('article').filter({ has: page.getByRole('heading', { name, exact: true }) })
  await card('7NOW Android').scrollIntoViewIfNeeded()
  await expect(card('7NOW Android').getByText('Screenshot unavailable')).toBeVisible()
  await expect(card('Clinic Information Management').getByText('Screenshot unavailable')).toBeVisible()
  await expect(card('Clinic Information Management').getByRole('link', { name: /View Case Study/ })).toBeVisible()
})

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`pages fit a ${width}px viewport and load without console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text())
    })
    await page.setViewportSize({ width, height: 900 })

    for (const path of ['/', '/projects/', '/projects/7now/']) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    }
    expect(errors).toEqual([])
  })
}

for (const theme of ['dark', 'light']) {
  test(`homepage, archive and case study pass axe in ${theme} mode`, async ({ page }) => {
    await page.addInitScript((theme) => localStorage.setItem('portfolio-theme', theme), theme)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 375, height: 812 })
    for (const path of ['/', '/projects/', '/projects/7now/']) {
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      if (path === '/') {
        await page.locator('.timeline-details summary').first().press('Enter')
        await page.locator('.skill-details summary').first().press('Enter')
      }
      const scan = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      const result = await scan().analyze()
      expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), path).toEqual([])
      if (path === '/') {
        await page.locator('summary[aria-label="Navigation menu"]').press('Enter')
        const menuResult = await scan().include('.site-header').analyze()
        expect(menuResult.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), 'expanded mobile menu').toEqual([])
      }
    }
  })
}

test('public routes have pre-rendered metadata and the correct sitemap and 404 behavior', async ({ request }) => {
  const origin = 'https://phyothinzaraung.github.io'
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  const entries = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  expect(new Set(entries).size).toBe(entries.length)
  expect(entries).toContain(`${origin}/`)
  expect(entries).toContain(`${origin}/projects/`)
  expect(entries).toContain(`${origin}/projects/7now/`)
  for (const entry of entries) {
    const url = new URL(entry)
    expect(url.origin).toBe(origin)
    const response = await request.get(url.pathname)
    expect(response.ok(), url.pathname).toBe(true)
    const html = await response.text()
    expect(html).toContain('<h1')
    expect(html).toContain(`rel="canonical" href="${entry}"`)
    expect(html).toContain(`property="og:url" content="${entry}"`)
    for (const property of ['title', 'description', 'image', 'image:alt']) {
      expect(html).toContain(`property="og:${property}" content="`)
    }
    expect(html).toMatch(/name="description" content="[^"]+"/)
    if (url.pathname === '/') {
      expect(html).toContain('property="og:title" content="Phyo Thinzar Aung | Software Engineer | Full-Stack &amp; Mobile Development"')
      expect(html).toContain('property="og:description" content="Software Engineer specializing in mobile development, backend systems, and modern web applications."')
    }
  }
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`)
  expect((await request.get('/media/social-preview.png')).headers()['content-type']).toContain('image/png')
  expect((await request.get('/projects/nonexistent-project/')).status()).toBe(404)
  const custom404 = await request.get('/404.html')
  expect(await custom404.text()).toContain('name="robots" content="noindex"')
})
