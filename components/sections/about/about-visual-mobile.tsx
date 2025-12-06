"use client";

import type { ReactElement } from 'react';

type Props = {
  itemId: string;
  ItemVisual: () => ReactElement;
  isActive: boolean;
};

export default function AboutVisualMobile({ itemId, ItemVisual, isActive }: Props) {
  return (
    <div
      id={`about-panel-mobile-${itemId}`}
      aria-hidden={!isActive}
      className="about-small-panel mt-3 lg:hidden overflow-hidden"
    >
      <ItemVisual />
    </div>
  );
}
