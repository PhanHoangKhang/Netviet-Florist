import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <Link href="/" className="flex items-center gap-3">
                {/* Logo cục tròn lấy từ folder /public */}
                <img 
                    src="/logo.png" 
                    alt="Nét Việt Florist Logo" 
                    className="w-12 h-12 object-contain rounded-full"
                />
            </Link>
          <h4 className="text-xl font-bold text-[var(--color-primary)]">Nét Việt Florist</h4>
          <p className="text-sm text-gray-500 mt-2">Chuyên thiết kế hoa tươi sự kiện, sinh nhật, khai trương theo yêu cầu.</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">Liên hệ</h5>
          <p className="text-sm text-gray-600">Hotline 1: 0933 660 399</p>
          <p className="text-sm text-gray-600 mt-1">Hotline 2: 0982 31 0982</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">Hỗ trợ</h5>
          <p className="text-sm text-gray-600">Tư vấn chọn hoa qua Zalo 24/7</p>
          <p className="text-sm text-gray-600 mt-1">Giao hoa tận nơi nhanh chóng</p>
        </div>
      </div>
    </footer>
  );
}