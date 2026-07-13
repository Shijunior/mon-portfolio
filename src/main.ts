import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { RouterView } from 'vue-router'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

createApp(RouterView).use(router).mount('#app')