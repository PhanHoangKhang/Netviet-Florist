import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/90 backdrop-blur-md border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Điều chỉnh grid: Cột 4 chiếm rộng hơn (lg:col-span-2) trên màn hình lớn nếu cần, hoặc giữ 4 cột cân đối */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Logo & Giới thiệu */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Nét Việt Florist Logo" 
                className="w-10 h-10 object-contain rounded-full border border-gray-100"
              />
              <span className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                Nét Việt <span className="text-[var(--color-secondary)] text-xs font-semibold uppercase tracking-widest block">Florist</span>
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

          {/* Cột 3: Hỗ trợ & Bản đồ Google Maps */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3 text-base">Hỗ trợ & Vị trí</h5>
              <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                <p>• Tư vấn chọn hoa qua Zalo 24/7</p>
                <p>• Giao hoa tận nơi nhanh chóng</p>
                <p>• Miễn phí thiệp & banner chúc mừng</p>
              </div>
            </div>

            {/* Khung Google Maps nhỏ gọn */}
            <div className="w-full h-32 rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <iframe
                title="Địa chỉ Nét Việt Florist"
                src="https://maps.google.com/maps?q=N%C3%A9t%20Vi%E1%BB%87t%20Florist%2C%20275%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Phan%20Thi%E1%BA%BFt&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Cột 4: Kênh kết nối (Fanpage Iframe & Zalo) */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-3 text-base">Kết nối với chúng tôi</h5>
            <div className="space-y-3">
              {/* Facebook Fanpage Card */}
              <div className="w-full max-w-[340px] overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnguoilamhoa%2F&tabs=&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"
                  width="100%"
                  height="130"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Page Plugin"
                ></iframe>
              </div>

              {/* Nút Zalo đi kèm bên dưới card Facebook */}
              <a
                href="https://zalo.me/0933660399"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full max-w-[340px] py-2 px-4 bg-[#0088FF]/10 hover:bg-[#0088FF]/20 text-[#0088FF] rounded-lg transition-colors font-medium text-sm border border-[#0088FF]/30"
                title="Chat Zalo Tư Vấn"
              >
                <img src="/zalo.png" alt="Zalo Logo" className="w-5 h-5 object-contain" />
                <span>Chat Zalo Tư Vấn Trực Tiếp</span>
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