import { apiBasePath } from './api-base-path'

export const login = async (token: string) => {
  const response = await fetch(`${apiBasePath}login`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
  if (response.ok) {
    return token
  }

  throw new Error('Failed to fetch tasks')
}
