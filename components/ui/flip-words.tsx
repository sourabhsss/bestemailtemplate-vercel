"use client";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    // After exit animation completes, switch word and enter
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setIsAnimating(false);
    }, 400);
  }, [words.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, duration);
    return () => clearTimeout(timer);
  }, [currentIndex, isAnimating, duration, startAnimation]);

  return (
    <span
      className={cn(
        "inline-block relative overflow-hidden align-bottom px-2",
        className
      )}
      style={{ minWidth: "5ch" }}
    >
      <span
        className={cn(
          "inline-block transition-all duration-400 ease-in-out",
          isAnimating
            ? "opacity-0 -translate-y-4 scale-105 blur-xs"
            : "opacity-100 translate-y-0 scale-100 blur-0"
        )}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};
