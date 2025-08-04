import { Character } from "@/app/types/character";

interface Props {
  character: Character;
}

export const FamilySection = ({ character }: Props) => {
    if (!character || !character?.family) {
      return null;
    }

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Family</h2>
      <ul className='list-disc list-inside'>
        {character.family.father && <li> Father: {character.family.father}</li>}
        {character.family.mother && <li>Mother: {character.family.mother}</li>}
        {character.family.son && <li>Son: {character.family.son}</li>}
        {character.family.daughter && (
          <li>Daughter: {character.family.daughter}</li>
        )}
        {character.family.wife && <li>Wife: {character.family.wife}</li>}
        {character.family['adoptive son'] && (
          <li>Adoptive son: {character.family['adoptive son']}</li>
        )}
        {character.family.godfather && (
          <li>Godfather: {character.family.godfather}</li>
        )}
      </ul>
    </section>
  );
}