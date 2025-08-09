// utils/filters.ts
import { Filters } from '../types/filters';

export const emptyFilters: Filters = {
  clans: [],
  villages: [],
  kekkeiGenkai: [],
  categories: [],
};

export function filtersToString(filters: Filters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, values]) => {
    if (values.length > 0) {
      params.set(key, values.join(','));
    }
  });
  return params.toString();
}

export function stringToFilters(queryString: string): Filters {
  const params = new URLSearchParams(queryString);
  const result: Filters = { ...emptyFilters };
  for (const key of Object.keys(result)) {
    const value = params.get(key);
    if (value) {
      result[key as keyof Filters] = value.split(',');
    }
  }
  return result;
}
