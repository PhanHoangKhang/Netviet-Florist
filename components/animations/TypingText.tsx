"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  pause?: number;
  className?: string;
}

export default function TypingText({
  text,
  speed = 65,
  deleteSpeed = 35,
  delay = 700,
  pause = 2000,
  className = "",
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Bắt đầu typing sau delay
    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(
          text.slice(0, displayedText.length + 1)
        );
      }, speed);
    }

    // Gõ xong → chờ một chút rồi bắt đầu xóa
    else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    }

    // Đang xóa
    else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(
          text.slice(0, displayedText.length - 1)
        );
      }, deleteSpeed);
    }

    // Xóa xong → bắt đầu typing lại
    else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    text,
    speed,
    deleteSpeed,
    delay,
    pause,
  ]);

  return (
    <span className={className}>
      {displayedText}
      <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[2px] animate-blink bg-[var(--color-primary)]" />
    </span>
  );
}