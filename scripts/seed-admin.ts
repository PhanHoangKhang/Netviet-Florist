import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";

// 1. Load environment variables trước khi import module phụ thuộc vào env.
const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  throw new Error(`Cannot load environment file: ${envPath}`);
}

function validateEmail(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    throw new Error("ADMIN_EMAIL is invalid");
  }

  return normalizedEmail;
}

function validatePassword(password: string): void {
  // Giới hạn tối thiểu 10 ký tự cho tài khoản quản trị.
  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must contain at least 15 characters");
  }

  // Tránh password quá lớn gây tiêu tốn tài nguyên.
  if (Buffer.byteLength(password, "utf8") > 1024) {
    throw new Error("ADMIN_PASSWORD must not exceed 1024 bytes");
  }
}

async function seedAdmin(): Promise<void> {
  // 2. Kiểm tra env trước khi import các module phụ thuộc vào nó.
  const mongoUri = process.env.MONGODB_URI;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not defined");
  }

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not defined");
  }

  const email = validateEmail(adminEmail);
  validatePassword(adminPassword);

  // 3. Dynamic imports: bảo đảm env đã được load trước.
  const { connectDB } = await import("../lib/mongodb");
  const { default: AdminUser } = await import("../models/AdminUser");
  const { hashPassword } = await import("../lib/auth/password");

  // 4. Kết nối database.
  await connectDB();

  // 5. Chờ MongoDB hoàn thành việc tạo index.
  await AdminUser.init();

  // 6. Không ghi đè tài khoản nếu admin đã tồn tại.
  const existingAdmin = await AdminUser.findOne({ email })
    .select("_id email role status")
    .lean();

  if (existingAdmin) {
    console.log("Admin account already exists. No changes made.");
    console.log(`Email: ${email}`);
    console.log(`Role: ${existingAdmin.role}`);
    console.log(`Status: ${existingAdmin.status}`);
    return;
  }

  // 7. Hash password trước khi lưu.
  const passwordHash = await hashPassword(adminPassword);

  // 8. Tạo tài khoản admin ban đầu.
  await AdminUser.create({
    email,
    passwordHash,
    role: "admin",
    status: "active",
  });

  console.log("Admin account created successfully.");
  console.log(`Email: ${email}`);
  console.log("Role: admin");
  console.log("Status: active");
  console.log("Password was not printed.");
}

async function main(): Promise<void> {
  try {
    await seedAdmin();
  } catch (error: unknown) {
    console.error(
      "Admin seed failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    process.exitCode = 1;
  } finally {
    // Chỉ disconnect nếu đã có kết nối mongoose.
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void main();