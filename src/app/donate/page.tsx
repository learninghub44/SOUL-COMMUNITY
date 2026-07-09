'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The "Donate" page was renamed to "Support" as part of the site
 * restructure. This stub keeps old /donate links/bookmarks working by
 * redirecting to the new /support route.
 */
export default function DonateRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/support');
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-center text-muted-foreground">
      <p>
        This page has moved to{' '}
        <a href="/support" className="text-soul-green underline">
          /support
        </a>
        .
      </p>
    </div>
  );
}
