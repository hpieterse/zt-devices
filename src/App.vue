<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth-store'
import { computed, watchEffect } from 'vue'
import router from './router'

const authStore = useAuthStore()

const logout = () => {
  authStore.dispatchLogout()
}

const isLoggedIn = computed(() => authStore.authenticated)

watchEffect(() => {
  if (!authStore.authenticated) {
    router.push('/login')
  }
})
</script>

<template>
  <header class="h-24 flex flex-col items-center justify-center">
    <picture>
      <!-- User prefers light mode: -->
      <source
        srcset="@/assets/logo.png, @/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        media="(prefers-color-scheme: light)"
      />

      <!-- User prefers dark mode: -->
      <source
        srcset="
          @/assets/logo-white.png,
          @/assets/logo-white@2x.png 2x,
          @/assets/logo-white@3x.png 3x
        "
        media="(prefers-color-scheme: dark)"
      />

      <!-- User has no color preference: -->
      <img srcset="@/assets/logo.png, @/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x" />
    </picture>

    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </header>

  <main class="max-w-4xl mx-auto px-6">
    <RouterView />
  </main>
</template>
