"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  LoaderCircle,
  FolderTree,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
}

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/categories/${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể tải thông tin danh mục."
        );
      }

      const category = result.data;

      setForm({
        name: category.name ?? "",
        slug: category.slug ?? "",
        description: category.description ?? "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi tải danh mục."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCategory();
  }, [id, fetchCategory]);

  function handleNameChange(value: string) {
    setForm((prev) => ({ ...prev, name: value }));
  }

  function handleSlugChange(value: string) {
    setForm((prev) => ({
      ...prev,
      slug: value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const slug = form.slug.trim();

    if (!name || !slug) {
      setError("Vui lòng nhập tên và slug danh mục.");
      return;
    }

    if (name.length > 100 || slug.length > 120) {
      setError("Tên tối đa 100 ký tự và slug tối đa 120 ký tự.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/admin/categories/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            description: form.description.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Không thể cập nhật danh mục."
        );
      }

      setSuccess("Cập nhật danh mục thành công.");

      // Quay lại danh sách sau khi cập nhật thành công
      router.push("/netviet-admin/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Đã xảy ra lỗi khi cập nhật."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle
          size={22}
          className="animate-spin text-[var(--color-primary)]"
        />
        <span className="ml-3 text-sm text-gray-500">
          Đang tải danh mục...
        </span>
      </div>
    );
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
            <FolderTree
              size={22}
              className="text-[var(--color-primary)]"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Chỉnh sửa danh mục
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Cập nhật thông tin danh mục sản phẩm.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 bg-white"
      >
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
            <div className="flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
              <p>{success}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-800"
            >
              Tên danh mục <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(event) =>
                handleNameChange(event.target.value)
              }
              placeholder="Ví dụ: Hoa sinh nhật"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-400">
              {form.name.length}/100 ký tự
            </p>
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="text-sm font-medium text-gray-800"
            >
              Slug <span className="text-red-500">*</span>
            </label>

            <input
              id="slug"
              type="text"
              required
              maxLength={120}
              value={form.slug}
              onChange={(event) =>
                handleSlugChange(event.target.value)
              }
              placeholder="hoa-sinh-nhat"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-400">
              Dùng cho URL danh mục, ví dụ: hoa-sinh-nhat.
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
        </div>

        {/* Footer actions */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:flex-row sm:px-7">
          <Link
            href="/netviet-admin/categories"
            className="inline-flex items-center justify-center border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Hủy
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
