import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const productImage =
    product.images?.[0] || "/images/placeholder.jpg";

  return (
    <div className="group flex flex-col overflow-hidden border border-[#EAE5DE] bg-white transition-shadow duration-300 hover:shadow-[0_5px_18px_rgba(50,35,20,0.07)]">
      {/* Product Image */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-[#F5F2EE]">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Category */}
          {product.categoryId?.name && (
            <span className="absolute left-3 top-3 border border-[#EAE5DE] bg-white/95 px-2.5 py-1 text-xs font-medium text-[#655448]">
              {product.categoryId.name}
            </span>
          )}

          {/* Featured */}
          {product.isFeatured && (
            <span className="absolute right-3 top-3 border border-white/70 bg-[#4D0D01]/90 px-2.5 py-1 text-xs font-medium text-white">
              Nổi bật
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <Link
            href={`/san-pham/${product.slug}`}
            className="block transition-colors hover:text-[var(--color-primary)]"
          >
            <h3 className="line-clamp-1 text-base font-semibold text-[#332D28]">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
            Liên hệ báo giá
          </p>
        </div>

        {/* Action */}
        <div className="mt-4">
          <Link
            href={`/san-pham/${product.slug}#dat-hoa`}
            className="flex w-full items-center justify-center border border-[#D8C7B8] px-3 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors duration-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          >
            Nhận tư vấn / Báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}