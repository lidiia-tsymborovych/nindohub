// types/filters.ts
export type FilterGroupKey = 'clans' | 'villages' | 'kekkeiGenkai' | 'categories';

export type Filters = {
  clans: string[];
  villages: string[];
  kekkeiGenkai: string[];
  categories: string[];
};

export type TagOption = { id: string; label: string; group: FilterGroupKey };
