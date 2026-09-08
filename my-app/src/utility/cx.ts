// Tiny reusable className joiner — filters out falsy values.
// Usage: cx(styles.card, isActive && styles.active)
// you can use clsx library ..

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export default cx;
