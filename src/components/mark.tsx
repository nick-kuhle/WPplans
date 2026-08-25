export function WolfMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="14" width="26" height="14" rx="2" fill="currentColor" opacity="0.18" />
      <path d="M6 16 L16 5 L26 16 Z" fill="currentColor" />
      <path d="M11 16 L16 9 L21 16 Z" fill="var(--color-bg)" />
      <rect x="13.5" y="18" width="5" height="6" rx="0.5" fill="var(--color-bg)" />
    </svg>
  );
}
