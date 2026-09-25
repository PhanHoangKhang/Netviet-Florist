import { Category } from "./category";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;

  categoryId: Category

  images: string[];

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