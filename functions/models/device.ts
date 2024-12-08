import { Network } from './network'
import { paths } from './zerotier/schema'

export type Device = {
  id: string
  lastSeen: number
  networks: Network[]
}

export const ztDeviceToDevice = (
  ztDevice: paths['/network/{networkID}/member/{memberID}']['get']['responses']['200']['content']['application/json'],
): Device => {
  return {
    id: ztDevice.nodeId,
    lastSeen: ztDevice.lastSeen,
    networks: [],
  }
}
