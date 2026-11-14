export type CategoryGroup =
  | "topic"
  | "audience"
  | "style"
  | "flower"
  | "color";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  group?: CategoryGroup;
}