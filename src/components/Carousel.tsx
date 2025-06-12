"use client";

import Image from "next/image";
import { useState } from "react";

type CarouselProps = {
  urls: string[];
};

export default function Carousel({ urls }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full md:w-3xl h-64 md:h-82 rounded-4xl mx-3xl mx-auto overflow-hidden shadow-lg backdrop-blur-xs">
      <div className="relative w-full h-full items-center justify-around">
        <Image
          src={urls[currentIndex]}
          alt={`Slide ${currentIndex}`}
          layout="fill"
          objectFit="contain"
          sizes=""
          className="max-h-1/2 m-auto"
        />
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-600 opacity-50 rounded-full p-2 hover:opacity-90 focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-600 opacity-50 rounded-full p-2 hover:opacity-90 focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
}
