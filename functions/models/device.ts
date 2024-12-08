import type { Network } from './network'

export type Device = {
  id: string
  lastSeen: number
  clientVersion: string
  names: string[]
  physicalAddress: string
  networks: Network[]
}
