import { defineStore } from 'pinia'
import type { Task } from '@api-models/task'
import { getTasks } from '@/data-access/get-tasks'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const initialized = ref(false)
  const failed = ref(false)

  const getTask = (id: string) => computed(() => tasks.value.find((task) => task.id === id))

  const dispatchLoad = async () => {
    try {
      loading.value = true
      tasks.value = await getTasks()
      initialized.value = true
    } catch {
      failed.value = true
    } finally {
      loading.value = false
    }
  }

  const dispatchInitialize = async () => {
    if (initialized.value) return

    await dispatchLoad()
  }

  return { tasks, loading, initialized, failed, getTask, dispatchLoad, dispatchInitialize }
})
