<script setup lang="ts">
import StyledButton from '@/components/StyledButton.vue'
import TextInput from '@/components/TextInput.vue'
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
  <form class="flex flex-col my-7" @submit.prevent="handleLogin">
    <TextInput id="api" name="api-key" v-model="token" placeholder="API Access Token" required>
      <template v-slot:label> Enter your API Access Token (You can trust me bro 😉) </template>
    </TextInput>
    <span class="text-error-default" v-if="authenticationFailed && !authenticating"
      >Failed to log in. Make sure the token is valid</span
    >
    <StyledButton :disabled="authenticating" color="primary" class="mt-10 inline-block self-start">
      <template v-if="authenticating"> Logging in... </template>
      <template v-else> Log in </template>
    </StyledButton>
  </form>
</template>
