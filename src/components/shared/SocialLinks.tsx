'use client';

import { useEffect, useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaThreads,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa6';
import { SITE_CONFIG } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import { getWebsiteSettings } from '@/lib/services/settings';

const PLATFORMS = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebook },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
  { key: 'threads', label: 'Threads', Icon: FaThreads },
  { key: 'twitter', label: 'X (Twitter)', Icon: FaXTwitter },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
] as const;

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
}

/**
 * Renders real social platform icons (official brand icons via
 * react-icons/fa6), but only for platforms the admin has actually set
 * a URL for. Admin-managed values come from the website_settings row
 * (edited in /admin/settings); constants.ts SITE_CONFIG.social is
 * only a fallback for local/dev use before that row exists. Platforms
 * left blank are skipped entirely rather than rendering a dead '#'
 * link - no placeholder logos.
 */
export function SocialLinks({
  className = '',
  iconClassName = 'w-4 h-4',
  linkClassName = 'w-11 h-11 rounded-xl bg-soul-green/10 flex items-center justify-center text-soul-green hover:bg-soul-green/20 transition-colors',
}: SocialLinksProps) {
  const [social, setSocial] = useState<Record<string, string>>(SITE_CONFIG.social);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    getWebsiteSettings(supabase)
      .then((data) => {
        if (!active || !data?.social_media) return;
        setSocial((prev) => ({ ...prev, ...data.social_media }));
      })
      .catch(() => {
        // Admin hasn't configured settings yet, or the table isn't
        // reachable - silently keep the constants.ts fallback.
      });
    return () => {
      active = false;
    };
  }, []);

  const active = PLATFORMS.filter(({ key }) => social[key]);

  if (active.length === 0) return null;

  return (
    <div className={className}>
      {active.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={linkClassName}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
