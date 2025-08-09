'use client';

import { Input } from '@/components/ui/input';
import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { FilterDialogContent } from '../components/FilterDialogContent';
import { FilterSheet } from '../components/FilterSheet';
import { Search } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { emptyFilters } from '../utils/filtersToString';
import { useFilterState } from '../hooks/useFiltersState';
import { LoadingButton } from '../components/LoadingButton';

const CharacterCardSkeleton = () => {
  return (
    <div className='animate-pulse bg-white dark:bg-[#1f1f1f] rounded-xl h-64 w-full'></div>
  );
};

const PAGE_SIZE = 20;

export default function CharactersPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);

  const {
    appliedFilters,
    setAppliedFilters,
    pendingFilters,
    setPendingFilters,
  } = useFilterState();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, appliedFilters]);

  const applyFilters = useCallback(() => {
    setAppliedFilters(pendingFilters);
    setIsFilterOpen(false);
  }, [pendingFilters, setAppliedFilters]);

  const resetFilters = useCallback(() => {
    setPendingFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  }, [setAppliedFilters, setPendingFilters]);

  const { characters, loading, error, hasMore } = useCharacters(
    useMemo(
      () => ({
        page,
        pageSize: PAGE_SIZE,
        query: debouncedSearch,
        filters: appliedFilters,
      }),
      [page, debouncedSearch, appliedFilters]
    )
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  }, [loading, hasMore]);

  if (error) {
    return (
      <main className='p-4'>
        <p className='text-red-600' role='alert'>
          Error: {error}
        </p>
      </main>
    );
  }

  return (
    <div className='p-4 flex flex-col lg:flex-row gap-6'>
      <aside
        aria-label='Character filters'
        className='hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-lg'
      >
        <FilterDialogContent
          filters={pendingFilters}
          setFilters={setPendingFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      </aside>

      <main className='flex-1'>
        <header className='flex items-center justify-between mb-6 gap-4'>
          <div className='lg:hidden'>
            <FilterSheet
              filters={pendingFilters}
              setFilters={setPendingFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            />
          </div>

          <div className='relative w-full role="search"'>
            <Search
              aria-hidden='true'
              className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none'
            />
            <Input
              type='search'
              placeholder='Search by name...'
              className='pl-9'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label='Search characters by name'
              autoComplete='off'
            />
          </div>
        </header>

        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {loading && page === 1
            ? Array.from({ length: 8 }).map((_, i) => (
                <CharacterCardSkeleton key={i} />
              ))
            : characters.map(char => (
                <CharacterCard key={char.id} character={char} />
              ))}
        </section>

        {hasMore && (
          <div className='mt-8 flex flex-col items-center'>
            <LoadingButton
              type='button'
              aria-busy={loading}
              aria-label={
                loading ? 'Loading more characters' : 'Load more characters'
              }
              onClick={loadMore}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load more'}
            </LoadingButton>

            <span className='sr-only' aria-live='polite'>
              {loading
                ? 'Loading more characters'
                : page > 1
                ? 'More characters loaded'
                : ''}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
