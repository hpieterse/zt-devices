<script setup lang="ts">
import { useDeviceStore } from '@/stores/device-store'
import { computed, defineProps } from 'vue'
import NotFoundView from './NotFoundView.vue'
import StyledLink from '@/components/StyledLink.vue'

const { id } = defineProps<{
  id: string
}>()

const deviceStore = useDeviceStore()

const device = computed(() => deviceStore.getDevice(id))
</script>

<template>
  <template v-if="device.value != null">
    <div class="mb-4">
      <StyledLink to="..">Back</StyledLink>
    </div>

    <div class="p-4 border gap-2 flex flex-col">
      <h1 class="text-xl">Device details</h1>
      <h1 class="text-lg">{{ device.value.id }}</h1>
      <div v-for="network in device.value.networks" :key="network.id ?? 0">
        {{ network.id }}
      </div>
    </div>
  </template>
  <template v-else>
    <NotFoundView />
  </template>
</template>
