<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  // @ts-expect-error Recommended by vue-router (https://router.vuejs.org/guide/advanced/extending-router-link)
  ...RouterLink.props,
})
</script>

<template>
  <RouterLink v-bind="$attrs" :to="props.to" class="text-green-500 hover:text-green-600"
    ><slot></slot
  ></RouterLink>
</template>
