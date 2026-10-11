
import mongoose, { Schema, Document } from "mongoose";

export type ConsultationStatus =
  | "new"
  | "contacted"
  | "closed";

export interface IConsultation extends Document {
  name: string;
  phone: string;
  note: string;
  status: ConsultationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    note: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ConsultationSchema.index({ createdAt: -1 });

export default mongoose.models.Consultation ||
  mongoose.model<IConsultation>(
    "Consultation",
    ConsultationSchema
  );
