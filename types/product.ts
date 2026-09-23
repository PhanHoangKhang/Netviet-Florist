export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;

  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };

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