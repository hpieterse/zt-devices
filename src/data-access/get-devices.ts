import type { Device } from '@api-models/device'
import { apiBasePath } from './api-base-path'
import { getAuthHeaders } from './get-auth-headers'

export const getDevices = async () => {
  const response = await fetch(`${apiBasePath}devices`, {
    headers: {
      ...getAuthHeaders(),
    },
  })

  if (response.ok) {
    return (await response.json()) as Device[]
  }

  throw new Error('Failed to fetch tasks')
}
