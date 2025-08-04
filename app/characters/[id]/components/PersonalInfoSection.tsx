import { Character } from "@/app/types/character";

type Props = {
  character: Character;
}

export const PersonalInfoSection = ({character} : Props) => {
  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Personal Information</h2>
      <ul className='list-disc list-inside'>
        {character.personal?.birthdate && (
          <li>Birth date: {character.personal.birthdate}</li>
        )}
        {character.personal?.sex && <li>Sex: {character.personal.sex}</li>}
        {character.personal?.age && (
          <li>
            Age:
            <ul className='list-disc list-inside ml-6'>
              {character.personal.age['Part I'] && (
                <li>Part I: {character.personal.age['Part I']}</li>
              )}
              {character.personal.age['Part II'] && (
                <li>Part II: {character.personal.age['Part II']}</li>
              )}
              {character.personal.age['Academy Graduate'] && (
                <li>
                  Academy Graduate: {character.personal.age['Academy Graduate']}
                </li>
              )}
            </ul>
          </li>
        )}
        {character.personal?.height && (
          <li>
            Height:
            <ul className='list-disc list-inside ml-6'>
              {character.personal.height['Part I'] && (
                <li>Part I: {character.personal.height['Part I']}</li>
              )}
              {character.personal.height['Part II'] && (
                <li>Part II: {character.personal.height['Part II']}</li>
              )}
              {character.personal.height['Blank Period'] && (
                <li>
                  Blank Period: {character.personal.height['Blank Period']}
                </li>
              )}
            </ul>
          </li>
        )}
        {character.personal?.weight && (
          <li>
            Weight:
            <ul className='list-disc list-inside ml-6'>
              {character.personal.weight['Part I'] && (
                <li>Part I: {character.personal.weight['Part I']}</li>
              )}
              {character.personal.weight['Part II'] && (
                <li>Part II: {character.personal.weight['Part II']}</li>
              )}
            </ul>
          </li>
        )}
        {character.personal?.bloodType && (
          <li>Blood Type: {character.personal.bloodType}</li>
        )}
        {character.personal?.clan && <li>Clan: {character.personal.clan}</li>}
        {character.personal?.occupation && (
          <li>
            Occupation:
            {Array.isArray(character.personal.occupation) ? (
              <ul className='list-disc list-inside ml-6'>
                {character.personal.occupation.map(occ => (
                  <li key={occ}>{occ}</li>
                ))}
              </ul>
            ) : (
              <p>{character.personal.occupation}</p>
            )}
          </li>
        )}
      </ul>
    </section>
  );
}