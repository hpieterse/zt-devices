import type { Task } from '@api-models/task'
import { apiBasePath } from './api-base-path'
import { getAuthHeaders } from './get-auth-headers'

export const getTasks = async () => {
  const response = await fetch(`${apiBasePath}tasks`, {
    headers: {
      ...getAuthHeaders(),
    },
  })

  if (response.ok) {
    return (await response.json()) as Task[]
  }

  throw new Error('Failed to fetch tasks')
}
