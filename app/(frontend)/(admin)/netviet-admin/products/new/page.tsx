"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { fetchAdminCategories } from "@/lib/admin-catalog";
import type { Category } from "@/types/category";

interface UploadedImage {
  url: string;
  publicId: string;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const result = await fetchAdminCategories();

        if (!cancelled) {
          setCategories(result);
        }
      } catch (err) {
        console.error("FETCH CATEGORIES ERROR:", err);

        if (!cancelled) {
          setError("Không thể tải danh mục sản phẩm.");
        }
      } finally {
        if (!cancelled) {
          setLoadingCategories(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    // Cho phép chọn lại cùng một file ở lần sau.
    event.target.value = "";

    if (!files.length) return;

    if (images.length + files.length > 5) {
      setError("Mỗi sản phẩm chỉ được có tối đa 5 ảnh.");
      return;
    }

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const uploaded: UploadedImage[] = [];

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `Ảnh "${file.name}" vượt quá giới hạn 5 MB.`,
          );
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || `Không thể upload ${file.name}.`,
          );
        }

        uploaded.push({
          url: result.data.url,
          publicId: result.data.publicId,
        });
      }

      setImages((prev) => [...prev, ...uploaded]);
      setSuccess(`Đã upload ${uploaded.length} ảnh.`);
      toast.success(`Đã tải lên ${uploaded.length} ảnh sản phẩm.`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Không thể upload hình ảnh.";
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.info("Đã xóa ảnh khỏi danh sách sản phẩm.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (!categoryId) {
      setError("Vui lòng chọn danh mục.");
      return;
    }

    if (images.length === 0) {
      setError("Vui lòng upload ít nhất một ảnh.");
      return;
    }

    if (uploading) {
      setError("Vui lòng đợi upload ảnh hoàn tất.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          categoryId,
          images: images.map((image) => image.url),
          imagePublicIds: images.map((image) => image.publicId),
          isFeatured,
          inStock,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể tạo sản phẩm.",
        );
      }

      toast.success(`Đã tạo sản phẩm "${name.trim()}".`);
      router.push("/netviet-admin/products");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tạo sản phẩm.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-md border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]";

  return (
    <div className="mx-auto max-w-5xl pb-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/netviet-admin/products"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Quay lại sản phẩm
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Thêm sản phẩm
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Thêm sản phẩm mới vào cửa hàng Nét Việt Florist.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main form */}
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-semibold text-gray-900">
                Thông tin sản phẩm
              </h2>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>

                <input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: Bó hoa hồng đỏ"
                  maxLength={150}
                  required
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                  Slug
                </label>

                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="bo-hoa-hong-do"
                  maxLength={180}
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-gray-400">
                  Tự tạo từ tên sản phẩm. Fen vẫn có thể chỉnh sửa.
                </p>
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                  Mô tả
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả sản phẩm, loại hoa, ý nghĩa và dịp tặng..."
                  rows={5}
                  maxLength={5000}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {description.length}/5000
                </p>
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                  Danh mục <span className="text-red-500">*</span>
                </label>

                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  disabled={loadingCategories}
                  className={inputClass}
                >
                  <option value="">
                    {loadingCategories
                      ? "Đang tải danh mục..."
                      : "Chọn danh mục"}
                  </option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {!loadingCategories && categories.length === 0 && (
                  <p className="mt-2 text-xs text-amber-700">
                    Chưa có danh mục. Hãy tạo danh mục trước.
                  </p>
                )}
              </div>
            </section>

            {/* Images */}
            <section className="border border-gray-200 bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Hình ảnh sản phẩm
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Tối đa 5 ảnh, mỗi ảnh không quá 5 MB.
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {images.length}/5 ảnh
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={image.publicId}
                    className="group relative aspect-square overflow-hidden border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={image.url}
                      alt={`Ảnh sản phẩm ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 text-[10px] font-medium text-gray-700">
                        Ảnh chính
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-white/95 text-gray-600 opacity-100 transition hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label="Bỏ ảnh khỏi sản phẩm"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {images.length < 5 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50/50 text-gray-500 transition hover:border-[var(--color-primary)] hover:bg-gray-50 hover:text-[var(--color-primary)]">
                    {uploading ? (
                      <LoaderCircle
                        size={24}
                        className="animate-spin"
                      />
                    ) : (
                      <>
                        <ImagePlus size={25} strokeWidth={1.5} />
                        <span className="mt-2 text-xs font-medium">
                          Thêm ảnh
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      disabled={uploading}
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-gray-400">
                Ảnh đầu tiên sẽ được sử dụng làm ảnh đại diện. Xóa ảnh ở
                đây chỉ bỏ ảnh khỏi form; ảnh đã upload lên Cloudinary
                có thể vẫn còn nếu chưa lưu sản phẩm.
              </p>
            </section>
          </div>

          {/* Sidebar settings */}
          <aside className="space-y-6">
            <section className="border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">
                Trạng thái
              </h2>

              <label className="mt-5 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-800">
                    Còn hàng
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                    Sản phẩm có thể được khách hàng đặt.
                  </span>
                </span>
              </label>

              <div className="my-5 border-t border-gray-100" />

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-800">
                    Sản phẩm nổi bật
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                    Đánh dấu sản phẩm để hiển thị ở khu vực nổi bật.
                  </span>
                </span>
              </label>
            </section>

            <section className="border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">
                Lưu sản phẩm
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Kiểm tra thông tin và hình ảnh trước khi lưu vào cửa hàng.
              </p>

              <button
                type="submit"
                disabled={
                  saving ||
                  uploading ||
                  loadingCategories ||
                  categories.length === 0
                }
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}

                {saving ? "Đang lưu..." : "Tạo sản phẩm"}
              </button>

              <Link
                href="/netviet-admin/products"
                className="mt-3 flex w-full items-center justify-center px-4 py-2.5 text-sm text-gray-500 transition hover:text-gray-900"
              >
                Hủy
              </Link>
            </section>
          </aside>
        </div>

        {(error || success) && (
          <div
            role="status"
            className={`mt-6 flex items-start gap-3 border p-4 text-sm ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            <span className="flex-1">{error || success}</span>

            <button
              type="button"
              onClick={() => {
                setError("");
                setSuccess("");
              }}
              aria-label="Đóng thông báo"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
