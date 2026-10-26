"use client";

import { Phone } from "lucide-react";

const CONTACT = {
  phone: "0933660399", // Thay bằng số điện thoại thật
  messenger: "https://m.me/nguoilamhoa",
  zalo: "https://zalo.me/0933660399",
};

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-2.5 sm:bottom-8 sm:right-6">
      {/* Gọi điện */}
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label="Gọi điện cho Nét Việt Florist"
        title="Gọi điện"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-emerald-600"
      >
        <Phone size={23} strokeWidth={2.8} />
      </a>

      {/* Messenger */}
      <a
        href={CONTACT.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin qua Messenger"
        title="Messenger"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#006fe0]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.15 2 11.27c0 2.92 1.44 5.53 3.7 7.22V22l3.39-1.86c.92.25 1.89.4 2.91.4 5.52 0 10-4.15 10-9.27S17.52 2 12 2Zm1.03 12.46-2.55-2.72-4.97 2.72 5.47-5.81 2.61 2.72 4.91-2.72-5.47 5.81Z" />
        </svg>
      </a>

      {/* Zalo */}
      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin qua Zalo"
        title="Zalo"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#0055d4]"
      >
        <img
          src="/zalo.png"
          alt="Zalo Fanpage"
          className="w-7 h-7 object-contain"
        />
      </a>
    </div>
  );
}
