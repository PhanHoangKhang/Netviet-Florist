export default function ValuePropsSection() {
  const PROPS = [
    {
      id: 1,
      title: "Hoa Tươi Mỗi Ngày",
      desc: "Tuyển chọn 100% hoa tươi mới nhập trong ngày",
      badge: "Đảm bảo 100%",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M12 8v4l3 3"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Giao Nhanh 60-90p",
      desc: "Giao tận tay hỏa tốc, cam kết đúng giờ hẹn",
      badge: "Hỏa tốc",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Duyệt Ảnh Thực Tế",
      desc: "Gửi ảnh thành phẩm qua Zalo trước khi giao",
      badge: "An tâm",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Tặng Thiệp & Banner",
      desc: "Miễn phí thiết kế & in nội dung chúc mừng",
      badge: "Free 100%",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-y border-[#e8dfdc] bg-white">
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#eee7e4] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {PROPS.map((item) => (
            <div
              key={item.id}
              className="group relative flex min-h-[110px] items-center gap-4 px-4 py-6 sm:px-6 lg:px-7"
            >
              {/* Decorative accent */}
              <span className="absolute left-0 top-1/2 h-8 w-px -translate-y-1/2 bg-[var(--color-primary)]/20 transition-colors duration-300 group-hover:bg-[var(--color-primary)]" />

              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--color-primary)]">
                {item.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold tracking-tight text-[var(--color-text-main)]">
                  {item.title}
                </h4>

                <p className="mt-1.5 text-xs leading-5 text-gray-500">
                  {item.desc}
                </p>
              </div>

              {/* Badge */}
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-[var(--color-primary)]/70 xl:block">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
