<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

// État du menu mobile (ouvert/fermé)
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// Liens de navigation factices (à corriger avec les vraies routes plus tard)
const navLinks = [
  { label: 'Accueil', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'À propos', href: '#' },
  { label: 'Contact', href: '#' },
]

// Dark mode (logique centralisée dans le composable)
const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
      <!-- Logo / Nom -->
      <a href="#" class="flex flex-col leading-tight" @click="closeMenu">
        <span class="text-lg font-bold text-gray-900 dark:text-white">
          ZOCLANCLOUNON
        </span>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
          Ozias Junior
        </span>
      </a>

      <!-- Navigation desktop -->
      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Actions à droite : toggle dark mode + burger mobile -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          aria-label="Basculer le mode sombre"
          class="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          @click="toggleDarkMode"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          class="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
          @click="toggleMenu"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- Menu mobile déroulant -->
    <nav
      v-if="isMenuOpen"
      class="flex flex-col gap-1 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 md:hidden"
    >
      <a
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>