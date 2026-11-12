import { renderToString } from 'react-dom/server'
import { App } from './App'
import { profile } from './content/portfolio'
import { routes } from './routes'

export const site = profile.site
export const pages = routes.map((route) => ({
  path: route.path,
  title: route.title,
  description: route.description,
  html: renderToString(<App route={route} />),
}))
