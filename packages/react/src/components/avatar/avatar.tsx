import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends StaticClass<typeof BaseAvatar.Root> {
  size?: AvatarSize;
}

/**
 * Round user image with a fallback. The image loads in the background, and the
 * fallback (initials) shows until it is ready or if it fails.
 *
 * @example
 * <Avatar>
 *   <AvatarImage src={user.photo} alt={user.name} />
 *   <AvatarFallback>{initials(user.name)}</AvatarFallback>
 * </Avatar>
 */
export function Avatar({ size = "md", className, ...props }: AvatarProps) {
  return <BaseAvatar.Root className={cn("eui-avatar", `eui-avatar--${size}`, className)} {...props} />;
}

export function AvatarImage({ className, ...props }: StaticClass<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cn("eui-avatar__image", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: StaticClass<typeof BaseAvatar.Fallback>) {
  return <BaseAvatar.Fallback className={cn("eui-avatar__fallback", className)} {...props} />;
}
