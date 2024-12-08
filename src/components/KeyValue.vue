<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
import KeyValueList from '@/components/KeyValueList.vue'

onMounted(() => {
  // check that the KeyValue component is used inside a KeyValueList component
  const instance = getCurrentInstance()
  if (instance?.parent?.type !== KeyValueList) {
    console.warn('KeyValue component must be used inside a KeyValueList component')
  }
})
</script>
<template>
  <div class="grid grid-cols-2 grid-rows-[auto_1fr] gap-x-5">
    <dt class="col-start-1 text-sm font-light text-secondary-darkest dark:text-secondary-30">
      <slot name="key"></slot>
    </dt>
    <dd class="row-start-2 empty:after:content-['-']"><slot name="value"></slot></dd>
    <dd
      v-if="$slots.explanation"
      class="col-start-2 row-span-2 text-sm font-light text-dark-50 hidden xs:block"
    >
      <slot name="explanation"></slot>
    </dd>
  </div>
</template>
