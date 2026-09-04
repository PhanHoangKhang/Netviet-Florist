'use client';

import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'trai-cay', name: 'Trái cây' },
  { id: 'hoa-cuoi', name: 'Hoa cưới' },
  { id: 'lan-ho-diep', name: 'Lan hồ điệp' },
  { id: 'hoa-chuc-mung', name: 'Hoa chúc mừng' },
  { id: 'hoa-gio', name: 'Hoa giỏ' },
  { id: 'hoa-bo', name: 'Hoa bó' },
  { id: 'flower-daily', name: 'Flower daily' },
];

export default function Category() {
  const router = useRouter();

  const handleCategoryClick = (id: string) => {
    // Chuyển hướng người dùng sang trang sản phẩm kèm query parameter
    if (id === 'all') {
      router.push('/san-pham');
    } else {
      router.push(`/san-pham?category=${id}`);
    }
  };

  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-start md:justify-center gap-1 sm:gap-6 overflow-x-auto scrollbar-none py-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="px-3 py-3 text-sm sm:text-base font-semibold whitespace-nowrap text-gray-600 hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}