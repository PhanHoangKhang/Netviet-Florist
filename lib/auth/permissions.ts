import "server-only";

export type AdminRole = "admin" | "staff";

export type AdminPermission =
  | "products:read"
  | "products:create"
  | "products:update"
  | "products:delete"
  | "categories:read"
  | "categories:manage"
  | "consultations:read"
  | "consultations:manage"
  | "orders:read"
  | "orders:update"
  | "orders:manage"
  | "notifications:read"
  | "upload:create"
  | "users:manage";

const ALL_PERMISSIONS: readonly AdminPermission[] = [
  "products:read",
  "products:create",
  "products:update",
  "products:delete",
  "categories:read",
  "categories:manage",
  "consultations:read",
  "consultations:manage",
  "orders:read",
  "orders:update",
  "orders:manage",
  "notifications:read",
  "upload:create",
  "users:manage",
];

const ROLE_PERMISSIONS: Record<
  AdminRole,
  readonly AdminPermission[]
> = {
  admin: ALL_PERMISSIONS,

  staff: [
    "products:read",
    "products:create",
    "products:update",
    "categories:read",
    "consultations:read",
    "consultations:manage",
    "orders:read",
    "orders:update",
    "notifications:read",
    "upload:create",
  ],
};

export function hasPermission(
  role: string,
  permission: AdminPermission,
): boolean {
  if (role !== "admin" && role !== "staff") {
    return false;
  }

  return ROLE_PERMISSIONS[role].includes(permission);
}