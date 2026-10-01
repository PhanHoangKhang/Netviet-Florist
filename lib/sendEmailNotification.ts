import { Resend } from "resend";
import { escapeHtml } from "./escapeHtml";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  customerName: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  deliveryDate?: string | null;
  occasion: string;
  quantity: number;
  note?: string;
  status: string;
  productName: string;
}

export async function sendOrderNotificationEmail(order: OrderEmailData) {
  const customerName = escapeHtml(order.customerName);
  const email = escapeHtml(order.email);
  const phoneNumber = escapeHtml(order.phoneNumber);
  const deliveryAddress = escapeHtml(order.deliveryAddress);
  const deliveryDate = escapeHtml(order.deliveryDate || "Chưa xác định");
  const occasion = escapeHtml(order.occasion);
  const quantity = escapeHtml(order.quantity);
  const note = escapeHtml(order.note || "Không có");
  const productName = escapeHtml(order.productName);

  try {
    const { data, error } = await resend.emails.send({
      from: "Nét Việt Florist <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Nét Việt Florist - Có yêu cầu đặt hoa mới`,

      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2>Đơn hàng mới - ${productName}</h2>

            <p><strong>Thông tin khách hàng</strong></p>

            <p>
            Họ tên: ${customerName}<br>
            Email: ${email}<br>
            Số điện thoại: ${phoneNumber}<br>
            </p>

            <p><strong>Thông tin đơn hàng</strong></p>

            <p>
            Sản phẩm: ${productName}<br>
            Số lượng: ${quantity}<br>
            Dịp tặng: ${occasion}<br>
            Ngày giao: ${deliveryDate}<br>
            Địa chỉ giao: ${deliveryAddress}<br>
            Ghi chú: ${note}<br>
            </p>
        </div>
    `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return {
        success: false,
        error,
      };
    }

    console.log("EMAIL SENT:", data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("SEND ORDER EMAIL ERROR:", error);

    return {
      success: false,
      error,
    };
  }
}
