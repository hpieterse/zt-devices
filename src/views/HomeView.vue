<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDeviceStore } from '@/stores/device-store'
import { computed } from 'vue'

// initialize the store
const deviceStore = useDeviceStore()
deviceStore.dispatchInitialize()

const storeError = computed(() => deviceStore.failed)
const storeInitializing = computed(() => !deviceStore.initialized)
</script>

<template>
  <template v-if="storeInitializing">
    <p class="text-center">Loading...</p>
  </template>
  <p v-else-if="storeError" class="text-center text-red-600">
    The store failed to load. Please reload the page to try again.
  </p>
  <RouterView v-else />
</template>
