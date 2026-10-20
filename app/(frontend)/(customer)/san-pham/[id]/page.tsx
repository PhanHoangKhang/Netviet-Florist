"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  Truck,
  Camera,
  ChevronRight,
} from "lucide-react";

import ProductSlider from "@/components/ProductSlider";
import ProductOrderForm from "@/components/ProductOrderForm";
import ContactSection from "@/components/ContactSection";

import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/products/${encodeURIComponent(slug)}`,
        );

        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.message || "Không tìm thấy sản phẩm");
        }

        const currentProduct: Product = result.data;

        setProduct(currentProduct);
        setSelectedImageIndex(0);

        const categorySlug = currentProduct.categoryId?.slug;

        if (categorySlug) {
          const relatedResponse = await fetch(
            `/api/products?category=${encodeURIComponent(categorySlug)}&limit=20`,
          );

          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json();

            if (relatedResult.success) {
              setRelatedProducts(
                relatedResult.data.filter(
                  (item: Product) => item._id !== currentProduct._id,
                ),
              );
            }
          }
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error("FETCH PRODUCT DETAIL ERROR:", err);

        setError(err instanceof Error ? err.message : "Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] px-4 py-32 text-center">
        <p className="text-sm text-black">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] px-4 py-24 text-center">
        <h2 className="text-xl font-medium text-[var(--color-primary)]">
          Không tìm thấy sản phẩm
        </h2>

        <p className="mt-3 text-sm text-black">
          {error ||
            "Mẫu hoa này có thể đã ngừng cung cấp hoặc đường dẫn không chính xác."}
        </p>

        <Link
          href="/san-pham"
          className="mt-6 inline-flex items-center gap-2 border border-[var(--color-primary)] px-5 py-3 text-sm text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại sản phẩm
        </Link>
      </div>
    );
  }

  const productImages =
    product.images?.filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    ) ?? [];

  const galleryImages =
    productImages.length > 0 ? productImages : ["/images/placeholder.jpg"];

  const productImage =
    galleryImages[Math.min(selectedImageIndex, galleryImages.length - 1)];

  const scrollToOrderForm = () => {
    document.getElementById("dat-hoa")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen text-[var(--foreground)]">
      <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-xs text-black"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Trang chủ
          </Link>

          <ChevronRight className="h-3 w-3" />

          <Link
            href="/san-pham"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Sản phẩm
          </Link>

          <ChevronRight className="h-3 w-3" />

          <span className="text-[var(--color-primary)]">
            {product.categoryId?.name || "Hoa tươi"}
          </span>
        </nav>

        {/* Product overview */}
        <section className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Product gallery */}
          <div className="min-w-0">
            <div className="flex min-h-[300px] items-center justify-center sm:min-h-[400px] lg:min-h-[460px]">
              <img
                key={productImage}
                src={productImage}
                alt={product.name}
                fetchPriority="high"
                className="max-h-[300px] w-auto max-w-[90%] object-contain sm:max-h-[400px] lg:max-h-[460px]"
              />
            </div>

            {galleryImages.length > 1 && (
              <div
                className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5"
                aria-label="Các ảnh sản phẩm"
              >
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Xem ảnh ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`aspect-square overflow-hidden border bg-[var(--color-bg-light)] transition-colors ${
                      selectedImageIndex === index
                        ? "border-[var(--color-primary)]"
                        : "border-black/10 hover:border-[var(--color-primary-hover)]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ảnh ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-3 text-center text-[11px] tracking-wide text-black">
              NÉT VIỆT FLORIST · HOA TƯƠI PHAN THIẾT
            </p>
          </div>

          {/* Product information */}
          <div className="flex min-w-0 flex-col pt-1 lg:py-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-primary-hover)]">
              {product.categoryId?.name || "Hoa tươi"}
            </p>

            <h1 className="mt-4 text-2xl font-medium leading-snug tracking-tight text-[var(--color-text-main)] sm:text-3xl lg:text-[38px]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-5 border-b border-black/15 pb-6">
              <p className="text-xl font-medium text-[var(--color-primary)]">
                Liên hệ báo giá
              </p>

              <p className="mt-2 text-sm leading-6 text-black">
                Giá sản phẩm có thể thay đổi tùy theo loại hoa, kích thước và
                yêu cầu thiết kế.
              </p>
            </div>

            {/* Short introduction */}
            <div className="py-6">
              <p className="text-sm leading-7 text-black">
                Mỗi mẫu hoa tại Nét Việt Florist được chăm chút trong từng chi
                tiết, phù hợp để gửi trao tình cảm và lưu giữ những khoảnh khắc
                ý nghĩa.
              </p>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--color-primary)]" />

                  <div>
                    <p className="text-sm font-medium text-black">
                      Chăm chút từng mẫu hoa
                    </p>
                    <p className="mt-1 text-xs leading-5 text-black">
                      Lựa chọn hoa và phối màu phù hợp với từng dịp tặng.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--color-primary)]" />

                  <div>
                    <p className="text-sm font-medium text-black">
                      Giao hoa tại Phan Thiết
                    </p>
                    <p className="mt-1 text-xs leading-5 text-black">
                      Trao đổi trước về thời gian và địa điểm giao hoa.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Camera className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--color-primary)]" />

                  <div>
                    <p className="text-sm font-medium text-black">
                      Tư vấn theo yêu cầu
                    </p>
                    <p className="mt-1 text-xs leading-5 text-black">
                      Có thể trao đổi về màu sắc, kiểu dáng và ngân sách.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-auto border-t border-black/15 pt-6">
              <button
                type="button"
                onClick={scrollToOrderForm}
                className="flex w-full flex-col items-center justify-center bg-[var(--color-primary)] px-5 py-4 text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="text-sm font-medium tracking-wide">
                  ĐẶT MẪU HOA NÀY
                </span>

                <span className="mt-1 text-xs text-white">
                  Để lại thông tin, shop sẽ liên hệ xác nhận
                </span>
              </button>

              <a
                href="tel:0933660399"
                className="mt-3 flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] px-5 py-3.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <Phone className="h-4 w-4" />
                Gọi tư vấn: 0933 660 399
              </a>

              <a
                href="https://www.facebook.com/nguoilamhoa/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 border border-[#1877F2] bg-transparent px-5 py-3.5 text-sm font-medium text-black transition-colors hover:bg-[#EFF6FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
              >
                <img
                  src="/fb.png"
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 object-contain"
                />
                Liên hệ Fanpage
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-black">
                Chưa cần thanh toán · Xác nhận trực tiếp với shop
              </p>
            </div>
          </div>
        </section>

        {/* Product description */}
        <section className="mt-14 border-t border-black/15 pt-8 sm:mt-20 sm:pt-10">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary-hover)]">
                Chi tiết sản phẩm
              </p>

              <h2 className="mt-3 text-xl font-medium text-[var(--color-text-main)]">
                Mô tả
              </h2>
            </div>

            <div className="max-w-4xl">
              <p className="whitespace-pre-line text-sm leading-7 text-black">
                {product.description ||
                  `Mỗi mẫu hoa tại Nét Việt Florist được thiết kế tỉ mỉ, chú trọng sự hài hòa về màu sắc và kiểu dáng.

Sản phẩm phù hợp cho những dịp tặng hoa, chúc mừng, sinh nhật hoặc các sự kiện đặc biệt. Bạn có thể liên hệ shop để được tư vấn mẫu hoa phù hợp với nhu cầu và ngân sách.

Do đặc tính của hoa tươi, một số loại hoa có thể được thay thế bằng hoa tương đương tùy theo tình trạng thực tế. Shop sẽ trao đổi và xác nhận với bạn trước khi thực hiện.`}
              </p>
            </div>
          </div>
        </section>

        {/* Order form */}
        <section
          id="dat-hoa"
          className="mt-14 scroll-mt-24 border-t border-black/15 pt-10 sm:mt-20 sm:pt-12"
        >
          <div className="mb-8 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-primary-hover)]">
              Đặt hoa theo yêu cầu
            </p>

            <h2 className="mt-3 text-2xl font-medium text-[var(--color-text-main)] sm:text-3xl">
              Để shop giúp bạn chuẩn bị một món quà ý nghĩa
            </h2>

            <p className="mt-3 text-sm leading-7 text-black">
              Điền thông tin bên dưới để shop liên hệ tư vấn, xác nhận mẫu hoa,
              giá và thời gian giao hàng.
            </p>
          </div>

          <ProductOrderForm product={product} />
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 border-t border-black/15 pt-10 sm:mt-20 sm:pt-12">
            <ProductSlider
              title="Mẫu hoa cùng danh mục"
              subtitle="Khám phá thêm những thiết kế phù hợp với bạn."
              products={relatedProducts}
            />
          </section>
        )}
      </div>

      <ContactSection />
    </main>
  );
}
