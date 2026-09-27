"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypingText({
  text,
  speed = 70,
  delay = 500,
  className = "",
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[2px] animate-blink bg-[var(--color-primary)]" />
    </span>
  );
}