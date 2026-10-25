"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  LoaderCircle,
  FolderPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ImagePlus, X } from "lucide-react";

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: string;
  imageKey: string;
}

const initialForm: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  image: "",
  imageKey: "",
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]";

export default function NewCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [slugEdited, setSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  function handleNameChange(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugEdited ? prev.slug : generateSlug(value),
    }));
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true);

    setForm((prev) => ({
      ...prev,
      slug: generateSlug(value),
    }));
  }

  async function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "category");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể upload ảnh.");
      }

      if (
        typeof result.data?.url !== "string" ||
        typeof result.data?.key !== "string" ||
        !result.data.key.startsWith("categories/")
      ) {
        throw new Error("API không trả về ảnh danh mục hợp lệ.");
      }

      setForm((prev) => ({
        ...prev,
        image: result.data.url,
        imageKey: result.data.key,
      }));

      toast.success("Đã tải ảnh danh mục lên.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không thể upload ảnh.";

      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const slug = form.slug.trim();
    const description = form.description.trim();

    if (!name || !slug) {
      setError("Vui lòng nhập tên và slug danh mục.");
      return;
    }

    if (name.length > 100 || slug.length > 120) {
      setError("Tên tối đa 100 ký tự và slug tối đa 120 ký tự.");
      return;
    }

    if (description.length > 1000) {
      setError("Mô tả không được vượt quá 1000 ký tự.");
      return;
    }

    if (!form.image || !form.imageKey) {
      setError("Vui lòng tải ảnh danh mục lên.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          description,
          image: form.image,
          imageKey: form.imageKey,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể tạo danh mục.");
      }

      toast.success(`Đã tạo danh mục "${name}".`);
      router.push("/netviet-admin/categories");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi tạo danh mục.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/netviet-admin/categories"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Quay lại danh mục
        </Link>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 bg-white">
            <FolderPlus size={22} className="text-[var(--color-primary)]" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Thêm danh mục
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Tạo danh mục mới để phân loại sản phẩm hoa tươi.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border border-gray-200 bg-white">
        <div className="space-y-6 p-5 sm:p-7">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              role="status"
              className="flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-800">
              Tên danh mục <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Ví dụ: Hoa sinh nhật"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-400">
              {form.name.length}/100 ký tự
            </p>
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="text-sm font-medium text-gray-800">
              Slug <span className="text-red-500">*</span>
            </label>

            <input
              id="slug"
              type="text"
              required
              maxLength={120}
              value={form.slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              placeholder="hoa-sinh-nhat"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-400">
              Được tự động tạo từ tên danh mục. Fen vẫn có thể chỉnh sửa nếu
              cần.
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-800"
            >
              Mô tả
            </label>

            <textarea
              id="description"
              rows={5}
              maxLength={1000}
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Mô tả ngắn về danh mục này..."
              className={`${inputClass} resize-y`}
            />

            <p className="mt-2 text-xs text-gray-400">
              {form.description.length}/1000 ký tự
            </p>
          </div>

          <div>
            <label
              htmlFor="category-image"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Ảnh danh mục <span className="text-red-500">*</span>
            </label>

            {form.image ? (
              <div className="mt-3 relative w-full max-w-sm">
                <img
                  src={form.image}
                  alt="Ảnh xem trước danh mục"
                  className="aspect-video w-full border border-gray-200 object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      image: "",
                      imageKey: "",
                    }))
                  }
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-white text-[var(--foreground)] shadow"
                  aria-label="Bỏ ảnh danh mục"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="category-image"
                className="mt-2 flex aspect-video max-w-sm cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gray-300 text-[var(--foreground)] hover:border-[var(--color-primary)]"
              >
                {uploading ? (
                  <LoaderCircle size={22} className="animate-spin" />
                ) : (
                  <ImagePlus size={22} />
                )}
                <span className="text-sm">
                  {uploading ? "Đang tải ảnh..." : "Chọn ảnh danh mục"}
                </span>
              </label>
            )}

            <input
              id="category-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUploadImage}
              disabled={uploading || saving}
              className="sr-only"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:flex-row sm:px-7">
          <Link
            href="/netviet-admin/categories"
            className="inline-flex items-center justify-center border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Hủy
          </Link>

          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}

            {saving ? "Đang tạo..." : "Tạo danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
