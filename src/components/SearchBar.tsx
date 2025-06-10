'use client';

import { useSearchParams } from 'next/navigation';
export default function Search() {
  const searchParams = useSearchParams();

  return (
    <form action="/search" className="flex items-center justify-center w-full">
      <input
        type="text"
        name="q"
        placeholder="Search..."
        className="w-full max-w-md p-2 border border-gray-300 rounded"
        defaultValue={searchParams?.get('q') || ''}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}



