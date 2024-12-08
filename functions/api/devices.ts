import { Env } from '../environment'
import { createZtClient } from '../helpers/create-zt-client'
import { aggregateDeviceMetadata } from '../helpers/aggregate-device-metadata'
import { Device } from '../models/device'
import { DeviceNetwork } from '../models/device-network'

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

  // get all devices for all networks
  const networkMembers = await Promise.all(
    networks.map(async (network) => {
      const memberResponse = await client.GET('/network/{networkID}/member', {
        params: {
          path: { networkID: network.id },
        },
      })

      // add the network to each member so that we can add the list of networks to the final list of devices
      return {
        mapped: [...memberResponse.data.map((member) => ({ ...member, network }))],
        ...memberResponse,
      }
    }),
  )

  // check that all requests were successful
  const failedResponses = networkMembers
    .filter(({ error }) => error)
    .map(({ response }) => response)
  if (failedResponses.length > 0) {
    return new Response(failedResponses[0].statusText, { status: failedResponses[0].status })
  }

  const devices = networkMembers
    .flatMap(({ mapped }) => mapped)
    // get a unique list of devices, aggregating the meta data
    .reduce((devicesMap, member) => {
      const deviceNetwork: DeviceNetwork = {
        ...member.network,
        // make sure the if is not null
        id: member.network.id ?? '',
        // add the original member details to the network
        membershipDetail: member,
      }

      devicesMap.set(member.nodeId, {
        id: member.nodeId,
        ...aggregateDeviceMetadata(deviceNetwork, member, devicesMap.get(member.nodeId)),
      })

      return devicesMap
    }, new Map<string, Device>())

  return Response.json(devices.values().toArray())
}
