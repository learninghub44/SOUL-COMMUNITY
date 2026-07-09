'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

// ── EDIT THIS MESSAGE WHENEVER YOU NEED TO CHANGE WHAT IT SAYS ──
const NOTICE_MESSAGE =
  "We're currently making improvements to the site. Some sections may look different temporarily — thanks for your patience!";

// Bump this key (e.g. 'temp-notice-dismissed-v2') any time you want the
// banner to reappear for people who already dismissed an older version.
const DISMISS_KEY = 'temp-notice-dismissed-v1';

/**
 * Temporary homepage-only notice banner.
 * - Does NOT touch page.tsx — mounted from layout.tsx instead.
 * - Only renders on "/" (the homepage).
 * - Dismissible; remembers dismissal for this browser via sessionStorage.
 * - To remove later: delete this file and remove its one line from layout.tsx.
 */
export function TempNotice() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true); // default hidden until checked, avoids flash

  useEffect(() => {
    if (pathname !== '/') return;
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    setDismissed(wasDismissed);
  }, [pathname]);

  if (pathname !== '/' || dismissed) return null;

  function handleDismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }

  return (
    <div className="relative z-50 flex items-center gap-3 bg-[#2D5A3D] text-white py-3 px-4 overflow-hidden">
      <span className="shrink-0 rounded bg-white text-[#2D5A3D] font-extrabold text-xs tracking-wide px-2 py-1 uppercase">
        Notice
      </span>
      <div className="flex-1 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee font-bold text-base sm:text-lg">
          {NOTICE_MESSAGE}
        </div>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notice"
        className="shrink-0 rounded-full p-1 hover:bg-white/10 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 14s linear infinite;
        }
      `}</style>
    </div>
  );
}
