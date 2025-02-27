<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
    <Header />
    <main class="p-4 h-[700px]">
      <RouterView />
    </main>
</template>
