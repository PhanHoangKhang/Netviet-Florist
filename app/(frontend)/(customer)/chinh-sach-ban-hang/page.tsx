
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách bán hàng | Nét Việt Florist",
  description:
    "Tìm hiểu chính sách đặt hàng, thanh toán, giao hoa, thay đổi và hủy đơn tại Nét Việt Florist.",
  alternates: {
    canonical: "/chinh-sach-ban-hang",
  },
  openGraph: {
    title: "Chính sách bán hàng | Nét Việt Florist",
    description:
      "Thông tin về quy trình đặt hàng, thanh toán và giao hoa tại Nét Việt Florist.",
    type: "website",
  },
};

const policies = [
  {
    id: "dat-hang",
    number: "01",
    title: "Đặt hàng",
    content: [
      "Khách hàng có thể đặt hoa trực tiếp thông qua website Nét Việt Florist.",
      "Khi đặt hàng, khách hàng vui lòng cung cấp đầy đủ thông tin gồm họ tên, số điện thoại, địa chỉ nhận hoa, ngày giao hàng và các yêu cầu liên quan.",
      "Đối với những mẫu hoa có yêu cầu riêng, khách hàng có thể ghi chú để shop tư vấn và xác nhận trước khi thực hiện.",
      "Đơn hàng chỉ được xem là đã xác nhận sau khi shop liên hệ và xác nhận lại thông tin với khách hàng.",
    ],
  },
  {
    id: "xac-nhan",
    number: "02",
    title: "Xác nhận đơn hàng",
    content: [
      "Sau khi nhận được đơn đặt hàng, shop sẽ kiểm tra thông tin và liên hệ với khách hàng để xác nhận.",
      "Trong trường hợp cần làm rõ về mẫu hoa, thời gian giao hoặc các yêu cầu đặc biệt, shop sẽ trao đổi trực tiếp với khách hàng.",
      "Nếu chưa nhận được xác nhận từ shop, khách hàng vui lòng liên hệ để kiểm tra tình trạng đơn hàng.",
    ],
  },
  {
    id: "thanh-toan",
    number: "03",
    title: "Thanh toán",
    content: [
      "Hình thức thanh toán sẽ được shop trao đổi và xác nhận với khách hàng khi tiếp nhận đơn hàng.",
      "Các thông tin về số tiền cần thanh toán, phí giao hàng và phương thức thanh toán sẽ được thông báo trước khi đơn hàng được thực hiện.",
      "Khách hàng vui lòng kiểm tra lại thông tin thanh toán trước khi hoàn tất giao dịch.",
    ],
  },
  {
    id: "giao-hang",
    number: "04",
    title: "Giao hàng",
    content: [
      "Shop tiếp nhận yêu cầu giao hoa theo thời gian và địa chỉ mà khách hàng cung cấp.",
      "Thời gian giao hàng dự kiến sẽ được trao đổi và xác nhận tùy theo khu vực, tình trạng đơn hàng và khả năng chuẩn bị hoa.",
      "Phí giao hàng (nếu có) sẽ được thông báo trước khi xác nhận đơn.",
      "Trong trường hợp phát sinh sự cố ảnh hưởng đến thời gian giao hàng, shop sẽ chủ động liên hệ để thông báo và thống nhất phương án với khách hàng.",
      "Khách hàng vui lòng cung cấp chính xác địa chỉ và số điện thoại người nhận để quá trình giao hàng được thuận lợi.",
    ],
  },
  {
    id: "thay-doi",
    number: "05",
    title: "Thay đổi đơn hàng",
    content: [
      "Nếu muốn thay đổi mẫu hoa, số lượng, nội dung thiệp hoặc thông tin giao hàng, khách hàng vui lòng liên hệ shop sớm nhất có thể.",
      "Việc thay đổi đơn hàng phụ thuộc vào tình trạng chuẩn bị và thực hiện đơn tại thời điểm tiếp nhận yêu cầu.",
      "Shop sẽ thông báo nếu có sự thay đổi về giá hoặc thời gian giao hàng do yêu cầu điều chỉnh.",
    ],
  },
  {
    id: "huy-don",
    number: "06",
    title: "Hủy đơn hàng",
    content: [
      "Khách hàng có thể gửi yêu cầu hủy đơn bằng cách liên hệ trực tiếp với shop.",
      "Đối với đơn hàng chưa được xác nhận hoặc chưa bắt đầu chuẩn bị, shop sẽ hỗ trợ xử lý yêu cầu hủy.",
      "Đối với đơn hàng đã được chuẩn bị hoặc thực hiện, việc hủy đơn và hoàn tiền (nếu có) sẽ được shop xem xét dựa trên tình trạng thực tế và thỏa thuận với khách hàng.",
    ],
  },
  {
    id: "doi-tra",
    number: "07",
    title: "Đổi trả và phản hồi",
    content: [
      "Hoa tươi là sản phẩm có đặc tính tự nhiên nên màu sắc, kích thước và hình dáng có thể có sự khác biệt nhỏ so với hình ảnh minh họa.",
      "Shop luôn cố gắng đảm bảo sản phẩm được thực hiện gần nhất với mẫu khách hàng lựa chọn. Trong trường hợp một số loại hoa không có sẵn, shop sẽ liên hệ để trao đổi phương án thay thế trước khi thực hiện.",
      "Nếu sản phẩm nhận được bị hư hỏng, giao sai mẫu hoặc có vấn đề phát sinh, khách hàng vui lòng liên hệ shop sớm nhất có thể và cung cấp hình ảnh để được hỗ trợ.",
      "Shop sẽ tiếp nhận phản hồi và xem xét phương án xử lý phù hợp tùy theo tình trạng thực tế của sản phẩm.",
    ],
  },
  {
    id: "trach-nhiem",
    number: "08",
    title: "Trách nhiệm của khách hàng",
    content: [
      "Cung cấp thông tin đặt hàng chính xác và đầy đủ.",
      "Kiểm tra lại thông tin đơn hàng trước khi xác nhận.",
      "Đảm bảo có thể liên hệ được qua số điện thoại đã cung cấp.",
      "Thông báo sớm cho shop nếu có nhu cầu thay đổi hoặc hủy đơn hàng.",
    ],
  },
];

export default function SalesPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fffdfb]">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        {/* HEADER */}

        <header className="max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#4d0d01]">
            Nét Việt Florist
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#1A2A2B] sm:text-4xl lg:text-5xl">
            Chính sách bán hàng
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Nét Việt Florist luôn mong muốn mang đến trải nghiệm
            mua hoa thuận tiện và đáng tin cậy. Những chính sách
            dưới đây giúp khách hàng hiểu rõ hơn về quy trình
            đặt hàng, thanh toán và giao nhận sản phẩm tại shop.
          </p>
        </header>

        {/* DIVIDER */}

        <div className="my-12 border-t border-gray-200 sm:my-16" />

        {/* CONTENT */}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
          {/* TABLE OF CONTENTS */}

          <aside className="h-fit lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Nội dung
            </p>

            <nav aria-label="Mục lục chính sách">
              <ul className="space-y-3">
                {policies.map((policy) => (
                  <li key={policy.id}>
                    <a
                      href={`#${policy.id}`}
                      className="group flex items-start gap-3 text-sm text-gray-500 transition-colors hover:text-[#4d0d01]"
                    >
                      <span className="text-xs tabular-nums text-gray-300 group-hover:text-[#4d0d01]">
                        {policy.number}
                      </span>

                      <span>{policy.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* POLICY SECTIONS */}

          <div className="min-w-0">
            <div className="space-y-12 sm:space-y-14">
              {policies.map((policy) => (
                <section
                  key={policy.id}
                  id={policy.id}
                  className="scroll-mt-28"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <span className="text-sm font-medium tabular-nums text-[#4d0d01]">
                      {policy.number}
                    </span>

                    <h2 className="text-xl font-semibold tracking-tight text-[#1A2A2B] sm:text-2xl">
                      {policy.title}
                    </h2>
                  </div>

                  <div className="space-y-3 pl-9">
                    {policy.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CONTACT */}

            <div className="mt-16 border-t border-gray-200 pt-8 sm:mt-20">
              <h2 className="text-xl font-semibold text-[#1A2A2B]">
                Cần hỗ trợ thêm?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Nếu có bất kỳ thắc mắc nào liên quan đến chính
                sách bán hàng hoặc đơn đặt hoa, khách hàng vui
                lòng liên hệ với Nét Việt Florist để được hỗ trợ.
              </p>

              <Link
                href="/lien-he"
                className="mt-5 inline-flex items-center gap-2 border-b border-[#4d0d01] pb-1 text-sm font-medium text-[#4d0d01] transition-opacity hover:opacity-60"
              >
                Liên hệ với chúng tôi
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}

        <div className="mt-16 border-t border-gray-200 pt-6">
          <p className="text-xs leading-6 text-gray-400">
            Nét Việt Florist có thể cập nhật chính sách bán hàng
            khi cần thiết. Những thay đổi sẽ được đăng tải trên
            website để khách hàng tiện theo dõi.
          </p>
        </div>
      </div>
    </main>
  );
}
