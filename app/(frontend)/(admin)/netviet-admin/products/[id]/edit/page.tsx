"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import type { Category } from "@/types/category";
import type { Product, ImageItem } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  // ========================================
  // STATE
  // ========================================

  const [product, setProduct] =
    useState<Product | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [images, setImages] =
    useState<ImageItem[]>([]);

  const [isFeatured, setIsFeatured] =
    useState(false);

  const [inStock, setInStock] =
    useState(true);

  // ========================================
  // UI STATE
  // ========================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // FETCH PRODUCT
  // ========================================

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/products/${id}`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Không thể tải sản phẩm."
          );
        }

        const data: Product = result.data;

        setProduct(data);

        setName(data.name);
        setSlug(data.slug);
        setDescription(data.description || "");

        const category =
          typeof data.categoryId === "string"
            ? data.categoryId
            : data.categoryId?._id;

        setCategoryId(category || "");

        setIsFeatured(data.isFeatured);
        setInStock(data.inStock);

        setImages(
          (data.images || []).map(
            (url, index) => ({
              url,
              publicId:
                data.imagePublicIds?.[index] || "",
            })
          )
        );
      } catch (error) {
        console.error(
          "FETCH PRODUCT ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải sản phẩm."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ========================================
  // FETCH CATEGORIES
  // ========================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "/api/admin/categories",
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Không thể tải danh mục."
          );
        }

        setCategories(result.data);
      } catch (error) {
        console.error(
          "FETCH CATEGORIES ERROR:",
          error
        );
      }
    };

    fetchCategories();
  }, []);

  // ========================================
  // UPLOAD IMAGE
  // ========================================

  const handleUploadImages = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const uploadedImages: ImageItem[] = [];

      for (const file of files) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch(
          "/api/admin/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              `Không thể upload ${file.name}.`
          );
        }

        uploadedImages.push({
          url: result.data.url,
          publicId: result.data.publicId,
        });
      }

      setImages((prev) => [
        ...prev,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(
        "UPLOAD IMAGE ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Không thể upload hình ảnh."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  // ========================================
  // REMOVE IMAGE
  // ========================================

  const handleRemoveImage = (
    index: number
  ) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ========================================
  // SAVE PRODUCT
  // ========================================

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!name.trim()) {
        throw new Error(
          "Vui lòng nhập tên sản phẩm."
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Vui lòng nhập slug."
        );
      }

      if (!categoryId) {
        throw new Error(
          "Vui lòng chọn danh mục."
        );
      }

      if (!images.length) {
        throw new Error(
          "Sản phẩm phải có ít nhất một hình ảnh."
        );
      }

      const response = await fetch(
        `/api/admin/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            slug: slug.trim(),
            description:
              description.trim(),
            categoryId,
            images: images.map(
              (image) => image.url
            ),
            imagePublicIds:
              images.map(
                (image) => image.publicId
              ),
            isFeatured,
            inStock,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Không thể cập nhật sản phẩm."
        );
      }

      setSuccess(
        "Cập nhật sản phẩm thành công."
      );

      setProduct(result.data);
    } catch (error) {
      console.error(
        "SAVE PRODUCT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Không thể cập nhật sản phẩm."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-400" />

        <p className="mt-3 text-sm text-gray-500">
          Đang tải sản phẩm...
        </p>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (!product) {
    return (
      <div>
        <Link
          href="/netviet-admin/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại sản phẩm
        </Link>

        <div className="mt-8 border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">
            {error ||
              "Không tìm thấy sản phẩm."}
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="pb-12">
      {/* Header */}

      <div className="mb-8">
        <Link
          href="/netviet-admin/products"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Sản phẩm
        </Link>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Chỉnh sửa sản phẩm
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Cập nhật thông tin và hình ảnh
            sản phẩm.
          </p>
        </div>
      </div>

      {/* Messages */}

      {error && (
        <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mb-5 border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm text-green-700">
            {success}
          </p>
        </div>
      )}

      {/* Main */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        {/* LEFT */}

        <div className="border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Thông tin sản phẩm
            </h2>
          </div>

          <div className="space-y-6 p-6">
            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Tên sản phẩm
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Ví dụ: Bó hoa hồng đỏ"
              />
            </div>

            {/* Slug */}

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Slug
              </label>

              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                className="w-full border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
                placeholder="bo-hoa-hong-do"
              />

              <p className="mt-2 text-xs text-gray-400">
                Dùng cho URL sản phẩm.
              </p>
            </div>

            {/* Category */}

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Danh mục
              </label>

              <select
                id="category"
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
                className="w-full border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
              >
                <option value="">
                  Chọn danh mục
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Description */}

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Mô tả
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows={7}
                className="w-full resize-y border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Mô tả sản phẩm..."
              />
            </div>

            {/* Status */}

            <div className="border-t border-gray-100 pt-6">
              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) =>
                      setIsFeatured(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />

                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Sản phẩm nổi bật
                    </span>

                    <span className="block text-xs text-gray-500">
                      Hiển thị trong khu vực
                      sản phẩm nổi bật.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) =>
                      setInStock(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />

                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Còn hàng
                    </span>

                    <span className="block text-xs text-gray-500">
                      Cho phép khách hàng đặt
                      sản phẩm này.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Hình ảnh sản phẩm
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Có thể thêm nhiều hình ảnh.
            </p>
          </div>

          <div className="p-6">
            {/* Images */}

            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {images.map(
                  (image, index) => (
                    <div
                      key={`${image.publicId}-${index}`}
                      className="group relative aspect-square overflow-hidden border border-gray-200 bg-gray-50"
                    >
                      <img
                        src={image.url}
                        alt={`${name} - ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(
                            index
                          )
                        }
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-white/95 text-gray-600 opacity-0 shadow-sm transition group-hover:opacity-100 hover:text-red-600"
                        aria-label="Xóa ảnh"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                          Ảnh chính
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center border border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                  <ImagePlus className="mx-auto h-8 w-8 text-gray-300" />

                  <p className="mt-3 text-sm text-gray-500">
                    Chưa có hình ảnh
                  </p>
                </div>
              </div>
            )}

            {/* Upload */}

            <label
              className={`mt-4 flex cursor-pointer items-center justify-center gap-2 border border-dashed px-4 py-3 text-sm font-medium transition ${
                uploading
                  ? "cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang tải ảnh...
                </>
              ) : (
                <>
                  <ImagePlus className="h-4 w-4" />
                  Thêm ảnh
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={uploading}
                onChange={
                  handleUploadImages
                }
                className="hidden"
              />
            </label>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              JPEG, PNG hoặc WebP. Tối đa 5MB
              mỗi ảnh.
            </p>
          </div>
        </div>
      </div>

      {/* Footer actions */}

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
        <Link
          href="/netviet-admin/products"
          className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          Hủy
        </Link>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {saving
            ? "Đang lưu..."
            : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}