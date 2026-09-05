import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Nét Việt Florist - Shop Hoa Tươi Phan Thiết | Giao Hoa Tận Nơi',
    template: '%s | Nét Việt Florist Phan Thiết',
  },
  description: 'Shop hoa tươi Nét Việt Florist tại 275 Trần Hưng Đạo, Phan Thiết, Bình Thuận. Chuyên cung cấp hoa bó, hoa giỏ, lan hồ điệp, hoa khai trương. Điện hoa giao nhanh 24/7.',
  keywords: ['hoa tươi phan thiết', 'shop hoa phan thiết', 'điện hoa phan thiết', 'đặt hoa phan thiết', 'nét việt florist'],
  openGraph: {
    title: 'Nét Việt Florist - Shop Hoa Tươi Phan Thiết',
    description: 'Chuyên hoa tươi sự kiện, sinh nhật, khai trương tại Phan Thiết, Bình Thuận.',
    // url: Thay bằng domain thật
    siteName: 'Nét Việt Florist',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
