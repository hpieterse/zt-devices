export const formatVersion = (version: string | null | undefined): string => {
  if (version == null || version === '-1.-1.-1') {
    return ''
  }
  return version
}
