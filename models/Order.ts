import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;

  customerName: string;
  email: string;
  phoneNumber: string;

  deliveryAddress: string;
  deliveryDate?: Date;

  occasion: string;
  quantity: number;
  note?: string;

  status:
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },

    deliveryDate: {
      type: Date,
    },

    occasion: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    note: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);