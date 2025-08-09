import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-orange-500 p-6'>
      <h1 className='text-9xl font-extrabold mb-6'>404</h1>
      <p className='text-2xl mb-6'>
        Oops, looks like you got lost in the dark...
      </p>
      <div className='mb-6 animate-pulse text-6xl'>💀🔥</div>
      <Link
        href='/'
        className='px-6 py-3 border-2 border-orange-500 rounded hover:bg-orange-500 hover:text-black transition'
      >
        Go back home
      </Link>
    </div>
  );
}
