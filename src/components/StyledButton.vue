<script setup lang="ts">
import { defineProps } from 'vue'
const { color, disabled } = defineProps<{
  disabled?: boolean
  color?: 'primary' | 'secondary'
}>()
</script>
<template>
  <button
    :disabled="disabled"
    class="px-6 py-3 rounded-2xl font-semibold"
    :class="{
      'bg-primary-default hover:bg-primary-dark active:bg-primary-darkest disabled:bg-primary-default disabled:opacity-50 text-black':
        color === 'primary',
      'bg-secondary-default hover:bg-secondary-dark active:bg-secondary-darkest disabled:bg-secondary-default disabled:opacity-50 text-white':
        color === 'secondary',
    }"
  >
    <slot></slot>
  </button>
</template>
