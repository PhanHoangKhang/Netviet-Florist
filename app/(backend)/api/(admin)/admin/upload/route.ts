import { NextRequest, NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const MAX_WIDTH = 6000;
const MAX_HEIGHT = 6000;

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const ALLOWED_SHARP_FORMATS = [
  "jpeg",
  "png",
  "webp",
] as const;

export async function POST(request: NextRequest) {
  try {
    // ========================================
    // 1. GET FILE
    // ========================================

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy file.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 2. BASIC FILE VALIDATION
    // ========================================

    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "File không hợp lệ.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Ảnh không được vượt quá 5MB.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 3. READ FILE
    // ========================================

    const buffer = Buffer.from(await file.arrayBuffer());

    // ========================================
    // 4. DETECT REAL FILE TYPE
    // DO NOT TRUST file.type
    // ========================================

    const detectedType = await fileTypeFromBuffer(buffer);

    if (
      !detectedType ||
      !ALLOWED_MIME_TYPES.includes(
        detectedType.mime as (typeof ALLOWED_MIME_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Định dạng file không được hỗ trợ. Chỉ chấp nhận JPEG, PNG hoặc WebP.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 5. DECODE IMAGE WITH SHARP
    // ========================================

    let metadata;

    try {
      metadata = await sharp(buffer).metadata();
    } catch (error) {
      console.error("SHARP METADATA ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "File hình ảnh không hợp lệ hoặc bị hỏng.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 6. VERIFY SHARP FORMAT
    // ========================================

    if (
      !metadata.format ||
      !ALLOWED_SHARP_FORMATS.includes(
        metadata.format as (typeof ALLOWED_SHARP_FORMATS)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Định dạng hình ảnh không được hỗ trợ.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 7. VERIFY IMAGE DIMENSIONS
    // ========================================

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        {
          success: false,
          message: "Không thể xác định kích thước hình ảnh.",
        },
        { status: 400 }
      );
    }

    if (
      metadata.width > MAX_WIDTH ||
      metadata.height > MAX_HEIGHT
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Kích thước ảnh không được vượt quá ${MAX_WIDTH}x${MAX_HEIGHT}px.`,
        },
        { status: 400 }
      );
    }

    // ========================================
    // 8. RE-ENCODE IMAGE
    // NEVER UPLOAD ORIGINAL FILE
    // ========================================

    let processedBuffer: Buffer;

    try {
      processedBuffer = await sharp(buffer)
        .rotate()
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 85,
          effort: 4,
        })
        .toBuffer();
    } catch (error) {
      console.error("SHARP PROCESS ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Không thể xử lý hình ảnh.",
        },
        { status: 400 }
      );
    }

    // ========================================
    // 9. UPLOAD PROCESSED IMAGE TO CLOUDINARY
    // ========================================

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "netviet-florist/products",
            resource_type: "image",
            format: "webp",
          },
          (error, uploadResult) => {
            if (error || !uploadResult) {
              reject(
                error ||
                  new Error("Cloudinary upload failed.")
              );

              return;
            }

            resolve({
              secure_url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
            });
          }
        )
        .end(processedBuffer);
    });

    // ========================================
    // 10. RETURN RESULT
    // ========================================

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể upload hình ảnh.",
      },
      { status: 500 }
    );
  }
}