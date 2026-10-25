import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imageKey?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "",
    },
    imageKey: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
