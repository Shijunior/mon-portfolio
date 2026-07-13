<script setup lang="ts">
import HomeView from '@/modules/home/views/homeView.vue'

definePage({
  meta: {
   layout: false,
    public: true,
  },
})
</script>

<template>
  <!-- Page Content -->
  <div class="content">
    <HomeView />
  </div>
  <!-- END Page Content -->
</template>