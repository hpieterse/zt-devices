import { login } from '@/data-access/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const LOCAL_STORAGE_TOKEN = 'token'

export const useAuthStore = defineStore('auth', () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)

  const token = ref<string>(storedToken ?? '')
  const authenticating = ref(false)

  // is authenticated if the stored token is not null or an empty string
  const authenticated = ref(!!storedToken)
  const authenticationError = ref(false)

  const dispatchLogin = async (newToken: string) => {
    authenticated.value = false
    authenticating.value = true
    try {
      const checkedToken = await login(newToken)
      localStorage.setItem(LOCAL_STORAGE_TOKEN, checkedToken)
      token.value = checkedToken
      authenticated.value = true
    } catch {
      authenticationError.value = true
    } finally {
      authenticating.value = false
    }
  }

  const dispatchLogout = () => {
    authenticated.value = false
    token.value = ''
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  }

  return {
    token,
    authenticated,
    authenticating,
    authenticationError,
    dispatchLogin,
    dispatchLogout,
  }
})
