// models/Lead.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  customerName: string;
  phone: string;
  note?: string;
  productId?: mongoose.Types.ObjectId;
  status: 'new' | 'contacted' | 'completed' | 'cancelled';
  ipAddress: string; // Lưu IP để SOC kiểm tra chống spam
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    note: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed', 'cancelled'],
      default: 'new',
    },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);