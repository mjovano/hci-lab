import Navbar from "@/components/NavbarShop";
import Results from "./components/Results";
import Sidebar from "./components/Sidebar";


export default function Shop() {
    return (
        
        <main className="flex flex-col max-h-full md:px-28">


            <div className="md:-mx-28 mb-4">
                <Navbar />
            </div>

            {/* Change to component later*/}
            <div className="hidden md:flex flex-col w-full items-start my-4 backdrop-blur-md pt-2">
            <div className="flex w-full space-x-14 mx-8">
                {["Home", "Products", "Deals", "About", "Contact"].map((word) => (
                <button
                    key={word}
                    className="text-zinc-700 hover:text-zinc-900 transition-colors"
                    type="button"
                >
                    {word}
                </button>
                ))}
            </div>
            <hr className="w-full border-zinc-900 mt-2" />
            </div>


            <div className="flex w-full min-h-screen gap-4 pb-20 md:pb-50">

                <div className="hidden md:block w-1/6 bg-white/10 rounded-lg backdrop-blur-xl p-4 overflow-auto">
                <Sidebar/>        
                </div>

                <div className="flex flex-col flex-1">
                    <div className="h-14 mb-2">
                        <Results count={100000000}/>
                    </div>
                    <div className="flex-1 backdrop-blur-xs bg-amber-700/10 rounded-3xl mx-2">
                            {/* product cards component*/}
                    </div>
                </div>

            </div>

            
        </main>
    );
}