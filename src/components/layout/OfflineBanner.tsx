'use client';

import { useEffect, useRef, useState } from 'react';
import { WifiOff } from 'lucide-react';

// How often to re-check connectivity while the banner is showing, so it
// clears itself automatically once the connection actually comes back.
const RECHECK_INTERVAL_MS = 8000;
// How long a probe request can take before we treat it as a failure.
const PROBE_TIMEOUT_MS = 4000;

/**
 * navigator.onLine only reflects whether the device has an active network
 * interface — it does NOT confirm there's real internet access. Wi-Fi
 * connected to a router with no internet, captive portals, and some
 * browser/OS combinations can all report `true`/`false` incorrectly. So
 * instead of trusting it directly, we use it as a hint and confirm with an
 * actual same-origin fetch before showing or hiding the banner.
 */
async function probeConnectivity(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

  try {
    // A tiny, always-present same-origin file. cache: 'no-store' ensures
    // this hits the network (or fails) rather than being served by the SW.
    await fetch('/manifest.json', {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    function clearRecheck() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    async function verify() {
      const online = await probeConnectivity();
      if (cancelled) return;
      setIsOffline(!online);

      if (!online && !intervalRef.current) {
        // Keep re-checking in the background so the banner clears itself
        // the moment the connection is actually back, without needing a
        // manual refresh.
        intervalRef.current = setInterval(async () => {
          const backOnline = await probeConnectivity();
          if (cancelled) return;
          if (backOnline) {
            setIsOffline(false);
            clearRecheck();
          }
        }, RECHECK_INTERVAL_MS);
      } else if (online) {
        clearRecheck();
      }
    }

    verify();

    function handleOnline() {
      verify();
    }
    function handleOffline() {
      verify();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      cancelled = true;
      clearRecheck();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-2 bg-[#8B6B4A] text-white text-sm py-2 px-4">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>You&apos;re offline — showing saved content where available.</span>
    </div>
  );
}
