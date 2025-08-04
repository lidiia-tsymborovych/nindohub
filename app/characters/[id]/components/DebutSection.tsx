// app/characters/[id]/components/DebutSection.tsx
interface Props {
  debut?: {
    manga?: string;
    anime?: string;
    novel?: string;
    movie?: string;
    game?: string;
    ova?: string;
    appearsIn?: string;
  };
}

export const DebutSection = ({ debut }: Props) => {
  if (!debut) return null;

  return (
    <section className='mb-6'>
      <h2 className='text-2xl font-semibold mb-2'>Debut</h2>
      <ul className='list-disc list-inside'>
        {debut.manga && <li>Manga: {debut.manga}</li>}
        {debut.anime && <li>Anime: {debut.anime}</li>}
        {debut.novel && <li>Novel: {debut.novel}</li>}
        {debut.movie && <li>Movie: {debut.movie}</li>}
        {debut.game && <li>Game: {debut.game}</li>}
        {debut.ova && <li>OVA: {debut.ova}</li>}
        {debut.appearsIn && <li>Appears In: {debut.appearsIn}</li>}
      </ul>
    </section>
  );
}
