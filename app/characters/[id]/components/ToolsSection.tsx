import { Character } from '@/app/types/character';

interface Props {
  character: Character;
}

export const ToolsSection = ({ character }: Props) => {
  if (!character?.tools || !character?.tools.length) {
    return null;
  }

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Tools</h2>
      <ul className='list-disc list-inside'>
        {character.tools.map(tool => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </section>
  );
};
