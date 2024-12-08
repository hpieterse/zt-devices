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
  <header class="bg-green-600 py-6 text-center font-bold text-white mb-6 flex px-6">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />

    <h1 class="mx-4 flex-1 text-left text-2xl">Task App</h1>
    <button class="self-end" v-if="isLoggedIn" @click="logout">Logout</button>
  </header>

  <main class="max-w-4xl mx-auto px-6">
    <RouterView />
  </main>
</template>
