<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth-store'
import { computed, ref, watchEffect } from 'vue'

const authStore = useAuthStore()

const token = ref('')
const authenticating = computed(() => authStore.authenticating)
const authenticationFailed = computed(() => authStore.authenticationError)

const handleLogin = () => {
  authStore.dispatchLogin(token.value)
}

watchEffect(() => {
  if (authStore.authenticated) {
    router.push('/')
  }
})
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleLogin">
    <input type="text" v-model="token" placeholder="API token" required />
    <span class="text-red-600" v-if="authenticationFailed && !authenticating"
      >Failed to log in. Make sure the token is valid</span
    >
    <button
      :disabled="authenticating"
      class="px-6 py-3 bg-green-700 rounded-md font-semibold text-white hover:bg-green-800 active:bg-green-900 disabled:bg-green-700 disabled:opacity-50"
    >
      <template v-if="authenticating"> Logging in... </template>
      <template v-else> Log in </template>
    </button>
  </form>
</template>
