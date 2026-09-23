// models/AdminUser.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
  role: 'superadmin' | 'editor';
  lastLoginAt?: Date;
  lastLoginIp?: string;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);