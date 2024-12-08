import type { Env } from './environment'

// Respond to OPTIONS method
export const onRequestOptions: PagesFunction<Env> = async ({ env }) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': env.ACCESS_CONTROL_ALLOW_ORIGIN ?? null,
      'Access-Control-Allow-Headers': 'accept, Authorization',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
    },
  })
}

// check for authenticated routes
const authentication: PagesFunction<Env> = ({ next, request }) => {
  const allowedPaths = ['/api/login']
  const requestUrl = new URL(request.url)
  const requestAllowed = request.method === 'OPTIONS' || allowedPaths.includes(requestUrl.pathname)

  if (requestAllowed) {
    return next()
  }

  const authHeader = request.headers.get('Authorization')
  if (!authHeader) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }
  return next()
}

// Set CORS to all /api responses
const addHeader: PagesFunction<Env> = async ({ env, next }) => {
  const response = await next()
  response.headers.set('Access-Control-Allow-Origin', env.ACCESS_CONTROL_ALLOW_ORIGIN ?? null)
  return response
}

export const onRequest = [authentication, addHeader]

// export const onRequest: PagesFunction<Env> = async ({ env, next, request }) => {
//   if (request.method !== 'OPTIONS') {
//     const authHeader = request.headers.get('Authorization')
//     if (!authHeader) {
//       return new Response('Unauthorized', {
//         status: 401,
//         headers: {
//           'Access-Control-Allow-Origin': env.ACCESS_CONTROL_ALLOW_ORIGIN ?? null,
//         },
//       })
//     }
//   }

//   const response = await next()
//   response.headers.set('Access-Control-Allow-Origin', env.ACCESS_CONTROL_ALLOW_ORIGIN ?? null)
//   return response
// }
