import { Env } from '../environment'
import { createZtClient } from '../helpers/create-zt-client'
import { Device, ztDeviceToDevice } from '../models/device'

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

  const devicesWithNetworkResponses = await Promise.all(
    networks.map(async (network) => {
      const memberResponse = await client.GET('/network/{networkID}/member', {
        params: {
          path: { networkID: network.id },
        },
      })

      return {
        mapped: [...memberResponse.data.map((member) => ({ ...member, network }))],
        ...memberResponse,
      }
    }),
  )

  // check that all requests were successful
  const failedResponses = devicesWithNetworkResponses
    .filter(({ error }) => error)
    .map(({ response }) => response)
  if (failedResponses.length > 0) {
    return new Response(failedResponses[0].statusText, { status: failedResponses[0].status })
  }

  const devices = devicesWithNetworkResponses
    .flatMap(({ mapped }) => mapped)
    .reduce((devicesMap, member) => {
      if (devicesMap.has(member.nodeId)) {
        const existingMember = devicesMap.get(member.nodeId)
        devicesMap.set(member.nodeId, {
          ...existingMember,
          lastSeen: Math.max(existingMember.lastSeen, member.lastSeen),
          networks: [
            ...existingMember.networks,
            { ...member.network, id: member.network.id ?? '' },
          ],
        })
      } else {
        devicesMap.set(member.nodeId, {
          ...ztDeviceToDevice(member),
          networks: [{ ...member.network, id: member.network.id ?? '' }],
        })
      }

      return devicesMap
    }, new Map<string, Device>())

  return Response.json(devices.values().toArray())
}
