/**
 * Joins class names, skipping falsy values.
 * Kept tiny on purpose: components own their class lists, so no merge step is needed.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
