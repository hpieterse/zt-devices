import { Device } from '../models/device'
import { uniqueItems } from './unique-items'

export const mergeDevicesMetadata = (deviceA: Device, deviceB: Device): Omit<Device, 'id'> => {
  const newerDevice = deviceA.lastSeen > deviceB.lastSeen ? deviceA : deviceB
  return {
    lastSeen: newerDevice.lastSeen,
    clientVersion: newerDevice.clientVersion,
    names: uniqueItems([...deviceA.names, ...deviceB.names]),
    physicalAddress: newerDevice.physicalAddress,
    networks: [...deviceA.networks, ...deviceB.networks],
  }
}
