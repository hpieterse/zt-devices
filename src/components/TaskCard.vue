<script setup lang="ts">
import { defineProps } from 'vue'
import StyledLink from './StyledLink.vue'
import type { Task } from '@api-models/task'

defineProps<{
  task: Task
}>()
</script>
<template>
  <div class="p-4 border gap-2 flex flex-col">
    <h1 class="text-lg">{{ task.name }}</h1>
    <p>{{ task.date }}</p>
    <StyledLink :to="task.id" class="text-green-500 hover:text-green-600">
      View task detail
    </StyledLink>
  </div>
</template>
