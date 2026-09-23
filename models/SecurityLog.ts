// models/SecurityLog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISecurityLog extends Document {
  eventType: 'SUSPICIOUS_REQUEST' | 'RATE_LIMIT_EXCEEDED' | 'ADMIN_LOGIN' | 'UNAUTHORIZED_ACCESS' | 'BOT_DETECTED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ipAddress: string;
  userAgent?: string;
  endpoint: string;
  details?: Record<string, any>;
  isAlertSent: boolean; // Trạng thái đã bắn tin nhắn Telegram chưa
  createdAt: Date;
}

const SecurityLogSchema = new Schema<ISecurityLog>(
  {
    eventType: {
      type: String,
      required: true,
      enum: ['SUSPICIOUS_REQUEST', 'RATE_LIMIT_EXCEEDED', 'ADMIN_LOGIN', 'UNAUTHORIZED_ACCESS', 'BOT_DETECTED'],
      index: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    },
    ipAddress: { type: String, required: true, index: true },
    userAgent: { type: String },
    endpoint: { type: String, required: true },
    details: { type: Schema.Types.Mixed }, // Lưu thông tin chi tiết dạng JSON
    isAlertSent: { type: Boolean, default: false },
  },
  { 
    timestamps: { createdAt: true, updatedAt: false },
    // Tự động xóa Log cũ sau 30 ngày để nhẹ Database (TTL Index)
    expireAfterSeconds: 30 * 24 * 60 * 60 
  }
);

export default mongoose.models.SecurityLog || mongoose.model<ISecurityLog>('SecurityLog', SecurityLogSchema);