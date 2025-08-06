'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterDialogContent } from './FilterDialogContent';

export function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className='w-24 h-9 bg-[#1f1f1f] dark:bg-[var(--color-accent)] text-white rounded-md hover:bg-[#1f1f1f]/80 transition cursor-pointer dark:hover:bg-amber-600 duration-300 ease-in-out'>
        Filters
      </SheetTrigger>
      <SheetContent side='left' className='w-80 bg-white'>
        <SheetTitle className='sr-only'>Character&apos;s Filters</SheetTitle>{' '}
        <FilterDialogContent />
      </SheetContent>
    </Sheet>
  );
}
