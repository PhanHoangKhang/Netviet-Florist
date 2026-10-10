"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      duration={3000}
      closeButton
      richColors={false}
      expand={false}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast: "border border-gray-200 shadow-sm",
          title: "text-sm font-medium",
          description: "text-xs",
        },
      }}
    />
  );
}
