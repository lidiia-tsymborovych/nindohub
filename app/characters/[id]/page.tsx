// app/characters/[id]/page.tsx
import { fetchCharacterById } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import { CharacterImage } from './components/CharacterImage';
import { DebutSection } from './components/DebutSection';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { FamilySection } from './components/FamilySection';
import { JutsuSection } from './components/JutsuSection';
import { NatureTypeSection } from './components/NatureTypeSection';
import { ToolsSection } from './components/ToolsSection';
import { VoiceActorSection } from './components/VoiceActorSection';

interface Props {
  params: {
    id: string;
  };
}

export default async function CharacterPage({ params }: Props) {
  const id = Number(params.id);
  const character = await fetchCharacterById(id);

  if (!character) {
    notFound();
  }

  return (
    <main className='max-w-5xl mx-auto p-6 md:p-12'>
      <h1 className='text-4xl md:text-5xl font-extrabold mb-10 text-center md:text-left text-gray-900'>
        {character.name}
      </h1>

      <div className='flex flex-col items-center gap-10'>
        <CharacterImage
          src={character.images?.[0] ?? '/fallback.png'}
          alt={character.name}
        />

        <section className='flex-1 space-y-8 max-w-150 w-full'>
          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)] rounded-lg shadow-md p-6 '>
            <DebutSection debut={character.debut} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <PersonalInfoSection character={character} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <FamilySection character={character} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <JutsuSection character={character} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <NatureTypeSection character={character} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <ToolsSection character={character} />
          </div>

          <div className='bg-white dark:bg-[#1f1f1f] dark:shadow-[0_0_10px_2px_rgba(255,137,4,0.4)]  rounded-lg shadow-md p-6'>
            <VoiceActorSection character={character} />
          </div>
        </section>
      </div>
    </main>
  );
}
