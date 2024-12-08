import { Device } from '../models/device'
import { DeviceNetwork } from '../models/device-network'
import { NetworkMember } from '../models/network-member'
import { uniqueItems } from './unique-items'

/**  */

/**
 * Aggregate network members into a single device object with a list of the networks it belongs to
 * @param network the network the device belongs to
 * @param member the member details within the network
 * @param device the device to aggregate with, or omit if a aggregated device is not available
 * @returns a aggregated device object
 */
export const aggregateDeviceMetadata = (
  network: DeviceNetwork,
  member: NetworkMember,
  device?: Device,
): Device => {
  // select the member that was most recently seen (probably the most up-to-date). Or if the device is null
  // just use the member
  const newerDevice = member.lastSeen > (device?.lastSeen ?? -1) ? member : device
  return {
    id: member.nodeId,
    lastSeen: newerDevice.lastSeen,
    clientVersion: newerDevice.clientVersion,
    names: uniqueItems([...(device?.names ?? []), member.name]),
    physicalAddress: newerDevice.physicalAddress,

    networks: [...(device?.networks ?? []), network],
  }
}
