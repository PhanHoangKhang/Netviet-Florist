type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-100 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--color-primary)] text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-sm font-medium text-[var(--color-secondary)] mt-1">Giá: Liên hệ</p>
        </div>

        <button
          onClick={() => onSelect(product)}
          className="mt-4 w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition"
        >
          Nhận tư vấn / Báo giá
        </button>
      </div>
    </div>
  );
}