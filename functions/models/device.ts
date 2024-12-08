import type { DeviceNetwork } from './device-network'

export type Device = {
  id: string
  lastSeen: number | null
  clientVersion: string
  names: string[]
  physicalAddress: string
  networks: DeviceNetwork[]
}
