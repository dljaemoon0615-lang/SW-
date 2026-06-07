/** 손잡기 브랜드 마크 — 48×48 viewBox 공용 */
export function BrandHandsGraphic({ gradId = "nmg-grad" }: { gradId?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="4" y1="44" x2="44" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${gradId})`} />
      <g fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 33 C10.8 29.5 11 24.8 14.2 21.8" />
        <path d="M14.2 21.8 C15.5 18.5 17.8 17.2 19.6 18.8" />
        <path d="M19.6 18.8 L19.6 14.8" />
        <path d="M21.4 19.5 L21.4 15.2" />
        <path d="M23.2 20.2 L23.2 16" />
        <path d="M14.2 21.8 L12.8 25.5" />
        <path d="M35.5 33 C37.2 29.5 37 24.8 33.8 21.8" />
        <path d="M33.8 21.8 C32.5 18.5 30.2 17.2 28.4 18.8" />
        <path d="M28.4 18.8 L28.4 14.8" />
        <path d="M26.6 19.5 L26.6 15.2" />
        <path d="M24.8 20.2 L24.8 16" />
        <path d="M33.8 21.8 L35.2 25.5" />
        <path d="M19.6 18.8 C21.8 16.8 26.2 16.8 28.4 18.8" />
      </g>
      <circle cx="24" cy="18.5" r="2.2" fill="white" />
    </>
  );
}
