import type { Env } from './environment'

// check for authenticated routes
const authentication: PagesFunction<Env> = ({ next, request }) => {
  const allowedPaths = ['/api/login']
  const requestUrl = new URL(request.url)

  // options request don't require authentication
  // only authenticate api routes
  const requestAllowed =
    request.method === 'OPTIONS' ||
    !requestUrl.pathname.includes('/api/') ||
    allowedPaths.includes(requestUrl.pathname)

  if (requestAllowed) {
    return next()
  }

  // Assume that the user is logged in if the Authorization header is present
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }
  return next()
}

export const onRequest = [authentication]
