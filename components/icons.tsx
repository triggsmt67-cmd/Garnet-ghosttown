type IconProps = React.SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Compass(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" />
      <path d="m29.5 18.5-3.2 7.8-7.8 3.2 3.2-7.8 7.8-3.2Z" stroke="currentColor" />
      <path d="M24 3v4M24 41v4M3 24h4M41 24h4" stroke="currentColor" />
    </svg>
  );
}

export function Mountain(props: IconProps) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" {...props}>
      <path d="m2 38 18-27 8 12L39 5l23 33H2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="m15.5 18 4.5 2.5 4-3.5M34.5 12l4.5 3 5-3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M38.5 8.5C23 9 12.7 15.3 11 27.2c-1.1 7.7 4.2 12.8 10.4 12.3C33.5 38.6 39.4 25 38.5 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8.5 40C16 31.5 23 25 33.5 18.5M19 29c4 .5 7.2 2 9.7 4.1M22.2 26.1c-.4-3.4.2-6.8 1.8-9.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Flame(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M25.8 4.5c1.4 7-1.3 10.4-4.1 13.9-2.2 2.8-4.5 5.7-4.5 10.3 0 3.1 1.9 5.4 4.4 6.6-.7-4.2 1.8-6.8 4.4-9.4 1.7 2.4 4.8 5.6 4.8 10.1 3.4-2.2 5.7-6.1 5.7-10.6 0-7.7-4.5-14.8-10.7-20.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M21.6 35.3c0 4.6 3.5 7.2 7 7.2 3.8 0 7.9-2.9 7.9-8.6 0-2.8-.9-5.7-2.4-8.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
