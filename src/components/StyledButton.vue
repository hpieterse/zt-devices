<script setup lang="ts">
import { defineProps } from 'vue'
const { color, disabled } = defineProps<{
  disabled?: boolean
  color?: 'primary' | 'secondary'
}>()

const classes = {
  primary:
    'bg-primary-default hover:bg-primary-dark active:bg-primary-darkest disabled:bg-primary-default disabled:opacity-50',
  secondary:
    'bg-secondary-default hover:bg-secondary-dark active:bg-secondary-darkest disabled:bg-secondary-default disabled:opacity-50',
}
</script>
<template>
  <button
    :disabled="disabled"
    :class="`px-6 py-3 rounded-md font-semibold ${classes[color ?? 'primary']}`"
  >
    <slot></slot>
  </button>
</template>
