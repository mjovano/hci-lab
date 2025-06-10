'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-2 relative">

      <div className="hidden md:block absolute z-50 pl-20 pt-30">
      <span className="text-lg font-semibold">Summit Supply</span>
      </div>

      <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: "url('/img/light.png')",
        backgroundSize: '100%',
        backgroundPosition: 'center',
        opacity: 0.8,
        pointerEvents: 'none',
      }}
      />
      
      <div className="relative z-10 w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg">This is a simple Next.js application.</p>
      <div className="mt-8">
        <a
        href="https://nextjs.org/docs"
        className="text-blue-600 hover:underline"
        >
        Learn more about Next.js
        </a>
      </div>
      </div>
    </main>
  );
}
