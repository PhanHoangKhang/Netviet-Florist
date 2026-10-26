
import mongoose, { Document, Schema } from "mongoose";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "ACCESS_DENIED";

export type AuditStatus = "SUCCESS" | "FAILURE";

export interface IAuditChange {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
}

export interface IAuditLog extends Document {
  actorId?: mongoose.Types.ObjectId | null;
  actorEmail: string;
  actorRole?: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  description: string;
  changes: IAuditChange[];
  status: AuditStatus;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  createdAt: Date;
}

const AuditChangeSchema = new Schema<IAuditChange>(
  {
    field: { type: String, required: true },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
  },
  { _id: false },
);

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorId: {
      type: Schema.Types.ObjectId,
      default: null,
      index: true,
    },
    actorEmail: {
      type: String,
      required: true,
      maxlength: 254,
    },
    actorRole: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "ACCESS_DENIED",
      ],
      required: true,
      index: true,
    },
    resource: {
      type: String,
      required: true,
      index: true,
    },
    resourceId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    changes: {
      type: [AuditChangeSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILURE"],
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    requestId: {
      type: String,
      default: "",
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ actorId: 1, createdAt: -1 });
AuditLogSchema.index({ resource: 1, action: 1, createdAt: -1 });

export default
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
