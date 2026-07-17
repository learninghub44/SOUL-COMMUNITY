'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// When the maintenance window starts. Update this (and the message below)
// for future maintenance windows, or set MAINTENANCE_BANNER_ENABLED to
// false to hide the banner entirely once it's no longer needed.
const MAINTENANCE_BANNER_ENABLED = true;
const MAINTENANCE_START = new Date('2026-07-20T00:00:00+03:00'); // 20th, 12:00 AM EAT
const MAINTENANCE_MESSAGE =
  'SCHEDULED MAINTENANCE — Our website will be undergoing maintenance on the 20th at 12:00 AM (midnight). Some features may be briefly unavailable during this window. Thank you for your patience.';

const DISMISS_KEY = 'soul-maintenance-banner-dismissed';
const BANNER_HEIGHT_PX = 36;

export function MaintenanceBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (!MAINTENANCE_BANNER_ENABLED) return;
    // These reads are intentionally client-only (sessionStorage, current
    // time) and can't be computed during SSR, so they run once on mount
    // rather than as a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPast(Date.now() > MAINTENANCE_START.getTime());
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  const visible = MAINTENANCE_BANNER_ENABLED && !dismissed && !isPast;

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--banner-h',
      visible ? `${BANNER_HEIGHT_PX}px` : '0px'
    );
  }, [visible]);

  if (!visible) return null;

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore — worst case the banner reappears on next load
    }
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[70] bg-red-600 text-white overflow-hidden">
      <div className="relative flex items-center" style={{ height: BANNER_HEIGHT_PX }}>
        <span className="shrink-0 flex items-center gap-1.5 bg-red-800 px-3 h-full text-xs md:text-sm font-bold uppercase tracking-wide z-10">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Breaking
        </span>

        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-xs md:text-sm font-medium px-4">
            <span>{MAINTENANCE_MESSAGE}</span>
            <span className="px-12">•</span>
            <span>{MAINTENANCE_MESSAGE}</span>
            <span className="px-12">•</span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss maintenance notice"
          className="shrink-0 flex items-center justify-center w-9 h-full hover:bg-red-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}
