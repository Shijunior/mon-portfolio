<script setup lang="ts">
const currentYear = new Date().getFullYear()

// Liens sociaux factices (à corriger avec les vrais liens plus tard)
const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Email', href: '#' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center md:flex-row md:justify-between md:text-left"
    >
      <!-- Copyright -->
      <p class="text-sm text-gray-500 dark:text-gray-400">
        © {{ currentYear }} ZOCLANCLOUNON Ozias Junior. Tous droits réservés.
      </p>

      <!-- Liens sociaux -->
      <div class="flex items-center gap-5">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Bouton retour en haut -->
      <button
        type="button"
        aria-label="Retour en haut de la page"
        class="rounded-full border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        @click="scrollToTop"
      >
        ↑
      </button>
    </div>
  </footer>
</template>