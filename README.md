# Nét Việt Florist

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-Image_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## Giới thiệu

**Nét Việt Florist** là website đặt hoa trực tuyến được xây dựng cho một cửa hàng hoa tại Phan Thiết.

Website cho phép khách hàng xem sản phẩm, tìm kiếm theo danh mục và gửi yêu cầu đặt hoa trực tuyến. Hệ thống cũng cung cấp **Admin Dashboard** để quản lý sản phẩm, danh mục, đơn đặt hoa và thông báo.

Dự án được xây dựng với mục tiêu đưa quy trình bán hoa truyền thống lên nền tảng trực tuyến và hỗ trợ cửa hàng quản lý đơn hàng tập trung hơn.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | `Next.js`, `React`, `TypeScript` | Xây dựng giao diện khách hàng và Admin Dashboard |
| **Styling** | `Tailwind CSS` | Responsive UI và styling |
| **Backend** | `Next.js API Routes` | Xử lý API và business logic |
| **Database** | `MongoDB Atlas`, `Mongoose` | Lưu trữ sản phẩm, danh mục, đơn hàng và notifications |
| **Image Storage** | `Cloudinary`, `Sharp` | Upload, tối ưu và lưu trữ hình ảnh |
| **Email** | `Resend` | Gửi email thông báo đơn đặt hoa |
| **Deployment** | `Vercel` | Deploy và hosting ứng dụng |

---

## Features

### Customer

- Xem danh sách sản phẩm hoa
- Tìm kiếm và lọc sản phẩm
- Xem sản phẩm theo danh mục
- Xem chi tiết sản phẩm
- Gửi yêu cầu đặt hoa trực tuyến
- Chọn ngày giao hoa
- Nhập thông tin giao hàng
- Responsive trên Desktop, Tablet và Mobile

### Admin

- Admin Dashboard
- Quản lý sản phẩm
- Quản lý danh mục
- Quản lý đơn đặt hoa
- Hệ thống notifications
- Upload và quản lý hình ảnh sản phẩm
- Tìm kiếm và lọc dữ liệu

---

## Architecture

```text
                    Nét Việt Florist
                           │
                     Next.js Application
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        MongoDB Atlas   Cloudinary     Resend
         Database       Images/CDN      Email

```

## Project Structure

netviet-florist/
│
├── app/
│   ├── netviet-admin/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── settings/
│   │
│   └── api/
│       ├── admin/
│       ├── orders/
│       └── ...
│
├── components/
│   ├── admin/
│   ├── home/
│   ├── products/
│   └── ui/
│
├── lib/
│   ├── mongodb.ts
│   └── cloudinary.ts
│
├── models/
│   ├── Product.ts
│   ├── Category.ts
│   ├── Order.ts
│   └── Notification.ts
│
├── public/
│   └── logo.png
│
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md

## Getting Started
### 1. Clone repository
```
git clone <YOUR_REPOSITORY_URL>

cd netviet-florist
```
### 2. Install dependencies
```
npm install
```
### 3. Configure environment variables
Create a .env.local file (Do not commit this file to Github):
```
MONGODB_URI=YOUR_MONGODB_URI

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

RESEND_API_KEY=YOUR_RESEND_API_KEY
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
```
### 4. Run development server
```
npm run dev
```
Open:
```
http://localhost:3000
```

## Developer
### Phan Hoàng Khang
Built with ❤️ for Nét Việt Florist.