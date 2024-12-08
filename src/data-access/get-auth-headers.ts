import { useAuthStore } from '@/stores/auth-store'

export const getAuthHeaders = () => {
  const authStore = useAuthStore()

  return {
    Authorization: `token ${authStore.token}`,
  }
}
