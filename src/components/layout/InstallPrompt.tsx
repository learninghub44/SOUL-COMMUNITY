'use client';

import { useEffect, useState } from 'react';
import { Download, X, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'soul-install-dismissed';

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  if (typeof window === 'undefined') return false;
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSBanner] = useState(() => typeof window !== 'undefined' && isIOS());
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (isStandalone()) return true;
    return sessionStorage.getItem(DISMISSED_KEY) === 'true';
  });

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem(DISMISSED_KEY) === 'true') return;

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    handleDismiss();
  }

  if (dismissed || (!deferredPrompt && !showIOSBanner)) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl bg-white shadow-2xl border border-[#F5F0E8] p-4 sm:left-auto sm:right-4">
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="absolute top-3 right-3 text-[#8B6B4A] hover:text-[#2D5A3D]"
      >
        <X className="w-4 h-4" />
      </button>

      {deferredPrompt ? (
        <div className="flex items-center gap-3 pr-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D5A3D]/10">
            <Download className="h-5 w-5 text-[#2D5A3D]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-[#1E3D2A]">Install SOUL Community</p>
            <p className="text-xs text-[#8B6B4A]">Add it to your home screen for quick access, even offline.</p>
          </div>
          <Button
            size="sm"
            onClick={handleInstall}
            className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white shrink-0"
          >
            Install
          </Button>
        </div>
      ) : (
        <div className="flex items-start gap-3 pr-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D5A3D]/10">
            <Share className="h-5 w-5 text-[#2D5A3D]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-[#1E3D2A]">Install SOUL Community</p>
            <p className="text-xs text-[#8B6B4A]">
              Tap the Share icon, then &ldquo;Add to Home Screen&rdquo; to install this app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
