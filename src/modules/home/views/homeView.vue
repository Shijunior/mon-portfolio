<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDarkMode } from '@/layouts/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()

const texts = [
  'des interfaces modernes',
  'des expériences fluides',
  'du code propre',
  'du design soigné',
  'des performances optimales',
]

const currentText = ref('des interfaces modernes')
let index = 0
let charIndex = 0
let isDeleting = false
let intervalId = null

// État pour les particules
const particles = ref([])
const mousePosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)

// Valeurs clés
const keyValues = [
  { icon: '🎯', label: 'Qualité', description: 'Code propre et maintenable' },
  { icon: '⚡', label: 'Performance', description: 'Sites rapides et optimisés' },
  { icon: '🎨', label: 'Design', description: 'UI/UX soignée et moderne' },
  { icon: '🔒', label: 'Sécurité', description: 'Bonnes pratiques de sécurité' },
]

// Témoignages
const testimonials = [
  { text: 'Un développeur très professionnel et à l\'écoute des besoins.', author: 'Client satisfait' },
  { text: 'Un code de qualité et des livraisons dans les délais.', author: 'Chef de projet' },
]

// Gestion des particules
const generateParticles = () => {
  const count = 40
  particles.value = Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.3 + 0.1,
    opacity: Math.random() * 0.2 + 0.05,
    direction: Math.random() * 360,
  }))
}

// Effet machine à écrire
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
    }, 2500)
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    index = (index + 1) % texts.length
  }
}

// Gestion de la souris
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  mousePosition.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}

const handleMouseEnter = () => {
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}

// Cycle de vie
onMounted(() => {
  intervalId = setInterval(typeEffect, 80)
  generateParticles()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

// Styles dynamiques
const heroStyle = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}%`,
  '--mouse-y': `${mousePosition.value.y}%`,
}))

const isDarkMode = computed(() => isDark.value)
</script>

<template>
  <section 
    class="relative min-h-screen flex items-center justify-center overflow-hidden py-12"
    :style="heroStyle"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Fond avec dégradé -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-black dark:via-blue-950 dark:to-black"></div>
      
      <!-- Grille de fond -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      
      <!-- Effet de spotlight -->
      <div 
        class="absolute inset-0 transition-all duration-500"
        :style="{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)`,
        }"
      ></div>
    </div>

    <!-- Bouton Dark Mode flottant -->
    <button
      @click="toggleDarkMode"
      class="fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
      :class="isDarkMode 
        ? 'bg-blue-950/50 border border-blue-800/30 text-yellow-400 hover:bg-blue-900/50 hover:shadow-blue-500/20' 
        : 'bg-white/80 border border-blue-200 text-blue-600 hover:bg-white hover:shadow-blue-500/20'"
    >
      <svg v-if="isDarkMode" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <!-- Particules -->
    <div class="absolute inset-0 pointer-events-none -z-5">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        class="absolute rounded-full"
        :class="isDarkMode ? 'bg-blue-400' : 'bg-blue-500'"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          opacity: particle.opacity,
          transform: `translate(${isHovering ? mousePosition.x * 0.05 : 0}px, ${isHovering ? mousePosition.y * 0.05 : 0}px)`,
          transition: 'transform 0.3s ease-out',
        }"
      ></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      
      <!-- Badge animé -->
      <div class="animate-fade-down animate-once animate-duration-700 text-center">
        <span 
          class="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors duration-300"
          :class="isDarkMode 
            ? 'border-blue-800/30 bg-blue-950/30 text-blue-300' 
            : 'border-blue-200 bg-blue-50/80 text-blue-700'"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
          </span>
          Disponible pour des projets
        </span>
      </div>

      <!-- Titre principal -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-100 mt-8 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Ozias Junior
          </span>
          <br class="hidden sm:block" />
          <span :class="isDarkMode ? 'text-white' : 'text-gray-900'">ZOCLANCLOUNON</span>
        </h1>
      </div>

      <!-- Sous-titre avec effet machine à écrire -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-200 mt-6 text-center">
        <p class="text-xl md:text-2xl">
          <span 
            class="font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'"
          >
            Développeur Front-End
          </span>
          <span class="mx-3 text-gray-400">✦</span>
          <span 
            class="typewriter inline-block overflow-hidden whitespace-nowrap border-r-2 pr-1"
            :class="isDarkMode ? 'border-blue-400 text-blue-200' : 'border-blue-500 text-gray-700'"
          >
            {{ currentText }}
          </span>
        </p>
      </div>

      <!-- Description -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-300 mt-6 text-center">
        <p 
          class="max-w-2xl mx-auto text-lg transition-colors duration-300"
          :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
        >
          Je conçois des interfaces web modernes, rapides et soignées, 
          avec une attention particulière pour l'expérience utilisateur.
        </p>
        <p 
          class="max-w-2xl mx-auto mt-2 text-sm transition-colors duration-300"
          :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
        >
          Passionné par les technologies web, je transforme vos idées en expériences numériques uniques.
        </p>
      </div>

      <!-- Valeurs clés -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-400 mt-10">
        <p 
          class="text-xs uppercase tracking-wider text-center mb-4 transition-colors duration-300"
          :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
        >
          Ce qui me distingue
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div
            v-for="item in keyValues"
            :key="item.label"
            class="p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
            :class="isDarkMode 
              ? 'border-blue-800/30 bg-blue-950/20 hover:bg-blue-950/40 hover:shadow-blue-500/10' 
              : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:shadow-blue-500/10'"
          >
            <div class="text-3xl mb-2">{{ item.icon }}</div>
            <h4 
              class="font-semibold text-sm transition-colors duration-300"
              :class="isDarkMode ? 'text-blue-200' : 'text-gray-800'"
            >
              {{ item.label }}
            </h4>
            <p 
              class="text-xs mt-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      <!-- Boutons d'action -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-600 mt-10 flex flex-wrap items-center justify-center gap-4">
        <RouterLink
          to="/portfolio"
          class="group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          :class="isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-500/30 hover:shadow-blue-500/40' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/30 hover:shadow-blue-500/40'"
        >
          <span class="relative z-10 flex items-center gap-2">
            Découvrir mon portfolio
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <span 
            class="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0"
            :class="isDarkMode 
              ? 'bg-gradient-to-r from-blue-700 to-yellow-600' 
              : 'bg-gradient-to-r from-blue-500 to-yellow-500'"
          ></span>
        </RouterLink>

        <RouterLink
          to="/contact"
          class="rounded-full border-2 px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
          :class="isDarkMode 
            ? 'border-gray-600 text-gray-300' 
            : 'border-gray-300 text-gray-700'"
        >
          Me contacter
        </RouterLink>
      </div>

      <!-- Indicateur de scroll -->
      <div class="animate-fade-up animate-once animate-duration-700 animate-delay-700 mt-12 text-center">
        <div class="flex flex-col items-center gap-2">
          <span 
            class="text-xs uppercase tracking-widest transition-colors duration-300"
            :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'"
          >
            Explorez mon univers
          </span>
          
        </div>
      </div>
    </div>

    <!-- Éléments décoratifs flottants -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden -z-5">
      <div 
        class="animate-float absolute left-10 top-20 h-20 w-20 rounded-full blur-2xl transition-colors duration-300"
        :class="isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'"
      ></div>
      <div 
        class="animate-float-delayed absolute bottom-20 right-10 h-32 w-32 rounded-full blur-2xl transition-colors duration-300"
        :class="isDarkMode ? 'bg-yellow-500/5' : 'bg-yellow-500/10'"
      ></div>
      <div 
        class="animate-float-slow absolute left-1/2 top-1/4 h-16 w-16 rounded-full blur-2xl transition-colors duration-300"
        :class="isDarkMode ? 'bg-blue-400/5' : 'bg-blue-400/10'"
      ></div>
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

/* Grille de fond */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>