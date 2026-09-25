"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Flower2,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Connect admin login API
    console.log({
      email,
      password,
    });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] flex items-center justify-center px-4">
      <div className="w-full max-w-[520px]">

        {/* Logo */}
        <div className="text-center mb-8">
            <img
                src="/logo.png"
                alt="Nét Việt Florist Logo"
                className="mx-auto mb-4 w-20 h-20 object-contain rounded-full border border-gray-100"
            />

            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-primary)]">
                Nét Việt Florist
            </h1>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-gray-200 bg-white sm:p-10 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl text-center font-bold text-gray-900">
              Đăng nhập
            </h2>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2.5 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2.5 block text-sm font-semibold text-gray-700"
              >
                Mật khẩu
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  autoComplete="current-password"
                  className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[var(--color-primary)]"
                  aria-label={
                    showPassword
                      ? "Ẩn mật khẩu"
                      : "Hiển thị mật khẩu"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-2 flex h-13 w-full items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-hover)] active:scale-[0.99]"
            >
              Đăng nhập
            </button>
          </form>

        </div>

        {/* Back to Website */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm font-medium text-gray-500 transition hover:text-[var(--color-primary)]"
          >
            ← Quay lại website
          </a>
        </div>

      </div>
    </main>
  );
}