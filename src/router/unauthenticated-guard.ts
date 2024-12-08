import { useAuthStore } from '@/stores/auth-store'

export const unauthenticatedGuard = () => {
  const authStore = useAuthStore()

  if (authStore.authenticated) {
    return '/'
  }
}
