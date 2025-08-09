import { Filters } from "../types/filters";

export function shallowCompareFilters(
  prevFilters: Filters,
  nextFilters: Filters
): boolean {
  const keys = Object.keys(prevFilters) as (keyof Filters)[];
  if (keys.length !== Object.keys(nextFilters).length) return false;

  for (const key of keys) {
    const prevArr = prevFilters[key];
    const nextArr = nextFilters[key];
    if (prevArr.length !== nextArr.length) return false;

    for (let i = 0; i < prevArr.length; i++) {
      if (prevArr[i] !== nextArr[i]) return false;
    }
  }

  return true;
}
