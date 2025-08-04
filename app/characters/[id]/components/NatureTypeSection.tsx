import { Character } from '@/app/types/character';

interface Props {
  character: Character;
}

export const NatureTypeSection = ({ character }: Props) => {
  if (!character?.natureType || !character?.natureType.length) {
    return null;
  }

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Nature Types</h2>
      <ul className='list-disc list-inside'>
        {character.natureType.map(type => (
          <li key={type}>{type}</li>
        ))}
      </ul>
    </section>
  );
};
