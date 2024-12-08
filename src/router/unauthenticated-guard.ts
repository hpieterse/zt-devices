import { useAuthStore } from '@/stores/auth-store'

export const unauthenticatedGuard = () => {
  const authStore = useAuthStore()

  // check for non null non empty string
  if (authStore.authenticated) {
    return '/'
  }
}
