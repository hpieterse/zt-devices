import { Env } from '../environment'

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  const { token } = (await request.json()) as { token?: string }

  if (token == null || token == 'invalid') {
    return new Response('Unauthorized', { status: 401 })
  }

  return new Response('OK')
}
