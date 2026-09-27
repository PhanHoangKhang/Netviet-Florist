import Link from "next/link";

export const metadata = {
  title: "Điều khoản sử dụng | Nét Việt Florist",
  description:
    "Điều khoản sử dụng website Nét Việt Florist và các quy định liên quan đến việc tham khảo sản phẩm, liên hệ, đặt hoa và sử dụng dịch vụ.",
};

export default function TermsPage() {
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
            Điều khoản sử dụng
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Các điều khoản dưới đây quy định việc sử dụng website và các
            thông tin, dịch vụ được cung cấp bởi Nét Việt Florist.
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
              1. Chấp nhận điều khoản
            </h2>

            <p>
              Khi truy cập và sử dụng website Nét Việt Florist, bạn được xem
              như đã đọc, hiểu và đồng ý tuân thủ các điều khoản được nêu
              trong trang này. Nếu không đồng ý với các điều khoản, vui lòng
              không tiếp tục sử dụng website.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              2. Thông tin sản phẩm
            </h2>

            <p>
              Nét Việt Florist cố gắng cung cấp thông tin và hình ảnh sản phẩm
              một cách chính xác nhất. Tuy nhiên, do hoa tươi là sản phẩm tự
              nhiên, màu sắc, kích thước, loại hoa hoặc cách sắp xếp thực tế
              có thể có sự khác biệt nhất định so với hình ảnh tham khảo trên
              website.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              3. Giá sản phẩm
            </h2>

            <p>
              Giá của các thiết kế hoa có thể thay đổi tùy theo loại hoa, kích
              thước, số lượng, thời điểm đặt hàng và yêu cầu riêng của khách
              hàng. Sản phẩm sẽ được hiển thị dưới dạng
              <span className="font-medium text-gray-700">
                {" "}
                "Liên hệ báo giá"
              </span>{" "}
              để cửa hàng có thể tư vấn mức giá phù hợp với yêu cầu cụ thể.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              4. Đặt hoa và xác nhận đơn hàng
            </h2>

            <p>
              Việc gửi yêu cầu qua website, Zalo, điện thoại hoặc các kênh liên
              hệ khác không mặc nhiên được xem là đơn hàng đã được xác nhận.
              Đơn hàng chỉ được xác nhận sau khi Nét Việt Florist trao đổi và
              thống nhất với khách hàng về mẫu hoa, giá, thời gian và địa điểm
              giao hàng.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              5. Giao hàng
            </h2>

            <p>
              Thời gian giao hàng phụ thuộc vào địa điểm, thời điểm đặt hoa,
              tình trạng nguyên liệu và yêu cầu của từng đơn hàng. Khách hàng
              cần cung cấp thông tin giao hàng chính xác để cửa hàng có thể
              thực hiện việc giao hoa.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              6. Hình ảnh và nội dung website
            </h2>

            <p>
              Hình ảnh, nội dung, thiết kế và các thành phần khác trên website
              thuộc quyền quản lý của Nét Việt Florist hoặc được sử dụng với
              quyền phù hợp. Người dùng không được sao chép, chỉnh sửa, phân
              phối hoặc sử dụng nội dung của website cho mục đích thương mại
              khi chưa có sự đồng ý của chủ sở hữu.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              7. Hành vi sử dụng website
            </h2>

            <p>Người dùng không được sử dụng website để:</p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Thực hiện các hành vi vi phạm pháp luật hoặc quyền của người
                khác.
              </li>
              <li>
                Cố ý gây ảnh hưởng đến hoạt động, bảo mật hoặc hiệu suất của
                website.
              </li>
              <li>
                Thu thập hoặc sử dụng trái phép thông tin của cửa hàng hoặc
                khách hàng khác.
              </li>
              <li>
                Đăng tải hoặc truyền tải nội dung gây hại, lừa đảo hoặc không
                phù hợp.
              </li>
            </ul>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              8. Liên kết bên ngoài
            </h2>

            <p>
              Website có thể chứa liên kết đến các nền tảng bên thứ ba như
              Zalo, Facebook hoặc Google Maps. Các liên kết này được cung cấp
              nhằm thuận tiện cho khách hàng và có thể chịu sự điều chỉnh bởi
              điều khoản riêng của từng nền tảng.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              9. Thay đổi điều khoản
            </h2>

            <p>
              Nét Việt Florist có thể cập nhật hoặc điều chỉnh nội dung của
              các điều khoản này khi cần thiết. Phiên bản mới nhất sẽ được
              công bố trên website và có hiệu lực kể từ thời điểm được đăng
              tải.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-main)]">
              10. Thông tin liên hệ
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