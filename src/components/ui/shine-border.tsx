
"use client"

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  gradient?: string;
};

export const ShineBorder = ({
  children,
  className,
  borderWidth = 2,
  duration = 8,
  gradient = "from-blue-500 via-primary to-teal-400",
}: ShineBorderProps) => {
  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden group", className)}
      style={{ padding: borderWidth }}
    >
      {/* Animated Gradient Layer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute -inset-[100%] blur-sm animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradient
          )}
          style={{ 
            animationDuration: `${duration}s`,
            backgroundImage: `conic-gradient(from 0deg, transparent, currentColor, transparent)`
          }}
        />
        {/* Fallback persistent subtle border for non-hover */}
        <div className="absolute inset-0 rounded-2xl border border-slate-100 group-hover:border-transparent transition-colors" />
      </div>

      {/* Content Layer */}
      <div className="relative rounded-2xl bg-white h-full">
        {children}
      </div>
    </div>
  );
};
