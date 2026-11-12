# Phyo Thinzar Aung’s portfolio

React and TypeScript portfolio with Tailwind CSS, Motion for React, and Lucide icons.

## Local development

Use Node.js 22.13 or a supported newer LTS release. The Pages workflow uses Node.js 24.

```sh
npm ci
npm run dev
npm run lint
npm run build
npx playwright install chromium
npm test
npm run preview
```

Edit the profile, experience, skills, and writing in `src/content/portfolio.ts`. Edit education, including the current degree status and start date, in `src/content/education.ts`. Edit the project archive and case studies in `src/content/projects.ts`. The homepage gallery uses the order in `featuredSlugs`. The homepage and archive filters use each project’s `areas` field. Use multiple areas when the project includes both backend and frontend work. The `platforms` field describes the case study’s platform. Keep existing project slugs stable when changing the display copy.

The production build pre-renders the homepage, project archive, case studies, and 404 page. The build also emits a sitemap and copies legacy assets to their original public paths. New page imagery is served from `public/media`.

Edit the Robotics Learning Lab in `src/content/robotics/`. Update topics in `roadmap.ts`, and update milestone status and optional evidence in `milestones.ts`. Add simulations or future projects in `projects.ts` with a unique ID and a kind of `simulation` or `project`. The dashboard calculates progress from milestones marked `Completed`.

## GitHub Pages

The repository name matches the account’s `username.github.io` domain, so Vite’s base path is `/`. Each project has a generated `projects/<slug>/index.html` for direct visits and reloads. GitHub Pages uses the generated `404.html` for unknown paths.

Pushes to `main` and pull requests run lint, the production build, and browser tests. Publishing requires a manual run of **Validate portfolio and publish to Pages** on `main` with **Publish the validated main branch to production** enabled. The workflow uploads and deploys the build only after validation succeeds.

For the first release, push the redesign on a separate branch and review the pull request’s validation run. If Pages currently publishes from a branch, leave that branch untouched during review. At cutover, select **GitHub Actions** in **Settings → Pages → Build and deployment → Source** before merging to the currently published branch. Once the redesign is on `main`, run the workflow with publishing enabled. After it succeeds, check the public homepage, a direct project URL, the résumé, and the contact links.
