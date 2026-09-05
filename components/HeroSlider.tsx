'use client';

import { useState, useEffect } from 'react';

const BANNERS = [
  {
    id: 1,
    image: '/fig1.png',
    alt: 'Nét Việt Florist - Trao gửi yêu thương',
  },
  {
    id: 2,
    image: '/fig2.png',
    alt: 'Nét Việt Florist - Dịch vụ hoa tươi',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide sau mỗi 4 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? BANNERS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] overflow-hidden rounded-2xl shadow-md group bg-gray-50">
        
        {/* Container chứa hình ảnh trượt */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover sm:object-contain"
              />
            </div>
          ))}
        </div>

        {/* Nút Trái (Prev) */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous Slide"
        >
          ❮
        </button>

        {/* Nút Phải (Next) */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next Slide"
        >
          ❯
        </button>

        {/* Chấm tròn chỉ số Slide (Dots) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-7 bg-[var(--color-primary)]'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}