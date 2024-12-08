import { DateTime } from 'luxon'
export const formatTime = (time: number | null | undefined): string => {
  if (time == null || time === 0) {
    return 'Never'
  }
  const date = DateTime.fromMillis(time)
  return date.toRelative() ?? date.toLocaleString()
}
