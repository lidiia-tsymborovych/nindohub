import { Character } from '@/app/types/character';

interface Props {
  character: Character;
}

function ensureArray<T>(data: T | T[] | undefined | null): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

export const VoiceActorSection= ({ character }: Props) => {
  if (!character?.voiceActors) {
    return null;
  }

const japaneseActors = ensureArray(character.voiceActors.japanese);
const englishActors = ensureArray(character.voiceActors.english);

return (
  <>
    {japaneseActors.length > 0 && (
      <>
        <h3 className='font-semibold'>Japanese:</h3>
        <ul className='list-disc list-inside'>
          {japaneseActors.map(actor => (
            <li key={actor}>{actor}</li>
          ))}
        </ul>
      </>
    )}
    {englishActors.length > 0 && (
      <>
        <h3 className='font-semibold'>English:</h3>
        <ul className='list-disc list-inside'>
          {englishActors.map(actor => (
            <li key={actor}>{actor}</li>
          ))}
        </ul>
      </>
    )}
  </>
);

};
