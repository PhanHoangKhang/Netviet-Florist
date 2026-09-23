import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  phone: string;
  address?: string;
  note?: string;

  productId?: mongoose.Types.ObjectId;

  status: "pending" | "contacted" | "confirmed" | "completed" | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "contacted",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);