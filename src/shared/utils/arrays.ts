export const mergeArraysDistinct = <T>(
  arr1: (T & { id: number })[],
  arr2: (T & { id: number })[]
): (T & { id: number })[] => {
  const map = new Map([...arr1, ...arr2].map((item) => [item.id, item]));
  return Array.from(map.values());
};