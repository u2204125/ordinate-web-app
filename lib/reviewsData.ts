export type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  color: string;
  avatar: {
    initials: string;
    gradient: string;
  };
};

export const REVIEWS: Review[] = [
  {
    id: 'selene-bradford',
    name: 'Selene Bradford',
    role: 'VP of Product',
    company: 'VectorState',
    quote:
      "Ordinate transformed our old release process into a modern digital operating system. Result: 38% faster delivery with zero compromise on quality.",
    rating: 5,
    color: '#4FD1FF',
    avatar: {
      initials: 'SB',
      gradient: 'from-cyan/80 via-cyan/60 to-cyan/30',
    },
  },
  {
    id: 'amir-thornton',
    name: 'Amir Thornton',
    role: 'CTO',
    company: 'Stratiform Labs',
    quote:
      'Their architecture ops playbook made our migration completely safe and successful. We launched four services in parallel within 24 hours with zero incidents. This is what reliability looks like.',
    rating: 5,
    color: '#6366F1',
    avatar: {
      initials: 'AT',
      gradient: 'from-violet-500 via-indigo-500 to-blue-500',
    },
  },
  {
    id: 'yael-mizrahi',
    name: 'Yael Mizrahi',
    role: 'Head of Design Systems',
    company: 'Orbitical',
    quote:
      'Ordinate fully automated our token pipeline and systematized drift checks. Now designers and engineers work from the same truth—no more confusion, conflicts, or timeline slippage.',
    rating: 5,
    color: '#F97316',
    avatar: {
      initials: 'YM',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    },
  },
  {
    id: 'luis-santos',
    name: 'Luis Santos',
    role: 'Engineering Director',
    company: 'Northwave',
    quote:
      'They brought perfect balance of clarity and safety to our delivery culture. SLO monitoring, real-time dashboards, and on-call readiness all run automatically—we focus on writing code, not process.',
    rating: 4,
    color: '#34D399',
    avatar: {
      initials: 'LS',
      gradient: 'from-emerald-400 via-emerald-500 to-teal-500',
    },
  },
  {
    id: 'carmen-cho',
    name: 'Carmen Cho',
    role: 'Growth Lead',
    company: 'Lumenrich',
    quote:
      'Every campaign launches with pixel-perfect telemetry and automated creative refresh. Attribution isn\'t guesswork anymore—we know exact ROI and make data-driven decisions.',
    rating: 4,
    color: '#F9A8D4',
    avatar: {
      initials: 'CC',
      gradient: 'from-pink-400 via-rose-400 to-fuchsia-500',
    },
  },
  {
    id: 'henrik-voss',
    name: 'Henrik Voss',
    role: 'Head of Platform',
    company: 'Oralith',
    quote:
      'Their AI readiness framework is why our AI copilot features got legal and security approval in record time. Their compliance playbook cut our time-to-market by 60%.',
    rating: 5,
    color: '#38BDF8',
    avatar: {
      initials: 'HV',
      gradient: 'from-sky-400 via-cyan-500 to-blue-500',
    },
  },
];
