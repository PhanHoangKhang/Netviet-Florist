export interface Product {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  image: string;
  isBestSeller?: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  // Best Sellers
  {
    id: "bs-1",
    name: "Bó Hoa Hồng Red Naomi Sang Trọng",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    isBestSeller: true,
  },
  {
    id: "bs-2",
    name: "Lẵng Hoa Khai Trương Phát Tài",
    categoryId: "hoa-chuc-mung",
    category: "Hoa chúc mừng",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
    isBestSeller: true,
  },
  {
    id: "bs-3",
    name: "Chậu Lan Hồ Điệp Hoàng Kim 5 Cành",
    categoryId: "lan-ho-diep",
    category: "Lan hồ điệp",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600",
    isBestSeller: true,
  },
  {
    id: "bs-4",
    name: "Giỏ Trái Cây Kèm Hoa Tươi Nhập Khẩu",
    categoryId: "trai-cay",
    category: "Trái cây",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600",
    isBestSeller: true,
  },
  {
    id: "bs-5",
    name: "Giỏ Hoa Tulip Trắng Tinh Khôi",
    categoryId: "hoa-gio",
    category: "Hoa giỏ",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600",
    isBestSeller: true,
  },

  // Hoa Bó
  {
    id: "hb-1",
    name: "Bó Hoa Mẫu Đơn Hồng Ngọt Ngào",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600",
  },
  {
    id: "hb-2",
    name: "Bó Hoa Cúc Tana Tinh Khôi",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600",
  },
  {
    id: "hb-3",
    name: "Bó Hoa Hướng Dương Năng Lượng",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600",
  },
  {
    id: "hb-4",
    name: "Bó Hoa Baby Trắng Bồng Bềnh",
    categoryId: "hoa-bo",
    category: "Hoa bó",
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600",
  },

  // Hoa Giỏ
  {
    id: "hg-1",
    name: "Giỏ Hoa Hồng Nhập Khẩu Pasteur",
    categoryId: "hoa-gio",
    category: "Hoa giỏ",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600",
  },
  {
    id: "hg-2",
    name: "Giỏ Hoa Cẩm Tú Cầu Nhã Nhặn",
    categoryId: "hoa-gio",
    category: "Hoa giỏ",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
  },
  {
    id: "hg-3",
    name: "Lẵng Hoa Cúc Pingpong & Hồng Kem",
    categoryId: "hoa-gio",
    category: "Hoa giỏ",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600",
  },

  // Lan Hồ Điệp
  {
    id: "lhd-1",
    name: "Chậu Lan Hồ Điệp Tím Đại Lộc",
    categoryId: "lan-ho-diep",
    category: "Lan hồ điệp",
    image: "https://images.unsplash.com/photo-1566808902061-68393c042838?w=600",
  },
  {
    id: "lhd-2",
    name: "Chậu Lan Hồ Điệp Trắng Đột Biến",
    categoryId: "lan-ho-diep",
    category: "Lan hồ điệp",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600",
  },

  // Hoa Chúc Mừng
  {
    id: "hcm-1",
    name: "Kệ Hoa Khai Trương Hồng Phát 2 Tầng",
    categoryId: "hoa-chuc-mung",
    category: "Hoa chúc mừng",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600",
  },
  {
    id: "hcm-2",
    name: "Lẵng Hoa Khai Trương Thịnh Vượng",
    categoryId: "hoa-chuc-mung",
    category: "Hoa chúc mừng",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
  },
];