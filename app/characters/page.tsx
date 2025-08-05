'use client';

import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';

export default function CharactersPage() {
  const { characters, loading, error, loadMore, hasMore } = useCharacters();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className='p-4'>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
  );
}
