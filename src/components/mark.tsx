export function WolfMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <polygon
        points="16,1.6 27.4,6.2 30.4,16 27.4,25.8 16,30.4 4.6,25.8 1.6,16 4.6,6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <polygon
        points="16,5.4 24.4,8.9 26.8,16 24.4,23.1 16,26.6 7.6,23.1 5.2,16 7.6,8.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        fill="currentColor"
        d="M11.1 12.1 13.4 7.4 16 10.8 18.6 7.4 20.9 12.1 19.6 17.2 16 22.2 12.4 17.2Z"
      />
      <path fill="var(--color-bg)" d="M13.7 15.4 16 19.2 18.3 15.4Z" />
    </svg>
  );
}
