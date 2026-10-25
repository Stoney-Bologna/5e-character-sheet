<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ModalTarget, ModalOverlay } from '@kolirt/vue-modal'
</script>

<template>

    <header>
    <div class="top-navbar">
      <nav class="navbar-links">
        <RouterLink 
          to="/"
          class="navbar-link"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/save-load"
          class="navbar-link"
        >
          Settings
        </RouterLink>
        <RouterLink
          to="/about"
          class="navbar-link-final"
        >
          About
        </RouterLink>
      </nav>
    </div>
  </header> 

  <RouterView />

  <ModalTarget group="default">
    <ModalOverlay class="overlay" />
  </ModalTarget>
</template>

<style>
.top-navbar {
  margin-bottom: 1rem;
}
</style>