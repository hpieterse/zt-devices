<script setup lang="ts">
import { useTaskStore } from '@/stores/task-store'
import { computed, defineProps } from 'vue'
import NotFoundView from './NotFoundView.vue'
import StyledLink from '@/components/StyledLink.vue'

const { id } = defineProps<{
  id: string
}>()

const taskStore = useTaskStore()

const task = computed(() => taskStore.getTask(id))
</script>

<template>
  <template v-if="task.value != null">
    <div class="mb-4">
      <StyledLink to="..">Back</StyledLink>
    </div>

    <div class="p-4 border gap-2 flex flex-col">
      <h1 class="text-xl">Task Detail</h1>
      <h1 class="text-lg">{{ task.value.name }}</h1>
      <p>{{ task.value.date }}</p>
    </div>
  </template>
  <template v-else>
    <NotFoundView />
  </template>
</template>
