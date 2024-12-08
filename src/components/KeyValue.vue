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
  <div>
    <dt class="text-sm font-light text-secondary-darkest dark:text-secondary-30">
      <slot name="key"></slot>
    </dt>
    <dd><slot name="value"></slot></dd>
  </div>
</template>
