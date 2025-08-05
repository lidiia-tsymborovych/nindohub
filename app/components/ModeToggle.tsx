'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant='outline'
      aria-label='Toggle theme'
      className='border-amber-400 dark:border-yellow-200 bg-white dark:bg-black/20 cursor-pointer hover:bg-amber-50 dark:hover:bg-white/10'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <Moon className='w-6 h-6 text-yellow-200' />
      ) : (
        <Sun className='w-6 h-6 text-yellow-400' />
      )}
    </Button>
  );
}
