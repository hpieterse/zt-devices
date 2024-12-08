import createClient from 'openapi-fetch'
import { Env } from '../environment'
import type { paths } from '../models/zerotier/schema'

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const { token } = (await request.json()) as { token?: string }

  const client = createClient<paths>({ baseUrl: env.ZT_API_URL })

  const { data } = await client.GET('/status', {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  if (data.user != null) {
    return new Response('OK')
  }

  return new Response('Unauthorized', { status: 401 })
}
