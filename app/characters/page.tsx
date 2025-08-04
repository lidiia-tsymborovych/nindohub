// app/characters/page.tsx
'use client'

import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';

export default function CharactersPage() {
  const { data: characters, loading, error } = useCharacters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
      {characters.map((char, index) => (
        <CharacterCard
          key={char.id}
          character={char}
          isPriority={index < 8}
        />
      ))}
    </section>
  );
}
