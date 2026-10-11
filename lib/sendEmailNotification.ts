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

interface ConsultationEmailData {
  name: string;
  phone: string;
  note: string;
  createdAt: Date;
}

export async function sendConsultationNotificationEmail(
  consultation: ConsultationEmailData
) {
  const name = escapeHtml(consultation.name);
  const phone = escapeHtml(consultation.phone);
  const note = escapeHtml(
    consultation.note || "Khách chưa cung cấp ghi chú."
  );
  const createdAt = escapeHtml(
    consultation.createdAt.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    })
  );

  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail || !process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY or ADMIN_EMAIL");

      return { success: false };
    }

    const { data, error } = await resend.emails.send({
      from: "Nét Việt Florist <onboarding@resend.dev>",
      to: adminEmail,
      subject: "Nét Việt Florist - Yêu cầu tư vấn mẫu hoa mới",
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;line-height:1.7;max-width:600px">
          <h2 style="color:#4d0d01">
            Yêu cầu tư vấn mẫu hoa mới
          </h2>

          <p>Shop vừa nhận được một yêu cầu tư vấn từ khách hàng.</p>

          <div style="padding:16px;border:1px solid #eee">
            <p><strong>Tên khách hàng:</strong> ${name}</p>
            <p><strong>Số điện thoại / Zalo:</strong> ${phone}</p>
            <p><strong>Yêu cầu tư vấn:</strong><br />
              ${note.replace(/\n/g, "<br />")}
            </p>
            <p><strong>Thời gian gửi:</strong> ${createdAt}</p>
          </div>

          <p>
            Vui lòng liên hệ khách hàng để tư vấn mẫu hoa phù hợp.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND CONSULTATION ERROR:", error);
      return { success: false };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("SEND CONSULTATION EMAIL ERROR:", error);
    return { success: false };
  }
}
