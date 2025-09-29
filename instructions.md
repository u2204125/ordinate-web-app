You are a senior Next.js latest (App Router) engineer and motion designer. Build a production-grade, accessible, high-performance landing site for “Ordinate,” a web-app studio.

Brand and theme

Name: Ordinate
Tagline (exact): The Framework for Certainity
Vibe: technical, precise, neon/tech accent
Logo: transparent SVG with cursive italic O, small x-axis, upward y-axis, colored origin dot (provided as /public/logo-ordinate.svg)
Colors (CSS variables):
--ink: #0F1115
--cloud: #F6F7F9
--cyan: #00D1FF
--graphite: #2A2F36
Typography: Inter (headings 600, tight tracking; body 400)
Tech stack and constraints

Next.js latest App Router, TypeScript, Tailwind CSS
Animations: Framer Motion (dynamically imported where heavy), CSS keyframes, IntersectionObserver
Smooth scrolling: native CSS scroll-behavior: smooth + JS offset handling for sticky header
Keep first load JS under ~90kb despite animations; code-split motion-heavy sections
A11y: WCAG AA, keyboard operable, focus visible, prefers-reduced-motion respected
Project structure

/app
layout.tsx, page.tsx, globals.css
/icons (inline SVG React components)
/lib (hooks, animation utils)
/components (Navbar, sections, UI primitives)
/styles/tokens.css (CSS variables)
/public
logo-ordinate.svg (see asset spec below)
hero-bg.mp4, hero-bg.webm, hero-bg.jpg (poster)
Tooling: ESLint/Prettier, basic vitest/RTL tests for key interactions
Global behavior

Sticky header with anchor aware offset (scrollMarginTop on each section)
Smooth scrolling to anchors with hash updates
Theme toggle: light/dark; persisted in localStorage; prefers-color-scheme default; accessible switch
Reduced motion: disable non-essential motion, swap parallax/complex tweens for fades
Sections and interactions
IDs (for anchor links): #hero, #about, #services, #reviews, #contact

Navbar (sticky)

Layout: logo left, nav links right: About, Services, Reviews, Contact, then theme toggle
Smooth scroll to section on click; set focus to section heading for a11y
Active link highlight based on current section (IntersectionObserver)
Mobile:
Replace links with a 3-line button (hamburger) at md breakpoint and below
Right-side drawer slides in (from right to left) on open; closes on link click or Esc
Drawer is focus-trapped; background inert; aria-modal, role="dialog"
Implementation notes:
Use a Headroom-like hide-on-scroll-down, show-on-scroll-up behavior (optional)
Provide <Skip to content> link for screen readers
Hero section (full viewport height)

Background: looping muted video (hero-bg.mp4/webm); poster image; lazy load; pause if prefers-reduced-data
Center content: big changing heading + small sub-title beneath; both use a hacker text-scramble animation
Headline cycle examples (editable):
Build fast. Launch clean.
Reliable by design.
From order to outcomes.
Subtitle is the tagline: “The Framework for Certainity”
Text scramble effect:
Per-character scramble using requestAnimationFrame; random glyphs set then resolve to target string
Cycle phrases every 3–4s; do not restart while a scramble is resolving
Hook: useScramble({ phrases, speed, charset, delay })
Arrow-down indicator:
Center-bottom bouncing arrow; clicking scrolls to #about
Hidden if prefers-reduced-motion
Responsiveness:
Clamp font sizes with clamp(); maintain 80–90vh on small screens, 100vh on larger
Ensure color contrast AA over video; add a subtle gradient overlay if needed
About section (two columns, interactive)

Layout (desktop): left column = sub-section list; right column = content panel
Behavior:
On first scroll-landing, individual sub-section items slide in from left one by one (50ms stagger)
Click/keyboard-select a sub-section to update the right content (image/text); right content crossfades/slides
Auto-advance: selected sub-section rotates every 6–8s; pauses on user interaction; resumes after inactivity
Content model:
An array of items, e.g., Strategy, Design System, Architecture, Delivery, Warranty
Each item has: id, title, short copy (80–120 chars), image/src or illustration component
Accessibility:
Left list as a roving-tabindex listbox or tabs; right panel as tabpanel; aria-selected/aria-controls
Mobile:
Orientation flips to rows; right (content) becomes upper row; left (list) becomes bottom row; maintain auto-advance
Services section (two columns; right is a half-circle selector)

Right column: semi-circular carousel with 4 items: Web-application, App development, Marketing, AI Integration
Show 3 at a time on the arc; active item always in the middle
On selecting a non-active item, the arc rotates until that item is centered; outgoing item exits, new item enters (loop)
Items stay upright while moving along arc (counter-rotate to keep label orientation)
Upward-facing arc on mobile
Arc math (implement as a utility):
Given items N=4, visible=3, radius R (responsive), center C
Map logical positions [-1, 0, +1] to angles θ = [-45°, 0°, +45°] (tweakable)
For index i: x = Cx + Rcos(θi), y = Cy - Rsin(θi)
Apply transform: translate(x,y) rotate(-θi) scale(…for depth if desired)
Left column: content animations driven by selected service
Web-application: a folded laptop slides/rotates in from left; lid opens; a web UI appears and auto-scrolls
App development: an iPhone slides up from bottom; app screen appears and auto-scrolls
Marketing: chart + two loudhailers fade in; chart animates upward trend; mics start outward then rotate inward
AI Integration: robotic hand touches a hologram; network links radiate from touch point
On service change: previous animation plays in reverse (rollback); after a short delay (300–500ms), new animation enters (prevent overlap)
Implementation notes:
Use inline SVG for the laptop/phone/chart/mics/hand/hologram; animate with Framer Motion (path/transform)
Provide lightweight placeholder imagery if final art is not ready; keep assets under 200kb total
State machine per service (enter, active, exit) to prevent overlapping animations
Accessibility:
Right arc: role="tablist" with buttons; keyboard left/right to rotate; Enter to activate center
Provide a non-animated list fallback when prefers-reduced-motion
Reviews section (two columns; pinned shuffle)

Layout: left column = section title + subtitle; right column = stacked review cards
Right column background: soft gradient that changes to match top card’s theme color
On scroll-landing:
Left text slides in from right
Review cards “fly in” from random off-screen positions and stack with subtle rotation (clip-path or transform)
Scroll interaction (pinned):
While the page is in this section, overall page scroll pauses (position: sticky container)
Each scroll “step” moves the top card to the back (shuffle), bringing the next card forward
After all cards cycle once, release the page to continue scrolling
Reverse behavior on upward scroll
Implementation approach:
Use Framer Motion’s useScroll + position: sticky; compute progress → currentIndex
Cards array with properties: name, avatar, rating, quote, color
While in view, update CSS variable --review-bg to top card’s color; gradient background reads it
Accessibility:
Provide “Next review” and “Previous review” buttons for keyboard/screen readers
Motion reduced: cards fade/stack without flying
Contact section

Content: big heading, small subtitle, and a main button
Primary CTA: opens default mail client via mailto: softnetsolutionsbd@gmail.com with subject/body presets
Provide quick links for popular web mailers in a small row beneath:
Gmail: https://mail.google.com/mail/?view=cm&fs=1&to=softnetsolutionsbd@gmail.com
Outlook: https://outlook.live.com/owa/?path=/mail/action/compose&to=softnetsolutionsbd@gmail.com
Yahoo: https://compose.mail.yahoo.com/?to=softnetsolutionsbd@gmail.com
Include a secondary “Copy email” button with toast confirmation
Footer

Standard footer styled to match theme; include:
Logo (small), nav links, social icons (inline SVG), copyright
Theme-aware background; high-contrast text
Back-to-top button (smooth scroll)
Assets

/public/logo-ordinate.svg — use this exact transparent SVG (inline wherever possible):
<svg width="340" height="240" viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc"> <title id="title">Ordinate logo</title> <desc id="desc">Cursive O with top flourish, small x-axis, upward y-axis, colored origin. Transparent background.</desc> <defs> <style> :root { color-scheme: light dark; } .ink { stroke: currentColor; fill: none; } .axis { stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; } .o { stroke: currentColor; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; fill: none; } .flourish { stroke: currentColor; stroke-width: 7; stroke-linecap: round; fill: none; } .origin { fill: #00D1FF; } </style> <marker id="arrowUp" viewBox="0 0 10 10" refX="6.5" refY="5" markerWidth="6" markerHeight="6" orient="auto"> <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/> </marker> <marker id="arrowRight" viewBox="0 0 10 10" refX="6.5" refY="5" markerWidth="6" markerHeight="6" orient="auto"> <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/> </marker> </defs> <g transform="translate(50,170)" style="color:#0F1115"> <line x1="0" y1="50" x2="0" y2="-110" class="axis" marker-end="url(#arrowUp)"/> <line x1="-28" y1="0" x2="50" y2="0" class="axis" marker-end="url(#arrowRight)"/> <circle cx="0" cy="0" r="8" class="origin"/> <g transform="translate(150,-10) skewX(-16)"> <path class="flourish" d="M -46 -106 C -16 -124 20 -128 50 -112"/> <path class="o" d="M -54 -20 C -54 -74, -18 -112, 26 -112 C 80 -112, 110 -66, 102 -12 C 94 36, 56 74, 10 80 C -34 86, -72 48, -70 2 C -68 -40, -46 -62, -22 -60 C 6 -58, 24 -38, 18 -14 C 12 8, -6 22, -20 20 C -34 18, -48 6, -54 -20 Z"/> </g> </g> </svg>
UI primitives and utilities

Button: variants (primary, ghost), loading state, aria-busy
IconButton: for theme toggle and drawer open/close
SectionHeading: renders anchor linkable h2 with id and scrollMarginTop
useSmoothScrollTo(id, offset): scroll to anchor with header offset
useInViewAnimation: IntersectionObserver wrapper to trigger one-time entrance animations
useScramble hook for hero text (configurable charset, speed)
useArcCarousel for Services arc math:
API: { activeIndex, items, onSelect, positions: Array<{angle, x, y, scale, zIndex}> }
Accessibility details

All interactive elements are buttons/links with proper roles and labels
Drawer: aria-modal, role="dialog", focus trap, inert background, Esc to close
Tabs/listbox patterns in About and Services arc; roving tabindex; arrow key navigation
Each section has a unique h2 and tabindex="-1" to accept focus on anchor jumps
Color contrast AA; focus ring visible and theme-consistent
prefers-reduced-motion: true → swaps complex motion for simple fades/instant state changes
Performance

Lazy load video; use small poster; attribute preload="metadata"
Dynamic import Framer Motion in heavy sections (Services, Reviews); tree-shake
SVGs inline for styling; compress with SVGO
Avoid third-party libraries for carousels; custom lightweight logic
Use Next Image for raster assets; serve WebP/AVIF where applicable
SEO and metadata

Proper <Metadata> in layout.tsx
OpenGraph/Twitter cards; og image with logo + tagline
JSON-LD Organization schema including logo URL
sitemap.xml and robots.txt
Testing (minimum)

useScramble resolves strings correctly
Navbar: drawer opens/closes; focus trap works; anchor scrolling offset correct
About: auto-advance pauses on user interaction and resumes
Services: selecting an item recenters it; exits and enters don’t overlap
Reviews: pinned scroll cycles cards forward/backward correctly
Contact: mailto link present; “copy email” works
Content stubs (editable)

About items (5): Strategy, Design System, Architecture, Delivery, Warranty (80–120 chars each)
Services: four items with short copy (<= 120 chars)
Reviews: 6–8 cards with name, role, avatar, rating (1–5), quote (<= 220 chars), color (hex)
Footer links: Privacy, Terms, Contact, LinkedIn, GitHub
Acceptance criteria

Lighthouse scores ≥95 for Performance, Accessibility, Best Practices, SEO on local build
First load JS ≤ ~90kb; heavy motion deferred/dynamically loaded
All anchor links smooth scroll with proper offset; active link updates on scroll
Mobile drawer: slides in from right; closes on link click and Esc; focus is restored to trigger
Hero hacker text effect cycles phrases smoothly; arrow-down works and is hidden under reduced motion
About: auto-advances, keyboard operable, content switches without layout shift
Services: arc rotation centers selected item; left content animates with reverse/enter logic and spacing delay
Reviews: section pins scrolling; cards shuffle top-to-back until all viewed, then release; reverses on upward scroll; background gradient follows top card color
Contact: mailto button and webmail quick links open correct compose windows
Footer: theme-consistent, responsive
All motion respects prefers-reduced-motion; no essential content is lost without motion
Developer notes and hints

Use CSS scroll-padding-top on html for anchor offset (height of sticky header)
Use CSS variables for dynamic colors (e.g., --review-bg) and bind them via React state
For pinned Reviews: section wrapper with position: sticky; height set to viewport x number of steps; map scroll progress to card index
For Services arc: use perspective for depth if desired but keep subtle; 2D transforms often suffice
Provide environment-agnostic build (no experimental flags beyond Next latest defaults)