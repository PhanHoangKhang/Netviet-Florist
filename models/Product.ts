import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;

  // Một sản phẩm có thể thuộc nhiều Category
  categoryIds: mongoose.Types.ObjectId[];

  images: string[];
  isFeatured: boolean;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageKeys?: string[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
    },

    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],

    images: [
      {
        type: String,
        required: true,
      },
    ],

    imageKeys: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index hỗ trợ lọc sản phẩm theo Category
ProductSchema.index({ categoryIds: 1 });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);