import { Character } from '@/app/types/character';

interface Props {
  character: Character;
}

export const JutsuSection = ({ character }: Props) => {
  if (!character?.jutsu || !character?.jutsu.length) {
    return null;
  }

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Jutsu</h2>
      <ul className='list-disc list-inside'>
        {character.jutsu.map(jutsu => (
          <li key={jutsu}>{jutsu}</li>
        ))}
      </ul>
    </section>
  );
};
