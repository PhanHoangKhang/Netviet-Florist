
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

const PLACEHOLDER = "/images/placeholder.jpg";

function CategoryImage({ category }: { category: FeaturedCategory }) {
  const [src, setSrc] = useState(
    category.image?.trim() || PLACEHOLDER,
  );

  useEffect(() => {
    setSrc(category.image?.trim() || PLACEHOLDER);
  }, [category.image]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-md">
      <Image
        src={src}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
        loading="lazy"
        onError={() => {
          if (src !== PLACEHOLDER) {
            setSrc(PLACEHOLDER);
          }
        }}
        className="object-cover"
      />
    </div>
  );
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<FeaturedCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(
            `Không thể tải danh mục: HTTP ${response.status}`,
          );
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setCategories(
            result.data.filter(
              (category: FeaturedCategory) =>
                category.slug && category.name,
            ),
          );
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("FETCH FEATURED CATEGORIES ERROR:", error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-8 text-center">
            <p className="text-sm text-[var(--color-primary-hover)]">
              Cửa hàng hoa tươi
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-main)]">
              Danh Mục Nổi Bật
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="mx-auto w-full max-w-[260px]">
                <div className="aspect-square animate-pulse bg-black/5" />
                <div className="mx-auto mt-3 h-5 w-2/3 animate-pulse bg-black/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm text-[var(--color-primary-hover)]">
            Cửa hàng hoa tươi
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-main)] sm:text-3xl">
            Danh Mục Nổi Bật
          </h2>

          <div className="mx-auto mt-3 h-0.5 w-12 bg-[var(--color-primary)]" />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 lg:gap-x-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/san-pham?category=${encodeURIComponent(category.slug)}`}
              className="group block text-center"
            >
              <CategoryImage category={category} />

              <h3 className="mt-3 text-base font-medium text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-primary)] sm:text-lg">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
