// app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className='p-6'>
      <h1 className='text-4xl font-bold font-alt mb-4'>Welcome to NindoHub</h1>
      <p className='font-sans text-lg'>
        Explore Naruto characters and their stories.
      </p>

      <Link
        href='/characters'
        className='mt-4 inline-block text-blue-500 underline'
      >
        View Characters
      </Link>
    </main>
  );
}
