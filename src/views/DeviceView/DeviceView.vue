<script setup lang="ts">
import { useDeviceStore } from '@/stores/device-store'
import { computed, defineProps } from 'vue'
import NotFoundView from '@/views/NotFoundView.vue'
import StyledLink from '@/components/StyledLink.vue'
import PageHeading from '@/components/PageHeading.vue'
import KeyValueList from '@/components/KeyValueList.vue'
import KeyValue from '@/components/KeyValue.vue'
import NetworkDetail from './NetworkDetail.vue'

const { id } = defineProps<{
  id: string
}>()

const deviceStore = useDeviceStore()

const device = computed(() => deviceStore.getDevice(id))
</script>

<template>
  <template v-if="device.value != null">
    <PageHeading>Device details</PageHeading>
    <StyledLink to=".." class="mb-5">Back</StyledLink>

    <div class="py-4">
      <KeyValueList class="flex flex-col gap-5 max-w-xl">
        <KeyValue>
          <template v-slot:key>Device Address</template>
          <template v-slot:value>{{ device.value.id }}</template>
          <template v-slot:explanation>
            A ZeroTier Node's Address. This is the node's unique ZerTier ID.
          </template>
        </KeyValue>

        <KeyValue>
          <template v-slot:key>Last seen on a network</template>
          <template v-slot:value>{{ device.value.lastSeen }}</template>
          <template v-slot:explanation>
            Last contact to one of the networks the device is a member of
          </template>
        </KeyValue>
        <KeyValue>
          <template v-slot:key>Physical IP</template>
          <template v-slot:value>{{ device.value.physicalAddress }}</template>
          <template v-slot:explanation>
            The physical IP address the member is connecting to the controller. It is Probably the
            IP address of your internet router/modem.
          </template>
        </KeyValue>
      </KeyValueList>
    </div>

    <div class="flex flex-col">
      <h2 class="text-2xl font-thin">Network membership</h2>
      <div
        v-for="network in device.value.networks"
        :key="network.id"
        class="flex p-4 flex-col border-b border-secondary-30 first:border-t"
      >
        <NetworkDetail :network="network" />
      </div>
    </div>
  </template>
  <template v-else>
    <NotFoundView />
  </template>
</template>
