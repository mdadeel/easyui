import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export interface AspectRatioProps extends ComponentPropsWithoutRef<"div"> {
  /** Width divided by height. 16 / 9 for video, 1 for square, 4 / 3 for photos. */
  ratio?: number;
}

/** Keeps a box at a fixed shape while its content scales. Use it for images and video. */
export function AspectRatio({ ratio = 16 / 9, className, style, ...props }: AspectRatioProps) {
  const merged: CSSProperties = { aspectRatio: String(ratio), ...style };
  return <div className={cn("eui-aspect-ratio", className)} style={merged} {...props} />;
}
