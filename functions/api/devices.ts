import { Env } from '../environment'
import { createAuthenticatedZtClient } from '../helpers/create-authenticated-zt-client'
import { aggregateDeviceMetadata } from '../helpers/aggregate-device-metadata'
import { Device } from '../models/device'
import { DeviceNetwork } from '../models/device-network'

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const client = createAuthenticatedZtClient(env, request)

  const {
    data: networks,
    error: networkGetError,
    response: networkGetResponse,
  } = await client.GET('/network')

  if (networkGetError) {
    return new Response(networkGetResponse.statusText, { status: networkGetResponse.status })
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
    // choose the first failed response to return
    return new Response(failedResponses[0].statusText, { status: failedResponses[0].status })
  }

  const devices = networkMembers
    .flatMap(({ mapped }) => mapped)
    // get a unique list of devices, aggregating the meta data
    .reduce((devicesMap, member) => {
      const deviceNetwork: DeviceNetwork = {
        ...member.network,
        // make sure the id is not null
        id: member.network.id ?? '',
        // add the original member details to the network
        membershipDetail: member,
      }

      // aggregate the new device into the existing device aggregate
      devicesMap.set(member.nodeId, {
        id: member.nodeId,
        ...aggregateDeviceMetadata(deviceNetwork, member, devicesMap.get(member.nodeId)),
      })

      return devicesMap
    }, new Map<string, Device>())

  return Response.json(devices.values().toArray())
}
