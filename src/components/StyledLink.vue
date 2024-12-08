<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  // @ts-expect-error Recommended by vue-router (https://router.vuejs.org/guide/advanced/extending-router-link)
  ...RouterLink.props,
})
</script>

<template>
  <RouterLink
    v-bind="$attrs"
    :to="props.to"
    class="inline-block px-6 py-3 rounded-2xl font-semibold bg-secondary-default hover:bg-secondary-dark active:bg-secondary-darkest disabled:bg-secondary-default disabled:opacity-50 text-white"
    ><slot></slot
  ></RouterLink>
</template>
