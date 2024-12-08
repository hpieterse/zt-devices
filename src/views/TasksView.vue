<script setup lang="ts">
import { useTaskStore } from '@/stores/task-store'
import TaskCard from '@/components/TaskCard.vue'
import { computed } from 'vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
const loading = computed(() => taskStore.loading)

const reload = () => {
  taskStore.dispatchLoad()
}
</script>

<template>
  <button
    @click="reload"
    :disabled="loading"
    class="px-6 py-3 bg-green-700 rounded-md font-semibold text-white hover:bg-green-800 active:bg-green-900 disabled:bg-green-700 disabled:opacity-50"
  >
    <template v-if="loading"> Loading... </template>
    <template v-else> Reload </template>
  </button>
  <div class="mt-4 flex flex-col gap-6">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>
