import createClient, { Middleware } from 'openapi-fetch'
import { Env } from '../environment'
import { paths } from '../models/zerotier/schema'

const authMiddleware = (
  incomingRequest: Request<unknown, IncomingRequestCfProperties<unknown>>,
): Middleware => ({
  async onRequest({ request }) {
    request.headers.set('Authorization', incomingRequest.headers.get('Authorization') || '')
    return request
  },
})

export const createAuthenticatedZtClient = (
  env: Env,
  request: Request<unknown, IncomingRequestCfProperties<unknown>>,
) => {
  const client = createClient<paths>({ baseUrl: env.ZT_API_URL })

  client.use(authMiddleware(request))

  return client
}
