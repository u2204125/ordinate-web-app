import type { SVGProps } from 'react';

export function IntegrationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...props}
    >
      <g fill="currentColor">
        {/* Browser window */}
        <rect x="8" y="32" width="424" height="320" rx="16" fill="none" stroke="currentColor" strokeWidth="24"/>
        <line x1="8" y1="96" x2="432" y2="96" stroke="currentColor" strokeWidth="24"/>
        <circle cx="56" cy="64" r="8" fill="currentColor"/>
        <circle cx="88" cy="64" r="8" fill="currentColor"/>
        <circle cx="120" cy="64" r="8" fill="currentColor"/>
        
        {/* Code symbols */}
        <text x="32" y="160" fontSize="48" fontFamily="monospace" fill="currentColor">&lt;-&gt;</text>
        <line x1="60" y1="200" x2="180" y2="200" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
        <line x1="60" y1="240" x2="160" y2="240" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
        <line x1="60" y1="280" x2="200" y2="280" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
        
        {/* Gear icon */}
        <g transform="translate(320, 240)">
          <circle cx="0" cy="0" r="40" fill="currentColor"/>
          <circle cx="0" cy="0" r="20" fill="none" stroke="#000" strokeWidth="8"/>
          <rect x="-8" y="-60" width="16" height="24" rx="4" fill="currentColor"/>
          <rect x="-8" y="36" width="16" height="24" rx="4" fill="currentColor"/>
          <rect x="-60" y="-8" width="24" height="16" rx="4" fill="currentColor"/>
          <rect x="36" y="-8" width="24" height="16" rx="4" fill="currentColor"/>
          <rect x="-46" y="-46" width="16" height="24" rx="4" fill="currentColor" transform="rotate(-45)"/>
          <rect x="30" y="30" width="16" height="24" rx="4" fill="currentColor" transform="rotate(-45)"/>
          <rect x="30" y="-46" width="16" height="24" rx="4" fill="currentColor" transform="rotate(45)"/>
          <rect x="-46" y="30" width="16" height="24" rx="4" fill="currentColor" transform="rotate(45)"/>
        </g>
      </g>
    </svg>
  );
}
