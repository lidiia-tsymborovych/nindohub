// components/LoadingButton.tsx
'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({
  loading,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex justify-center items-center gap-2 h-10 w-full rounded-md transition bg-[#1f1f1f] dark:bg-[var(--color-accent)] text-white hover:bg-[#1f1f1f]/80 cursor-pointer dark:hover:bg-amber-600 duration-300 ease-in-out ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-black hover:bg-gray-800 text-white'
      }`}
    >
      {loading && <Loader2 className='w-4 h-4 animate-spin' />}
      {children}
    </button>
  );
}
