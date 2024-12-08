import type { paths } from './zerotier/schema'

/** Details of a device within a network */
export type NetworkMember =
  paths['/network/{networkID}/member/{memberID}']['get']['responses']['200']['content']['application/json']
