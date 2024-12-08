/**
 * Get unique non nullish values from an array
 */
export const uniqueItems = <T>(array: T[]): T[] =>
  Array.from(new Set(array)).filter((item) => !!item)
