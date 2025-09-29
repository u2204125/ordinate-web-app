import type { SVGProps } from 'react';

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.75V4.5M12 19.5v1.75M4.5 12H2.75M21.25 12H19.5M5.636 5.636l-1.237-1.237M19.6 19.6l-1.237-1.236M18.364 5.636l1.237-1.237M5.636 18.364l-1.237 1.237"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
