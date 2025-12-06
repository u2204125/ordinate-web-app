import type { CSSProperties } from 'react';

export type AboutVisualId = 'strategy' | 'design' | 'architecture' | 'delivery' | 'warranty';

export type AboutItemAccent = {
  tab: string;
  tabHover: string;
  shadow: string;
  border: string;
  gradient: string;
};

export type AboutItemConfig = {
  id: string;
  title: string;
  summary: string;
  visual: AboutVisualId;
  accent: AboutItemAccent;
};

export type AboutItemAccentStyles = AboutItemAccent;

export type AboutAccentCssVars = CSSProperties & {
  '--about-tab-bg': string;
  '--about-tab-bg-hover': string;
  '--about-tab-shadow': string;
  '--about-tab-border': string;
  '--about-panel-gradient': string;
};

export const aboutItems: AboutItemConfig[] = [
  {
    id: 'strategy',
    title: 'Strategic Planning',
    summary: 'Outcome-focused roadmaps, proven methods, and strong safeguards that remove all delivery uncertainty.',
    visual: 'strategy',
    accent: {
      tab: 'linear-gradient(135deg, rgba(0, 209, 255, 0.18) 0%, rgba(0, 209, 255, 0.05) 100%)',
      tabHover: 'linear-gradient(135deg, rgba(0, 209, 255, 0.28) 0%, rgba(0, 209, 255, 0.1) 100%)',
      shadow: '0 24px 48px rgba(0, 209, 255, 0.25)',
      border: 'rgba(0, 209, 255, 0.55)',
      gradient: 'linear-gradient(135deg, rgba(0, 209, 255, 0.22) 0%, rgba(0, 209, 255, 0.04) 100%)',
    },
  },
  {
    id: 'design',
    title: 'Design Systems',
    summary: 'Modern tokenized libraries, premium motion design, and proven governance keeping UI and code perfectly synced.',
    visual: 'design',
    accent: {
      tab: 'linear-gradient(135deg, rgba(238, 130, 238, 0.18) 0%, rgba(238, 130, 238, 0.05) 100%)',
      tabHover: 'linear-gradient(135deg, rgba(238, 130, 238, 0.3) 0%, rgba(238, 130, 238, 0.1) 100%)',
      shadow: '0 24px 48px rgba(238, 130, 238, 0.25)',
      border: 'rgba(238, 130, 238, 0.55)',
      gradient: 'linear-gradient(135deg, rgba(238, 130, 238, 0.2) 0%, rgba(238, 130, 238, 0.06) 100%)',
    },
  },
  {
    id: 'architecture',
    title: 'Architecture Ops',
    summary: 'Scalable service blueprints, automated drift detection, and real-time SLO dashboards ensuring fast, stable growth.',
    visual: 'architecture',
    accent: {
      tab: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.05) 100%)',
      tabHover: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(16, 185, 129, 0.1) 100%)',
      shadow: '0 24px 48px rgba(16, 185, 129, 0.22)',
      border: 'rgba(16, 185, 129, 0.55)',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.05) 100%)',
    },
  },
  {
    id: 'delivery',
    title: 'Delivery Engineering',
    summary: 'Expert squads who unblock roadmaps, accelerate sprints, and build repeatable, proven playbooks for long-term success.',
    visual: 'delivery',
    accent: {
      tab: 'linear-gradient(135deg, rgba(253, 186, 116, 0.22) 0%, rgba(253, 186, 116, 0.08) 100%)',
      tabHover: 'linear-gradient(135deg, rgba(253, 186, 116, 0.32) 0%, rgba(253, 186, 116, 0.14) 100%)',
      shadow: '0 24px 48px rgba(253, 186, 116, 0.22)',
      border: 'rgba(253, 186, 116, 0.6)',
      gradient: 'linear-gradient(135deg, rgba(253, 186, 116, 0.24) 0%, rgba(253, 186, 116, 0.06) 100%)',
    },
  },
  {
    id: 'warranty',
    title: 'Runbook Warranty',
    summary: 'Post-launch readiness, proactive alerts, and comprehensive care plans keeping your releases 100% reliable and stable.',
    visual: 'warranty',
    accent: {
      tab: 'linear-gradient(135deg, rgba(59, 130, 246, 0.22) 0%, rgba(59, 130, 246, 0.08) 100%)',
      tabHover: 'linear-gradient(135deg, rgba(59, 130, 246, 0.32) 0%, rgba(59, 130, 246, 0.14) 100%)',
      shadow: '0 24px 48px rgba(59, 130, 246, 0.24)',
      border: 'rgba(59, 130, 246, 0.55)',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.24) 0%, rgba(59, 130, 246, 0.06) 100%)',
    },
  },
];

export const getAccentCssVariables = (accent: AboutItemAccentStyles): AboutAccentCssVars => ({
  '--about-tab-bg': accent.tab,
  '--about-tab-bg-hover': accent.tabHover,
  '--about-tab-shadow': accent.shadow,
  '--about-tab-border': accent.border,
  '--about-panel-gradient': accent.gradient,
}) as AboutAccentCssVars;
