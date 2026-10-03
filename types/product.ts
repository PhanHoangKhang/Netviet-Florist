import { Category } from "./category";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: Category;
  images: string[];
  imagePublicIds: string[];
  isFeatured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ImageItem {
  url: string;
  publicId: string;
}