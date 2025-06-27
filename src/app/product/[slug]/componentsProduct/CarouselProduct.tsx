"use client";
import React, { useState, useEffect, use } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/firebaseConfig";
import ProductDetails from "./ProductDetails";

export default function CarouselProduct({ slug }: { slug: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flag, setFlag] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [itemName, setItemName] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const fetchedImages = await fetchItemImages(slug);
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        const fetchName = async () => {
            try {
                const name = await fetchItemName(slug);
                setItemName(name);
            } catch (error) {
                console.error("Error fetching item name:", error);
            }
        };

        fetchImages();
        fetchName();
    }, [slug]);

    

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (!flag) {
        return (
            <div className="relative w-full h-full md:h-3/4 mx-auto flex flex-col items-center">

                <div className="relative w-full md:h-4/5 h-2/5 aspect-square bg-gray-300/50 flex items-center justify-center rounded-lg">
                    <img
                        src={images[currentIndex]}
                        alt={`Product image ${currentIndex + 1}`}
                        className="md:max-w-full w-2/3 h-3/4 object-contain"
                    />
                    
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-700/80 border-none rounded-xl w-6 flex items-center justify-center text-xl z-10 shadow hover:bg-zinc-800 transition py-3 text-amber-100"
                                type="button"
                            >
                                &#10094;
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-700/80 border-none rounded-xl w-6 flex items-center justify-center text-xl z-10 shadow hover:bg-zinc-800 transition py-3 text-amber-100"
                            >
                                &#10095;
                            </button>
                        </>
                    )}
                </div>
                

                <div
                    className={`flex items-center w-full md:mt-8 mt-2 md:px-12 px-4 py-1 gap-2 rounded-xl bg-gray-300/50 ${
                        images.length < 4 ? "justify-around" : "justify-between"
                    }`}
                >
                    {images.slice(0, 4).map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`rounded-md bg-none cursor-pointer outline-none w-15 h-15 overflow-hidden transition border-2 ${
                                currentIndex === idx
                                    ? "ring-1 ring-amber-100 border-zinc-700"
                                    : "border-transparent"
                            }`}
                            type="button"
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`w-full h-full object-cover rounded-md transition-opacity ${
                                    currentIndex === idx ? "opacity-100" : "opacity-80"
                                }`}
                            />
                        </button>
                    ))}
                </div>

                
                <span className="font-bold text-2xl text-gray-800 mt-8 p-1 md:hidden font-primary tracking-wider"> {itemName} </span>
                <hr className="bg-gradient-to-r from-indigo-800 border-transparent p-0.5 backdrop-blur-xs w-full md:hidden"/>

                <div className="w-full md:mt-30 mt-15">
                    <a
                        href="/blog"
                        className="block w-full py-2 bg-zinc-600 text-amber-100 text-center rounded-lg font-semibold md:text-lg shadow hover:bg-zinc-800"
                    >
                        Share your thoughts on this product!
                    </a>
                </div>

                <div className="relative bottom-1 md:hidden flex justify-center mt-10">
                            <button
                                onClick={() => setFlag(true)}
                                className="bg-zinc-600/80 hover:bg-zinc-800 rounded-full text-amber-100 shadow px-12"
                                type="button"
                            >
                                &#11167;
                            </button>
                </div>

            </div>
        );
}

else {
    return (
        <div className="relative w-full md:h-3/4 mx-auto flex flex-col items-center">
            <button
                onClick={() => setFlag(false)}
                className="bg-zinc-600/80 hover:bg-zinc-800 rounded-full text-amber-100 shadow px-12 mb-4"
                type="button"
            >
                &#11165;
            </button>

            <ProductDetails id={slug} />

        </div>
    );
}
}

export async function fetchItemImages(itemId: string): Promise<string[]> {
    const imagesRef = ref(db, `items/${itemId}/images`);
    const snapshot = await get(imagesRef);

    if (!snapshot.exists()) {
        return [];
    }

    const imagesObj = snapshot.val();
    return Object.values(imagesObj);
}

export async function fetchItemName(itemId: string): Promise<string | null> {
    const itemRef = ref(db, `items/${itemId}/name`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.val();
}
