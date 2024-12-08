import { Device } from '../models/device'
import { DeviceNetwork } from '../models/device-network'
import { NetworkMember } from '../models/network-member'
import { uniqueItems } from './unique-items'

/** Aggregate network members into a single device object with a list of the networks it belongs to */
export const aggregateDeviceMetadata = (
  // the network the device belongs to
  network: DeviceNetwork,
  // the member details within the network
  member: NetworkMember,
  // the device to aggregate with
  device?: Device,
): Device => {
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
