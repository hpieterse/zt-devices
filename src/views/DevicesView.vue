<script setup lang="ts">
import StyledLink from '@/components/StyledLink.vue'
import { useDeviceStore } from '@/stores/device-store'
import { computed } from 'vue'

const deviceStore = useDeviceStore()
const devices = computed(() => deviceStore.devices)
const loading = computed(() => deviceStore.loading)

const reload = () => {
  deviceStore.dispatchLoad()
}
</script>

<template>
  <button
    @click="reload"
    :disabled="loading"
    class="px-6 py-3 bg-green-700 rounded-md font-semibold text-white hover:bg-green-800 active:bg-green-900 disabled:bg-green-700 disabled:opacity-50"
  >
    <template v-if="loading"> Loading... </template>
    <template v-else> Reload </template>
  </button>
  <div class="mt-4 flex flex-col gap-6">
    <div v-for="device in devices" :key="device.id" :device="device">
      {{ device.id }}
      {{ device.lastSeen }}
      <StyledLink :to="device.id">Detail</StyledLink>
    </div>
  </div>
</template>
