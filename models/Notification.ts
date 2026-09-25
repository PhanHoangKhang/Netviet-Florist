import mongoose, { Schema, Document } from "mongoose";

export type NotificationType =
  | "order"
  | "consultation"
  | "product"
  | "system";

export interface INotification extends Document {
  title: string;
  message: string;
  type: NotificationType;

  // Link đến object liên quan
  referenceId?: mongoose.Types.ObjectId;
  referenceType?: "Order" | "Product";

  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["order", "consultation", "product", "system"],
      required: true,
      index: true,
    },

    referenceId: {
      type: Schema.Types.ObjectId,
      required: false,
    },

    referenceType: {
      type: String,
      enum: ["Order", "Product"],
      required: false,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

NotificationSchema.index({
  createdAt: -1,
});

export default mongoose.models.Notification ||
  mongoose.model<INotification>(
    "Notification",
    NotificationSchema,
  );