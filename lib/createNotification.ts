import mongoose from "mongoose";
import Notification from "@/models/Notification";

interface CreateNotificationParams {
  title: string;
  message: string;
  type: string;
  orderId?: mongoose.Types.ObjectId;
}

export async function createNotification({
  title,
  message,
  type,
  orderId,
}: CreateNotificationParams) {
  return Notification.create({
    title,
    message,
    type,
    orderId,
    isRead: false,
  });
}