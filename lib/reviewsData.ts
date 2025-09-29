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
    role: 'VP Product',
    company: 'Vectorstate',
    quote:
      "Ordinate mapped our analog release rituals into a digital operating system. Velocity jumped 38% without trading on quality.",
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
      'Their architecture ops playbooks saved our migration. We shipped four services in parallel and kept incidents at zero.',
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
      'Ordinate codified our token pipeline and automated drift checks. Designers and engineers finally work from the same truth.',
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
      'They gave our delivery org guardrails without bureaucracy. SLOs, dashboards, and on-call drills just happen now.',
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
    company: 'LumenReach',
    quote:
      'Campaigns launch with reliable telemetry and creative refreshes. Attribution is no longer a guessing game.',
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
    company: 'Auralith',
    quote:
      'Their AI readiness framework is the reason our copilots cleared legal and compliance in record time.',
    rating: 5,
    color: '#38BDF8',
    avatar: {
      initials: 'HV',
      gradient: 'from-sky-400 via-cyan-500 to-blue-500',
    },
  },
];
