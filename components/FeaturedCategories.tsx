
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FeaturedCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

const PLACEHOLDER = "/flower-placeholder.png";

function CategoryImage({
  category,
}: {
  category: FeaturedCategory;
}) {
  const [src, setSrc] = useState(
    category.image?.trim() || PLACEHOLDER,
  );

  useEffect(() => {
    setSrc(category.image?.trim() || PLACEHOLDER);
  }, [category.image]);

  return (
    <div className="relative mx-auto aspect-square w-24 shrink-0 overflow-hidden rounded-full bg-white shadow-[1px_2px_3px_rgba(0,0,0,0.25)] sm:w-28 md:w-32">
      <img
        src={src}
        alt={category.name}
        loading="lazy"
        onError={() => {
          if (src !== PLACEHOLDER) {
            setSrc(PLACEHOLDER);
          }
        }}
        className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<
    FeaturedCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "/api/feature-categories",
          {
            signal: controller.signal,
            cache: "force-cache",
          },
        );

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
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "FETCH FEATURED CATEGORIES ERROR:",
          error,
        );
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

            <div className="mx-auto mt-3 h-0.5 w-12 bg-[var(--color-primary)]" />
          </div>

          <div className="-mx-4 overflow-hidden px-4 pb-4 sm:mx-0 sm:px-0">
            <div className="flex gap-5 sm:gap-6 lg:gap-7">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-24 shrink-0 flex-col items-center sm:w-28 md:w-32"
                >
                  <div className="aspect-square w-full animate-pulse rounded-full bg-black/5" />
                  <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-black/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Section heading */}
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm text-[var(--color-primary-hover)]">
            Cửa hàng hoa tươi
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-main)] sm:text-3xl">
            Danh Mục Nổi Bật
          </h2>

          <div className="mx-auto mt-3 h-0.5 w-12 bg-[var(--color-primary)]" />
        </div>

        {/* Categories: one horizontal row */}
        <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          <div className="flex items-start justify-start gap-5 sm:justify-center sm:gap-6 lg:gap-7">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/san-pham?category=${encodeURIComponent(category.slug)}`}
                className="group flex w-24 shrink-0 flex-col items-center text-center sm:w-28 md:w-32"
              >
                <CategoryImage category={category} />

                <h3 className="mt-3 w-full text-xs font-medium leading-5 text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-primary)] sm:text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
