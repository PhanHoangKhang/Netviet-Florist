export type CategoryGroup =
  | "topic"
  | "audience"
  | "style"
  | "flower"
  | "color";

export const CATEGORY_GROUPS: { value: CategoryGroup; label: string }[] = [
  { value: "topic", label: "Chủ Đề" },
  { value: "audience", label: "Đối Tượng" },
  { value: "style", label: "Kiểu Dáng" },
  { value: "flower", label: "Hoa Tươi" },
  { value: "color", label: "Màu Sắc" },
];

export interface Category {
  _id: string;
  name: string;
  slug: string;
  group?: CategoryGroup;
}