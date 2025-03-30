<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
    <Analytics />
    <Header />
    <main class="p-4 h-auto">
      <RouterView />
    </main>
</template>
