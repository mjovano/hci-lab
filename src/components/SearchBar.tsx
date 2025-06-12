'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

interface SearchProps {
  showButton?: number;
}

export default function Search( { showButton }: SearchProps) {
  const searchParams = useSearchParams();

  return (
    <form action="/shop" className="flex items-center justify-center w-full">
      <input
        type="text"
        name="q"
        placeholder="Search..."
        className="w-full max-w-md p-2 border border-gray-700 bg-amber-100/80 rounded-xl"
        defaultValue={searchParams?.get('q') || ''}
      />
      <button
        type="submit"
        className={`ml-2 px-4 py-2 bg-zinc-700 rounded-2xl hover:bg-zinc-900 ${showButton === 0 ? 'hidden' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}



