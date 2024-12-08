export const mapVersion = (version: string | null | undefined): string => {
  if (!version || version === '-1.-1.-1') return ''

  return version
}
