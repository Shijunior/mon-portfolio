<script setup lang="ts">
import Header from './components/header.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
    <Header />

    <main class="flex-1">
       <RouterView />
    </main>

    <Footer />
  </div>
</template>