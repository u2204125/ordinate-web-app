"use client";

import React from 'react';

type InfoMap = Record<string, { title: string; body: string; icon: React.ComponentType; styles: { background: string; color: string } }>

export default function ServicesModal({
  openId,
  closeModal,
  modalCloseRef,
  infoMap,
}: {
  openId: string | null;
  closeModal: () => void;
  modalCloseRef: React.RefObject<HTMLButtonElement | null>;
  infoMap: InfoMap;
}) {
  const currentService = openId ? infoMap[openId] : null;
  const Icon = currentService?.icon;

  return (
    <div id="service-modal" className={`modal ${openId ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={openId ? 'false' : 'true'}>
      <div className="modal-backdrop" id="modal-backdrop" onClick={closeModal} />
      <div className="modal-panel" role="document" aria-labelledby="modal-title">
        <button id="modal-close" ref={modalCloseRef} className="modal-close" aria-label="Close" onClick={closeModal}>✕</button>
        {Icon && (
          <div className="modal-icon p-2" style={{ background: currentService.styles.background, color: currentService.styles.color }}>
            <Icon />
          </div>
        )}
        <h2 id="modal-title" className="text-xl font-semibold text-cloud">{openId ? infoMap[openId].title : 'Title'}</h2>
        <p id="modal-body" className="mt-3 text-sm text-cloud/70 leading-relaxed">{openId ? infoMap[openId].body : 'Details about the service will appear here.'}</p>
      </div>

      <style jsx>
      {`
        .modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 100;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 8, 0.75);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 100;
        }

        .modal-panel {
          position: relative;
          z-index: 101;
          background: linear-gradient(145deg, rgba(15, 17, 21, 0.97), rgba(10, 12, 14, 0.98));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--cloud);
          border-radius: 24px;
          padding: 28px;
          max-width: 420px;
          width: 90%;
          transform: scale(0.9) translateY(20px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 24px 80px rgba(8, 16, 32, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal.open {
          pointer-events: auto;
        }

        .modal.open .modal-backdrop {
          opacity: 1;
        }

        .modal.open .modal-panel {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .modal-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .modal-icon :global(svg) {
          width: 32px;
          height: 32px;
          stroke-width: 2.5;
        }

        .modal-close {
          position: absolute;
          right: 14px;
          top: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 0;
          color: var(--cloud);
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          border-radius: 12px;
          transition: all 0.2s ease;
          line-height: 1;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }
      `}
      </style>
    </div>
  );
}
