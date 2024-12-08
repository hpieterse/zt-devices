import { paths } from './zerotier/schema'

export type Network =
  paths['/network/{networkID}']['get']['responses']['200']['content']['application/json']
