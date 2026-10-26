import "server-only";

import { connectDB } from "@/lib/mongodb";
import AuditLog, {
  type AuditAction,
  type AuditStatus,
} from "@/models/AuditLog";

type AuditChangeInput = {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
};

type WriteAuditLogInput = {
  actorId?: string | null;
  actorEmail: string;
  actorRole?: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  description: string;
  changes?: AuditChangeInput[];
  status: AuditStatus;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
};

const SENSITIVE_FIELD_PATTERN =
  /password|token|secret|authorization|cookie|credential/i;

function sanitizeChanges(changes: AuditChangeInput[] = []) {
  return changes
    .filter((change) => !SENSITIVE_FIELD_PATTERN.test(change.field))
    .map((change) => ({
      field: change.field.slice(0, 150),
      oldValue: sanitizeValue(change.oldValue),
      newValue: sanitizeValue(change.newValue),
    }));
}

function sanitizeValue(value: unknown): unknown {
  if (value === undefined) return undefined;

  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    if (typeof value === "string") {
      return value.slice(0, 1000);
    }

    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.slice(0, 30).map(sanitizeValue);
  }

  // Avoid storing arbitrary request objects or nested documents.
  if (typeof value === "object") {
    return "[object]";
  }

  return String(value).slice(0, 1000);
}

function normalizeIp(ip?: string) {
  if (!ip) return "";

  // Only trust this value if the caller obtained it from a
  // correctly configured, trusted proxy or hosting platform.
  return ip.slice(0, 100);
}

export async function writeAuditLog(input: WriteAuditLogInput) {
  await connectDB();

  const actorId =
    input.actorId && /^[a-f\d]{24}$/i.test(input.actorId)
      ? input.actorId
      : null;

  return AuditLog.create({
    actorId,
    actorEmail: input.actorEmail.slice(0, 254),
    actorRole: input.actorRole?.slice(0, 50) ?? "",
    action: input.action,
    resource: input.resource.slice(0, 100),
    resourceId: input.resourceId?.slice(0, 150) ?? "",
    description: input.description.slice(0, 1000),
    changes: sanitizeChanges(input.changes),
    status: input.status,
    ipAddress: normalizeIp(input.ipAddress),
    userAgent: input.userAgent?.slice(0, 1000) ?? "",
    requestId: input.requestId?.slice(0, 150) ?? "",
  });
}
