import type { SVGProps } from 'react';

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M11.2 2.75c.24 0 .48.02.72.05a8.5 8.5 0 0 0 8.78 13.54A8.5 8.5 0 1 1 11.2 2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
