import Link from 'next/link';
import { fetchCharacters } from './lib/api';
import { Character } from './types/character';
import CoolInfiniteSlider from './components/HeroSectionSlider';

async function checkImage(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}


export default async function Home() {
  const randomPage = Math.floor(Math.random() * 3) + 1;
  const data = await fetchCharacters({ page: randomPage, pageSize: 20 });
  const characters: Character[] = data.characters;

const slides = await Promise.all(
  characters
    .filter(char => char.images[0])
    .map(async char => {
      const url = char.images[0];
      const isValid = await checkImage(url);
      return isValid ? { id: char.id, url } : null;
    })
);
  
const validSlides = slides.filter(Boolean) as { id: number; url: string }[];

  return (
    <main className='relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-10 py-8'>
      <div className='z-10 text-center max-w-2xl sm:mb-8 md:mb-0'>
        <h1 className='flex flex-wrap justify-center text-5xl md:text-6xl text-black dark:text-white font-extrabold font-alt mb-4 drop-shadow-xl'>
          Welcome to
          <span className='pl-3 text-[var(--color-accent)]'>NindoHub</span>
        </h1>

        <p className='text-md md:text-xl mb-8 leading-relaxed drop-shadow-xl'>
          Dive into the world of shinobi. Discover Naruto characters, their
          stories, powers, and legacy.
        </p>

        <Link
          href='/characters'
          className='inline-block px-6 py-3 rounded-lg text-lg font-semibold bg-[var(--color-accent)] text-white transition duration-300 ease-in-out transform hover:bg-amber-500 dark:hover:bg-amber-600 hover:scale-105 hover:shadow-[0_8px_10px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.6)]'
        >
          Enter the Shinobi World
        </Link>
      </div>

      <div className='mt-10 w-full max-w-6xl z-10'>
        <CoolInfiniteSlider slides={validSlides} />
      </div>
    </main>
  );
}
