<script setup lang="ts">
import type { Network } from '@api-models/network'
import StyledButton from '@/components/StyledButton.vue'
import KeyValueList from '@/components/KeyValueList.vue'
import KeyValue from '@/components/KeyValue.vue'
import { ref } from 'vue'
const { network } = defineProps<{
  network: Network
}>()

const isExpanded = ref(false)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>
<template>
  <div class="flex gap-5 items-start">
    <KeyValueList class="flex-1 grid grid-cols-1 xs:grid-cols-2">
      <KeyValue :id="`network-label-${network.id}`">
        <template v-slot:key>ID</template>
        <template v-slot:value> {{ network.id }} </template>
      </KeyValue>
      <KeyValue class="hidden xs:block" v-if="!isExpanded">
        <template v-slot:key>Name</template>
        <template v-slot:value>
          <span class="block text-ellipsis overflow-hidden">{{ network.config?.name }}</span>
        </template>
      </KeyValue>
    </KeyValueList>
    <StyledButton
      @:click="toggle()"
      color="secondary"
      :aria-expanded="isExpanded"
      :aria-controls="`network-details-${network.id}`"
    >
      <template v-if="!isExpanded">Expand</template>
      <template v-else>Collapse</template>
    </StyledButton>
  </div>
  <div
    :id="`network-details-${network.id}`"
    :aria-labelledby="`network-label-${network.id}`"
    class="py-4"
    :class="{ hidden: !isExpanded, block: isExpanded }"
  >
    <KeyValueList class="flex flex-col gap-5">
      <KeyValue>
        <template v-slot:key>Name</template>
        <template v-slot:value
          ><span class="break-words">{{ network.config?.name }}</span></template
        >
        <template v-slot:explanation>
          A user-defined short name for this network that is visible to members. We recommend using
          something like a domain name (e.g. zerotier.com) or e-mail address.
        </template>
      </KeyValue>
      <KeyValue>
        <template v-slot:key>Description</template>
        <template v-slot:value>{{ network.description }}</template>
        <template v-slot:explanation> A longer description of this network. </template>
      </KeyValue>
    </KeyValueList>
  </div>
</template>
