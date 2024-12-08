<script setup lang="ts">
import type { DeviceNetwork } from '@api-models/device-network'
import StyledButton from '@/components/StyledButton.vue'
import KeyValueList from '@/components/KeyValueList.vue'
import KeyValue from '@/components/KeyValue.vue'
import { ref } from 'vue'
import { formatTime } from '@/formatters/format-time'
import { formatVersion } from '@/formatters/format-version'
import ValuePill from '@/components/ValuePill.vue'

const { network } = defineProps<{
  network: DeviceNetwork
}>()

const isExpanded = ref(false)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>
<template>
  <div class="flex gap-5 items-start">
    <KeyValueList
      class="flex-1 grid gap-x-5 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5"
    >
      <KeyValue :id="`network-label-${network.id}`">
        <template v-slot:key>ID</template>
        <template v-slot:value> {{ network.id }} </template>
      </KeyValue>
      <KeyValue class="hidden xs:block" v-if="!isExpanded">
        <template v-slot:key>Name</template>
        <template v-slot:value>
          <span class="block text-ellipsis overflow-hidden" v-if="network.config?.name">
            {{ network.config?.name }}
          </span>
        </template>
      </KeyValue>
      <KeyValue class="hidden sm:block" v-if="!isExpanded">
        <template v-slot:key>Last seen</template>
        <template v-slot:value>
          {{ formatTime(network.membershipDetail.lastSeen) }}
        </template>
      </KeyValue>
      <KeyValue class="hidden md:block" v-if="!isExpanded">
        <template v-slot:key><span class="invisible">Authorized</span></template>
        <template v-slot:value>
          <ValuePill :color="network.membershipDetail.config?.authorized ? 'success' : 'error'">{{
            network.membershipDetail.config?.authorized ? 'Authorised' : 'Not authorized'
          }}</ValuePill>
        </template>
      </KeyValue>
      <KeyValue class="hidden lg:block" v-if="!isExpanded">
        <template v-slot:key>Managed IPs</template>
        <template v-slot:value>
          <ul v-if="(network.membershipDetail.config?.ipAssignments?.length ?? 0) > 0">
            <li v-for="ip in network.membershipDetail.config?.ipAssignments ?? []" :key="ip">
              {{ ip }}
            </li>
          </ul>
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
          ><span class="break-words" v-if="network.config?.name">{{
            network.config?.name
          }}</span></template
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
      <KeyValue>
        <template v-slot:key>Last seen</template>
        <template v-slot:value>
          {{ formatTime(network.membershipDetail.lastSeen) }}
        </template>
        <template v-slot:explanation>
          The last time this member checked in with the network controller for this network.
        </template>
      </KeyValue>
      <KeyValue>
        <template v-slot:key>Version</template>
        <template v-slot:value>
          {{ formatVersion(network.membershipDetail.clientVersion) }}
        </template>
        <template v-slot:explanation>
          Version of the ZeroTier agent running on the device
        </template>
      </KeyValue>
      <KeyValue>
        <template v-slot:key>Authorised</template>
        <template v-slot:value>
          {{ network.membershipDetail.config?.authorized ? 'Authorised' : 'Not authorized' }}
        </template>
        <template v-slot:explanation>
          When a member is authorized, it's allowed to talk to other members of the network.
        </template>
      </KeyValue>
      <KeyValue>
        <template v-slot:key>Managed IPs</template>
        <template v-slot:value>
          <ul v-if="(network.membershipDetail.config?.ipAssignments?.length ?? 0) > 0">
            <li v-for="ip in network.membershipDetail.config?.ipAssignments ?? []" :key="ip">
              {{ ip }}
            </li>
          </ul>
        </template>
        <template v-slot:explanation>
          These are the IP addresses you use when you use ZeroTier. Typically Easy Auto-Assign is
          enabled and you do not need to change anything. You can set Managed IPs manually if you
          like.
        </template>
      </KeyValue>
    </KeyValueList>
  </div>
</template>
