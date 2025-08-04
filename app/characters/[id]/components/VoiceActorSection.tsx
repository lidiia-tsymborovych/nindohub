import { Character } from '@/app/types/character';

interface Props {
  character: Character;
}

export const VoiceActorSection= ({ character }: Props) => {
  if (!character?.voiceActors) {
    return null;
  }

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Voice actors</h2>
      {character.voiceActors.japanese && (
        <>
          <h3 className='font-semibold'>Japanese:</h3>
          <ul className='list-disc list-inside'>
            {character.voiceActors.japanese.map(actor => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
        </>
      )}
      {character.voiceActors.english && (
        <>
          <h3 className='font-semibold'>English:</h3>
          <ul className='list-disc list-inside'>
            {character.voiceActors.english.map(actor => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
