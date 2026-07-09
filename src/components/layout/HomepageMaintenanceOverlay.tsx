'use client';

import { usePathname } from 'next/navigation';
import { Clock } from 'lucide-react';

// ── EDIT THESE WHENEVER YOU NEED TO CHANGE THE MESSAGE ──
const TITLE = 'We\u2019ll be right back';
const MESSAGE =
  "We're making some improvements to the site right now. Please check back soon.";
const ESTIMATED_HOURS = 24;

/**
 * Full-screen overlay that visually disables the homepage without touching
 * page.tsx at all. It's mounted from layout.tsx and only renders on "/".
 *
 * It sits on top of the real homepage content (which still renders
 * underneath, untouched) and blocks all interaction with it via a solid
 * background + pointer-events, so nothing on the page can be clicked.
 *
 * To bring the homepage back: delete this file and remove its one import +
 * one render line from layout.tsx.
 */
export function HomepageMaintenanceOverlay() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2D5A3D] px-6">
      <div className="max-w-md text-center text-white">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
          <Clock className="h-7 w-7" />
        </div>
        <h1 className="mb-3 font-heading text-2xl font-bold sm:text-3xl">{TITLE}</h1>
        <p className="mb-6 text-white/90">{MESSAGE}</p>
        <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
          Estimated time: {ESTIMATED_HOURS} hours
        </div>
      </div>
    </div>
  );
}
