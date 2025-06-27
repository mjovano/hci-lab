import Navbar from "@/components/NavbarHero";
import Search from "@/components/SearchBar";
import DropdownMenu from "@/components/Dropdown";
import Carousel from "@/components/Carousel";
import { Suspense } from "react";

export default function Home() {

const boxTexts = [
  "Top of the line tools for foraging, cooking and campsite setup!",
  "Celebrate the season with 30% off all tents this Christmas!",
  "Gear up in style with our new exclusive clothing merchandise!",
];

  
  return (
    <main className="min-h-screen p-2">

      <div className="hidden xl:flex flex-col absolute z-50 ml-20 mt-30 p-3 items-center rounded-2xl backdrop-blur-sm">
          <span className="text-5xl font-primary text-amber-100/90 tracking-wider">Summit</span>
          <p className="text-4xl font-primary text-amber-100/80 tracking-widest">Supply</p>
      </div>

      <Navbar/>
      
      <div className="relative flex flex-row space-x-4 my-6 mx-auto items-center md:w-1/2">
        <div className="flex-1 p-4">
          <Suspense>
            <Search />
          </Suspense>
        </div>
        <div className="flex-1 p-4 hidden sm:block">
          <DropdownMenu />
        </div>
      </div>

      <Carousel
        urls={[
          "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Summer-Vacation-PNG/Tourist_Tent_PNG_Clip_Art_Image.png?m=1629816881",
          "https://www.summitjournal.com/cdn/shop/files/unisex-staple-t-shirt-burnt-orange-front-6555829a2a135.png",
          "https://png.pngtree.com/png-vector/20220612/ourmid/pngtree-set-of-camping-equipment-and-stuff-tent-png-image_4823043.png",
        ]}
      />


      <div className="flex justify-center mt-5">
        <div className="flex gap-4 w-4/5 md:w-3xl">
          {boxTexts.map((text, idx) => (
        <div
          key={idx}
          className={`flex flex-col justify-between rounded-2xl backdrop-blur-lg bg-white/30 shadow-xl md:w-1/3 aspect-square md:p-6 p-1 ${
            idx === boxTexts.length - 1 ? "hidden md:flex" : ""
          }`}
        >
          <div className="flex flex-1 items-center justify-center text-center text-xs md:text-lg font-semibold text-gray-800 mt-2">
            {text}
          </div>
          <a
            href="/shop"
            className="md:mt-4 mb bg-zinc-600 hover:bg-zinc-900 text-gray-300 font-bold py-2 rounded-2xl text-center transition-colors text-xs md:text-lg"
          >
            SHOP NOW
          </a>
        </div>
          ))}
        </div>
      </div>

      
      <div className="flex justify-center gap-20 mt-auto md:hidden fixed bottom-0 w-full pb-10">
        <a
          href="/about"
          className="text-zinc-900 font-secondary font-semibold"
        >
          About
        </a>
        <a
          href="/contact"
          className="text-zinc-900 font-secondary font-semibold"
        >
          Contact
        </a>
      </div>

    </main>
  );
}
