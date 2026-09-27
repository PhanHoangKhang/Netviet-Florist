import { Resend } from "resend";

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
  try {
    const { data, error } = await resend.emails.send({
      from: "Nét Việt Florist <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Nét Việt Florist - Có yêu cầu đặt hoa mới`,

      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2>Đơn hàng mới - ${order.productName}</h2>
            <p><strong>Thông tin khách hàng</strong></p>
            <p>
            Họ tên: ${order.customerName}<br>
            Email: ${order.email}<br>
            Số điện thoại: ${order.phoneNumber}
            </p>

            <p><strong>Thông tin đơn hàng</strong></p>
            <p>
            Sản phẩm: ${order.productName}<br>
            Số lượng: ${order.quantity}<br>
            Dịp tặng: ${order.occasion}<br>
            Ngày giao: ${order.deliveryDate || "Chưa xác định"}<br>
            Địa chỉ giao: ${order.deliveryAddress}<br>
            Ghi chú: ${order.note || "Không có"}<br>
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
