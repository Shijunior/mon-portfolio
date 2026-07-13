<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const texts = [
  'des interfaces modernes',
  'des expériences fluides',
  'du code propre',
  'du design soigné',
]

const currentText = ref('des interfaces modernes')
let index = 0
let charIndex = 0
let isDeleting = false
let intervalId = null

const typeEffect = () => {
  const fullText = texts[index]
  
  if (isDeleting) {
    currentText.value = fullText.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentText.value = fullText.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === fullText.length) {
    setTimeout(() => {
      isDeleting = true
    }, 2000)
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    index = (index + 1) % texts.length
  }
}

onMounted(() => {
  intervalId = setInterval(typeEffect, 100)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
<template>
  <section class="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-8 px-4 py-24 text-center md:px-6">
    
    <!-- Badge animé -->
    <div class="animate-fade-down animate-once animate-duration-700">
      <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        Disponible pour des projets
      </span>
    </div>

    <!-- Titre principal avec effet de dégradé -->
    <div class="animate-fade-up animate-once animate-duration-700 animate-delay-100">
      <h1 class="text-4xl font-bold md:text-6xl lg:text-7xl">
        <span class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Ozias Junior
        </span>
        <br class="hidden sm:block" />
        <span class="text-gray-900 dark:text-white">ZOCLANCLOUNON</span>
      </h1>
    </div>

    <!-- Sous-titre avec effet machine à écrire -->
    <div class="animate-fade-up animate-once animate-duration-700 animate-delay-200">
      <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
        <span class="font-medium text-indigo-600 dark:text-indigo-400">Développeur front-end</span>
        <span class="mx-2 text-gray-400">—</span>
        <span class="typewriter inline-block overflow-hidden whitespace-nowrap border-r-2 border-indigo-500 pr-1">
          {{ currentText }}
        </span>
      </p>
    </div>

    <!-- Description -->
    <div class="animate-fade-up animate-once animate-duration-700 animate-delay-300">
      <p class="max-w-xl text-gray-500 dark:text-gray-400">
        Je conçois des interfaces web modernes, rapides et soignées, 
        avec une attention particulière pour l'expérience utilisateur.
      </p>
    </div>

    <!-- Boutons d'action -->
    <div class="animate-fade-up animate-once animate-duration-700 animate-delay-400 flex flex-wrap items-center justify-center gap-4">
      <RouterLink
        to="/portfolio"
        class="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40"
      >
        <span class="relative z-10 flex items-center gap-2">
          Découvrir mon portfolio
          <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-500 group-hover:translate-x-0"></span>
      </RouterLink>

      <RouterLink
        to="/contact"
        class="rounded-full border-2 border-gray-300 px-8 py-3.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-indigo-400 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
      >
        Me contacter
      </RouterLink>
    </div>

    <!-- Indicateur de scroll -->
    <div class="animate-fade-up animate-once animate-duration-700 animate-delay-500 absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">Scroll</span>
        <div class="h-10 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600">
          <div class="mx-auto mt-1 h-2 w-2 rounded-full bg-indigo-500 animate-scroll"></div>
        </div>
      </div>
    </div>

    <!-- Éléments décoratifs flottants -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="animate-float absolute left-10 top-20 h-20 w-20 rounded-full bg-purple-500/10 blur-2xl"></div>
      <div class="animate-float-delayed absolute bottom-20 right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl"></div>
      <div class="animate-float-slow absolute left-1/2 top-1/4 h-16 w-16 rounded-full bg-pink-500/10 blur-2xl"></div>
    </div>
  </section>
</template>

<style scoped>
/* Pour que l'effet machine à écrire fonctionne correctement */
.typewriter {
  max-width: fit-content;
}

/* Animation de scroll */
@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(16px);
    opacity: 0;
  }
}

.animate-scroll {
  animation: scroll 1.5s ease-in-out infinite;
}

/* Animations flottantes */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float 10s ease-in-out infinite;
  animation-delay: 4s;
}
</style>