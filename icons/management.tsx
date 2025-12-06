import type { SVGProps } from 'react';

export function ManagementIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
        {/* Gear background */}
        <g opacity="0.6">
          <circle cx="256" cy="140" r="60"/>
          <circle cx="256" cy="140" r="30"/>
          <rect x="244" y="40" width="24" height="40" rx="6"/>
          <rect x="244" y="200" width="24" height="40" rx="6"/>
          <rect x="156" y="128" width="40" height="24" rx="6"/>
          <rect x="316" y="128" width="40" height="24" rx="6"/>
          <g transform="rotate(45 256 140)">
            <rect x="244" y="40" width="24" height="40" rx="6"/>
            <rect x="244" y="200" width="24" height="40" rx="6"/>
          </g>
          <g transform="rotate(-45 256 140)">
            <rect x="244" y="40" width="24" height="40" rx="6"/>
            <rect x="244" y="200" width="24" height="40" rx="6"/>
          </g>
        </g>
        
        {/* Three people */}
        {/* Left person */}
        <circle cx="140" cy="280" r="40"/>
        <path d="M 80 440 Q 80 340 140 340 Q 200 340 200 440 L 80 440 Z"/>
        
        {/* Center person (with tie) */}
        <circle cx="256" cy="280" r="40"/>
        <path d="M 196 440 Q 196 340 256 340 Q 316 340 316 440 L 196 440 Z"/>
        <path d="M 256 320 L 246 360 L 256 400 L 266 360 Z" fill="currentColor"/>
        
        {/* Right person */}
        <circle cx="372" cy="280" r="40"/>
        <path d="M 312 440 Q 312 340 372 340 Q 432 340 432 440 L 312 440 Z"/>
      </g>
    </svg>
  );
}
