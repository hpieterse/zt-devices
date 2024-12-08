import { useAuthStore } from '@/stores/auth-store'

export const authenticatedGuard = () => {
  const authStore = useAuthStore()

  if (!authStore.authenticated) {
    return '/login'
  }
}
