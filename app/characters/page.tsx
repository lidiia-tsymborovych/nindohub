'use client';

import { Input } from '@/components/ui/input';
import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { FilterDialogContent } from '../components/FilterDialogContent';
import { FilterSheet } from '../components/FilterSheet';
import { Search } from 'lucide-react';

export default function CharactersPage() {
  const { characters, loading, error, loadMore, hasMore } = useCharacters();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='p-4 flex flex-col lg:flex-row gap-6'>
      {/* ASIDE на DESKTOP */}
      <div className='hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-lg'>
        <FilterDialogContent />
      </div>

      {/* Основний контент */}
      <main className='flex-1'>
        {/* Хедер з інпутом і фільтрами */}

        <div className='flex items-center justify-between mb-6 gap-4 '>
          {/* Кнопка "Filters" на мобілці */}
          <div className='lg:hidden'>
            <FilterSheet />
          </div>

          <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none' />
            <Input
              type='search'
              placeholder='Search by name...'
              className='pl-9'
            />
          </div>
        </div>

        {/* Контент персонажів */}
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {characters.map((char, index) => (
            <CharacterCard
              key={char.id}
              character={char}
              isPriority={index < 8}
            />
          ))}
        </section>

        {loading && <p className='mt-6 text-center'>Loading...</p>}

        {!loading && hasMore && (
          <div className='mt-8 flex justify-center'>
            <button
              onClick={loadMore}
              className='px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition'
            >
              Завантажити ще
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
