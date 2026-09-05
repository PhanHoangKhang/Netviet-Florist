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
    <section className="border-y border-gray-100 bg-white py-5">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {PROPS.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-3 px-2 py-4 sm:px-5 sm:py-2"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-light)] text-[var(--color-primary)] flex items-center justify-center">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <span className="hidden xl:block text-[10px] font-medium text-[var(--color-primary)] whitespace-nowrap">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
