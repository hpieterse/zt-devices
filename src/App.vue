<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth-store'
import { computed, watchEffect } from 'vue'
import router from './router'
import StyledButton from './components/StyledButton.vue'

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
  <header class="h-24 grid grid-cols-[_1fr_auto_1fr] items-center justify-between px-5 md:px-10">
    <picture class="col-start-2">
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
      <img
        srcset="@/assets/logo.png, @/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="ZeroTier logo"
      />
    </picture>

    <div class="col-start-3 flex justify-end items-center">
      <StyledButton @click="logout" v-if="isLoggedIn"> Logout </StyledButton>
    </div>
  </header>

  <main class="max-w-screen-xl mx-auto px-6">
    <RouterView />
  </main>
</template>
