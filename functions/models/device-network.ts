import type { NetworkMember } from './network-member'
import type { paths } from './zerotier/schema'

/**
 * Details of a network a device belongs to
 */
export type DeviceNetwork =
  paths['/network/{networkID}']['get']['responses']['200']['content']['application/json'] & {
    // make id non-nullable
    id: string

    /** The device details within the network */
    membershipDetail: NetworkMember
  }
