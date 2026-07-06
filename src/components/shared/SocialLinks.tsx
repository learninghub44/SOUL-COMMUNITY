'use client';

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa6';
import { SITE_CONFIG } from '@/lib/constants';

const PLATFORMS = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebook },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
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
 * Renders real social platform icons, but only for platforms that have
 * an actual URL configured in SITE_CONFIG.social. Platforms left as ''
 * (not yet set up) are skipped entirely rather than rendering a dead
 * '#' link, so this component silently does nothing until real links
 * are added - no placeholder logos.
 */
export function SocialLinks({
  className = '',
  iconClassName = 'w-4 h-4',
  linkClassName = 'w-11 h-11 rounded-xl bg-soul-green/10 flex items-center justify-center text-soul-green hover:bg-soul-green/20 transition-colors',
}: SocialLinksProps) {
  const active = PLATFORMS.filter(({ key }) => SITE_CONFIG.social[key]);

  if (active.length === 0) return null;

  return (
    <div className={className}>
      {active.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={SITE_CONFIG.social[key]}
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
