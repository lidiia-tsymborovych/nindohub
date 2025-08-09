// components/FilterDialogContent.tsx
'use client';

import React from 'react';
import { FilterGroup } from './FilterGroup';
import { X } from 'lucide-react';
import { FilterGroupKey, Filters } from '../types/filters';
import { CATEGORIES, CLANS, KEKKEI, TAG_LABEL_BY_ID, VILLAGES } from '../lib/tags';
import { shallowCompareFilters } from '../utils/shallowCompare';

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  applyFilters: () => void;
  resetFilters: () => void;
};

function FilterDialogContentComponent({ filters, setFilters, applyFilters, resetFilters }: Props) {
  const toggleTag = (group: FilterGroupKey, id: string) => {
    setFilters(prev => {
      const arr = prev[group] ?? [];
      return {
        ...prev,
        [group]: arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id],
      };
    });
  };

  const removeTag = (group: FilterGroupKey, id: string) => {
    setFilters(prev => ({
      ...prev,
      [group]: prev[group].filter(x => x !== id),
    }));
  };

  const flatSelected = Object.values(filters).flat();

  return (
    <aside
      className='flex flex-col gap-2 p-4 h-full dark:bg-[#1f1f1f] overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'
      aria-label='Фільтри персонажів'
    >
      {/* Вибрані теги */}
      <section aria-label='Choosen tags' className='mb-2'>
        <h2 className='text-2xl font-semibold mb-2'>Filters</h2>
        <div className='flex flex-wrap gap-2'>
          {flatSelected.length === 0 ? (
            <p>No selected tags</p>
          ) : (
            flatSelected.map(tagId => {
              const label = TAG_LABEL_BY_ID[tagId] ?? tagId;
              const group = (Object.keys(filters) as FilterGroupKey[]).find(g =>
                filters[g].includes(tagId)
              )!;
              return (
                <button
                  key={tagId}
                  onClick={() => removeTag(group, tagId)}
                  className='flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-[var(--color-accent)] text-white cursor-pointer group'
                >
                  <span>{label}</span>
                  <X className='w-3 h-3' />
                </button>
              );
            })
          )}
        </div>
      </section>

      <FilterGroup
        title='Categories'
        options={CATEGORIES}
        selectedForGroup={filters.categories}
        toggle={id => toggleTag('categories', id)}
      />

      <FilterGroup
        title='Clans'
        options={CLANS}
        selectedForGroup={filters.clans}
        toggle={id => toggleTag('clans', id)}
      />

      <FilterGroup
        title='Villages'
        options={VILLAGES}
        selectedForGroup={filters.villages}
        toggle={id => toggleTag('villages', id)}
      />

      <FilterGroup
        title='Kekkei Genkai'
        options={KEKKEI}
        selectedForGroup={filters.kekkeiGenkai}
        toggle={id => toggleTag('kekkeiGenkai', id)}
      />

      <button
        type='button'
        aria-label='Apply Filters'
        onClick={applyFilters}
        className='mt-2 h-10 py-2 bg-[#1f1f1f] dark:bg-[var(--color-accent)] text-white rounded-md hover:bg-[#1f1f1f]/80 transition cursor-pointer dark:hover:bg-amber-600 duration-300 ease-in-out'
      >
        Apply Filters
      </button>

      <button
        type='button'
        aria-label='Reset all Filters'
        onClick={resetFilters}
        className='mt-2 h-10 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer transition'
      >
        Reset all Filters
      </button>
    </aside>
  );
}

export const FilterDialogContent = React.memo(
  FilterDialogContentComponent,
  (prevProps, nextProps) =>
    shallowCompareFilters(prevProps.filters, nextProps.filters)
);
