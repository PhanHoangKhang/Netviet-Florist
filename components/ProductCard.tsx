import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
}: ProductCardProps) {
  const productImage =
    product.images?.[0] || "/images/placeholder.jpg";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-100 flex flex-col">
      {/* Product Image */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Category */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--color-primary)] text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.categoryId?.name}
          </span>

          {/* Featured */}
          {product.isFeatured && (
            <span className="absolute top-3 right-3 bg-[var(--color-secondary)] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Nổi bật
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link
            href={`/san-pham/${product.slug}`}
            className="block hover:text-[var(--color-primary)] transition-colors"
          >
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm font-medium text-[var(--color-secondary)] mt-1">
            Giá: Liên hệ
          </p>
        </div>

        {/* Action */}
        <div className="mt-4 space-y-2">
          <Link
            href={`/san-pham/${product.slug}#dat-hoa`}
            className="block w-full py-2.5 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] text-center font-medium hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            Nhận tư vấn / Báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}