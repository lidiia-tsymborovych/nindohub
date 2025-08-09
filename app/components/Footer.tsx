import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='w-full mt-auto backdrop-blur-xl bg-white/60 dark:bg-white/10 shadow-inner border-t border-transparent transition-all'>
      <div className='max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-text)]'>
        <span className='mb-2 md:mb-0 opacity-80'>
          © 2025 Lidiia | For learning purpose
        </span>
        <div className='flex items-center gap-4'>
          <Link
            href='https://api-dattebayo.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-[var(--color-accent)] transition-colors duration-300 ease-in-out'
          >
            Dattebayo API
          </Link>
          <Link
            href='https://github.com/lidiia-tsymborovych'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-[var(--color-accent)] transition-colors duration-300 ease-in-out'
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};
