import { Device } from '../models/device'
import { paths } from '../models/zerotier/schema'
import { mapVersion } from './map-version'

export const ztDeviceToDevice = (
  ztDevice: paths['/network/{networkID}/member/{memberID}']['get']['responses']['200']['content']['application/json'],
): Device => {
  return {
    id: ztDevice.nodeId ?? '',
    lastSeen: ztDevice.lastSeen ?? 0,
    clientVersion: mapVersion(ztDevice.clientVersion),
    names: [ztDevice.name ?? ''],
    physicalAddress: ztDevice.physicalAddress ?? '',
    networks: [],
  }
}
