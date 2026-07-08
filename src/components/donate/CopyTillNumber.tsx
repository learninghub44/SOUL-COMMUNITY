'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CopyTillNumber({ till }: { till: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(till);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the number is already visible to copy manually.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'group flex w-full items-center justify-between rounded-2xl border-2 border-dashed',
        'border-primary/30 bg-primary/5 px-5 py-4 transition-colors hover:border-primary/50 hover:bg-primary/10'
      )}
      aria-label="Copy M-Pesa Till Number"
    >
      <span className="text-left">
        <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Till Number
        </span>
        <span className="font-heading text-2xl font-bold tracking-wide text-foreground">
          {till}
        </span>
      </span>
      <span className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy
          </>
        )}
      </span>
    </button>
  );
}
