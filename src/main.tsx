import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import './styles.css'
import { App } from './App'
import { getRoute } from './routes'

const route = getRoute(window.location.pathname)
const root = document.getElementById('root')!
const app = <App route={route} />

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  document.title = route.title
  createRoot(root).render(app)
}
