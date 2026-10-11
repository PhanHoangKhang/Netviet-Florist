import "server-only";

import { createHash, randomBytes } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import AdminSession from "@/models/AdminSession";
import AdminUser from "@/models/AdminUser";

const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Host-netviet-admin-session"
    : "netviet-admin-session";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export async function createAdminSession(userId: string) {
  await connectDB();

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(
    Date.now() + SESSION_TTL_SECONDS * 1000,
  );

  await AdminSession.create({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  return { token, expiresAt };
}

export async function getAdminFromRequest(request: NextRequest) {
  await connectDB();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token || token.length > 100) {
    return null;
  }

  const session = await AdminSession.findOne({
    tokenHash: hashToken(token),
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).select("userId expiresAt");

  if (!session) {
    return null;
  }

  const admin = await AdminUser.findOne({
    _id: session.userId,
    status: "active",
  }).select("_id email role status");

  if (!admin) {
    return null;
  }

  return {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  };
}

export async function revokeAdminSession(token: string): Promise<void> {
  if (!token || token.length > 100) {
    return;
  }

  await connectDB();

  await AdminSession.updateOne(
    {
      tokenHash: hashToken(token),
      revokedAt: null,
    },
    {
      $set: { revokedAt: new Date() },
    },
  );
}

export function setAdminSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: Date,
): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export function clearAdminSessionCookie(
  response: NextResponse,
): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}