import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adminUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      required: true,
      default: "staff",
    },

    status: {
      type: String,
      enum: ["active", "disabled"],
      required: true,
      default: "active",
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Email phải duy nhất ở database, kể cả khi hai request
// tạo tài khoản xảy ra đồng thời.
adminUserSchema.index({ email: 1 }, { unique: true });

export type AdminUserType = InferSchemaType<
  typeof adminUserSchema
>;

const AdminUser =
  mongoose.models.AdminUser ??
  mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
