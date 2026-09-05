import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo cục tròn lấy từ folder /public */}
          <img 
            src="/logo.png" 
            alt="Nét Việt Florist Logo" 
            className="w-12 h-12 object-contain rounded-full"
          />
          <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
            Nét Việt <span className="text-[var(--color-secondary)] text-sm font-normal uppercase tracking-widest block">Florist</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link href="#" className="hover:text-[var(--color-primary)] transition">Trang chủ</Link>
          <Link href="#" className="hover:text-[var(--color-primary)] transition">Sản phẩm</Link>
          <Link href="/lien-he" className="hover:text-[var(--color-primary)] transition">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:0933660399"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            Hotline: 0933 660 399
          </a>
        </div>
      </div>
    </header>
  );
}