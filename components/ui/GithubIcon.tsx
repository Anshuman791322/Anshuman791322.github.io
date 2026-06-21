type Props = {
  size?: number | string;
  color?: string;
  variant?: string;
  className?: string;
};

/** Hand-rolled GitHub icon — iconsax-react v0.0.8 has no Github export.
 *  Renders an Octicons-style mark (MIT). API-compatible with iconsax-react
 *  so it slots into <AnimatedIcon> the same way. */
export function GithubIcon({ size = 22, color = "currentColor", className }: Props) {
  const px = typeof size === "number" ? `${size}` : size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6 0-1.2-.4-2.2-1.2-3 .1-.3.5-1.5-.1-3 0 0-1-.3-3.4 1.3a11.4 11.4 0 0 0-6 0C7.4 3.7 6.4 4 6.4 4c-.6 1.5-.2 2.7-.1 3-.8.8-1.2 1.8-1.2 3 0 4.6 2.7 5.7 5.5 6-.4.4-.4.8-.4 1.4V22" />
    </svg>
  );
}
