'use client';

import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const navLinks = [
  { href: '/characters', label: 'Characters' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-xl bg-white/60 dark:bg-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.1)] border-b border-transparent transition-all'>
      <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16 text-[var(--color-text)]'>
        <Link
          href='/'
          className='font-bold text-xl tracking-wider text-[var(--color-accent)] drop-shadow-glow transition hover:brightness-125 hover:scale-106 duration-300 ease-in-out'
        >
          <span className='hidden sm:block'>NindoHub</span>

          {/* Картинка видна тільки на мобілках */}
          <div className='block sm:hidden relative w-14 h-14'>
            <Image
              src='/leaf-symbol.png'
              alt='Leaf symbol'
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </Link>

        <nav className='flex items-center gap-6 font-medium'>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'relative after:content-[""] after:absolute after:w-full after:h-[2px] after:bottom-[-2px] after:left-0 after:bg-[var(--color-accent)] after:origin-left after:transition-transform after:duration-500 after:ease-in-out hover:text-[var(--color-accent)] transition-colors duration-500 ease-in-out',
                pathname === href
                  ? 'after:scale-x-100 text-[var(--color-accent)]'
                  : 'after:scale-x-0'
              )}
            >
              {label}
            </Link>
          ))}

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
