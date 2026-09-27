import Link from "next/link";

export const metadata = {
  title: "Chính sách bảo mật | Nét Việt Florist",
  description:
    "Chính sách bảo mật thông tin khách hàng của Nét Việt Florist. Tìm hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[var(--color-bg-light)]">
      {/* Header */}
      <section className="border-b border-[#e8dfdc] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Thông tin pháp lý
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-main)] sm:text-4xl">
            Chính sách bảo mật
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Nét Việt Florist tôn trọng quyền riêng tư và cam kết bảo vệ
            thông tin cá nhân của khách hàng trong quá trình sử dụng dịch vụ.
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Cập nhật lần cuối: 27/09/2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="space-y-10 text-sm leading-7 text-gray-600 sm:text-base">
          {/* 1 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              1. Thông tin chúng tôi thu thập
            </h2>

            <p>
              Khi khách hàng liên hệ hoặc đặt hoa với Nét Việt Florist, chúng
              tôi có thể thu thập một số thông tin cần thiết để hỗ trợ và xử
              lý yêu cầu, bao gồm:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Họ và tên.</li>
              <li>Số điện thoại.</li>
              <li>Địa chỉ giao hoa.</li>
              <li>Thông tin liên quan đến yêu cầu đặt hoa.</li>
              <li>Nội dung trao đổi khi khách hàng liên hệ với cửa hàng.</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              2. Mục đích sử dụng thông tin
            </h2>

            <p>
              Thông tin khách hàng được sử dụng nhằm phục vụ các mục đích
              chính sau:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Tư vấn và hỗ trợ khách hàng.</li>
              <li>Xác nhận và xử lý yêu cầu đặt hoa.</li>
              <li>Liên hệ để xác nhận thông tin giao hàng.</li>
              <li>Cải thiện chất lượng sản phẩm và dịch vụ.</li>
              <li>Giải quyết các vấn đề phát sinh liên quan đến đơn hàng.</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              3. Phạm vi sử dụng thông tin
            </h2>

            <p>
              Nét Việt Florist chỉ sử dụng thông tin khách hàng trong phạm vi
              cần thiết cho hoạt động tư vấn, xác nhận, chuẩn bị và giao hoa
              hoặc các mục đích đã được thông báo cho khách hàng.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              4. Bảo vệ thông tin khách hàng
            </h2>

            <p>
              Nét Việt Florist áp dụng các biện pháp phù hợp để hạn chế việc
              truy cập, sử dụng hoặc tiết lộ thông tin khách hàng trái phép.
              Thông tin chỉ được tiếp cận bởi những cá nhân cần thiết để thực
              hiện công việc liên quan.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              5. Chia sẻ thông tin với bên thứ ba
            </h2>

            <p>
              Nét Việt Florist không bán hoặc cho thuê thông tin cá nhân của
              khách hàng. Trong một số trường hợp cần thiết để hoàn thành
              dịch vụ, thông tin liên quan có thể được cung cấp cho đơn vị
              giao hàng hoặc đối tác thực hiện dịch vụ, trong phạm vi cần
              thiết.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              6. Liên kết đến bên thứ ba
            </h2>

            <p>
              Website có thể cung cấp liên kết đến các nền tảng bên ngoài như
              Zalo, Facebook hoặc Google Maps. Các nền tảng này có chính sách
              bảo mật riêng và Nét Việt Florist không chịu trách nhiệm đối với
              chính sách hoặc hoạt động xử lý dữ liệu của các bên thứ ba đó.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              7. Quyền của khách hàng
            </h2>

            <p>
              Khách hàng có thể yêu cầu kiểm tra, cập nhật hoặc chỉnh sửa
              thông tin cá nhân đã cung cấp cho Nét Việt Florist. Trong trường
              hợp cần hỗ trợ liên quan đến thông tin cá nhân, khách hàng có
              thể liên hệ trực tiếp với cửa hàng.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              8. Thông tin liên hệ
            </h2>

            <div className="border-l-2 border-[var(--color-primary)]/30 pl-5">
              <p>
                <span className="font-medium text-gray-700">
                  Nét Việt Florist
                </span>
              </p>
              <p>Địa chỉ: 275 Trần Hưng Đạo, Phan Thiết, Bình Thuận</p>
              <p>Hotline: 0933 660 399</p>
              <p>Hotline: 0982 31 0982</p>
              <p>Email: khanhuyen222811@gmail.com</p>
            </div>
          </div>
        </article>

        {/* Back */}
        <div className="mt-12 border-t border-[#e8dfdc] pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}