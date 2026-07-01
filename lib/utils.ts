import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Domain } from "@/lib/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Colour + label styling per project domain, for badges and accents.
export const domainStyles: Record<
  Domain,
  { label: string; text: string; bg: string; dot: string }
> = {
  GenAI: {
    label: "GenAI",
    text: "text-[#4f46e5]",
    bg: "bg-[#eef2ff] border-[#c7d2fe]",
    dot: "bg-[#4f46e5]",
  },
  "Full-Stack": {
    label: "Full-Stack",
    text: "text-[#059669]",
    bg: "bg-[#ecfdf5] border-[#a7f3d0]",
    dot: "bg-[#059669]",
  },
  "ML / DL": {
    label: "ML / DL",
    text: "text-[#d97706]",
    bg: "bg-[#fffbeb] border-[#fde68a]",
    dot: "bg-[#d97706]",
  },
  Web3: {
    label: "Web3",
    text: "text-[#c026d3]",
    bg: "bg-[#fdf4ff] border-[#f5d0fe]",
    dot: "bg-[#c026d3]",
  },
  Systems: {
    label: "Systems",
    text: "text-[#0284c7]",
    bg: "bg-[#f0f9ff] border-[#bae6fd]",
    dot: "bg-[#0284c7]",
  },
};
