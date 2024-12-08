<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  color: 'error' | 'success'
}>()
</script>

<template>
  <span
    class="px-3 py-1 rounded-full text-white"
    :class="{
      'bg-error-default': color == 'error',
      'bg-success-default': color == 'success',
    }"
  >
    <slot></slot>
  </span>
</template>
