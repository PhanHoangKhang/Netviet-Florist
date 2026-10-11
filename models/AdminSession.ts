import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adminSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    lastSeenAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// MongoDB tự dọn session hết hạn.
// API vẫn phải tự kiểm tra expiresAt khi xác thực.
adminSessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

export type AdminSessionType = InferSchemaType<
  typeof adminSessionSchema
>;

const AdminSession =
  mongoose.models.AdminSession ??
  mongoose.model("AdminSession", adminSessionSchema);

export default AdminSession;
