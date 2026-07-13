import { createRoutes } from '../utils/routes'

// Les valeurs correspondent aux noms de routes générés automatiquement
// par unplugin-vue-router à partir des fichiers dans src/pages/
const routes = createRoutes({
  home: 'index',
  projects: 'projets',
  about: 'a-propos',
  contact: 'contact',
})

export default routes