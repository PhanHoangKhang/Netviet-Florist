import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoatuoiphanthiet.vn"),

  title: {
    default:
      "Nét Việt Florist | Shop Hoa Tươi Phan Thiết, Giao Hoa Tận Nơi",
    template: "%s | Nét Việt Florist",
  },

  description:
    "Nét Việt Florist - Shop hoa tươi tại Phan Thiết, Bình Thuận. Chuyên hoa bó, hoa giỏ, hoa sinh nhật, hoa khai trương, lan hồ điệp và điện hoa giao tận nơi.",

  keywords: [
    "Nét Việt Florist",
    "Nét Việt Florist Phan Thiết",
    "hoa tươi Phan Thiết",
    "shop hoa Phan Thiết",
    "điện hoa Phan Thiết",
    "đặt hoa Phan Thiết",
    "hoa sinh nhật Phan Thiết",
    "hoa khai trương Phan Thiết",
    "hoa bó Phan Thiết",
    "hoa giỏ Phan Thiết",
    "lan hồ điệp Phan Thiết",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Nét Việt Florist - Shop Hoa Tươi Phan Thiết",
    description:
      "Shop hoa tươi Nét Việt Florist tại Phan Thiết. Hoa bó, hoa giỏ, hoa sinh nhật, hoa khai trương và điện hoa giao tận nơi.",
    url: "https://hoatuoiphanthiet.vn",
    siteName: "Nét Việt Florist",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nét Việt Florist - Shop hoa tươi Phan Thiết",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nét Việt Florist | Shop Hoa Tươi Phan Thiết",
    description:
      "Hoa tươi sinh nhật, khai trương, hoa bó, hoa giỏ tại Phan Thiết.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}
