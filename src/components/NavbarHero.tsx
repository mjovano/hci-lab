import Link from 'next/link';

const Navbar = () => (
    <nav className="relative flex items-center justify-around -mt-2 -mx-2 h-12 md:h-16">
        <div className="bg-zinc-600 w-full md:w-1/2 flex md:rounded-2xl h-full md:h-2/3 items-center justify-between px-4 md:px-8 2xl:pl-28">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mx-2 size-6 md:hidden fill-amber-100">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>

            <span className="text-amber-100 font-primary md:hidden text-sm text-center mx-auto tracking-widest">
                Summit Supply
            </span>
           
            <div className="hidden md:flex xl:space-x-16 space-x-8 ml-8 text-xl font-secondary">
                <Link href="/shop" className="text-amber-100 hover:text-indigo-400">
                    Shop
                </Link>
                <Link href="/blog" className="text-amber-100 hover:text-indigo-400">
                    Blog
                </Link>
                <Link href="/about" className="text-amber-100 hover:text-indigo-400">
                    About us
                </Link>
                <Link href="/contact" className="text-amber-100 hover:text-indigo-400">
                    Contact
                </Link>
            </div>

            <div className="flex items-center space-x-8 mx-4">
                <span className="text-indigo-200 text-2xl mr-8"> 
                    |
                </span>

                {/* Needs to be more opaque when not logged in*/}
                <Link href="/login" className="fill-indigo-200 hover:fill-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"className="size-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </Link>

                <Link href="/cart" className="fill-indigo-200 hover:fill-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                </Link>

            </div>
        </div>

        
    </nav>
);

export default Navbar;