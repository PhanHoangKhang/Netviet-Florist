"use client";

import { useState, useEffect } from "react";

const BANNERS = [
  { id: 1, image: "/fig1.png", alt: "Nét Việt Florist 1" },
  { id: 2, image: "/fig2.png", alt: "Nét Việt Florist 2" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-sm bg-gray-100 group aspect-[2.2/1] sm:aspect-3.5/1">
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots chuyển slide */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-6 bg-[var(--color-primary)]"
                : "w-2 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
