<script setup lang="ts">
import KeyValue from '@/components/KeyValue.vue'
import KeyValueList from '@/components/KeyValueList.vue'
import StyledButton from '@/components/StyledButton.vue'
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
  <div>
    <h1 class="text-4xl font-thin mb-10">Your devices</h1>
  </div>
  <StyledButton @click="reload" :disabled="loading">
    <template v-if="loading"> Loading... </template>
    <template v-else> Reload </template>
  </StyledButton>

  <div class="mt-5 flex flex-col">
    <div
      v-for="device in devices"
      :key="device.id"
      :device="device"
      class="flex gap-5 p-4 items-start border-b border-secondary-30 first:border-t"
    >
      <KeyValueList class="flex-1 grid grid-cols-1 xs:grid-cols-2">
        <KeyValue>
          <template v-slot:key>Device Address</template>
          <template v-slot:value> {{ device.id }} </template>
        </KeyValue>
        <KeyValue class="hidden xs:block">
          <template v-slot:key>Last seen on a network</template>
          <template v-slot:value> {{ device.lastSeen }} </template>
        </KeyValue>
      </KeyValueList>

      <StyledLink :to="device.id">Detail</StyledLink>
    </div>
  </div>
</template>
