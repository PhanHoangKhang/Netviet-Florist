import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Logo & Giới thiệu */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Nét Việt Florist Logo" 
                className="w-10 h-10 object-contain rounded-full border border-gray-100"
              />
              <span className="text-xl font-bold text-[var(--color-primary)]">
                Nét Việt Florist
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Chuyên thiết kế hoa tươi sự kiện, sinh nhật, khai trương theo yêu cầu. Trao gửi cảm xúc trọn vẹn.
            </p>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-3 text-base">Liên hệ</h5>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Địa chỉ:</span> 275 Trần Hưng Đạo, Phan Thiết, Bình Thuận
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span> khanhuyen222811@gmail.com
              </p>
              <p>
                <span className="font-medium text-gray-700">Hotline 1:</span> 0933 660 399
              </p>
              <p>
                <span className="font-medium text-gray-700">Hotline 2:</span> 0982 31 0982
              </p>
            </div>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-3 text-base">Hỗ trợ</h5>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Tư vấn chọn hoa qua Zalo 24/7</p>
              <p>Giao hoa tận nơi nhanh chóng</p>
              <p>Miễn phí thiệp & banner chúc mừng</p>
            </div>
          </div>

          {/* Cột 4: Kênh kết nối (Chỉ để icon click trực tiếp) */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-3 text-base">Kết nối</h5>
            <div className="flex items-center gap-4">
              {/* Icon Facebook */}
              <a
                href="https://www.facebook.com/nguoilamhoa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-110"
                title="Fanpage Facebook"
              >
                <img 
                  src="/fb.png" 
                  alt="Facebook Fanpage" 
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* Icon Zalo */}
              
                 <a
                    href="https://zalo.me/0933660399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-110"
                    title="Chat Zalo Tư Vấn"
                  >
                    <img 
                      src="/zalo.png" 
                      alt="Zalo Fanpage" 
                      className="w-12 h-12 object-contain"
                    />
                  </a>
            </div>
          </div>

        </div>

        {/* Dòng Bản quyền dưới cùng */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} Nét Việt Florist. All rights reserved.</p>
          <p>Thiết kế dành riêng cho Nét Việt Florist</p>
        </div>
      </div>
    </footer>
  );
}