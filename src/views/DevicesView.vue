<script setup lang="ts">
import KeyValue from '@/components/KeyValue.vue'
import KeyValueList from '@/components/KeyValueList.vue'
import PageHeading from '@/components/PageHeading.vue'
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
    <PageHeading>Your devices</PageHeading>
  </div>
  <StyledButton @click="reload" :disabled="loading" class="mb-5">
    <template v-if="loading"> Refreshing... </template>
    <template v-else> Refresh </template>
  </StyledButton>

  <div class="flex flex-col">
    <div
      v-for="device in devices"
      :key="device.id"
      class="flex gap-5 p-4 items-start border-b border-secondary-30 first:border-t"
    >
      <KeyValueList
        class="flex-1 grid gap-x-5 grid-cols-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5"
      >
        <KeyValue>
          <template v-slot:key>Device Address</template>
          <template v-slot:value> {{ device.id }} </template>
        </KeyValue>
        <KeyValue class="hidden xs:block">
          <template v-slot:key>Last seen on a network</template>
          <template v-slot:value> {{ device.lastSeen }} </template>
        </KeyValue>
        <KeyValue class="hidden xs:block">
          <template v-slot:key>Version</template>
          <template v-slot:value> {{ device.clientVersion }} </template>
        </KeyValue>
        <KeyValue class="hidden md:block">
          <template v-slot:key>Names</template>
          <template v-slot:value>
            <ul>
              <li v-for="name in device.names" :key="name">{{ name }}</li>
            </ul>
          </template>
        </KeyValue>
        <KeyValue class="hidden lg:block">
          <template v-slot:key>Physical Address</template>
          <template v-slot:value> {{ device.physicalAddress }} </template>
        </KeyValue>
      </KeyValueList>

      <StyledLink :to="device.id">Detail</StyledLink>
    </div>
  </div>
</template>
