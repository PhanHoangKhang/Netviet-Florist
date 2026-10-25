import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  imageKey?: string;
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
  },
  { timestamps: true },
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
