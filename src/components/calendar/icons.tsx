type IconProps = {
  className?: string;
};

const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
};

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M10 3.5 5.5 8l4.5 4.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="2" y="3.25" width="12" height="10.75" rx="2" />
      <path d="M2 6.5h12" />
      <path d="M5.5 1.75v3M10.5 1.75v3" />
    </svg>
  );
}
