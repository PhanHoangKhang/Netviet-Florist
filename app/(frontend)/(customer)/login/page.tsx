"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LoaderCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : "Đăng nhập thất bại. Vui lòng thử lại.";

        setError(message);
        return;
      }

      setPassword("");
      router.replace("/netviet-admin");
      router.refresh();
    } catch {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-5 py-6">
      <div className="w-full max-w-[380px]">
        {/* Brand */}
        <header className="mb-7 text-center">
          <img
            src="/logo.png"
            alt="Nét Việt Florist"
            className="mx-auto mb-3 h-[68px] w-[68px] object-contain"
          />

          <h1 className="text-[27px] font-semibold tracking-[-0.04em] text-[var(--color-primary)]">
            Nét Việt Florist
          </h1>

          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#968C81]">
            Administration Portal
          </p>
        </header>

        {/* Login form */}
        <section>
          <div className="mb-8">
            <h2 className="text-[25px] font-medium tracking-tight text-[#292522]">
              Đăng nhập
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#827970]">
              Đăng nhập để tiếp tục quản lý cửa hàng của bạn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2.5 block text-[13px] font-medium text-[#403A34]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#A49A90]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  maxLength={254}
                  required
                  disabled={isLoading}
                  className="h-12 w-full border-0 border-b border-[#DCD5CC] bg-transparent pl-8 pr-2 text-sm text-[#292522] outline-none transition placeholder:text-[#B3AAA1] focus:border-[var(--color-primary)] focus:ring-0 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2.5 block text-[13px] font-medium text-[#403A34]"
              >
                Mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#A49A90]"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  maxLength={1024}
                  required
                  disabled={isLoading}
                  className="h-12 w-full border-0 border-b border-[#DCD5CC] bg-transparent pl-8 pr-10 text-sm text-[#292522] outline-none transition placeholder:text-[#B3AAA1] focus:border-[var(--color-primary)] focus:ring-0 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#A49A90] transition hover:text-[var(--color-primary)]"
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={1.6} />
                  ) : (
                    <Eye size={17} strokeWidth={1.6} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-start gap-2 border-l-2 border-red-400 bg-red-50/70 px-3 py-2.5 text-sm text-red-700"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-primary)] px-4 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#827970] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft size={14} />
            Quay lại website
          </a>
        </footer>
      </div>
    </main>
  );
}
