import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { RouterView } from 'vue-router'
import { registerSW } from 'virtual:pwa-register'
import './style.css'

registerSW({
  onNeedRefresh() {
    console.log('Nouvelle version disponible')
  },
  onOfflineReady() {
    console.log('Application prête pour l\'usage hors-ligne')
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

createApp(RouterView).use(router).mount('#app')