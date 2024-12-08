<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  id: string
  name: string
  placeholder: string
  required?: boolean
}>()

const value = defineModel()
</script>

<template>
  <label v-if="$slots.label" :for="id" class="mb-1">
    <slot name="label"></slot>
  </label>
  <input
    :id="id"
    :name="name"
    v-model="value"
    type="text"
    :placeholder="placeholder"
    :required="required"
    class="border border-dark-default py-4 px-6 rounded-md text-black placeholder:text-dark-80"
  />
</template>
