import { Env } from '../environment'
import { createZtClient } from '../helpers/create-zt-client'
import { Device } from '../models/device'

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const client = createZtClient(env, request)

  const {
    data: networks,
    error: networkError,
    response: networkResponse,
  } = await client.GET('/network')

  if (networkError) {
    return new Response(networkResponse.statusText, { status: networkResponse.status })
  }

  const networkWithMembersResponses = await Promise.all(
    networks.map((network) => {
      return client.GET('/network/{networkID}/member', {
        params: {
          path: { networkID: network.id },
        },
      })
    }),
  )

  // check that all requests were successful
  const failedResponses = networkWithMembersResponses
    .filter(({ error }) => error)
    .map(({ response }) => response)
  if (failedResponses.length > 0) {
    return new Response(failedResponses[0].statusText, { status: failedResponses[0].status })
  }

  const devices = networkWithMembersResponses.flatMap(({ data }) =>
    data.map(({ nodeId }): Device => ({ id: nodeId })),
  )

  return Response.json(devices)
}
