import { defineStore } from 'pinia'
import type { Device } from '@api-models/device'
import { getDevices } from '@/data-access/get-devices'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth-store'

export const useDeviceStore = defineStore('devices', () => {
  const authStore = useAuthStore()

  const devices = ref<Device[]>([])
  const loading = ref(false)
  const initialized = ref(false)
  const failed = ref(false)

  const getDevice = (id: string) => computed(() => devices.value.find((device) => device.id === id))

  const dispatchLoad = async () => {
    try {
      loading.value = true
      devices.value = await getDevices()
      initialized.value = true
    } catch {
      failed.value = true
    } finally {
      loading.value = false
    }
  }

  const dispatchInitialize = async () => {
    if (initialized.value) return

    await dispatchLoad()
  }

  authStore.$onAction((action) => {
    // clear store on logout
    if (action.name === 'dispatchLogout') {
      devices.value = []
      loading.value = false
      initialized.value = false
      failed.value = false
    }
  })

  return {
    devices,
    loading,
    initialized,
    failed,
    getDevice,
    dispatchLoad,
    dispatchInitialize,
  }
})
