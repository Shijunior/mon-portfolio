import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'

// État partagé (même instance réutilisée partout où le composable est appelé)
const isDark = ref(getInitialTheme())

function getInitialTheme(): boolean {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved === 'dark') return true
  if (saved === 'light') return false

  // Pas de préférence enregistrée -> on se base sur la préférence système
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
}

// Applique le thème dès le chargement du module
applyTheme(isDark.value)

// Réapplique à chaque changement de isDark
watch(isDark, (value) => {
  applyTheme(value)
})

export function useDarkMode() {
  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleDarkMode,
  }
}