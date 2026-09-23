"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductSliderSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductSlider({
  title,
  subtitle,
  products,
}: ProductSliderSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>

            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all shadow-xs"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleScroll("right")}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all shadow-xs"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[220px] sm:w-[260px] lg:w-[280px] shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}