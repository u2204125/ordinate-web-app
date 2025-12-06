"use client";

import React, { useEffect, useRef, useState } from 'react';
import ServicesModal from './service/services-modal';
import styles from './service/services.module.css';
import { Diamond } from './service/Diamond';
import { LifecycleIcon } from '@/icons/lifecycle';
import { IntegrationIcon } from '@/icons/integration';
import { AppDevIcon } from '@/icons/appdev';
import { ManagementIcon } from '@/icons/management';

export function ServicesSection() {
  // const { theme } = useTheme?.() ?? { theme: 'dark' };
  const [openId, setOpenId] = useState<string | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (openId) {
      document.documentElement.style.overflow = 'hidden';
      modalCloseRef.current?.focus();
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [openId]);

  const services = {
    lifecycle: {
      title: 'Lifecycle Marketing',
      body: 'Launch ROI-driven campaigns with data-powered attribution, automated analysis, and creative continuity. We integrate analytics, automate customer journeys, and keep creatives fresh so conversions always grow.',
      icon: LifecycleIcon,
      styles: {
        background: 'linear-gradient(180deg, #f4edff, #e7e0ff)',
        color: '#2b1052',
      }
    },
    webdev: {
      title: 'Web Development',
      body: 'Connect systems seamlessly using enterprise-grade APIs and real-time monitoring, fully automate data flows, and ensure 99.9% uptime and reliability across your entire ecosystem.',
      icon: IntegrationIcon,
      styles: {
        background: 'linear-gradient(180deg, #dffaf2, #bff6ee)',
        color: '#04403a',
      }
    },
    android: {
      title: 'Android Development',
      body: 'Build high-performance, scalable, and maintainable products with modern tech stack, fully automated testing, and premium DX. Our focused teams add proven value each sprint, turning your vision into reality.',
      icon: AppDevIcon,
      styles: {
        background: 'linear-gradient(180deg, #fff2e6, #ffe0c2)',
        color: '#4a2a0b',
      }
    },
    management: {
      title: 'Management Software',
      body: 'Streamline your operations with custom management solutions that optimize workflows, track performance, and provide actionable insights. Built to scale with your business needs.',
      icon: ManagementIcon,
      styles: {
        background: 'linear-gradient(180deg, #ffe6f0, #ffd4e5)',
        color: '#4a0b2e',
      }
    },
  };

  function openModal(id: string) {
    setOpenId(id);
  }

  function closeModal() {
    setOpenId(null);
  }

  return (
    <section id="services" aria-labelledby="services-heading" className="relative scroll-mt-[var(--header-height)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-10">
        {/* Left column: lead + instruction */}
        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold uppercase tracking-[0.4em] text-cloud/60">Services</p>
          <h2 id="services-heading" className="text-balance text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">Every service designed for your success.</h2>
          <p className="max-w-xl text-base text-cloud/70">Expert teams deliver customized solutions for your goals. Select a service to see how Ordinate applies proven talent, powerful tools, and tested methods to ensure your success.</p>

          <div className="rounded-3xl border border-white/8 bg-white/5 p-4 sm:p-6 max-w-xl mx-auto lg:mx-0 mb-5 lg:mb-0">
            <p className="text-sm text-center text-cloud/70">Hover on icons for preview. Click for full details.</p>
          </div>
        </div>

        {/* Right column: diamonds + panel */}
        <div className="flex items-center justify-center">
          <div className={`relative w-full max-w-md min-h-[22rem] rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.18),transparent_65%)] p-6 shadow-lg flex flex-col justify-center`}>
            <div className={`${styles.diamondArea} flex flex-col justify-center`}>
              <div className={`${styles.diamondRow}`}>
                <Diamond d={services.lifecycle} id="lifecycle" openModal={openModal} styles={styles} />
              </div>

              <div className={`${styles.diamondRow}`}>
                <Diamond d={services.android} id="android" openModal={openModal} styles={styles} />
                <Diamond d={services.webdev} id="webdev" openModal={openModal} styles={styles} />
              </div>

              <div className={`${styles.diamondRow}`}>
                <Diamond d={services.management} id="management" openModal={openModal} styles={styles} />
              </div>
            </div>

            <ServicesModal openId={openId} closeModal={closeModal} modalCloseRef={modalCloseRef} infoMap={services} />
          </div>
        </div>
      </div>
    </section>
  );
}
