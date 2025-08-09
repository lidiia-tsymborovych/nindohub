import Image from 'next/image';

const TECH = [
  { name: 'Next.js 15' },
  { name: 'React 18' },
  { name: 'Tailwind CSS' },
  { name: 'TypeScript' },
  { name: 'Shadcn UI' },
  { name: 'Dattebayo API' },
];

const RESOURCES = [
  {
    name: 'FreeCodeCamp Tutorial',
    link: 'https://www.freecodecamp.org/news/react-js-project-build-a-rick-and-morty-character-wiki/',
    desc: 'Base project structure',
  },
  {
    name: 'Dattebayo API',
    link: 'https://api-dattebayo.vercel.app/',
    desc: 'Naruto data',
  },
  { name: 'Tailwind CSS Docs', link: 'https://tailwindcss.com/docs' },
  { name: 'Shadcn UI Docs', link: 'https://ui.shadcn.com/' },
  { name: 'Next.js Docs', link: 'https://nextjs.org/docs' },
];

export default function AboutPage() {
  return (
    <main className='max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-12'>
      {/* Hero */}
      <section className='text-center'>
        <h1 className='text-5xl font-bold tracking-tight flex flex-col items-center gap-3'>
          <div className='flex items-center gap-2'>About NindoHub</div>
          <a
            href='https://www.freecodecamp.org/news/react-js-project-build-a-rick-and-morty-character-wiki/'
            target='_blank'
            rel='noopener noreferrer'
            tabIndex={0}
            className='inline-block mt-2 px-5 py-2 bg-[var(--color-accent)] text-white rounded-lg text-sm font-semibold shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition'
          >
            View Original Tutorial
          </a>
        </h1>
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          Turned a FreeCodeCamp tutorial into a custom, ninja-themed practice
          app — swapped API, redesigned UI, and added features just for the
          vibe.
        </p>
      </section>

      {/* How it started */}
      <section>
        <h2 className='text-2xl font-semibold mb-3 flex items-center gap-2'>
          <Image
            src='/maki.png'
            alt='naruto maki'
            width={32}
            height={32}
            className='object-contain'
          />
          How it started
        </h2>
        <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
          NindoHub began as a learning task for <strong>Next.js 15</strong>. The
          original tutorial used the Rick &amp; Morty API, but I swapped that
          for the{' '}
          <a
            href='https://api-dattebayo.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[var(--color-accent)] underline'
          >
            Dattebayo API
          </a>{' '}
          (Naruto characters) and rebuilt the UI to match a ninja theme. The
          goal was practice — explore routing, dynamic pages, styling, and a
          couple UX features — not to copy the tutorial verbatim.
        </p>
      </section>

      {/* Tech stack */}
      <section>
        <h2 className='text-2xl font-semibold mb-3 flex items-center gap-2'>
          <Image
            src='/maki.png'
            alt='naruto maki'
            width={32}
            height={32}
            className='object-contain'
          />
          Tech stack
        </h2>
        <ul className='flex flex-wrap gap-3'>
          {TECH.map(t => (
            <li
              key={t.name}
              className='px-3 py-2 bg-white dark:bg-gray-700 rounded shadow-sm text-sm'
            >
              {t.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Features */}
      <section>
        <h2 className='text-2xl font-semibold mb-3 flex items-center gap-2'>
          <Image
            src='/maki.png'
            alt='naruto maki'
            width={32}
            height={32}
            className='object-contain'
          />
          Features
        </h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300'>
          <li>Dynamic character pages (SSG/SSR patterns)</li>
          <li>Filtering, search and pagination</li>
          <li>Responsive layout + accessible components</li>
          <li>Light/dark UI and micro-interactions</li>
        </ul>
      </section>

      {/* Resources */}
      <section>
        <h2 className='text-2xl font-semibold mb-3 flex items-center gap-2'>
          <Image
            src='/maki.png'
            alt='naruto maki'
            width={32}
            height={32}
            className='object-contain'
          />
          Resources
        </h2>
        <ul className='list-disc list-inside space-y-2 text-[var(--color-accent)]'>
          {RESOURCES.map(r => (
            <li key={r.name}>
              <a
                href={r.link}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {r.name}
              </a>
              {r.desc ? (
                <span className='text-gray-500 dark:text-gray-400 ml-1'>
                  {' '}
                  — {r.desc}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
